import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { toString } from 'mdast-util-to-string';

const base = process.env.PREVIEW_ORIGIN ?? 'http://127.0.0.1:8788';
const output = process.env.PREVIEW_SCREENSHOT_DIR ?? 'docs/previews/wp-seo-02';
const sourceRaw = readFileSync('docs/seo/content/AQUASEE_Residential_Pool_Slide_Buying_Guide_Draft_V2.md', 'utf8');
const sourceMatch = sourceRaw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
assert.ok(sourceMatch, 'V2 source has frontmatter and body');
const sourceFields = Object.fromEntries(sourceMatch[1].split(/\r?\n/).filter(Boolean).map((line) => {
  const separator = line.indexOf(':');
  return [line.slice(0, separator), line.slice(separator + 1).trim()];
}));
const sourceTree = unified().use(remarkParse).use(remarkGfm).parse(sourceMatch[2]);
const sourceBlocks = [];
const sourceHeadings = [];
const sourceLinks = [];
function collectSource(node) {
  if (node.type === 'link' && /^https?:\/\//.test(node.url)) sourceLinks.push(node.url);
  if (['heading', 'paragraph', 'tableCell'].includes(node.type)) {
    const value = toString(node);
    if (value) sourceBlocks.push(value);
    if (node.type === 'heading') sourceHeadings.push({ depth: node.depth, text: value });
  }
  if (node.children) for (const child of node.children) collectSource(child);
}
collectSource(sourceTree);
const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
try {
  for (const width of [1440, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: width === 1440 ? 900 : 844 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const path of ['/buying-guides', '/buying-guides/choose-a-pool-slide']) {
      const response = await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
      assert.equal(response?.status(), 200, `${path} HTTP 200`);
      assert.equal(await page.locator('main h1').count(), 1, `${path} has one H1`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      assert.ok(overflow <= 2, `${path} has ${overflow}px overflow at ${width}px`);
      if (width !== 320) await page.screenshot({ path: `${output}/${path.includes('choose-a-pool-slide') ? 'article' : 'index'}-${width}.png`, fullPage: false });
      if (path.includes('choose-a-pool-slide')) {
        if (width === 1440) {
          assert.equal(await page.title(), sourceFields.seo_title);
          assert.equal(await page.locator('meta[name="description"]').getAttribute('content'), sourceFields.meta_description);
          assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://www.aquasee.art/buying-guides/choose-a-pool-slide');
          assert.match(await page.locator('meta[name="robots"]').getAttribute('content') ?? '', /index/);
          assert.doesNotMatch(await page.locator('meta[name="robots"]').getAttribute('content') ?? '', /noindex/);
          const socialImages = await page.locator('meta[property="og:image"], meta[name="twitter:image"]').evaluateAll((elements) => elements.map((element) => element.getAttribute('content')));
          assert.ok(socialImages.length >= 2 && socialImages.every((url) => url?.startsWith('https://www.aquasee.art/')), 'runtime social images use canonical host');
          assert.ok(socialImages.every((url) => url?.includes('/images/guides/choose-a-pool-slide-hero-mj-v2.webp')), 'social images use the new guide cover');
          const structured = await page.locator('script[type="application/ld+json"]').allTextContents();
          const jsonLd = structured.map((entry) => JSON.parse(entry));
          const article = jsonLd.find((entry) => entry['@type'] === 'Article');
          assert.ok(article, 'Article JSON-LD exists');
          assert.equal(article.headline, 'How to Choose a Residential Pool Slide');
          assert.equal(article.datePublished, '2026-11-18T00:16:00Z', 'Article uses the recorded release date');
          assert.equal(article.author, undefined, 'draft has no unverified author attribution');
          assert.ok(jsonLd.some((entry) => entry['@type'] === 'BreadcrumbList'), 'Breadcrumb JSON-LD exists');
          assert.ok(!jsonLd.some((entry) => ['Product', 'Offer', 'FAQPage'].includes(entry['@type'])), 'no unsupported schema');
          const renderedHeadings = [
            { depth: 1, text: await page.locator('main h1').innerText() },
            ...await page.locator('main article h2, main article h3').evaluateAll((elements) => elements.map((element) => ({ depth: Number(element.tagName.slice(1)), text: element.textContent.trim() }))),
          ];
          assert.deepEqual(renderedHeadings, sourceHeadings, 'every V2 heading and level matches the page');
          const renderedLinks = await page.locator('main article a[href^="https://"]').evaluateAll((elements) => elements.map((element) => element.getAttribute('href')));
          assert.deepEqual(renderedLinks, sourceLinks, 'all six source URLs and their order match V2');
          const renderedText = normalizeText(await page.locator('main').innerText());
          let cursor = 0;
          for (const [index, block] of sourceBlocks.entries()) {
            const found = renderedText.indexOf(normalizeText(block), cursor);
            assert.ok(found >= 0, `V2 text block ${index + 1} is present in order: ${block.slice(0, 70)}`);
            cursor = found + normalizeText(block).length;
          }
          assert.equal(await page.locator('main article').getByText('Editorial boundary:', { exact: false }).count(), 1, 'editorial boundary remains visible');
          const internalLinks = [...new Set(await page.locator('main a[href^="/"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')).filter(Boolean)))];
          for (const href of internalLinks) {
            const linked = await page.request.get(new URL(href, base).toString());
            assert.equal(linked.status(), 200, `internal link ${href}`);
          }
          const sitemap = await page.request.get(`${base}/sitemap.xml`);
          assert.equal(sitemap.status(), 200, 'sitemap HTTP 200');
          assert.ok((await sitemap.text()).includes('/buying-guides/choose-a-pool-slide'), 'published guide is in sitemap');
          const translated = await page.request.get(`${base}/zh/buying-guides/choose-a-pool-slide`);
          assert.equal(translated.status(), 404, 'unpublished translation has no route');
          const inquiry = await page.request.get(`${base}/inquiry/personal`);
          assert.equal(inquiry.status(), 200, 'personal inquiry HTTP 200');
          const inquiryHtml = await inquiry.text();
          assert.ok(inquiryHtml.includes('No files are uploaded here'), 'inquiry explains file handling');
          assert.ok(!inquiryHtml.includes('type="file"'), 'inquiry has no upload control');
        }
        assert.equal(await page.locator('main table').count(), 1, 'comparison table');
        assert.equal(await page.locator('main img:not([alt])').count(), 0, 'all images have alt');
        assert.equal(await page.locator('main img').count(), 3, 'cover and two MJ concept images');
        const imageSources = await page.locator('main img').evaluateAll((images) => images.map((img) => decodeURIComponent(img.getAttribute('src') ?? '')));
        for (const [name, version] of [['hero', 'v2'], ['zones', 'v2'], ['material', 'v3']]) assert.ok(imageSources.some((src) => src.includes(`choose-a-pool-slide-${name}-mj-${version}.webp`)), `${name} uses selected MJ image`);
        assert.ok(imageSources.every((src) => !src.includes('pool-slides-v2.webp')), 'guide no longer reuses the homepage cover');
        assert.equal(await page.locator('main article figure').first().locator('figcaption li').count(), 5, 'five site-discussion markers are explained');
        for (const image of await page.locator('main img').all()) {
          await image.scrollIntoViewIfNeeded();
          await image.evaluate((element) => element.decode());
        }
        if (width !== 320) {
          for (const [index, name] of ['zones', 'material'].entries()) {
            await page.locator('main article figure').nth(index).screenshot({ path: `${output}/${name}-${width}.png` });
          }
        }
        assert.equal(await page.locator('main img').evaluateAll((images) => images.every((img) => img.complete && img.naturalWidth > 0)), true, 'all concept images loaded');
        assert.equal(await page.locator('main figure').getByText('AI concept visualization', { exact: false }).count() >= 3, true, 'concept disclosures visible');
        assert.equal(await page.locator('main h3').filter({ hasText: 'Can adults use a residential pool slide?' }).count(), 1, 'FAQ visible');
        assert.equal(await page.locator('main a[href="/inquiry/personal"]').count() >= 2, true, 'mid and end CTAs');
        const toc = page.locator('nav[aria-label="On this page"] a[href^="#"]:visible').first();
        if (width < 1024) await page.locator('nav[aria-label="On this page"]:visible summary').click();
        const anchor = await toc.getAttribute('href');
        await toc.click();
        assert.equal(new URL(page.url()).hash, anchor, 'TOC anchor navigates');
        assert.equal(await page.locator(anchor).count(), 1, 'TOC anchor exists once');
      }
    }
    assert.deepEqual(errors, [], `${width}px client errors`);
    await page.close();
  }
  console.log(`Guide preview: 1440/390/320px, 200, ${sourceBlocks.length} V2 text blocks, ${sourceHeadings.length} headings and ${sourceLinks.length} source URLs match; SEO/JSON-LD/sitemap/links, no overflow or JS errors, TOC/FAQ/image/CTA passed.`);
} finally { await browser.close(); }
