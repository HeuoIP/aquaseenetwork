#!/usr/bin/env node
/**
 * R2 — Demand mining.
 *
 * For every seed we collect two independent kinds of evidence:
 *
 *   1. DuckDuckGo autocomplete — how buyers actually phrase the question.
 *      This is the closest thing to a real query log we can get without
 *      spending money on a keyword platform.
 *   2. The top 10 organic results — which page *shape* wins the query, and
 *      which domains own it. AI engines preferentially cite pages whose form
 *      matches the question, so this decides what we build, not just what we
 *      write about.
 *
 * Usage:
 *   node scripts/research/demand.mjs                # all seeds
 *   node scripts/research/demand.mjs --locale=en    # one locale
 *   node scripts/research/demand.mjs --pillar=strategy
 */

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';

const readJson = (path) => (existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {});
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { autocomplete, serp, classifyShape, sleep, ThrottledError } from './_ddg.mjs';
import { seeds as seedList } from './seeds.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DATA = resolve(ROOT, 'docs/geo/data');

const argv = process.argv.slice(2);
const argOf = (flag) => {
  const i = argv.indexOf(flag);
  return i >= 0 ? argv[i + 1] : null;
};

const localeFilter = argOf('--locale');
const pillarFilter = argOf('--pillar');
const limit = Number(argOf('--limit') || 0);

let seeds = seedList.filter((s) => s.q);
if (localeFilter) seeds = seeds.filter((s) => s.locale === localeFilter);
if (pillarFilter) seeds = seeds.filter((s) => s.pillar === pillarFilter);
if (limit) seeds = seeds.slice(0, limit);

/** Retry through DuckDuckGo's burst throttle with exponential backoff. */
async function withBackoff(fn, fallback) {
  let wait = 12000;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (!(err instanceof ThrottledError)) throw err;
      console.log(`   (throttled — waiting ${Math.round(wait / 1000)}s)`);
      await sleep(wait);
      wait = Math.min(wait * 1.8, 60000);
    }
  }
  return fallback;
}
let consecutiveFailures = 0;
const questionBank = [];
const serpData = [];
const failures = [];

for (const [i, seed] of seeds.entries()) {
  const label = `[${i + 1}/${seeds.length}] ${seed.locale} ${seed.pillar}`;
  try {
    // Sequential, not parallel: DuckDuckGo throttles bursts, and a throttle
    // costs far more time than the two requests themselves.
    const suggestions = await withBackoff(() => autocomplete(seed.q), []);
    await sleep(3200 + Math.floor(Math.random() * 2000));
    const results = await withBackoff(() => serp(seed.q, 10), []);

    for (const phrase of suggestions) {
      questionBank.push({
        phrase,
        seed: seed.q,
        pillar: seed.pillar,
        vertical: seed.vertical,
        locale: seed.locale,
        evidence: `DuckDuckGo autocomplete for "${seed.q}"`,
      });
    }

    const classified = results.map((r) => ({ ...r, shape: classifyShape(r) }));
    serpData.push({ ...seed, results: classified });

    console.log(`${label} :: ${seed.q}`);
    console.log(
      `   +${suggestions.length} phrases | ${classified.length} results | shapes: ${
        classified.map((c) => c.shape).join(', ') || 'none'
      }`,
    );
  } catch (err) {
    failures.push({ seed: seed.q, error: String(err.message || err) });
    console.error(`${label} :: FAILED ${seed.q} -> ${err.message || err}`);
    consecutiveFailures++;
    if (consecutiveFailures >= 6) {
      console.error(
        '\nStopping: the search endpoint is refusing traffic. The capture is resumable — ' +
          'the next run merges with what is already on disk.',
      );
      break;
    }
  }
  await sleep(1800 + Math.floor(Math.random() * 1200));
}

// ---- aggregation ------------------------------------------------------------
const byPhrase = new Map();
for (const q of questionBank) {
  const key = q.phrase.toLowerCase();
  if (!byPhrase.has(key)) byPhrase.set(key, { ...q, seeds: [q.seed] });
  else byPhrase.get(key).seeds.push(q.seed);
}

