import type { SiteConfig } from '@/content/types';

/**
 * Бренд, навигация и контакты — русский.
 *
 * Библиотеки разборов на русском пока нет, поэтому пункт «Разборы» в меню
 * не появляется: не публикуем язык — не ссылаемся на него.
 */
export const site: SiteConfig = {
  name: 'AQUASEE',
  legalName: 'AQUASEE',
  domain: 'aquasee.art',
  canonicalHost: 'www.aquasee.art',
  url: 'https://www.aquasee.art',
  tagline: 'Стратегия · Креативный дизайн · Реализация проектов',
  shortDescription:
    'Сервисная компания из Китая для проектов в сфере туризма, общественных пространств и детских игровых площадок: консалтинг на ранней стадии, креативный дизайн и НИОКР, а также организованная цепочка поставок вплоть до сдачи объекта.',
  contact: {
    email: 'victor@aquasee.art',
    location: 'Мы в Китае — и работаем с клиентами по всему миру',
    phone: '+86 15913150818',
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
    { href: '/strategy', label: 'Стратегия' },
    { href: '/creative-design', label: 'Дизайн и НИОКР' },
    { href: '/supply-chain', label: 'Цепочка поставок' },
    { href: '/insights', label: 'Разборы' },
    { href: '/projects', label: 'Проекты' },
    { href: '/about', label: 'О компании' },
    { href: '/faq', label: 'Вопросы' },
    { href: '/contact', label: 'Контакты' },
  ],
  ctaLabel: 'Начать проект',
  marketsLine: 'Мы в Китае и работаем с клиентами в Азии, Персидском заливе, Европе и Африке.',
};