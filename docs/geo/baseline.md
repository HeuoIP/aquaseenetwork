# Baseline report — the first measurement

**Status:** structure measured, retrieval not yet measurable
**Date:** 2026-10-24
**Scope:** the rebuilt site (locale-aware tree, citable content layer, three
capabilities, Chinese edition), as it stands in the local build.

This report records what is actually known today, and separates it from what
cannot be known until the site is deployed and indexed. Nothing here is an
assumption presented as a measurement.

---

## 1. What is measurable without deployment

| Layer | Metric | Value | How it was measured |
| --- | --- | --- | --- |
| Structure | Pages built | **30** (21 English, 9 Chinese) | `npm run geo:check` against the build output |
| Structure | Pages answering in the Worker runtime | **30 / 30** | `npm run geo:runtime` against the local workerd preview |
| Structure | Languages published | **2** (English, Chinese) | `src/lib/locale.ts` |
| Structure | JSON-LD blocks, valid | **all pages** | structure gate |
| Structure | hreflang reciprocity | **complete for every published path** | structure gate |
| Structure | Sitemap coverage | **30 / 30** | structure gate |
| Structure | Languages with a complete chrome (headings, buttons, form labels) | **2** | the chrome was moved into the content layer and published per language |
| Structure | Locales that are advertised but incomplete | **0** | the gate fails if a hreflang points at a page that does not exist |
| Research | Seeds defined | **44** (English 34, Chinese 4, Arabic 3, Russian 3) | `scripts/research/seeds.mjs` |
| Research | Buyer phrasings captured from live autocomplete | **3** | the capture ran against a hostile network; see §4 |
| Research | Entity terms locked across four languages | **18** | `src/content/termbase.ts` |

The structural numbers are the ones a page can be cited on: a machine needs a
quotable paragraph, a correct canonical URL, a declared entity and a language
signal. Those are in place for both published languages.

## 2. What cannot be measured yet, and why

| Layer | Metric | Why it is not measured |
| --- | --- | --- |
| L1 retrievability | AI crawler hits | Requires the deployed Worker and its request logs. The local preview never leaves this machine. |
| L1 retrievability | Index status | Cannot be established by script at all — it is verified in Bing Webmaster Tools and Google Search Console, which need the deployment and the account. |
| L2 citation | Mention rate | Needs a live site to be cited. Measuring it now would measure the *old* site, not this one. |
| L2 citation | Citation rate, citation position | Same. The instrument exists (`npm run geo:audit`) and runs without any API key. |
| L3 framing | Framing accuracy | Same instrument, same reason. |
| L4 commercial | AI-sourced inquiries | The attribution field is live in the inquiry endpoint, but there is no traffic to attribute yet. |

**This is deliberate, not lazy.** A baseline taken against an unindexed site
is a baseline of zero, and a target set against zero is not a target. The
first real baseline is taken after deployment, after the sitemap is submitted,
after the crawlers have been seen, and after the engines have had time to
re-index the pages.

## 3. The baseline procedure (run once, after deployment)

1. Push the branch, let the Worker deploy, confirm the custom domains answer.
2. Submit `https://www.aquasee.art/sitemap.xml` in Bing Webmaster Tools and
   Google Search Console. Check the index status there — this is the only
   trustworthy source for it.
3. Turn on IndexNow so new and changed URLs are pushed rather than waited for.
4. Wait 14 days. Do not change content during this window; the point is to
   measure the site as it is.
5. Run `npm run geo:serp` (T2) and `npm run geo:audit` (T3) on the same
   question set, and record the numbers in the experiment ledger.
6. Set the targets: L2 and L3 against the measured baseline, L1 against the
   crawler-hit count observed in week one.

## 4. The instruments, and what the network allowed today

| Instrument | State | Note |
| --- | --- | --- |
| Structure gate (`geo:check`) | **working** | runs on the build output, no network |
| Runtime gate (`geo:runtime`) | **working** | runs against a local server, no network |
| Autocomplete capture (`research:demand`) | **degraded** | Bing answered a few requests; DuckDuckGo refused the host. The capture merges with what is on disk instead of replacing it, and it resumes rather than restarts. |
| SERP capture (`research:serp-map`) | **blocked** | the SERP endpoint refuses sustained scripted traffic from this host |
| Answer audit (`geo:audit`) | **ready, not yet run** | drives Perplexity and Gemini through the local Chrome; it should be run *after* deployment, because before deployment it would measure the previous site |
| Manual sheet (`scripts/geo/llm-sheet.md`) | **ready** | for ChatGPT and Claude, which answer HTTP 403 from this machine |

**Why the question bank is thin.** A capture of 102 distinct buyer phrasings
was collected earlier in the programme, and a later failed run overwrote it.
That defect is fixed — the capture now merges and resumes — but the network
has been hostile since, so the bank currently holds what the last successful
pass left behind. The seed set is intact (44 seeds), so the capture can be
re-run when the endpoint lets it through, without redoing any other work.

## 5. Decisions this baseline implies

- **The measurement is not the bottleneck; the index is.** Nothing in the
  structure prevents citation. Until the pages are submitted and crawled,
  no content change can move L2, and changing content anyway would only
  make the first measurement harder to read.
- **Chinese is published before the baseline.** Language coverage is a
  structural variable, not a citation variable: adding a second language
  changes what an engine can match a query to, but it does not change the
  English pages' citation rate. It is therefore recorded as its own round in
  the experiment ledger, and the citation baseline for English is taken on
  the English pages alone.
- **Arabic and Russian wait for the same reason.** The machinery is ready
  and the termbase is locked in all four languages, but publishing a language
  that nobody on the team can read is not a decision to take lightly, and it
  is not needed before the first measurement.