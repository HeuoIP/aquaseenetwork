'use client';

import { useState } from 'react';
import { buildMailtoBody, validateInquiry, type CommercialLeadType, type InquiryPayload } from '@/lib/inquiry';

const configurations: Record<CommercialLeadType, { title: string; intro: string; fields: readonly { key: string; label: string; hint: string }[] }> = {
  b2b_project: {
    title: 'Tell us about your project',
    intro: 'For hotels, venues, pool designers and commercial projects. We will review the setting before discussing a product or quote.',
    fields: [
      { key: 'siteStage', label: 'Site or project stage', hint: 'Planning, design, existing pool, or unsure' },
      { key: 'productInterest', label: 'Product interest', hint: 'Pool Slides, Outdoor Shade, water play, or unsure' },
      { key: 'timeline', label: 'Target timing', hint: 'Approximate dates or unsure' },
      { key: 'materialsAvailable', label: 'Plans or photos available?', hint: 'Yes, no, or unsure. We will request them later.' },
    ],
  },
  b2c_product: {
    title: 'Tell us about your pool',
    intro: 'For private pool and villa owners. A company name and business email are not required.',
    fields: [
      { key: 'poolStatus', label: 'Pool status', hint: 'Existing, being built, planned, or unsure' },
      { key: 'poolDimensions', label: 'Pool size known?', hint: 'Approximate size, not yet known, or unsure' },
      { key: 'productInterest', label: 'Product interest', hint: 'Pool Slides, Outdoor Shade, or unsure' },
    ],
  },
  dealer_application: {
    title: 'Introduce your business',
    intro: 'Tell us about your market and sales work. Submission is an application for review, not an appointment or exclusive agreement.',
    fields: [
      { key: 'serviceMarkets', label: 'Countries or markets served', hint: 'Your active sales markets' },
      { key: 'productLines', label: 'Current product lines', hint: 'Relevant ranges you sell today' },
      { key: 'customerTypes', label: 'Typical customers', hint: 'Pool trade, hospitality, residential, or other' },
      { key: 'salesCapacity', label: 'Sales and support capacity', hint: 'Team, channels and after-sales coverage' },
      { key: 'trainingNeeds', label: 'Training needs', hint: 'What support would you need?' },
    ],
  },
  installation_partner_application: {
    title: 'Tell us about your installation work',
    intro: 'We review local capability case by case. Applying does not confer installation authorisation or warranty responsibility.',
    fields: [
      { key: 'serviceArea', label: 'Service area', hint: 'Cities or regions covered' },
      { key: 'qualifications', label: 'Relevant licences or qualifications', hint: 'List them, or say none / unsure' },
      { key: 'insurance', label: 'Insurance status', hint: 'Coverage held, in progress, or unsure' },
      { key: 'experience', label: 'Relevant installation experience', hint: 'Pools, shade structures, water-play, or related work' },
      { key: 'installationTypes', label: 'Installation types you can handle', hint: 'Describe your capabilities' },
      { key: 'teamCapacity', label: 'Team and project capacity', hint: 'Typical crew and project size' },
    ],
  },
};

const inputClass = 'mt-2 w-full rounded-sm border border-line bg-paper px-4 py-3 text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent';

export function CommercialInquiryForm({ type, email = 'victor@aquasee.art' }: { type: CommercialLeadType; email?: string }) {
  const config = configurations[type];
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [message, setMessage] = useState('');
  const [reference, setReference] = useState('');
  const [fallback, setFallback] = useState('');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const details = Object.fromEntries(config.fields.map(({ key }) => [key, String(data.get(key) ?? '')]));
    const values: InquiryPayload = {
      leadType: type,
      name: String(data.get('name') ?? ''),
      company: String(data.get('company') ?? ''),
      email: String(data.get('email') ?? ''),
      country: String(data.get('country') ?? ''),
      projectType: type,
      services: [],
      details,
      description: String(data.get('description') ?? ''),
      website: String(data.get('website') ?? ''),
      attribution: {
        source: 'direct',
        landingPath: window.location.pathname,
        campaign: new URLSearchParams(window.location.search).get('utm_source') ?? undefined,
        locale: 'en',
      },
    };
    const errors = validateInquiry(values);
    if (Object.keys(errors).length) {
      setMessage(Object.values(errors)[0] ?? 'Please check the form.');
      return;
    }
    setStatus('sending');
    setMessage('');
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values),
      });
      const result = await response.json();
      if (response.ok && result.ok) {
        setReference(result.reference);
        setStatus('sent');
      } else {
        setFallback(result.mailto ?? buildMailtoBody(values));
        setMessage(result.message ?? 'Your inquiry was not sent.');
        setStatus('failed');
      }
    } catch {
      setFallback(buildMailtoBody(values));
      setMessage('Your inquiry was not sent. Please use the email link.');
      setStatus('failed');
    }
  }
  if (status === 'sent') return <div role="status" className="border border-accent bg-accent-tint p-8"><h2 className="font-display text-3xl">Received for review.</h2><p className="mt-3">Reference: {reference}. We will reply after reviewing the details. No product availability, partnership or installation status is confirmed by this receipt.</p></div>;
  return <div>
    <h2 className="font-display text-3xl">{config.title}</h2>
    <p className="mt-3 max-w-2xl text-body">{config.intro}</p>
    <form onSubmit={submit} className="mt-9 space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">Your name *<input className={inputClass} name="name" required minLength={2} maxLength={120} autoComplete="name" /></label>
        <label className="block text-sm font-medium">Email *<input className={inputClass} name="email" type="email" required maxLength={200} autoComplete="email" /></label>
        {type !== 'b2c_product' && <label className="block text-sm font-medium">Company *<input className={inputClass} name="company" required minLength={2} maxLength={160} autoComplete="organization" /></label>}
        <label className="block text-sm font-medium">Country or region *<input className={inputClass} name="country" required minLength={2} maxLength={120} autoComplete="country-name" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {config.fields.map(({ key, label, hint }) => <label key={key} className="block text-sm font-medium">{label} *<input className={inputClass} name={key} required maxLength={500} placeholder={hint} /></label>)}
      </div>
      <label className="block text-sm font-medium">Anything else we should know? *<textarea className={inputClass} name="description" required minLength={20} maxLength={4000} rows={6} placeholder="Tell us about the place, goals and questions. If something is unknown, say so." /></label>
      <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="text-sm leading-relaxed text-muted">We use these details only to respond to this inquiry. No files are uploaded here; if plans or photographs are useful, we will request them by reply. Sending this form does not create a sale or partnership.</p>
      {message && <p role="alert" className="border-l-2 border-accent bg-sand p-4">{message}</p>}
      {status === 'failed' && <a className="block text-accent underline underline-offset-4" href={`mailto:${email}?subject=${encodeURIComponent(type.replaceAll('_', ' ') + ' — AQUASEE')}&body=${encodeURIComponent(fallback)}`}>Open your email with these details →</a>}
      <button disabled={status === 'sending'} className="bg-accent px-7 py-3 text-paper disabled:opacity-60" type="submit">{status === 'sending' ? 'Sending…' : 'Send for review →'}</button>
    </form>
  </div>;
}
