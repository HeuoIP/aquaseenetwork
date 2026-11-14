/** Human-controlled decision data is excluded from its own Manifest hash. */
export const catalogReleaseDecision: {
  revision: string;
  approval: null | {
    revision: string;
    manifestDigest: string;
    approvedBy: string;
    approvedAt: string;
    decisionRef: string;
    signed: { keyId: string; signature: string };
  };
} = {
  revision: 'wp03-pre-release-1',
  approval: null,
};
