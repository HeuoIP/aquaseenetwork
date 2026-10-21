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
    lede: 'Good design is only worth what it becomes on site.',
    intro:
      'AQUASEE is not a factory. We are the team that organises the factory — identifying qualified manufacturing and specialist partners, running a controlled production programme, and protecting quality from the drawing to the delivery note.',
    paragraphs: [
      'Working through a vetted partner network keeps quality high and the right expertise available, without the overhead of owning plant we would not be able to run well. Each partner is assessed against the specific requirement — capability, capacity, communication, and record of similar work.',
      'We then hold the whole chain together: one specification, one schedule, one point of accountability. Clients deal with AQUASEE; we deal with the complexity.',
    ],
    capabilities: [
      {
        title: 'Supplier sourcing & qualification',
        description:
          'Identifying, assessing and shortlisting partners against technical, capacity and commercial criteria.',
      },
      {
        title: 'RFQ & commercial management',
        description:
          'Preparing request-for-quotation packages, comparing responses on equal terms and negotiating terms clearly.',
      },
      {
        title: 'Production management',
        description:
          'Scheduling, progress control and issue escalation across one or several production partners.',
      },
      {
        title: 'Quality control',
        description:
          'In-process inspection, sample review and pre-shipment verification against an agreed specification.',
      },
      {
        title: 'Logistics & shipping',
        description:
          'Packing, consolidation, documentation and freight coordination for international delivery.',
      },
      {
        title: 'Site support & commissioning',
        description:
          'Installation attendance, on-site resolution and handover support where the scope requires it.',
      },
    ],
    deliverables: [
      'Approved supplier shortlist',
      'RFQ package and comparative analysis',
      'Production schedule and progress reports',
      'Inspection records and quality sign-off',
      'Shipping and customs documentation',
      'Handover and commissioning records',
    ],
    engagement: [
      { phase: 'Source', description: 'Identify and qualify the partners best suited to the actual requirement.' },
      { phase: 'Contract', description: 'Run a fair comparison, negotiate and place clear orders.' },
      { phase: 'Produce', description: 'Track the programme, inspect quality and keep issues out of the critical path.' },
      { phase: 'Deliver', description: 'Ship, install, support handover and close the loop on site.' },
    ],
    bestFor: [
      'International projects needing a manufacturing partner',
      'Buyers who want one accountable interface, not ten',
      'Custom or one-off elements with no standard supplier',
      'Teams managing an unfamiliar production landscape',
    ],
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
