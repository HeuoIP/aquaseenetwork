import type { ProductApproval, ProductEvidenceReceipt, ProductRecord, ProductReview } from '@/content/types';
import type { Locale } from '@/lib/locale';
import {
  type ApprovalRole, type ApprovalTrust, currentlyAuthorized, productionApprovalTrust,
  sha256, validTimestamp, verifyApprovalSignature,
} from './release-crypto.ts';

/** Production approvals are empty until independently signed decisions exist. */
export const productApprovals: readonly ProductApproval[] = [];

export function productContentDigest(product: ProductRecord): string {
  return sha256(product);
}

export function productEvidenceDigest(evidence: readonly ProductEvidenceReceipt[]): string {
  return sha256([...evidence].sort((a, b) => a.id.localeCompare(b.id)));
}

export function validEvidenceReceipt(receipt: ProductEvidenceReceipt, trust: ApprovalTrust, at: string): boolean {
  if (!receipt.id || !['supply', 'technical', 'image-rights', 'language'].includes(receipt.kind)
    || !receipt.versionId || !/^[a-f0-9]{64}$/.test(receipt.sha256)
    || !validTimestamp(receipt.issuedAt) || !validTimestamp(at)
    || trust.revokedEvidenceIds.has(receipt.id) || trust.revokedEvidenceIds.has(`${receipt.id}@${receipt.versionId}`)
    || Date.parse(receipt.issuedAt) > Date.parse(at)
    || (receipt.expiresAt && (!validTimestamp(receipt.expiresAt) || Date.parse(receipt.expiresAt) <= Date.parse(at)))) return false;
  const { signed, ...statement } = receipt;
  return verifyApprovalSignature('evidence', receipt.id, statement, signed, receipt.issuedAt, trust);
}

function validReview(
  role: ApprovalRole,
  scope: string,
  review: ProductReview | undefined,
  approval: ProductApproval,
  product: ProductRecord,
  trust: ApprovalTrust,
): boolean {
  if (!review?.reviewedBy || !validTimestamp(review.reviewedAt) || !review.evidenceRef) return false;
  const receipt = approval.evidence.find((item) => item.id === review.evidenceRef);
  const expectedKind = role === 'facts' ? 'technical' : role === 'language' ? 'language' : role;
  if (!receipt || receipt.kind !== expectedKind || !validEvidenceReceipt(receipt, trust, review.reviewedAt)) return false;
  const { signed, ...statement } = review;
  return verifyApprovalSignature(role, scope, {
    productId: product.id, productVersion: product.version,
    contentDigest: approval.contentDigest, evidenceDigest: approval.evidenceDigest, ...statement,
  }, signed, review.reviewedAt, trust, review.reviewedBy);
}

export function approvalFor(
  product: ProductRecord,
  locale: Locale,
  approvals: readonly ProductApproval[] = productApprovals,
  trust: ApprovalTrust = productionApprovalTrust,
  at: string = new Date().toISOString(),
): ProductApproval | null {
  const matches = approvals.filter((item) => item.productId === product.id);
  if (matches.length !== 1) return null;
  const approval = matches[0];
  if (!product.version?.trim() || !validTimestamp(product.updatedAt)
    || approval.productVersion !== product.version || approval.contentDigest !== productContentDigest(product)
    || !Array.isArray(approval.evidence) || !approval.evidence.length
    || approval.evidenceDigest !== productEvidenceDigest(approval.evidence)
    || new Set(approval.evidence.map((item) => item.id)).size !== approval.evidence.length
    || !validTimestamp(at) || !validTimestamp(approval.release?.approvedAt)
    || Date.parse(approval.release.approvedAt) > Date.parse(at)) return null;

  const signerIds = [approval.release.signed?.keyId, ...approval.evidence.map((item) => item.signed?.keyId),
    approval.supply?.signed?.keyId, approval.facts?.signed?.keyId, approval.imageRights?.signed?.keyId,
    approval.languages?.en?.signed?.keyId, approval.languages?.[locale]?.signed?.keyId];
  if (signerIds.some((id) => !id || !currentlyAuthorized(id, trust, at))) return null;

  const evidenceById = new Map(approval.evidence.map((item) => [item.id, item]));
  if (!product.image?.approved || !product.image.rightsEvidenceId || evidenceById.get(product.image.rightsEvidenceId)?.kind !== 'image-rights'
    || approval.imageRights?.evidenceRef !== product.image.rightsEvidenceId
    || !/^[a-f0-9]{64}$/.test(product.image.sha256)
    || product.specs.some((spec) => spec.status === 'confirmed' && (!spec.evidenceId || evidenceById.get(spec.evidenceId)?.kind !== 'technical'))) return null;
  if (!approval.evidence.every((receipt) => validEvidenceReceipt(receipt, trust, at))) return null;

  const reviews: [ApprovalRole, string, ProductReview | undefined][] = [
    ['supply', product.id, approval.supply],
    ['facts', product.id, approval.facts],
    ['image-rights', product.id, approval.imageRights],
    ['language', `${product.id}:en`, approval.languages?.en],
    ['language', `${product.id}:${locale}`, approval.languages?.[locale]],
  ];
  if (!reviews.every(([role, scope, review]) => validReview(role, scope, review, approval, product, trust)
    && Date.parse(review!.reviewedAt) >= Date.parse(product.updatedAt!)
    && Date.parse(review!.reviewedAt) <= Date.parse(approval.release.approvedAt))) return null;

  const release = approval.release;
  if (!release.approvedBy || !release.decisionRef) return null;
  const { signed, ...statement } = release;
  return verifyApprovalSignature('final-release', product.id, {
    productId: product.id, productVersion: product.version,
    contentDigest: approval.contentDigest, evidenceDigest: approval.evidenceDigest, ...statement,
  }, signed, release.approvedAt, trust, release.approvedBy) ? approval : null;
}

/** A non-sensitive review packet for an authorized human to inspect before signing. */
export function productReviewPacket(product: ProductRecord, approval: Pick<ProductApproval, 'evidence'>) {
  return {
    productId: product.id,
    productVersion: product.version,
    contentDigest: productContentDigest(product),
    evidenceDigest: productEvidenceDigest(approval.evidence),
    image: product.image ? { src: product.image.src, sha256: product.image.sha256 } : null,
    evidence: approval.evidence.map(({ id, kind, versionId, sha256 }) => ({ id, kind, versionId, sha256 })),
  };
}
