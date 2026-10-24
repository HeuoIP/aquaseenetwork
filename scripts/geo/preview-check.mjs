/**
 * Runtime acceptance check.
 *
 * `struct-check.mjs` reads the build output on disk. This one reads the site
 * as a *running server* — the local Worker preview (workerd) or `next dev` —
 * which is the only way to prove that the routing, the internal language
 * rewrite and the static asset handling actually work in the runtime the
 * site is deployed to.
 *
 * Nothing here touches Cloudflare: the base URL is a local server.
 *
 *   node scripts/geo/preview-check.mjs
 *   node scripts/geo/preview-check.mjs --base=http://127.0.0.1:8787
 *   node scripts/geo/preview-check.mjs --base=http://localhost:3000 --strict
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
// The locale rules live in TypeScript and are imported straight from source,
// so this check can never drift from the rules the site actually uses.
const { PUBLISHED_LOCALES, LOCALES, localePath } = await import('../../src/lib/locale.ts');

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DATA = resolve(ROOT, 'docs/geo/data');

const argv = process.argv.slice(2);
const argOf = (flag) => {
  const i = argv.indexOf(flag);
  return i >= 0 ? argv[i + 1] : null;
};
const BASE = (argOf('--base') || 'http://127.0.0.1:8787').replace(/\/$/, '');
const STRICT = argv.includes('--strict');
const TIMEOUT = Number(argOf('--timeout') || 30000);

const ROUTES = [
  '/',
  '/strategy',
  '/creative-design',
  '/supply-chain',
  '/projects',
  '/about',
  '/faq',
  '/insights',
  '/contact',
];

const failures = [];
const warnings = [];
const notes = [];

function fail(where, message) {
  failures.push(`${where}: ${message}`);
}
function warn(where, message) {
  warnings.push(`${where}: ${message}`);
}

async function get(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(`${BASE}${path}`, {
      redirect: 'manual',
      signal: controller.signal,
      headers: { 'user-agent': 'AQUASEE-preview-check/1.0' },
    });
    const body = res.status === 200 ? await res.text() : '';
    return { status: res.status, body, location: res.headers.get('location') };
  } catch (err) {
    return { status: 0, body: '', error: err.message };
  } finally {
    clearTimeout(timer);
  }
}

/** Strip tags and collapse whitespace, so the checks read the page as text. */
function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

console.log(`=== Runtime check against ${BASE} ===\n`);

const health = await get('/');
if (health.status !== 200) {
  console.error(
    `No server answering at ${BASE} (status ${health.status}${
      health.error ? `, ${health.error}` : ''
    }).\nStart one with:\n  npm run preview:cloudflare   (local workerd)\n  npm run dev`,
  );
  process.exit(2);
}

// --- 1. every published locale answers -----------------------------------
const localeRoots = new Map();
for (const locale of PUBLISHED_LOCALES ) {
  for (const route of ROUTES) {
    const path = localePath(locale, route);
    const res = await get(path);
    if (res.status !== 200) {
      fail(path, `status ${res.status}${res.error ? ` (${res.error})` : ''}`);
      continue;
    }
    const lang = res.body.match(/<html[^>]*\slang="([^"]+)"/)?.[1];
    const dir = res.body.match(/<html[^>]*\sdir="([^"]+)"/)?.[1];
    const expectedDir = locale === 'ar' ? 'rtl' : 'ltr';
    if (!lang) fail(path, 'the html element carries no lang attribute');
    else if (!lang.toLowerCase().startsWith(locale)) {
      fail(path, `html lang is "${lang}", expected it to start with "${locale}"`);
    }
    if (dir && dir !== expectedDir) fail(path, `html dir is "${dir}", expected "${expectedDir}"`);

    const canonical = res.body.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (!canonical) fail(path, 'no canonical link');

    const alternates = [...res.body.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)];
    if (!alternates.length) {
      fail(path, 'no hreflang alternates');
    } else {
      const map = Object.fromEntries(alternates.map(([, tag, href]) => [tag, href]));
      for (const [tag, href] of Object.entries(map)) {
        const target = href.replace(/^https?:\/\/[^/]+/, '') || '/';
        const check = await get(target);
        if (check.status !== 200) {
          fail(path, `hreflang ${tag} points at ${target}, which answers ${check.status}`);
        }
      }
    }

    const ld = [...res.body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    if (!ld.length) fail(path, 'no JSON-LD found');
    for (const [, raw] of ld) {
      try {
        JSON.parse(raw);
      } catch (err) {
        fail(path, `invalid JSON-LD: ${err.message}`);
      }
    }

    const body = textOf(res.body);
    if (!/AQUASEE/.test(body)) fail(path, 'the page does not name the entity');
    if (localeRoots.has(locale)) continue;
    localeRoots.set(locale, body.slice(0, 400));
  }
}