const shapeCounts = new Map();
const domainCounts = new Map();
const domainByPillar = new Map();
for (const s of serpData) {
  for (const r of s.results) {
    shapeCounts.set(r.shape, (shapeCounts.get(r.shape) || 0) + 1);
    domainCounts.set(r.domain, (domainCounts.get(r.domain) || 0) + 1);
    const p = domainByPillar.get(r.domain) || new Map();
    p.set(s.pillar, (p.get(s.pillar) || 0) + 1);
    domainByPillar.set(r.domain, p);
  }
}

const rank = (m) => [...m.entries()].sort((a, b) => b[1] - a[1]);

await mkdir(DATA, { recursive: true });

// Merge with whatever was captured before. A run that is blocked by the
// search engine must never destroy an earlier capture — losing the question
// bank because a rate limit hit is not an acceptable failure mode.
const previousBank = readJson(resolve(DATA, 'question-bank.json'));
const merged = new Map();
for (const q of previousBank.questions ?? []) merged.set(q.phrase.toLowerCase(), q);
for (const q of byPhrase.values()) merged.set(q.phrase.toLowerCase(), q);

const previousSerp = readJson(resolve(DATA, 'serp.json'));
const mergedSerp = new Map();
for (const s of previousSerp.seeds ?? []) {
  if (s.results?.length) mergedSerp.set(s.seed, s);
}
for (const s of serpData) {
  if (s.results?.length) mergedSerp.set(s.seed, s);
}

await writeFile(
  resolve(DATA, 'question-bank.json'),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      seedCount: seeds.length,
      questions: [...merged.values()],
    },
    null,
    2,
  ),
);
await writeFile(
  resolve(DATA, 'serp.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), seeds: [...mergedSerp.values()] }, null, 2),
);

// ---- human-readable report --------------------------------------------------
const lines = [];
lines.push('# Demand mining — R2');
lines.push('');
lines.push(`Generated: ${new Date().toISOString()}`);
lines.push(`Seeds: ${seeds.length} | unique buyer phrasings collected: ${byPhrase.size}`);
lines.push('');
lines.push('## Page shapes that win the decision & specification queries');
lines.push('');
lines.push('| Shape | Results won |');
lines.push('| --- | --- |');
for (const [shape, n] of rank(shapeCounts)) lines.push(`| ${shape} | ${n} |`);
lines.push('');
lines.push('## Domains most present across the query set');
lines.push('');
lines.push('| Domain | Results | Capabilities it shows up for |');
lines.push('| --- | --- | --- |');
for (const [domain, n] of rank(domainCounts).slice(0, 25)) {
  const ps = [...(domainByPillar.get(domain) || new Map()).entries()].map(([p, c]) => `${p} (${c})`).join(', ');
  lines.push(`| ${domain} | ${n} | ${ps} |`);
}
lines.push('');
lines.push('## Buyer phrasings by pillar');
lines.push('');
for (const pillar of ['strategy', 'creative-design', 'supply-chain']) {
  const rows = [...byPhrase.values()].filter((q) => q.pillar === pillar);
  if (!rows.length) continue;
  lines.push(`### ${pillar} (${rows.length})`);
  lines.push('');
  for (const locale of ['en', 'zh', 'ar', 'ru']) {
    const loc = rows.filter((q) => q.locale === locale);
    if (!loc.length) continue;
    lines.push(`**${locale}**`);
    lines.push('');
    for (const q of loc) lines.push(`- ${q.phrase}  _← ${q.seed}_`);
    lines.push('');
  }
}
if (failures.length) {
  lines.push('## Failures (network / rate limiting)');
  lines.push('');
  for (const f of failures) lines.push(`- ${f.seed} → ${f.error}`);
  lines.push('');
}
await writeFile(resolve(ROOT, 'docs/geo/demand-map.md'), lines.join('\n'));

console.log(`\nDone. ${byPhrase.size} unique phrasings, ${serpData.length} SERPs.`);
if (failures.length) console.log(`${failures.length} seed(s) failed.`);