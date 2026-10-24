/**
 * Minimal, proxy-aware HTTP client for the research scripts.
 *
 * Why not global fetch? Node's fetch (undici) ignores the Windows system proxy
 * and its DNS path can be poisoned on networks that filter DNS, so requests to
 * some hosts time out while PowerShell/.NET — which honours both — succeed.
 *
 * Two transports, tried in order:
 *   1. native  — node:https through the detected proxy (CONNECT tunnel)
 *   2. powershell — Invoke-WebRequest, which uses the system proxy by default
 *
 * The fallback writes the body to a temp file as UTF-8 so that non-ASCII
 * pages (Chinese, Arabic, Russian) survive the round trip intact.
 */

import https from 'node:https';
import http from 'node:http';
import net from 'node:net';
import tls from 'node:tls';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { readFileSync, unlinkSync, existsSync } from 'node:fs';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

let cachedProxy;

export function detectProxy() {
  if (cachedProxy !== undefined) return cachedProxy;
  const fromEnv =
    process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy;
  if (fromEnv) {
    cachedProxy = fromEnv.replace(/^https?:\/\//, '');
    return cachedProxy;
  }
  if (process.platform === 'win32') {
    try {
      const out = execFileSync(
        'reg',
        ['query', 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings', '/v', 'ProxyServer'],
        { encoding: 'utf8' },
      );
      const m = out.match(/ProxyServer\s+REG_SZ\s+([^\r\n]+)/);
      if (m) {
        const value = m[1].trim();
        const hostPort = value.includes('=') ? value.split(';').pop().split('=').pop() : value;
        if (hostPort && hostPort.includes(':')) {
          cachedProxy = hostPort.replace(/^https?:\/\//, '');
          return cachedProxy;
        }
      }
    } catch {
      /* no proxy configured */
    }
  }
  cachedProxy = null;
  return cachedProxy;
}

function collect(res, resolve, reject) {
  const chunks = [];
  res.on('data', (c) => chunks.push(c));
  res.on('end', () =>
    resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') }),
  );
  res.on('error', reject);
}

function nativeGet(target, proxy, headers, timeout) {
  return new Promise((resolve, reject) => {
    const port = target.port || 443;
    const send = (socket) => {
      const req = https.request(
        {
          hostname: target.hostname,
          port,
          path: `${target.pathname}${target.search}`,
          method: 'GET',
          headers: { ...headers, host: target.host },
          agent: false,
          createConnection: () => socket,
          timeout,
        },
        (r) => collect(r, resolve, reject),
      );
      req.on('error', reject);
      req.on('timeout', () => req.destroy(new Error('timeout')));
      req.end();
    };

    if (!proxy) {
      const req = https.request(target, { headers, timeout }, (res) => collect(res, resolve, reject));
      req.on('error', reject);
      req.on('timeout', () => req.destroy(new Error('timeout')));
      req.end();
      return;
    }

    const [ph, pp] = proxy.split(':');
    const connect = http.request({
      host: ph,
      port: Number(pp || 80),
      method: 'CONNECT',
      path: `${target.hostname}:${port}`,
      headers: { Host: `${target.hostname}:${port}` },
      timeout,
    });
    connect.on('connect', (res, socket) => {
      if (res.statusCode !== 200) {
        socket.destroy();
        reject(new Error(`proxy CONNECT failed: ${res.statusCode}`));
        return;
      }
      const secure = tls.connect({ socket, servername: target.hostname }, () => send(secure));
      secure.on('error', reject);
    });
    connect.on('error', reject);
    connect.on('timeout', () => connect.destroy(new Error('proxy timeout')));
    connect.end();
  });
}

function powershellGet(url, headers, timeout) {
  const tmp = path.join(os.tmpdir(), `geo-fetch-${process.pid}-${Date.now()}.html`);
  const headerLines = Object.entries(headers)
    .map(([k, v]) => `  '${k.replace(/'/g, "''")}' = '${String(v).replace(/'/g, "''")}'`)
    .join(';' + String.fromCharCode(10));
  const script = `
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
try {
  $headers = @{
${headerLines}
  }
  $r = Invoke-WebRequest -Uri '${url.replace(/'/g, "''")}' -UseBasicParsing -TimeoutSec ${Math.ceil(timeout / 1000)} -Headers $headers
  [System.IO.File]::WriteAllText('${tmp}', $r.Content, (New-Object System.Text.UTF8Encoding($false)))
  Write-Output $r.StatusCode
} catch {
  [Console]::Error.WriteLine($_.Exception.Message)
  if ($_.Exception.Response) { Write-Output ([int]$_.Exception.Response.StatusCode) } else { exit 1 }
}`;
  const runners = ['powershell', 'pwsh'];
  let lastErr;
  for (const runner of runners) {
    try {
      const out = execFileSync(runner, ['-NoProfile', '-NonInteractive', '-Command', script], {
        encoding: 'utf8',
        timeout: timeout + 10000,
      });
      const status = Number(String(out).trim().split(/\s+/)[0]);
      // A non-2xx response never writes the body file; report the status so the
      // caller can distinguish "throttled" from "no results".
      const body = existsSync(tmp) ? readFileSync(tmp, 'utf8') : '';
      try {
        unlinkSync(tmp);
      } catch {}
      if (!Number.isFinite(status) || status < 100) throw new Error(`bad status ${out}`);
      return { status, headers: {}, body };
    } catch (err) {
      lastErr = err;
      try {
        unlinkSync(tmp);
      } catch {}
    }
  }
  throw lastErr || new Error('powershell transport failed');
}

// Per-host transport memory: on networks that filter DNS the native client
// burns the full timeout before falling back, and some hosts are only ever
// reachable through the system proxy. Remembering which transport worked
// turns a 20-second penalty per request into a single one-off.
const transportByHost = new Map();

/** GET a URL and return { status, headers, body }. */
export async function get(url, { headers = {}, timeout = 25000 } = {}) {
  const target = new URL(url);
  const allHeaders = { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9', ...headers };
  const proxy = detectProxy();
  const known = transportByHost.get(target.hostname);

  const tryNative = () => nativeGet(target, proxy, allHeaders, known === 'native' ? timeout : 8000);
  const tryPs = () => powershellGet(url, allHeaders, timeout);

  const order = known === 'ps' ? [tryPs, tryNative] : [tryNative, tryPs];
  let firstErr;
  for (const attempt of order) {
    try {
      const res = await attempt();
      transportByHost.set(target.hostname, attempt === tryPs ? 'ps' : 'native');
      return res;
    } catch (err) {
      firstErr = firstErr || err;
    }
  }
  throw firstErr || new Error('all transports failed');
}