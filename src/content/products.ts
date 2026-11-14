import type { ProductApproval, ProductCatalog, ProductCategory, ProductCategoryDefinition, ProductRecord, ProductScene, ProductSceneSlug, ProductTranslation } from '@/content/types';
import type { Locale } from '@/lib/locale';
import { approvalFor, productApprovals } from './product-approvals.ts';
import { productRecords } from './product-records.ts';
import { type ApprovalTrust, productionApprovalTrust } from './release-crypto.ts';

/**
 * AQUASEE 2.0 product foundation.
 *
 * Category and scene definitions describe the intended range, but empty
 * classifications are not published as routes or navigation. The product
 * list intentionally contains no published SKU yet: the commercial
 * strategy requires supply-chain confirmation before a product, price,
 * specification, certification or warranty can appear publicly.
 */
export const productCategories: ProductCategoryDefinition[] = [
  {
    slug: 'pool-slides',
    name: 'Pool Slides',
    shortName: 'Slides',
    summary: 'Sculptural metal slides designed for private pools, boutique hospitality and compact leisure spaces.',
    role: 'first-release',
    scopeNote: 'Compact, family and boutique commercial formats. Large high-speed slides are outside the range.',
    image: {
      src: '/images/concepts/pool-slides-v2.webp',
      alt: 'AI-assisted concept visualisation of a child using a sculptural metal slide at a pool; not a manufactured product.',
      kind: 'illustration',
    },
  },
  {
    slug: 'pool-shade',
    name: 'Outdoor Shade',
    shortName: 'Shade',
    summary: 'Tensile fabric sails that shade children at play beside pools and across outdoor leisure spaces.',
    role: 'first-release',
    scopeNote: 'Sail, tensile membrane and fabric shade only. Pergolas and rigid roof structures are outside the range.',
    image: {
      src: '/images/concepts/pool-shade-v2.webp',
      alt: 'AI-assisted concept visualisation of children playing under tensile fabric shade near a pool; not an engineered installation.',
      kind: 'illustration',
    },
  },
  {
    slug: 'compact-water-parks',
    name: 'Compact Water Parks',
    shortName: 'Water Parks',
    summary: 'Coherent small-format water-play scenes combining themed splash pieces, a slide and shade.',
    role: 'second-layer',
    scopeNote: 'A same-theme combination of products and play zones, not a separate large water-park equipment line.',
    image: {
      src: '/images/concepts/compact-water-parks-variant-v1.webp',
      alt: 'AI concept visualisation of a teal metal water-play structure with slides and spray features; not a completed project or engineered model.',
      kind: 'illustration',
    },
  },
  {
    slug: 'splash-play-facilities',
    name: 'Splash Play Facilities',
    shortName: 'Splash Play',
    summary: 'Themed sculptural splash-play pieces that invite children to interact with water and place.',
    role: 'second-layer',
    scopeNote: 'A core design and development direction; final forms, supply and installation require confirmation.',
    image: {
      src: '/images/concepts/splash-play-facilities-v3.webp',
      alt: 'AI concept visualisation of children playing beneath flower-shaped water curtains; not a completed project or manufactured product.',
      kind: 'illustration',
    },
  },
];

export const productScenes: ProductScene[] = [
  { slug: 'private-pool-villa', name: 'Private Pool / Villa', summary: 'Products considered for private residential pools and villa settings.' },
  { slug: 'boutique-hotel-resort', name: 'Boutique Hotel / Resort', summary: 'Products selected for smaller hospitality pools and resort leisure spaces.' },
  { slug: 'club-wellness', name: 'Club / Wellness', summary: 'Products for clubs, wellness spaces and member-focused leisure facilities.' },
  { slug: 'family-leisure-venue', name: 'Family Leisure Venue', summary: 'Products for family activity venues where water play is one part of a wider leisure offer, rather than a dedicated water park project.' },
  { slug: 'compact-water-park-projects', name: 'Compact Water Park Projects', summary: 'A small site setting for a coherent same-theme combination of splash pieces, slides and shade, with coordinated play zones and infrastructure.' },
];

