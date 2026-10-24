# AQUASEE.ART — Overseas Business Website (V1)

Production website for **AQUASEE** — *Strategy. Creative Design. Project Realization.*

An English-first, business-development oriented corporate site for international clients:
property and destination developers, resorts and tourism operators, landscape and design
practices, theme-park and leisure developers, engineering / project-management firms, and
organisations seeking custom interactive installations.

Built with **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4**.
Static-first, no database, no CMS lock-in.

---

## 1. Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build and run:

```bash
npm run build
npm start
npm run typecheck    # tsc --noEmit
```

Requires Node.js 20.9+ (developed on Node 24).

---

## 2. Project structure

```
src/
├── app/
│   ├── [locale]/                  # ← every page lives under the locale segment
│   │   ├── layout.tsx             # Root layout (html lang/dir, fonts, Organization + WebSite JSON-LD)
│   │   ├── page.tsx               # Home
│   │   ├── strategy/              # Strategy & Consulting
│   │   ├── creative-design/       # Creative Design & R&D
│   │   ├── supply-chain/          # Supply Chain & Delivery
│   │   ├── projects/              # Capability studies
│   │   ├── about/                 # Entity facts page
│   │   ├── faq/                   # Questions, grouped by capability
│   │   ├── insights/              # Insight library
│   │   │   └── [slug]/            # One page per guide
│   │   ├── contact/               # Inquiry form
│   │   └── unsubscribe/           # One-click unsubscribe
│   ├── api/inquiry/               # Inquiry endpoint (validation + delivery + attribution)
│   ├── api/unsubscribe/           # Unsubscribe endpoint (Cloudflare KV)
│   ├── llms.txt/route.ts          # Machine-readable summary for answer engines
│   ├── llms-full.txt/route.ts     # The whole site as plain markdown
│   ├── global-not-found.tsx       # 404, rendered outside the locale tree
│   ├── robots.ts                  # Crawler policy (answer engines allowed, training crawlers blocked)
│   ├── sitemap.ts                 # Every published URL + hreflang alternates
│   ├── icon.tsx · opengraph-image.tsx
│   └── globals.css                # Design tokens (@theme), font stacks, RTL
├── components/
│   ├── art/ · home/ · service/ · site/ · ui/ · insights/
├── content/
│   ├── types.ts                   # The content model, shared by every language
│   ├── en/ · zh/ · ar/ · ru/      # One folder per language (all four published)
├── lib/
│   ├── locale.ts                  # Locales, URL rules, hreflang, rewrite rules
│   ├── dictionary.ts              # Content access per language
│   ├── metadata.ts · jsonld.ts    # Canonical URLs, hreflang, structured data
│   ├── attribution.ts             # Where an inquiry came from (AI engine, search, campaign)
│   └── inquiry.ts · cn.ts
├── proxy.ts                       # Canonical host + language routing
scripts/
├── research/                      # Demand mining (R2, R3)
├── geo/                           # Measurement (T2, T3) and the release gate
└── set-mail-secrets.mjs
docs/geo/                         # The GEO programme: memo, metrics, maps, ledger, scorecard
docs/editorial-rules.md           # How the copy is written: buyer first, not us first
docs/market-research.md           # Internal: where to research next (not site content)

The project images served on `/projects` live in `public/images/cases/`, one
web-ready WebP per piece, each labelled with the stage it was produced at
(rendering, concept sketch, concept plan). The 432 MB source library is not in
the repository.
```

**Editing content:** you never need to touch a component to change copy. Edit the
files in `src/content/<language>/` and the pages update. The three capabilities
live in one array (`services.ts`) so the homepage cards and the capability
pages can never drift apart.

### Languages

English is served from the root paths (`/strategy`); other languages carry a
prefix (`/zh/strategy`, `/ar/strategy`). The whole tree sits under a
`[locale]` segment, and an internal rewrite in `src/proxy.ts` maps the
unprefixed English URLs onto it — so a visitor never sees an `/en/` prefix
while the application still has exactly one implementation per page.

