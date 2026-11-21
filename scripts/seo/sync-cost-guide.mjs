import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const source = resolve(root, 'docs/seo/content/seo-02/AQUASEE_SEO02_Residential_Pool_Slide_Cost_Article_EN_V2.1.md');
const target = resolve(root, 'src/content/en/pool-slide-cost-v21.generated.ts');
const raw = readFileSync(source, 'utf8');
const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
if (!match) throw new Error('SEO-02 V2.1 article requires frontmatter and body.');
const fields = Object.fromEntries(match[1].split(/\r?\n/).filter(Boolean).map((line) => {
  const split = line.indexOf(':');
  if (split < 1) throw new Error(`Invalid frontmatter line: ${line}`);
  return [line.slice(0, split), line.slice(split + 1).trim()];
}));
for (const key of ['status', 'language', 'proposed_url', 'seo_title', 'meta_description', 'evidence_observed']) {
  if (!fields[key]) throw new Error(`Missing SEO-02 field: ${key}`);
}
if (fields.language !== 'en' || fields.proposed_url !== '/buying-guides/pool-slide-total-cost') {
  throw new Error('Unexpected SEO-02 language or URL.');
}
const title = 'How Much Does a Residential Pool Slide Cost?';
if (!match[2].trimStart().startsWith(`# ${title}\n`) && !match[2].trimStart().startsWith(`# ${title}\r\n`)) {
  throw new Error('SEO-02 H1 differs from approved title.');
}
if (/£97,950|£110,950/.test(match[2])) throw new Error('Orchid numeric price must not appear in published body.');
const guide = {
  sourceSha256: createHash('sha256').update(raw).digest('hex'),
  language: fields.language,
  title,
  path: fields.proposed_url,
  seoTitle: fields.seo_title,
  metaDescription: fields.meta_description,
  evidenceObserved: fields.evidence_observed,
  bodyMarkdown: match[2],
};
const output = `/** Generated from approved SEO-02 V2.1 Markdown. Run: node scripts/seo/sync-cost-guide.mjs */\nexport const poolSlideCostV21 = ${JSON.stringify(guide, null, 2)} as const;\n`;
if (process.argv.includes('--check')) {
  if (readFileSync(target, 'utf8') !== output) throw new Error('SEO-02 article source and generated content differ.');
  console.log('SEO-02 V2.1 content matches its source.');
} else {
  writeFileSync(target, output);
  console.log(`Synced SEO-02 V2.1: ${guide.sourceSha256}`);
}
