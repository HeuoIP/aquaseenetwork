import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const root = process.env.PREVIEW_ORIGIN ?? 'http://127.0.0.1:3101';
const output = process.env.PREVIEW_OUTPUT ?? 'docs/previews/sprint01';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const [name, path] of [
      ['home', '/'], ['slides', '/collections/pool-slides'],
      ['shade', '/collections/pool-shade'],
      ['splash', '/collections/splash-play-facilities'],
      ['micro-park', '/collections/compact-water-parks'],
      ['concepts', '/concept-collection'],
      ['personal-inquiry', '/inquiry/personal'],
    ]) {
      await page.goto(root + path, { waitUntil: 'networkidle' });
      const dimensions = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      assert.ok(dimensions.scroll <= dimensions.client + 2, `${name} ${viewport.width}px horizontal overflow: ${JSON.stringify(dimensions)}`);
      assert.equal(await page.locator('h1').count(), 1, `${name} one h1`);
      await page.screenshot({ path: `${output}/${name}-${viewport.width}.png`, fullPage: false });
    }
    if (viewport.width === 390) {
      const b2c = page.locator('form');
      assert.equal(await b2c.locator('input[name="company"]').count(), 0, 'personal inquiry has no company field');
    }
    assert.deepEqual(errors, [], `${viewport.width}px client errors`);
    await page.close();
  }
  console.log('Sprint 01 browser check passed: desktop/mobile visual captures, no horizontal overflow, single h1, no client errors, B2C company optional.');
} finally {
  await browser.close();
}