// --- 2. untranslated locales must not answer -----------------------------
// A locale that is not published must not be reachable: a page that answers
// in English under a /zh/ prefix is worse than a 404.
for (const locale of LOCALES ) {
  if ((PUBLISHED_LOCALES ).includes(locale)) continue;
  const res = await get(localePath(locale, '/'));
  if (res.status === 200) {
    fail(localePath(locale, '/'), 'an unpublished language answers with 200');
  }
}

// --- 3. machine endpoints -------------------------------------------------
for (const [name, pattern] of [
  ['robots.txt', /AI|SearchBot|Bot/i],
  ['sitemap.xml', /<loc>/],
  ['llms.txt', /AQUASEE/],
  ['llms-full.txt', /AQUASEE/],
]) {
  const res = await get(`/${name}`);
  if (res.status !== 200) fail(`/${name}`, `status ${res.status}`);
  else if (!pattern.test(res.body)) fail(`/${name}`, 'the content does not look right');
}

// --- 4. the pages are still in English-only mode? ------------------------
// This check exists so that publishing a language is a deliberate act: when a
// locale is published, its pages must carry translated chrome, not English
// copy behind a translated URL.
for (const [locale, lead] of localeRoots) {
  if (locale === 'en') continue;
  const latin = (lead.match(/[A-Za-z]/g) ?? []).length;
  const total = lead.length || 1;
  if (latin / total > 0.6) {
    warn(
      localePath(locale, '/'),
      'the opening of the page is still mostly Latin script — the locale may be serving English copy',
    );
  }
}

notes.push(`Base URL: ${BASE}`);
notes.push(`Published locales checked: ${[...PUBLISHED_LOCALES].join(', ')}`);
notes.push(`Routes per locale: ${ROUTES.length}`);

// --- report ---------------------------------------------------------------
const stamp = new Date().toISOString().slice(0, 10);
const lines = [];
lines.push(`# Runtime check — ${stamp}`);
lines.push('');
lines.push(`Target: \`${BASE}\` (local server — no Cloudflare involved)`);
lines.push('');
lines.push(`- Failures: **${failures.length}**`);
lines.push(`- Warnings: **${warnings.length}**`);
lines.push('');
if (failures.length) {
  lines.push('## Failures');
  lines.push('');
  for (const f of failures) lines.push(`- ${f}`);
  lines.push('');
}
if (warnings.length) {
  lines.push('## Warnings');
  lines.push('');
  for (const w of warnings) lines.push(`- ${w}`);
  lines.push('');
}
if (!failures.length && !warnings.length) {
  lines.push('Everything passed.');
  lines.push('');
}
lines.push('## Notes');
lines.push('');
for (const n of notes) lines.push(`- ${n}`);
lines.push('');

mkdirSync(DATA, { recursive: true });
writeFileSync(resolve(DATA, `runtime-check-${stamp}.json`), JSON.stringify({ base: BASE, failures, warnings, notes }, null, 2));
writeFileSync(resolve(ROOT, 'docs/geo/runtime-check.md'), lines.join('\n'));

console.log(lines.join('\n'));

if (failures.length) {
  if (STRICT) process.exit(1);
  console.log('\nFailures were recorded; re-run with --strict to fail the shell.');
}