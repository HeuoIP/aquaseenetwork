import type { HomeContent } from '@/content/types';

export const home: HomeContent = {
  hero: {
    eyebrow: 'Water Play · Slides · Shade',
    artAlt: 'AI concept visualisation of children playing beside a whale-tail-inspired splash sculpture and water jets; not a built project or available product.',
    titleTop: 'Water products',
    titleBottom: 'with a point of',
    titleAccent: 'view.',
    lede:
      'Sculptural Pool Slides, Outdoor Shade and themed water-play concepts for private pools, boutique hospitality and leisure spaces.',
    ctaPrimary: 'Explore Pool Slides',
    ctaSecondary: 'Explore Outdoor Shade',
    summary: [
      { k: 'Pool Slides', v: 'Compact & design-led' },
      { k: 'Outdoor Shade', v: 'Fabric sails for play' },
      { k: 'Water play', v: 'Themed sculptural spaces' },
      { k: 'Approach', v: 'Designed for each site' },
    ],
  },
  intro: {
    eyebrow: 'Why us',
    title: 'The right scale of water play for your site.',
    paragraphs: [
      'A resort, community venue or family home does not need a giant water park to create a memorable experience. It needs a clear fit between the site, the people using it, the available space and the operating budget.',
      'We are building a focused collection around those constraints: sculptural metal pool slides, fabric shade over children’s play, and themed splash pieces. Micro water parks bring these elements together in one coherent scene.',
      'Every product page will say what is known, what needs checking and what to prepare before asking for a quote.',
    ],
    audiences: [
      'Boutique hospitality pools',
      'Resorts & family venues',
      'Residential pool owners',
      'Landscape & pool designers',
    ],
    strip: [
      { src: '/images/concepts/pool-slides-v2.webp', alt: 'AI concept of a child using a sculptural metal pool slide.', kind: 'illustration' },
      { src: '/images/concepts/pool-shade-v2.webp', alt: 'AI concept of children playing beneath tensile fabric sails.', kind: 'illustration' },
      { src: '/images/concepts/splash-cloud-rain-v1.webp', alt: 'AI concept of a child exploring a cloud-shaped water curtain.', kind: 'illustration' },
      { src: '/images/concepts/compact-water-parks-layout-v1.webp', alt: 'AI concept of a compact coordinated water-play structure and spray arches.', kind: 'illustration' },
    ],
  },
  process: {
    eyebrow: 'How We Work',
    title: 'A clear path from brief to handover.',
    lede:
      'Six stages, each with defined decisions and deliverables. You always know what is happening, what is being decided, and what it costs.',
    note:
      'Durations are indicative. A project that reaches us mid-stream may skip stages, and a full custom programme runs considerably longer than the indicative windows shown above.',
  },
  collaboration: {
    eyebrow: 'Collaboration',
    title: 'What you can hold us to.',
    lede:
      'Good results come from clear expectations, honest numbers and a few relationships you can hold us to. That is how we work — and the six items below are what it actually means.',
    audiencesLabel: 'We work with',
  },
  cta: {
    eyebrow: 'Start an Enquiry',
    title: 'Find the right starting point for your pool or leisure space.',
    body:
      'Tell us where the product will be used, what you are considering and what is already known. We will come back with the questions that matter before a quote is prepared.',
    primary: 'Start an Enquiry',
  },
};
