import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  buildMailtoBody,
  sanitiseInquiry,
  validateInquiry,
  type InquiryPayload,
} from '@/lib/inquiry';

export const runtime = 'nodejs';

/**
 * Inquiry endpoint.
 *
 * Delivery is intentionally explicit — the route never claims success unless a
 * real delivery channel is configured:
 *   1. INQUIRY_WEBHOOK_URL  -> POST the payload as JSON to a webhook.
 *   2. SMTP_*               -> send the email through any SMTP server
 *                              (Feishu Mail / Lark Mail, Tencent Exmail,
 *                              Alibaba Mail, Resend SMTP, Gmail SMTP, ...).
 *   3. RESEND_API_KEY       -> send an email through the Resend HTTP API.
 *   4. None                 -> return 503 `delivery_not_configured` so the form
 *                              can present an honest state plus a mailto
 *                              fallback with the message pre-filled.
 */
export async function POST(request: Request) {
  let payload: Partial<InquiryPayload>;

  try {
    payload = (await request.json()) as Partial<InquiryPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_json', message: 'The request body could not be read.' },
      { status: 400 }
    );
  }

  // Honeypot: silently accept and drop submissions from bots.
  if (payload.website) {
    return NextResponse.json({ ok: true, reference: 'AQS-' + Date.now().toString(36).toUpperCase() });
  }

  const errors = validateInquiry(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, code: 'validation_failed', message: 'Please review the highlighted fields.', errors },
      { status: 400 }
    );
  }

  const inquiry = sanitiseInquiry(payload as InquiryPayload);
  const reference = `AQS-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.random()
    .toString(36)
    .slice(0, 4)
    .toUpperCase()}`;

  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_TO_EMAIL;
  const fromEmail = process.env.INQUIRY_FROM_EMAIL ?? 'website@aquasee.art';
  const subject = `New project inquiry — ${inquiry.company} (${reference})`;
  const text = buildMailtoBody(inquiry);

  // --- Option A: generic webhook -----------------------------------------
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.INQUIRY_WEBHOOK_SECRET
            ? { 'X-Aquasee-Secret': process.env.INQUIRY_WEBHOOK_SECRET }
            : {}),
        },
        body: JSON.stringify({ reference, receivedAt: new Date().toISOString(), inquiry }),
      });

      if (!response.ok) {
        return NextResponse.json(
          {
            ok: false,
            code: 'delivery_failed',
            message: 'The inquiry could not be delivered. Please email us directly.',
          },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, reference, channel: 'webhook' });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          code: 'delivery_failed',
          message: 'The inquiry could not be delivered. Please email us directly.',
        },
        { status: 502 }
      );
    }
  }

  // --- Option B: SMTP (Feishu Mail and any other SMTP provider) -----------
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass && toEmail) {
    try {
      const port = Number(process.env.SMTP_PORT ?? 465);
      const secure = process.env.SMTP_SECURE
        ? process.env.SMTP_SECURE === 'true'
        : port === 465;

      const transport = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transport.sendMail({
        from: fromEmail,
        to: toEmail,
        replyTo: inquiry.email,
        subject,
        text,
      });

      return NextResponse.json({ ok: true, reference, channel: 'email' });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          code: 'delivery_failed',
          message: 'The inquiry could not be delivered. Please email us directly.',
        },
        { status: 502 }
      );
    }
  }

  // --- Option C: Resend email ---------------------------------------------
  if (resendKey && toEmail) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: inquiry.email,
          subject,
          text,
        }),
      });

      if (!response.ok) {
        return NextResponse.json(
          {
            ok: false,
            code: 'delivery_failed',
            message: 'The inquiry could not be delivered. Please email us directly.',
          },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, reference, channel: 'email' });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          code: 'delivery_failed',
          message: 'The inquiry could not be delivered. Please email us directly.',
        },
        { status: 502 }
      );
    }
  }

  // --- Option D: no delivery channel configured ---------------------------
  return NextResponse.json(
    {
      ok: false,
      code: 'delivery_not_configured',
      message:
        'No inquiry delivery channel is configured on this deployment, so nothing has been sent yet. Please use the email link below and your message will be prepared for you.',
      mailto: buildMailtoBody(inquiry),
      reference,
    },
    { status: 503 }
  );
}
