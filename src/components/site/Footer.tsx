import Link from 'next/link';
import type { SiteConfig } from '@/content/types';
import { localePath, type Locale } from '@/lib/locale';

export function Footer({
  locale,
  site,
  audiences,
}: {
  locale: Locale;
  site: SiteConfig;
  audiences: readonly string[];
}) {
  const year = new Date().getFullYear();
  const href = (path: string) => localePath(locale, path);

  return (
    <footer className="bg-ink text-on-dark">
      <div className="shell">
        <div className="grid gap-12 border-b border-white/10 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <p className="font-display text-[1.5rem] leading-none tracking-[0.14em] text-on-dark-strong">
              {site.name}
            </p>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-on-dark">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-sm text-[0.875rem] leading-relaxed text-on-dark/70">
              {site.shortDescription}
            </p>
            <p className="mt-6 max-w-sm text-[0.8125rem] leading-relaxed text-on-dark/60">
              {site.marketsLine}
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-aqua">
              Capabilities
            </p>
            <ul className="mt-5 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={href(item.href)}
                    className="text-[0.9375rem] text-on-dark transition-colors duration-300 hover:text-on-dark-strong"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-aqua">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-on-dark transition-colors duration-300 hover:text-on-dark-strong"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="text-on-dark/75">{site.contact.location}</li>
              <li>
                <Link
                  href={href('/contact')}
                  className="text-on-dark transition-colors duration-300 hover:text-on-dark-strong"
                >
                  Contact page
                </Link>
              </li>
            </ul>

            <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-aqua">
              We work with
            </p>
            <ul className="mt-4 space-y-1.5 text-[0.8125rem] text-on-dark/70">
              {audiences.map((audience) => (
                <li key={audience}>{audience}</li>
              ))}
            </ul>

            {site.social.length > 0 ? (
              <>
                <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-aqua">
                  Elsewhere
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {site.social.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[0.9375rem] text-on-dark transition-colors duration-300 hover:text-on-dark-strong"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-4 py-8 text-[0.75rem] text-on-dark/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Imagery on this site is illustrative concept work unless stated otherwise.</span>
            <span aria-hidden="true">·</span>
            <a href="/llms.txt" className="transition-colors hover:text-on-dark-strong">
              Machine-readable summary
            </a>
            <span aria-hidden="true">·</span>
            <Link href={href('/contact')} className="transition-colors hover:text-on-dark-strong">
              {site.ctaLabel}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}