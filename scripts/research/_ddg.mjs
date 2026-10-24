/**
 * Shared DuckDuckGo access layer for the AQUASEE GEO research scripts.
 *
 * Verified working endpoints (see docs/geo/methodology-memo.md):
 *   - autocomplete: https://duckduckgo.com/ac/?q=...&type=list
 *   - search page:  https://html.duckduckgo.com/html/?q=...
 *
 * Known-unreliable, deliberately NOT used here:
 *   - the `site:` operator returns nothing even for large, well-known domains
 *   - Bing's HTML endpoint serves degraded, unrelated results to scripted requests
 *   - Google cannot be queried at all
 *
 * Everything here is read-only public web data, fetched politely with a delay.
 */

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

import { get as httpGet } from './_http.mjs';

/**
 * DuckDuckGo answers scripted traffic with a 202 "anomaly detected" page once
 * a burst threshold is crossed. That is a throttle, not an error, so it is
 * surfaced as a distinct signal the callers can back off from.
 */
export class ThrottledError extends Error {
  constructor(status) {
    super(`throttled by duckduckgo (${status})`);
    this.name = 'ThrottledError';
    this.status = status;
  }
}

async function get(url, { timeout = 25000, headers = {} } = {}) {
  const res = await httpGet(url, {
    timeout,
    headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9', ...headers },
  });
  if (res.status === 202 || res.status === 429 || res.status === 503) throw new ThrottledError(res.status);
  if (res.status !== 200) throw new Error(`${res.status} for ${url}`);
  return res.body;
}

/** DuckDuckGo autocomplete: real buyer phrasing, the cheapest demand signal there is. */
export async function autocomplete(query) {
  const url = `https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}&type=list`;
  const raw = await get(url);
  const parsed = JSON.parse(raw);
  // Shape: ["seed", ["phrase a", "phrase b", ...]]
  const list = Array.isArray(parsed) && Array.isArray(parsed[1]) ? parsed[1] : [];
  return list.map((s) => String(s).trim()).filter(Boolean);
}

/** Unwrap DuckDuckGo's /l/?uddg=<encoded> redirect into a real destination URL. */
function cleanUrl(href) {
  if (!href) return '';
  const m = href.match(/[?&]uddg=([^&]+)/);
  if (m) return decodeURIComponent(m[1]);
  if (href.startsWith('//')) return `https:${href}`;
  return href;
}

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

/**
 * Bing's suggestion endpoint.
 *
 * A second, independent source of real buyer phrasing — and a relevant one,
 * because Bing's index is what Copilot answers from. It stays available when
 * DuckDuckGo refuses traffic, which matters: the demand bank must not depend
 * on a single host.
 */
export async function autocompleteBing(query) {
  const url = `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(query)}`;
  const raw = await get(url);
  const parsed = JSON.parse(raw);
  const list = Array.isArray(parsed) && Array.isArray(parsed[1]) ? parsed[1] : [];
  return list.map((s) => String(s).trim()).filter(Boolean);
}

/**
 * Real buyer phrasing from whichever source is answering.
 *
 * Both endpoints are public suggestion services; neither needs a key.
 */
let preferredSource;

/**
 * Real buyer phrasing from whichever source is answering.
 *
 * The preferred source is remembered: when one host starts refusing traffic,
 * every subsequent request would otherwise spend its full timeout before
 * falling back. Both endpoints are public suggestion services; neither needs
 * a key.
 */
export async function autocompleteAny(query) {
  const sources = [
    ['duckduckgo', autocomplete],
    ['bing', autocompleteBing],
  ];
  const ordered = preferredSource
    ? [...sources.filter(([n]) => n === preferredSource), ...sources.filter(([n]) => n !== preferredSource)]
    : sources;

  let lastError;
  for (const [name, fn] of ordered) {
    try {
      const out = await fn(query);
      if (out.length) {
        preferredSource = name;
        return { phrases: out, source: name };
      }
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('no suggestion source available');
}

/** Top organic results: title, url and domain for one query. */
export async function serp(query, limit = 10) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const html = await get(url);
  const results = [];
  const re = /class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let m;
  while ((m = re.exec(html)) && results.length < limit) {
    const title = m[2]
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .trim();
    const link = cleanUrl(m[1]);
    if (!title || !/^https?:/.test(link)) continue;
    results.push({ title, url: link, domain: hostOf(link) });
  }
  return results;
}

/**
 * Classify the page shape that wins a query. AI engines preferentially cite
 * pages whose *form* matches the question, so this is what tells us what to build.
 */
export function classifyShape(result) {
  const { url, title } = result;
  const path = (() => {
    try {
      return new URL(url).pathname.toLowerCase();
    } catch {
      return '';
    }
  })();
  const t = title.toLowerCase();
  if (/\/blog\/|\/insights\/|\/news\/|\/article|\/guide/.test(path) || /guide|how to|playbook|tips/.test(t))
    return 'guide';
  if (/\/faq|\/questions/.test(path) || /\bfaq\b/.test(t)) return 'faq';
  if (/\/case|\/project|\/portfolio|\/work\/|\/stories/.test(path)) return 'case-study';
  if (/standard|specification|\/en-\d|iso |astm|bs en/.test(t) || /\/standards?/.test(path)) return 'standard';
  if (/\/product|\/equipment|\/catalogue|\/catalog|\/range/.test(path) || /water play|play equipment|slide|playground/.test(t))
    return 'product';
  if (/\/list|top \d+|best \d+/.test(t)) return 'listicle';
  if (/supplier|manufacturer|factory|distributor/.test(t)) return 'supplier';
  return 'other';
}

export { sleep, hostOf };