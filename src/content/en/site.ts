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
  tagline: 'Design-led water products for pools and leisure spaces',
  shortDescription:
    'AQUASEE selects and supplies design-led Pool Slides, Outdoor Shade and compact water-play products for pools, resorts and leisure spaces.',
  contact: {
    email: 'victor@aquasee.art',
    location: 'Based in China — working with clients worldwide',
    phone: '+86 15913150818',
  },
  /**
   * The channels we are reachable on.
   *
   * Instagram and LinkedIn are not here yet: the accounts do not exist, and
   * a link to a page that is not there is worse than no link at all. The
   * marks for both are already drawn - add the entry here when the account
   * is registered.
   */
  social: [
    { label: '小红书', icon: 'xiaohongshu', href: 'https://www.xiaohongshu.com/user/profile/5fafc21f000000000101cc5b' },
    { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@louiselau' },
    { label: 'WhatsApp', icon: 'whatsapp', href: 'https://wa.me/8615913150818' },
  ],
  nav: [
    { href: '/collections/pool-slides', label: 'Pool Slides' },
    { href: '/collections/pool-shade', label: 'Outdoor Shade' },
    { href: '/collections/compact-water-parks', label: 'Water Parks' },
    { href: '/collections/splash-play-facilities', label: 'Splash Play' },
    { href: '/concept-collection', label: 'Concepts' },
    { href: '/about', label: 'About' },
    { href: '/inquiry/business', label: 'Enquire' },
  ],
  ctaLabel: 'Start an Enquiry',
};
