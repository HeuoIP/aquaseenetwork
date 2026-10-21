'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, site } from '@/content/site';
import { cn } from '@/lib/cn';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // The header switches between a transparent (over the dark hero) and a
    // solid treatment. Scroll events are not delivered in every environment
    // — background tabs, embedded browsers, automated navigation — and a
    // missed event would leave light text sitting on a light section, so the
    // state is also polled.
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    const timer = window.setInterval(update, 200);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Every page opens on a dark hero, so the transparent header sits on the
  // dark ground and needs light ink until the page scrolls.
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        solid
          ? 'border-b border-line bg-paper/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="shell">
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-baseline gap-2.5"
            aria-label={`${site.name} — home`}
          >
            <span
              className={cn(
                'font-display text-[1.375rem] leading-none tracking-[0.14em] transition-colors duration-500',
                solid ? 'text-ink' : 'text-on-dark-strong'
              )}
            >
              {site.name}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                'hidden h-px w-6 transition-all duration-500 group-hover:w-10 sm:block',
                solid ? 'bg-accent' : 'bg-aqua'
              )}
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'relative text-[0.875rem] transition-colors duration-300',
                  solid
                    ? isActive(item.href)
                      ? 'text-ink'
                      : 'text-body hover:text-ink'
                    : isActive(item.href)
                      ? 'text-on-dark-strong'
                      : 'text-on-dark hover:text-on-dark-strong'
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    isActive(item.href) ? 'scale-x-100' : 'scale-x-0'
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                'hidden h-10 items-center rounded-full px-5 text-[0.8125rem] font-medium transition-colors duration-500 sm:inline-flex',
                solid
                  ? 'bg-ink text-paper hover:bg-accent'
                  : 'border border-white/25 text-on-dark-strong hover:border-white/60 hover:bg-white/5'
              )}
            >
              Start a Project
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 lg:hidden',
                solid
                  ? 'border-line text-ink hover:border-line-2'
                  : 'border-white/25 text-on-dark-strong hover:border-white/60'
              )}
            >
              <span className="sr-only">Menu</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                {open ? (
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <path d="M2 6h14M2 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        className={cn(
          'overflow-hidden border-t border-line bg-paper transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden',
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav aria-label="Mobile" className="shell flex flex-col gap-1 py-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'border-b border-line/70 py-3.5 font-display text-2xl transition-colors',
                isActive(item.href) ? 'text-accent' : 'text-ink'
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper"
          >
            Start a Project
          </Link>
        </nav>
      </div>
    </header>
  );
}


