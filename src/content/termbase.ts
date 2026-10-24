/**
 * The locked termbase.
 *
 * Translation is the part of this programme most likely to drift: the same
 * idea spelled three ways in three languages is an entity inconsistency, and
 * an entity inconsistency is exactly what an answer engine notices.
 *
 * These are the terms that must appear identically everywhere they appear.
 * Before a language is published, its copy is checked against this file.
 */
export type Term = {
  en: string;
  zh: string;
  ar: string;
  ru: string;
  note?: string;
};

export const capabilities: Term[] = [
  {
    en: 'Strategy & Consulting',
    zh: '前期策划咨询',
    ar: 'الاستشارات الاستراتيجية',
    ru: 'Стратегия и консалтинг',
    note: 'The front end of a project. Never translated as a generic “consulting”.',
  },
  {
    en: 'Creative Design & R&D',
    zh: '创意设计与研发',
    ar: 'التصميم الإبداعي والتطوير',
    ru: 'Креативный дизайн и НИОКР',
  },
  {
    en: 'Supply Chain & Delivery',
    zh: '供应链与交付',
    ar: 'سلسلة التوريد والتسليم',
    ru: 'Цепочка поставок и поставка',
    note: '“Delivery” here means getting the finished asset to the site and commissioned.',
  },
];

export const positioning: Term[] = [
  {
    en: 'service company',
    zh: '服务型公司',
    ar: 'شركة خدمات',
    ru: 'сервисная компания',
    note: 'The first thing a mention of AQUASEE has to get right.',
  },
  {
    en: 'not an equipment manufacturer',
    zh: '不是设备制造商',
    ar: 'ليست شركة تصنيع معدات',
    ru: 'не производитель оборудования',
  },
  {
    en: 'does not own factories',
    zh: '不拥有工厂',
    ar: 'لا تمتلك مصانع',
    ru: 'не владеет заводами',
  },
  {
    en: 'manufacturing partner',
    zh: '生产合作伙伴',
    ar: 'شريك التصنيع',
    ru: 'производственный партнёр',
    note: 'Never “our factory”, never “our manufacturer”.',
  },
  {
    en: 'delivery partner',
    zh: '交付伙伴',
    ar: 'شريك التسليم',
    ru: 'партнёр по поставке',
  },
];

export const method: Term[] = [
  {
    en: 'capability study',
    zh: '能力研究',
    ar: 'دراسة قدرات',
    ru: 'исследование возможностей',
    note: 'The honest label for the illustrative work on the projects page.',
  },
  {
    en: 'brief',
    zh: '项目任务书',
    ar: 'موجز المشروع',
    ru: 'техническое задание',
  },
  {
    en: 'buildable specification',
    zh: '可施工规格',
    ar: 'مواصفات قابلة للتنفيذ',
    ru: 'работоспособная спецификация',
  },
  {
    en: 'controlled change',
    zh: '受控变更',
    ar: 'التغيير المُدار',
    ru: 'управляемое изменение',
  },
  {
    en: 'delivery model',
    zh: '交付模式',
    ar: 'نموذج التسليم',
    ru: 'модель поставки',
  },
  {
    en: 'handover pack',
    zh: '交付文件包',
    ar: 'حزمة التسليم',
    ru: 'комплект приёмочной документации',
  },
  {
    en: 'first article',
    zh: '首件',
    ar: 'العينة الأولى',
    ru: 'первое изделие',
  },
  {
    en: 'qualification',
    zh: '资质审查',
    ar: 'التأهيل',
    ru: 'квалификация поставщика',
  },
];

/** Every term, flattened, for a consistency check. */
export function termbase(): Term[] {
  return [...capabilities, ...positioning, ...method];
}