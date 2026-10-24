# Metrics dictionary

Every number this programme reports, defined once. A metric that is not
defined here does not get reported.

Last updated: 2026-10-24

---

## The four layers

### L1 — Retrievability
*Can the target market find us at all?*

An answer engine can only cite a page it can retrieve. A page that is not
crawled, not indexed, or not reachable at the address the engine expects
cannot be cited, however good it is. L1 is therefore the precondition for
everything else.

| Metric | Definition | Instrument | Cadence |
| --- | --- | --- | --- |
| AI crawler hits | Requests from answer-engine crawlers (OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Googlebot, Bingbot), counted per bot and per path | Cloudflare AI Audit / crawler logs | daily |
| Answer-engine referrals | Visits whose referrer is an answer engine | `src/lib/attribution.ts`, surfaced on the inquiry | weekly |
| Question-set visibility | Share of the tracked question set where AQUASEE appears in the top 10 results | `npm run geo:serp` | weekly |
| Top-3 visibility | Share of the tracked question set where AQUASEE appears in the top 3 | `npm run geo:serp` | weekly |
| Index coverage | Published URLs that are indexed in the target markets | Bing Webmaster Tools and Google Search Console — **never scripted**: the `site:` operator returns nothing even for large, well-known domains, and Bing serves degraded results to scripted requests | monthly |

### L2 — Citation
*Do engines answer with us?*

| Metric | Definition | Instrument | Cadence |
| --- | --- | --- | --- |
| Mention rate | Share of the audit question set in which the answer names AQUASEE | `npm run geo:audit` | monthly, and after each round |
| Citation rate | Share of answers in which a page on `aquasee.art` is cited | `npm run geo:audit` | monthly |
| Citation position | Rank of our page among the citations, where cited | `npm run geo:audit` | monthly |
| Cited page-type mix | Share of citations landing on the facts page, the FAQ, a guide or a capability page | `npm run geo:audit` | monthly |
| Demand-cluster coverage | Share of the demand clusters (strategy / creative design / supply chain) in which we are mentioned at least once | derived from the audit | monthly |

### L3 — Framing
*Do engines describe us correctly?*

This is a first-class layer, not a nice-to-have. The vertical is dominated by
equipment suppliers, and a mention that describes AQUASEE as a manufacturer is
worse than no mention: it attaches us to the wrong category of supplier.

| Metric | Definition | Instrument | Cadence |
| --- | --- | --- | --- |
| Framing accuracy | Share of mentions whose description contains at least one of *consult, design, supply chain, delivery, service, advisory, engineering partner* and none of *manufactur, factory, our own production, manufacturer of* | `npm run geo:audit` | monthly |
| Mis-framed mentions | Count of mentions that describe us as a manufacturer or factory | `npm run geo:audit` | monthly |
| First-mention context | The sentence in which AQUASEE first appears, kept verbatim for review | `npm run geo:audit` | monthly |

**Target: framing accuracy ≥ 90%, mis-framed mentions = 0.**

### L4 — Commercial
*Do those visitors become inquiries?*

| Metric | Definition | Instrument | Cadence |
| --- | --- | --- | --- |
| AI-sourced inquiries | Inquiries whose source is an answer engine | `src/lib/attribution.ts` → inquiry payload and email | weekly |
| AI inquiry qualification rate | Share of AI-sourced inquiries that pass the existing validation | inquiry payload | weekly |
| Inquiry rate by source | Inquiries per 100 sessions, split by source | inquiry payload + Cloudflare Web Analytics | monthly |

---

## The eight content metrics

These measure the content itself, and each one maps to a method from the GEO
paper recorded in `methodology-memo.md`.

| Metric | Definition | How it is measured | Paper method |
| --- | --- | --- | --- |
| Statistics density | Checkable numbers per 1,000 words | editorial review of published articles | Statistics Addition |
| Source density | Sourced claims per article, each with a URL and a consultation date | the `sources` array in every insight article | Cite Sources |
| Quotation density | Direct quotations from standards or public authorities per article | editorial review | Quotation Addition |
| Term coverage | Share of the buyer phrasings in `demand-map.md` that appear somewhere on the site | `npm run research:demand` output against the published pages | Technical Terms |
| Distinctive term density | Uses of our own vocabulary (*capability study, controlled change, delivery model, handover pack, buildable specification*) per 1,000 words | editorial review | Unique Words |
| Readability | Average sentence length, passive voice ratio, and reading level of published pages | editorial review | Easy-to-Understand, Fluency Optimization |
| Authoritativeness | Whether a section answers its own heading in the first sentence | `npm run geo:check` plus editorial review | Authoritative |
| Answer-first coverage | Share of pages whose opening paragraph can be quoted without surrounding context | `npm run geo:check` | — |

---

## How a target is set

1. Measure the baseline on every metric (this is round E0).
2. Set the citation-layer targets to **baseline × 1.5**.
3. Set framing accuracy to **≥ 90%** and mis-framed mentions to **0** — these
   are quality floors, not growth targets, because a wrong description is
   more expensive than silence.
4. Set the visibility target to **baseline + 50%** of the tracked question set.
5. Commercial targets are set from the historical inquiry rate for the same
   source mix, once there is enough data.

A metric that cannot be measured is reported as *not measured*. It is never
reported as zero, because a missing measurement and a failing measurement
lead to opposite decisions.