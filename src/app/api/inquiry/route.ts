import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  buildInquiryHtml,
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
 *   1. INQUIRY_WEBHOOK_URL  -> POST the inquiry to a webhook.
 *                              A Feishu / Lark group-bot hook is detected from
 *                              the URL and receives a chat message; anything
 *                              else receives a JSON payload (with flat aliases
 *                              so generic form services work too).
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
    .slice(2, 6)
    .toUpperCase()}`;

  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_TO_EMAIL;
  const fromEmail = process.env.INQUIRY_FROM_EMAIL ?? 'website@aquasee.art';
  const subject = `New project inquiry — ${inquiry.company} (${reference})`;
  const text = buildMailtoBody(inquiry);
  const html = buildInquiryHtml(inquiry, reference);

  // --- Option A: webhook ---------------------------------------------------
  if (webhookUrl) {
    try {
      // A Feishu / Lark group bot expects its own message envelope, not a
      // generic JSON body — detected from the hook URL unless overridden.
      const kind =
        process.env.INQUIRY_WEBHOOK_KIND ??
        (/open-apis\/bot\/v2\/hook/.test(webhookUrl) ? 'feishu' : 'generic');

      const chatText = [
        '📨 新询盘 / New website inquiry',
        '',
        `编号 Reference: ${reference}`,
        `姓名 Name: ${inquiry.name}`,
        `公司 Company: ${inquiry.company}`,
        `邮箱 Email: ${inquiry.email}`,
        `国家/地区 Country: ${inquiry.country}`,
        `项目类型 Project type: ${inquiry.projectType}`,
        `所需服务 Services: ${inquiry.services.join(', ')}`,
        inquiry.budget ? `预算 Budget: ${inquiry.budget}` : '',
        inquiry.timeline ? `周期 Timeline: ${inquiry.timeline}` : '',
        '',
        '项目描述 Description:',
        inquiry.description,
        '',
        '可直接按客户邮箱联系。',
      ]
        .filter(Boolean)
        .join('\n');

      const body =
        kind === 'feishu'
          ? { msg_type: 'text', content: { text: chatText } }
          : {
              reference,
              receivedAt: new Date().toISOString(),
              inquiry,
              // Flat aliases so generic form services (Formspree-style) map
              // the payload onto their own fields.
              name: inquiry.name,
              email: inquiry.email,
              company: inquiry.company,
              subject,
              message: text,
              ...(process.env.INQUIRY_WEBHOOK_ACCESS_KEY
                ? { access_key: process.env.INQUIRY_WEBHOOK_ACCESS_KEY }
                : {}),
            };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.INQUIRY_WEBHOOK_SECRET
            ? { 'X-Aquasee-Secret': process.env.INQUIRY_WEBHOOK_SECRET }
            : {}),
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        return NextResponse.json(
          {
            ok: false,
            code: 'delivery_failed',
            message: 'The inquiry could not be delivered. Please email us directly.',
            mailto: buildMailtoBody(inquiry),
          },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, reference, channel: kind === 'feishu' ? 'feishu' : 'webhook' });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          code: 'delivery_failed',
          message: 'The inquiry could not be delivered. Please email us directly.',
          mailto: buildMailtoBody(inquiry),
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
        html,
      });

      return NextResponse.json({ ok: true, reference, channel: 'email' });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          code: 'delivery_failed',
          message: 'The inquiry could not be delivered. Please email us directly.',
          mailto: buildMailtoBody(inquiry),
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
          html,
        }),
      });

      if (!response.ok) {
        return NextResponse.json(
          {
            ok: false,
            code: 'delivery_failed',
            message: 'The inquiry could not be delivered. Please email us directly.',
            mailto: buildMailtoBody(inquiry),
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
          mailto: buildMailtoBody(inquiry),
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



