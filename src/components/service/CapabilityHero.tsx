import { HeroShell } from '@/components/site/HeroShell';
import { ActionLink } from '@/components/ui/Action';
import type { ServiceDetail, UiStrings } from '@/content/types';

/**
 * Capability page hero — the same visual signature as the homepage, driven by
 * the service entry in the content layer.
 */
export function CapabilityHero({ service, ui }: { service: ServiceDetail; ui: UiStrings }) {
  return (
    <HeroShell
      art={service.visual.src}
      artAlt={service.visual.alt}
      caption={service.visualCaption}
      mobilePosition={service.mobilePosition}
      priority
    >
      <div className="order-1 px-[clamp(1.25rem,4vw,3.5rem)] pb-10 pt-[4.5rem] lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-0 lg:pt-0">
        <p className="hero-enter hero-enter-1 flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-aqua">
          <span aria-hidden="true" className="h-px w-10 bg-aqua/70" />
          {ui.global.capability} {service.index}
        </p>

        <h1 className="hero-enter hero-enter-2 mt-7 font-display text-[length:var(--text-cap)] font-normal leading-[1.03] tracking-[-0.025em] text-on-dark-strong">
          {service.title}
        </h1>

        <p className="hero-enter hero-enter-3 mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-on-dark sm:text-lg">
          {service.lede}
        </p>

        <div className="hero-enter hero-enter-4 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ActionLink href="/contact" size="lg">
            {service.ctaLabel ?? ui.global.startProject}
          </ActionLink>
          <ActionLink href="#activities" size="lg" variant="light" arrow={false}>{ui.service.seeCoverage}</ActionLink>
        </div>
      </div>
    </HeroShell>
  );
}