import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const raw = readFileSync(resolve(root, 'docs/seo/content/g4/Pool_Shade_Installation_EN_V1.2.md'), 'utf8');
const metadata = JSON.parse(readFileSync(resolve(root, 'docs/seo/content/g4/metadata.json'), 'utf8'));
const decision = JSON.parse(readFileSync(resolve(root, 'docs/seo/g4-release.json'), 'utf8'));
const sourceSha256 = sha256(raw);
if (decision.sourceSha256 !== sourceSha256) throw new Error('G4 source differs from the release decision.');
if (!decision.approvedBy || !decision.decisionRef || !Number.isFinite(Date.parse(decision.publishedAt))) throw new Error('G4 release decision is incomplete.');
for (const asset of Object.values(decision.assets)) {
  if (sha256(readFileSync(resolve(root, `public${asset.src}`))) !== asset.sha256) throw new Error(`G4 image changed: ${asset.src}`);
}
if (sha256(JSON.stringify(decision.assets)) !== decision.assetsSha256) throw new Error('G4 image manifest differs from the release decision.');
const title = 'Pool Shade Sail Installation: What to Check Before You Order';
if (!raw.startsWith(`# ${title}\n`) && !raw.startsWith(`# ${title}\r\n`)) throw new Error('G4 H1 differs from the release title.');
if (/Human editorial approval.*pending|Draft prepared/i.test(raw)) throw new Error('G4 still contains draft review status.');
const guide = { sourceSha256, language: 'en', title, path: '/buying-guides/pool-shade-installation',
  seoTitle: metadata.title, metaDescription: metadata.description, bodyMarkdown: raw, citations: metadata.citations };
const output = `/** Generated and verified by scripts/seo/sync-shade-guide.mjs. */\nexport const shadeGuide = ${JSON.stringify(guide, null, 2)} as const;\nexport const shadeGuideAssets = ${JSON.stringify(decision.assets, null, 2)} as const;\nexport const shadeGuideRelease = ${JSON.stringify({ sourceSha256, assetsSha256: decision.assetsSha256, approvedBy: decision.approvedBy, decisionRef: decision.decisionRef, publishedAt: decision.publishedAt }, null, 2)} as const;\n`;
const target = resolve(root, 'src/content/en/pool-shade-guide.generated.ts');
if (process.argv.includes('--check')) {
  if (readFileSync(target, 'utf8') !== output) throw new Error('G4 generated content differs from its source.');
} else writeFileSync(target, output);
console.log(`G4 content and images verified: ${sourceSha256}`);
