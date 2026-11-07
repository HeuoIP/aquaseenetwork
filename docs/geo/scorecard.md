# GEO scorecard

Generated: 2026-11-07T10:08:05.433Z

## The four layers

| Layer | Metric | Current | Baseline | Target | Source |
| --- | --- | --- | --- | --- | --- |
| L1 retrievability | AI crawler hits | — | — | — | Cloudflare AI Audit |
| L1 retrievability | Question sets where we appear in the top 10 | not measured | — | baseline + 50% | scripts/geo/serp-track.mjs |
| L2 citation | Mention rate | 0/26 (0%) | — | baseline × 1.5 | answer-audit-2026-10-27-glm.json |
| L2 citation | Citation rate (our page cited) | 0% | — | baseline × 1.5 | answer-audit-2026-10-27-glm.json |
| L3 framing | Framing accuracy (service business, not a factory) | 0/26 (0%) | — | ≥ 90% | answer-audit-2026-10-27-glm.json |
| L3 framing | Mis-framed mentions | 0 | — | 0 | answer-audit-2026-10-27-glm.json |
| L4 commercial | AI-sourced inquiries | — | — | — | inquiry source field |

## The eight content metrics

| Metric | How it is measured | Current |
| --- | --- | --- |
| Mention rate | share of prompts that mention AQUASEE | see L2 |
| Citation position | order of our page among the citations | see L2 |
| Cited page-type mix | facts / guides / capability pages | from the audit JSON |
| Framing accuracy | correct description rate | see L3 |
| Statistics density | checkable numbers per 1,000 words | scripts/geo/struct-check.mjs |
| Source density | sourced claims per article | article `sources` arrays |
| Term coverage | buyer phrasings used | docs/geo/demand-map.md |
| Readability | sentence length and passive voice | editorial review |

## Iteration

Experiments recorded in the ledger: **10**

Decision rule: three consecutive rounds with no movement on L2 means the content is not the bottleneck — change the page form, the angle, or the external signal.
