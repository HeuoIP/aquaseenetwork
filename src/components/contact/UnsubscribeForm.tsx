'use client';

import { useEffect, useState } from 'react';

type Status = 'idle' | 'submitting' | 'done' | 'error';

export function UnsubscribeForm({ initialEmail = '' }: { initialEmail?: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (initialEmail) setEmail(initialEmail);
  }, [initialEmail]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        code?: string;
      };

      if (!response.ok || !data.ok) {
        setStatus('error');
        setMessage(
          data.message ??
            'The request could not be completed. Please reply to the email with "REMOVE".',
        );
        return;
      }

      setStatus('done');
      setMessage(data.message ?? 'You have been unsubscribed.');
    } catch {
      setStatus('error');
      setMessage(
        'The request could not be sent. Please reply to the email with "REMOVE" and we will action it within 7 business days.',
      );
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-sm border border-line bg-sand p-7" role="status">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
          Confirmed
        </p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink">{message}</p>
        <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">
          If further email arrives from us, reply with &quot;REMOVE&quot; and we will action it within
          7 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-line bg-sand p-7">
      <label htmlFor="unsubscribe-email" className="block text-[0.9375rem] leading-relaxed text-ink">
        Email address
      </label>
      <input
        id="unsubscribe-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="name@company.com"
        className="mt-3 w-full rounded-xs border border-line-2 bg-paper px-4 py-3 text-[0.9375rem] text-ink placeholder:text-faint focus:border-accent focus:outline-none"
      />

      {status === 'error' && message ? (
        <p className="mt-4 text-[0.8125rem] leading-relaxed text-[#a32d2d]" role="alert">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 inline-flex items-center justify-center rounded-xs bg-accent px-7 py-3 text-[0.875rem] font-medium tracking-[0.06em] text-white transition-colors hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Submitting…' : 'Unsubscribe'}
      </button>
    </form>
  );
}