export const productCatalog: ProductCatalog = {
  categories: productCategories,
  scenes: productScenes,
  products: productRecords,
  ui: {
    en: {
      status: 'approved',
      products: 'Products',
      bySpace: 'Browse by space',
      aboutProduct: 'About this product',
      suitableSpaces: 'Suitable spaces',
      confirmedSpecifications: 'Confirmed specifications',
      suitabilityNote: 'Final suitability, local requirements and supply scope are confirmed through enquiry.',
      startEnquiry: 'Start an enquiry',
      relatedProducts: 'Related products',
      viewProduct: 'View product',
      conceptVisualisation: 'Concept visualisation',
      browseBySpaceDescription: 'Start with the place, then find products confirmed for that setting.',
      landingTitle: 'A focused collection for water-led spaces.',
      landingIntro: 'Pool Slides and Outdoor Shade are the first categories being prepared for release. The collection is kept deliberately focused: each product must make sense for the place, the people using it and the route to supply.',
      byType: 'Browse by product',
      categoryStructure: 'The four category structure.',
      publicationNote: 'Category guides explain the design directions. Individual model pages appear only after supply status and release material are confirmed.',
      startWithSpace: 'Start with the place, then choose the product.',
      publishedProducts: 'Published products',
      viewPublishedProducts: 'View published products',
      releaseStatus: 'Release status',
      releaseStatusTitle: 'The first product release is being verified.',
      releaseStatusBody: 'We are confirming the products, specifications, supply route and installation boundaries before publishing individual product pages. If you have a project in mind, send the pool, venue or site details and we can advise on the right starting point.',
      firstReleaseFocus: 'First release focus',
      secondLayer: 'Second layer',
    },
  },
};

const RESERVED_PRODUCT_SLUGS = new Set(['by-space', ...productCategories.map((category) => category.slug)]);
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Fail closed if the catalogue contains ambiguous IDs, routes or taxonomy keys. */
export function isFixtureRecord(product: ProductRecord): boolean {
  return /^(fixture|test|mock)[-_]/i.test(product.id)
    || /^(fixture|test|mock)-/i.test(product.slug)
    || /^(fixture|test|mock)(?:[-_/]|$)/i.test(product.source ?? '');
}

export function validateProductCatalog(catalog: ProductCatalog, approvals: readonly ProductApproval[] = productApprovals, trust: ApprovalTrust = productionApprovalTrust): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const categories = new Set(catalog.categories.map((category) => category.slug));
  const scenes = new Set(catalog.scenes.map((scene) => scene.slug));
  if (categories.size !== catalog.categories.length) errors.push('Duplicate category slug');
  if (scenes.size !== catalog.scenes.length) errors.push('Duplicate scene slug');
  const approvalIds = new Set<string>();
  for (const approval of approvals) {
    if (approvalIds.has(approval.productId)) errors.push(`Duplicate approval for ${approval.productId}`);
    approvalIds.add(approval.productId);
    if (!catalog.products.some((product) => product.id === approval.productId)) errors.push(`Orphan approval for ${approval.productId}`);
  }
  for (const product of catalog.products) {
    if (!product.id || ids.has(product.id)) errors.push(`Duplicate or missing product ID: ${product.id}`);
    if (!product.version?.trim()) errors.push(`Missing product version: ${product.id}`);
    if (isFixtureRecord(product)) errors.push(`Fixture record in production catalogue: ${product.id}`);
    ids.add(product.id);
    if (!SLUG_PATTERN.test(product.slug) || RESERVED_PRODUCT_SLUGS.has(product.slug) || slugs.has(product.slug)) {
      errors.push(`Invalid, reserved or duplicate product slug: ${product.slug}`);
    }
    slugs.add(product.slug);
    if (!categories.has(product.category)) errors.push(`Unknown category on ${product.id}: ${product.category}`);
    if (!product.scenes.length) errors.push(`No scene on ${product.id}`);
    for (const scene of product.scenes) {
      if (!scenes.has(scene)) errors.push(`Unknown scene on ${product.id}: ${scene}`);
    }
    if (new Set(product.scenes).size !== product.scenes.length) errors.push(`Duplicate scene on ${product.id}`);
    for (const spec of product.specs) {
      if (spec.status === 'confirmed' && !spec.value) errors.push(`Confirmed spec on ${product.id} lacks a value: ${spec.label}`);
      if (spec.status !== 'confirmed' && spec.value) errors.push(`Unconfirmed spec on ${product.id} has a public value: ${spec.label}`);
    }
    if (approvalIds.has(product.id) && !approvalFor(product, 'en', approvals, trust)) {
      errors.push(`Approval is invalid or stale for current product version: ${product.id}`);
    }
    if (product.publicationStatus === 'published' && !isPublicProduct(product, approvals, trust)) {
      errors.push(`Published product ${product.id} lacks independent approval for the current version`);
    }
  }
  return errors;
}

/** The same release gate feeds routes, navigation, metadata, sitemap and JSON-LD. */
export function isPublicProduct(product: ProductRecord, approvals: readonly ProductApproval[] = productApprovals, trust: ApprovalTrust = productionApprovalTrust): boolean {
  const english = product.translations.en;
  return !isFixtureRecord(product)
    && product.availability === 'confirmed'
    && product.publicationStatus === 'published'
    && !!product.version
    && !!product.updatedAt
    && !!product.source
    && !!product.image?.approved
    && !!product.image.src
    && !!product.image.alt
    && !!english
    && english.status === 'approved'
    && !!english.name
    && !!english.summary
    && !!english.description
    && !!approvalFor(product, 'en', approvals, trust);
}

