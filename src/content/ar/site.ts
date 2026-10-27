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
    phone: '+8615913150818',
  },
  /**
   * The channels we are reachable on.
   *
   * Instagram and LinkedIn are not here yet: the accounts do not exist, and
   * a link to a page that is not there is worse than no link at all. The
   * marks for both are already drawn - add the entry here when the account
   * is registered.
   */
  social: [
    { label: '小红书', icon: 'xiaohongshu', href: 'https://www.xiaohongshu.com/user/profile/5fafc21f000000000101cc5b' },
    { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@louiselau' },
    { label: 'WhatsApp', icon: 'whatsapp', href: 'https://wa.me/8615913150818' },
  ],
  nav: [
    { href: '/strategy', label: 'الاستشارات الاستراتيجية' },
    { href: '/creative-design', label: 'التصميم الإبداعي والتطوير' },
    { href: '/supply-chain', label: 'سلسلة التوريد والتسليم' },
    { href: '/insights', label: 'رؤى' },
    { href: '/projects', label: 'المشاريع والقدرات' },
    { href: '/about', label: 'من نحن' },
    { href: '/faq', label: 'الأسئلة الشائعة' },
    { href: '/contact', label: 'تواصل معنا' },
  ],
  ctaLabel: 'ابدأ مشروعًا',
  marketsLine: 'مقرّنا في الصين، ونعمل مع عملاء في آسيا والخليج وأوروبا وأفريقيا.',
};