A language is only published when three things are true: its content module
exists, it is listed in `PUBLISHED_LOCALES` (`src/lib/locale.ts`), and its
loader is registered (`src/lib/dictionary.ts`). The language switcher, the
sitemap and the hreflang map all follow that list, so a language can never be
advertised before it exists.

**Published: English, Chinese, Arabic and Russian** — the four languages of
the programme. The insight library exists in English only, so the other three
omit it from their navigation and do not advertise its URLs. Two rules keep a half-built
language from leaking:

- the chrome (section headings, buttons, form labels, table headers) lives in
  `src/content/<locale>/ui.ts`, so a published language is published with its
  frame, not with English buttons;
- the hreflang map only advertises a language for a path that exists in it, so
  an English article that has no Chinese edition is never advertised as having
  one.

The Chinese edition has no insight library yet, so its navigation omits
`Insights` and the library page says so plainly.

## 3. Design system

Defined as CSS custom properties inside the `@theme` block of `src/app/globals.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--color-ink` | `#0c1013` | Dark ground, headings |
| `--color-paper` | `#fbfaf8` | Page background |
| `--color-sand` | `#f1eee7` | Alternating section ground |
| `--color-accent` | `#0e5a54` | The single accent (deep aqua) |
| `--color-accent-2` | `#2f8a81` | Mid tint |
| `--color-aqua` | `#8ad9cf` | Light tint — small text on dark grounds |
| `--font-display` | Newsreader (serif) | Headlines |
| `--font-sans` | Inter | Body / UI |
| `--font-mono` | IBM Plex Mono | Eyebrows, labels, metadata |

Motion is limited to the homepage hero plus a single scroll-reveal transition, and all of it is
disabled under `prefers-reduced-motion`. The reveal is progressive enhancement: without
JavaScript the content renders visible.

### Hero shell — "Idea → Structure → Realization"

`src/components/site/HeroShell.tsx` owns the visual signature and its four motion layers;
`src/components/home/Hero.tsx` and `src/components/service/CapabilityHero.tsx` supply the copy.
The `.hero-*` rules live in `src/app/globals.css`.

Applied on the homepage, all three capability pages and the projects page, each with its own
key art. Layout is identical across them: full-bleed art behind a two-column grid from `lg` up,
recomposed into copy → art band → summary row below it.

| Layer | What it does | How |
| --- | --- | --- |
| A · atmosphere | a very slow shift in background light | `.hero-atmosphere`, 30 s alternate keyframe on a radial-gradient |
| B · trajectories | three fine aqua contour lines drifting across the key art | inline SVG paths, `stroke-dasharray` + `stroke-dashoffset` keyframe, 28/38/48 s |
| C · parallax | the key art drifts a few pixels toward/away from the pointer | CSS variables `--hero-px` / `--hero-py` written from a single `pointermove` listener — React never re-renders |
| D · entrance | headline, copy, CTAs and summary fade up in sequence | `.hero-enter` with staggered `animation-delay` (50–450 ms) |

No animation framework, no WebGL, no new dependency. The key art is a `next/image` fill layer;
the decorative SVG and the image itself are hidden from assistive technology, and the visual is
labelled *"Creative concept visualization"* so it is never read as a completed client project.

Pointer parallax is skipped for `prefers-reduced-motion` and for touch devices
(`hover: none`). Under reduced motion the hero renders as a static composition and the headline
falls back to its natural visible state.

The reveal is deliberately defensive (`src/components/ui/Reveal.tsx`). It combines
IntersectionObserver, a shared scroll sweep and a 400 ms polling fallback, and it treats an
element the reader has already scrolled past as "reached". A missed scroll event — background
tabs, embedded browsers, anchor links, a restored scroll position, a fast flick — can therefore
never leave a section permanently invisible.

---

## 4. The inquiry form — read this before launch

`POST /api/inquiry` validates the payload server-side (shared validator in
`src/lib/inquiry.ts`) and then attempts delivery through **one of three channels**:

