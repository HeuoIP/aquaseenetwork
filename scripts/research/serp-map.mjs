/**
 * R3 — competitor and page-shape mapping.
 *
 * For every seed we capture the top organic results, classify the page shape
 * that wins, and record which domains own which query. The output is the
 * "contestable map": the queries where a service business can realistically
 * compete, as opposed to the product queries that belong to manufacturers.
 *
 * DuckDuckGo throttles scripted traffic aggressively, so this runs slowly and
 * retries with a long backoff. It is meant to be run occasionally, not often.
 *
 *   node scripts/research/serp-map.mjs            # all seeds
 *   node scripts/research/serp-map.mjs --locale=en
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serp, classifyShape, sleep, ThrottledError } from './_ddg.mjs';
import { seeds as seedList } from './seeds.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DATA = resolve(ROOT, 'docs/geo/data');

const argv = process.argv.slice(2);
const argOf = (flag) => {
  const i = argv.indexOf(flag);
  return i >= 0 ? argv[i + 1] : null;
};
const localeFilter = argOf('--locale');
const pace = Number(argOf('--pace') || 6000);

let seeds = seedList.filter((s) => s.q);
if (localeFilter) seeds = seeds.filter((s) => s.locale === localeFilter);

async function withBackoff(fn, attempts = 5) {
  let wait = 20000;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (!(err instanceof ThrottledError)) throw err;
      console.log(`   throttled — waiting ${Math.round(wait / 1000)}s`);
      await sleep(wait);
      wait = Math.min(wait * 1.7, 120000);
    }
  }
  return null;
}

const captured = [];
for (const [i, seed] of seeds.entries()) {
  console.log(`[${i + 1}/${seeds.length}] ${seed.locale} ${seed.pillar} :: ${seed.q}`);
  try {
    const results = await withBackoff(() => serp(seed.q, 10));
    if (!results) {
      console.log('   gave up after retries');
    } else {
      const classified = results.map((r) => ({ ...r, shape: classifyShape(r) }));
      captured.push({ ...seed, results: classified });
      console.log(`   ${classified.length} results :: ${classified.map((c) => c.shape).join(', ')}`);
    }
  } catch (err) {
    console.log(`   error: ${err.message}`);
  }
  await sleep(pace + Math.floor(Math.random() * 2000));
}

// --- aggregation -----------------------------------------------------------
const shapeCounts = new Map();
const domainCounts = new Map();
const domainPillar = new Map();
const byShape = new Map();

for (const entry of captured) {
  for (const r of entry.results) {
    shapeCounts.set(r.shape, (shapeCounts.get(r.shape) || 0) + 1);
    domainCounts.set(r.domain, (domainCounts.get(r.domain) || 0) + 1);
    const per = domainPillar.get(r.domain) || new Map();
    per.set(entry.pillar, (per.get(entry.pillar) || 0) + 1);
    domainPillar.set(r.domain, per);
    const shape = byShape.get(r.shape) || [];
    shape.push(`${entry.q} → ${r.domain}`);
    byShape.set(r.shape, shape);
  }
}

const rank = (m) => [...m.entries()].sort((a, b) => b[1] - a[1]);

mkdirSync(DATA, { recursive: true });
writeFileSync(
  resolve(DATA, 'serp.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), seeds: captured }, null, 2),
);

const lines = [];
lines.push('# Competitive and page-shape map — R3');
lines.push('');
lines.push(`Generated: ${new Date().toISOString()}`);
lines.push(`Seeds captured: ${captured.length} of ${seeds.length}`);
lines.push('');
lines.push('## Which page shapes win these queries');
lines.push('');
lines.push('| Shape | Results won | Reading |');
lines.push('| --- | --- | --- |');
const reading = {
  guide: 'A guide, checklist or explainer — the shape we must produce',
  faq: 'A question-and-answer page — the shape the FAQ and this library produce',
  standard: 'A standard or specification page — the shape our standards articles must match',
  listicle: 'A curated list — highly citable, and open to us',
  product: 'A product or catalogue page — owned by manufacturers, not our battlefield',
  supplier: 'A supplier page — owned by manufacturers, not our battlefield',
  'case-study': 'A project page — we cannot match it until we can publish real work',
  other: 'Something else',
};
for (const [shape, n] of rank(shapeCounts)) {
  lines.push(`| ${shape} | ${n} | ${reading[shape] ?? ''} |`);
}
lines.push('');
lines.push('## Domains most present across the query set');
lines.push('');
lines.push('| Domain | Results | Capabilities it appears for |');
lines.push('| --- | --- | --- |');
for (const [domain, n] of rank(domainCounts).slice(0, 30)) {
  const ps = [...(domainPillar.get(domain) || new Map()).entries()]
    .map(([p, c]) => `${p} (${c})`)
    .join(', ');
  lines.push(`| ${domain} | ${n} | ${ps} |`);
}
lines.push('');
lines.push('## Contestable map');
lines.push('');
lines.push('Queries where a service business can compete, and the shape that wins each.');
lines.push('');
for (const [shape, items] of byShape) {
  lines.push(`### ${shape}`);
  lines.push('');
  for (const item of items) lines.push(`- ${item}`);
  lines.push('');
}
writeFileSync(resolve(ROOT, 'docs/geo/competitive-map.md'), lines.join('\n'));

console.log(`\nCaptured ${captured.length}/${seeds.length} SERPs.`);