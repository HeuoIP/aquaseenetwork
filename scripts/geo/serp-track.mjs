/**
 * T2 — weekly search visibility tracking.
 *
 * Runs the seed question set against the search engine that can be reached
 * from this machine and records where AQUASEE appears, if at all. It is the
 * same instrument as the research scripts, on a schedule, so that a change in
 * visibility is visible over time.
 *
 *   node scripts/geo/serp-track.mjs
 *   node scripts/geo/serp-track.mjs --locale=en
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serp, sleep, ThrottledError } from '../research/_ddg.mjs';
import { seeds as seedList } from '../research/seeds.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DATA = resolve(ROOT, 'docs/geo/data');
const ORIGIN = 'https://www.aquasee.art';

const argv = process.argv.slice(2);
const argOf = (flag) => {
  const i = argv.indexOf(flag);
  return i >= 0 ? argv[i + 1] : null;
};
const localeFilter = argOf('--locale');
const pace = Number(argOf('--pace') || 8000);

let seeds = seedList.filter((s) => s.q);
if (localeFilter) seeds = seeds.filter((s) => s.locale === localeFilter);

const rows = [];
for (const [i, seed] of seeds.entries()) {
  console.log(`[${i + 1}/${seeds.length}] ${seed.q}`);
  try {
    const results = await serp(seed.q, 10);
    const ours = results.filter((r) => r.url.includes('aquasee.art'));
    rows.push({
      seed: seed.q,
      locale: seed.locale,
      pillar: seed.pillar,
      found: ours.length > 0,
      positions: ours.map((r) => results.indexOf(r) + 1),
      topResult: results[0]?.domain ?? null,
      topTen: results.map((r) => r.domain),
    });
    console.log(`   aquasee.art positions: ${ours.length ? ours.map((r) => results.indexOf(r) + 1).join(', ') : 'none'}`);
  } catch (err) {
    const reason = err instanceof ThrottledError ? 'throttled' : err.message;
    console.log(`   skipped (${reason})`);
    rows.push({ seed: seed.q, locale: seed.locale, pillar: seed.pillar, found: null, reason });
  }
  await sleep(pace);
}

mkdirSync(DATA, { recursive: true });
const stamp = new Date().toISOString().slice(0, 10);
const file = resolve(DATA, `serp-track-${stamp}.json`);
const history = existsSync(file)
  ? JSON.parse(readFileSync(file, 'utf8'))
  : { createdAt: new Date().toISOString(), runs: [] };
history.runs.push({ at: new Date().toISOString(), rows });
writeFileSync(file, JSON.stringify(history, null, 2));

const measured = rows.filter((r) => r.found !== null);
const visible = measured.filter((r) => r.found);
const top3 = measured.filter((r) => r.positions?.some((p) => p <= 3)).length;

const lines = [];
lines.push(`# Search visibility — ${stamp}`);
lines.push('');
lines.push(`Questions measured: ${measured.length} of ${rows.length}`);
lines.push('');
lines.push(`- Questions where AQUASEE appears in the top 10: **${visible.length}** (${Math.round((visible.length / Math.max(measured.length, 1)) * 100)}%)`);
lines.push(`- Questions where AQUASEE appears in the top 3: **${top3}**`);
lines.push('');
lines.push('| Question | Found | Positions | Who ranks first |');
lines.push('| --- | --- | --- | --- |');
for (const row of rows) {
  lines.push(
    `| ${row.seed} | ${row.found === null ? 'not measured' : row.found ? 'yes' : 'no'} | ${row.positions?.join(', ') ?? '—'} | ${row.topResult ?? '—'} |`,
  );
}
lines.push('');
writeFileSync(resolve(ROOT, 'docs/geo/search-visibility.md'), lines.join('\n'));

console.log(`\nTop-10 visibility: ${visible.length}/${measured.length}. Wrote docs/geo/search-visibility.md`);