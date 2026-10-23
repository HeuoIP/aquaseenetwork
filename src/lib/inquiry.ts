export const projectTypes = [
  'Resort or hotel development',
  'Theme park, attraction or leisure project',
  'Landscape, public realm or outdoor experience',
  'Custom installation or interior feature',
  'Design or engineering consultancy support',
  'Something else',
] as const;

export const serviceOptions = [
  'Strategy & Consulting',
  'Creative Design & R&D',
  'Supply Chain & Project Delivery',
  'Full project management',
  'Not sure yet — please advise',
] as const;

export const budgetOptions = [
  'Not yet defined',
  'Under US$50,000',
  'US$50,000 – 150,000',
  'US$150,000 – 500,000',
  'US$500,000 – 1.5M',
  'Over US$1.5M',
] as const;

export const timelineOptions = [
  'Not yet defined',
  'Under 3 months',
  '3 – 6 months',
  '6 – 12 months',
  'More than 12 months',
] as const;

export type InquiryPayload = {
  name: string;
  company: string;
  email: string;
  country: string;
  projectType: string;
  services: string[];
  description: string;
  budget?: string;
  timeline?: string;
  /** Hidden field — bots fill it, humans do not. */
  website?: string;
};

export type InquiryErrors = Partial<Record<keyof InquiryPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(input: Partial<InquiryPayload>): InquiryErrors {
  const errors: InquiryErrors = {};

  const name = (input.name ?? '').trim();
  if (name.length < 2) errors.name = 'Please enter your name.';

  const company = (input.company ?? '').trim();
  if (company.length < 2) errors.company = 'Please enter your company or organisation.';

  const email = (input.email ?? '').trim();
  if (!email) {
    errors.email = 'Please enter a business email address.';
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const country = (input.country ?? '').trim();
  if (country.length < 2) errors.country = 'Please enter your country or region.';

  const projectType = (input.projectType ?? '').trim();
  if (!projectType) errors.projectType = 'Please select a project type.';

  const services = Array.isArray(input.services) ? input.services.filter(Boolean) : [];
  if (services.length === 0) errors.services = 'Please select at least one required service.';

  const description = (input.description ?? '').trim();
  if (description.length < 20) {
    errors.description = 'Please describe the project in a little more detail (at least 20 characters).';
  } else if (description.length > 4000) {
    errors.description = 'Please keep the description under 4000 characters.';
  }

  return errors;
}

export function sanitiseInquiry(input: InquiryPayload): InquiryPayload {
  return {
    name: input.name.trim().slice(0, 120),
    company: input.company.trim().slice(0, 160),
    email: input.email.trim().slice(0, 200).toLowerCase(),
    country: input.country.trim().slice(0, 120),
    projectType: input.projectType.trim().slice(0, 120),
    services: input.services.map((s) => String(s).trim().slice(0, 80)).slice(0, 10),
    description: input.description.trim().slice(0, 4000),
    budget: input.budget?.trim().slice(0, 80) || undefined,
    timeline: input.timeline?.trim().slice(0, 80) || undefined,
  };
}

/** Builds a mailto fallback body so an inquiry is never lost when no delivery channel exists. */
export function buildMailtoBody(inquiry: InquiryPayload): string {
  const lines = [
    `Name: ${inquiry.name}`,
    `Company: ${inquiry.company}`,
    `Email: ${inquiry.email}`,
    `Country / region: ${inquiry.country}`,
    `Project type: ${inquiry.projectType}`,
    `Required services: ${inquiry.services.join(', ')}`,
    inquiry.budget ? `Indicative budget: ${inquiry.budget}` : null,
    inquiry.timeline ? `Expected timeline: ${inquiry.timeline}` : null,
    '',
    'Project description:',
    inquiry.description,
  ].filter((line): line is string => line !== null);

  return lines.join('\n');
}

/* --- HTML email body --------------------------------------------------- */

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

/**
 * Table-based HTML body for the inquiry email.
 *
 * Email clients ignore most modern CSS, so the layout is built from tables
 * with inline styles and brand colours. Every visitor-supplied value is
 * escaped — the description is free text and must never be able to inject
 * markup into the mailbox.
 */
export function buildInquiryHtml(inquiry: InquiryPayload, reference: string): string {
  const rows: Array<{ label: string; value: string }> = [
    { label: 'Name', value: inquiry.name },
    { label: 'Company', value: inquiry.company },
    { label: 'Email', value: inquiry.email },
    { label: 'Country / region', value: inquiry.country },
    { label: 'Project type', value: inquiry.projectType },
    { label: 'Required services', value: inquiry.services.join(', ') },
  ];

  if (inquiry.budget) rows.push({ label: 'Indicative budget', value: inquiry.budget });
  if (inquiry.timeline) rows.push({ label: 'Expected timeline', value: inquiry.timeline });

  const rowHtml = rows
    .map(
      (row) => `      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #e6e2d9;color:#5d6b6a;font-size:13px;white-space:nowrap;vertical-align:top;width:170px;">${escapeHtml(row.label)}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #e6e2d9;color:#0c1013;font-size:14px;">${escapeHtml(row.value)}</td>
      </tr>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f1eee7;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1eee7;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#fbfaf8;border:1px solid #e6e2d9;">
            <tr>
              <td style="padding:24px 32px;background:#0c1013;">
                <p style="margin:0;color:#8ad9cf;font:12px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.18em;text-transform:uppercase;">AQUASEE</p>
                <h1 style="margin:8px 0 0;color:#fbfaf8;font:24px/1.3 Georgia,'Times New Roman',serif;">New project inquiry</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;color:#5d6b6a;font:12px/1.6 Arial,Helvetica,sans-serif;border-bottom:1px solid #e6e2d9;">
                Reference <strong style="color:#0e5a54;">${escapeHtml(reference)}</strong> &middot; received ${escapeHtml(new Date().toISOString())}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
${rowHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 8px;">
                <p style="margin:0 0 8px;color:#5d6b6a;font:12px/1.6 Arial,Helvetica,sans-serif;letter-spacing:.1em;text-transform:uppercase;">Project description</p>
                <p style="margin:0;color:#0c1013;font:14px/1.7 Arial,Helvetica,sans-serif;white-space:pre-wrap;">${escapeHtml(inquiry.description)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 28px;">
                <p style="margin:0;color:#5d6b6a;font:13px/1.7 Arial,Helvetica,sans-serif;">
                  Reply directly to this email to reach ${escapeHtml(inquiry.name)} at
                  <a href="mailto:${escapeHtml(inquiry.email)}" style="color:#0e5a54;">${escapeHtml(inquiry.email)}</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
