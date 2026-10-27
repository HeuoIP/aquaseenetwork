import { SocialIcon } from '@/components/site/SocialIcon';
import { ActionLink } from '@/components/ui/Action';
import type { HomeContent } from '@/content/types';
import type { SocialLink } from '@/content/types';

export function CtaBand({
  copy,
  email,
  social,
  label,
}: {
  copy: HomeContent['cta'];
  email: string;
  /** The channels we are reachable on. */
  social: SocialLink[];
  /** What the row of channels is called. */
  label: string;
}) {
  return (
    <section className="bg-accent-tint py-20 sm:py-24" id="contact-cta">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent">{copy.eyebrow}</p>
            <h2 className="mt-5 text-display">{copy.title}</h2>
            <p className="mt-5 max-w-xl text-lede leading-relaxed text-body">{copy.body}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <ActionLink href="/contact" size="lg">
              {copy.primary}
            </ActionLink>
            <ActionLink href={`mailto:${email}`} size="lg" variant="outline" arrow={false}>
              {email}
            </ActionLink>
          </div>
        </div>

        {social.length ? (
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-line pt-8">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
              {label}
            </p>
            <ul className="flex flex-wrap items-center gap-3">
              {social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <SocialIcon name={item.icon} className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}