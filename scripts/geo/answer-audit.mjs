/**
 * T3 — the answer audit.
 *
 * Runs the fixed question set against the answer engines that can be reached
 * from this machine and records what they say about AQUASEE, what they cite,
 * and whether they describe the business correctly.
 *
 * No API key is required. The default mode drives the public web interfaces
 * with the local Chrome through Playwright. If an API key happens to be
 * available, the script uses it instead — same prompts, same output shape.
 *
 *   node scripts/geo/answer-audit.mjs
 *   node scripts/geo/answer-audit.mjs --engines=perplexity,gemini
 *   node scripts/geo/answer-audit.mjs --limit=8
 *
 * Engines that cannot be reached are reported as skipped, never as a zero —
 * a missing measurement must not look like a failing one.
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditPrompts, seeds } from '../research/seeds.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DATA = resolve(ROOT, 'docs/geo/data');

/**
 * The key can come from the environment or from the repository's .env.local,
 * which is gitignored. Reading it here means the audit runs the same way for
 * everybody, without exporting a variable by hand.
 */
for (const file of ['.env.local', '.env']) {
  const path = resolve(ROOT, file);
  if (!existsSync(path)) continue;
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1) continue;
    const name = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[name]) process.env[name] = value;
  }
}

const argv = process.argv.slice(2);
/**
 * Flags are written both ways in this repository's own documentation, so both
 * are accepted: `--engines gemini` and `--engines=gemini`.
 */
const argOf = (flag) => {
  const i = argv.indexOf(flag);
  if (i >= 0) return argv[i + 1];
  const inline = argv.find((a) => a.startsWith(flag + "="));
  return inline ? inline.slice(flag.length + 1) : null;
};
const engines = (argOf('--engines') || 'perplexity,gemini').split(',').map((s) => s.trim());
const limit = Number(argOf('--limit') || 0);
/**
 * The English set is the fixed 26-question list. A market has its own set:
 * asking an English question of a Chinese engine measures the English
 * questions in a Chinese index, which is not the market the buyer is in.
 */
const locale = argOf('--locale');
const localePrompts = locale
  ? seeds.filter((x) => x.locale === locale).map((x) => x.q)
  : [];
const questionSet = localePrompts.length ? localePrompts : auditPrompts;
const prompts = limit ? questionSet.slice(0, limit) : questionSet;

/**
 * One probe, one answer: can this key use the search tool at all?
 *
 * Whether a key may search is a property of the key, not of the question, so
 * it is established once instead of once per prompt. A tier without the search
 * tool answers every grounded request with 429, and finding that out 26 times
 * would waste the run.
 */
const searchAvailable = (() => {
  let cached = null;
  return async (url, post) => {
    if (cached !== null) return cached;
    try {
      const res = await fetch(url, { ...post(true), signal: AbortSignal.timeout(45000) });
      cached = res.status !== 429;
      await res.text();
    } catch {
      cached = false;
    }
    return cached;
  };
})();

/** What a correct description of AQUASEE has to contain. */
const SERVICE_MARKERS = [
  'consult',
  'design',
  'supply chain',
  'delivery',
  'service',
  'advisory',
  'engineering partner',
];
/** What a wrong description contains — these describe a manufacturer. */
const MANUFACTURER_MARKERS = [
  'manufactur',
  'factory',
  'factory owner',
  'we make the',
  'our own production',
  'manufacturer of',
];

function judgeFraming(text) {
  const lower = text.toLowerCase();
  const serviceHits = SERVICE_MARKERS.filter((m) => lower.includes(m));
  const manufacturerHits = MANUFACTURER_MARKERS.filter((m) => lower.includes(m));
  const mentioned = lower.includes('aquasee');
  const framingCorrect =
    mentioned && serviceHits.length > 0 && manufacturerHits.length === 0;
  return {
    mentioned,
    framingCorrect,
    serviceHits,
    manufacturerHits,
    misframed: mentioned && manufacturerHits.length > 0 && serviceHits.length === 0,
  };
}

