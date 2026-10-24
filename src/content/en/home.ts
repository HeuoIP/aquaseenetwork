import type { HomeContent } from '@/content/types';

export const home: HomeContent = {
  hero: {
    eyebrow: 'Strategy · Design · Realization',
    titleTop: 'From Ambitious Ideas',
    titleBottom: 'to Real-World',
    titleAccent: 'Projects.',
    lede:
      'A China-based service company for tourism, public space and children’s play projects — early-stage consulting, creative design and R&D, and organised supply chain through to delivery.',
    ctaPrimary: 'Start a Project',
    ctaSecondary: 'Explore Our Capabilities',
    summary: [
      { k: 'Strategy', v: 'Brief to programme' },
      { k: 'Design', v: 'Concept to specification' },
      { k: 'Delivery', v: 'Source to site' },
      { k: 'Partners', v: 'Qualified network' },
    ],
  },
  intro: {
    eyebrow: 'Who We Are',
    title: 'A single team spanning strategy, design and delivery.',
    paragraphs: [
      'AQUASEE helps developers, design firms and project teams turn ambitious ideas into achievable projects. We connect strategic planning, creative design, product development and coordinated delivery under one roof of responsibility.',
      'We are deliberately not a factory and we do not present ourselves as one. We work with external specialists and qualified manufacturing partners, selecting the right capability for each requirement and holding it to a single brief.',
      'What that produces is simple: fewer handoffs, fewer gaps between the drawing and the site, and a project that keeps its intent from first sketch to final handover.',
    ],
    audiences: [
      'Developers & destination projects',
      'Hospitality & tourism operators',
      'Landscape & design practices',
      'Themed leisure & installations',
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
    title: 'How we work with clients and partners.',
    lede:
      'AQUASEE is built around the assumption that good outcomes come from clear expectations, honest costings and a small number of accountable relationships.',
    audiencesLabel: 'We work with',
  },
  cta: {
    eyebrow: 'Start a Project',
    title: 'Tell us what you are trying to build.',
    body:
      'Send a short brief — the stage you are at, the ambition, the constraints. We will come back with an honest read on what is realistic, what it needs and where we can help.',
    primary: 'Start a Project',
  },
};