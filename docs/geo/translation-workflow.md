# Translation workflow

A language is published only when it is **complete**. Partial locales are not
published, because a language switcher that leads to a missing page is worse
than no switcher at all, and a half-translated site teaches an answer engine
that our pages are inconsistent.

---

## 1. Lock the termbase first

`src/content/termbase.ts` holds the terms that must read identically
everywhere: the three capabilities, the positioning statements, and the
method vocabulary. It is written in all four languages.

Before writing a single sentence of a new locale, read the termbase. The
capability names in particular are the entity: if Chinese calls the second
capability 「供应链服务」 on one page and 「供应链与交付」 on another, the two
are no longer the same business.

## 2. The order of work

For each language:

1. `site.ts` — brand, navigation, contact. The navigation decides which
   pages the locale will have.
2. `home.ts`, `contact.ts`, `process.ts`, `collaboration.ts` — the copy that
   appears on every page.
3. `services.ts` — the three capability pages, including the definitions,
   boundaries, cost drivers and the page-level questions.
4. `projects.ts` — the capability studies.
5. `about.ts` — the facts page. This is the one that carries the entity, and
   the one an answer engine is most likely to quote.
6. `faq.ts` — the standing question set.
7. `insights.ts` — the guides, and the most expensive part.

The navigation for a locale with no published insight library omits the
`Insights` entry. The locale is then published with the pages it actually
has, rather than with links that go nowhere.

## 3. How to translate

This is **localisation, not translation**. The English copy is written to be
read by an international business reader, and the target language should read
as though it was written by someone who works in that market.

- Keep the sentence structure where the meaning survives it. Where it does
  not, rewrite.
- Keep the answer-first pattern: the first sentence of a section answers its
  heading. This is the pattern the whole programme depends on.
- Keep every number, standard reference and source link identical. A source
  is a fact about the world, not about the language.
- Do not add claims that the English copy does not make. A translation is not
  an opportunity to be more specific than the source.
- Keep the disclaimers. The disclosure on every image and the "what we do not
  do" list are the reason the site can be trusted, and they must survive
  translation intact.

## 4. Right-to-left

Arabic is published with `dir="rtl"` and the IBM Plex Sans Arabic family.
Check four things before publishing:

- the header, the navigation and the mobile menu read correctly mirrored;
- the table on the facts page (the comparison table) keeps its column order
  sensible;
- the numbers in tables do not reorder;
- no letter-spacing is applied to Arabic text — it breaks the joining forms.

The screenshots in `.preview/` are the fastest way to check all four.

## 5. The gate before publishing

A language is published when all of these are true:

- `src/content/<locale>/` contains every module the navigation references;
- `src/content/<locale>/index.ts` exports a `dictionary` with the same shape
  as the English one — the shared types enforce this;
- the loader is registered in `src/lib/dictionary.ts`;
- the locale is added to `PUBLISHED_LOCALES` in `src/lib/locale.ts`;
- `npm run typecheck` and `npm run build` pass;
- `npm run geo:check` passes — it checks the hreflang map against the pages
  that actually exist, so a half-published language fails the gate;
- a native speaker has read the pages that carry the claims: the facts page,
  the three capability definitions, and the questions.

The first three are mechanical. The last one is not, and it is the one that
protects the entity.

## 6. What to check afterwards

Run `npm run geo:audit` and look at the answers in the new language. A locale
that exists but is never mentioned is a measurement problem, not a
translation problem — check that the pages are indexed before changing the
copy.