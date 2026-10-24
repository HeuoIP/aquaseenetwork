import type { Locale } from '@/lib/locale';

/** A single question-and-answer pair. Answers are written to stand alone. */
export type FaqItem = {
  q: string;
  a: string;
  /** Which capability the question belongs to; used for grouping and filtering. */
  pillar?: 'strategy' | 'creative-design' | 'supply-chain';
};

/** Where AI genuinely assists a specific part of the work. */
export type AiPoint = { title: string; description: string };
export type AiUsage = {
  title: string;
  points: AiPoint[];
  note: string;
};

export type ServiceDetail = {
  slug: string;
  href: string;
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
  /**
   * One or two sentences that answer "what is this" on their own, without any
   * surrounding context. This is the paragraph most likely to be quoted by an
   * answer engine, so it is written to be lifted.
   */
  definition: string;
  intro: string;
  paragraphs: string[];
  capabilities: { title: string; description: string }[];
  deliverables: string[];
  /** What this service deliberately does not cover. Stated plainly. */
  notIncluded: string[];
  engagement: { phase: string; description: string }[];
  bestFor: string[];
  /** What actually moves the cost of this kind of work. */
  costDrivers: string[];
  faq: FaqItem[];
  /** Optional override for the call-to-action label on this page. */
  ctaLabel?: string;
  visual: { kind: 'image'; src: string; alt: string };
  visualCaption: string;
  mobilePosition?: string;
  illustration: { src: string; alt: string; caption: string };
  aiUsage?: AiUsage;
  aiTag?: string;
  related: { href: string; label: string }[];
};

export type ProjectStudy = {
  slug: string;
  title: string;
  discipline: string;
  category: string;
  scale: string;
  summary: string;
  scope: string[];
  outcome: string;
  disclosure: string;
  visual: { kind: 'image'; src: string; alt: string };
  featured?: boolean;
};

export type ProcessStep = {
  index: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
};

export type CollaborationItem = {
  title: string;
  description: string;
};

/** A delivery model: how much of the delivery the client takes on themselves. */
export type DeliveryModel = {
  name: string;
  summary: string;
  clientRole: string;
  bestFor: string;
  tradeOff: string;
};

export type ComparisonRow = {
  dimension: string;
  aquasee: string;
  designStudio: string;
  tradingPlatform: string;
  factory: string;
};

export type GlossaryTerm = {
  term: string;
  definition: string;
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  lede: string;
  /** The paragraph that defines the entity. Written to be quoted verbatim. */
  definition: string;
  /** Facts about the company. Empty values are deliberately not filled in. */
  facts: { label: string; value: string }[];
  deliveryModels: DeliveryModel[];
  costDrivers: string[];
  comparison: {
    intro: string;
    rows: ComparisonRow[];
    note: string;
  };
  glossary: GlossaryTerm[];
  boundaries: string[];
  markets: { tier: string; title: string; note: string; list: string[] }[];
  processNote: string;
};

export type InsightSection = {
  id: string;
  heading: string;
  /** Paragraphs. The first one always answers the heading directly. */
  body: string[];
  list?: string[];
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  callout?: string;
};

export type InsightArticle = {
  slug: string;
  title: string;
  /** Answer-first summary: the paragraph an engine can lift on its own. */
  excerpt: string;
  pillar: 'strategy' | 'creative-design' | 'supply-chain';
  vertical: 'tourism' | 'public-space' | 'children' | 'general';
  readingMinutes: number;
  updatedAt: string;
  sections: InsightSection[];
  keyTakeaways: string[];
  /** Sources with the date they were consulted. Required for every claim. */
  sources: { label: string; url: string; accessed: string }[];
  related: string[];
};

export type SiteConfig = {
  name: string;
  legalName: string;
  domain: string;
  canonicalHost: string;
  url: string;
  tagline: string;
  shortDescription: string;
  contact: { email: string; location: string; phone: string };
  social: { label: string; href: string }[];
  /** Primary navigation. Languages without published insights omit that entry. */
  nav: { href: string; label: string }[];
  ctaLabel: string;
  marketsLine: string;
};


/** Homepage copy. Kept with the other content so the page can be translated. */
export type HomeContent = {
  hero: {
    eyebrow: string;
    titleTop: string;
    titleBottom: string;
    titleAccent: string;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: string;
    summary: { k: string; v: string }[];
  };
  intro: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    audiences: string[];
  };
  process: { eyebrow: string; title: string; lede: string; note: string };
  collaboration: { eyebrow: string; title: string; lede: string; audiencesLabel: string };
  cta: { eyebrow: string; title: string; body: string; primary: string };
};

/** Contact page copy. */
export type ContactContent = {
  eyebrow: string;
  title: string;
  lede: string;
  briefEyebrow: string;
  briefTitle: string;
  briefLede: string;
  whatToInclude: string[];
  newProjectsLabel: string;
  newProjectsBody: string;
  otherLabel: string;
};
export type Dictionary = {
  locale: Locale;
  site: SiteConfig;
  home: HomeContent;
  contact: ContactContent;
  services: ServiceDetail[];
  studies: ProjectStudy[];
  process: ProcessStep[];
  collaboration: { model: readonly CollaborationItem[]; audiences: readonly string[] };
  about: AboutContent;
  faq: FaqItem[];
  /** Null when this language has not published the insight library yet. */
  insights: InsightArticle[] | null;
};