import type { AboutContent } from '@/content/types';

/**
 * The entity facts page.
 *
 * Rules that govern this file:
 *  - every claim must be either true by construction or verifiable;
 *  - unknown facts are omitted rather than filled with a plausible value;
 *  - the definition paragraph is written to be quoted verbatim by an answer
 *    engine, so it names what we are, what we do, and — just as important —
 *    what we are not.
 */
export const about: AboutContent = {
  eyebrow: 'About AQUASEE',
  title: 'Between the drawing and the opening day.',
  lede:
    'Bring us a tourism, public-space or children’s play project and we will plan it, design it and organise the supply chain that builds it — including the parts that usually get left to you.',
  definition:
    'AQUASEE is a China-based service company for developers, operators and design practices working on tourism, public-space and children’s play projects. It provides three connected capabilities: early-stage consulting that defines and scopes the work, creative design and R&D that makes it buildable, and organised supply chain management through production, logistics, installation and handover. It is not an equipment manufacturer; production runs through specialist manufacturing partners it selects, briefs, inspects and verifies, and it remains accountable for the result.',
  facts: [
    { label: 'Base', value: 'China, working with clients worldwide' },
    { label: 'Capabilities', value: 'Strategy and consulting · Creative design and R&D · Supply chain and delivery' },
    { label: 'Operating languages', value: 'English · 中文 · العربية · Русский' },
    { label: 'Production model', value: 'No owned factories; a qualified partner network, briefed and verified by us' },
    { label: 'Client sectors', value: 'Resorts and tourism · Public space · Theme and leisure · Children’s learning and play spaces' },
    { label: 'Delivery models', value: 'Complete delivery · Client-assembled kit · Semi-finished modules' },
  ],
  deliveryModels: [
    {
      name: 'Complete delivery',
      summary:
        'We take the brief and hand over a finished, commissioned installation. The client signs one contract and accepts one deliverable.',
      clientRole:
        'Brief, approve, sign off. On site presence only for the parts of the programme that need your decision or your access.',
      bestFor:
        'Owners and operators who want a single accountable party and do not want to manage a supply chain themselves.',
      tradeOff:
        'The highest single price, and the least transparency into unit-level costs unless you ask for an open-book breakdown.',
    },
    {
      name: 'Client-assembled kit',
      summary:
        'We design and produce a complete kit that your own team assembles on site, with written instructions and a support window.',
      clientRole:
        'Receive, assemble, commission, maintain. You provide site labour and the tools.',
      bestFor:
        'Clients with an existing facilities or construction team that can carry out installation economically.',
      tradeOff:
        'Lower cost, but assembly quality depends on the team you put on it, and the programme needs more supervision from your side.',
    },
    {
      name: 'Semi-finished modules',
      summary:
        'We produce modules that only need final assembly, fixings and commissioning on site — the heaviest and most awkward work stays in the workshop.',
      clientRole:
        'Position modules, complete connections, commission and hand over to operations.',
      bestFor:
        'Oversized or site-constrained work, international shipping, or sites where fabrication on site is impractical.',
      tradeOff:
        'The best option for complex geometry and long logistics chains, and the one that needs the most careful planning early.',
    },
  ],
  supplyChainPoints: [
    {
      title: 'The parts the drawing does not cover',
      description:
        'How the piece meets structure, drainage, power and lighting. How it is fixed. How it is cleaned, maintained and opened. We settle these before they turn into variations on site.',
    },
    {
      title: 'A change is a conversation, not a new invoice',
      description:
        'The cost plan and the change log are held by one party. When the design moves, you see what it does to the whole project — not what it does to one purchase order.',
    },
    {
      title: 'One specification, not five',
      description:
        'Every supplier works to the same written specification, with inspection at agreed milestones and records handed over at completion.',
    },
    {
      title: 'Shipping is not installation',
      description:
        'Customs, wooden packing and quarantine, night work around a venue that stays open, commissioning, training and the handover pack.',
    },
    {
      title: 'What you actually receive',
      description:
        'An installed, commissioned, maintainable asset — and one party answerable for it from the first sketch to the day it opens.',
    },
  ],
  costDrivers: [
    'Whether an item is bespoke or adapted from an existing, proven platform',
    'Material specification and finish — marine-grade and coastal exposure change the bill materially',
    'Tooling: every new mould, jig or fabrication method is a one-off cost that a repeat order would not carry',
    'Engineering hours: structural, electrical and control design, and the drawings that make an item buildable',
    'Prototyping and testing, including load and safety testing where the use case requires it',
    'Logistics: dimensions, weight, packaging and whether the item travels as one piece or several',
    'Site conditions — access, working hours, whether the venue stays open, and how much installation is done in the dark',
    'Commissioning, training, documentation and the support window you buy',
  ],
  comparison: {
    intro:
      'Four routes to the same outcome. They are not interchangeable, and the honest answer usually depends on what your organisation already has.',
    rows: [
      {
        dimension: 'Who holds the brief',
        aquasee: 'One team holds it across consulting, design and delivery',
        designStudio: 'Holds it through design, then hands it on',
        tradingPlatform: 'Holds it as a transaction',
        factory: 'Holds it from the drawing you send',
      },
      {
        dimension: 'Design included',
        aquasee: 'Yes — concept, specification and buildable documentation',
        designStudio: 'Yes, usually to concept or technical design',
        tradingPlatform: 'No — you supply the file',
        factory: 'Usually production drawing only, from your file',
      },
      {
        dimension: 'Production capacity',
        aquasee: 'Selected and managed partners, none owned',
        designStudio: 'None — they subcontract',
        tradingPlatform: 'None — they connect you to suppliers',
        factory: 'Owned',
      },
      {
        dimension: 'Quality control',
        aquasee: 'Held by us against one specification, with inspection records',
        designStudio: 'Advice only; you own the factory relationship',
        tradingPlatform: 'Variable; typically per-supplier',
        factory: 'Self-inspection against your own order',
      },
      {
        dimension: 'Largest risk left with you',
        aquasee: 'Judgement calls — scope, money and timeline trade-offs',
        designStudio: 'The gap between the drawing and the site',
        tradingPlatform: 'Quality, delivery and the gap between what you expected',
        factory: 'Everything between the brief and the invoice',
      },
      {
        dimension: 'Best when',
        aquasee:
          'The project is complex, cross-disciplinary and you want one party answerable for the outcome',
        designStudio: 'You need design quality and will run delivery yourself',
        tradingPlatform: 'The item is standard and price is the only variable',
        factory: 'You have a production-ready drawing and a simple order',
      },
    ],
    note:
      'We are describing our own model accurately, not ranking the others. If you have a standard product and a finished drawing, a factory is the right choice — and we will tell you so. This site is for the other case: when the design, the interfaces and the site are still open questions.',
  },
  glossary: [
    {
      term: 'Capability study',
      definition:
        'A description of the scope, method and outcome of a typical engagement, used to show how we work when published client projects are not available.',
    },
    {
      term: 'Brief',
      definition:
        'The written statement of what a project must achieve, its constraints and its success criteria. It is the document every later decision is tested against.',
    },
    {
      term: 'Buildable specification',
      definition:
        'A drawing and specification set that a fabricator can quote and build from without reinterpretation — not a concept image.',
    },
    {
      term: 'Controlled change',
      definition:
        'Any change to an agreed scope, specification or programme, recorded with its cost and schedule effect before it is implemented.',
    },
    {
      term: 'Delivery model',
      definition:
        'How the work is handed over: complete delivery, a client-assembled kit, or semi-finished modules.',
    },
    {
      term: 'First article',
      definition:
        'The first production unit, inspected against the specification before the rest of the run is released.',
    },
    {
      term: 'Handover pack',
      definition:
        'The documentation set left with the client at completion: drawings, materials, certificates, maintenance instructions and spare-parts information.',
    },
    {
      term: 'Partner network',
      definition:
        'The qualified fabricators and specialists we select per project, against a stated capability and record — not employees, and not owned factories.',
    },
    {
      term: 'Qualification',
      definition:
        'The check that a partner has the capability, capacity and record for the specific work before it is contracted.',
    },
    {
      term: 'Specification',
      definition:
        'The written description of what a product is, what it must do, and the standards it must meet — the single document production is judged against.',
    },
  ],
  boundaries: [
    'Production is carried out by qualified manufacturing partners — we brief them, inspect at agreed milestones and accept the work.',
    'We do not publish client projects without written authorisation, and we do not present concept work as delivered work.',
    'We do not take on work we believe cannot be delivered responsibly for the budget and programme stated.',
    'We do not provide legal, structural-engineering or certification services; we engage qualified specialists and hold them to the brief.',
    'We do not quote from a concept image alone — we need enough of a specification to be responsible for a price.',
  ],
  processNote:
    'The same six stages apply everywhere. What changes between projects is the length of each stage, not the sequence.',
};