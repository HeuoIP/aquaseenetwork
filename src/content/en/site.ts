import type { SiteConfig } from '@/content/types';

/**
 * Brand, navigation and contact details — English.
 *
 * Only the English variant declares the full navigation. Languages that have
 * not yet published the insight library omit that entry rather than linking to
 * a page that does not exist.
 */
export const site: SiteConfig = {
  name: 'AQUASEE',
  legalName: 'AQUASEE',
  domain: 'aquasee.art',
  canonicalHost: 'www.aquasee.art',
  url: 'https://www.aquasee.art',
  tagline: 'Strategy. Creative Design. Project Realization.',
  shortDescription:
    'A China-based service company for tourism, public space and children’s play projects — early-stage consulting, creative design and R&D, and organised supply chain through to delivery.',
  contact: {
    email: 'victor@aquasee.art',
    location: 'Based in China — working with clients worldwide',
    phone: '',
  },
  social: [],
  nav: [
    { href: '/strategy', label: 'Strategy & Consulting' },
    { href: '/creative-design', label: 'Creative Design & R&D' },
    { href: '/supply-chain', label: 'Supply Chain & Delivery' },
    { href: '/projects', label: 'Projects & Capabilities' },
    { href: '/insights', label: 'Insights' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ],
  ctaLabel: 'Start a Project',
  marketsLine:
    'Working across the Gulf, Southeast Asia, East Asia, Oceania, Eastern Europe, Central Asia and Africa.',
};