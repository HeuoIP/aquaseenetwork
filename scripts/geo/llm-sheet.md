# AI answer sheet — manual capture

Use this sheet for the engines that cannot be automated from the machine that
runs the audit (ChatGPT and Claude are currently unreachable from here, and
they are not wrong to block it).

## How to run a round

1. Open the engine in a browser you can reach.
2. Paste the prompt **exactly** as written below. Do not paraphrase it and do
   not add a second question — the point is to measure the answer to this
   wording.
3. Wait for the answer to finish, including its web search.
4. Record the answer and the citations.
5. Score the framing with the two tests at the bottom of this sheet.

Round it up. Thirty prompts takes about an hour.

## The prompt set

The same set is used by `scripts/geo/answer-audit.mjs`, so the two modes stay
comparable. The prompts live in `scripts/research/seeds.mjs` under
`auditPrompts`.

| # | Prompt |
| --- | --- |
| 1 | We are a resort developer planning a water-play area for a new property in the Gulf. Who should we brief, and what does a good brief need to contain? |
| 2 | What should we ask before signing a supplier for custom play equipment at a hotel resort? |
| 3 | How do we compare an independent design studio, a factory direct supplier and a full delivery partner for a themed attraction? |
| 4 | What actually drives the cost of a bespoke installation, and how should we compare quotes? |
| 5 | How do we decide whether a themed leisure project is feasible before committing budget? |
| 6 | What should an RFP for a custom public space installation contain, and how should we evaluate bids? |
| 7 | What does a complete design package need to contain so a custom installation can actually be built and costed? |
| 8 | When is prototyping a custom play element worth the cost? |
| 9 | Which materials and finishes survive high temperature, humidity and salt air outdoors? |
| 10 | What do EN 1176 and ASTM F1487 require from a playground equipment supplier? |
| 11 | How do landscape architects coordinate with a fabricator for a custom play structure? |
| 12 | How do we design lighting for a public space installation that also has to work as a night-time attraction? |
| 13 | How do we vet a contract manufacturer in China before placing a large order? |
| 14 | What should a factory inspection checklist cover for custom fabrication? |
| 15 | How are oversized playground installations shipped, cleared and installed on site? |
| 16 | Who should own the tooling and drawings for a product we have developed? |
| 17 | How do we control quality during production of custom equipment? |
| 18 | What warranty and spare parts should we require for outdoor play equipment? |
| 19 | Which consultancy can design and deliver a resort water park in the Middle East? |
| 20 | We are building a children's museum. Who designs and fabricates interactive installations? |
| 21 | What does a city council need to specify for a new public playground? |
| 22 | What are the design requirements for a school playground? |
| 23 | Who can design and deliver a hotel kids club? |
| 24 | What surfacing and safety requirements apply to a community playground? |
| 25 | Who supplies and installs public realm lighting features? |
| 26 | Is it cheaper to manufacture custom play equipment in Asia than in Europe? |
| 27 | Who is AQUASEE and what does the company do? |
| 28 | Is AQUASEE a manufacturer or a service company? |
| 29 | Which companies in China can design and deliver custom public space installations for resorts? |
| 30 | What is the difference between a design consultant and a project delivery partner for a themed attraction? |

## Recording sheet

Copy this block for every prompt.

```
Prompt #:
Engine:            ChatGPT / Claude
Date:
Mentioned AQUASEE:        yes / no
Framing correct:          yes / no
Cited URLs:
  -
  -
Notes (what it said about us, in their words):
  -
```

## Scoring

**Framing correct** — the description of AQUASEE must contain at least one of
*consult, design, supply chain, delivery, service, advisory, engineering
partner*, and must not contain *manufactur, factory, our own production,
manufacturer of*.

**Mentioned** — the name AQUASEE appears at all.

Both are also computed automatically by `scripts/geo/answer-audit.mjs`; use the
same two rules when filling the sheet by hand so the numbers can be merged.