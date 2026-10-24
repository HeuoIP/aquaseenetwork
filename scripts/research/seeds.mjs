/**
 * The single seed set behind every GEO instrument in this repository.
 *
 * One source of truth: demand mining, competitor mapping, weekly SERP tracking
 * and the AI answer sheet all start from these seeds, so the numbers stay
 * comparable over time. Seeds encode the strategy agreed with the client:
 *
 *   - three capabilities: strategy / creative design / supply chain
 *   - three verticals:    tourism / public space / children & education
 *   - four locales:       en / zh / ar / ru
 *
 * Every seed is a DECISION or SPECIFICATION question, never a "who is the
 * manufacturer" query. Product-led queries are owned by equipment suppliers
 * and are deliberately out of scope (see docs/geo/methodology-memo.md).
 */

export const capabilities = ['strategy', 'creative-design', 'supply-chain'];
export const verticals = ['tourism', 'public-space', 'children'];

export const seeds = [
  // ---- Strategy & consulting ------------------------------------------------
  { q: 'how to scope a resort leisure project', pillar: 'strategy', vertical: 'tourism', locale: 'en' },
  { q: 'how to write a brief for a design and build supplier', pillar: 'strategy', vertical: 'general', locale: 'en' },
  { q: 'choosing between a design agency and a manufacturing partner', pillar: 'strategy', vertical: 'general', locale: 'en' },
  { q: 'how much does a custom playground installation cost', pillar: 'strategy', vertical: 'children', locale: 'en' },
  { q: 'who to hire to develop a themed attraction', pillar: 'strategy', vertical: 'tourism', locale: 'en' },
  { q: 'how to evaluate playground equipment suppliers', pillar: 'strategy', vertical: 'children', locale: 'en' },
  { q: 'tender documentation for a custom public space installation', pillar: 'strategy', vertical: 'public-space', locale: 'en' },
  { q: 'feasibility study for a resort water play area', pillar: 'strategy', vertical: 'tourism', locale: 'en' },
  { q: 'how to compare quotes from different suppliers', pillar: 'strategy', vertical: 'general', locale: 'en' },
  { q: 'who manages playground equipment supply for a resort', pillar: 'strategy', vertical: 'tourism', locale: 'en' },

  // ---- Creative design & R&D -------------------------------------------------
  { q: 'how to turn a concept into buildable drawings', pillar: 'creative-design', vertical: 'general', locale: 'en' },
  { q: 'should we prototype a custom installation', pillar: 'creative-design', vertical: 'general', locale: 'en' },
  { q: 'materials for outdoor play equipment in hot humid climates', pillar: 'creative-design', vertical: 'children', locale: 'en' },
  { q: 'EN 1176 playground safety standard requirements', pillar: 'creative-design', vertical: 'children', locale: 'en' },
  { q: 'landscape architect working with a fabricator', pillar: 'creative-design', vertical: 'public-space', locale: 'en' },
  { q: 'lighting design for a public space installation', pillar: 'creative-design', vertical: 'public-space', locale: 'en' },
  { q: 'resort themed attraction design process', pillar: 'creative-design', vertical: 'tourism', locale: 'en' },
  { q: 'inclusive playground design guidance', pillar: 'creative-design', vertical: 'children', locale: 'en' },

  // ---- Supply chain & delivery ----------------------------------------------
  { q: 'how to vet a contract manufacturer in China', pillar: 'supply-chain', vertical: 'general', locale: 'en' },
  { q: 'factory inspection checklist for custom fabrication', pillar: 'supply-chain', vertical: 'general', locale: 'en' },
  { q: 'shipping oversized playground equipment overseas', pillar: 'supply-chain', vertical: 'children', locale: 'en' },
  { q: 'customs clearance for imported play equipment', pillar: 'supply-chain', vertical: 'general', locale: 'en' },
  { q: 'installing a large installation without closing the venue', pillar: 'supply-chain', vertical: 'tourism', locale: 'en' },
  { q: 'warranty and spare parts for custom play equipment', pillar: 'supply-chain', vertical: 'children', locale: 'en' },
  { q: 'who owns the mould for a custom product', pillar: 'supply-chain', vertical: 'general', locale: 'en' },
  { q: 'quality control during production of custom equipment', pillar: 'supply-chain', vertical: 'general', locale: 'en' },

  // ---- Verticals, buyer-level phrasing ---------------------------------------
  { q: 'resort water park design consultant', pillar: 'creative-design', vertical: 'tourism', locale: 'en' },
  { q: 'children museum interactive installation designer', pillar: 'creative-design', vertical: 'children', locale: 'en' },
  { q: 'city council playground design requirements', pillar: 'strategy', vertical: 'public-space', locale: 'en' },
  { q: 'school playground design requirements', pillar: 'creative-design', vertical: 'children', locale: 'en' },
  { q: 'hotel kids club design supplier', pillar: 'creative-design', vertical: 'tourism', locale: 'en' },
  { q: 'playground surfacing and safety requirements', pillar: 'creative-design', vertical: 'children', locale: 'en' },
  { q: 'public realm lighting installation contractor', pillar: 'supply-chain', vertical: 'public-space', locale: 'en' },
  { q: 'is it cheaper to manufacture play equipment in Asia', pillar: 'strategy', vertical: 'children', locale: 'en' },

  // ---- Chinese ---------------------------------------------------------------
  { q: '水育乐园 设备 供应商 怎么选', pillar: 'strategy', vertical: 'tourism', locale: 'zh' },
  { q: '儿童乐园 设计 招标 要求', pillar: 'strategy', vertical: 'children', locale: 'zh' },
  { q: '度假区 景观 顾问 公司', pillar: 'strategy', vertical: 'tourism', locale: 'zh' },
  { q: '游乐设备 出海 认证 标准', pillar: 'supply-chain', vertical: 'children', locale: 'zh' },

  // ---- Arabic ----------------------------------------------------------------
  { q: 'مورد معدات ألعاب أطفال للفنادق', pillar: 'strategy', vertical: 'children', locale: 'ar' },
  { q: 'شركة استشارات تصميم مناطق ترفيه Resort', pillar: 'strategy', vertical: 'tourism', locale: 'ar' },
  { q: 'متطلبات سلامة معدات الملاعب的标准', pillar: 'creative-design', vertical: 'children', locale: 'ar' },

  // ---- Russian ---------------------------------------------------------------
  { q: 'производитель аттракционов для парков развлечений', pillar: 'strategy', vertical: 'tourism', locale: 'ru' },
  { q: 'детская площадка стандарт безопасности', pillar: 'creative-design', vertical: 'children', locale: 'ru' },
  { q: 'контроль качества на производстве оборудования', pillar: 'supply-chain', vertical: 'general', locale: 'ru' },
];

