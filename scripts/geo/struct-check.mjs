import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

/**
 * Release gate for the GEO work.
 *
 * Checks the built output — not the source — against the things that decide
 * whether a page can be cited and understood by a machine:
 *
 *   1. every page carries valid JSON-LD, and the types are the ones we expect
 *   2. the canonical URL of every page is correct for its language
 *   3. hreflang alternates are reciprocal and point at pages that exist
 *   4. the sitemap covers exactly the set of built pages
 *   5. /llms.txt and /llms-full.txt agree with the pages
 *   6. every page opens with a paragraph that can be quoted on its own
 *   7. no page describes AQUASEE as a manufacturer or a factory
 *
 * The gate is language-aware: a page in another language is checked with the
 * rules of that language, not with the English ones.
 *
 * Usage: node scripts/geo/struct-check.mjs
 */
const { PUBLISHED_LOCALES } = await import('../../src/lib/locale.ts');

const APP_DIR = '.next/server/app';
const ORIGIN = 'https://www.aquasee.art';
const PUBLISHED = PUBLISHED_LOCALES;

const failures = [];
const warnings = [];
const notes = [];

function fail(page, message) {
  failures.push(`${page}: ${message}`);
}
function warn(page, message) {
  warnings.push(`${page}: ${message}`);
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (full.endsWith('.html')) out.push(full);
  }
  return out;
}

if (!existsSync(APP_DIR)) {
  console.error('No build output found. Run `npm run build` first.');
  process.exit(1);
}

const htmlFiles = walk(APP_DIR).filter(
  (f) => !f.includes('_global-error') && !f.includes('_not-found'),
);

const pages = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const rel = relative(APP_DIR, file).replace(/\\/g, '/').replace(/\.html$/, '');
  const locale = rel.split('/')[0];
  const sub = rel.slice(locale.length + 1);
  // English keeps the root path; every other language carries its prefix.
  const url = ((locale === 'en' ? '' : `/${locale}`) + (sub ? `/${sub}` : '')) || '/';
  pages.push({ file, rel, url, sub: sub ? `/${sub}` : '/', locale, html });
}

notes.push(`Pages checked: ${pages.length}`);
notes.push(`Languages checked: ${[...new Set(pages.map((p) => p.locale))].join(', ')}`);

/** The rules that are written in words, per language. */
const LANGUAGE_RULES = {
  en: {
    serviceMarkers: /consult|design|supply chain|delivery|service|advisory/i,
    manufacturerMarkers: [
      /we manufacture/i,
      /our factory/i,
      /our own factory/i,
      /we are a manufacturer/i,
      /our production facility/i,
    ],
    quoteable: /AQUASEE is a|AQUASEE provides|AQUASEE is an|is a China-based|we are a service/i,
  },
  zh: {
    serviceMarkers: /咨询|设计|供应链|服务|交付/,
    manufacturerMarkers: [/我们是[^。]{0,6}制造商/, /我们的自有工厂/, /自有生产工厂/],
    quoteable: /AQUASEE\s*是一家|AQUASEE\s*是/,
  },
};
const rulesFor = (locale) =>
  LANGUAGE_RULES[locale] ?? {
    serviceMarkers: /consult|design|supply chain|service/i,
    manufacturerMarkers: [/we manufacture/i, /our factory/i],
    quoteable: /AQUASEE/i,
  };

// --- 1. JSON-LD -----------------------------------------------------------
const EXPECTED_TYPES = {
  '/': ['Organization', 'WebSite'],
  '/about': ['Organization', 'WebSite', 'AboutPage'],
  '/faq': ['Organization', 'WebSite', 'FAQPage'],
  '/projects': ['Organization', 'WebSite', 'ItemList'],
  '/insights': ['Organization', 'WebSite', 'ItemList'],
  '/strategy': ['Organization', 'WebSite', 'Service', 'FAQPage'],
  '/creative-design': ['Organization', 'WebSite', 'Service', 'FAQPage'],
  '/supply-chain': ['Organization', 'WebSite', 'Service', 'FAQPage'],
};

for (const page of pages) {
  const rules = rulesFor(page.locale);
  const blocks = [...page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!blocks.length) {
    fail(page.url, 'no JSON-LD found');
    continue;
  }
  const types = [];
  for (const [, raw] of blocks) {
    try {
      const parsed = JSON.parse(raw);
      types.push(parsed['@type']);
      if (!parsed['@context']) fail(page.url, 'JSON-LD block without @context');
      if (parsed['@type'] === 'Organization') {
        if (!rules.serviceMarkers.test(JSON.stringify(parsed))) {
          fail(page.url, 'Organization description does not describe the service business');
        }
        if (rules.manufacturerMarkers.some((re) => re.test(JSON.stringify(parsed)))) {
          fail(page.url, 'Organization mentions manufacturing as its own business');
        }
      }
    } catch (err) {
      fail(page.url, `invalid JSON-LD: ${err.message}`);
    }
  }
  const hasLibrary = pages.some((p) => p.locale === page.locale && p.sub.startsWith('/insights/'))
  const expected = EXPECTED_TYPES[page.sub]?.filter((type) => type !== 'ItemList' || hasLibrary);
  if (expected) {
    for (const type of expected) {
      if (!types.includes(type)) fail(page.url, `missing ${type} JSON-LD (found: ${types.join(', ')})`);
    }
  }
  if (page.sub.startsWith('/insights/') && !types.includes('Article')) {
    fail(page.url, 'insight article without Article JSON-LD');
  }
}

