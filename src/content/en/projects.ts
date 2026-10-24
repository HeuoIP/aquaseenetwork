import type { StudyVisualData } from '@/components/art/StudyVisual';

/**
 * Capability studies.
 *
 * IMPORTANT: AQUASEE has not authorised publication of completed client
 * projects, and none are presented here. Every entry is an illustrative
 * capability study, clearly labelled as such in the interface. When verified
 * project photography and references become available, add them here with
 * `disclosure: 'Completed project'` and real attribution.
 *
 * The visuals are generated concept renders. They communicate design intent for
 * a kind of engagement; they are never photographs of delivered work.
 */
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
  visual: StudyVisualData;
  featured?: boolean;
};

export const capabilityStudies: ProjectStudy[] = [
  {
    slug: 'resort-arrival-sequence',
    title: 'Resort arrival sequence & lobby installation',
    discipline: 'Hospitality',
    category: 'Spatial design, bespoke fabrication, installation',
    scale: 'Arrival sequence and lobby',
    summary:
      'Concept work on a hotel arrival experience, moving from the forecourt through to the lobby: a spatial and material concept developed alongside a bespoke sculptural installation, specified for fabrication by qualified metal and stone partners and delivered in installation phases that avoid peak operation.',
    scope: [
      'Arrival sequence concept and material narrative',
      'Bespoke installation design and engineering review',
      'Lighting and night-time appearance study',
      'Fabrication packaging and transport planning',
      'Phased installation around live operation',
    ],
    outcome:
      'An arrival experience that is coherent end to end, with a single specification that the fabricator can build from without reinterpretation.',
    disclosure: 'Concept render — generated illustration, not a completed project',
    visual: {
      kind: 'image',
      src: '/images/study-resort-arrival.webp',
      alt: 'Concept render of a resort arrival courtyard at dusk, with timber and glass pavilions, a polished metal sculpture and a reflecting water basin.',
    },
    featured: true,
  },
  {
    slug: 'destination-water-play-environment',
    title: 'Destination water-play environment',
    discipline: 'Resort & leisure',
    category: 'Experience design, custom equipment, production delivery',
    scale: 'Resort-scale guest facility',
    summary:
      'A full design and delivery concept for an interactive water-play environment: a structured concept developed with landscape and engineering partners, custom play elements designed for a hot-climate resort context, and a production plan covering fabrication, testing and phased site installation.',
    scope: [
      'Concept framing and experience narrative',
      'Spatial layout and level design',
      'Custom play element design and prototyping',
      'Materials, drainage and maintenance access',
      'Production sequencing and site phasing',
    ],
    outcome:
      'A single coordinated package — design, specification, supplier structure and installation logic — rather than separate documents to be reconciled later.',
    disclosure: 'Concept render — generated illustration, not a completed project',
    visual: {
      kind: 'image',
      src: '/images/study-water-play.webp',
      alt: 'Concept aerial render of a tropical resort with turquoise lagoons, low-rise pavilions and a dedicated water-play zone.',
    },
    featured: true,
  },
  {
    slug: 'custom-leisure-equipment',
    title: 'Custom play & leisure equipment programme',
    discipline: 'Leisure & recreation',
    category: 'Industrial design, prototyping, production',
    scale: 'Multi-element equipment family',
    summary:
      'An equipment family developed for a leisure developer: a small number of coherent, distinctive elements designed as a system, prototyped to validate mechanism and finish, then taken to production through a qualified manufacturing partner with staged quality inspection.',
    scope: [
      'Equipment family and design language',
      'Mechanism and safety engineering review',
      'Prototype and load testing',
      'Production documentation and finish specification',
      'In-process quality control and handover',
    ],
    outcome:
      'A manufacturable system that reads as one idea, rather than a collection of unrelated products.',
    disclosure: 'Concept render — generated illustration, not a completed project',
    visual: {
      kind: 'image',
      src: '/images/study-play-equipment.webp',
      alt: 'Concept render of a family of bespoke play elements — a timber climbing tower, a stainless tube slide and a spinning platform — in a landscaped park.',
    },
    featured: true,
  },
  {
    slug: 'interactive-installation',
    title: 'Interactive installation for a public space',
    discipline: 'Culture & public realm',
    category: 'Installation design, engineering coordination, delivery',
    scale: 'Permanent site-specific installation',
    summary:
      'A concept for a permanent interactive installation in a public or hospitality context: an experience concept developed alongside structural and electrical engineers, with an engineered control and maintenance strategy and a supply chain built for a long service life in a public environment.',
    scope: [
      'Experience concept and interaction design',
      'Structural and electrical coordination',
      'Control system and maintenance strategy',
      'Specialist subcontractor selection',
      'Commissioning and handover documentation',
    ],
    outcome:
      'An installation designed around the reality of being operated, cleaned, repaired and inspected for years.',
    disclosure: 'Concept render — generated illustration, not a completed project',
    visual: {
      kind: 'image',
      src: '/images/study-installation.webp',
      alt: 'Concept render of a suspended array of luminous sculptural elements and rings of light above a public plaza at night.',
    },
  },
  {
    slug: 'landscape-integration',
    title: 'Landscape and site integration study',
    discipline: 'Landscape & masterplanning',
    category: 'Interface design, technical coordination',
    scale: 'Masterplan interface',
    summary:
      'A study focused on the seam between a masterplan and the custom elements within it: interface levels, service routes, access for maintenance, drainage and lighting, resolved early enough that landscape, architecture and delivery teams can build from one coordinated set of assumptions.',
    scope: [
      'Interface and level coordination',
      'Service routing and access planning',
      'Drainage and lighting integration',
      'Maintenance access review',
      'Cross-discipline technical alignment',
    ],
    outcome:
      'Fewer surprises during installation, because the difficult interfaces were resolved on paper.',
    disclosure: 'Concept render — generated illustration, not a completed project',
    visual: {
      kind: 'image',
      src: '/images/study-landscape.webp',
      alt: 'Concept render of a landscaped public realm at dusk with a sunken garden, linear water channel, stepped timber terraces and a steel-and-glass canopy.',
    },
  },
  {
    slug: 'thematic-fabrication',
    title: 'Thematic environment fabrication scope',
    discipline: 'Themed attractions',
    category: 'Set design, fabrication management, logistics',
    scale: 'Multi-element themed set',
    summary:
      'A fabrication scope for a themed environment developed for a design or production partner: set elements designed for practical construction, materials and finishes selected for durability and cost, and a production plan built around fragmented manufacturing and consolidated shipping.',
    scope: [
      'Set element design and construction logic',
      'Finish and durability selection',
      'Fragmented production scheduling',
      'Consolidation, packing and freight planning',
      'Site installation sequencing',
    ],
    outcome:
      'A scope a fabrication partner can price accurately and build consistently.',
    disclosure: 'Concept render — generated illustration, not a completed project',
    visual: {
      kind: 'image',
      src: '/images/study-thematic.webp',
      alt: 'Concept render of a themed environment in fabrication — sculpted rockwork forms, ribbed panels and finish samples on steel frames in a workshop.',
    },
  },
];

export const disclosureNote =
  'Each visual below is a generated concept render produced to communicate design intent for that kind of engagement. They are not photographs of completed AQUASEE projects, and no client work is represented here. Project imagery, names and references will be published once they are authorised.';
