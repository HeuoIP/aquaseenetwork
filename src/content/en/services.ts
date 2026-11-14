import type { ServiceDetail } from '@/content/types';

/**
 * The three capabilities. This is the single source of truth: the homepage
 * cards, the capability pages, the navigation and the machine-readable
 * Service descriptions all read from this array, so they cannot drift apart.
 */

export const serviceDetails: ServiceDetail[] = [
  {
    slug: 'strategy',
    definition: 'AQUASEE Water Park Planning turns a site, audience and budget into a right-sized water-play programme: zones, attractions, circulation, shade, operations and a practical route to design and supply.',
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
    title: 'Water Park Planning',
    aiLabel: 'AI-assisted research & decision framing',
    lede: 'Plan a water-play experience that fits the site, audience and operating budget.',
    intro:
      'A small or mid-sized water park succeeds when its attractions fit the site and the way the venue will operate. We help owners decide what to include, what to leave out and what needs to be resolved before a supplier is approached.',
    paragraphs: [
      'We read the brief critically: what you are really trying to build, who it is for, what has to be commercially true, and which constraints will decide the outcome. AI-assisted research and comparison help us surface patterns and options quickly; our team validates the evidence and shapes a project that design, engineering and procurement can all act on.',
      'The advice does not stop at a slide deck. It stays connected to design and delivery, because that is where assumptions either hold or fail.',
    ],
    capabilities: [
      {
        title: 'Brief & project definition',
        description:
          'Transcribing a vision into a structured brief with clear objectives, audiences, constraints and decision points.',
      },
      {
        title: 'AI-assisted research & comparison',
        description:
          'Using AI to organise references, compare directions and expose unanswered questions before the project commits to a path.',
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
    gallery: [
      {
        after: 'overview',
        src: '/images/gallery/strategy-site.webp',
        kind: 'illustration',
        alt: 'An open riverside site at golden hour: grassland, a line of trees and a worn track, with a survey plan in the foreground.',
      },
      {
        after: 'activities',
        src: '/images/gallery/strategy-stages.webp',
        kind: 'illustration',
        alt: 'A studio wall of pinned concept sheets: a bubble diagram of zones, a zoning plan and a colour rendering of a themed park.',
      },
      {
        after: 'overview',
        src: '/images/gallery/strategy-concept.webp',
        kind: 'illustration',
        alt: 'Aerial concept render of a parent-child leisure destination beside a river, with a water-play area, shaded seating, winding paths and planting.',
      },
      {
        after: 'activities',
        src: '/images/gallery/strategy-planning.webp',
        kind: 'illustration',
        alt: 'A planning table with a large printed site plan, a scale model and a laptop showing a three-dimensional massing model.',
      },
    ],
    visual: {
      kind: 'image',
      src: '/images/hero/strategy-plan.webp',
      alt: 'The company\'s own hand-drawn concept master plan for a campsite, showing the play areas, the planting and the circulation between them.',
    },

    visualCaption: 'Concept master plan — early-stage planning',
    mobilePosition: '52%',
    illustration: {
      src: '/images/service/strategy-consulting-v2.webp',
      alt: 'A printed concept masterplan for a themed park laid flat on a table: coloured zones for play, water, planting and paths, with a scale bar and a north arrow.',
      caption: 'Concept masterplan (illustrative) — how a destination is planned',
    },


    related: [
      { href: '/creative-design', label: 'Creative Design & R&D' },
      { href: '/supply-chain', label: 'Supply Chain & Delivery' },
    ],
  },
  {
    slug: 'creative-design',
    definition: 'AQUASEE Slides, Shade & Feature Design develops pool slides, shade structures and landscape features into buildable, quotable and maintainable products with clear materials, dimensions, interfaces and installation requirements.',
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
    title: 'Slides, Shade & Feature Design',
    aiLabel: 'AI-assisted concept exploration',
    lede: 'Pool slides, shade structures and landscape features designed for real use.',
    intro:
      'A family pool slide, a shaded water-play deck or a sculptural landscape feature has to look right and work hard. We develop the form and the technical package together, with attention to users, climate, cleaning, access and replacement.',
    paragraphs: [
      'Design thinking and engineering realism, together. AI-assisted visual exploration and material research help us test more directions early, while designers and engineers decide what is credible, buildable and worth developing.',
      'When a project needs a bespoke element — a fixture, a play structure, an installation, a piece of interior — we research materials and production routes with qualified partners and, where it helps, build a physical prototype before committing to production.',
    ],
    capabilities: [
      {
        title: 'Concept & spatial design',
        description:
          'Developing the spatial concept, circulation, atmosphere and experience rhythm from the agreed strategy.',
      },
      {
        title: 'AI-assisted concept exploration',
        description:
          'Generating and comparing early visual directions as working material, then refining the selected idea through human design judgment and technical checks.',
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
    gallery: [
      {
        after: 'overview',
        src: '/images/gallery/design-sketch.webp',
        kind: 'work',
        alt: 'A hand-drawn presentation sketch of a play structure with slides and climbing frames, drawn with people for scale.',
      },
      {
        after: 'activities',
        src: '/images/gallery/design-render.webp',
        kind: 'work',
        alt: 'An aerial rendering of a play area with a slide, sand surfacing, planting and a timber climbing frame.',
      },
      {
        after: 'overview',
        src: '/images/gallery/design-swan.webp',
        kind: 'work',
        alt: 'A line drawing of a swan-shaped play structure with slides and a climbing net, drawn in aqua on a dark ground.',
      },
      {
        after: 'overview',
        src: '/images/gallery/design-bird.webp',
        kind: 'work',
        alt: 'A hand-drawn concept sketch of a large pink bird sculpture in a planted landscape, with slides and a timber climbing structure.',
      },
      {
        after: 'activities',
        src: '/images/gallery/design-capybara.webp',
        kind: 'work',
        alt: 'An illustration of a capybara-themed playground with a colour strip and photographs of the finished equipment installed in a park.',
      },
      {
        after: 'cost',
        src: '/images/gallery/design-equipment.webp',
        kind: 'work',
        alt: 'A concept sketch of a timber play structure, with photographs of the finished equipment installed in a public park.',
      },
    ],
    visual: {
      kind: 'image',
      src: '/images/hero/design-sculpture.webp',
      alt: 'A hand-drawn concept sketch of a whale-shaped play sculpture, with slides, a climbing net and wave forms.',
    },

    visualCaption: 'Concept sketch — a sculptural play structure',
    mobilePosition: '72%',
    illustration: {
      src: '/images/service/creative-design.webp',
      alt: 'A rooftop play environment in a kindergarten courtyard: a slide, a timber play structure and a yellow climbing mound.',
      caption: 'Play environment — designed and rendered by us',
    },

    related: [
      { href: '/strategy', label: 'Strategy & Consulting' },
      { href: '/supply-chain', label: 'Supply Chain & Delivery' },
    ],
  },
  {
    slug: 'supply-chain',
    definition: 'AQUASEE Sourcing & Delivery organises how water-play equipment, pool slides, shade structures and landscape features are made, inspected, shipped and installed through qualified partners under one clear specification.',
    notIncluded: [
          'Ownership or operation of manufacturing capacity — production is run by qualified partners under our brief and our inspection',
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
    title: 'Sourcing & Delivery',
    aiLabel: 'AI-assisted sourcing analysis',
    lede: 'The making is one part of the job; landing it on your site is another. We bring the know-how that makes bespoke product buildable — and then let you decide how much of it you make yourself.',
    intro:
      'The right supplier depends on the product, finish, climate, quantity and installation route. We compare qualified partners, close gaps in quotations and coordinate production so the delivered result matches the design intent.',
    paragraphs: [
      'We have spent years specifying, sourcing, dismantling and delivering bespoke product for landscape, play and hospitality projects. AI-assisted supplier research, specification comparison and option modelling help us work through more routes; experienced people still qualify partners, inspect production and own the delivery decision.',
      'We hand you that knowledge as a set of options. A product can arrive complete, as a kit your team assembles, or as semi-finished modules your own team completes. Every route is costed against one specification, and you choose.',
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
        title: 'AI-assisted sourcing analysis',
        description:
          'Structuring supplier information, comparing quotations and identifying gaps in scope, lead time and specification before a partner is selected.',
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
    gallery: [
      {
        after: 'overview',
        src: '/images/gallery/supply-laser.webp',
        kind: 'illustration',
        alt: 'A laser cutting head tracing a curved profile into a steel plate, sparks along the cut line.',
      },
      {
        after: 'overview',
        src: '/images/gallery/supply-cutting.webp',
        kind: 'illustration',
        alt: 'A CNC router cutting curved panels from laminated timber in a woodworking workshop, the cut parts stacked alongside.',
      },
      {
        after: 'activities',
        src: '/images/gallery/supply-drilling.webp',
        kind: 'illustration',
        alt: 'A drill press boring a row of holes into a curved steel bracket, curled metal shavings around it.',
      },
      {
        after: 'activities',
        src: '/images/gallery/supply-welding.webp',
        kind: 'illustration',
        alt: 'A welder in a protective helmet joining a steel joint on a large custom playground frame, arc light and sparks.',
      },
      {
        after: 'cost',
        src: '/images/gallery/supply-assembly.webp',
        kind: 'illustration',
        alt: 'Two workers assembling curved timber and steel playground components in a workshop.',
      },
      {
        after: 'cost',
        src: '/images/gallery/supply-transport.webp',
        kind: 'illustration',
        alt: 'A long flatbed truck carrying large wrapped steel and timber components of a playground structure on a highway at dawn.',
      },
    ],
    visual: {
      kind: 'image',
      src: '/images/hero/supply-fabrication.webp',
      alt: 'An exploded technical drawing of an installation broken into its manufacturable parts: foundation, structure, facade panels and membranes.',
    },

    visualCaption: 'Fabrication breakdown — the parts before the site',
    mobilePosition: '52%',
    illustration: {
      src: '/images/service/supply-delivery.webp',
      alt: 'A finished play structure wrapped in protective foam and strapped to timber stillages, ready to leave the workshop.',
      caption: 'Packed and ready to ship (illustrative)',
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
