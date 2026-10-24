# Methodology memo — R1

**Owner:** AQUASEE GEO programme
**Status:** active, version 1.0
**Last updated:** 2026-10-24

This memo records the reasoning behind every measurement and content decision in
this programme. Anything that is an assumption rather than evidence is marked as
such, and assumptions do not enter production.

---

## 1. What we are optimising for

Generative engines answer a question by retrieving pages, synthesising them and
citing a few. The page that gets cited is rarely the one with the best
marketing copy — it is the one that **states something specific, attributes it,
and makes it easy to lift**.

The academic baseline is the Princeton GEO paper (*Generative Engine
Optimization*, arXiv 2311.09735). It defines nine content modifications and
reports up to 40% visibility gain. We use its nine methods as our optimisation
and scoring skeleton, with two deliberate deviations (below).

## 2. The nine methods — what we adopt

| # | Method | What it changes | Where we apply it | Adopted |
| --- | --- | --- | --- | --- |
| 1 | Authoritative | Text style becomes more assertive and authoritative | Service and article lead paragraphs; the about page | yes |
| 2 | Statistics Addition | Quantitative statements replace qualitative ones | Every page carries concrete, checkable facts: durations, counts, standards, process steps | yes |
| 3 | Keyword Stuffing | More of the query's keywords | **rejected** — it fights normal search optimisation, is trivially detectable and degrades the reading experience that the same paper values in methods 6–7 | **no** |
| 4 | Cite Sources | Adds citations from credible sources | Every standard reference, every market or regulatory claim, every article | yes |
| 5 | Quotation Addition | Adds quotations from credible sources | Direct quotations from standards, manufacturer documentation and public authority material | yes |
| 6 | Easy-to-Understand | Simplifies language | Plain English first sentence per section; short sentences; definitions before detail | yes |
| 7 | Fluency Optimization | Improves textual fluency | Copy editing pass on every asset before publication | yes |
| 8 | Unique Words | Adds distinctive vocabulary | Our own vocabulary: *delivery model, capability study, brief, specification, controlled change, handover pack* — terms the buyer learns to associate with us | yes |
| 9 | Technical Terms | Adds technical terminology | Standards and technical vocabulary in the buyer's own language (EN 1176, ASTM F1487, ISO 13857, impact-attenuating surfacing, fixings, tolerances, FAT/SAT) | yes |

**Deviation record.** We implement eight of nine methods. Method 3 (keyword
stuffing) is rejected on the grounds that it degrades methods 6 and 7 — the two
that make an answer quotable in the first place — and risks the classic search
penalty. The result is a deliberate, documented divergence from the paper.

## 3. The battlefield: which questions we compete for

A SERP probe on 24 October 2026 for *“resort water play area design specification
supplier”* returned a top ten made up entirely of equipment manufacturers and
local distributors (Waterplay, Jinchao, LMQ Rides, Water Engineering Co) and,
for *“custom play equipment manufacturer for resort developer Asia”*, of
manufacturers and regional suppliers (KOMPAN Singapore, Playpoint Singapore,
Tailong, CY PLAY).

Those queries are won by people who own factories. We do not, and we do not
want to be described as if we did. **We therefore compete only on decision and
specification questions** — the questions buyers ask *before* they choose a
supplier, and the ones they ask when a supplier has let them down.

Three consequences, applied everywhere:

1. No page of ours targets "supplier", "manufacturer", "factory" or "wholesale"
   as a positioning word. We use *partner*, *specialist*, *production partner*,
   *delivery partner*.
2. Every claim we make about manufacturing is about **organisation and
   accountability** (how production is structured, how quality is controlled,
   how a change is handled), never about owning capacity.
3. A third quality indicator, *口径正确率 / framing accuracy*, measures whether
   an engine that mentions us describes us as a service business. This is a
   first-class metric, not a nice-to-have: mis-framing costs more than silence.

## 4. Instruments — what actually works from this environment

Everything below was tested on 24 October 2026, not assumed.

