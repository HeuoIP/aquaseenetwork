import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const source = resolve(root, 'docs/seo/content/seo-03/AQUASEE_SEO03_Splash_Pad_Features_Article_EN.md');
const target = resolve(root, 'src/content/en/splash-pad-features.generated.ts');
const raw = readFileSync(source, 'utf8');
const cover = readFileSync(resolve(root, 'public/images/concepts/splash-play-facilities-v3.webp'));
if (createHash('sha256').update(cover).digest('hex') !== 'ed1823d2f108f2131fcf71bd418285ed609b0de2b172b3938190f71b657277db') throw new Error('SEO-03 approved cover bytes changed.');
const title = 'Interactive Splash Pad Features for Small Resorts and Holiday Parks: What to Plan Before You Buy';
if (!raw.startsWith(`# ${title}\n`) && !raw.startsWith(`# ${title}\r\n`)) throw new Error('SEO-03 approved H1 changed.');
if (/Draft for editorial review|AQUASEE (?:has|offers|sells) (?:certified|approved) splash/i.test(raw)) throw new Error('SEO-03 release wording check failed.');
const guide = {
  sourceSha256: createHash('sha256').update(raw).digest('hex'), language: 'en', title,
  path: '/buying-guides/splash-pad-features-small-resorts',
  seoTitle: 'Interactive Splash Pad Features for Small Resorts | AQUASEE',
  metaDescription: 'Plan splash pad features for a small resort or holiday park. Compare play interactions, water systems, drainage, safety scope and the information suppliers need.',
  bodyMarkdown: raw,
};
const output = `/** Generated from approved SEO-03 Markdown. */\nexport const splashGuide = ${JSON.stringify(guide, null, 2)} as const;\n`;
if (process.argv.includes('--check')) {
  if (readFileSync(target, 'utf8') !== output) throw new Error('SEO-03 source and generated content differ.');
} else writeFileSync(target, output);
console.log(`SEO-03 content: ${guide.sourceSha256}`);
