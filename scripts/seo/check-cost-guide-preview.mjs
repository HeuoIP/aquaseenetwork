import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const base = process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:3110';
const expectPublished = process.env.EXPECT_PUBLISHED === '1';
const output = 'docs/previews/seo-02-cost/browser';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  for (const width of [1440, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(`${base}/buying-guides/pool-slide-total-cost`, { waitUntil: 'networkidle' });
    assert.equal(response?.status(), 200);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('h1').innerText(), 'How Much Does a Residential Pool Slide Cost?');
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://www.aquasee.art/buying-guides/pool-slide-total-cost');
    const robots = await page.locator('meta[name="robots"]').getAttribute('content') ?? '';
    assert.equal(robots.includes('noindex'), !expectPublished, 'robots state must match release decision');
    const body = await page.locator('body').innerText();
    for (const phrase of ['Out of stock', 'Price not quoted here; request a current project quote', 'illustrative supplier examples', 'delivery postcode', 'project timeline']) assert.ok(body.toLowerCase().includes(phrase.toLowerCase()), `Missing: ${phrase}`);
    assert.ok(!/£97,950|£110,950/.test(body), 'Orchid numbers must not appear in public body');
    assert.equal(await page.locator('article img').count(), 4, 'four supporting visual assets render in article body');
    for (const image of await page.locator('article img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((node) => node.decode());
    }
    const images = await page.locator('img').evaluateAll((nodes) => nodes.map((node) => ({ src: node.getAttribute('src'), loaded: node.complete && node.naturalWidth > 0 })));
    assert.ok(images.every((item) => item.loaded), `Broken image: ${JSON.stringify(images.filter((item) => !item.loaded))}`);
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    assert.ok(schemas.some((value) => value.includes('"@type":"Article"')));
    assert.ok(!schemas.some((value) => /"@type":"(?:Product|Offer)"/.test(value)));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert.ok(overflow <= 1, `Page-wide horizontal overflow: ${overflow}px at ${width}px`);
    assert.deepEqual(errors, []);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${output}/cost-guide-${width}.png`, fullPage: false });
    await page.close();
  }
  const sitemap = await fetch(`${base}/sitemap.xml`).then((response) => response.text());
  assert.equal(sitemap.includes('/buying-guides/pool-slide-total-cost'), expectPublished, 'sitemap state must match release decision');
  const translation = await fetch(`${base}/zh/buying-guides/pool-slide-total-cost`);
  assert.equal(translation.status, 404, 'unpublished translation must return 404');
  console.log(`SEO-02 ${expectPublished ? 'release' : 'preview'}: 1440/390/320px, metadata, body claims, four supporting images, schema, sitemap and translation gate passed.`);
} finally {
  await browser.close();
}
