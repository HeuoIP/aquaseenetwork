/**
 * Builds docs/geo/demand-map.md from the collected question bank.
 *
 * Runs offline, so the map can always be regenerated from a capture even when
 * the search endpoint is refusing traffic.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const DATA = 'docs/geo/data/question-bank.json';
const OUT = 'docs/geo/demand-map.md';

if (!existsSync(DATA)) {
  console.error('No question bank captured yet. Run `npm run research:demand`.');
  process.exit(1);
}

const bank = JSON.parse(readFileSync(DATA, 'utf8'));
const questions = bank.questions;

const PILLARS = {
  strategy: 'Strategy & Consulting',
  'creative-design': 'Creative Design & R&D',
  'supply-chain': 'Supply Chain & Delivery',
};
const VERTICALS = {
  tourism: 'tourism, resort and destination',
  'public-space': 'public space',
  children: "children's play and learning spaces",
  general: 'general',
};

const byPillar = {};
for (const q of questions) {
  (byPillar[q.pillar] ??= []).push(q);
}

const lines = [];
lines.push('# Demand map — the questions buyers actually ask');

if (!questions.length) {
  lines.push('');
  lines.push('> **No capture on disk yet.**');
  lines.push('>');
  lines.push('> The question bank is captured from real search autocomplete. The capture');
  lines.push('> is blocked when the search endpoints refuse scripted traffic, so it runs');
  lines.push('> in the background and resumes where it stopped.');
  lines.push('>');
  lines.push('> \`npm run research:demand -- --no-serp --pace=7000\`');
  lines.push('');
  lines.push('See `methodology-memo.md` for why the instruments are separate and');
  lines.push('why the capture merges with what is already on disk.');
  writeFileSync(OUT, lines.join('\n'));
  console.log('Wrote ' + OUT + ' — no capture on disk.');
  process.exit(0);
}
lines.push('');
lines.push(`Generated from the captured question bank (${questions.length} unique phrasings from ${bank.seedCount} seeds, captured ${bank.generatedAt.slice(0, 10)}).`);
lines.push('');
lines.push(
  'Every line below is a real query taken from search autocomplete, with the seed it came from. Nothing here is a guess about what buyers might ask — it is what they typed.',
);
lines.push('');
lines.push('## How to read this');
lines.push('');
lines.push(
  'The phrasings are the vocabulary. When a phrase appears here, it is the wording the market uses, and it belongs in the page that answers that question — in the title, the first sentence, or the body.',
);
lines.push('');
lines.push(
  'The seeds themselves were chosen against the strategy: decision and specification questions in three capabilities, three verticals and four languages, and deliberately no "who is the manufacturer" queries — those belong to a different kind of supplier and are not our battlefield.',
);
lines.push('');

for (const [pillar, title] of Object.entries(PILLARS)) {
  const rows = byPillar[pillar] ?? [];
  if (!rows.length) continue;
  lines.push(`## ${title}`);
  lines.push('');
  lines.push(`_${rows.length} captured phrasings._`);
  lines.push('');

  const byVertical = {};
  for (const q of rows) (byVertical[q.vertical] ??= []).push(q);

  for (const [vertical, items] of Object.entries(byVertical)) {
    lines.push(`### ${VERTICALS[vertical] ?? vertical}`);
    lines.push('');
    for (const item of items) {
      lines.push(`- **${item.phrase}**  _← seed: "${item.seed}"_`);
    }
    lines.push('');
  }
}

lines.push('## Coverage to close');
lines.push('');
lines.push('| Capability | Phrasings captured | Notes |');
lines.push('| --- | --- | --- |');
for (const [pillar, title] of Object.entries(PILLARS)) {
  const rows = byPillar[pillar] ?? [];
  const locales = [...new Set(rows.map((r) => r.locale))].join(', ');
  lines.push(`| ${title} | ${rows.length} | ${locales || '—'} |`);
}
lines.push('');
lines.push(
  'The demand map is re-mined every quarter. Buyer phrasing drifts with the market, and a page written against last year’s wording is quietly losing the argument.',
);
lines.push('');

writeFileSync(OUT, lines.join('\n'));
console.log(`Wrote ${OUT} — ${questions.length} phrasings.`);