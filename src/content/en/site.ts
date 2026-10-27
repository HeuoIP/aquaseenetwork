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
  /**
   * The channels we are reachable on.
   *
   * PLACEHOLDER URLS: each link below is the shape the platform uses, with
   * the brand name as the handle. Replace them with the real accounts - a
   * link that lands on somebody else's profile is worse than no link.
   */
  social: [
    { label: '小红书', icon: 'xiaohongshu', href: 'https://www.xiaohongshu.com/user/profile/aquasee' },
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/aquasee-art' },
    { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@aquasee.art' },
    { label: 'WhatsApp', icon: 'whatsapp', href: 'https://wa.me/15550000000' },
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/aquasee.art' },
  ],
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
  marketsLine: 'Based in China. Working with clients across Asia, the Gulf, Europe and Africa.',
};