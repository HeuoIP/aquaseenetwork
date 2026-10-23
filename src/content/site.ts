/**
 * Global site configuration.
 *
 * The canonical host is `www.aquasee.art`. The apex `aquasee.art` permanently
 * redirects to it (see `src/proxy.ts`), so every generated URL — sitemap,
 * robots.txt, canonical and Open Graph links — points at one address only.
 *
 * TODO(before launch): confirm the legal company details and location. The
 * social array is intentionally empty — links only render once real accounts
 * exist.
 */
export const site = {
  name: 'AQUASEE',
  legalName: 'AQUASEE',
  domain: 'aquasee.art',
  canonicalHost: 'www.aquasee.art',
  url: 'https://www.aquasee.art',
  tagline: 'Strategy. Creative Design. Project Realization.',
  shortDescription:
    'Strategic consulting, creative design, product R&D and coordinated project delivery for developers, design practices and hospitality project owners.',
  contact: {
    email: 'victor@aquasee.art',
    location: 'Based in China — working with clients worldwide',
    phone: '',
  },
  social: [] as { label: string; href: string }[],
} as const;

export const nav = [
  { href: '/strategy', label: 'Strategy & Consulting' },
  { href: '/creative-design', label: 'Creative Design & R&D' },
  { href: '/supply-chain', label: 'Supply Chain & Delivery' },
  { href: '/projects', label: 'Projects & Capabilities' },
  { href: '/contact', label: 'Contact' },
] as const;

