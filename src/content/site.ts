/**
 * Global site configuration.
 *
 * TODO(before launch): verify every value in `contact` and replace the
 * placeholder email / location with confirmed company details. The social
 * array is intentionally empty — links only render once real accounts exist.
 */
export const site = {
  name: 'AQUASEE',
  legalName: 'AQUASEE',
  domain: 'aquasee.art',
  url: 'https://aquasee.art',
  tagline: 'Strategy. Creative Design. Project Realization.',
  shortDescription:
    'Strategic consulting, creative design, product R&D and coordinated project delivery for developers, design practices and hospitality project owners.',
  contact: {
    email: 'hello@aquasee.art',
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
] as const;


