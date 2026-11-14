import type { ProductApproval, ProductCatalog, ProductRecord } from './types.ts';
import { productApprovals, productContentDigest } from './product-approvals.ts';
import { catalogSourceDigests } from './catalog-source-digests.ts';
import { catalogReleaseDecision } from './catalog-release-decision.ts';
import { productCatalog, publishedProducts } from './products.ts';
import {
  type ApprovalTrust, currentlyAuthorized, productionApprovalTrust, sha256, validTimestamp, verifyApprovalSignature,
} from './release-crypto.ts';
import { PUBLISHED_LOCALES, LOCALE_TAGS } from '../lib/locale.ts';

export type CatalogIndexRelease = {
  revision: string;
  approval: null | {
    revision: string;
    manifestDigest: string;
    approvedBy: string;
    approvedAt: string;
    decisionRef: string;
    signed: { keyId: string; signature: string };
  };
};

/** Indexing requires a separate signature by the user or an explicitly authorized owner. */
export const catalogIndexRelease: CatalogIndexRelease = catalogReleaseDecision;

export function catalogProductDigest(products: readonly ProductRecord[]): string {
  return sha256(products.map((product) => ({
    id: product.id, version: product.version, digest: productContentDigest(product),
  })).sort((a, b) => a.id.localeCompare(b.id)));
}

/** Source map covers templates, styles, metadata, language plumbing and all catalogue visuals. */
export function catalogReleaseManifest(
  catalog: ProductCatalog = productCatalog,
  approvals: readonly ProductApproval[] = productApprovals,
  trust: ApprovalTrust = productionApprovalTrust,
  sourceDigests: Readonly<Record<string, string>> = catalogSourceDigests,
  revision: string = catalogIndexRelease.revision,
) {
  const products = publishedProducts(catalog, 'en', approvals, trust).sort((a, b) => a.id.localeCompare(b.id));
  const approved = products.map((product) => approvals.find((item) => item.productId === product.id)!);
  const sources = Object.fromEntries(Object.entries(sourceDigests).sort(([a], [b]) => a.localeCompare(b)));
  const locales = [...PUBLISHED_LOCALES].sort();
  const manifest = {
    schemaVersion: 1,
    releaseRevision: revision,
    products: products.map((product) => ({
      id: product.id,
      version: product.version,
      contentDigest: productContentDigest(product),
      locales: Object.fromEntries(locales.map((locale) => [locale, {
        status: publishedProducts(catalog, locale, approvals, trust).some((item) => item.id === product.id) ? 'published' : 'unpublished',
        translationDigest: product.translations[locale] ? sha256(product.translations[locale]) : null,
      }])),
    })),
    assets: products.flatMap((product) => product.image ? [{ productId: product.id, path: product.image.src,
      sha256: product.image.sha256, rightsEvidenceId: product.image.rightsEvidenceId,
      rightsEvidenceVersion: approvals.find((item) => item.productId === product.id)?.evidence.find((item) => item.id === product.image?.rightsEvidenceId)?.versionId ?? null,
    }] : []).sort((a, b) => a.productId.localeCompare(b.productId)),
    evidenceVersions: approved.flatMap((approval) => approval.evidence.map((item) => ({
      productId: approval.productId, id: item.id, kind: item.kind, versionId: item.versionId, sha256: item.sha256,
    }))).sort((a, b) => `${a.productId}:${a.id}`.localeCompare(`${b.productId}:${b.id}`)),
    taxonomyDigest: sha256({
      categories: [...catalog.categories].sort((a, b) => a.slug.localeCompare(b.slug)),
      scenes: [...catalog.scenes].sort((a, b) => a.slug.localeCompare(b.slug)),
    }),
    catalogPageDigest: sha256({ ui: catalog.ui, sources }),
    metadataDigest: sha256({
      siteOrigin: 'https://www.aquasee.art',
      rules: 'catalog approval gates robots, sitemap and hreflang together; canonical is self-referencing',
      sources: Object.fromEntries(Object.entries(sources).filter(([path]) => /metadata|sitemap|robots|locale|LanguageSwitcher|proxy/.test(path))),
    }),
    localePublicationDigest: sha256({ locales, tags: LOCALE_TAGS,
      published: locales.map((locale) => ({ locale, products: publishedProducts(catalog, locale, approvals, trust).map((item) => item.id).sort() })),
      ui: catalog.ui,
    }),
  };
  return { manifest, manifestDigest: sha256(manifest) };
}

export function canIndexProductCatalog(
  release: CatalogIndexRelease = catalogIndexRelease,
  catalog: ProductCatalog = productCatalog,
  approvals: readonly ProductApproval[] = productApprovals,
  trust: ApprovalTrust = productionApprovalTrust,
  sourceDigests: Readonly<Record<string, string>> = catalogSourceDigests,
): boolean {
  const approval = release.approval;
  if (!approval || !release.revision || !validTimestamp(approval.approvedAt)
    || approval.revision !== release.revision || !approval.approvedBy || !approval.decisionRef) return false;
  if (!currentlyAuthorized(approval.signed?.keyId, trust, new Date().toISOString())) return false;
  const products = publishedProducts(catalog, 'en', approvals, trust);
  if (!products.length || products.some((product) => {
    const productApproval = approvals.find((item) => item.productId === product.id);
    return !productApproval || Date.parse(productApproval.release.approvedAt) > Date.parse(approval.approvedAt);
  })) return false;
  const { manifestDigest } = catalogReleaseManifest(catalog, approvals, trust, sourceDigests, release.revision);
  if (approval.manifestDigest !== manifestDigest) return false;
  const { signed, ...statement } = approval;
  return verifyApprovalSignature('catalog-release', release.revision, statement, signed, approval.approvedAt, trust, approval.approvedBy);
}
