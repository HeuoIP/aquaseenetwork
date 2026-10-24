import type { UiStrings } from '@/content/types';

/**
 * The chrome — English.
 *
 * These strings are the frame around the content: headings, buttons, labels,
 * table headers. They are separated from the content model so that publishing
 * a language means translating one more file, not rewriting the pages.
 */
export const ui: UiStrings = {
  global: {
    skipToContent: 'Skip to content',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    primaryNav: 'Primary',
    mobileNav: 'Mobile',
    language: 'Language',
    capabilities: 'Capabilities',
    contact: 'Contact',
    contactPage: 'Contact page',
    weWorkWith: 'We work with',
    elsewhere: 'Elsewhere',
    rights: 'All rights reserved.',
    imageryNote:
      'Imagery on this site is illustrative concept work unless stated otherwise.',
    machineSummary: 'Machine-readable summary',
    startProject: 'Start a Project',
    explore: 'Explore',
    capability: 'Capability',
  },
  home: {
    heroCaption: 'Creative concept visualization',
    pillarsEyebrow: 'Capabilities',
    pillarsTitle: 'Three pillars, one continuous process.',
    pillarsLede:
      'Most projects need all three. Separating them is what creates cost, delay and loss of intent — so we hold them together.',
    viewStudies: 'View capability studies',
  },
  service: {
    inOneParagraph: 'In one paragraph',
    overview: 'Overview',
    activitiesEyebrow: 'What We Do',
    activitiesTitle:
      'The specific activities that make up this part of the engagement.',
    activitiesLede:
      'Each one is a defined piece of work with a named output — not a phase of vague effort.',
    deliverablesEyebrow: 'Deliverables',
    deliverablesTitle: 'What you receive.',
    engagementEyebrow: 'Engagement',
    engagementTitle: 'How the work runs.',
    boundariesEyebrow: 'Boundaries',
    boundariesTitle: 'What this does not cover.',
    boundariesNote:
      'Stating the limits up front is cheaper than discovering them mid-project.',
    costEyebrow: 'Cost',
    costTitle: 'What drives the cost.',
    costNote:
      'We do not publish price ranges, because the same description can differ by a factor of several. What we can state precisely is what moves the number.',
    goodFitEyebrow: 'This is a good fit if',
    continueEyebrow: 'Continue',
    projectsLink: 'Projects & Capabilities',
    discuss: 'Discuss your project',
    questionsEyebrow: 'Questions',
    questionsTitle: 'The questions buyers ask about this part of the work.',
    seeCoverage: 'See what this covers',
    aiTitle: 'Where AI earns its place in this work.',
    aiNote: '',
  },
  about: {
    whatIs: 'What AQUASEE is',
    facts: 'Facts',
    factsTitle: 'At a glance.',
    deliveryModels: 'Delivery models',
    deliveryModelsTitle:
      'Three ways to take delivery, and what each one costs you.',
    yourRole: 'Your role',
    bestFor: 'Best for',
    tradeOff: 'Trade-off',
    comparison: 'Comparison',
    comparisonTitle: 'Who does what.',
    dimension: 'Dimension',
    designStudio: 'Design studio',
    tradingPlatform: 'Trading platform',
    factory: 'Factory',
    cost: 'Cost',
    costTitle: 'What moves the number.',
    costNote:
      'We do not publish price ranges. These are the factors that decide them.',
    boundaries: 'Boundaries',
    boundariesTitle: 'What we do not do.',
    markets: 'Markets',
    marketsTitle: 'Where we work.',
    glossary: 'Glossary',
    glossaryTitle: 'The words we use, defined.',
    ctaTitle: 'Tell us what you are trying to build.',
  },
  faq: {
    eyebrow: 'Questions',
    title: 'Direct answers, without a sales call.',
    lede: 'These are the questions buyers ask most often, answered in the open. If yours is not here, ask it in the brief form and we will answer it properly.',
    stillUnanswered: 'Still unanswered?',
    askBody:
      'Send the question as it is. You will get a straight answer, and usually an indication of whether we are the right party to help.',
    askCta: 'Ask a question',
    pillars: {
      strategy: 'Strategy & Consulting',
      'creative-design': 'Creative Design & R&D',
      'supply-chain': 'Supply Chain & Delivery',
    },
  },
  projects: {
    eyebrow: 'Projects & Capabilities',
    title: 'What we are set up to do.',
    lede: 'A set of illustrative studies describing the scope, method and outcome of typical AQUASEE engagements — for developers, hospitality groups, design practices and leisure developers.',
    aboutVisuals: 'About the visuals on this page',
    artAlt:
      'Generated concept artwork: a landscape plate, a bespoke fixture element and an equipment module mounted on one shared structural armature.',
  },
  insights: {
    eyebrow: 'Insights',
    title: 'The questions buyers ask, answered properly.',
    lede: 'Guides on scoping, specification, cost, quality control and delivery — written for the decisions that come before choosing a supplier, and updated as standards change.',
    empty:
      'The insight library is being written. The questions it will answer are already published on the FAQ page.',
    readFaq: 'Read the FAQ',
    keyPoints: 'Key points',
    sources: 'Sources',
    consulted: 'consulted',
    related: 'Related reading',
    discuss: 'Discuss your project',
    minRead: 'min read',
    updated: 'updated',
  },
  contact: {
    whatToInclude: 'What to include',
    skipUnknown:
      'Skip anything you do not know yet. An unknown budget is a normal place to start.',
    whatNext: 'What happens next',
    nextSteps: [
      'We read the brief and check it against the work we are set up to take on.',
      'If it is a fit, one of our leads replies with questions, a first read and a proposed next step.',
      'If it is not a fit, we say so plainly and, where we can, point you somewhere better.',
    ],
    privacy: 'Privacy',
    privacyBody:
      'The details you submit are used only to respond to your enquiry. We do not sell or share contact details, and we do not add you to a marketing list. If you ask us to delete your details, we will.',
    otherEnquiries: 'Other enquiries',
    otherTitle: 'Not a project brief?',
    otherBody:
      'Partnership proposals, supplier introductions, press, careers and general questions all reach the same inbox. Say what it is in the first line and it will reach the right person faster.',
    email: 'Email',
    whereWeAre: 'Where we are',
    howWeWork: 'How we work',
    howWeWorkBody:
      'We are set up for international projects where integrated creative, technical and manufacturing support is genuinely useful — and we say so plainly when a brief is not a fit for us.',
    seeStudies: 'See capability studies',
  },
  form: {
    name: 'Name',
    company: 'Company',
    email: 'Business email',
    country: 'Country / region',
    projectType: 'Project type',
    services: 'Required services',
    description: 'Project description',
    budget: 'Estimated budget',
    timeline: 'Expected timeline',
    optional: 'optional',
    selectProjectType: 'Select a project type…',
    preferNotToSay: 'Prefer not to say',
    descriptionPlaceholder:
      'What are you trying to build, where is it, and what stage are you at? Include the ambitions, the constraints and the timeline if you know it.',
    sending: 'Sending your inquiry.',
    successTitle: 'Thank you — your brief is with us.',
    successBody:
      'We have received your inquiry and will come back to you with an initial read on the project, the questions worth answering first, and a suggested way forward.',
    reference: 'Reference',
    delivery: 'Delivery',
    deliveredEmail: 'Delivered by email',
    deliveredIntake: 'Delivered to our intake system',
    received: 'Received',
    sendAnother: 'Send another inquiry',
    notSent: 'Your inquiry was not sent.',
    openMail: 'Open in email client',
    genericError: 'Something went wrong while sending your inquiry.',
    networkError:
      'We could not reach the server. Please check your connection, or email us directly.',
    privacyNote:
      'We use your details only to respond to this inquiry. See our privacy note below.',
    projectTypes: [
      'Resort or hotel development',
      'Theme park, attraction or leisure project',
      'Landscape, public realm or outdoor experience',
      'Custom installation or interior feature',
      'Design or engineering consultancy support',
      'Something else',
    ],
    serviceOptions: [
      'Strategy & Consulting',
      'Creative Design & R&D',
      'Supply Chain & Delivery',
      'Full project management',
      'Not sure yet — please advise',
    ],
    budgetOptions: [
      'Not yet defined',
      'Under US$50,000',
      'US$50,000 – 150,000',
      'US$150,000 – 500,000',
      'US$500,000 – 1.5M',
      'Over US$1.5M',
    ],
    timelineOptions: [
      'Not yet defined',
      'Under 3 months',
      '3 – 6 months',
      '6 – 12 months',
      'More than 12 months',
    ],
  },
  unsubscribe: {
    eyebrow: 'Unsubscribe',
    title: 'Stop receiving our email.',
    lede: 'One click records the request and removes your address from our outreach list. No further email will be sent to it.',
    requestEyebrow: 'Your request',
    requestTitle: 'Confirm the address',
    requestLede:
      'If you reached this page from one of our emails, the address is already filled in. If you came here directly, enter the address you would like removed.',
    otherWaysEyebrow: 'Other ways',
    otherWays:
      'You can also reply to any email from us with the word "REMOVE", and we will action it within 7 business days. For data access or deletion requests under GDPR, CASL or similar regulations, write to us directly.',
    notAffectEyebrow: 'What this does not affect',
    notAffect:
      'Unsubscribing stops marketing email. It does not affect any project correspondence between us — if we are working on a brief together, we will keep replying on that separately.',
    emailAddress: 'Email address',
    submit: 'Unsubscribe',
    submitting: 'Submitting…',
    confirmed: 'Confirmed',
    fallback:
      'The request could not be completed. Please reply to the email with "REMOVE".',
    networkError:
      'The request could not be sent. Please reply to the email with "REMOVE" and we will action it within 7 business days.',
    replyNote:
      'If further email arrives from us, reply with "REMOVE" and we will action it within 7 business days.',
  },
};