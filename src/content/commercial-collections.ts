import { productCategories } from '@/content/products';

export const collectionDetails = {
  'pool-slides': {
    eyebrow: 'First collection focus',
    headline: 'A considered slide belongs to the pool.',
    intro: 'Sculptural metal pool slides can bring play to a private pool or a smaller hospitality setting. Proportion, access and the landing area matter as much as the silhouette. The image is a design direction, not a specified model.',
    suitableFor: ['Private residential pools', 'Boutique hotels and resorts', 'Small family leisure pools'],
    considerations: ['Pool depth, landing zone and circulation', 'Age group and supervision', 'Local safety requirements and installation access'],
    gallery: [
      { src: '/images/concepts/pool-slides.webp', alt: 'AI concept study of a compact curved pool slide in a private outdoor setting.', caption: 'A compact slide form for a private outdoor pool setting.' },
      { src: '/images/concepts/mj82-metal-slide-scene-v1.webp', alt: 'AI concept study of a metal pool slide in a landscaped leisure setting.', caption: 'A larger setting study exploring slide form and landscape integration.' },
      { src: '/images/concepts/pool-slides-v2.webp', alt: 'AI concept of a child using a sculptural metal pool slide.', caption: 'A sculptural slide direction at a family pool.' },
    ],
  },
  'pool-shade': {
    eyebrow: 'First collection focus',
    headline: 'Shade for the space where children play.',
    intro: 'Sail-shaped fabric and tensile membrane shade can protect outdoor play areas and shape a lighter poolside setting. Every installation depends on sun path, wind, anchoring and the site.',
    suitableFor: ['Children’s outdoor play areas', 'Resort leisure areas', 'Small water-play zones'],
    considerations: ['Sun orientation and desired coverage', 'Wind exposure and anchor locations', 'Drainage, maintenance and local approvals'],
    gallery: [
      { src: '/images/concepts/pool-shade.webp', alt: 'AI concept study of tensile fabric sails shading an outdoor leisure area.', caption: 'A fabric sail arrangement explored for a different outdoor setting.' },
      { src: '/images/concepts/mj82-play-shade-scene-v1.webp', alt: 'AI concept study of children playing beneath warm-toned tensile fabric sails.', caption: 'A children’s outdoor play setting defined by fabric shade.' },
      { src: '/images/concepts/pool-shade-v2.webp', alt: 'AI concept of children playing beneath tensile fabric sails.', caption: 'A closer view of shade over an outdoor play area.' },
    ],
  },
  'compact-water-parks': {
    eyebrow: 'Developing collection',
    headline: 'One theme, one small water-play destination.',
    intro: 'A micro water park combines splash sculptures, a compact slide and shade around one shared theme. It is a coordinated scene assembled from product directions, rather than a separate equipment line or a completed project.',
    suitableFor: ['Boutique resorts', 'Family leisure venues', 'Small destination developments'],
    considerations: ['Available footprint and visitor flow', 'Water treatment and operation', 'Age zoning, access and supervision'],
    gallery: [
      { src: '/images/concepts/compact-water-parks-v3.webp', alt: 'AI concept of a red small water-play structure with slides and spray arches beside a modern venue.', caption: 'Another site and colour direction for a coordinated water-play area.' },
      { src: '/images/concepts/compact-water-parks-layout-v1.webp', alt: 'AI concept of a blue and orange water-play structure with small slides and spray arches.', caption: 'A layout study showing how play elements can sit together in one footprint.' },
      { src: '/images/concepts/mj82-micro-park-scene-v1.webp', alt: 'AI concept of a compact resort water-play setting.', caption: 'A wider view of a compact destination play setting.' },
    ],
  },
  'splash-play-facilities': {
    eyebrow: 'Developing collection',
    headline: 'Sculptural play shaped by a story.',
    intro: 'Themed splash sculptures are a core design and development direction. Their forms invite children to touch, move and discover water in a shared setting. The image explores one possible theme, not a manufactured product.',
    suitableFor: ['Family pool areas', 'Community leisure spaces', 'Hospitality children’s zones'],
    considerations: ['Water depth and surface', 'Age range and caregiver sightlines', 'Water management and maintenance access'],
    gallery: [
      { src: '/images/concepts/splash-bamboo-v1.webp', alt: 'AI concept of children interacting with green leaf-shaped splash sculptures.', caption: 'A leaf-inspired family of sculptural water features.' },
      { src: '/images/concepts/splash-whale-tail-v1.webp', alt: 'AI concept of children beside a metal whale-tail-inspired splash sculpture.', caption: 'A sea-inspired form explored as a water-play focal point.' },
      { src: '/images/concepts/splash-cloud-rain-v1.webp', alt: 'AI concept of a child exploring a cloud-shaped water curtain.', caption: 'A cloud-inspired water curtain for interactive play.' },
    ],
  },
} as const;

export type CollectionSlug = keyof typeof collectionDetails;
export const collectionSlugs = Object.keys(collectionDetails) as CollectionSlug[];
export function collectionFor(slug: string) {
  const details = collectionDetails[slug as CollectionSlug];
  const category = productCategories.find((item) => item.slug === slug);
  return details && category ? { ...details, category } : null;
}
