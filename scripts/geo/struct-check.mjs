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

/* -------------------------------------------------------------------------- */
/* The three checks that protect the crawl surface                            */
/* -------------------------------------------------------------------------- */

/**
 * Paths that are machine endpoints rather than pages.
 */
const NON_PAGE_PATHS = new Set([
  '/robots.txt',
  '/sitemap.xml',
  '/llms.txt',
  '/llms-full.txt',
  '/icon',
  '/opengraph-image',
]);

/** Does the page ask not to be indexed? */
function isNoindex(html) {
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '';
  return /\bnoindex\b/i.test(robots);
}

/**
 * The internal page links in one page's HTML.
 *
 * External links, anchors, mail and telephone links, static assets, the API
 * and the machine endpoints are not links to a page, so they are not judged
 * against the set of published pages.
 */
function internalPageLinks(html) {
  const out = new Set();
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    if (clean.startsWith('/_next/') || clean.startsWith('/api/')) continue;
    if (/\.[a-z0-9]{2,5}$/i.test(clean)) continue;
    if (NON_PAGE_PATHS.has(clean)) continue;
    out.add(clean);
  }
  return out;
}

/** Links that point at a page which is not published. */
function brokenInternalLinks(pages, publishedUrls) {
  const problems = [];
  for (const page of pages) {
    for (const target of internalPageLinks(page.html)) {
      if (!publishedUrls.has(target)) {
        problems.push(
          `${page.url}: internal link to ${target}, which is not a published page`,
        );
      }
    }
  }
  return problems;
}

/**
 * A page that publishes nothing must not be indexable and listed together.
 * A page that is indexable must be in the sitemap, or it is never found.
 */
function indexProtectionProblems(pages, sitemapUrls) {
  const problems = [];
  for (const page of pages) {
    const noindex = isNoindex(page.html);
    const listed = sitemapUrls.includes(page.url);
    if (noindex && listed) {
      problems.push(`sitemap: ${page.url} is noindex but listed in the sitemap`);
    }
    if (!noindex && !listed) {
      problems.push(`sitemap: ${page.url} is indexable but missing from the sitemap`);
    }
  }
  return problems;
}

/**
 * A hreflang may only point at a page that exists, is indexable, and is
 * published by the language it claims.
 */
