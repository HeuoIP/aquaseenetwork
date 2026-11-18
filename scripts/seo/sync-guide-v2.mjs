import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const source = resolve(root, 'docs/seo/content/AQUASEE_Residential_Pool_Slide_Buying_Guide_Draft_V2.md');
const target = resolve(root, 'src/content/en/pool-slide-guide-v2.generated.ts');
const raw = readFileSync(source, 'utf8');
const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
if (!match) throw new Error('The V2 guide must retain its frontmatter and body.');

const fields = Object.fromEntries(match[1].split(/\r?\n/).filter(Boolean).map((line) => {
  const split = line.indexOf(':');
  if (split < 1) throw new Error(`Invalid V2 frontmatter line: ${line}`);
  return [line.slice(0, split), line.slice(split + 1).trim()];
}));
for (const key of ['status', 'topic', 'proposed_path', 'seo_title', 'meta_description', 'review_date']) {
  if (!fields[key]) throw new Error(`Missing V2 field: ${key}`);
}
if (fields.proposed_path !== '/buying-guides/choose-a-pool-slide') throw new Error('Unexpected V2 path.');
if (!match[2].trimStart().startsWith(`# ${fields.topic}\n`) && !match[2].trimStart().startsWith(`# ${fields.topic}\r\n`)) {
  throw new Error('V2 H1 differs from its topic.');
}

const guide = {
  sourceSha256: createHash('sha256').update(raw).digest('hex'),
  editorialStatus: fields.status,
  language: fields.language,
  title: fields.topic,
  path: fields.proposed_path,
  seoTitle: fields.seo_title,
  metaDescription: fields.meta_description,
  reviewDate: fields.review_date,
  bodyMarkdown: match[2],
};
const output = `/** Generated verbatim from the Work V2 article. Run: node scripts/seo/sync-guide-v2.mjs */\nexport const poolSlideGuideV2 = ${JSON.stringify(guide, null, 2)} as const;\n`;
if (process.argv.includes('--check')) {
  if (readFileSync(target, 'utf8') !== output) {
    console.error('V2 article source and generated content differ. Review and run the sync script before building.');
    process.exitCode = 1;
  } else {
    console.log('V2 guide content matches its source.');
  }
} else {
  writeFileSync(target, output);
  console.log(`Synced Work V2 guide: ${guide.sourceSha256}`);
}
