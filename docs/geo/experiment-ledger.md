# Experiment ledger

One row per iteration round. The point is attribution: if several changes land
at once, no round tells you which one worked.

**Rules**

- One variable class per round where possible: structure, statistics, sources,
  terminology, phrasing.
- Record the affected questions, the metric movement and the decision.
- Keep, roll back or continue is a real decision — "no change" is not allowed.
- Three consecutive rounds with no movement on the citation layer means the
  content is not the bottleneck.

| Round | Date | Hypothesis | Change | Affected questions | Result | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| E0 | 2026-10-24 | The site had no machine-readable structure, no answer-first paragraphs and no quotable long-form content, so answer engines had nothing to lift | Added an entity facts page, a FAQ page, an insight library (12 guides), answer-first definitions on every page, JSON-LD for Organization / Service / FAQPage / Article / ItemList / HowTo, hreflang, `/llms.txt` and `/llms-full.txt` | All 26 | Baseline not yet measured — measurement instruments were built in the same round | Keep, and take the baseline in the next round |
| E1 | 2026-10-24 | Answer engines may describe AQUASEE as a manufacturer because the vertical it operates in is dominated by equipment suppliers | Every page now states the service positioning in the first paragraph; the facts page carries an explicit "what we do not do" list; the comparison table names the factory route as someone else's | Prompts 27, 28, 29, 30 | Pending first measurement | Keep |