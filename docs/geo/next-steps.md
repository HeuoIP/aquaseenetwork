# What is left

**Date:** 2026-10-24
**State:** everything below is on the local branch `codex/geo-update-2026-10`.
Nothing has been pushed and nothing has been deployed.

---

## 1. Done, and verified locally

| Item | State | How it was verified |
| --- | --- | --- |
| Site rebuilt around a locale-aware tree | done | 39 static pages build cleanly |
| Three capabilities with citable, answer-first pages | done | `npm run geo:check` — all green |
| Entity facts page, FAQ, 12-guide insight library | done | structure gate |
| JSON-LD (Organization, WebSite, Service, FAQPage, Article, ItemList, AboutPage) | done | structure gate |
| `/llms.txt`, `/llms-full.txt` generated from the content | done | structure gate |
| Sitemap with per-language alternates and a real `lastmod` | done | structure gate |
| Crawler policy: answer engines allowed, training crawlers blocked | done | `src/app/robots.ts` |
| Chinese edition | done | structure gate, runtime gate, on-screen check |
| Arabic edition, right to left | done | structure gate, runtime gate, on-screen check |
| Inquiry attribution (AI referrer, campaign, landing path, locale) | done | `src/lib/attribution.ts` |
| Two gates: structure (build) and runtime (worker) | done | `npm run geo:check`, `npm run geo:runtime` |
| Baseline report, metrics dictionary, experiment ledger (5 rounds) | done | `docs/geo/` |
| Localization method, locked termbase, translation workflow | done | `docs/geo/translation-workflow.md`, `src/content/termbase.ts` |

## 2. Left, in the order it should happen

1. ~~Publish the Russian edition.~~ Done — all four languages of the programme
   are published and pass both gates.
2. **Translate the insight library.** English only at the moment. A language
   without it does not advertise it: the navigation omits the entry and the
   hreflang map leaves the article URLs alone. Fourteen articles × three
   languages is the largest single piece of writing left.
3. **Native review of the Chinese and Arabic editions.** The plan says a
   language is published when a native speaker has read the pages that carry
   the claims — the facts page, the three capability definitions, and the
   questions. This has not happened. It is the one gate that cannot be
   automated, and it is the one that protects the entity.
4. ~~Push, deploy, submit the sitemap.~~ Done — deployed, the sitemap is
   submitted in Google Search Console, and the first measurement round has
   been run. The full procedure is in `docs/geo/baseline.md`.
5. **Measure again, with search.** The first round (2026-10-27) ran the 26
   buyer questions against Gemini and measured a **mention rate of 0%**:
   AQUASEE was named in none of the 26 answers. That number is honest but
   weak, because the free key in use could not call the search tool, so the
   answers came from the model's own knowledge and carried no citations. The
   citation layer — L2 and L3 — still has no instrument. See the note below.

## 3. Needs a decision or an input from the client

| Input | Why | If it is not available |
| --- | --- | --- |
| Bing Webmaster Tools and Google Search Console access | Index status cannot be established by script; it is the one thing that decides whether the site can be cited at all | The programme can still publish content, but L1 stays unmeasured |
| Company facts (founding year, city, team size, countries served, response times, certifications, public phone/address) | The facts page carries the entity. Empty fields stay empty — they are not filled with plausible values | Those questions stay out of the L2 question set, so they are not scored |
| A native Arabic reviewer | The Arabic edition is machine-drafted with the termbase locked | The Arabic pages stay live but unreviewed, and that is recorded here |
| Any engine API key | Upgrades the answer audit from browser-driven to fully automatic | The audit runs keyless through the local Chrome; ChatGPT and Claude still need the manual sheet |
| The three untranslated case photographs in `网站案例图片/` | Real work is stronger than illustrative work, and the disclosure text cannot be removed until real work is published | Nothing changes; the capability studies stay labelled as concept work |

## 3a. The measurement instruments, and what each one can and cannot say

| Instrument | Reachable from this machine | Cost | What it measures | What it cannot measure |
| --- | --- | --- | --- | --- |
| Gemini API, free tier | yes, intermittently | free | mention rate and framing from the model's own knowledge | citations — the search tool answers 429 on a free key |
| Perplexity web, anonymous | yes | free | a rough mention check | citations — an anonymous answer is truncated and lists no sources |
| Perplexity API | yes | needs a card we cannot pay for | citations | — |
| Chinese engines (GLM, Doubao, Kimi, DeepSeek, Baidu) | yes | free tiers, paid with a local wallet | citations, if the engine is asked to search | — |
| GitHub Actions runner | yes | free for a public repository | a stable, overseas vantage point | — |

Two things follow from this table. First, the international citation layer
needs either a Chinese engine asked to search, or an engine run from an
overseas runner — the local free tier cannot pay for search. Second, the
geography of the answer matters: an engine queried from inside China returns
China-region results, which is not the market the buyers are in, so the
measurement should be taken from an overseas vantage point and labelled as
such.

## 4. Known limits of what is built

- The insight library exists in English only. A buyer who lands on the Arabic
  FAQ and follows a guide link gets the English guide.
- No page has been crawled, indexed, or cited yet. Every citation metric in
  the scorecard is deliberately empty rather than zero.
- The question bank holds three buyer phrasings. The capture instrument is
  working and the seed set is intact (44 seeds), but the search endpoints
  refuse sustained traffic from this host, so the capture has to be re-run
  from a friendlier network.
- The insight library is the only part of the site that exists in one
  language only. Fourteen articles × three languages is the largest single
  piece of writing left, and it is the piece that would most improve the
  citation layer in those markets.