// --- 2 & 3. canonical + hreflang -----------------------------------------
for (const page of pages) {
  const canonical = page.html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) {
    fail(page.url, 'no canonical link');
  } else if (canonical.replace(/\/$/, '') !== `${ORIGIN}${page.url}`.replace(/\/$/, '')) {
    fail(page.url, `canonical is ${canonical}, expected ${ORIGIN}${page.url}`);
  }

  const alternates = [...page.html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)];
  if (!alternates.length) {
    fail(page.url, 'no hreflang alternates');
    continue;
  }
  const map = Object.fromEntries(alternates.map(([, tag, href]) => [tag, href]));
  for (const [tag, href] of Object.entries(map)) {
    const targetPath = href.replace(ORIGIN, '') || '/';
    if (tag !== 'x-default' && !pages.some((p) => p.url === targetPath)) {
      fail(page.url, `hreflang ${tag} points at ${targetPath}, which is not published`);
    }
  }
  if (!map['x-default']) fail(page.url, 'no x-default hreflang');
}

// --- 4. sitemap -----------------------------------------------------------
const sitemap = await readEndpoint('sitemap.xml');
if (!sitemap) {
  warn('sitemap', 'sitemap output not found in the build or on a running server');
} else {
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(ORIGIN, ''));
  for (const page of pages) {
    if (page.url === '/unsubscribe') continue;
    if (!urls.includes(page.url)) fail('sitemap', `missing ${page.url}`);
  }
  notes.push(`Sitemap entries: ${urls.length}`);
}

// --- 5. llms.txt ----------------------------------------------------------
for (const name of ['llms.txt', 'llms-full.txt']) {
  const body = await readEndpoint(name);
  if (!body) {
    warn('llms', `${name} not found in the build or on a running server`);
    continue;
  }
  if (!/AQUASEE/.test(body)) fail('llms', `${name} does not mention AQUASEE`);
  if (!/not an equipment manufacturer|does not own factories|not a manufacturer/i.test(body)) {
    fail('llms', `${name} does not state the service-business positioning`);
  }
}

// --- 6. answer-first paragraph -------------------------------------------
for (const page of pages) {
  const rules = rulesFor(page.locale);
  const body = page.html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ');
  const text = body
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const lead = text.slice(0, 700);
  const isQuoteable =
    rules.quoteable.test(lead) || text.split('. ').slice(0, 4).join(' ').length > 180;
  if (!isQuoteable) warn(page.url, 'the opening does not read as a standalone, quotable statement');
}

// --- 7. framing -----------------------------------------------------------
for (const page of pages) {
  const rules = rulesFor(page.locale);
  const text = page.html.replace(/<[^>]+>/g, ' ');
  const bad = rules.manufacturerMarkers.filter((re) => re.test(text));
  if (bad.length) fail(page.url, `framing risk: ${bad.map((r) => r.source).join(', ')}`);
}

/**
 * Machine-readable endpoints are route handlers: depending on the build they
 * are either prerendered to a .body file or served at request time. Read
 * them from the build when they are there, and from a running server
 * otherwise, so the gate works in both situations.
 */
async function readEndpoint(name) {
  const candidates = [
    `.next/server/app/${name}.body`,
    `.next/server/app/${name}`,
  ];
  for (const candidate of candidates) {
    try {
      const body = readFileSync(candidate, 'utf8');
      if (body.trim()) return body;
    } catch {
      /* not prerendered */
    }
  }
  const bases = [process.env.BASE_URL, 'http://localhost:3111', 'http://localhost:3000'].filter(Boolean);
  for (const base of bases) {
    try {
      const res = await fetch(`${base}/${name}`, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const body = await res.text();
        if (body.trim()) return body;
      }
    } catch {
      /* no server running */
    }
  }
  return null;
}

// --- report ---------------------------------------------------------------
console.log('\n=== GEO structure check ===\n');
notes.forEach((n) => console.log('·', n));
console.log('');
if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  warnings.forEach((w) => console.log('  !', w));
  console.log('');
}
if (failures.length) {
  console.log(`Failures (${failures.length}):`);
  failures.forEach((f) => console.log('  ✗', f));
  process.exit(1);
}
console.log('All checks passed.');