| Instrument | Status | Note |
| --- | --- | --- |
| DuckDuckGo autocomplete (`/ac/`) | **works, but rate-limits hard** | Returns real buyer phrasing; the first source tried. A burst of scripted traffic gets the IP refused for a while, so the scripts pace themselves, keep a circuit breaker and resume rather than restart |
| Bing autocomplete (`osjson.aspx`) | **works** | The fallback source, and a relevant one — Bing's index is what Copilot answers from |
| DuckDuckGo HTML SERP | **works via .NET transport, intermittently blocked** | Node's own client times out (filtered DNS), so the scripts fall back to a PowerShell transport that honours the system proxy. Sustained scripted use gets the host to refuse the connection, so the SERP capture is a separate, slower job from the question bank |
| Bing HTML SERP | **unusable** | Serves degraded, unrelated results to scripted requests — `site:iaapa.org` returned dictionary definitions of "career" |
| Google HTML SERP | **unusable** | Returns a JavaScript shell with no result markup |
| The `site:` operator | **unreliable** | Returns nothing even for large, well-known domains; index status must be checked in webmaster tools, never scripted |
| Perplexity web app | **reachable** (HTTP 200) | Usable for the answer audit through the local Chrome |
| Gemini web app | **reachable** (HTTP 200) | Same |
| ChatGPT / Claude web apps | **HTTP 403 here** | Must be sampled manually by the team using the same question sheet |
| OpenAI / Anthropic / Perplexity / Google APIs | **no keys available** | The answer audit is therefore built keyless-first; API slots are reserved but never required |

**On the state of the capture at the time of writing.** The question bank
and the competitive map are two independent instruments, and they are allowed
to fail separately. During the first build of this programme a run of
autocomplete requests collected 102 distinct buyer phrasings across the seed
set before the endpoint began refusing traffic; a later run overwrote that
capture with an empty one, which is why the capture scripts now merge with
what is already on disk instead of replacing it, and why the question bank is
captured with `--no-serp` while the competitive map is captured on its own.
The current state of `docs/geo/demand-map.md` reflects whatever the last
successful capture left behind; `npm run research:demand` resumes it.

**Index status is an open item.** It cannot be established by script and is
therefore verified in Bing Webmaster Tools and Google Search Console, with the
sitemap submitted and IndexNow active.

## 5. The three-layer measurement stack

Because no engine API keys are available, GEO is measured in layers, from the
cheapest and most frequent signal to the most expensive and most decisive.

| Layer | What it measures | Instrument | Cadence |
| --- | --- | --- | --- |
| **T1 — retrievability** | Are AI crawlers fetching us at all, and are AI-referred humans arriving? | Cloudflare AI Audit / crawler logs; on-site attribution of AI referrers | daily |
| **T2 — search visibility** | Can the target-market question set find us? | Weekly SERP tracking of the seed set; webmaster tools for index status | weekly |
| **T3 — citation** | Do engines answer with us, and do they describe us correctly? | Automated capture of Perplexity + Gemini answers and their citations; manual sheet for ChatGPT + Claude | monthly, and after every iteration round |

The same question set feeds T2 and T3, which makes the two layers comparable:
a question that ranks but is not cited points at a content-shape problem; a
question that is cited but ranks low points at authority or format.

## 6. Research discipline

* Every conclusion in this programme carries its evidence: the autocomplete
  string, the SERP position, the document, or the date it was captured.
* Anything that cannot be evidenced is labelled an assumption and does not
  reach a content page.
* No number appears on the site without a source and an access date. No client
  name, project, certification or price range is invented. Where a fact is
  unknown, the field stays empty rather than being filled with a plausible
  value — a confidently wrong fact is the fastest way to lose an AI citation.

## 7. Iteration discipline

Two-week rounds, three to five changes per round, one variable class at a time
(structure / statistics / sources / terminology / phrasing). Every round writes
one row in the experiment ledger: hypothesis, change, affected questions, metric
movement, decision. If three consecutive rounds move nothing on the citation
layer, the programme stops treating content as the bottleneck and moves to page
form, distribution or third-party authority.

## 8. What this memo does not cover

The metrics and their formulas live in `metrics-dictionary.md`. The question
bank, competitor map and baseline live in `demand-map.md`,
`competitive-map.md` and `baseline.md`, all regenerated by the scripts in
`scripts/research/` and `scripts/geo/`.