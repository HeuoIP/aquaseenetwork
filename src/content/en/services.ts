import type { ServiceDetail } from '@/content/types';

/**
 * The three capabilities. This is the single source of truth: the homepage
 * cards, the capability pages, the navigation and the machine-readable
 * Service descriptions all read from this array, so they cannot drift apart.
 */

export const serviceDetails: ServiceDetail[] = [
  {
    slug: 'strategy',
    definition: 'AQUASEE Strategy and Consulting is the front end of a project: it turns an ambition into a defined scope, a costed plan, a programme and a set of partners who can build it. It is advisory and hands-on work that continues into design and delivery rather than ending with a document.',
    notIncluded: [
      'Legal, planning or building-control approval — we prepare the technical basis, a local consultant signs it',
      'Structural or electrical engineering certification — we engage qualified engineers and hold them to the brief',
      'Commercial market research on end-customer demand',
      'Funding, investment or financial modelling'
    ],
    costDrivers: [
      'How much of the brief is already decided — an agreed scope costs less than an open one',
      'Number of parties whose work must be coordinated',
      'Site and regulatory complexity in the destination market',
      'How much of the strategy has to be re-tested as the design develops'
    ],
    faq: [
      {
        pillar: 'strategy',
        q: 'When is it worth paying for consulting before talking to suppliers?',
        a: 'It is worth it whenever the scope is not yet stable. Consulting is expensive relative to a factory quote and cheap relative to building the wrong thing. The trigger is usually one of three: the brief is still an ambition rather than a specification, several suppliers have quoted against different assumptions, or the project has a site, approval or programme constraint that will invalidate quotes if it is not addressed first.'
      },
      {
        pillar: 'strategy',
        q: 'Can you review another party’s design or quotation instead of starting from scratch?',
        a: 'Yes, and it is often the most efficient entry point. We review what exists — a design package, a tender document, a set of supplier quotations — against the objective, the standards, the site and the commercial reality, and report what is sound, what is missing and what it will cost to close. That review stands on its own, with no obligation to continue into delivery.'
      },
      {
        pillar: 'strategy',
        q: 'Do you stay involved once the design is finished?',
        a: 'That is the point. Strategy that ends at handover of a document tends to be contradicted by what the supply chain can actually do and price. We stay connected through design development, partner selection, production and installation, because the assumptions written at the front are exactly the ones that fail at the back. If a client only wants the front end, we still deliver it as a standalone, properly evidenced piece of work.'
      }
    ],
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
      { href: '/supply-chain', label: 'Supply Chain & Delivery' },
    ],
  },
  {
    slug: 'creative-design',
    definition: 'AQUASEE Creative Design and R&D turns an agreed idea into something that can be built, quoted and maintained: concept, design language, buildable drawings, a written technical specification, prototypes where the risk justifies them, and the engineering coordination that lets the item survive contact with a fabricator and a site.',
    notIncluded: [
          "Production of the designed item — that sits with our supply chain and delivery capability",
          "Certification of the structure by a local approved inspector",
          "Brand identity, naming or marketing campaigns",
          "Landscape, architectural or interior design of the surrounding site"
    ],
    costDrivers: [
          "How much of the design is bespoke and how much is adapted from a proven platform",
          "Material specification and finish — coastal and marine-grade exposure change the bill materially",
          "Tooling: each new mould, jig or fabrication method is a one-off cost",
          "Engineering hours, including structural, electrical and control design",
          "Prototyping and testing, and whether the use case requires load or safety testing",
          "Number of disciplines that have to be coordinated — structure, drainage, power, controls and safety"
    ],
    faq: [
          {
                "pillar": "creative-design",
                "q": "How do you make a concept buildable rather than just attractive?",
                "a": "Buildability is a documentation problem, not an aesthetic one. Every element is resolved to a dimension, a material, a finish, a fixing and a tolerance, and checked against the way it will be manufactured, transported, installed and maintained. Where an element cannot be produced as drawn, we say so early and offer the alternative with its consequences, rather than discovering it in a quotation."
          },
          {
                "pillar": "creative-design",
                "q": "Do you work with our existing architect’s or landscape architect’s design?",
                "a": "Yes. We take the design intent and make it buildable — resolving interfaces with structure, drainage, power and lighting, producing the documentation a fabricator can quote from, and testing the proposal against the operator’s real use, including cleaning, maintenance and opening hours. We also flag where the concept cannot be delivered in the proposed material or method, with the alternatives and their cost."
          },
          {
                "pillar": "creative-design",
                "q": "Which safety standards do you design to?",
                "a": "We design to the standard that applies where the asset will operate, not to a single default. In Europe, the Gulf and much of Asia that is typically the EN 1176 series for playground equipment and ISO 13857 for entrapment and impact; in North America, ASTM F1487 and ASTM F1951. For public-space and installation work, local building, accessibility and fire requirements also apply. We state the clause references in the specification and arrange the testing."
          }
    ],
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
      { href: '/supply-chain', label: 'Supply Chain & Delivery' },
    ],
  },
  {
    slug: 'supply-chain',
    definition: 'AQUASEE Supply Chain and Delivery organises how a design becomes a physical asset: selecting and contracting qualified manufacturing partners, controlling quality during production, managing logistics and customs, installing on site around the reality of the venue, and handing over a documented, maintainable result with one accountable party.',
    notIncluded: [
          "Ownership or operation of manufacturing capacity — we are not a factory and do not pretend to be one",
          "Unlimited revisions after handover — changes are handled as controlled changes with a stated cost",
          "Supply of standard catalogue products at distributor pricing",
          "Local trade labour where the client’s own site team is contracted to carry out installation"
    ],
    costDrivers: [
          "Bespoke versus adapted platform, and therefore whether new tooling is needed",
          "Material and finish specification, including marine-grade and coastal exposure",
          "Engineering and documentation hours",
          "Prototyping, mock-ups and testing",
          "Freight by dimension and weight, packaging, and customs classification and duties",
          "Site conditions — access, working hours, opening hours, and installation done out of hours",
          "Commissioning, training, documentation and the length of the support window"
    ],
    faq: [
          {
                "pillar": "supply-chain",
                "q": "Do you guarantee the quality of the factory you use?",
                "a": "We guarantee the result, which is a stronger commitment than vouching for a partner. We select partners against a stated qualification, brief them against one written specification, inspect at agreed milestones, and keep the records. If something is wrong, it is our problem to solve — not an argument about who the sub-contractor was. We do not claim to guarantee anyone else’s factory; we make sure the outcome is ours."
          },
          {
                "pillar": "supply-chain",
                "q": "How do you handle quality problems found after installation?",
                "a": "Problems found after installation are worked through the same evidence chain as everything else: the specification, the inspection records, the change log and the handover documentation. Where the defect is ours, we correct it. Where it is a misuse, a third-party contractor’s work or an operating condition outside the agreed use, we say so plainly and still help resolve it. The handover pack exists precisely so that this conversation has facts in it."
          },
          {
                "pillar": "supply-chain",
                "q": "Can you deliver if we already have our own manufacturer?",
                "a": "Yes, and it is a reasonable arrangement when the manufacturer is already qualified and already understands the work. In that case our role is specification discipline, documentation, inspection and logistics — making sure what is being built matches what was agreed, and that the site receives a complete, documented result. We are happy to work this way; we simply do not pretend to add value where there is none."
          }
    ],
    href: '/supply-chain',
    index: '03',
    eyebrow: 'Supply Chain & Delivery',
    title: 'Supply Chain & Delivery',
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