| Priority | Channel | Environment variables |
| --- | --- | --- |
| A | Generic webhook (Zapier / Make / n8n / Formspree-style) | `INQUIRY_WEBHOOK_URL` (optional `INQUIRY_WEBHOOK_SECRET`) |
| B | SMTP email — Feishu Mail / Lark Mail, Tencent Exmail, Alibaba Mail, any SMTP server | `SMTP_HOST` + `SMTP_PORT` + `SMTP_USER` + `SMTP_PASS` + `INQUIRY_TO_EMAIL` (optional `INQUIRY_FROM_EMAIL`, `SMTP_SECURE`) |
| C | Direct email via Resend | `RESEND_API_KEY` + `INQUIRY_TO_EMAIL` (optional `INQUIRY_FROM_EMAIL`) |
| — | **Nothing configured** | returns `503 delivery_not_configured` |

Delivery target in production: **Feishu Mail** (`smtp.feishu.cn`) delivering to
`victor@aquasee.art` using a client-specific password from 飞书邮箱 → 设置.

**The site never claims an inquiry was sent when it was not.** With no channel configured the
form shows an explicit "Your inquiry was not sent" state plus a *mailto* link with the message
pre-filled, so no lead is silently lost.

Copy `.env.example` to `.env.local` and fill in one channel:

```bash
cp .env.example .env.local
```

Webhook payload shape:

```json
{
  "reference": "AQS-261021-8TET",
  "receivedAt": "2026-10-21T10:30:00.000Z",
  "inquiry": {
    "name": "...", "company": "...", "email": "...", "country": "...",
    "projectType": "...", "services": ["..."], "description": "...",
    "budget": "...", "timeline": "..."
  }
}
```

Other protections: a honeypot field, server-side length caps, email format validation, and
`X-Content-Type-Options` / `Referrer-Policy` / `X-Frame-Options` headers (set in
`next.config.ts`).

> **Before launch:** connect a delivery channel (Option A, B or C) and send a real test inquiry
> end-to-end. Until then the form is honest but not yet operational.

---

## 5. Deployment

Production target: **Cloudflare Workers** (through the OpenNext adapter). The site is deployed
as a Worker with a static asset binding, so there is no server to manage and no VPS.

### 5.1 One-time local commands

```bash
npm install
npm run build:opennext          # Next build + OpenNext bundle -> .open-next/
npm run preview:cloudflare      # run the Worker locally, exactly as it behaves in production
npm run deploy:cloudflare       # build + push to Cloudflare
npm run deploy:cloudflare:dry   # build + validate the upload without publishing
```

`open-next.config.ts` and `wrangler.jsonc` in the repository root drive this flow. The Worker
is named `aquasee-website`, runs with the `nodejs_compat` flag and serves the built assets
through the `ASSETS` binding. Observability is enabled.

### 5.2 Automatic deployment (GitHub Actions)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`, and can also be run
manually from the Actions tab. Two repository secrets are required:

| Secret | Value |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Workers edit rights |
| `CLOUDFLARE_ACCOUNT_ID` | The account id shown in the Cloudflare dashboard sidebar |

The workflow runs `npm ci` → `npm run typecheck` → `npm run build:opennext` → `wrangler deploy`,
so a broken type or build never reaches production.

### 5.3 Runtime secrets (inquiry delivery)

The inquiry API route reads its delivery settings from Worker secrets, not from files:

```bash
npx wrangler secret put SMTP_HOST        # e.g. smtp.feishu.cn
npx wrangler secret put SMTP_PORT        # 465 (SSL) or 587 (STARTTLS)
npx wrangler secret put SMTP_USER        # victor@aquasee.art
npx wrangler secret put SMTP_PASS        # client-specific password from Feishu Mail
npx wrangler secret put INQUIRY_TO_EMAIL # victor@aquasee.art
npx wrangler secret put INQUIRY_FROM_EMAIL
```

`npm run deploy:cloudflare` never overwrites secrets — they stay attached to the Worker.

**Current delivery channel:** Feishu Mail (飞书邮箱) over SMTP, delivering to `victor@aquasee.art`.

