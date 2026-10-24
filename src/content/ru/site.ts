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
  social: [],
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
  marketsLine:
    'Работаем в Персидском заливе, Юго-Восточной и Восточной Азии, Океании, Восточной Европе, Центральной Азии и Африке.',
};