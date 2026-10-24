/**
 * The scorecard.
 *
 * Reads everything the programme has measured and prints one page with the
 * four layers and the eight metrics, so that a round can be compared with the
 * one before it. Targets are set from the first baseline, never invented.
 *
 *   node scripts/geo/scorecard.mjs
 */
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DATA = resolve(ROOT, 'docs/geo/data');

function latest(prefix) {
  if (!existsSync(DATA)) return null;
  const files = readdirSync(DATA)
    .filter((f) => f.startsWith(prefix) && f.endsWith('.json'))
    .sort();
  if (!files.length) return null;
  const file = files[files.length - 1];
  return { file, data: JSON.parse(readFileSync(resolve(DATA, file), 'utf8')) };
}

// --- T3: the citation layer -------------------------------------------------
const audit = latest('answer-audit-');
let auditSummary = null;
if (audit) {
  const results = audit.data.results ?? [];
  const measured = results.length;
  const mentioned = results.filter((r) => r.judgement?.mentioned).length;
  const correct = results.filter((r) => r.judgement?.framingCorrect).length;
  const misframed = results.filter((r) => r.judgement?.misframed).length;
  const citedOurPages = results.filter((r) =>
    (r.citations ?? []).some((u) => String(u).includes('aquasee.art')),
  ).length;
  const positions = results
    .filter((r) => r.judgement?.mentioned)
    .map((r) => (r.citations ?? []).filter((u) => String(u).includes('aquasee.art')).length);
  auditSummary = {
    file: audit.file,
    measured,
    mentioned,
    correct,
    misframed,
    citedOurPages,
    mentionRate: measured ? mentioned / measured : 0,
    framingAccuracy: measured ? correct / measured : 0,
    citationRate: measured ? citedOurPages / measured : 0,
  };
}

// --- T2: the visibility layer ----------------------------------------------
const track = latest('serp-track-');
let trackSummary = null;
if (track) {
  const runs = track.data.runs ?? [];
  const last = runs[runs.length - 1];
  const measured = (last?.rows ?? []).filter((r) => r.found !== null);
  const visible = measured.filter((r) => r.found);
  const top3 = measured.filter((r) => r.positions?.some((p) => p <= 3)).length;
  trackSummary = {
    file: track.file,
    runs: runs.length,
    measured: measured.length,
    visible: visible.length,
    top3,
    visibilityRate: measured.length ? visible.length / measured.length : 0,
  };
}

// --- the experiment ledger -------------------------------------------------
const ledgerPath = resolve(ROOT, 'docs/geo/experiment-ledger.md');
const ledgerRows = existsSync(ledgerPath)
  ? readFileSync(ledgerPath, 'utf8')
      .split('\n')
      .filter((l) => l.startsWith('| E'))
      .length
  : 0;

// --- report ----------------------------------------------------------------
const pct = (n) => `${Math.round(n * 100)}%`;
const lines = [];

lines.push('# GEO scorecard');
lines.push('');
lines.push(`Generated: ${new Date().toISOString()}`);
lines.push('');
lines.push('## The four layers');
lines.push('');
lines.push('| Layer | Metric | Current | Baseline | Target | Source |');
lines.push('| --- | --- | --- | --- | --- | --- |');
lines.push(
  `| L1 retrievability | AI crawler hits | — | — | — | Cloudflare AI Audit |`,
);
lines.push(
  `| L1 retrievability | Question sets where we appear in the top 10 | ${
    trackSummary ? `${trackSummary.visible}/${trackSummary.measured} (${pct(trackSummary.visibilityRate)})` : 'not measured'
  } | — | baseline + 50% | ${trackSummary ? `scripts/geo/serp-track.mjs` : 'scripts/geo/serp-track.mjs'} |`,
);
lines.push(
  `| L2 citation | Mention rate | ${
    auditSummary ? `${auditSummary.mentioned}/${auditSummary.measured} (${pct(auditSummary.mentionRate)})` : 'not measured'
  } | — | baseline × 1.5 | ${auditSummary ? auditSummary.file : 'scripts/geo/answer-audit.mjs'} |`,
);
lines.push(
  `| L2 citation | Citation rate (our page cited) | ${
    auditSummary ? pct(auditSummary.citationRate) : 'not measured'
  } | — | baseline × 1.5 | ${auditSummary ? auditSummary.file : 'scripts/geo/answer-audit.mjs'} |`,
);
lines.push(
  `| L3 framing | Framing accuracy (service business, not a factory) | ${
    auditSummary ? `${auditSummary.correct}/${auditSummary.measured} (${pct(auditSummary.framingAccuracy)})` : 'not measured'
  } | — | ≥ 90% | ${auditSummary ? auditSummary.file : 'scripts/geo/answer-audit.mjs'} |`,
);
lines.push(
  `| L3 framing | Mis-framed mentions | ${
    auditSummary ? auditSummary.misframed : 'not measured'
  } | — | 0 | ${auditSummary ? auditSummary.file : 'scripts/geo/answer-audit.mjs'} |`,
);
lines.push(`| L4 commercial | AI-sourced inquiries | — | — | — | inquiry source field |`);
lines.push('');

lines.push('## The eight content metrics');
lines.push('');
lines.push('| Metric | How it is measured | Current |');
lines.push('| --- | --- | --- |');
lines.push('| Mention rate | share of prompts that mention AQUASEE | see L2 |');
lines.push('| Citation position | order of our page among the citations | see L2 |');
lines.push('| Cited page-type mix | facts / guides / capability pages | from the audit JSON |');
lines.push('| Framing accuracy | correct description rate | see L3 |');
lines.push('| Statistics density | checkable numbers per 1,000 words | scripts/geo/struct-check.mjs |');
lines.push('| Source density | sourced claims per article | article `sources` arrays |');
lines.push('| Term coverage | buyer phrasings used | docs/geo/demand-map.md |');
lines.push('| Readability | sentence length and passive voice | editorial review |');
lines.push('');

lines.push('## Iteration');
lines.push('');
lines.push(`Experiments recorded in the ledger: **${ledgerRows}**`);
lines.push('');
lines.push(
  'Decision rule: three consecutive rounds with no movement on L2 means the content is not the bottleneck — change the page form, the angle, or the external signal.',
);
lines.push('');

writeFileSync(resolve(ROOT, 'docs/geo/scorecard.md'), lines.join('\n'));
console.log(lines.join('\n'));