function extractCitations(text) {
  const urls = [...text.matchAll(/https?:\/\/[^\s"'<>)\]]+/g)].map((m) => m[0]);
  return [...new Set(urls.map((u) => u.replace(/[.,;]$/, '')))];
}

// ---------------------------------------------------------------- API mode
async function runViaApi(engine, prompt) {
  const key =
    engine === 'openai'
      ? process.env.OPENAI_API_KEY
      : engine === 'anthropic'
        ? process.env.ANTHROPIC_API_KEY
        : engine === 'perplexity'
          ? process.env.PERPLEXITY_API_KEY
          : engine === 'glm'
            ? process.env.GLM_API_KEY
            : process.env.GOOGLE_API_KEY;
  if (!key) return null;

  if (engine === 'openai') {
    const res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        tools: [{ type: 'web_search' }],
        input: prompt,
      }),
    });
    if (!res.ok) throw new Error(`openai ${res.status}`);
    const json = await res.json();
    const text = json.output_text || JSON.stringify(json.output ?? '');
    return { text, citations: extractCitations(text) };
  }

  if (engine === 'anthropic') {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1200,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!res.ok) throw new Error(`anthropic ${res.status}`);
    const json = await res.json();
    const text = (json.content ?? [])
      .map((c) => c.text ?? '')
      .join(' ');
    return { text, citations: extractCitations(text) };
  }

  if (engine === 'glm') {
    // Zhipu's BigModel. The chat API accepts a web_search tool and then
    // quietly ignores it on these models, so the search is done with the
    // dedicated endpoint instead: the engine retrieves, the model answers
    // from what was retrieved, and the citations are the retrieved URLs.
    // That is also how an answer engine behaves, and it is the only way to
    // see whether our own pages appear in the retrieval set at all.
    const model = process.env.GLM_MODEL || 'glm-4-flash';
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` };
    const withTimeout = (init, ms) => ({ ...init, signal: AbortSignal.timeout(ms) });

    const searchRes = await fetch(
      'https://open.bigmodel.cn/api/paas/v4/web_search',
      withTimeout({
        method: 'POST',
        headers,
        body: JSON.stringify({ search_engine: 'search_std', search_query: prompt }),
      }, 45000),
    );
    let found = [];
    if (searchRes.ok) {
      const sj = await searchRes.json();
      found = (sj.search_result ?? []).filter((r) => r.title || r.link);
    }

    const context = found
      .slice(0, 8)
      .map((r, n) =>
        `[${n + 1}] ${r.title ?? ''}\n${r.link ?? ''}\n${String(r.content ?? '').slice(0, 400)}`,
      )
      .join('\n\n');
    const messages = [
      {
        role: 'system',
        content:
          'You are answering a buyer question using the supplied search results. Keep the numbers, standard names and company names exactly as they appear in the results. Cite what you use as [n]. If the results do not cover the question, say so.',
      },
      {
        role: 'user',
        content: prompt + '\n\nSearch results:\n' + (context || '(the search returned nothing)'),
      },
    ];
    const res = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', withTimeout({
      method: 'POST',
      headers,
      body: JSON.stringify({ model, messages, temperature: 0.2 }),
    }, 60000));
    if (!res.ok) throw new Error(`glm ${res.status}`);
    const json = await res.json();
    const text = json.choices?.[0]?.message?.content ?? '';
    const retrieved = found.map((r) => r.link).filter(Boolean);
    const citations = extractCitations([...retrieved, text].join(' '));
    return { text, citations, grounded: found.length > 0, retrieved };
  }
  if (engine === 'perplexity') {
    const res = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!res.ok) throw new Error(`perplexity ${res.status}`);
    const json = await res.json();
    const text = (json.choices ?? []).map((c) => c.message?.content ?? '').join(' ');
    return { text, citations: json.citations ?? extractCitations(text) };
  }

  // google
  //
  // The model matters: gemini-2.0-flash was retired, and the API answers a
  // request for it with a 404 that reads like a missing key. The model is
  // configurable so the next retirement is a one-line change.
  const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const post = (withSearch) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      ...(withSearch ? { tools: [{ google_search: {} }] } : {}),
    }),
  });
  // Every request carries a deadline. A connection that stalls must not be
  // able to hold the whole run open.
  const withTimeout = (init, ms = 45000) => ({ ...init, signal: AbortSignal.timeout(ms) });
  const withRetry = async (init, tries = 4) => {
    let last = null;
    for (let i = 1; i <= tries; i++) {
      try {
        const r = await fetch(url, withTimeout(init));
        if (r.status === 429 || r.status === 503) {
          last = new Error(`google ${r.status}`);
          await new Promise((s) => setTimeout(s, 3000 * i));
          continue;
        }
        return r;
      } catch (err) {
        last = err;
        await new Promise((s) => setTimeout(s, 2500 * i));
      }
    }
    throw last ?? new Error('google unreachable');
  };

  let grounded = true;
  let res = null;
  if (await searchAvailable(url, post)) {
    res = await withRetry(post(true));
  } else {
    // The run still measures what the model says, but it did not search, so
    // it is marked as ungrounded rather than reported as an answer with no
    // citations.
    grounded = false;
    res = await withRetry(post(false));
  }
  if (!res.ok) throw new Error(`google ${res.status}`);
  const json = await res.json();
  const text = (json.candidates ?? [])
    .flatMap((c) => c.content?.parts ?? [])
    .map((p) => p.text ?? '')
    .join(' ');
  const citations = extractCitations(json.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.map((c) => c.web?.uri)
    .filter(Boolean)
    .join(' ') ?? '');
  return { text, citations, grounded };
}

// ----------------------------------------------------------- browser mode
async function runViaBrowser(engine, prompt, page) {
  const url =
    engine === 'perplexity'
      ? 'https://www.perplexity.ai/'
      : 'https://gemini.google.com/app';
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2500);

  const box = page.locator('textarea, [contenteditable="true"]').first();
  await box.click();
  await box.fill(prompt);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(9000);

  const text = await page.evaluate(() => document.body.innerText);
  const citations = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href^="http"]'))
      .map((a) => a.href)
      .filter((h) => !/perplexity\.ai|gemini\.google\.com|google\.com\/search/.test(h)),
  );
  return { text, citations: [...new Set(citations)] };
}

// ------------------------------------------------------------------- main
const results = [];
const skipped = [];

const hasKey = {
  openai: !!process.env.OPENAI_API_KEY,
  anthropic: !!process.env.ANTHROPIC_API_KEY,
  perplexity: !!process.env.PERPLEXITY_API_KEY,
  google: !!process.env.GOOGLE_API_KEY,
  glm: !!process.env.GLM_API_KEY,
};

let browser = null;
if (engines.some((e) => !hasKey[e])) {
  try {
    const { chromium } = await import('playwright-core');
    browser = await chromium.launch({
      executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    });
  } catch (err) {
    console.error('Could not launch Chrome for browser mode:', err.message);
  }
}

for (const engine of engines) {
  const apiEngine = engine === 'gemini' ? 'google' : engine;
  for (const prompt of prompts) {
    const row = { engine, prompt, at: new Date().toISOString() };
    try {
      let out = null;
      if (hasKey[apiEngine]) {
        out = await runViaApi(apiEngine, prompt);
      } else if (browser) {
        const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
        const page = await ctx.newPage();
        out = await runViaBrowser(engine, prompt, page);
        await ctx.close();
      } else {
        skipped.push({ engine, prompt, reason: 'no API key and no browser available' });
        continue;
      }
      row.answer = out.text.slice(0, 4000);
      row.citations = out.citations;
      if (out.retrieved) row.retrieved = out.retrieved;
      if (out.grounded === false) row.grounded = false;
      row.judgement = judgeFraming(out.text);
      results.push(row);
      console.log(
        `${engine} :: mentioned=${row.judgement.mentioned} framing=${row.judgement.framingCorrect ? 'ok' : 'CHECK'} :: ${prompt.slice(0, 60)}`,
      );
    } catch (err) {
      skipped.push({ engine, prompt, reason: err.message });
      console.error(`${engine} :: skipped (${err.message})`);
    }
  }
}

if (browser) await browser.close();

mkdirSync(DATA, { recursive: true });
const stamp = new Date().toISOString().slice(0, 10);
const engineTag = engines.join('-') + (locale ? `-${locale}` : '');
writeFileSync(
  resolve(DATA, `answer-audit-${stamp}-${engineTag}.json`),
  JSON.stringify({ generatedAt: new Date().toISOString(), prompts: prompts.length, results, skipped }, null, 2),
);

// --- summary ---------------------------------------------------------------
const byEngine = {};
for (const r of results) {
  const e = (byEngine[r.engine] ??= { measured: 0, mentioned: 0, correct: 0, misframed: 0, citations: 0, retrieved: 0 });
  e.measured++;
  if (r.judgement.mentioned) e.mentioned++;
  if (r.judgement.framingCorrect) e.correct++;
  if (r.judgement.misframed) e.misframed++;
  e.citations += r.citations.length;
  if ((r.retrieved ?? []).some((u) => u.includes('aquasee.art'))) e.retrieved++;
}

const lines = [];
lines.push(`# Answer audit — ${stamp}`);
lines.push('');
lines.push(
  `Prompts in the set: ${prompts.length} · measured: ${results.length} · skipped: ${skipped.length}` +
    (locale ? ` · language: ${locale}` : ` · language: en (the standing set)`),
);
lines.push('');
lines.push('| Engine | Measured | Mentioned | Framing correct | Mis-framed | Citations found | AQUASEE retrieved |');
lines.push('| --- | --- | --- | --- | --- | --- | --- |');
for (const [engine, e] of Object.entries(byEngine)) {
  // Framing accuracy is measured over the mentions, not over every answer:
  // an answer that never names us says nothing about how we are described.
  const framing = e.mentioned
    ? `${e.correct} (${Math.round((e.correct / e.mentioned) * 100)}%)`
    : 'n/a';
  lines.push(
    `| ${engine} | ${e.measured} | ${e.mentioned} (${Math.round((e.mentioned / e.measured) * 100)}%) | ${framing} | ${e.misframed} | ${e.citations} | ${e.retrieved} |`,
  );
}
lines.push('');
const ungrounded = results.filter((r) => r.grounded === false).length;
if (ungrounded) {
  lines.push(
    `**${ungrounded} of ${results.length} answers were produced without web search.** The search tool was not available to the key used for that run, so these answers come from the model's own knowledge and the citation count for them measures nothing. Treat them as a framing check only.`,
  );
  lines.push('');
}
if (skipped.length) {
  lines.push('## Skipped');
  lines.push('');
  lines.push('| Engine | Reason |');
  lines.push('| --- | --- |');
  for (const s of skipped) lines.push(`| ${s.engine} | ${s.reason} |`);
  lines.push('');
}
lines.push('## Mis-framed mentions');
lines.push('');
const misframed = results.filter((r) => r.judgement.misframed);
if (!misframed.length) {
  lines.push('None in this run.');
} else {
  for (const r of misframed) {
    lines.push(`- **${r.engine}** — ${r.prompt}`);
    lines.push(`  - wording that caused it: ${r.judgement.manufacturerHits.join(', ')}`);
  }
}
lines.push('');
const reportPath = resolve(ROOT, `docs/geo/answer-audit-${stamp}-${engineTag}.md`);
writeFileSync(reportPath, lines.join('\n'));

// An index of the runs, newest first, so a month of evidence is one click away.
const runs = readdirSync(resolve(ROOT, 'docs/geo'))
  .filter((f) => /^answer-audit-\d{4}-\d{2}-\d{2}-.+\.md$/.test(f))
  .sort()
  .reverse();
writeFileSync(
  resolve(ROOT, 'docs/geo/answer-audit.md'),
  [
    '# Answer audits',
    '',
    'One file per engine and day. The newest run first.',
    '',
    ...runs.map((f) => `- [${f.replace(/\.md$/, '')}](${f})`),
    '',
  ].join('\n'),
);

console.log(`\nWrote docs/geo/answer-audit.md and docs/geo/data/answer-audit-${stamp}.json`);