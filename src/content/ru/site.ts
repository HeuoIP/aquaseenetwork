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
    { href: '/strategy', label: 'Стратегия' },
    { href: '/creative-design', label: 'Дизайн и НИОКР' },
    { href: '/supply-chain', label: 'Цепочка поставок' },
    { href: '/projects', label: 'Проекты' },
    { href: '/about', label: 'О компании' },
    { href: '/faq', label: 'Вопросы' },
    { href: '/contact', label: 'Контакты' },
  ],
  ctaLabel: 'Начать проект',
  marketsLine: 'Мы в Китае и работаем с клиентами в Азии, Персидском заливе, Европе и Африке.',
};