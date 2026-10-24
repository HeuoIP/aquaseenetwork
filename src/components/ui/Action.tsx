'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/cn';
import { isLocale, localePath } from '@/lib/locale';

type Variant = 'primary' | 'outline' | 'light' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-tight transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-ink hover:shadow-[0_10px_30px_-12px_rgba(12,16,19,0.55)]',
  outline:
    'border border-line-2 text-ink hover:border-accent hover:text-accent bg-transparent',
  light:
    'border border-white/25 text-white hover:border-white/70 hover:bg-white/5',
  ghost: 'text-ink hover:text-accent',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-6 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-8 text-[0.9375rem]',
};

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
};

/**
 * The call-to-action link.
 *
 * It is a client component so it can read the active language from the route
 * and prefix internal links automatically. That means a page never has to
 * remember to localise its own calls to action.
 */
export function ActionLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  arrow = true,
}: ActionLinkProps) {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale && isLocale(params.locale) ? params.locale : 'en';

  const isExternal = /^https?:\/\//.test(href);
  const isAnchor = href.startsWith('#') || href.startsWith('mailto:');
  const target = isExternal || isAnchor ? href : localePath(locale, href);
  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      <span>{children}</span>
      {arrow ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
        >
          <path
            d="M2 8h12M9 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </>
  );

  if (isAnchor) {
    return (
      <a href={target} className={classes}>
        {inner}
      </a>
    );
  }

  if (isExternal) {
    return (
      <a href={target} className={classes} target="_blank" rel="noreferrer noopener">
        {inner}
      </a>
    );
  }

  return (
    <Link href={target} className={classes}>
      {inner}
    </Link>
  );
}