export function catalogUi(locale: Locale, catalog: ProductCatalog = productCatalog) {
  const ui = catalog.ui[locale];
  return ui?.status === 'approved' && Object.values(ui).every((value) => typeof value === 'string' && value.trim().length > 0) ? ui : null;
}

export function categoryCopy(category: ProductCategoryDefinition, locale: Locale) {
  if (locale === 'en') return { name: category.name, summary: category.summary, scopeNote: category.scopeNote };
  const copy = category.translations?.[locale];
  return copy?.status === 'approved' && copy.name && copy.summary && copy.scopeNote ? copy : null;
}

export function sceneCopy(scene: ProductScene, locale: Locale) {
  if (locale === 'en') return { name: scene.name, summary: scene.summary };
  const copy = scene.translations?.[locale];
  return copy?.status === 'approved' && copy.name && copy.summary ? copy : null;
}

export function visibleProductSpecs(product: ProductRecord, locale: Locale, catalog: ProductCatalog = productCatalog, approvals: readonly ProductApproval[] = productApprovals, trust: ApprovalTrust = productionApprovalTrust) {
  if (!productTranslation(product, locale, catalog, approvals, trust)) return [];
  return product.specs.flatMap((spec) => {
    if (spec.status !== 'confirmed' || !spec.value) return [];
    if (locale === 'en') return [{ label: spec.label, value: spec.value }];
    const copy = spec.translations?.[locale];
    return copy?.status === 'approved' && copy.label && copy.value ? [{ label: copy.label, value: copy.value }] : [];
  });
}

export function productTranslation(product: ProductRecord, locale: Locale, catalog: ProductCatalog = productCatalog, approvals: readonly ProductApproval[] = productApprovals, trust: ApprovalTrust = productionApprovalTrust): ProductTranslation | null {
  if (!isPublicProduct(product, approvals, trust) || !approvalFor(product, locale, approvals, trust) || !catalogUi(locale, catalog)) return null;
  const category = catalog.categories.find((item) => item.slug === product.category);
  if (!category || !categoryCopy(category, locale)) return null;
  if (product.scenes.some((slug) => {
    const scene = catalog.scenes.find((item) => item.slug === slug);
    return !scene || !sceneCopy(scene, locale);
  })) return null;
  if (locale !== 'en' && product.specs.some((spec) => {
    if (spec.status !== 'confirmed') return false;
    const copy = spec.translations?.[locale];
    return !copy || copy.status !== 'approved' || !copy.label || !copy.value;
  })) return null;
  const translation = product.translations[locale];
  return translation?.status === 'approved'
    && !!translation.name
    && !!translation.summary
    && !!translation.description
    && (locale === 'en' || !!translation.imageAlt)
    ? translation : null;
}

export function publishedProducts(catalog: ProductCatalog = productCatalog, locale: Locale = 'en', approvals: readonly ProductApproval[] = productApprovals, trust: ApprovalTrust = productionApprovalTrust): ProductRecord[] {
  return catalog.products.filter((product) => productTranslation(product, locale, catalog, approvals, trust) !== null);
}

export function productsByCategory(category: ProductCategory, locale: Locale, catalog: ProductCatalog = productCatalog, approvals: readonly ProductApproval[] = productApprovals, trust: ApprovalTrust = productionApprovalTrust): ProductRecord[] {
  return publishedProducts(catalog, locale, approvals, trust).filter((product) => product.category === category);
}

export function productsByScene(scene: ProductSceneSlug, locale: Locale, catalog: ProductCatalog = productCatalog, approvals: readonly ProductApproval[] = productApprovals, trust: ApprovalTrust = productionApprovalTrust): ProductRecord[] {
  return publishedProducts(catalog, locale, approvals, trust).filter((product) => product.scenes.includes(scene));
}

export function publishedCategories(locale: Locale, catalog: ProductCatalog = productCatalog, approvals: readonly ProductApproval[] = productApprovals, trust: ApprovalTrust = productionApprovalTrust): ProductCategoryDefinition[] {
  return catalog.categories.filter((category) => !!categoryCopy(category, locale) && productsByCategory(category.slug, locale, catalog, approvals, trust).length > 0);
}

export function publishedScenes(locale: Locale, catalog: ProductCatalog = productCatalog, approvals: readonly ProductApproval[] = productApprovals, trust: ApprovalTrust = productionApprovalTrust): ProductScene[] {
  return catalog.scenes.filter((scene) => !!sceneCopy(scene, locale) && productsByScene(scene.slug, locale, catalog, approvals, trust).length > 0);
}

const catalogErrors = validateProductCatalog(productCatalog);
if (catalogErrors.length) throw new Error(`Invalid product catalogue:\n${catalogErrors.join('\n')}`);
