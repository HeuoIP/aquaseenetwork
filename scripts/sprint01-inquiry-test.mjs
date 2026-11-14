import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';

const requests = [];
const webhook = createServer(async (request, response) => {
  let body = '';
  for await (const chunk of request) body += chunk;
  requests.push(JSON.parse(body));
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end('{"ok":true}');
});
await new Promise((resolve) => webhook.listen(0, '127.0.0.1', resolve));
const webhookPort = webhook.address().port;
const preview = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3102', '-H', '127.0.0.1'], {
  cwd: process.cwd(), env: { ...process.env, INQUIRY_WEBHOOK_URL: `http://127.0.0.1:${webhookPort}/inquiry`, INQUIRY_WEBHOOK_KIND: 'generic' },
  stdio: 'ignore',
});
const root = 'http://127.0.0.1:3102';
try {
  let ready = false;
  for (let i = 0; i < 40; i++) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    try { if ((await fetch(root + '/llms.txt')).ok) { ready = true; break; } } catch {}
  }
  assert.ok(ready, 'isolated preview started');
  const cases = {
    b2b_project: ['siteStage', 'productInterest', 'timeline', 'materialsAvailable'],
    b2c_product: ['poolStatus', 'poolDimensions', 'productInterest'],
    dealer_application: ['serviceMarkets', 'productLines', 'customerTypes', 'salesCapacity', 'trainingNeeds'],
    installation_partner_application: ['serviceArea', 'qualifications', 'insurance', 'experience', 'installationTypes', 'teamCapacity'],
  };
  for (const [leadType, fields] of Object.entries(cases)) {
    const payload = {
      leadType, name: 'Test Lead', company: leadType === 'b2c_product' ? '' : 'Test Company',
      email: 'lead@example.test', country: 'United States', projectType: leadType,
      services: [], description: 'Test inquiry for local route validation only.',
      details: Object.fromEntries(fields.map((key) => [key, 'Provided for local test'])),
      productId: 'unpublished-private-sku',
      attribution: { source: 'direct', landingPath: '/inquiry/test', locale: 'en' },
    };
    const response = await fetch(root + '/api/inquiry', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    });
    assert.equal(response.status, 200, `${leadType} response`);
    const receipt = await response.json();
    assert.equal(receipt.channel, 'webhook');
    const delivered = requests.at(-1);
    assert.equal(delivered.inquiry.leadType, leadType);
    assert.equal(delivered.inquiry.productId, undefined, 'unapproved product stripped');
    assert.equal(delivered.inquiry.attribution.landingPath, '/inquiry/test');
  }
  const invalid = await fetch(root + '/api/inquiry', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ leadType: 'dealer_application', name: 'Test Lead', company: 'Test Company', email: 'lead@example.test', country: 'US', description: 'Enough description to be accepted.' }),
  });
  assert.equal(invalid.status, 400, 'dealer details required');
  assert.equal(requests.length, 4, 'invalid payload not delivered');
  console.log('Sprint 01 inquiry test passed: 4 distinct lead types delivered to local mock webhook; B2C without company; invalid application rejected; unpublished SKU stripped; attribution retained.');
} finally {
  preview.kill();
  await new Promise((resolve) => webhook.close(resolve));
}

const noChannel = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3103', '-H', '127.0.0.1'], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    INQUIRY_WEBHOOK_URL: '', SMTP_HOST: '', SMTP_USER: '', SMTP_PASS: '',
    RESEND_API_KEY: '', INQUIRY_TO_EMAIL: '',
  },
  stdio: 'ignore',
});
try {
  let ready = false;
  for (let i = 0; i < 40; i++) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    try { if ((await fetch('http://127.0.0.1:3103/llms.txt')).ok) { ready = true; break; } } catch {}
  }
  assert.ok(ready, 'no-channel preview started');
  const response = await fetch('http://127.0.0.1:3103/api/inquiry', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      leadType: 'b2c_product', name: 'Test Lead', company: '',
      email: 'lead@example.test', country: 'United States', projectType: 'b2c_product',
      services: [], description: 'A private pool inquiry for fallback testing.',
      details: { poolStatus: 'Existing', poolDimensions: 'Unsure', productInterest: 'Pool Shade' },
    }),
  });
  assert.equal(response.status, 503);
  const result = await response.json();
  assert.equal(result.code, 'delivery_not_configured');
  assert.match(result.mailto, /Lead type: b2c_product/);
  console.log('No-channel fallback passed: no false success, explicit 503 and prepared email text.');
} finally {
  noChannel.kill();
}