| Variable | Value |
| --- | --- |
| `SMTP_HOST` | `smtp.feishu.cn` |
| `SMTP_PORT` | `465` (SSL) |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `victor@aquasee.art` |
| `SMTP_PASS` | client-specific password from 飞书邮箱 → 设置 → 第三方邮箱客户端登录 |
| `INQUIRY_TO_EMAIL` | `victor@aquasee.art` |
| `INQUIRY_FROM_EMAIL` | `victor@aquasee.art` |

The password is the only secret; it lives in `.env.local` locally and in Worker secrets in
production. It is never committed.

**Local development.** Copy `.env.example` to `.env.local` and fill in the values above — Next
loads `.env.local` automatically and `npm run dev` then delivers real inquiry emails instead of
the `delivery_not_configured` fallback.

**Verification.** `POST /api/inquiry` returns `{"ok":true,"channel":"email"}` when the channel
works, `503 delivery_not_configured` when no channel is configured, and `502 delivery_failed`
when a channel is configured but the delivery failed.
### 5.4 Other hosts

`npm run build` produces a self-contained server bundle. Hosts that need a plain static export
can be served via `output: 'export'` in `next.config.ts` — but note the inquiry API route then
needs to move to a separate function or serverless endpoint.

---

## 6. Custom domain, HTTPS and the canonical host

The canonical host is **`www.aquasee.art`**. The apex `aquasee.art` answers with a permanent
(308) redirect to it, so the two addresses are never treated as two separate sites.

1. `wrangler.jsonc` lists both `www.aquasee.art` and `aquasee.art` as Worker custom domains.
   Because the zone is already on Cloudflare, attaching them issues the TLS certificate
   automatically — nothing to buy and nothing to renew by hand.
2. The apex → www redirect itself lives in `src/middleware.ts`, so it behaves identically
   everywhere rather than depending on a dashboard rule.
3. `site.url` in `src/content/site.ts` feeds `metadataBase`, the sitemap, robots.txt and every
   canonical/Open Graph URL. Change it there and rebuild if the host ever changes.
4. Re-run `npm run build:opennext` so the generated sitemap and OG URLs point at the final host.

---

## 7. SEO and metadata

- Per-page `<title>`, meta description and canonical URL (`src/app/*/page.tsx`).
- Open Graph + Twitter card metadata in `src/app/layout.tsx`; the share image is generated at
  `/opengraph-image` (1200×630).
- `sitemap.xml` and `robots.txt` generated from `src/app/sitemap.ts` and `src/app/robots.ts`.
- One `<h1>` per page, semantic landmarks (`header` / `main` / `footer`), skip-to-content link,
  labelled form controls, `aria-invalid` + `aria-describedby` on errors, visible focus rings.

---

## 8. Before you go live — checklist

### Content that must be replaced with verified information

| Item | Where | Current value |
| --- | --- | --- |
| Contact email | `src/content/site.ts` → `site.contact.email` | `hello@aquasee.art` (placeholder) |
| Base location | `src/content/site.ts` → `site.contact.location` | "Based in China — working with clients worldwide" (placeholder) |
| Phone | `src/content/site.ts` → `site.contact.phone` | empty — add when available |
| Social links | `src/content/site.ts` → `site.social` | empty array — links render only when populated |
| Company legal name | `src/content/site.ts` → `site.legalName` | `AQUASEE` |
| Inquiry delivery | `.env.local` | not configured — see section 4 |

### Imagery

There is **no client project photography** on this site, by design — AQUASEE has not authorised
publication of completed projects.

The current visuals are:

