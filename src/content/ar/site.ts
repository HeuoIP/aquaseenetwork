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
  /**
   * The channels we are reachable on.
   *
   * PLACEHOLDER URLS: each link below is the shape the platform uses, with
   * the brand name as the handle. Replace them with the real accounts - a
   * link that lands on somebody else's profile is worse than no link.
   */
  social: [
    { label: '小红书', icon: 'xiaohongshu', href: 'https://www.xiaohongshu.com/user/profile/aquasee' },
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/aquasee-art' },
    { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@aquasee.art' },
    { label: 'WhatsApp', icon: 'whatsapp', href: 'https://wa.me/15550000000' },
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/aquasee.art' },
  ],
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
  marketsLine: 'مقرّنا في الصين، ونعمل مع عملاء في آسيا والخليج وأوروبا وأفريقيا.',
};