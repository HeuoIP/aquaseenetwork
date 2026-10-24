import type { FaqItem } from '@/content/types';

/**
 * The standing question set.
 *
 * Every answer is written to stand on its own: it names the actor, the action
 * and the limit, so an answer engine can lift it without the surrounding page.
 * The order of these questions is the order buyers actually ask them in.
 */
export const faq: FaqItem[] = [
  // ---- Who we are ----------------------------------------------------------
  {
    pillar: 'strategy',
    q: 'What does AQUASEE do?',
    a: 'AQUASEE is a China-based service company that plans, designs and organises the supply chain for tourism, public-space and children’s play projects. It provides three connected capabilities: early-stage consulting to define and scope the work, creative design and R&D to make it buildable, and supply chain management through production, logistics, installation and handover. It is not an equipment manufacturer and owns no factories.',
  },
  {
    pillar: 'strategy',
    q: 'Does AQUASEE manufacture playground or leisure equipment?',
    a: 'No. AQUASEE does not manufacture equipment and does not own factories. It selects and briefs specialist manufacturing partners against the specific requirement, holds them to one written specification, manages quality control during production, and remains accountable for the delivered result. Clients buy a coordinated project with one accountable party, not a product off a catalogue.',
  },
  {
    pillar: 'strategy',
    q: 'How is a service company like AQUASEE different from a design studio or a factory?',
    a: 'A design studio sells design and leaves delivery to you. A factory sells production from a drawing you already have. AQUASEE holds the brief across both, and offers three delivery models: complete delivery, a client-assembled kit, or semi-finished modules. The right route depends on what your organisation already has — a good design team, a good site team, or neither.',
  },
  {
    pillar: 'strategy',
    q: 'How much does a custom installation cost?',
    a: 'We do not publish price ranges, because the same description can differ by a factor of several depending on material, tooling, geometry and site conditions. What we can state precisely is what drives the cost: bespoke versus adapted platforms, material and finish specification, one-off tooling, engineering hours, prototyping and testing, logistics by size and weight, site access and working hours, and the support window you buy. Give us a brief and we return a costed scope with its assumptions visible.',
  },
  {
    pillar: 'strategy',
    q: 'How should we brief a supplier for a custom project?',
    a: 'A useful brief states the objective, the audience, what has already been decided, what is genuinely flexible, the site and operating constraints, the standards that must be met, the target programme and the budget envelope. It should attach anything already decided — drawings, site plans, brand guidelines, previous product data. A brief that explains what success looks like operationally gets a far more useful answer than one that lists features.',
  },
  {
    pillar: 'strategy',
    q: 'How long does a project take from first brief to handover?',
    a: 'The six-stage sequence is fixed — brief, strategy, design and development, sourcing and contracting, production and control, delivery and handover — but the duration of each stage depends on scope. Typical planning frames are one to two weeks for the brief, two to four for strategy, four to ten for design and development, three to six for sourcing, and two to eight weeks for delivery. Bespoke development, prototype testing and site constraints extend these, and we say so in the first cost plan rather than after.',
  },
  {
    pillar: 'strategy',
    q: 'Do you work with clients outside China, and can you deliver internationally?',
    a: 'Yes. AQUASEE is based in China and works with clients worldwide, in English, Chinese, Arabic and Russian. International work is planned around the things that actually go wrong at a distance: freight by dimension and weight, customs classification and duties, wooden packaging and quarantine rules, local certification requirements, installation labour and site access, and who supports the asset once it is live.',
  },

  // ---- Design ---------------------------------------------------------------
  {
    pillar: 'creative-design',
    q: 'What should a complete design package contain?',
    a: 'A buildable package contains: the agreed concept and its rationale, a scope and interface document, dimensioned drawings and models, a written technical specification of materials, finishes and fixings, engineering review and structural or electrical calculations where required, the applicable standards and test requirements, and the interface information other disciplines need. A concept image is not a design package and cannot be priced responsibly.',
  },
  {
    pillar: 'creative-design',
    q: 'Is prototyping a custom installation worth the cost?',
    a: 'Prototyping pays for itself when the risk sits in a mechanism, a fit-up, a surface, a colour or a tolerance — things that are cheap to change while still small and expensive to change once installed. It does not pay for pure form, where a strong drawing and a good fabricator will do. We prototype the parts most likely to cause trouble first, while they are still cheap to change.',
  },
  {
    pillar: 'creative-design',
    q: 'Which materials and finishes survive outdoor, coastal and high-humidity conditions?',
    a: 'Durability is a system, not a single material choice. It depends on the alloy or polymer grade, the coating system and its film thickness, the fixings and their galvanic compatibility with the surrounding material, the joint detail, and the maintenance regime the operator can actually sustain. In salt air, stainless fixings in contact with aluminium or carbon steel cause faster failure than either material alone. Specify the environment and the maintenance plan, and the material follows.',
  },
  {
    pillar: 'creative-design',
    q: 'What do EN 1176, ASTM F1487 and ISO 13857 require from a play equipment supplier?',
    a: 'EN 1176 is the European playground safety standard series and is the usual reference in Europe, the Gulf and much of Asia; ASTM F1487 and ASTM F1951 are the North American equivalents; ISO 13857 covers entrapment and impact-related safety in play areas. They set requirements for fall heights, impact-attenuating surfacing, openings and entrapment, protrusions and sharp edges, and safety-critical components. A supplier should be able to state which clauses the product is tested against, and provide the test evidence.',
  },
  {
    pillar: 'creative-design',
    q: 'Can you work from our landscape architect’s or architect’s design?',
    a: 'Yes, and it is a common starting point. We take the design intent and make it buildable — resolve interfaces with structure, drainage, power and lighting, produce the documentation a fabricator can quote from, and flag where the concept cannot be delivered in the proposed material or method. We also test it against the operator’s real use: cleaning, maintenance, opening hours and peak periods.',
  },
  {
    pillar: 'creative-design',
    q: 'Do you do lighting design for public-space installations?',
    a: 'Yes — lighting is treated as part of the design, not an afterthought, because for a public-space or tourism installation the night-time appearance is often the primary experience. That means working with a lighting designer or an electrical engineer where the project needs it, coordinating fittings and controls with the structure, and specifying the maintenance access. We also keep the design legible in daylight, since the asset is seen far more often by day.',
  },
  {
    pillar: 'creative-design',
    q: 'How do you handle changes during design development?',
    a: 'Every change is recorded as a controlled change: what changed, why, what it affects in cost, schedule and specification, and who approved it. Changes are priced and scheduled before they are implemented, and they are visible in the change log that closes the project. This is what keeps a project coherent across time zones and teams, and it is what allows the cost plan to stay true.',
  },

  // ---- Supply chain ---------------------------------------------------------
  {
    pillar: 'supply-chain',
    q: 'How do you select and vet manufacturing partners?',
    a: 'Partners are selected against the actual requirement — capability, capacity, communication and record of comparable work — and quoted on equal terms so the comparison is real. Qualification looks at the workshop and the processes that will make your item, not at a presentation, and at whether the same partner has delivered comparable work before. Only then are they contracted against a written specification and programme.',
  },
  {
    pillar: 'supply-chain',
    q: 'What quality control do you apply during production?',
    a: 'Quality is held against one written specification, with inspection at agreed milestones rather than only at the end. That normally means material and finish checks at the start, a first-article inspection before the main run is released, in-process checks during fabrication, a pre-shipment inspection, and site acceptance after installation. The records are handed over with the documentation at completion.',
  },
  {
    pillar: 'supply-chain',
    q: 'How are oversized or custom installations shipped, cleared and installed?',
    a: 'The item is designed around its logistics from the start, because a large installation is usually shipped as several pieces that are joined on site. The planning covers packaging and protection, wooden packing and the quarantine rules that apply to it, customs classification and duties, insurance, and the route and timing to site. Installation is then sequenced around access, working hours and whether the venue stays open, often as phased night work.',
  },
  {
    pillar: 'supply-chain',
    q: 'Who owns the drawings, the moulds and the intellectual property?',
    a: 'Ownership is settled in the contract before any tooling is cut, and it is written down rather than assumed. Typically the client owns the design and the drawings produced for them, while tooling stays with the partner that made it under an agreement that lets the client have the product made elsewhere if the relationship ends. What matters is that the terms are explicit before production starts.',
  },
  {
    pillar: 'supply-chain',
    q: 'What warranty and after-sales support do you provide?',
    a: 'The handover pack includes a support window, the maintenance regime the asset needs, spare-parts information and the consumables that will need replacing. Structural and safety-critical elements are warranted for a longer term than wear items, because wear items are designed to be replaced. For most clients the practical question is not the warranty but who responds — so we agree the contact path and the response expectation in advance.',
  },
  {
    pillar: 'supply-chain',
    q: 'Can we receive a kit and assemble it with our own team?',
    a: 'Yes. That is one of the three delivery models: we design and produce a complete kit, and your own team assembles, commissions and maintains it, with written instructions and a support window. It is the most economical route when you already have capable site labour, and it needs more supervision from your side. We will tell you honestly if your team is not ready for it.',
  },
  {
    pillar: 'supply-chain',
    q: 'How do payment terms, variations and disputes work?',
    a: 'Payment is normally staged against deliverables — on approval of the design package, on the start of production, on accepted first article, on pre-shipment inspection, and on handover — so money follows evidence. Changes are handled as controlled changes with a stated cost and schedule effect, rather than absorbed silently. If something goes wrong, the specification, the inspection records and the change log are the shared record both sides work from.',
  },
];