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

export const services = [
  {
    href: '/strategy',
    index: '01',
    title: 'Strategy & Consulting',
    lede: 'Turning a broad ambition into a defined, fundable, deliverable project.',
    description:
      'Positioning, feasibility, concept framing and project structuring for developers, design firms and operators — before a line is drawn or a supplier is appointed.',
    capabilities: [
      'Project definition & brief writing',
      'Feasibility and site-readiness review',
      'Concept framing and experience narrative',
      'Programme structuring and phasing',
      'Scope definition, cost planning and vendor strategy',
    ],
  },
  {
    href: '/creative-design',
    index: '02',
    title: 'Creative Design & R&D',
    lede: 'Design that survives contact with engineering, budget and fabrication.',
    description:
      'Concept design, spatial and experience design, visualisation and physical prototyping — developed in close dialogue with the people who will build and maintain it.',
    capabilities: [
      'Concept and spatial design development',
      'Industrial design and custom fixture design',
      '3D modelling, visualisation and rendered imagery',
      'Material, finish and lighting research',
      'Prototype fabrication, testing and refinement',
    ],
  },
  {
    href: '/supply-chain',
    index: '03',
    title: 'Supply Chain & Project Delivery',
    lede: 'From approved design to something standing on site.',
    description:
      'Sourcing, production management, quality control, logistics and site support, coordinated through our network of specialist and qualified manufacturing partners.',
    capabilities: [
      'Supplier identification, qualification and comparison',
      'RFQ management and commercial negotiation',
      'Production management and progress control',
      'Quality inspection and pre-shipment verification',
      'Logistics, shipping and on-site commissioning support',
    ],
  },
] as const;
