import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright-core';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { toString } from 'mdast-util-to-string';

const base = process.env.PREVIEW_ORIGIN ?? 'http://127.0.0.1:8791';
const output = process.env.PREVIEW_SCREENSHOT_DIR ?? 'docs/previews/g4-worker';
const path = '/buying-guides/pool-shade-installation';
const source = readFileSync('docs/seo/content/g4/Pool_Shade_Installation_EN_V1.2.md', 'utf8');
const decision = JSON.parse(readFileSync('docs/seo/g4-release.json', 'utf8'));
const metadata = JSON.parse(readFileSync('docs/seo/content/g4/metadata.json', 'utf8'));
const tree = unified().use(remarkParse).use(remarkGfm).parse(source);
const blocks = [];
const headings = [];
function collect(node) {
  if (['paragraph', 'heading', 'tableCell'].includes(node.type)) blocks.push(toString(node));
  if (node.type === 'heading') headings.push({ level: node.depth, text: toString(node) });
  for (const child of node.children ?? []) collect(child);
}
collect(tree);
const normalize = (value) => value.replace(/\s+/g, ' ').trim();
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
const result = { base, checkedAt: new Date().toISOString(), sourceBlocks: blocks.length, viewports: [], assets: [], routes: [] };
try {
  for (const width of [1440, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    assert.equal(await page.locator('main h1').count(), 1);
    assert.equal(await page.title(), metadata.title);
    assert.equal(await page.locator('meta[name="description"]').getAttribute('content'), metadata.description);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://www.aquasee.art${path}`);
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    assert.ok(robots.includes('index') && !robots.includes('noindex'));
    assert.deepEqual((await page.locator('link[rel="alternate"][hreflang]').evaluateAll((elements) => elements.map((element) => element.hreflang))).sort(), ['en', 'x-default']);
    const actualHeadings = await page.locator('main h1, main h2, main h3').evaluateAll((elements) => elements.map((element) => ({ level: Number(element.tagName[1]), text: element.textContent })));
    assert.deepEqual(actualHeadings, headings);
    const text = normalize(await page.locator('main').innerText());
    for (const block of blocks) assert.ok(text.includes(normalize(block)), `Missing source block: ${block.slice(0, 70)}`);
    assert.ok(!text.includes('Human editorial approval'));
    assert.equal(await page.getByRole('link', { name: 'Open full-size diagram', exact: true }).count(), 2);
    const graphs = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(JSON.parse).flatMap((node) => node['@graph'] ?? [node]);
    const article = graphs.find((node) => node['@type'] === 'Article');
    assert.equal(article.headline, headings[0].text);
    assert.equal(article.datePublished, decision.publishedAt);
    assert.equal(article.author, undefined);
    assert.deepEqual(article.citation, metadata.citations);
    assert.ok(graphs.some((node) => node['@type'] === 'WebPage'));
    assert.ok(graphs.some((node) => node['@type'] === 'BreadcrumbList'));
    assert.ok(!graphs.some((node) => ['FAQPage', 'Product', 'Offer', 'AggregateRating'].includes(node['@type'])));
    assert.equal(await page.locator('meta[property="og:image"]').first().getAttribute('content'), `https://www.aquasee.art${decision.assets.cover.src}`);
    for (const asset of Object.values(decision.assets)) {
      const image = page.locator(`main img[src="${asset.src}"]`);
      assert.equal(await image.count(), 1);
      await image.scrollIntoViewIfNeeded();
      await page.waitForFunction((src) => {
        const image = document.querySelector(`main img[src="${src}"]`);
        return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0;
      }, asset.src);
      assert.ok(await image.evaluate((element) => element.complete && element.naturalWidth > 0));
      assert.equal(await image.getAttribute('alt'), asset.alt);
      assert.ok(text.includes(asset.caption));
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.ok(overflow <= 2, `${width}px page overflow ${overflow}`);
    assert.deepEqual(errors, []);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `${output}/article-${width}.png`, fullPage: false });
    await page.locator(`main img[src="${decision.assets.zones.src}"]`).scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${output}/diagram-${width}.png`, fullPage: false });
    result.viewports.push({ width, overflow, javascriptErrors: errors, status: 'PASS' });
    await page.close();
  }
  const request = await browser.newContext();
  for (const asset of Object.values(decision.assets)) {
    const response = await request.request.get(`${base}${asset.src}`);
    assert.equal(response.status(), 200);
    const sha256 = createHash('sha256').update(await response.body()).digest('hex');
    assert.equal(sha256, asset.sha256);
    result.assets.push({ path: asset.src, status: response.status(), sha256 });
  }
  for (const route of ['/buying-guides', '/collections/pool-shade', '/buying-guides/choose-a-pool-slide', '/buying-guides/pool-slide-total-cost', '/buying-guides/splash-pad-features-small-resorts', '/inquiry/personal', '/inquiry/business', '/sitemap.xml', '/llms.txt', '/llms-full.txt']) {
    const response = await request.request.get(`${base}${route}`);
    assert.equal(response.status(), 200);
    if (['/buying-guides', '/collections/pool-shade', '/sitemap.xml', '/llms.txt', '/llms-full.txt'].includes(route)) assert.ok((await response.text()).includes(path), `${route} links to G4`);
    result.routes.push({ path: route, status: response.status() });
  }
  for (const locale of ['zh', 'ar', 'ru']) assert.equal((await request.request.get(`${base}/${locale}${path}`)).status(), 404);
  result.status = 'PASS';
  await writeFile(`${output}/check.json`, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
