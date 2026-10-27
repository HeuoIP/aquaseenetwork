import type { InsightArticle } from '@/content/types';

/**
 * The insight library — English.
 *
 * Every article follows the same discipline:
 *   - the excerpt answers the title's question in one or two sentences, so it
 *     can be quoted on its own;
 *   - every section opens with a paragraph that answers its own heading;
 *   - specific claims carry a source and the date it was consulted;
 *   - nothing states a price, a statistic or a standard that cannot be checked.
 */

export const insights: InsightArticle[] = [
{
    slug: 'how-to-turn-a-creative-play-concept-into-a-buildable-product',
    title: 'How to turn a creative play concept into a buildable product',
    excerpt:
      'A creative concept and a product are different things, and the distance between them is made of six specific steps: define the experience, break the idea into a system, test materials against the supply chain you actually have, check safety and feasibility, price the risks, and prepare for handover. Skip any one of them and the gap is paid for on site.',
    pillar: 'creative-design',
    vertical: 'children',
    readingMinutes: 10,
    updatedAt: '2026-10-27',
    sections: [
      {
        id: 'the-gap',
        heading: 'The gap between an attractive idea and a product that exists',
        body: [
          'An idea has to survive a long journey before anyone can use it. A sketch becomes a specification; a specification becomes a quotation from a factory; a quotation becomes something delivered, installed and safe to use. Projects rarely fail because the idea was weak. They fail because the middle of that journey was never scheduled, staffed or priced, and every party assumed somebody else was covering it.',
          'The creative side of the industry is good at the first two steps. The manufacturing side is good at the last two. What sits between them decides whether a concept survives contact with production: which of the two hundred forms in the sketch is the one that gets built, and whether it can be built at all without being redesigned.',
        ],
        callout:
          'The risk in a play or interactive-landscape project is rarely in the idea. It is in the unowned middle.',
      },
      {
        id: 'the-six-steps',
        heading: 'The six steps, and what each one has to produce',
        body: [
          'Each step has three jobs: decide what is done, name the failure that usually happens there, and state what you are entitled to hold in your hand when the step is finished. If you cannot say what comes out of a step, the step was never scheduled, and unscheduled work does not happen.',
        ],
        table: {
          caption:
            'The six steps between a concept and a product that can be built, and what each one produces.',
          headers: ['Step', 'What you do', 'What usually goes wrong', 'What you should end up with'],
          rows: [
            [
              '1. Define the experience',
              'Write down what a visitor does, and how the place should feel, before anything is drawn',
              'The brief arrives as a list of objects, so each one is justified separately and the reason for the whole thing is lost',
              'A one-page experience brief that everything afterwards is checked against',
            ],
            [
              '2. Translate it into a system',
              'Break the concept into modules, movement, structure and circulation',
              'Modularity is decided at the factory gate, so the form is either welded as one piece or broken in ways nobody approved',
              'A component breakdown with the interfaces defined and the repeatable parts identified',
            ],
            [
              '3. Match materials to manufacturing',
              'Check each material and process against suppliers who can deliver it, to that finish, at that volume',
              'Finishes are chosen from a render rather than from a process, and the first quotation lands well above the estimate',
              'A shortlist of feasible material-and-process pairs, with indicative lead times',
            ],
            [
              '4. Review safety and feasibility',
              'Have the safety case, the structure and the environment checked by qualified reviewers',
              'The check happens after the drawings are approved, so the findings arrive as changes to a priced design',
              'A reviewed concept with the open items listed rather than smoothed over',
            ],
            [
              '5. Cost the risk, not just the parts',
              'Cost material, processing, freight, installation and maintenance together',
              'Only the material is priced, so everything else arrives later as variations, when there is no leverage left',
              'A cost range with the assumptions written down and the exclusions named',
            ],
            [
              '6. Prepare for implementation',
              'Agree the deliverables, the manufacturer inputs, the inspection points and the handover',
              'Documentation is treated as paperwork, so the manufacturer reinterprets the drawings and the site absorbs the difference',
              'A handover package both sides can be held to, including the inspection regime',
            ],
          ],
        },
      },
      {
        id: 'define-the-experience',
        heading: 'Step one — define the experience before you draw anything',
        body: [
          'The first step is not a design step. It is a decision about what a visitor should be able to do here that they cannot do anywhere else in the programme, and about how the place should feel while they do it. Play equipment is chosen because of what it makes possible — climbing, balancing, hiding, watching, competing — and the object is only one way of delivering that.',
          'Briefs usually arrive as a list: a slide, a climbing frame, a water feature, and a request to make them look like the render. The list carries no hierarchy, so everything in it gets built, and the experience that made the project worth doing is nowhere in the document. It gets decided later, by whoever is left holding the budget.',
          'What you should end up with is one page: the intended behaviour, the age range and the dwell time, and the conditions the place has to meet for that behaviour to work. Everything after this step is checked against it. When a supplier proposes a cheaper part in week nine, you can say what it costs in experience, because you wrote that down in week one.',
        ],
        list: [
          'What is the visitor supposed to be able to do here that they cannot do anywhere else in the programme?',
          'How long should one visit to this element last, and how many people can be on it at once?',
          'What has to be true of the place — surface, drainage, shade, supervision, distance from other attractions — for that behaviour to work?',
        ],
      },
      {
        id: 'translate-into-a-system',
        heading: 'Step two — translate the idea into a system',
        body: [
          'A creative concept is usually one continuous form. Manufacturing needs the opposite: a set of parts, each with a material, a process, a tolerance, a joint and a price. The translation between those two states is the step that makes a concept buildable, and it is the step most often skipped — because in a presentation it looks like an administrative detail.',
          'Three translations have to happen at once. What moves, and how. What carries the load, and where the load goes. And how a person travels through the piece, because a play structure is a route and not only an object.',
          'The HAGS Zingo steel play range is a clear example of that translation being made deliberately. According to the design agency Designworks, the distinctive blob element was carried from the earliest brainstorm sketches, through scale models, into design engineering, and on into playgrounds across Europe. The form survived because every stage was drawn with the next one in view.',
          'What usually goes wrong is that modularity is decided at the factory gate. The manufacturer is then given one continuous form and has two bad options: quote it as a single welded assembly, which is expensive to ship and impossible to repair, or break it into parts in ways the designer never intended and cannot vouch for.',
          'What you should end up with is a component breakdown: the modules and how they join, the parts that repeat, the parts that are specific to this site, and the parts that will be replaced first. Repeatable modules are where cost comes down; site-specific parts are where it goes up. Which is which has to be known before the drawings are finished, not after.',
        ],
      },
      {
        id: 'materials-and-manufacturing',
        heading: 'Step three — match the material to the process and the supplier',
        body: [
          'A material choice is not a design decision on its own. It is a decision about who can process it, to what tolerance, with what finish, at what volume, and how far it has to travel. Those questions belong to manufacturing, and they are asked far too late.',
          'The practical test is short: can you name three suppliers who could make this part, to this drawing, in this finish, within the lead time the programme needs? If you cannot name three, you do not have a material decision — you have a hope.',
          'Finishes are where this usually breaks. A powder coat, a hot-dip galvanised finish, a stainless grade, a timber treatment and a rotationally moulded surface all age differently, wear differently, cost differently to apply and cost differently to deliver. A finish chosen because it looks right in a render is a finish the factory has not been asked about.',
          'What you should end up with is a shortlist of feasible material-and-process pairs, each with an indicative lead time and a sentence explaining why it was chosen. This is also the moment to find out whether the concept depends on a process that exists in only one place in the world, because that is a programme risk and not a technical curiosity.',
        ],
        list: [
          'Can you make this part, from this drawing, in this finish?',
          'What tolerance do you work to, and what do you need from us to hold it?',
          'What is the minimum order, and the realistic lead time from drawing to delivery?',
          'What do you need from us, and by when, before you can start?',
        ],
      },
      {
        id: 'safety-and-feasibility',
        heading: 'Step four — review safety and technical feasibility while it is still a drawing',
        body: [
          'Safety is checked, not designed in, and the check has a timing. Too early and it constrains an idea before anyone knows what the idea is. Too late and it produces a list of changes to a drawing that is already approved and priced.',
          'This is the step that belongs to people with the right qualification: structural engineers, playground safety assessors, and the certification body or local authority for the market the equipment will actually operate in. The applicable standard follows the market of operation, not the market of purchase — EN 1176 for playground equipment in Europe, the Gulf and much of Asia, the ASTM series in North America, and the relevant local building, accessibility, fire and electrical rules everywhere else.',
          'What usually goes wrong is that the two hardest categories of problem — falls and entrapment on one side, foundations and interfaces on the other — are treated as separate from the equipment. They are not. A compliant product on the wrong surfacing, with the wrong anchoring, or in a layout that puts a high element next to a hard edge is not a compliant installation. The surfacing, the anchoring and the layout are part of the safety case and part of the cost.',
          'What you should end up with is a concept that has been reviewed, with the open items listed rather than smoothed over, and a note of which standards apply where it will be used. Where a conclusion depends on a qualified professional, that professional signs it — the rest of the team carries it out, it does not replace it.',
        ],
        callout:
          'Compliance belongs to the installed asset, not to the product in the box.',
      },
      {
        id: 'cost-and-delivery-risk',
        heading: 'Step five — cost the risk, not just the parts',
        body: [
          'A quotation is a set of assumptions wearing a number. The useful question is not what it costs but what it assumes, and then whether you believe the assumptions.',
          'Only the material is usually priced at the start. The fixings, the coatings, the packaging, the freight, the crane, the foundations, the installation crew and the access for maintenance are not — so they arrive later, as variations, at the moment when there is no leverage left and the programme cannot move.',
          'What you should end up with is a range rather than a number, with the assumptions listed beside it: quantities, finish, tolerance, packaging, freight terms, site access, installation method, and what is explicitly excluded. An assumption you can see is an assumption you can challenge. An assumption buried inside a single figure is not, and it will be charged to you at the most expensive moment.',
        ],
        list: [
          'Material and processing, by quantity',
          'Fixings, coatings and anything site-specific',
          'Packaging and freight, to the actual port and the actual site',
          'Foundations, installation and the equipment needed to install it',
          'Commissioning, testing, and the inspection regime after handover',
          'Maintenance access, spares and what the first year of upkeep requires',
        ],
      },
      {
        id: 'implementation-readiness',
        heading: 'Step six — prepare for implementation and handover',
        body: [
          'The last step decides whether the thing that was designed is the thing that gets built. It has three parts: what the factory needs from you, what you need from the factory, and what happens on site.',
          'What usually goes wrong is that documentation is treated as paperwork to be produced at the end. The manufacturer receives a set of drawings without the specification, without the finish reference and without the parts list, and reinterprets them — reasonably, because they have to. The difference between the intention and the interpretation is then absorbed on site, in the least forgiving place there is.',
          'What you should end up with is a handover package both sides can be held to: the production package itself, the sample or mock-up that was approved, the inspection record at each production stage, the installation record, and the maintenance and inspection schedule that keeps the asset compliant after it opens.',
        ],
        list: [
          'To the manufacturer — production drawings, the specification, the finish reference, the parts list, and the approved sample',
          'From the manufacturer — the schedule, the stage inspection points, the deviation notice process, and the packing list',
          'On site — delivery, installation, snouting and handover, the as-built record, and the inspection regime that follows',
        ],
      },
      {
        id: 'where-the-work-sits',
        heading: 'Where the work sits, and why that is the decision',
        body: [
          'The six steps do not belong to the same party, and that is the whole problem. The creative studio does the first two. The manufacturer does the third and the fourth, in the way they were asked to. The client is left holding the gap, which is where most of the risk sits and where most of the disputes are settled.',
          'Closing the gap does not require owning a factory. It requires someone to own the translation: to hold the intention, write it down, carry it through the quotations, check it at the production stages, and take delivery of something that matches what was intended. That is the work AQUASEE does. The task list is issued by us, the checkpoints are ours, the delivery is ours; production itself is carried out by qualified manufacturing partners.',
          'A test you can apply to any project: if it cannot be built by a factory you have never met, from a package a stranger can read, then the idea is not wrong — it is early. And an idea that is early can still be worth a great deal, provided somebody is paid to move it forward.',
        ],
        callout:
          'If a project cannot be built by a factory you have never met, from a package a stranger can read, the idea is not wrong. It is early.',
      },
    ],
    keyTakeaways: [
      'The risk in a concept project is rarely the idea; it is the unowned middle between the design and the factory',
      'Write the experience down first — every later decision, including cheaper substitutions, is checked against it',
      'Ask a supplier to prove they can make the part, not that they are capable in general',
      'Compliance belongs to the installed asset, not to the product in the box',
      'A cost range with its assumptions written down is worth more than a single number',
    ],
    sources: [
      {
        label: 'Designworks — HAGS Steel play: concept development carried through to production',
        url: 'https://www.designworks.studio/hags',
        accessed: '2026-10-27',
      },
      {
        label: 'EN 1176 — playground safety standards',
        url: 'https://en.wikipedia.org/wiki/EN_1176',
        accessed: '2026-10-27',
      },
      {
        label: 'ISO 13857 — entrapment and impact safety in play areas',
        url: 'https://en.wikipedia.org/wiki/ISO_13857',
        accessed: '2026-10-27',
      },
    ],
    related: [
      'what-a-design-package-must-contain',
      'choosing-agency-factory-or-delivery-partner',
      'safety-standards-for-play-and-public-equipment',
      'briefing-a-contract-manufacturer',
      'when-prototyping-is-worth-it',
    ],
  },
{
    slug: 'what-a-design-package-must-contain',
    title: 'What a complete design package contains — and what it does not',
    excerpt:
      'A buildable package is a set of documents a fabricator can quote and build from without reinterpretation. A concept image is not a design package and cannot be priced responsibly. Here is what has to be in the box.',
    pillar: 'creative-design',
    vertical: 'general',
    readingMinutes: 7,
    updatedAt: '2026-10-24',
    sections: [
      {
        id: 'the-test',
        heading: 'The test for a design package',
        body: [
          'A design package is finished when a competent fabricator can quote it, build it to, and be held to it — without asking a single question that would change the price. Until that is true, the project is a conversation with a price attached, and every unanswered question is a change order waiting to happen.',
        ],
      },
      {
        id: 'contents',
        heading: 'What has to be in it',
        body: [
          'Eight groups of documents. The list is deliberately boring: boring completeness is what protects the budget.',
        ],
        list: [
          'Scope and interface document — what is in, what is out, and how it meets the surroundings',
          'Dimensioned drawings and models — geometry, tolerances, fixings, and the parts that are site-specific',
          'Technical specification — materials, grades, finishes, coatings, and the standard each is bought against',
          'Engineering review — structural, electrical or control calculations, with the assumptions stated',
          'Standards and testing — which clause applies, and what evidence is expected',
          'Fixing and interfaces — how it attaches, what it attaches to, and who is responsible for the substrate',
          'Finish and appearance reference — colour, texture, gloss and the sample that defines them',
          'Maintenance and inspection notes — what is checked, how often, and by whom',
        ],
      },
      {
        id: 'what-is-not-a-package',
        heading: 'What is not a design package',
        body: [
          'Rendered imagery, mood boards and a general arrangement drawing are useful for deciding direction, and they are not procurable documents. A quotation priced against them is a guess, and the difference between the guess and the product is absorbed by somebody.',
          'The honest test: can two different manufacturers quote the same thing from the same package? If yes, the package is doing its job.',
        ],
        callout:
          'If a supplier can quote without asking questions, the package is complete. If they ask, you have found a gap before production, not after.',
      },
      {
        id: 'interface-risk',
        heading: 'The risk that is usually missed',
        body: [
          'The hardest part of most bespoke work is not the object; it is the interface between the object and everything around it. Structure, drainage, power, lighting, fixings into substrates that were surveyed months earlier, and the tolerance between something drawn to a millimetre and a building that was built to a millimetre.',
          'Interface risk is resolved in the documentation, or it is paid for on site.',
        ],
      },
    ],
    keyTakeaways: [
      'A package is complete when two manufacturers can quote it identically',
      'Eight document groups, all boring, all load-bearing',
      'Renderings decide direction; they cannot be priced',
      'Interface risk is a documentation problem, not a site problem',
    ],
    sources: [
      {
        label: 'Machinery Directive 2006/42/EC — technical documentation and conformity',
        url: 'https://eur-lex.europa.eu/eli/dir/2006/42/oj',
        accessed: '2026-10-24',
      },
      {
        label: 'General Product Safety Regulation (EU) 2023/988',
        url: 'https://eur-lex.europa.eu/eli/reg/2023/988/oj',
        accessed: '2026-10-24',
      },
    ],
    related: [
      'when-prototyping-is-worth-it',
      'briefing-a-contract-manufacturer',
      'quality-control-across-the-production-chain',
    ],
  },
{
    slug: 'when-prototyping-is-worth-it',
    title: 'When prototyping a custom installation is worth the cost',
    excerpt:
      'Prototyping pays for itself when the risk sits in a mechanism, a fit-up, a surface, a colour or a tolerance — things that are cheap to change while small and expensive to change once installed. It does not pay for pure form.',
    pillar: 'creative-design',
    vertical: 'general',
    readingMinutes: 6,
    updatedAt: '2026-10-24',
    sections: [
      {
        id: 'the-rule',
        heading: 'The rule',
        body: [
          'Prototype where the answer is uncertain and the change is expensive. That is the whole test. If you already know the answer, or if a change would be cheap later, the prototype is a cost without a return.',
        ],
      },
      {
        id: 'where-it-pays',
        heading: 'Where it pays',
        body: [
          'Five categories of uncertainty account for most of the value. Note that none of them is "does it look good" — that is what drawings and renders are for.',
        ],
        list: [
          'Mechanism — moving parts, pivots, wear points and what happens after two years of use',
          'Fit-up — the moment two manufactured parts meet, and whether the tolerance holds in the workshop, not on paper',
          'Surface and finish — colour, texture and gloss under real light, on the real material, at the real scale',
          'Tolerance against the site — an item that fits the drawing may not fit the building',
          'Load and safety behaviour — tested on a prototype rather than argued about in a meeting',
        ],
      },
      {
        id: 'kinds',
        heading: 'Three levels of prototype, in increasing cost',
        body: [
          'Most projects need the first or the second. The third is expensive and should be a deliberate decision with a named question attached to it.',
        ],
        table: {
          caption: 'Prototype levels',
          headers: ['Level', 'What it is', 'Typical use'],
          rows: [
            ['Visual sample', 'Material and finish sample at real scale', 'Colour, texture, gloss decisions'],
            ['Functional mock-up', 'One working element, not the whole item', 'Mechanism, fit-up and handling questions'],
            ['First article', 'The first production unit, inspected against the specification', 'Release of the production run'],
          ],
        },
      },
      {
        id: 'the-mistake',
        heading: 'The mistake that costs most',
        body: [
          'Prototyping the wrong thing. A beautiful sample of a decorative element proves nothing about the mechanism that actually fails. Before commissioning a prototype, write the question it is meant to answer. If nobody can name the question, it is not a prototype — it is a maquette, and it will be admired and then ignored.',
        ],
      },
    ],
    keyTakeaways: [
      'Prototype where the answer is uncertain and the change is expensive',
      'Five categories of uncertainty justify it; appearance does not',
      'Name the question before commissioning the prototype',
      'A first article is a release mechanism, not a marketing object',
    ],
    sources: [
      {
        label: 'Machinery Directive 2006/42/EC — safety and conformity requirements',
        url: 'https://eur-lex.europa.eu/eli/dir/2006/42/oj',
        accessed: '2026-10-24',
      },
    ],
    related: [
      'what-a-design-package-must-contain',
      'designing-for-hot-humid-and-coastal-environments',
      'quality-control-across-the-production-chain',
    ],
  },
{
    slug: 'designing-for-hot-humid-and-coastal-environments',
    title: 'Designing for hot, humid and coastal environments',
    excerpt:
      'Durability is a system, not a material choice. It depends on grade, coating system, joint detail, fixing compatibility and the maintenance regime the operator can actually sustain — and the most common failure in coastal sites is a fixing, not a structure.',
    pillar: 'creative-design',
    vertical: 'children',
    readingMinutes: 7,
    updatedAt: '2026-10-24',
    sections: [
      {
        id: 'system',
        heading: 'Durability is a system',
        body: [
          'When a structure in a coastal or high-humidity climate fails early, the cause is almost never the primary material. It is the interface: a stainless fixing in contact with aluminium, a sealed joint that trapped moisture, a coating applied over a surface that was not prepared, or a specification that assumed a maintenance regime the operator never intended to run.',
          'The five questions below decide the service life, and each of them is answered during design, not during production.',
        ],
        list: [
          'Grade — the alloy or polymer actually specified for the environment, not the generic default',
          'Coating system — the preparation, the coating, the film thickness, and the number of coats',
          'Joint detail — how water enters, how it leaves, and whether the joint can be inspected',
          'Fixing compatibility — galvanic pairs, dissimilar metals, and the isolation detail between them',
          'Maintenance reality — what the operator can genuinely inspect and replace, and how often',
        ],
      },
      {
        id: 'galvanic',
        heading: 'The failure nobody prices: galvanic corrosion',
        body: [
          'Two dissimilar metals in electrical contact, in the presence of moisture, corrode — and the rate depends on the pair and on the environment. Stainless fixings into aluminium, or steel components into a stainless structure, accelerate the corrosion of the less noble metal, often at the fixing points, where the damage is hidden until it is structural.',
          'The mitigations are standard practice and should appear in the specification: isolate dissimilar metals, use a compatible coating or a washer system, detail drainage so the joint dries, and specify the fixing material with the same seriousness as the structure.',
        ],
        callout:
          'On coastal sites, write the fixing schedule into the specification. If it is not named, it will be whatever was in the workshop.',
      },
      {
        id: 'hot-humid',
        heading: 'Heat, humidity and UV',
        body: [
          'High ambient temperature reduces the working life of elastomers — bearings, bushings, rollers, gaskets — because the material spends more of its life closer to its upper temperature limit. In practice, that means specifying components with a temperature rating well above the site maximum, and expecting visible polymers to need replacement on a schedule rather than on failure.',
          'Ultraviolet exposure is a separate attack on polymers, paints and sealants. Colour and gloss hold longer in a pigmented, high-UV system than in a clear-coated one. Where appearance matters at night — and it does in public space — that is a specification decision, not a maintenance decision.',
        ],
      },
      {
        id: 'operating',
        heading: 'The maintenance question that decides everything',
        body: [
          'Ask the operator what they will actually do, annually, with the resource they actually have. A stainless finish that needs annual polishing to stay presentable will not be polished; it will be left, and the asset will be judged on how it looks after two seasons. A specification that assumes an unreal maintenance regime is a promise the site will break quietly.',
          'This is why we design for inspection access: an item that cannot be inspected will not be maintained, and one that cannot be maintained will be replaced, not repaired.',
        ],
      },
    ],
    keyTakeaways: [
      'Durability fails at interfaces, not in the primary material',
      'Specify the fixing schedule; the workshop will otherwise choose',
      'Isolate dissimilar metals, and detail for drainage',
      'A maintenance regime nobody will run is a defect in the specification',
    ],
    sources: [
      {
        label: 'Galvanic corrosion',
        url: 'https://en.wikipedia.org/wiki/Galvanic_corrosion',
        accessed: '2026-10-24',
      },
      {
        label: 'ISO 13857 — safety of playground equipment, entrapment and impact',
        url: 'https://en.wikipedia.org/wiki/ISO_13857',
        accessed: '2026-10-24',
      },
    ],
    related: [
      'safety-standards-for-play-and-public-equipment',
      'what-a-design-package-must-contain',
      'shipping-installing-and-commissioning-on-site',
    ],
  },
{
    slug: 'lighting-design-for-public-space-installations',
    title: 'Lighting design for public-space installations that also work by day',
    excerpt:
      'For a public-space or tourism installation the night-time appearance is often the primary experience — and the asset is seen far more often by day. Lighting has to be designed, not added, and it has to be maintainable by the people who run the site.',
    pillar: 'creative-design',
    vertical: 'public-space',
    readingMinutes: 7,
    updatedAt: '2026-10-24',
    sections: [
      {
        id: 'two-experiences',
        heading: 'Two experiences, one asset',
        body: [
          'A public installation is judged at noon and at night, and those two judgements are made by different criteria. By day, the criteria are proportion, material, colour and how it sits in the landscape. By night, they are brightness, colour rendering, glare, and whether the thing looks intentional.',
          'Most night-time failures are daytime decisions: a form that reads badly in daylight becomes an awkward silhouette after dark, and lighting cannot rescue it.',
        ],
      },
      {
        id: 'design-decisions',
        heading: 'The decisions that matter',
        body: [
          'Lighting is part of the design brief, not a finishing trade. These five decisions belong with the concept, not with the contractor.',
        ],
        list: [
          'Purpose — accent, wash, ambience or interactive; a public space usually needs more than one',
          'Colour temperature and rendering — a warm white reads as hospitality, a cool white as civic; mixing them is a decision',
          'Glare and spill — what the light does to drivers, neighbours, and the site user at eye level',
          'Control and integration — whether the lighting responds to presence, time or events',
          'Maintenance access — how a fitting is changed without a cherry picker or a closure',
        ],
      },
      {
        id: 'daylight',
        heading: 'Making the daytime image work',
        body: [
          'The daylight image is set by mass, proportion and material, and lighting only modulates it. If the daytime composition is unresolved, the night-time result will look like an attempt to distract from the form.',
          'Two practical rules help. Keep the fittings visually subordinate to the object in daylight, so the installation reads as an object rather than as a lighting rig. And avoid a high-contrast night image that the daytime form does not support — the contrast has to be earned by the geometry.',
        ],
        callout:
          'A lighting design that cannot be maintained will be switched off within a year. Ask the operator how they will change a fitting before you specify it.',
      },
      {
        id: 'coordination',
        heading: 'Coordinating with everything else',
        body: [
          'Lighting is also an interface problem. It needs power at the right place, a control system somebody can operate, a structure that can carry the fittings without becoming a rack, and drainage that does not fill the fittings with water. All of that belongs in the design package, and all of it is cheaper to resolve on paper than on site.',
        ],
      },
    ],
    keyTakeaways: [
      'The asset is judged by day and by night, against different criteria',
      'Five decisions belong with the concept, not with the contractor',
      'Daylight composition sets the ceiling on the night-time image',
      'Specify how a fitting is changed, or it will not be',
    ],
    sources: [
      {
        label: 'Machinery Directive 2006/42/EC — electrical and control requirements',
        url: 'https://eur-lex.europa.eu/eli/dir/2006/42/oj',
        accessed: '2026-10-24',
      },
    ],
    related: [
      'planning-a-resort-leisure-programme',
      'what-a-design-package-must-contain',
      'choosing-agency-factory-or-delivery-partner',
    ],
  },
{
    slug: 'writing-a-brief-that-gets-a-useful-answer',
    title: 'How to write a brief that gets you a useful answer',
    excerpt:
      'A brief that states the objective, the audience, the fixed constraints and the success criteria produces quotes you can compare; a brief that lists features produces quotes you cannot. The difference is a page of writing, not a month of extra meetings.',
    pillar: 'strategy',
    vertical: 'general',
    readingMinutes: 7,
    updatedAt: '2026-10-24',
    sections: [
      {
        id: 'why-briefs-fail',
        heading: 'Why most briefs produce unusable quotes',
        body: [
          'Suppliers cannot quote against an ambition, so they quote against their own assumptions and then present the result as if it matched your brief. The usual causes are simple: the objective is implicit, the constraints are unstated, the drawings are from an earlier idea, and the word "or" appears where a decision was needed.',
          'The result is a set of quotations that differ in scope by a factor of several, and a comparison exercise that measures the difference in reading comprehension rather than the difference in product.',
        ],
      },
      {
        id: 'what-to-include',
        heading: 'What a brief needs to contain',
        body: [
          'Six things, in this order: the objective in one sentence; who the thing is for and what they will do with it; what is already fixed and cannot change; the site and operating constraints; the standards or regulations that apply; and what success looks like operationally — how it will be staffed, cleaned, inspected and paid for.',
        ],
        list: [
          'Objective — one sentence, written as an outcome rather than a feature',
          'Audience and use — who interacts with it, how often, and what they are doing',
          'Fixed constraints — dimensions, load, climate, opening hours, budget envelope',
          'Site facts — access, power, drainage, services, and whether the venue stays open',
          'Standards — the regulation that applies in the destination market',
          'Success — the operating reality you will live with after handover',
          'Attachments — drawings, site plans, brand guidelines, previous product data',
        ],
      },
      {
        id: 'the-comparison-test',
        heading: 'The test that makes quotations comparable',
        body: [
          'Before asking for a price, write down what you would consider a complete answer and what would be a partial one. Send both to every supplier. If the quotations differ by a large factor, the difference is almost always scope, not price — and you now have a written record of what was included.',
          'This is also why we publish what our own services do not cover. A supplier who states their limits in writing is giving you something comparable; a supplier who says everything is possible is asking you to discover the boundary later, at your cost.',
        ],
        callout:
          'The cheapest hour in a project is the one spent making the brief unambiguous. It removes more cost than any subsequent negotiation.',
      },
      {
        id: 'what-next',
        heading: 'What happens next',
        body: [
          'Once the brief is stable, the next decision is the delivery route: complete delivery, a client-assembled kit, or semi-finished modules. That choice depends on what your organisation already has, and it changes the cost more than any negotiation will.',
        ],
      },
    ],
    keyTakeaways: [
      'A brief states outcomes and constraints; a feature list produces incomparable quotes',
      'Six sections are enough: objective, audience, fixed constraints, site, standards, success',
      'Ask every supplier for the same scope definition, so differences are visible',
      'Stated limits are a commercial advantage, not a weakness',
    ],
    sources: [
      {
        label: 'General Product Safety Regulation (EU) 2023/988',
        url: 'https://eur-lex.europa.eu/eli/reg/2023/988/oj',
        accessed: '2026-10-24',
      },
      {
        label: 'Machinery Directive 2006/42/EC',
        url: 'https://eur-lex.europa.eu/eli/dir/2006/42/oj',
        accessed: '2026-10-24',
      },
    ],
    related: [
      'choosing-agency-factory-or-delivery-partner',
      'what-drives-the-cost-of-a-bespoke-installation',
      'briefing-a-contract-manufacturer',
    ],
  },
{
    slug: 'choosing-agency-factory-or-delivery-partner',
    title: 'Choosing between a design studio, a factory and a delivery partner',
    excerpt:
      'A design studio sells design, a factory sells production from a drawing you already have, and a delivery partner holds the brief across both. The right route depends on what your organisation already has — a good design team, a good site team, or neither.',
    pillar: 'strategy',
    vertical: 'general',
    readingMinutes: 8,
    updatedAt: '2026-10-24',
    sections: [
      {
        id: 'three-roles',
        heading: 'Three roles, easily confused',
        body: [
          'A design studio is paid for judgement and drawings. Its risk ends at the handover of a design package, and the gap between that package and the site becomes yours. A factory is paid for production, usually against a drawing you supply, and it is the right answer when the product is standard or the drawing is already production-ready.',
          'A delivery partner sits between the two and is accountable for the result. That accountability is only real if someone is willing to hold the specification, manage the production, and own the gap. Most of the value we add is in that third activity — and it is the activity that is usually missing from a contract.',
        ],
      },
      {
        id: 'decision-framework',
        heading: 'A decision framework',
        body: [
          'Work through these in order. The first answer that is "yes" tells you what kind of engagement you need.',
        ],
        list: [
          'Is the product standard and does a drawing already exist? — a factory is enough',
          'Is the design the whole problem, and do you have a delivery team? — a design studio plus a factory',
          'Does the project cross disciplines (design, engineering, production, logistics, installation)? — a delivery partner',
          'Can nobody on your side make the trade-off decisions? — a delivery partner, with decision authority',
          'Is the site live and the work must not interrupt it? — a delivery partner, for phasing',
        ],
      },
      {
        id: 'how-to-compare',
        heading: 'How to compare the quotations in front of you',
        body: [
          'Compare them on scope, not on headline price. Build a table with the same rows for every supplier: what is included, what is excluded, who holds each decision, what is inspected and when, what is delivered, who supports it afterwards, and what happens if it goes wrong.',
          'The row that predicts the outcome best is usually "who is accountable when something is wrong on site". An answer of "each party is responsible for its own part" is not a delivery model; it is the absence of one.',
        ],
        table: {
          caption: 'What to put in the comparison table',
          headers: ['Question to ask every supplier', 'Why it matters'],
          rows: [
            ['Is the scope of supply defined in writing?', 'Without it, prices are not comparable'],
            ['Who holds the technical specification?', 'Someone must own it, or the drawing and the product diverge'],
            ['What is inspected, and at which stages?', 'End-of-line inspection finds problems late'],
            ['Who handles site installation and commissioning?', 'The hardest part is usually the last mile'],
            ['What happens if it does not match the specification?', 'The remedy tells you who is actually accountable'],
            ['Who supports the asset after handover?', 'A live asset needs a reachable party'],
          ],
        },
      },
      {
        id: 'what-we-are-not',
        heading: 'What this means when you are talking to us',
        body: [
          'AQUASEE is the third kind. We do not own factories, we do not sell standard products, and we do not hand over a drawing and walk away. We select and brief partners, hold the specification, manage production and installation, and remain answerable for the result.',
          'That also means we are not the right answer for a standard product at catalogue pricing, and we will say so. A factory is cheaper and faster for a standard item with a finished drawing, and no amount of good service changes that.',
        ],
      },
    ],
    keyTakeaways: [
      'Design studios, factories and delivery partners carry different risks',
      'The first "yes" in the framework usually settles the question',
      'Compare scope in a table, never headline price',
      'Ask who is accountable when something is wrong on site',
    ],
    sources: [
      {
        label: 'Machinery Directive 2006/42/EC — supply chain obligations',
        url: 'https://eur-lex.europa.eu/eli/dir/2006/42/oj',
        accessed: '2026-10-24',
      },
      {
        label: 'General Product Safety Regulation (EU) 2023/988',
        url: 'https://eur-lex.europa.eu/eli/reg/2023/988/oj',
        accessed: '2026-10-24',
      },
    ],
    related: [
      'writing-a-brief-that-gets-a-useful-answer',
      'quality-control-across-the-production-chain',
      'three-delivery-models-explained',
    ],
  },
{
    slug: 'what-drives-the-cost-of-a-bespoke-installation',
    title: 'What actually drives the cost of a bespoke installation',
    excerpt:
      'The same description can differ by a factor of several depending on material, tooling, geometry and site conditions. Rather than publish a price range we cannot stand behind, here are the factors that decide the number — and how to make sure your quotation is measuring the same thing as ours.',
    pillar: 'strategy',
    vertical: 'general',
    readingMinutes: 7,
    updatedAt: '2026-10-24',
    sections: [
      {
        id: 'why-no-ranges',
        heading: 'Why we do not publish price ranges',
        body: [
          'Because the range would be so wide as to be useless, and a wrong number is worse than no number. A play structure can vary by a factor of ten between a catalogue-adapted platform and a fully bespoke piece, and the description in both cases can be identical. We would rather give you the factors and let you see where your project sits.',
        ],
      },
      {
        id: 'drivers',
        heading: 'The eight factors that move the number',
        body: [
          'Read your own quotation against this list. Any factor you cannot locate in the quotation is a factor you cannot compare.',
        ],
        list: [
          'Bespoke or adapted — a proven platform adapted is a different product from a drawn-from-nothing item',
          'Material and finish — grade, coating system, film thickness, and the finish standard you are buying into',
          'Tooling — every new mould, jig or fabrication method is a one-off cost that a repeat order would not carry',
          'Engineering hours — structural, electrical and control design, plus the drawings that make it buildable',
          'Prototyping and testing — mock-ups, load and safety testing, and the cost of changing your mind cheaply',
          'Logistics — dimensions, weight, packaging, and whether it travels as one piece or several',
          'Site conditions — access, working hours, opening hours, and installation done at night',
          'Commissioning and support — training, documentation, and the length of the support window you buy',
        ],
      },
      {
        id: 'reading-a-quotation',
        heading: 'How to read a quotation you do not understand',
        body: [
          'Ask for the assumption list. Every serious quotation is built on assumptions about material, quantity, tolerance, finish standard, access and programme, and a good one states them. If they are missing, the number is not a price — it is an intention.',
          'Then ask what is excluded. Exclusions are where the risk lives: freight, installation, commissioning, site permits, waste removal, power supply, making good, and any survey or design work not mentioned.',
        ],
        table: {
          caption: 'What to ask for before comparing prices',
          headers: ['Ask for', 'Because'],
          rows: [
            ['The assumption list', 'Every number rests on assumptions you cannot see otherwise'],
            ['The exclusion list', 'The gap between quotations is usually exclusions, not margin'],
            ['The specification version quoted against', 'Two quotes can price different products'],
            ['The inspection regime', 'End-of-line inspection moves risk to you'],
            ['The payment milestones', 'Money should follow evidence, not dates'],
          ],
        },
      },
      {
        id: 'value-of-open-book',
        heading: 'Why we offer an open-book breakdown',
        body: [
          'On larger engagements we can show the cost composition — tooling, materials, engineering hours, fabrication, logistics, site work, support — so that you can see which parts of the scope are worth changing if the budget moves. It is more work for us and it is the reason clients stay for the next project.',
        ],
      },
    ],
    keyTakeaways: [
      'Eight factors decide the price; a written description decides none of them',
      'No assumption list means the number is not a price',
      'Exclusions are where two quotations actually differ',
      'An open-book breakdown lets you change scope with knowledge',
    ],
    sources: [
      {
        label: 'Harmonized System — customs classification reference',
        url: 'https://en.wikipedia.org/wiki/Harmonized_System',
        accessed: '2026-10-24',
      },
      {
        label: 'Incoterms — delivery terms and cost allocation',
        url: 'https://en.wikipedia.org/wiki/Incoterms',
        accessed: '2026-10-24',
      },
    ],
    related: [
      'choosing-agency-factory-or-delivery-partner',
      'planning-a-resort-leisure-programme',
      'three-delivery-models-explained',
    ],
  },
  {
    slug: 'planning-a-resort-leisure-programme',
    title: 'Planning a resort leisure or themed attraction programme',
    excerpt:
      'Resort and theme projects fail on programme long before they fail on design. The sequence below — objective, feasibility, offer structure, phasing, then procurement — is what keeps a live venue, an opening date and a budget pointing at the same thing.',
    pillar: 'strategy',
    vertical: 'tourism',
    readingMinutes: 8,
    updatedAt: '2026-10-24',
    sections: [
      {
        id: 'the-failure-mode',
        heading: 'How these projects usually go wrong',
        body: [
          'The pattern is consistent. The offer is designed first and costed afterwards. Construction is planned around the construction programme rather than around the operating calendar. The procurement route is chosen when quotes arrive, so the cheapest compliant offer sets the design. By the time the cost is known, the opening date has already been announced to the market.',
          'None of this is a design failure. It is a sequencing failure, and it is decided in the first four weeks.',
        ],
      },
      {
        id: 'sequence',
        heading: 'A sequence that survives contact with reality',
        body: [
          'Five moves, in order. Each one produces a decision the next one depends on, which is the whole point.',
        ],
        list: [
          'Objective — the commercial and operational reason the asset exists, in one sentence, agreed by the people who own the outcome',
          'Feasibility — site, climate, logistics, approvals, utilities and programme constraints, tested against the objective',
          'Offer structure — what the guest actually does, for how long, at what times, and what it costs to run',
          'Phasing — which parts open first, what the venue can tolerate, and what has to be complete before opening day',
          'Procurement — partner selection and contracting, driven by the specification rather than by the quotations',
        ],
      },
      {
        id: 'operating-reality',
        heading: 'The operating reality that decides the programme',
        body: [
          'A resort is not a construction site with a lobby. Installation is often scheduled at night, in short windows, between two booking seasons, with noise limits and a fully operating kitchen and pool next door. That changes the method, the crew size and the sequence — and it is why the same design can be affordable in one programme and impossible in another.',
          'Build the operating calendar into the programme before you commit to the opening date, not after.',
        ],
        table: {
          caption: 'Constraints to confirm before design development',
          headers: ['Constraint', 'Why it decides the programme'],
          rows: [
            ['Live operation windows', 'Determines when installation can happen at all'],
            ['Noise and access restrictions', 'Changes method, sequencing and crew size'],
            ['Guest safety distance', 'Removes space near pools, dining and circulation'],
            ['Local approval lead times', 'Can exceed fabrication time'],
            ['Maintenance access and closure windows', 'Affects buildability and running cost'],
            ['Seasonality of the opening', 'Determines the order of phases'],
          ],
        },
      },
      {
        id: 'handover',
        heading: 'Handover is a design decision',
        body: [
          'The most common failure in resort leisure projects is not the opening; it is the first year. The asset is beautiful and the operating team cannot clean it, inspect it, or take it out of service without closing the whole facility.',
          'Every design decision should be tested against the questions the operating team will ask on day one: how is this cleaned, how is it inspected, what is replaced and how often, and what do we close when it needs work.',
        ],
      },
    ],
    keyTakeaways: [
      'Resort projects fail on programme and sequencing, not on design',
      'Objective, feasibility, offer structure, phasing, then procurement — in that order',
      'The operating calendar constrains the programme as much as the budget does',
      'Design for the first year of operation, not for the opening photograph',
    ],
    sources: [
      {
        label: 'General Product Safety Regulation (EU) 2023/988',
        url: 'https://eur-lex.europa.eu/eli/reg/2023/988/oj',
        accessed: '2026-10-24',
      },
    ],
    related: [
      'writing-a-brief-that-gets-a-useful-answer',
      'what-drives-the-cost-of-a-bespoke-installation',
      'designing-for-hot-humid-and-coastal-environments',
    ],
  },
  {
    slug: 'briefing-a-contract-manufacturer',
    title: 'Briefing a contract manufacturer: the questions that prevent rework',
    excerpt:
      'Most factory rework is caused by information that never arrived, not by poor workmanship. A manufacturing brief that answers twelve specific questions removes the majority of the causes before the first sheet is cut.',
    pillar: 'supply-chain',
    vertical: 'general',
    readingMinutes: 7,
    updatedAt: '2026-10-24',
    sections: [
      {
        id: 'why-rework-happens',
        heading: 'Why rework happens',
        body: [
          'A factory is not guessing. It is working from the information it was given, and when that information is incomplete the gap is filled with an assumption. The assumption is reasonable, it is made in good faith, and it is wrong. By the time anyone notices, the material is cut.',
          'So the brief is not a formality. It is the mechanism that prevents the cost of a mistake being paid twice.',
        ],
      },
      {
        id: 'the-questions',
        heading: 'The twelve questions to answer',
        body: [
          'Every one of these has a cheap answer and an expensive default. If the brief cannot answer them, the factory will.',
        ],
        list: [
          'Which dimension is controlling — the overall size, or a detail that must fit?',
          'What tolerance applies to which feature, and how is it measured?',
          'Which material grade, and what evidence proves it?',
          'What finish, to what standard, and approved by whom?',
          'Where do the fixings attach, and what substrate is behind them?',
          'Is the item one piece or several, and where is the joint?',
          'What is the maximum weight and the maximum dimension of any single piece?',
          'How is it packed, and who supplies the packaging?',
          'What must be marked, labelled or serialised?',
          'Which documents must accompany the shipment?',
          'What is the inspection regime, and who witnesses it?',
          'What is the delivery date, and what happens to the programme if it slips?',
        ],
      },
      {
        id: 'the-three-that-matter-most',
        heading: 'The three that matter most',
        body: [
          'If the budget only allows three answers, use these.',
        ],
        table: {
          caption: 'Highest-return questions',
          headers: ['Question', 'What goes wrong without it'],
          rows: [
            ['Which dimension is controlling', 'Everything is made to the wrong size and it still fits — barely'],
            ['What tolerance applies where', 'Parts arrive that cannot be assembled without rework'],
            ['Which finish, to what standard', 'The item is correct and rejected on appearance'],
          ],
        },
      },
      {
        id: 'samples',
        heading: 'The sample that settles most arguments',
        body: [
          'A physical sample at real scale — not a photograph, not a 3D render — settles finish, colour, texture and perceived weight in a way no document can. For items with a high visual or tactile requirement, it is the cheapest way to prevent the most expensive disagreement.',
        ],
      },
    ],
    keyTakeaways: [
      'Rework is usually missing information, not poor workmanship',
      'Twelve questions cover most causes; three cover the most',
      'Controlling dimension, tolerance and finish standard come first',
      'A real-scale sample settles appearance disputes before production',
    ],
    sources: [
      {
        label: 'General Product Safety Regulation (EU) 2023/988 — traceability and information',
        url: 'https://eur-lex.europa.eu/eli/reg/2023/988/oj',
        accessed: '2026-10-24',
      },
    ],
    related: [
      'quality-control-across-the-production-chain',
      'what-a-design-package-must-contain',
      'shipping-installing-and-commissioning-on-site',
    ],
  },
  {
    slug: 'quality-control-across-the-production-chain',
    title: 'Quality control across the production chain: what to check, and when',
    excerpt:
      'End-of-line inspection finds problems after they have been paid for. Inspection at agreed milestones — material, first article, in process, pre-shipment, site acceptance — finds them while they are still cheap to fix.',
    pillar: 'supply-chain',
    vertical: 'general',
    readingMinutes: 7,
    updatedAt: '2026-10-24',
    sections: [
      {
        id: 'the-principle',
        heading: 'The principle',
        body: [
          'Quality is not a stage at the end of production; it is a sequence of checks placed where a defect can still be corrected cheaply. The later the check, the more expensive the correction — and the more likely it is that the correction is a rework rather than a repair.',
          'This is why the inspection regime is written into the contract at the same time as the specification, not after the first problem appears.',
        ],
      },
      {
        id: 'the-stages',
        heading: 'Five stages',
        body: [
          'Each stage answers a different question, and each one has a document.',
        ],
        list: [
          'Material and preparation — is the grade right, and was the surface prepared as specified?',
          'First article — does the first production unit match the specification, in a way the main run can repeat?',
          'In process — is the work still on the approved method, and are the changes controlled?',
          'Pre-shipment — is the complete set correct, packed, protected and documented?',
          'Site acceptance — does it match the specification in place, under real conditions?',
        ],
      },
      {
        id: 'first-article',
        heading: 'Why the first article is the most important check',
        body: [
          'The first article is not a sample; it is the first unit of production, inspected against the specification before the run is released. It answers the only question that matters at that point: is the process capable of making the rest?',
          'A first article that passes without a difficult conversation about finish, fit or tolerance is the strongest evidence available that the remaining units will be right. Skipping it to save a week is the most expensive shortcut in production.',
        ],
        callout:
          'Inspection records are not paperwork for their own sake. They are the evidence that makes a later conversation about a defect a factual one.',
      },
      {
        id: 'records',
        heading: 'What the records must contain',
        body: [
          'The handover pack should contain the inspection records, the material certificates, the approved drawings and the revision history, and the change log. Together they answer the question that comes up in year two: was this the way it was supposed to be built?',
          'Without them, every warranty conversation becomes an argument about memory.',
        ],
      },
    ],
    keyTakeaways: [
      'Inspect where a defect is still cheap to correct',
      'Five stages: material, first article, in process, pre-shipment, site acceptance',
      'The first article is the check that proves the process is capable',
      'Records turn a warranty conversation into a factual one',
    ],
    sources: [
      {
        label: 'General Product Safety Regulation (EU) 2023/988 — documentation and traceability',
        url: 'https://eur-lex.europa.eu/eli/reg/2023/988/oj',
        accessed: '2026-10-24',
      },
      {
        label: 'Machinery Directive 2006/42/EC — conformity assessment',
        url: 'https://eur-lex.europa.eu/eli/dir/2006/42/oj',
        accessed: '2026-10-24',
      },
    ],
    related: [
      'briefing-a-contract-manufacturer',
      'shipping-installing-and-commissioning-on-site',
      'when-prototyping-is-worth-it',
    ],
  },
  {
    slug: 'three-delivery-models-explained',
    title: 'Three delivery models: complete delivery, client-assembled kit, semi-finished modules',
    excerpt:
      'The same project can be delivered three ways, and the choice changes the price, the risk and the amount of work your own organisation has to do. It is the decision that moves the number more than any negotiation will.',
    pillar: 'supply-chain',
    vertical: 'general',
    readingMinutes: 6,
    updatedAt: '2026-10-24',
    sections: [
      {
        id: 'the-choice',
        heading: 'The choice, and why it matters',
        body: [
          'AQUASEE does not manufacture. That fact creates a question every client has to answer: how much of the delivery do they want to own? Three models cover almost every case, and they differ far more in risk allocation than in the headline price.',
        ],
      },
      {
        id: 'the-three',
        heading: 'The three models',
        body: [
          'Each model is a different answer to the same question: where does the work happen, and who carries the risk of it going wrong?',
        ],
        table: {
          caption: 'Delivery models',
          headers: ['Model', 'Who installs', 'Best for', 'Main trade-off'],
          rows: [
            [
              'Complete delivery',
              'We do',
              'Owners and operators who want one accountable party',
              'Highest single price; ask for an open-book breakdown if unit costs matter',
            ],
            [
              'Client-assembled kit',
              'Your team',
              'Clients with capable site labour',
              'Lower cost, but assembly quality depends on the team you assign',
            ],
            [
              'Semi-finished modules',
              'Jointly, with us on the heavy work',
              'Oversized, site-constrained or internationally shipped items',
              'Best for complex geometry; needs the most careful planning early',
            ],
          ],
        },
      },
      {
        id: 'choosing',
        heading: 'How to choose',
        body: [
          'The decision follows from what your organisation already has, not from the price difference. If you have no experienced site team, the kit model is not a saving — it is a risk you have not priced, because the rework lands on your labour and your opening date.',
          'If your site team is strong but your project is oversized or crossing borders, modules give you the workshop finish without the workshop logistics.',
          'And if the value of the engagement is that you do not have to manage a supply chain at all, complete delivery is usually the cheapest option once the risk is counted.',
        ],
        callout:
          'Ask what your organisation is good at doing, then let the model follow. The model that matches your strength is nearly always the cheaper one.',
      },
      {
        id: 'changing',
        heading: 'Changing model later is expensive',
        body: [
          'The delivery model is decided early because it changes the design, the packaging, the documentation and the inspection regime. A project that starts as complete delivery and ends as a client-assembled kit has lost the documentation and the supervision that made it safe.',
        ],
      },
    ],
    keyTakeaways: [
      'Three models, one question: how much of the delivery do you own?',
      'Choose from your organisation’s strength, not from the price difference',
      'A kit model without capable site labour is an unpriced risk',
      'The model is decided early because it changes everything downstream',
    ],
    sources: [
      {
        label: 'Incoterms — delivery terms and cost allocation',
        url: 'https://en.wikipedia.org/wiki/Incoterms',
        accessed: '2026-10-24',
      },
    ],
    related: [
      'what-drives-the-cost-of-a-bespoke-installation',
      'shipping-installing-and-commissioning-on-site',
      'choosing-agency-factory-or-delivery-partner',
    ],
  },
  {
    slug: 'safety-standards-for-play-and-public-equipment',
    title: 'The safety standards you should write into a play or public-space specification',
    excerpt:
      'EN 1176, ASTM F1487 and ISO 13857 are the standards most buyers meet in a specification without knowing exactly what they require. This is what each one covers, how they relate, and what to ask a supplier for as evidence.',
    pillar: 'supply-chain',
    vertical: 'children',
    readingMinutes: 8,
    updatedAt: '2026-10-24',
    sections: [
      {
        id: 'which-standard',
        heading: 'Which standard applies',
        body: [
          'The applicable standard follows the market where the equipment operates, not the market where it is bought. EN 1176 is the European playground safety series and is the usual reference in Europe, the Gulf and much of Asia. ASTM F1487 and ASTM F1951 are the North American equivalents for playground equipment and for public play areas respectively. ISO 13857 covers entrapment and impact-related safety in play areas, and is frequently referenced alongside EN 1176.',
          'For public-space installations and interactive features, local building regulations, accessibility requirements, fire classification and electrical safety apply as well — and they are not optional because the item is "just art".',
        ],
      },
      {
        id: 'what-they-cover',
        heading: 'What they actually cover',
        body: [
          'Three families of requirement run through all of them.',
        ],
        list: [
          'Fall height and impact — the height from which a child can fall, and the surfacing needed to absorb it',
          'Entrapment and protrusions — openings that can trap a head or a limb, and sharp or projecting elements',
          'Safety-critical components — anchors, chains, connectors, and the parts that fail under load',
        ],
      },
      {
        id: 'what-to-ask',
        heading: 'What to ask a supplier for',
        body: [
          'The question is not "are you compliant" but "against which clause, and where is the evidence". A supplier who cannot name the clause has not tested the product against it.',
        ],
        list: [
          'The specific clauses the product was tested against, not a general claim of compliance',
          'The test report or certificate, with the laboratory and the date',
          'The surfacing specification that makes the installation compliant, including the fall-height calculation',
          'The anchoring and foundation detail, which is part of the installation, not an accessory',
          'The inspection regime that keeps it compliant after handover, and who performs it',
        ],
        callout:
          'Compliance belongs to the installed asset, not to the product in the box. The surfacing, the anchoring and the layout decide whether the safety case holds.',
      },
      {
        id: 'the-installation',
        heading: 'The installation is part of the standard',
        body: [
          'A compliant product installed on the wrong surfacing, or with the wrong anchoring, or with a layout that puts a high element next to a hard edge, is not a compliant installation. This is why the specification has to cover the whole site, and why the handover pack has to include the layout, the surfacing specification and the inspection regime.',
        ],
      },
    ],
    keyTakeaways: [
      'The applicable standard follows the market of operation, not the market of purchase',
      'Three requirement families: fall height and impact, entrapment, safety-critical components',
      'Ask for clause-level evidence, not a claim of compliance',
      'Compliance belongs to the installed asset — surfacing, anchoring and layout included',
    ],
    sources: [
      {
        label: 'EN 1176 — playground safety standards',
        url: 'https://en.wikipedia.org/wiki/EN_1176',
        accessed: '2026-10-24',
      },
      {
        label: 'ASTM F1487 — standard specification for playground equipment',
        url: 'https://en.wikipedia.org/wiki/ASTM_F1487',
        accessed: '2026-10-24',
      },
      {
        label: 'ISO 13857 — entrapment and impact safety in play areas',
        url: 'https://en.wikipedia.org/wiki/ISO_13857',
        accessed: '2026-10-24',
      },
      {
        label: '2010 ADA Standards for Accessible Design',
        url: 'https://www.ada.gov/law-and-regs/design-standards/2010-stds/',
        accessed: '2026-10-24',
      },
    ],
    related: [
      'designing-for-hot-humid-and-coastal-environments',
      'quality-control-across-the-production-chain',
      'what-a-design-package-must-contain',
    ],
  },

];
