export type ProcessStep = {
  index: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
};

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Brief',
    duration: 'Typically 1–2 weeks',
    description:
      'We take on the project as described and then interrogate it. What is the objective, who is the audience, what has already been decided, what is genuinely flexible, and what does success look like in operational terms.',
    deliverables: ['Agreed objectives', 'Constraints register', 'Indicative budget and programme frame'],
  },
  {
    index: '02',
    title: 'Strategy',
    duration: '2–4 weeks',
    description:
      'The project is framed: an organising idea, a prioritised scope, a realistic cost plan and a clear decision sequence. Complex briefs get reduced to the few things that actually determine the outcome.',
    deliverables: ['Concept framework', 'Scope matrix', 'Cost plan with assumptions'],
  },
  {
    index: '03',
    title: 'Design & development',
    duration: '4–10 weeks',
    description:
      'Design is developed in parallel with engineering, cost and manufacturability. The parts most likely to cause trouble are modelled, prototyped or tested first, while they are still cheap to change.',
    deliverables: ['Design drawings and models', 'Visualisations', 'Technical specification', 'Prototypes where required'],
  },
  {
    index: '04',
    title: 'Sourcing & contracting',
    duration: '3–6 weeks',
    description:
      'Partners are selected against the actual requirement — capability, capacity, communication and record of comparable work — then quoted on equal terms and contracted with clear specification and programme obligations.',
    deliverables: ['Qualified shortlist', 'Comparative analysis', 'Contracts and production schedule'],
  },
  {
    index: '05',
    title: 'Production & control',
    duration: 'Varies by scope',
    description:
      'Production is tracked against a single schedule, with in-process inspection at agreed milestones. Issues are escalated early, and specification changes are handled as controlled changes rather than drift.',
    deliverables: ['Progress reporting', 'Inspection records', 'Approved change log'],
  },
  {
    index: '06',
    title: 'Delivery & handover',
    duration: '2–8 weeks',
    description:
      'Shipping, installation and commissioning are planned around the realities of the site — access, operating hours, sequencing and local labour. The project closes with documentation, training where needed, and a support window.',
    deliverables: ['Delivery and installation records', 'Commissioning sign-off', 'Handover and maintenance documentation'],
  },
];
