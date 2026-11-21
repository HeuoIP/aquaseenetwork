import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const target = resolve(root, 'src/content/seo/cost-guide-image-manifest.generated.ts');
const paths = [
  'public/images/guides/pool-slide-cost-hero.webp',
  'public/images/guides/pool-slide-cost-design-directions.svg',
  'public/images/guides/pool-slide-cost-material-detail.webp',
  'public/images/guides/pool-slide-cost-project-cost-map.svg',
  'public/images/guides/pool-slide-cost-site-review-zones.svg',
];
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex');
const files = paths.map((path) => ({ path, sha256: sha(readFileSync(resolve(root, path))) }));
const imageManifestSha256 = sha(JSON.stringify(files));
const output = `/** Generated from selected SEO-02 image bytes. Run: node scripts/seo/sync-cost-guide-images.mjs */\nexport const costGuideImageManifest = ${JSON.stringify({ files, imageManifestSha256 }, null, 2)} as const;\n`;
if (process.argv.includes('--check')) {
  if (readFileSync(target, 'utf8') !== output) throw new Error('SEO-02 image manifest differs from current files.');
  console.log('SEO-02 selected image bytes match their manifest.');
} else {
  writeFileSync(target, output);
  console.log(`Synced SEO-02 image manifest: ${imageManifestSha256}`);
}
