import { createHash, createPublicKey, verify } from 'node:crypto';
import type { SignedApproval } from './types.ts';

export type ApprovalRole = 'evidence' | 'supply' | 'facts' | 'image-rights' | 'language' | 'final-release' | 'catalog-release';
export type TrustedSigner = {
  identity: string;
  publicKeyPem: string;
  roles: readonly ApprovalRole[];
  activeFrom: string;
  activeUntil?: string;
};
export type ApprovalTrust = {
  signers: Readonly<Record<string, TrustedSigner>>;
  revokedEvidenceIds: ReadonlySet<string>;
};

/** No production identity is enrolled until the user's authorization is verified. */
export const productionApprovalTrust: ApprovalTrust = {
  signers: {},
  revokedEvidenceIds: new Set(),
};

export function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.entries(value).filter(([, item]) => item !== undefined).sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => `${JSON.stringify(key)}:${canonicalJson(item)}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function sha256(value: unknown): string {
  return createHash('sha256').update(canonicalJson(value)).digest('hex');
}

export function validTimestamp(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(value)
    && !Number.isNaN(Date.parse(value));
}

export function currentlyAuthorized(keyId: string | undefined, trust: ApprovalTrust, at: string): boolean {
  const signer = keyId ? trust.signers[keyId] : undefined;
  return !!signer && validTimestamp(at) && validTimestamp(signer.activeFrom)
    && Date.parse(signer.activeFrom) <= Date.parse(at)
    && (!signer.activeUntil || (validTimestamp(signer.activeUntil) && Date.parse(at) <= Date.parse(signer.activeUntil)));
}

/** The signature covers the role, scope and exact statement bytes. */
export function signedPayload(role: ApprovalRole, scope: string, statement: unknown): string {
  return canonicalJson({ role, scope, statement });
}

export function verifyApprovalSignature(
  role: ApprovalRole,
  scope: string,
  statement: unknown,
  signed: SignedApproval | undefined,
  signedAt: string,
  trust: ApprovalTrust = productionApprovalTrust,
  identity?: string,
): boolean {
  if (!signed?.keyId || !signed.signature || !validTimestamp(signedAt)) return false;
  const signer = trust.signers[signed.keyId];
  if (!signer || !signer.roles.includes(role) || (identity && signer.identity !== identity)
    || !validTimestamp(signer.activeFrom) || Date.parse(signedAt) < Date.parse(signer.activeFrom)
    || (signer.activeUntil && (!validTimestamp(signer.activeUntil) || Date.parse(signedAt) > Date.parse(signer.activeUntil)))) return false;
  try {
    const signature = Buffer.from(signed.signature, 'base64');
    return signature.length === 64 && verify(null, Buffer.from(signedPayload(role, scope, statement)), createPublicKey(signer.publicKeyPem), signature);
  } catch {
    return false;
  }
}
