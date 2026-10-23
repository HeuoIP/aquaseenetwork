#!/usr/bin/env node
/**
 * Pushes the inquiry-delivery settings from `.env.local` into the Cloudflare
 * Worker as encrypted runtime secrets.
 *
 *   npm run setup:mail
 *
 * The values are read from `.env.local` (never hard-coded here, never
 * committed). If the machine is not signed in to Cloudflare yet, the script
 * starts the `wrangler login --device` flow first — approve it in the
 * browser window that opens, then the script continues.
 */
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(root, '.env.local');

const REQUIRED = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_SECURE',
  'SMTP_USER',
  'SMTP_PASS',
  'INQUIRY_TO_EMAIL',
  'INQUIRY_FROM_EMAIL',
];

function run(command, args, { input } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: ['pipe', 'inherit', 'inherit'] });
    if (input !== undefined) {
      child.stdin.write(input);
      child.stdin.end();
    } else {
      child.stdin.end();
    }
    child.on('error', reject);
    child.on('close', (code) =>
      code === 0 ? resolve(code) : reject(new Error(`${command} ${args.join(' ')} exited with ${code}`))
    );
  });
}

function readEnvFile(path) {
  const values = {};
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index === -1) continue;
    values[trimmed.slice(0, index).trim()] = trimmed.slice(index + 1).trim();
  }
  return values;
}

if (!existsSync(envPath)) {
  console.error('`.env.local` was not found.');
  console.error('Copy `.env.example` to `.env.local` and fill in the SMTP values first.');
  process.exit(1);
}

const env = readEnvFile(envPath);
const missing = REQUIRED.filter((key) => !env[key]);
if (missing.length) {
  console.error(`Missing values in .env.local: ${missing.join(', ')}`);
  process.exit(1);
}

if (process.argv.includes('--dry-run')) {
  console.log('Dry run — the following Worker secrets would be uploaded:');
  for (const key of REQUIRED) console.log(`  ${key} = ${key === 'SMTP_PASS' ? '***' : env[key]}`);
  process.exit(0);
}

console.log('Checking Cloudflare sign-in...');
try {
  await run('npx', ['wrangler', 'whoami']);
} catch {
  console.log('\nNot signed in — starting the Cloudflare sign-in (device code).');
  console.log('Approve it in the browser window that opens, then come back here.\n');
  await run('npx', ['wrangler', 'login', '--device']);
}

const secrets = Object.fromEntries(REQUIRED.map((key) => [key, env[key]]));

console.log(`\nUploading ${REQUIRED.length} secrets to the "aquasee-website" Worker...`);
await run('npx', ['wrangler', 'secret', 'bulk'], { input: JSON.stringify(secrets, null, 2) });

console.log('\nDone. The inquiry form now delivers email through Feishu Mail.');
console.log('Verify with:');
console.log('  curl -s -X POST https://www.aquasee.art/api/inquiry \\');
console.log('    -H "content-type: application/json" \\');
console.log('    -d "{\\"name\\":\\"Test\\",\\"company\\":\\"Test\\",\\"email\\":\\"test@example.com\\",\\"country\\":\\"CN\\",\\"projectType\\":\\"Something else\\",\\"services\\":[\\"Not sure yet — please advise\\"],\\"description\\":\\"This is a delivery channel verification message from the website.\\"}"');
