'use client';

import { useMemo, useRef, useState } from 'react';
import {
  budgetOptions,
  projectTypes,
  serviceOptions,
  timelineOptions,
  type InquiryErrors,
  type InquiryPayload,
} from '@/lib/inquiry';
import type { Locale } from '@/lib/locale';
import { cn } from '@/lib/cn';

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; reference: string; channel?: string }
  | { state: 'error'; message: string; code: string; mailto?: string };

const initial: InquiryPayload = {
  name: '',
  company: '',
  email: '',
  country: '',
  projectType: '',
  services: [],
  description: '',
  budget: '',
  timeline: '',
  website: '',
};

const fieldBase =
  'w-full rounded-sm border bg-paper px-4 py-3 text-[0.9375rem] text-ink transition-colors duration-200 placeholder:text-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent';

export function InquiryForm({ email, locale }: { email?: string; locale?: Locale }) {
  const contactEmail = email ?? 'victor@aquasee.art';
  const [values, setValues] = useState<InquiryPayload>(initial);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const summaryRef = useRef<HTMLDivElement>(null);

  const setField = <K extends keyof InquiryPayload>(key: K, value: InquiryPayload[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const toggleService = (option: string) => {
    setField(
      'services',
      values.services.includes(option)
        ? values.services.filter((s) => s !== option)
        : [...values.services, option]
    );
  };

  const mailtoHref = useMemo(() => {
    if (status.state !== 'error' || !status.mailto) return '';
    const subject = encodeURIComponent(`Project inquiry — ${values.company || values.name || 'New inquiry'}`);
    const body = encodeURIComponent(status.mailto);
    return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }, [status, values.company, values.name]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: 'submitting' });
    setErrors({});

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        ...values,
        attribution: {
          landingPath: typeof window !== 'undefined' ? window.location.pathname : undefined,
          campaign:
            typeof window !== 'undefined'
              ? new URLSearchParams(window.location.search).get('utm_source') ?? undefined
              : undefined,
          locale: locale ?? undefined,
        },
      }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setStatus({ state: 'success', reference: data.reference, channel: data.channel });
        return;
      }

      if (data.code === 'validation_failed' && data.errors) {
        setErrors(data.errors as InquiryErrors);
        setStatus({ state: 'idle' });
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }

      setStatus({
        state: 'error',
        message: data.message ?? 'Something went wrong while sending your inquiry.',
        code: data.code ?? 'unknown_error',
        mailto: data.mailto,
      });
    } catch {
      setStatus({
        state: 'error',
        message:
          'We could not reach the server. Please check your connection, or email us directly.',
        code: 'network_error',
      });
    }
  }

  if (status.state === 'success') {
    return (
      <div className="rounded-sm border border-line bg-paper p-8 lg:p-10">
        <span
          aria-hidden="true"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10.5l4 4 8-9"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="mt-6 text-[1.5rem]">Thank you — your brief is with us.</h2>
        <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-body">
          We have received your inquiry and will come back to you with an initial read on the
          project, the questions worth answering first, and a suggested way forward.
        </p>
        <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
              Reference
            </dt>
            <dd className="mt-2 font-mono text-[0.9375rem] text-ink">{status.reference}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
              Delivery
            </dt>
            <dd className="mt-2 text-[0.9375rem] text-ink">
              {status.channel === 'email'
                ? 'Delivered by email'
                : status.channel === 'webhook'
                  ? 'Delivered to our intake system'
                  : 'Received'}
            </dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={() => {
            setValues(initial);
            setStatus({ state: 'idle' });
          }}
          className="mt-8 text-[0.875rem] font-medium text-accent underline underline-offset-4"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const fieldError = (key: keyof InquiryPayload) =>
    errors[key] ? (
      <p id={`${key}-error`} className="mt-2 text-[0.8125rem] text-[#a5443a]">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-sm border border-line bg-paper p-7 lg:p-10">
      {status.state === 'error' ? (
        <div
          role="alert"
          className="mb-8 rounded-sm border border-[#e2c4bf] bg-[#fbf1ef] p-5"
        >
          <p className="text-[0.9375rem] font-medium text-[#8f3a30]">Your inquiry was not sent.</p>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-body">{status.message}</p>
          {mailtoHref ? (
            <a
              href={mailtoHref}
              className="mt-4 inline-flex h-10 items-center rounded-full bg-ink px-5 text-[0.8125rem] font-medium text-paper transition-colors hover:bg-accent"
            >
              Open in email client
            </a>
          ) : null}
          <a
            href={`mailto:${contactEmail}`}
            className="mt-4 ml-1 text-[0.8125rem] text-ink underline underline-offset-4"
          >
            {contactEmail}
          </a>
        </div>
      ) : null}

      <div
        ref={summaryRef}
        tabIndex={-1}
        className="sr-only"
        aria-live="polite"
      >
        {status.state === 'submitting' ? 'Sending your inquiry.' : ''}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-[0.8125rem] font-medium text-ink">
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={cn(fieldBase, 'mt-2', errors.name ? 'border-[#c99a92]' : 'border-line')}
          />
          {fieldError('name')}
        </div>

        <div>
          <label htmlFor="company" className="block text-[0.8125rem] font-medium text-ink">
            Company <span className="text-accent">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            value={values.company}
            onChange={(e) => setField('company', e.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className={cn(fieldBase, 'mt-2', errors.company ? 'border-[#c99a92]' : 'border-line')}
          />
          {fieldError('company')}
        </div>

        <div>
          <label htmlFor="email" className="block text-[0.8125rem] font-medium text-ink">
            Business email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(fieldBase, 'mt-2', errors.email ? 'border-[#c99a92]' : 'border-line')}
          />
          {fieldError('email')}
        </div>

        <div>
          <label htmlFor="country" className="block text-[0.8125rem] font-medium text-ink">
            Country / region <span className="text-accent">*</span>
          </label>
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
            required
            value={values.country}
            onChange={(e) => setField('country', e.target.value)}
            aria-invalid={Boolean(errors.country)}
            aria-describedby={errors.country ? 'country-error' : undefined}
            className={cn(fieldBase, 'mt-2', errors.country ? 'border-[#c99a92]' : 'border-line')}
          />
          {fieldError('country')}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="projectType" className="block text-[0.8125rem] font-medium text-ink">
            Project type <span className="text-accent">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            value={values.projectType}
            onChange={(e) => setField('projectType', e.target.value)}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? 'projectType-error' : undefined}
            className={cn(
              fieldBase,
              'mt-2 appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27 fill=%27none%27%3E%3Cpath d=%27M1 1.5L6 6.5L11 1.5%27 stroke=%27%237c858d%27 stroke-width=%271.4%27 stroke-linecap=%27round%27/%3E%3C/svg%3E")] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10',
              errors.projectType ? 'border-[#c99a92]' : 'border-line'
            )}
          >
            <option value="">Select a project type…</option>
            {projectTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldError('projectType')}
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="text-[0.8125rem] font-medium text-ink">
            Required services <span className="text-accent">*</span>
          </legend>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {serviceOptions.map((option) => {
              const checked = values.services.includes(option);
              return (
                <label
                  key={option}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-[0.875rem] transition-colors duration-200',
                    checked
                      ? 'border-accent bg-accent-tint text-ink'
                      : 'border-line bg-paper text-body hover:border-line-2'
                  )}
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={option}
                    checked={checked}
                    onChange={() => toggleService(option)}
                    className="h-4 w-4 shrink-0 accent-[#0e5a54]"
                  />
                  {option}
                </label>
              );
            })}
          </div>
          {fieldError('services')}
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-[0.8125rem] font-medium text-ink">
            Project description <span className="text-accent">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={7}
            required
            value={values.description}
            onChange={(e) => setField('description', e.target.value)}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? 'description-error' : 'description-hint'}
            placeholder="What are you trying to build, where is it, and what stage are you at? Include the ambitions, the constraints and the timeline if you know it."
            className={cn(
              fieldBase,
              'mt-2 resize-y leading-relaxed',
              errors.description ? 'border-[#c99a92]' : 'border-line'
            )}
          />
          <p id="description-hint" className="mt-2 text-[0.8125rem] text-muted">
            {values.description.trim().length} characters — 20 minimum.
          </p>
          {fieldError('description')}
        </div>

        <div>
          <label htmlFor="budget" className="block text-[0.8125rem] font-medium text-ink">
            Estimated budget <span className="text-muted">(optional)</span>
          </label>
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(e) => setField('budget', e.target.value)}
            className={cn(
              fieldBase,
              'mt-2 appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27 fill=%27none%27%3E%3Cpath d=%27M1 1.5L6 6.5L11 1.5%27 stroke=%27%237c858d%27 stroke-width=%271.4%27 stroke-linecap=%27round%27/%3E%3C/svg%3E")] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10 border-line'
            )}
          >
            <option value="">Prefer not to say</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="block text-[0.8125rem] font-medium text-ink">
            Expected timeline <span className="text-muted">(optional)</span>
          </label>
          <select
            id="timeline"
            name="timeline"
            value={values.timeline}
            onChange={(e) => setField('timeline', e.target.value)}
            className={cn(
              fieldBase,
              'mt-2 appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27 fill=%27none%27%3E%3Cpath d=%27M1 1.5L6 6.5L11 1.5%27 stroke=%27%237c858d%27 stroke-width=%271.4%27 stroke-linecap=%27round%27/%3E%3C/svg%3E")] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10 border-line'
            )}
          >
            <option value="">Prefer not to say</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Honeypot — hidden from users, visible to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => setField('website', e.target.value)}
        />
      </div>

      <div className="mt-9 flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.8125rem] leading-relaxed text-muted">
          We use your details only to respond to this inquiry. See our privacy note below.
        </p>
        <button
          type="submit"
          disabled={status.state === 'submitting'}
          className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-8 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status.state === 'submitting' ? (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="animate-spin"
              >
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
                <path d="M14.5 8A6.5 6.5 0 008 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Sending…
            </>
          ) : (
            'Send inquiry'
          )}
        </button>
      </div>
    </form>
  );
}

