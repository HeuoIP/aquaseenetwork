import type { StudyVisualData } from '@/components/art/StudyVisual';

export type AiPoint = {
  title: string;
  description: string;
};

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
  intro: string;
  paragraphs: string[];
  capabilities: { title: string; description: string }[];
  deliverables: string[];
  engagement: { phase: string; description: string }[];
  bestFor: string[];
  /** Dark key art used for the page hero. */
  visual: Extract<StudyVisualData, { kind: 'image' }>;
  visualCaption: string;
  mobilePosition?: string;
  /** Concrete service illustration used in the body of the page. */
  illustration: { src: string; alt: string; caption: string };
  /** Present only where AI genuinely assists this part of the work. */
  aiUsage?: AiUsage;
  /** Short label surfaced on the homepage capability card. */
  aiTag?: string;
  related: { href: string; label: string }[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: 'strategy',
    href: '/strategy',
    index: '01',
    eyebrow: 'Strategy & Consulting',
    title: 'Strategy & Consulting',
    lede: 'Before anything is designed, the right question has to be asked.',
    intro:
      'Most ambitious projects do not fail on ideas. They fail on unclear scope, untested assumptions and a supply chain that was never properly structured. AQUASEE works with clients at the front of that curve — where a decision still has room to be made well.',
    paragraphs: [
      'We begin by reading the brief critically: what is the client actually trying to build, who is it for, what has to be true commercially, and what constraints will decide the outcome. From there we shape a project that design, engineering and procurement can all act on.',
      'Our consulting is deliberately hands-on. Strategy work is not handed over as a deck and left behind — it stays connected to design development and delivery, because that is where assumptions either hold or fail.',
    ],
    capabilities: [
      {
        title: 'Brief & project definition',
        description:
          'Transcribing a vision into a structured brief with clear objectives, audiences, constraints and decision points.',
      },
      {
        title: 'Feasibility & site readiness',
        description:
          'Reviewing site conditions, local regulation, logistics and infrastructure against the intended scope.',
      },
      {
        title: 'Concept framing',
        description:
          'Establishing the organising idea, experience narrative and priority hierarchy for a project before detailed design begins.',
      },
      {
        title: 'Programme & phasing',
        description:
          'Sequencing a programme so that early decisions, approvals and long-lead items are resolved without blocking momentum.',
      },
      {
        title: 'Scope & cost planning',
        description:
          'Building a cost plan and scope matrix that stays usable as the design evolves, with clear assumptions and contingency.',
      },
      {
        title: 'Partner strategy',
        description:
          'Selecting and briefing the right design, engineering and manufacturing partners, and aligning them to a single brief.',
      },
    ],
    deliverables: [
      'Structured project brief',
      'Feasibility and risk register',
      'Concept framework and experience narrative',
      'Programme and phasing plan',
      'Scope, cost plan and assumption log',
      'Partner recommendation and briefing package',
    ],
    engagement: [
      { phase: 'Diagnose', description: 'Interrogate the brief, the site and the commercial reality behind it.' },
      { phase: 'Define', description: 'Convert intent into an agreed scope, framework and set of constraints.' },
      { phase: 'Plan', description: 'Sequence the programme, cost it, and select the delivery route.' },
      { phase: 'Align', description: 'Brief partners, resolve conflicts early and hold the concept through to delivery.' },
    ],
    bestFor: [
      'Developers planning a first international project',
      'Design firms needing a delivery partner for an unusual or custom element',
      'Operators commissioning an experience rather than a product',
      'Teams whose scope has grown faster than their plan',
    ],
    visual: {
      kind: 'image',
      src: '/images/aquasee-key-strategy.webp',
      alt: 'Generated concept artwork: an exploded axonometric assembly of translucent planning volumes threaded with aqua trajectory lines.',
    },
    visualCaption: 'Creative concept visualization',
    mobilePosition: '52%',
    illustration: {
      src: '/images/service-strategy-consulting.webp',
      alt: 'Illustrative visualisation of a revitalised riverside heritage quarter with a new public waterfront promenade, planted streets and a timber cultural pavilion.',
      caption: 'Service illustration — conceptual rendering',
    },
    aiUsage: {
      title: 'Where AI assists us',
      points: [
        {
          title: 'Direction generation',
          description:
            'From a brief we generate a wide set of directions and scenarios, so decisions are made between options rather than against a single guess.',
        },
        {
          title: 'Early visual option testing',
          description:
            'Contextual imagery assembled while a direction is still cheap to change, so a direction can be judged rather than described.',
        },
        {
          title: 'Assumption stress-testing',
          description:
            'Scale, programme and cost assumptions checked against a site and a budget while the options are still open.',
        },
      ],
      note: 'AI does not replace the engineer, the specification or the factory. It widens the range of directions we can put in front of you.',
    },
    aiTag: 'AI-assisted consulting',
    related: [
      { href: '/creative-design', label: 'Creative Design & R&D' },
      { href: '/supply-chain', label: 'Supply Chain & Project Delivery' },
    ],
  },
  {
    slug: 'creative-design',
    href: '/creative-design',
    index: '02',
    eyebrow: 'Creative Design & R&D',
    title: 'Creative Design & R&D',
    lede: 'Design is only finished when it can be built, shipped and maintained.',
    intro:
      'AQUASEE develops the creative and technical layer of a project: the concept, the spatial language, the details, the objects and the atmospheres. We work with modularity in mind — designing something that is distinctive but still manufacturable, shippable and serviceable years later.',
    paragraphs: [
      'We combine design thinking with engineering realism. A concept is drawn, modelled, costed and challenged early, so that the expensive surprises arrive on paper rather than on site.',
      'Where a project needs a bespoke element — a fixture, a play structure, an installation, a piece of interior — we research materials and fabrication routes with qualified partners and, where useful, build a physical prototype before committing to production.',
    ],
    capabilities: [
      {
        title: 'Concept & spatial design',
        description:
          'Developing the spatial concept, circulation, atmosphere and experience rhythm from the agreed strategy.',
      },
      {
        title: 'Custom product & fixture design',
        description:
          'Designing bespoke elements that carry a project’s identity, from a single piece of joinery to a full installation.',
      },
      {
        title: '3D modelling & visualisation',
        description:
          'Producing accurate models, layouts and rendered imagery used for decision-making, approval and fabrication.',
      },
      {
        title: 'Material & finish research',
        description:
          'Testing durability, tactile quality, ageing and maintenance behaviour against the project’s real use and climate.',
      },
      {
        title: 'Prototype & testing',
        description:
          'Building physical or mock-up studies to validate proportion, mechanism, lighting or user experience before mass production.',
      },
      {
        title: 'Technical documentation',
        description:
          'Producing drawings, schedules and specification packages that give a factory something unambiguous to build from.',
      },
    ],
    deliverables: [
      'Design concept and design language',
      'Spatial layouts and technical drawings',
      '3D models and rendered views',
      'Material and finish schedules',
      'Prototype or mock-up studies',
      'Production-ready specification package',
    ],
    engagement: [
      { phase: 'Interpret', description: 'Translate the strategy into a design language and a first spatial proposition.' },
      { phase: 'Develop', description: 'Refine the concept and details; model, test and cost in parallel.' },
      { phase: 'Prototype', description: 'Validate the difficult parts physically where the risk justifies it.' },
      { phase: 'Resolve', description: 'Close out the specification so production has no ambiguity left to interpret.' },
    ],
    bestFor: [
      'Projects with a strong spatial or experiential identity',
      'Developers seeking a design partner who can also deliver',
      'Teams needing custom elements nobody catalogues',
      'Operators upgrading an existing environment',
    ],
    visual: {
      kind: 'image',
      src: '/images/aquasee-key-design.webp',
      alt: 'Generated concept artwork: sculptural material and form studies suspended above a dark reflective surface, traced with aqua contour lines.',
    },
    visualCaption: 'Creative concept visualization',
    mobilePosition: '72%',
    illustration: {
      src: '/images/service-creative-design.webp',
      alt: 'Illustrative visualisation of a bespoke landscape play environment with timber and steel play elements, a shallow water-play basin and integrated planting.',
      caption: 'Service illustration — conceptual rendering',
    },
    aiUsage: {
      title: 'Where AI assists us',
      points: [
        {
          title: 'Multi-direction ideation',
          description:
            'Many form directions generated and compared early, so the client selects a direction instead of commenting on one.',
        },
        {
          title: 'Visualisation from the model',
          description:
            'Client-facing imagery built from the actual model rather than a hand-drawn approximation.',
        },
        {
          title: 'Material & finish exploration',
          description:
            'Colour, texture and lighting combinations tested before samples are commissioned.',
        },
      ],
      note: 'AI does not replace the maker or the specification. It widens the range of directions we can put in front of you, and shortens the distance between a brief and something you can actually judge.',
    },
    aiTag: 'AI-assisted creation',
    related: [
      { href: '/strategy', label: 'Strategy & Consulting' },
      { href: '/supply-chain', label: 'Supply Chain & Project Delivery' },
    ],
  },
  {
    slug: 'supply-chain',
    href: '/supply-chain',
    index: '03',
    eyebrow: 'Supply Chain & Project Delivery',
    title: 'Supply Chain & Project Delivery',
    lede: 'We do not manufacture. We bring the know-how that makes bespoke product buildable — and then let you decide how much of it you make yourself.',
    intro:
      'We do not manufacture. We bring something more useful than a factory: years of taking bespoke products apart, understanding how every part is made, and reorganising that knowledge so it can be built — by us, by a partner, or by you.',
    paragraphs: [
      'AQUASEE has spent years specifying, sourcing, dismantling and delivering bespoke product for landscape, play and hospitality projects. That work produces a specific kind of knowledge: how a complicated object breaks into modules, which modules are worth making in-house, and how the rest should be bought.',
      'We bring that knowledge to you as an option set. A product can be delivered complete, as a kit you assemble yourself, or as semi-finished modules your own team completes. Every route is costed against one specification, and you choose.',
    ],
    capabilities: [
      {
        title: 'Product deconstruction & module design',
        description:
          'Taking a bespoke item apart into modules that can each be specified, priced, made and assembled independently.',
      },
      {
        title: 'Make–buy–assemble option modelling',
        description:
          'Comparing full supply, client assembly from a kit, and semi-finished module supply — costed against one specification.',
      },
      {
        title: 'Supplier qualification & comparison',
        description:
          'Identifying, assessing and shortlisting partners against technical, capacity and commercial criteria.',
      },
      {
        title: 'Production management & progress control',
        description:
          'Scheduling, progress control and issue escalation across one or several production partners.',
      },
      {
        title: 'Quality inspection & pre-shipment verification',
        description:
          'In-process inspection, sample review and pre-shipment verification against an agreed specification.',
      },
      {
        title: 'Assembly support & handover',
        description:
          'Documentation, assembly guidance and on-site support so a client-side build goes smoothly.',
      },
    ],
    deliverables: [
      'Product deconstruction report',
      'Module specification and drawings',
      'Assembly kit and semi-finished package definition',
      'Make–buy–assemble option matrix with costs',
      'Qualified supplier shortlist',
      'Production schedule and quality records',
      'Assembly manual and handover pack',
    ],
    engagement: [
      {
        phase: 'Diagnose',
        description:
          'Read the product, the brief and the budget. Establish what is actually driving the cost.',
      },
      {
        phase: 'Deconstruct',
        description:
          'Break the product into modules; identify which are critical, which are generic, and which the client should make.',
      },
      {
        phase: 'Option',
        description:
          'Cost the three delivery routes against one specification and recommend one.',
      },
      {
        phase: 'Deliver',
        description:
          'Manage production, inspection and shipping — and, where the client is assembling, handover and support.',
      },
    ],
    bestFor: [
      'Clients who want to reduce cost without reducing quality',
      'Clients with their own fabrication team or site workshop',
      'Bespoke products where a supplier has quoted too high',
      'Projects where the client wants to own part of the production',
      'Teams who want a supply chain they can understand and control',
    ],
    visual: {
      kind: 'image',
      src: '/images/aquasee-key-supply.webp',
      alt: 'Generated concept artwork: indexed modular components stacked on structural frames, connected by aqua route lines.',
    },
    visualCaption: 'Creative concept visualization',
    mobilePosition: '52%',
    illustration: {
      src: '/images/service-supply-chain.webp',
      alt: 'Illustrative photograph of a fabrication workshop where a bespoke product has been deconstructed into modules and semi-finished sub-assemblies.',
      caption:
        'Illustrative workshop image — production runs through qualified manufacturing partners',
    },
    related: [
      { href: '/strategy', label: 'Strategy & Consulting' },
      { href: '/creative-design', label: 'Creative Design & R&D' },
    ],
  },
];

export function getService(slug: string): ServiceDetail {
  const found = serviceDetails.find((service) => service.slug === slug);
  if (!found) {
    throw new Error(`Unknown service slug: "${slug}". Add it to serviceDetails.`);
  }
  return found;
}
