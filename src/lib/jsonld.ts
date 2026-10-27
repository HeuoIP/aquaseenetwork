import type { Dictionary, FaqItem, InsightArticle, ProcessStep, ServiceDetail } from '@/content/types';
import { localePath, type Locale } from '@/lib/locale';
import { SITE_ORIGIN } from '@/lib/metadata';

/**
 * Structured data.
 *
 * Rendered as a plain `<script type="application/ld+json">` in the page body,
 * which is the approach the Next.js documentation recommends, with `<` escaped
 * so that no content can break out of the script element.
 *
 * The point of this module is not decoration. An answer engine decides what a
 * page is *about* largely from these descriptions, so each one has to be
 * precise about the entity, the service and the area served.
 */
type Json = Record<string, unknown>;

function serialise(data: Json): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function organizationLd(dict: Dictionary): Json {
  const { site } = dict;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: SITE_ORIGIN,
    description: site.shortDescription,
    slogan: site.tagline,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}/brand/aquasee-mark-512.png`,
      width: 512,
      height: 512,
    },
    email: site.contact.email,
    areaServed: [
      'United Arab Emirates',
      'Saudi Arabia',
      'Qatar',
      'Kuwait',
      'Oman',
      'Bahrain',
      'Singapore',
      'Malaysia',
      'Thailand',
      'Vietnam',
      'Indonesia',
      'Japan',
      'South Korea',
      'Australia',
      'New Zealand',
      'Russia',
      'Eastern Europe',
      'Central Asia',
      'South Africa',
    ],
    knowsAbout: [
      'Tourism and resort development consulting',
      'Creative design and R&D for custom installations',
      'Supply chain management and project delivery',
      'Play equipment specification and safety standards',
      'Public space installation',
      'Children’s learning and play space design',
    ],
    knowsLanguage: ['en', 'zh', 'ar', 'ru'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.contact.email,
      availableLanguage: ['English', 'Chinese', 'Arabic', 'Russian'],
      areaServed: 'Worldwide',
    },
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
  };
}

export function websiteLd(dict: Dictionary): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: dict.site.name,
    description: dict.site.shortDescription,
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    inLanguage: 'en',
  };
}

export function serviceLd(service: ServiceDetail, locale: Locale): Json {
  const url = `${SITE_ORIGIN}${localePath(locale, service.href)}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.definition,
    url,
    provider: { '@id': `${SITE_ORIGIN}/#organization` },
    areaServed: 'Worldwide',
    audience: service.bestFor,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} — deliverables`,
      itemListElement: service.deliverables.map((d) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: d },
      })),
    },
  };
}

export function faqLd(items: FaqItem[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function articleLd(article: InsightArticle, locale: Locale): Json {
  const url = `${SITE_ORIGIN}${localePath(locale, `/insights/${article.slug}`)}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url,
    datePublished: article.updatedAt,
    dateModified: article.updatedAt,
    inLanguage: locale,
    author: { '@id': `${SITE_ORIGIN}/#organization` },
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    mainEntityOfPage: url,
    keywords: [article.pillar, article.vertical].join(', '),
    citation: article.sources.map((s) => s.url),
  };
}

export function howToLd(steps: ProcessStep[], locale: Locale): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How AQUASEE delivers a project',
    description:
      'The six-stage workflow AQUASEE uses to take a brief through strategy, design, sourcing, production and handover.',
    step: steps.map((s) => ({
      '@type': 'HowToStep',
      position: Number(s.index),
      name: s.title,
      text: s.description,
      ...(s.deliverables.length
        ? { itemListElement: s.deliverables.map((d) => ({ '@type': 'HowToDirection', text: d })) }
        : {}),
    })),
  };
}

export function itemListLd(
  items: { name: string; url: string }[],
  listName: string,
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function serialiseJsonLd(data: Json): string {
  return serialise(data);
}