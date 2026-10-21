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
│   ├── layout.tsx            # Root layout, fonts, global metadata, OG image
│   ├── page.tsx              # Home
│   ├── globals.css           # Design tokens (@theme), base styles, utilities
│   ├── icon.tsx              # Favicon (generated)
│   ├── opengraph-image.tsx   # Social share card (generated)
│   ├── robots.ts             # robots.txt
│   ├── sitemap.ts            # sitemap.xml
│   ├── not-found.tsx         # 404
│   ├── strategy/             # Service page — Strategy & Consulting
│   ├── creative-design/      # Service page — Creative Design & R&D
│   ├── supply-chain/         # Service page — Supply Chain & Project Delivery
│   ├── projects/             # Selected Projects & Capabilities
│   ├── contact/              # Start a Project (inquiry form)
│   └── api/inquiry/          # Inquiry endpoint (validation + delivery)
├── components/
│   ├── art/                  # Abstract SVG compositions (HeroArt, Art)
│   ├── contact/              # InquiryForm (client component)
│   ├── home/                 # Homepage sections
│   ├── service/              # Shared service-page template
│   ├── site/                 # Header, Footer
│   └── ui/                   # Action, SectionHeader, DisclosureTag, Reveal
├── content/                  # ← ALL EDITABLE COPY LIVES HERE
│   ├── site.ts               # Brand, nav, services index, contact details
│   ├── services.ts           # Full service page content
│   ├── projects.ts           # Capability studies
│   ├── process.ts            # Six-stage workflow
│   └── collaboration.ts      # Collaboration model, audience list
└── lib/
    ├── inquiry.ts            # Field options, validation, sanitisation
    └── cn.ts
```

**Editing content:** you never need to touch a component to change copy. Edit the files in
`src/content/` and the pages update. Adding a service page means adding one entry to
`serviceDetails` in `src/content/services.ts` and one thin route file.

---

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

Motion is limited to a single scroll-reveal transition and is fully disabled under
`prefers-reduced-motion`. The reveal is progressive enhancement: without JavaScript the
content renders visible.

---

## 4. The inquiry form — read this before launch

`POST /api/inquiry` validates the payload server-side (shared validator in
`src/lib/inquiry.ts`) and then attempts delivery through **one of two channels**:

| Priority | Channel | Environment variables |
| --- | --- | --- |
| A | Generic webhook (Zapier / Make / n8n / Formspree-style) | `INQUIRY_WEBHOOK_URL` (optional `INQUIRY_WEBHOOK_SECRET`) |
| B | Direct email via Resend | `RESEND_API_KEY` + `INQUIRY_TO_EMAIL` (optional `INQUIRY_FROM_EMAIL`) |
| — | **Nothing configured** | returns `503 delivery_not_configured` |

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

> **Before launch:** connect a delivery channel (Option A or B) and send a real test inquiry
> end-to-end. Until then the form is honest but not yet operational.

---

## 5. Deployment

The site is a standard static Next.js build — it runs on any managed host. No VPS is required.

### 5.1 Vercel (fastest route)

```bash
npx vercel          # preview
npx vercel --prod   # production
```

No configuration file is required. Set the environment variables from section 4 in the project
settings.

### 5.2 Cloudflare Pages

Cloudflare Pages needs the OpenNext adapter to serve a Next.js App Router project:

```bash
npm i -D @opennextjs/cloudflare
npx opennextjs-cloudflare build     # output -> .open-next/
npx opennextjs-cloudflare deploy
```

`open-next.config.ts` and `wrangler.jsonc` in the repository root are pre-written for this
flow. In the Cloudflare dashboard set:

- **Build command:** `npx opennextjs-cloudflare build`
- **Build output directory:** `.open-next`
- **Node version:** 20 or newer

### 5.3 Any other static host

`npm run build` produces a self-contained server bundle. Hosts that need a plain static
export can be served via `output: 'export'` in `next.config.ts` — but note the inquiry API
route then needs to move to a separate function or serverless endpoint.

---

## 6. Custom domain and HTTPS

1. Point `aquasee.art` (and `www.aquasee.art`) at the host:
   - **Vercel:** add the domain in Project → Settings → Domains; Vercel issues the TLS
     certificate automatically.
   - **Cloudflare:** create a CNAME to the Pages project, or use the Cloudflare for
     SaaS/custom-domain attach. Cloudflare issues the certificate automatically.
2. Redirect one apex → www (or the reverse) so there is a single canonical host.
3. Update `site.url` in `src/content/site.ts` if the canonical host changes — it feeds
   `metadataBase`, the sitemap, robots.txt and every canonical/OG URL.
4. Re-run `npm run build` so the generated sitemap and OG URLs point at the final host.

HTTPS is handled by the host; no certificates are managed inside this repository.

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

There is **no project photography** on this site, by design. Every visual is an abstract SVG
composition generated in `src/components/art/`, and every project entry is labelled
*"Concept study — illustrative visualisation, not a completed project"*.

When real, authorised project photography becomes available:

1. Drop optimised files in `public/projects/<slug>/` (AVIF/WebP, ≤ 200 KB each).
2. Replace the `<Art>` block in `src/app/projects/page.tsx` with `next/image`.
3. Update the `disclosure` string in `src/content/projects.ts` to `Completed project` and add
   the real attribution, client and year.
4. Remove the disclosure banner at the top of the projects page.

**Do not** present a render, prototype or concept as a delivered project.

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

© AQUASEE. All rights reserved.
