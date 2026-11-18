import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '../../.next/server/app');
const files = [];
function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(path);
  }
}
walk(root);
assert.ok(files.length > 0, 'built HTML files exist');
let socialImages = 0;
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  for (const tag of html.match(/<meta\b[^>]*>/g) ?? []) {
    if (!/(?:property="og:image"|name="twitter:image")/.test(tag)) continue;
    const url = tag.match(/content="([^"]+)"/)?.[1];
    assert.ok(url, `social image meta has a URL in ${file}`);
    assert.ok(url.startsWith('https://www.aquasee.art/'), `social image uses the canonical host in ${file}: ${url}`);
    socialImages++;
  }
  assert.ok(!html.includes('http://localhost:3000'), `built HTML has localhost fallback: ${file}`);
}
assert.ok(socialImages >= files.length, 'built pages expose social image metadata');
console.log(`Built OG check: ${files.length} HTML pages, ${socialImages} image tags, all on the canonical host; no localhost fallback.`);