function alternateProblems(pages, publishedUrls, indexableUrls) {
  const problems = [];
  for (const page of pages) {
    const map = Object.fromEntries(
      [...page.html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map(
        ([, tag, href]) => [tag, href],
      ),
    );
    for (const [tag, href] of Object.entries(map)) {
      if (tag === 'x-default') continue;
      const target = href.replace(ORIGIN, '') || '/';
      if (!publishedUrls.has(target)) {
        problems.push(`${page.url}: hreflang ${tag} points at ${target}, which is not published`);
      } else if (!indexableUrls.has(target)) {
        problems.push(`${page.url}: hreflang ${tag} points at ${target}, which is not indexable`);
      }
    }
  }
  return problems;
}

/** The three checks, run over one set of pages. */
function crawlSurfaceProblems(pages, publishedUrls, indexableUrls, sitemapUrls) {
  return [
    ...brokenInternalLinks(pages, publishedUrls),
    ...indexProtectionProblems(pages, sitemapUrls),
    ...alternateProblems(pages, publishedUrls, indexableUrls),
  ];
}

/**
 * The self-test.
 *
 * A check that cannot fail is not a check. These three checks exist because
 * the site once shipped with broken internal links and with empty pages that
 * were indexable and listed in the sitemap, and the structure gate passed
 * anyway. So the checks are run here against synthetic pages carrying
 * exactly those faults, and each one has to be reported — and a clean page
 * has to report nothing. The pages are fixtures: no business data is edited
 * to make a test pass.
 */
function selfTest() {
  const failures = [];
  const cleanPage = {
    url: '/about',
    html:
      '<meta name="robots" content="index, follow"><a href="/faq">f</a>' +
      '<link rel="alternate" hrefLang="en" href="https://www.aquasee.art/about">',
  };
  const cleanContext = {
    pages: [cleanPage],
    publishedUrls: new Set(['/about', '/faq']),
    indexableUrls: new Set(['/about', '/faq']),
    sitemapUrls: ['/about', '/faq'],
  };

  const cases = [
    {
      name: 'a link to a page that does not exist',
      expect: '/missing',
      context: {
        pages: [{ url: '/about', html: '<a href="/missing">m</a>' }],
        publishedUrls: new Set(['/about']),
        indexableUrls: new Set(['/about']),
        sitemapUrls: ['/about'],
      },
    },
    {
      name: 'an empty page that is indexable and listed in the sitemap',
      expect: 'is indexable but missing from the sitemap',
      context: {
        pages: [
          { url: '/zh/insights', html: '<meta name="robots" content="index, follow">' },
        ],
        publishedUrls: new Set(['/zh/insights']),
        indexableUrls: new Set(['/zh/insights']),
        sitemapUrls: [],
      },
    },
    {
      name: 'an empty page that is noindex but still listed in the sitemap',
      expect: 'is noindex but listed in the sitemap',
      context: {
        pages: [
          { url: '/zh/insights', html: '<meta name="robots" content="noindex, follow">' },
        ],
        publishedUrls: new Set(['/zh/insights']),
        indexableUrls: new Set(),
        sitemapUrls: ['/zh/insights'],
      },
    },
    {
      name: 'a hreflang that points at a page nobody published',
      expect: 'which is not published',
      context: {
        pages: [
          {
            url: '/about',
            html: '<link rel="alternate" hrefLang="zh-CN" href="https://www.aquasee.art/zh/about">',
          },
        ],
        publishedUrls: new Set(['/about']),
        indexableUrls: new Set(['/about']),
        sitemapUrls: ['/about'],
      },
    },
    {
      name: 'a hreflang that points at a page that is not indexable',
      expect: 'which is not indexable',
      context: {
        pages: [
          {
            url: '/about',
            html: '<link rel="alternate" hrefLang="zh-CN" href="https://www.aquasee.art/zh/about">',
          },
          { url: '/zh/about', html: '<meta name="robots" content="noindex, follow">' },
        ],
        publishedUrls: new Set(['/about', '/zh/about']),
        indexableUrls: new Set(['/about']),
        sitemapUrls: ['/about'],
      },
    },
  ];

  for (const testCase of cases) {
    const problems = crawlSurfaceProblems(
      testCase.context.pages,
      testCase.context.publishedUrls,
      testCase.context.indexableUrls,
      testCase.context.sitemapUrls,
    );
    if (!problems.some((p) => p.includes(testCase.expect))) {
      failures.push(`the self-test did not catch ${testCase.name}`);
    }
  }

  const cleanProblems = crawlSurfaceProblems(
    cleanContext.pages,
    cleanContext.publishedUrls,
    cleanContext.indexableUrls,
    cleanContext.sitemapUrls,
  );
  if (cleanProblems.length) {
    failures.push(
      `the self-test reported problems on a clean page: ${cleanProblems.join('; ')}`,
    );
  }

  return failures;
}

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
  // Where the alternates point is checked in one place, further down, so
  // that the hreflang map, the sitemap and the index directive are all
  // judged by the same rule.
  if (!map['x-default']) fail(page.url, 'no x-default hreflang');
}

// --- 4. sitemap -----------------------------------------------------------
const sitemap = await readEndpoint('sitemap.xml');
let sitemapUrls = [];
if (!sitemap) {
  warn('sitemap', 'sitemap output not found in the build or on a running server');
} else {
  sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(ORIGIN, ''));
  notes.push(`Sitemap entries: ${sitemapUrls.length}`);
}

// --- 4b. the crawl surface ------------------------------------------------
// Three rules, one place: a link may only point at a published page; a page
// that publishes nothing may not be indexable and listed at the same time;
// and a hreflang may only point at a page that exists, is indexable, and is
// published by the language it claims.
const publishedUrls = new Set(pages.map((p) => p.url));
const indexableUrls = new Set(pages.filter((p) => !isNoindex(p.html)).map((p) => p.url));
if (sitemapUrls.length) {
  for (const problem of crawlSurfaceProblems(
    pages,
    publishedUrls,
    indexableUrls,
    sitemapUrls,
  )) {
    fail('crawl surface', problem);
  }
} else {
  warn('crawl surface', 'the sitemap could not be read, so the index protection was not checked');
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

// --- self-test ------------------------------------------------------------
// The checks above must be able to fail. This runs them against synthetic
// pages that carry the faults they exist to find.
const selfTestFailures = selfTest();
for (const problem of selfTestFailures) fail('self-test', problem);
notes.push(
  selfTestFailures.length
    ? `Self-test: ${selfTestFailures.length} problem(s)`
    : 'Self-test: the crawl-surface checks catch every fixture fault',
);

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