/** The AI answer sheet (T3): a tighter, buyer-voiced subset used for scoring. */
export const auditPrompts = [
  // Strategy
  'We are a resort developer planning a water-play area for a new property in the Gulf. Who should we brief, and what does a good brief need to contain?',
  'What should we ask before signing a supplier for custom play equipment at a hotel resort?',
  'How do we compare an independent design studio, a factory direct supplier and a full delivery partner for a themed attraction?',
  'What actually drives the cost of a bespoke installation, and how should we compare quotes?',
  'How do we decide whether a themed leisure project is feasible before committing budget?',
  'What should an RFP for a custom public space installation contain, and how should we evaluate bids?',
  // Creative design
  'What does a complete design package need to contain so a custom installation can actually be built and costed?',
  'When is prototyping a custom play element worth the cost?',
  'Which materials and finishes survive high temperature, humidity and salt air outdoors?',
  'What do EN 1176 and ASTM F1487 require from a playground equipment supplier?',
  'How do landscape architects coordinate with a fabricator for a custom play structure?',
  'How do we design lighting for a public space installation that also has to work as a night-time attraction?',
  // Supply chain
  'How do we vet a contract manufacturer in China before placing a large order?',
  'What should a factory inspection checklist cover for custom fabrication?',
  'How are oversized playground installations shipped, cleared and installed on site?',
  'Who should own the tooling and drawings for a product we have developed?',
  'How do we control quality during production of custom equipment?',
  'What warranty and spare parts should we require for outdoor play equipment?',
  // Verticals
  'Which consultancy can design and deliver a resort water park in the Middle East?',
  'We are building a children\'s museum. Who designs and fabricates interactive installations?',
  'What does a city council need to specify for a new public playground?',
  'What are the design requirements for a school playground?',
  'Who can design and deliver a hotel kids club?',
  'What surfacing and safety requirements apply to a community playground?',
  'Who supplies and installs public realm lighting features?',
  'Is it cheaper to manufacture custom play equipment in Asia than in Europe?',
];