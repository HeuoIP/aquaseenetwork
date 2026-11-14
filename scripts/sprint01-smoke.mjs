import assert from 'node:assert/strict';

const root = process.env.PREVIEW_ORIGIN ?? 'http://127.0.0.1:3101';
const commercialPaths = [
  '/', '/collections/pool-slides', '/collections/pool-shade',
  '/collections/compact-water-parks', '/collections/splash-play-facilities',
  '/concept-collection', '/inquiry/business', '/inquiry/personal',
  '/dealer-program', '/installation-partners', '/about', '/contact',
];
const sitemap = await fetch(root + '/sitemap.xml').then((res) => res.text());
for (const path of commercialPaths) {
  const response = await fetch(root + path);
  assert.equal(response.status, 200, `${path} status`);
  const html = await response.text();
  assert.match(html, /<h1[ >]/, `${path} h1`);
  assert.doesNotMatch(html, /name="robots" content="noindex/i, `${path} index`);
  assert.match(html, /https:\/\/www\.aquasee\.art/, `${path} absolute origin`);
  assert.ok(sitemap.includes(`https://www.aquasee.art${path === '/' ? '/' : path}</loc>`), `${path} sitemap`);
}
const catalog = await fetch(root + '/products').then((res) => res.text());
assert.match(catalog, /name="robots" content="noindex/i);
assert.ok(!sitemap.includes('https://www.aquasee.art/products</loc>'));
for (const path of ['/products/pool-slides', '/products/unapproved-sku', '/zh/concept-collection', '/ar/dealer-program']) {
  assert.equal((await fetch(root + path)).status, 404, `${path} unpublished`);
}
const legacy = await fetch(root + '/strategy').then((res) => res.text());
assert.match(legacy, /name="robots" content="noindex/i);
const concepts = await fetch(root + '/concept-collection').then((res) => res.text());
assert.match(concepts, /Not manufactured or engineering verified/);
const llms = await fetch(root + '/llms.txt').then((res) => res.text());
assert.match(llms, /No individual AQUASEE product SKU is currently published/);
assert.doesNotMatch(llms, /AQUASEE is a service business/);
for (const slug of ['pool-slides', 'pool-shade', 'compact-water-parks', 'splash-play-facilities']) {
  assert.equal((await fetch(root + `/images/concepts/${slug}.webp`)).status, 200);
}
const bad = await fetch(root + '/api/inquiry', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ leadType: 'b2c_product', name: 'A', email: 'not-an-email', description: 'short' }),
});
assert.equal(bad.status, 400);
console.log(`Sprint 01 smoke passed: ${commercialPaths.length} commercial routes, release gates, concept disclosure, SEO endpoints, images and invalid inquiry.`);