| File | Used on | Nature |
| --- | --- | --- |
| `public/images/aquasee-hero-lab-v2.webp` | Homepage hero | Generated concept artwork (see below) |
| `public/images/aquasee-key-strategy.webp` | Strategy & Consulting hero | Generated concept artwork |
| `public/images/aquasee-key-design.webp` | Creative Design & R&D hero | Generated concept artwork |
| `public/images/aquasee-key-supply.webp` | Supply Chain & Delivery hero | Generated concept artwork |
| `public/images/aquasee-key-projects.webp` | Projects & Capabilities hero | Generated concept artwork |
| `public/images/service-strategy-consulting.webp` | Strategy page body + homepage card | Service illustration (cultural-tourism planning) |
| `public/images/service-creative-design.webp` | Creative Design body + homepage card | Service illustration (landscape play environment) |
| `public/images/service-supply-chain.webp` | Supply Chain body + homepage card | Service illustration (deconstructed modules on a partner workshop floor) |
| `public/images/study-resort-arrival.webp` | Projects — resort arrival study | Generated concept render |
| `public/images/study-water-play.webp` | Projects — water-play study | Generated concept render |
| `public/images/study-play-equipment.webp` | Projects — play equipment study | Generated concept render |
| `public/images/study-installation.webp` | Projects — interactive installation study | Generated concept render |
| `public/images/study-landscape.webp` | Projects — landscape integration study | Generated concept render |
| `public/images/study-thematic.webp` | Projects — thematic fabrication study | Generated concept render |
| `public/images/prototype-workshop.webp` | *currently unreferenced* | Real workshop photograph, kept for a future case study |

The homepage carries the three service illustrations on the capability cards. The projects page
carries one generated concept render per case study, each labelled *"Concept render — generated
illustration, not a completed project"*, with a banner explaining that no client project imagery
has been authorised for publication yet.
| `src/components/art/` | Projects (2 studies) | Abstract SVG diagrams |

Every photographic visual carries an **on-image disclosure chip** (rendered by
`src/components/ui/ImageDisclosure.tsx`) plus a matching `disclosure` string in the content file,
and the projects page opens with a banner explaining what the visuals are. The site never presents
a render, prototype or diagram as a delivered project.

When real, authorised project photography becomes available:

1. Drop optimised files in `public/images/` (AVIF or WebP, ≤ 250 KB each).
2. Point the study's `visual.src` in `src/content/projects.ts` at the new file and update `alt`.
3. Change the `disclosure` string to `Completed project` and add the real attribution, client and
   year.
4. Remove the disclosure banner at the top of the projects page and the chip on the hero.

**Do not** present a render, prototype or concept as a completed project.

### Regenerating the hero artwork

The hero key art was produced with the project's configured image service. To regenerate it:

```bash
python "<codex-home>/skills/text-to-image/scripts/t2i.py" \
  --prompt "<the hero prompt>" \
  --provider nanobanana \
  --model "gpt-image-2.5-ext" \
  --size "16:9" \
  --resolution 2K \
  --out "public/images/aquasee-hero-lab-v2.raw.png"
```

Then convert it to WebP with sharp (already a transitive dependency) and update the `src` in
`src/components/home/Hero.tsx`. Use a **new filename** when replacing an image — Next.js caches
optimised images by URL, so reusing a path serves the stale file.

The same command produced the four capability / projects key arts
(`aquasee-key-strategy`, `-design`, `-supply`, `-projects`), the three service illustrations
(`service-strategy-consulting`, `service-creative-design`, `service-supply-chain`) and the six
case-study renders (`study-resort-arrival`, `-water-play`, `-play-equipment`, `-installation`,
`-landscape`, `-thematic`).

### Supply-chain positioning

The supply-chain capability page is written from a deliberate position: **AQUASEE does not
manufacture.** It brings the product-deconstruction and production-organisation experience to the
client, so a product can be delivered complete, as a kit the client assembles, or as
semi-finished modules the client's own team completes — with each route costed against one
specification.

This wording lives on the supply-chain page only. The homepage introduction, the collaboration
model ("Qualified partners, not owned factories") and the footer keep their existing framing.

> **Check before launch:** the six AI points on the Strategy and Creative Design pages describe
> how AI is used *in our own workflow*. Confirm they match what the team actually does — the
> site must not claim something you have not done.

### Claims to keep accurate

