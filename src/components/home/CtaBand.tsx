import { SocialIcon } from '@/components/site/SocialIcon';
import { ActionLink } from '@/components/ui/Action';
import type { HomeContent } from '@/content/types';
import type { SocialLink } from '@/content/types';

export function CtaBand({
  copy,
  email,
  social,
}: {
  copy: HomeContent['cta'];
  email: string;
  /** The channels we are reachable on. */
  social: SocialLink[];
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
          <ul className="mt-10 flex flex-wrap items-center justify-end gap-2.5 lg:mt-12">
            {social.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  title={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line-2 text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  <SocialIcon name={item.icon} className="h-[1.375rem] w-[1.375rem]" />
                  <span className="sr-only">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}