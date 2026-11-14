import assert from 'node:assert/strict';
import { createHash, generateKeyPairSync, sign } from 'node:crypto';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { productRecords } from '../src/content/product-records.ts';
import { productApprovals, approvalFor, productContentDigest, productEvidenceDigest } from '../src/content/product-approvals.ts';
import { verifyProductImageBytes } from '../src/content/product-assets.ts';
import { signedPayload } from '../src/content/release-crypto.ts';
import { canIndexProductCatalog, catalogReleaseManifest } from '../src/content/catalog-index.ts';
import { catalogSourceDigests } from '../src/content/catalog-source-digests.ts';
import {
  isFixtureRecord, productCatalog, productTranslation, productsByCategory, productsByScene,
  publishedProducts, validateProductCatalog, visibleProductSpecs,
} from '../src/content/products.ts';

// The production catalogue is checked without introducing a fictional SKU.
assert.deepEqual(validateProductCatalog(productCatalog, productApprovals), []);
for (const product of productRecords.filter((item) => item.publicationStatus === 'published')) {
  assert.ok(verifyProductImageBytes(product, join(process.cwd(), 'public')), `Missing or changed image: ${product.id}`);
}
assert.ok(publishedProducts().every((item) => !isFixtureRecord(item)));

const fixtureRoot = mkdtempSync(join(tmpdir(), 'aquasee-g1-'));
try {
  mkdirSync(join(fixtureRoot, 'images'));
  const imagePath = join(fixtureRoot, 'images', 'fixture.webp');
  const imageBytes = Buffer.from('isolated image fixture A');
  writeFileSync(imagePath, imageBytes);
  const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
  const reviewerKey = generateKeyPairSync('ed25519');
  const userKey = generateKeyPairSync('ed25519');
  const publicPem = (key) => key.publicKey.export({ type: 'spki', format: 'pem' });
  const trust = { signers: {
    reviewer: { identity: 'authorized-reviewer', publicKeyPem: publicPem(reviewerKey), roles: ['evidence', 'supply', 'facts', 'image-rights', 'language'], activeFrom: '2025-01-01T00:00:00Z' },
    user: { identity: 'user-final-approver', publicKeyPem: publicPem(userKey), roles: ['final-release', 'catalog-release'], activeFrom: '2025-01-01T00:00:00Z' },
  }, revokedEvidenceIds: new Set() };
  const signed = (role, scope, statement, keyId = 'reviewer') => ({
    keyId,
    signature: sign(null, Buffer.from(signedPayload(role, scope, statement)), keyId === 'user' ? userKey.privateKey : reviewerKey.privateKey).toString('base64'),
  });
  const probe = {
    id: 'AQS-ISOLATED', version: 'v1', slug: 'isolated-slide', category: 'pool-slides', subtypes: [],
    scenes: ['family-leisure-venue', 'compact-water-park-projects'], availability: 'confirmed', publicationStatus: 'published', priceStatus: 'enquiry',
    updatedAt: '2026-01-01T00:00:00Z', source: 'isolated-test',
    translations: { en: { status: 'approved', name: 'Isolated product', summary: 'Test summary', description: 'Test description' } },
    specs: [{ label: 'Pending', status: 'to-confirm' }, { label: 'Verified', status: 'confirmed', value: 'Reviewed value', evidenceId: 'technical' }],
    image: { src: '/images/fixture.webp', alt: 'Test image', kind: 'illustration', approved: true, sha256: digest(imageBytes), rightsEvidenceId: 'rights' },
  };
  const evidence = ['supply', 'technical', 'rights', 'english'].map((id) => {
    const kind = id === 'rights' ? 'image-rights' : id === 'english' ? 'language' : id;
    const statement = { id, kind, versionId: 'immutable-v1', sha256: digest(Buffer.from(id)), issuedAt: '2025-12-31T00:00:00Z' };
    return { ...statement, signed: signed('evidence', id, statement) };
  });
  const contentDigest = productContentDigest(probe);
  const evidenceDigest = productEvidenceDigest(evidence);
  const review = (role, scope, evidenceRef) => {
    const statement = { reviewedBy: 'authorized-reviewer', reviewedAt: '2026-01-02T00:00:00Z', evidenceRef };
    return { ...statement, signed: signed(role, scope, { productId: probe.id, productVersion: probe.version, contentDigest, evidenceDigest, ...statement }) };
  };
  const releaseStatement = { approvedBy: 'user-final-approver', approvedAt: '2026-01-03T00:00:00Z', decisionRef: 'signed-test-decision' };
  const approval = {
    productId: probe.id, productVersion: probe.version, contentDigest, evidenceDigest, evidence,
    supply: review('supply', probe.id, 'supply'), facts: review('facts', probe.id, 'technical'),
    imageRights: review('image-rights', probe.id, 'rights'), languages: { en: review('language', `${probe.id}:en`, 'english') },
    release: { ...releaseStatement, signed: signed('final-release', probe.id, { productId: probe.id, productVersion: probe.version, contentDigest, evidenceDigest, ...releaseStatement }, 'user') },
  };
  const catalog = { ...productCatalog, products: [probe] };
  assert.deepEqual(validateProductCatalog(catalog, [approval], trust), []);
  assert.ok(approvalFor(probe, 'en', [approval], trust, '2026-01-04T00:00:00Z'));
  assert.deepEqual(publishedProducts(catalog, 'en', [approval], trust).map((item) => item.id), [probe.id]);
  assert.deepEqual(productsByCategory('pool-slides', 'en', catalog, [approval], trust).map((item) => item.id), [probe.id]);
  assert.deepEqual(productsByScene('family-leisure-venue', 'en', catalog, [approval], trust).map((item) => item.id), [probe.id]);
  assert.deepEqual(productsByScene('compact-water-park-projects', 'en', catalog, [approval], trust).map((item) => item.id), [probe.id]);
  assert.deepEqual(visibleProductSpecs(probe, 'en', catalog, [approval], trust), [{ label: 'Verified', value: 'Reviewed value' }]);
  assert.equal(productTranslation(probe, 'zh', catalog, [approval], trust), null);
  assert.equal(verifyProductImageBytes(probe, fixtureRoot), true);
  writeFileSync(imagePath, Buffer.from('isolated image fixture B'));
  assert.equal(verifyProductImageBytes(probe, fixtureRoot), false, 'Replacing bytes at the same image path fails');
  rmSync(imagePath);
  assert.equal(verifyProductImageBytes(probe, fixtureRoot), false, 'Missing image fails');

  for (const changed of [
    { ...probe, version: 'v2' },
    { ...probe, specs: [...probe.specs, { label: 'New fact', status: 'confirmed', value: 'Unapproved', evidenceId: 'technical' }] },
    { ...probe, translations: { en: { ...probe.translations.en, description: 'Changed' } } },
    { ...probe, image: { ...probe.image, sha256: digest(Buffer.from('changed')) } },
    { ...probe, id: 'FIXTURE-RENAMED' },
  ]) assert.equal(approvalFor(changed, 'en', [approval], trust), null);
  for (const bad of [
    { ...approval, release: { ...approval.release, approvedBy: 'self-filled-user' } },
    { ...approval, release: { ...approval.release, decisionRef: 'fabricated' } },
    { ...approval, supply: { ...approval.supply, reviewedBy: 'unknown' } },
    { ...approval, imageRights: review('image-rights', probe.id, 'supply') },
    { ...approval, evidence: approval.evidence.map((item) => item.id === 'technical' ? { ...item, versionId: 'same-file-new-version' } : item) },
    { ...approval, evidence: approval.evidence.map((item) => item.id === 'technical' ? { ...item, sha256: digest(Buffer.from('new bytes')) } : item) },
    { ...approval, evidence: approval.evidence.map((item) => item.id === 'rights' ? { ...item, expiresAt: '2026-01-02T00:00:00Z' } : item) },
  ]) assert.equal(approvalFor(probe, 'en', [bad], trust), null);
  assert.equal(approvalFor(probe, 'en', [approval], { ...trust, revokedEvidenceIds: new Set(['rights@immutable-v1']) }), null);
  assert.equal(approvalFor(probe, 'en', [approval], { ...trust, signers: {} }), null);
  assert.equal(approvalFor(probe, 'en', [approval], { ...trust, signers: { ...trust.signers,
    reviewer: { ...trust.signers.reviewer, activeUntil: '2026-01-03T00:00:00Z' } } }, '2026-01-04T00:00:00Z'), null);
  assert.deepEqual(publishedProducts(catalog, 'en', [approval]), [], 'Unsigned production trust cannot use fixture approval');
  assert.deepEqual(publishedProducts({ ...catalog, products: [{ ...probe, availability: 'candidate' }] }, 'en', [approval], trust), []);
  assert.match(validateProductCatalog({ ...catalog, products: [{ ...probe, scenes: ['unknown'] }] }).join(' '), /Unknown scene/);
  assert.match(validateProductCatalog({ ...catalog, products: [{ ...probe, slug: 'by-space' }] }).join(' '), /reserved/);
  assert.match(validateProductCatalog({ ...catalog, products: [{ ...probe, id: 'FIXTURE-RECORD' }] }).join(' '), /Fixture record/);

  const sources = { 'src/app/[locale]/products/page.tsx': digest(Buffer.from('page A')),
    'src/lib/metadata.ts': digest(Buffer.from('metadata A')) };
  const revision = 'isolated-release-1';
  const baseline = catalogReleaseManifest(catalog, [approval], trust, sources, revision);
  assert.deepEqual(baseline, catalogReleaseManifest(catalog, [approval], trust, sources, revision));
  assert.equal(Object.hasOwn(catalogSourceDigests, 'src/content/catalog-release-decision.ts'), false, 'The signed decision must not hash itself');
  assert.equal(Object.hasOwn(catalogSourceDigests, 'src/content/catalog-index.ts'), true, 'Gate code stays in the coverage map');
  assert.equal(Object.hasOwn(catalogSourceDigests, '.github/workflows/deploy.yml'), true, 'Deployment entry stays in the coverage map');
  assert.equal(Object.hasOwn(catalogSourceDigests, 'open-next.config.ts'), true, 'OpenNext config stays in the coverage map');
  const decision = { revision, manifestDigest: baseline.manifestDigest, approvedBy: 'user-final-approver',
    approvedAt: '2026-01-04T00:00:00Z', decisionRef: 'signed-catalog-test-decision' };
  const catalogRelease = { revision, approval: { ...decision, signed: signed('catalog-release', revision, decision, 'user') } };
  assert.equal(canIndexProductCatalog(catalogRelease, catalog, [approval], trust, sources), true);
  assert.equal(canIndexProductCatalog({ ...catalogRelease, approval: null }, catalog, [approval], trust, sources), false);
  assert.equal(canIndexProductCatalog(catalogRelease, catalog, [approval], { ...trust, signers: {} }, sources), false);
  assert.equal(canIndexProductCatalog({ ...catalogRelease, approval: { ...catalogRelease.approval, approvedBy: 'self-filled' } }, catalog, [approval], trust, sources), false);
  assert.equal(canIndexProductCatalog(catalogRelease, { ...catalog, categories: catalog.categories.map((item) => item.slug === 'pool-slides' ? { ...item, name: 'Renamed' } : item) }, [approval], trust, sources), false);
  assert.equal(canIndexProductCatalog(catalogRelease, { ...catalog, scenes: catalog.scenes.map((item) => item.slug === 'family-leisure-venue' ? { ...item, summary: 'Changed definition' } : item) }, [approval], trust, sources), false);
  assert.equal(canIndexProductCatalog(catalogRelease, { ...catalog, ui: { ...catalog.ui, en: { ...catalog.ui.en, landingIntro: 'Changed copy' } } }, [approval], trust, sources), false);
  assert.equal(canIndexProductCatalog(catalogRelease, catalog, [approval], trust, { ...sources, 'src/lib/metadata.ts': digest(Buffer.from('metadata B')) }), false);
  assert.equal(canIndexProductCatalog(catalogRelease, catalog, [approval], trust, { ...sources, 'src/app/[locale]/products/page.tsx': digest(Buffer.from('page B')) }), false);
  assert.equal(canIndexProductCatalog(catalogRelease, catalog, [approval], trust, { ...sources, 'src/app/[locale]/products/new-template.tsx': digest(Buffer.from('new file')) }), false);
  assert.equal(canIndexProductCatalog(catalogRelease, { ...catalog, products: [] }, [approval], trust, sources), false);
  assert.equal(canIndexProductCatalog(catalogRelease, { ...catalog, products: [{ ...probe, translations: { ...probe.translations,
    zh: { status: 'approved', name: '测试', summary: '测试', description: '测试' } } }] }, [approval], trust, sources), false);
  console.log('G2: isolated signed manifest, taxonomy, copy, source, language and withdrawal tests passed.');
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true });
}
console.log('G1: production gate and isolated signed evidence, file-byte and negative tests passed.');
