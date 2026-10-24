import type { Locale } from '@/lib/locale';

/** A single question-and-answer pair. Answers are written to stand alone. */
export type FaqItem = {
  q: string;
  a: string;
  /** Which capability the question belongs to; used for grouping and filtering. */
  pillar?: 'strategy' | 'creative-design' | 'supply-chain';
};

/**
 * Where a gallery image sits in the page.
 *
 * A capability page is a long read: the pictures are not decoration at the
 * end, they are the rhythm of the page - a paragraph, then the thing it
 * describes.
 */
export type GallerySlot = 'overview' | 'activities' | 'cost';

export type GalleryItem = {
  after: GallerySlot;
  src: string;
  alt: string;
  /**
   * 'work' is our own material; 'illustration' is a rendering or a generated
   * scene. The page says which is which - a picture that is passed off as
   * more than it is costs the whole site its credibility.
   */
  kind: 'work' | 'illustration';
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
  /** Pictures placed through the page, between the blocks of text. */
  gallery?: GalleryItem[];
  visualCaption: string;
  mobilePosition?: string;
  illustration: { src: string; alt: string; caption: string };
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

/**
 * A piece of real project material, published with the stage it came from.
 *
 * A rendering is not a photograph and a concept plan is not a building, so
 * the stage travels with the picture. Nothing here claims an outcome that
 * the material does not show.
 */
export type ProjectMaterial = {
  slug: string;
  title: string;
  discipline: string;
  /** The stage this material was produced at, in the site's language. */
  stage: string;
  description: string;
  image: { kind: 'image'; src: string; alt: string };
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
  /**
   * Why the supply-chain route serves a buyer better than a factory quote.
   * Written in the buyer's terms, because that is the decision being made.
   */
  supplyChainPoints: { title: string; description: string }[];
  comparison: {
    intro: string;
    rows: ComparisonRow[];
    note: string;
  };
  glossary: GlossaryTerm[];
  boundaries: string[];
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
/**
 * The chrome.
 *
 * Everything a page says that is not part of the content model — section
 * headings, buttons, form labels, table headers — lives here, one object per
 * language. When a language is published, its chrome is published with it:
 * a page that mixes a translated argument with English buttons is not a
 * translated page.
 */
export type UiStrings = {
  global: {
    skipToContent: string;
    menu: string;
    openMenu: string;
    closeMenu: string;
    primaryNav: string;
    mobileNav: string;
    language: string;
    capabilities: string;
    contact: string;
    contactPage: string;
    weWorkWith: string;
    elsewhere: string;
    rights: string;
    imageryNote: string;
    machineSummary: string;
    startProject: string;
    explore: string;
    capability: string;
  };
  home: {
    heroCaption: string;
    pillarsEyebrow: string;
    pillarsTitle: string;
    pillarsLede: string;
    viewStudies: string;
  };
  service: {
    inOneParagraph: string;
    galleryWork: string;
    galleryIllustration: string;
    overview: string;
    activitiesEyebrow: string;
    activitiesTitle: string;
    activitiesLede: string;
    deliverablesEyebrow: string;
    deliverablesTitle: string;
    engagementEyebrow: string;
    engagementTitle: string;
    boundariesEyebrow: string;
    boundariesTitle: string;
    boundariesNote: string;
    costEyebrow: string;
    costTitle: string;
    costNote: string;
    goodFitEyebrow: string;
    continueEyebrow: string;
    projectsLink: string;
    discuss: string;
    questionsEyebrow: string;
    questionsTitle: string;
    seeCoverage: string;
    aiNote: string;
  };
  about: {
    whatIs: string;
    facts: string;
    factsTitle: string;
    supplyChainEyebrow: string;
    supplyChainTitle: string;
    supplyChainIntro: string;
    deliveryModels: string;
    deliveryModelsTitle: string;
    yourRole: string;
    bestFor: string;
    tradeOff: string;
    comparison: string;
    comparisonTitle: string;
    dimension: string;
    designStudio: string;
    tradingPlatform: string;
    factory: string;
    cost: string;
    costTitle: string;
    costNote: string;
    boundaries: string;
    boundariesTitle: string;
    glossary: string;
    glossaryTitle: string;
    ctaTitle: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    lede: string;
    stillUnanswered: string;
    askBody: string;
    askCta: string;
    pillars: { strategy: string; 'creative-design': string; 'supply-chain': string };
  };
  projects: {
    eyebrow: string;
    title: string;
    lede: string;
    aboutVisuals: string;
    artAlt: string;
    materialsEyebrow: string;
    materialsTitle: string;
    materialsIntro: string;
  };
  insights: {
    eyebrow: string;
    title: string;
    lede: string;
    empty: string;
    readFaq: string;
    keyPoints: string;
    sources: string;
    consulted: string;
    related: string;
    discuss: string;
    minRead: string;
    updated: string;
  };
  contact: {
    whatToInclude: string;
    skipUnknown: string;
    whatNext: string;
    nextSteps: string[];
    privacy: string;
    privacyBody: string;
    otherEnquiries: string;
    otherTitle: string;
    otherBody: string;
    email: string;
    whereWeAre: string;
    howWeWork: string;
    howWeWorkBody: string;
    seeStudies: string;
  };
  form: {
    name: string;
    company: string;
    email: string;
    country: string;
    projectType: string;
    services: string;
    description: string;
    budget: string;
    timeline: string;
    optional: string;
    selectProjectType: string;
    preferNotToSay: string;
    descriptionPlaceholder: string;
    sending: string;
    successTitle: string;
    successBody: string;
    reference: string;
    delivery: string;
    deliveredEmail: string;
    deliveredIntake: string;
    received: string;
    sendAnother: string;
    notSent: string;
    openMail: string;
    genericError: string;
    networkError: string;
    privacyNote: string;
    projectTypes: string[];
    serviceOptions: string[];
    budgetOptions: string[];
    timelineOptions: string[];
  };
  unsubscribe: {
    eyebrow: string;
    title: string;
    lede: string;
    requestEyebrow: string;
    requestTitle: string;
    requestLede: string;
    otherWaysEyebrow: string;
    otherWays: string;
    notAffectEyebrow: string;
    notAffect: string;
    emailAddress: string;
    submit: string;
    submitting: string;
    confirmed: string;
    fallback: string;
    networkError: string;
    replyNote: string;
  };
};
export type Dictionary = {
  locale: Locale;
  ui: UiStrings;
  site: SiteConfig;
  home: HomeContent;
  contact: ContactContent;
  services: ServiceDetail[];
  studies: ProjectStudy[];
  /** Our own project material, with the stage each piece came from. */
  materials: ProjectMaterial[];
  process: ProcessStep[];
  collaboration: { model: readonly CollaborationItem[]; audiences: readonly string[] };
  about: AboutContent;
  faq: FaqItem[];
  /** Null when this language has not published the insight library yet. */
  insights: InsightArticle[] | null;
};