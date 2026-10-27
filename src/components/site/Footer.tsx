import Link from 'next/link';
import { SocialIcon } from '@/components/site/SocialIcon';
import type { SiteConfig, UiStrings } from '@/content/types';
import { localePath, type Locale } from '@/lib/locale';

export function Footer({
  locale,
  site,
  audiences,
  ui,
}: {
  locale: Locale;
  site: SiteConfig;
  audiences: readonly string[];
  ui: UiStrings;
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
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-aqua">{ui.global.capabilities}</p>
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
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-aqua">{ui.global.contact}</p>
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
                >{ui.global.contactPage}</Link>
              </li>
            </ul>

            {site.social.length > 0 ? (
              <ul className="mt-5 flex flex-wrap items-center gap-2.5">
                {site.social.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      title={item.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-on-dark transition-colors duration-300 hover:border-aqua/60 hover:text-on-dark-strong"
                    >
                      <SocialIcon name={item.icon} className="h-5 w-5" />
                      <span className="sr-only">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-aqua">{ui.global.weWorkWith}</p>
            <ul className="mt-4 space-y-1.5 text-[0.8125rem] text-on-dark/70">
              {audiences.map((audience) => (
                <li key={audience}>{audience}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-8 text-[0.75rem] text-on-dark/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {ui.global.rights}
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{ui.global.imageryNote}</span>
            <span aria-hidden="true">·</span>
            <a href="/llms.txt" className="transition-colors hover:text-on-dark-strong">{ui.global.machineSummary}</a>
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