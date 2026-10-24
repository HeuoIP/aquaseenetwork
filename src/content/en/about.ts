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
  title: 'A service company, not a factory.',
  lede:
    'AQUASEE plans, designs and organises the supply chain for tourism, public-space and children’s play projects. We hold one brief across all three, and we do not own production capacity.',
  definition:
    'AQUASEE is a China-based service company that provides three connected capabilities to developers, operators and design practices: early-stage project consulting, creative design and R&D, and organised supply chain management through to delivery and handover. We are not an equipment manufacturer and we do not own factories; we select, brief, manage and verify specialist manufacturing partners, and we remain accountable for the result.',
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
      'We are describing our own model accurately, not ranking the others. A factory is the right choice for a standard product with a finished drawing, and a design studio is the right choice when the design is the whole problem.',
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
    'We do not manufacture equipment and we do not own factories.',
    'We do not publish client projects without written authorisation, and we do not present concept work as delivered work.',
    'We do not take on work we believe cannot be delivered responsibly for the budget and programme stated.',
    'We do not provide legal, structural-engineering or certification services; we engage qualified specialists and hold them to the brief.',
    'We do not quote from a concept image alone — we need enough of a specification to be responsible for a price.',
  ],
  markets: [
    {
      tier: 'Tier 1',
      title: 'Gulf, Southeast Asia, East Asia and Oceania',
      note: 'High construction and tourism investment, English-language contracting, and a strong appetite for custom, non-catalogue work.',
      list: [
        'United Arab Emirates',
        'Saudi Arabia',
        'Qatar',
        'Kuwait',
        'Oman',
        'Bahrain',
        'Singapore',
        'Malaysia',
        'Thailand',
        'Vietnam',
        'Indonesia',
        'Japan',
        'South Korea',
        'Australia',
        'New Zealand',
      ],
    },
    {
      tier: 'Tier 2',
      title: 'Eastern Europe, Central Asia and Africa',
      note: 'Russian- and Arabic-speaking procurement, longer logistics chains, and a strong need for a partner who can hold the whole brief.',
      list: [
        'Russia',
        'Poland',
        'Romania',
        'Czechia',
        'Estonia',
        'Latvia',
        'Lithuania',
        'Ukraine',
        'Kazakhstan',
        'Uzbekistan',
        'Kyrgyzstan',
        'South Africa',
        'Mauritius',
        'Seychelles',
      ],
    },
    {
      tier: 'Growth',
      title: 'Lower-income, high-investment markets',
      note: 'Outside the usual per-capita threshold, but tourism and public-space investment is active — served on the same terms, tracked separately.',
      list: ['Kenya', 'Tanzania', 'Rwanda', 'Ghana', 'Nigeria'],
    },
  ],
  processNote:
    'The same six stages apply everywhere. What changes between projects is the length of each stage, not the sequence.',
};