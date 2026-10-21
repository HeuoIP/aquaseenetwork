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
