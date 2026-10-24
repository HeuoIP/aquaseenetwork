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
| E2 | 2026-10-24 | A buyer searching in their own language cannot be served by a site that only answers in English, so every market we work in needs its own edition of the same entity | Published the Chinese edition: the whole content model, the chrome (headings, buttons, form labels, options) and the entity description, with the termbase locked; Arabic and Russian remain unpublished | All Chinese-language questions; no effect on the English citation rate | Structure measured: 9 Chinese pages, all checks green, 30/30 pages answering in the Worker runtime. Citation measurement pending — the pages are not deployed or indexed yet | Keep — the Chinese edition stays, and it becomes the reference path for Arabic and Russian |
| E3 | 2026-10-24 | The new locale-aware tree passes the build but breaks in the runtime the site is actually served from — the internal language rewrite, the prefixed routes and the hreflang map all fail only there | Added a runtime gate that drives a running local server (workerd) over every published language, every route, every hreflang target; ran it against the Worker bundle | Not a content question — it protects all of them | One real defect found and fixed: every English insight article was advertising a Chinese alternate that did not exist, and the structure gate was blind to it because it only knew about English. After the fix: 30/30 pages answer in the local Worker runtime, zero failures, zero warnings | Keep — the runtime gate runs before every release from now on |
| E4 | 2026-10-24 | A right-to-left market cannot be served by a translated page that is only mirrored text — the layout, the typography and the small print have to be rebuilt for the direction | Published the Arabic edition with a right-to-left layout, the Arabic font stack, and letter-spacing removed from every tracked label (tracking breaks the joining forms of Arabic); the comparison table, the numbers and the mobile menu were checked on screen | All Arabic-language questions; no effect on the English or Chinese pages | Structure measured: 9 Arabic pages, all checks green, 39/39 pages answering in the local Worker runtime with zero failures and zero warnings. Citation measurement pending — the pages are not deployed or indexed yet | Keep — the Arabic edition stays; the same path now awaits Russian |