The copy deliberately avoids claiming owned factories, a large in-house design team, or
certifications that have not been verified. The collaboration model states plainly that AQUASEE
works with external specialists and qualified manufacturing partners. Keep it that way unless
the underlying facts change.

---

## 9. Accessibility & performance notes

- Skip link, semantic landmarks, one `h1` per page, logical heading order.
- All imagery is inline SVG marked `aria-hidden` with meaningful adjacent text, so there are no
  missing `alt` attributes and no layout shift.
- Interactive controls are keyboard reachable with a visible `:focus-visible` ring.
- The mobile navigation traps nothing and closes on route change; `body` scroll is locked only
  while the menu is open.
- Fonts are self-hosted by `next/font` (subset, `display: swap`) — no third-party font request
  at runtime.
- Every page except the API route is statically prerendered.

---

## 10. Repository hygiene

- `.env` and `.env*.local` are git-ignored — never commit API keys.
- `.env.example` documents every supported variable without any real values.
- `node_modules`, `.next` and build output are git-ignored.

---

## 11. The GEO programme

The site is written to be **cited by answer engines** — ChatGPT, Claude,
Perplexity, Gemini, Copilot — in the target markets: the Gulf, Southeast and
East Asia, Oceania, Eastern Europe, Central Asia and Africa, where tourism,
public-space and children’s-play investment is active.

Everything about that goal is documented in `docs/geo/`:

| File | What it holds |
| --- | --- |
| `methodology-memo.md` | The methods adopted (from the Princeton GEO paper), the ones deliberately rejected, the battlefield decision and the instruments that actually work |
| `metrics-dictionary.md` | Every metric, its formula and how it is measured |
| `demand-map.md` | The buyer question bank, collected from real search data |
| `competitive-map.md` | Which page shapes win those questions, and who owns them |
| `experiment-ledger.md` | One row per iteration round — hypothesis, change, result, decision |
| `scorecard.md` | The four layers and eight metrics, generated from the measurements |
| `answer-audit.md` · `search-visibility.md` | The latest measurements |

### The four layers

| Layer | Question | Instrument |
| --- | --- | --- |
| L1 retrievability | Can the target market find us at all? | Crawler logs, search visibility tracking, webmaster tools |
| L2 citation | Do engines answer with us? | The answer audit — a fixed set of 26 buyer questions |
| L3 framing | Do engines describe us correctly? | The same audit, scored on the service-vs-manufacturer test |
| L4 commercial | Do those visitors become inquiries? | The inquiry source field on every inquiry |

### Running it

```bash
npm run geo:check       # release gate: JSON-LD, hreflang, sitemap, llms.txt, framing
npm run geo:runtime     # the same gate, against a running server (local Worker preview)
npm run geo:audit       # the answer audit (no API key needed)
npm run geo:serp        # weekly search visibility tracking
npm run geo:scorecard   # one page with the four layers and eight metrics
npm run research:demand # re-mine the question bank
npm run research:serp   # re-map the competitive landscape
```

`npm run geo:check` runs against the build output and is the gate to pass
before publishing: it fails the build if a page loses its JSON-LD, if a
hreflang points at a page that does not exist, if the sitemap drifts from the
route set, if `llms.txt` stops matching the pages, or if any page describes
AQUASEE as a manufacturer. It is language-aware: every page is checked with
the rules of its own language, not with the English ones.

`npm run geo:runtime` is the second half of the gate. The build can be green
and the site still broken in the runtime it is served from — the internal
language rewrite, the prefixed routes, the asset handling. It drives a
running local server (the workerd preview, or `next dev`) over every
published language, every route and every hreflang target, and asserts that
each one answers. It never touches Cloudflare: the target is a local server.

### The one thing that must not drift

AQUASEE is a **service company** — early-stage consulting, creative design and
R&D, and organised supply chain through to delivery. It does not manufacture and
does not own factories. Every page states this, and the audit scores it. The
vertical is dominated by equipment suppliers, so the site competes on decision
and specification questions, never on "who is the manufacturer".


---

© AQUASEE. All rights reserved.








