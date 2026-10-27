'use client';

import { HeroShell } from '@/components/site/HeroShell';
import { ActionLink } from '@/components/ui/Action';
import type { HomeContent, UiStrings } from '@/content/types';

/**
 * Homepage hero — "Idea → Structure → Realization".
 *
 * The visual signature and its four motion layers live in `HeroShell`; this
 * component only supplies the homepage copy. The pointer parallax is written
 * to CSS custom properties, so React never re-renders on pointer movement.
 */
export function Hero({ copy, ui }: { copy: HomeContent['hero']; ui: UiStrings }) {
  return (
    <HeroShell
      art="/images/aquasee-hero-arrival-v1.webp"
      artAlt={copy.artAlt}
      caption={ui.home.heroCaption}
      mobilePosition="70%"
      priority
    >
      <div className="order-1 px-[clamp(1.25rem,4vw,3.5rem)] pb-10 pt-[4.5rem] lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-0 lg:pt-0">
        <div className="max-w-2xl">
          <p className="hero-enter hero-enter-1 flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-aqua">
            <span aria-hidden="true" className="h-px w-10 bg-aqua/70" />
            {copy.eyebrow}
          </p>

          <h1 className="hero-enter hero-enter-2 mt-7 font-display text-[length:var(--text-hero)] font-normal leading-[1.02] tracking-[-0.025em] text-on-dark-strong">
            {copy.titleTop}
            <br />
            {copy.titleBottom} <span className="display-italic text-aqua">{copy.titleAccent}</span>
          </h1>

          <p className="hero-enter hero-enter-3 mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-on-dark sm:text-lg">
            {copy.lede}
          </p>

          <div className="hero-enter hero-enter-4 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ActionLink href="/contact" size="lg">
              {copy.ctaPrimary}
            </ActionLink>
            <ActionLink href="/strategy" size="lg" variant="light" arrow={false}>
              {copy.ctaSecondary}
            </ActionLink>
          </div>
        </div>
      </div>

      <dl className="hero-enter hero-enter-5 order-3 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-white/12 px-[clamp(1.25rem,4vw,3.5rem)] pb-12 pt-8 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:px-0 lg:pb-0 lg:pt-0 sm:grid-cols-4">
        {copy.summary.map((item) => (
          <div key={item.k}>
            <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-aqua">
              {item.k}
            </dt>
            <dd className="mt-2 text-[0.875rem] leading-snug text-on-dark">{item.v}</dd>
          </div>
        ))}
      </dl>
    </HeroShell>
  );
}