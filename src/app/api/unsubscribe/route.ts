import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import {
  isSuppressed,
  isValidEmail,
  normaliseEmail,
  recordUnsubscribe,
} from '@/lib/unsubscribe';

export const runtime = 'nodejs';

/**
 * Unsubscribe endpoint.
 *
 * Accepts an address (GET ?email=… or POST {email}) and records a one-click
 * unsubscribe. Two independent channels are attempted:
 *
 *   1. Cloudflare KV (`UNSUBSCRIBE_KV` binding) — authoritative. The outbound
 *      pipeline checks this before every send.
 *   2. SMTP notice to the sender mailbox — a copy lands in the same inbox the
 *      pipeline reads, so the address also reaches the local blacklist.
 *
 * GET is supported because email clients and security scanners prefetch link
 * targets. A prefetch must never silently suppress a real person's mail, so
 * GET only confirms state and never writes.
 */
async function getKv() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env.UNSUBSCRIBE_KV;
  } catch {
    // Running outside the Workers runtime (e.g. `next dev` on a laptop).
    return undefined;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const raw = url.searchParams.get('email') ?? '';

  if (!isValidEmail(raw)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_email', message: 'A valid email address is required.' },
      { status: 400 },
    );
  }

  const email = normaliseEmail(raw);
  const kv = await getKv();
  const state = await isSuppressed({ UNSUBSCRIBE_KV: kv }, email);

  return NextResponse.json(
    {
      ok: true,
      email,
      suppressed: state.suppressed,
      ...(state.error ? { checkError: state.error } : {}),
    },
    {
      headers: {
        // This endpoint is queried by the outreach pipeline and by link
        // scanners. Neither must be served a challenge page.
        'Cache-Control': 'no-store',
      },
    },
  );
}

export async function POST(request: Request) {
  let email = '';

  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      const body = (await request.json()) as { email?: string };
      email = body.email ?? '';
    } else {
      const form = await request.formData();
      email = String(form.get('email') ?? '');
    }
  } catch {
    email = '';
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_email', message: 'A valid email address is required.' },
      { status: 400 },
    );
  }

  const address = normaliseEmail(email);
  const kv = await getKv();

  const result = await recordUnsubscribe(
    { UNSUBSCRIBE_KV: kv },
    address,
    (target) => notifyByEmail(target),
  );

  if (!result.ok) {
    // No durable channel worked. Say so honestly — a false success here
    // means someone keeps receiving mail they asked not to receive.
    return NextResponse.json(
      {
        ok: false,
        code: result.detail,
        message:
          'The unsubscribe could not be recorded automatically. Please reply to this email with "REMOVE" and we will action it within 7 business days.',
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    email: address,
    channel: result.detail,
    message: 'You have been unsubscribed.',
  });
}

/**
 * Deliver a copy of the unsubscribe request to the sender mailbox.
 *
 * The marketing pipeline can pick this up and add the address to its local
 * blacklist, which also protects against the KV binding being unavailable.
 */
async function notifyByEmail(email: string): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const toEmail = process.env.INQUIRY_TO_EMAIL ?? process.env.SMTP_USER;

  if (!host || !user || !pass || !toEmail) return false;

  try {
    const port = Number(process.env.SMTP_PORT ?? 465);
    const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;

    const transport = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await transport.sendMail({
      from: process.env.INQUIRY_FROM_EMAIL ?? 'website@aquasee.art',
      to: toEmail,
      subject: `Unsubscribe request — ${email}`,
      text: [
        'An address requested to stop receiving AQUASEE marketing email.',
        '',
        `Email: ${email}`,
        `Received: ${new Date().toISOString()}`,
        '',
        'Add this address to the outreach blacklist (_inbox/blacklist.txt) if it is not already recorded.',
      ].join('\n'),
    });

    return true;
  } catch {
    return false;
  }
}
