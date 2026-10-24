import type { SiteConfig } from '@/content/types';

/**
 * العلامة والتنقل وبيانات التواصل — العربية.
 *
 * لا توجد مكتبة الرؤى بالعربية بعد، لذلك لا يظهر مدخل "رؤى" في التنقل:
 * لا نُنشر لغة، ولا نربط بها.
 */
export const site: SiteConfig = {
  name: 'AQUASEE',
  legalName: 'AQUASEE',
  domain: 'aquasee.art',
  canonicalHost: 'www.aquasee.art',
  url: 'https://www.aquasee.art',
  tagline: 'استراتيجية · تصميم إبداعي · تنفيذ المشاريع',
  shortDescription:
    'شركة خدمات مقرّها الصين للمشاريع في السياحة والفضاءات العامة ومساحات اللعب للأطفال — استشارات في المرحلة المبكرة، وتصميم إبداعي وتطوير، وسلسلة توريد منظّمة حتى التسليم.',
  contact: {
    email: 'victor@aquasee.art',
    location: 'مقرّنا في الصين — ونعمل مع عملاء حول العالم',
    phone: '',
  },
  social: [],
  nav: [
    { href: '/strategy', label: 'الاستشارات الاستراتيجية' },
    { href: '/creative-design', label: 'التصميم الإبداعي والتطوير' },
    { href: '/supply-chain', label: 'سلسلة التوريد والتسليم' },
    { href: '/projects', label: 'المشاريع والقدرات' },
    { href: '/about', label: 'من نحن' },
    { href: '/faq', label: 'الأسئلة الشائعة' },
    { href: '/contact', label: 'تواصل معنا' },
  ],
  ctaLabel: 'ابدأ مشروعًا',
  marketsLine:
    'نعمل في الخليج وجنوب شرق آسيا وشرق آسيا وأوقيانوسيا وشرق أوروبا وآسيا الوسطى وأفريقيا.',
};