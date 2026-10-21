'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ActionLink } from '@/components/ui/Action';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';

/**
 * Signature hero — "Idea → Structure → Realization".
 *
 * Four light layers, all CSS-driven so no animation framework is needed:
 *   A. a slow shift in background light (`.hero-atmosphere`)
 *   B. aqua contour trajectories traced across the key art (`.hero-trace`)
 *   C. a small pointer parallax on the key art (CSS variables only)
 *   D. a staggered text entrance (`.hero-enter`)
 *
 * The pointer layer writes straight to CSS custom properties, so React never
 * re-renders on pointer movement. Everything is disabled for reduced-motion
 * users and on touch devices.
 *
 * Layout: on mobile the key art is recomposed into a band that sits between
 * the copy and the summary row; from `md` up it becomes a full-bleed layer
 * behind a two-column grid.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);

  // Layer C — pointer parallax.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(hover: none)');
    if (reduce.matches || coarse.matches) return;

    const hasRaf = typeof window.requestAnimationFrame === 'function';
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      if (frame) return;
      const apply = () => {
        frame = 0;
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        root.style.setProperty('--hero-px', `${(-x * 12).toFixed(2)}px`);
        root.style.setProperty('--hero-py', `${(-y * 9).toFixed(2)}px`);
      };
      frame = hasRaf
        ? window.requestAnimationFrame(apply)
        : (window.setTimeout(apply, 16) as unknown as number);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (frame) {
        if (hasRaf) window.cancelAnimationFrame(frame);
        else window.clearTimeout(frame);
      }
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate flex flex-col overflow-hidden bg-ink text-paper lg:grid lg:min-h-[100svh] lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:content-center lg:gap-x-0 lg:gap-y-10 lg:px-[clamp(1.25rem,4vw,3.5rem)] lg:pb-[3rem] lg:pt-[5.5rem]"
    >
      {/* ---- Layer C: key art --------------------------------------------- */}
      <div className="relative order-2 h-[42svh] w-full shrink-0 lg:absolute lg:inset-0 lg:order-none lg:z-0 lg:h-auto">
        <div className="relative h-full w-full">
          <Image
            src="/images/aquasee-hero-lab-v2.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-art object-cover object-[68%_center] lg:object-center"
          />

          {/* Scrim: vertical on mobile (the art sits in a band below the copy),
              horizontal on desktop (the art sits behind the right half). */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,#0c1013_0%,rgba(12,16,19,0.45)_24%,rgba(12,16,19,0.16)_100%)] lg:bg-[linear-gradient(90deg,rgba(12,16,19,0.95)_0%,rgba(12,16,19,0.86)_34%,rgba(12,16,19,0.42)_62%,rgba(12,16,19,0.14)_100%)]"
          />
          <div aria-hidden="true" className="hero-atmosphere absolute inset-0" />
        </div>

        <div className="pointer-events-none absolute bottom-4 right-[clamp(1.25rem,4vw,3.5rem)]">
          <ImageDisclosure>Creative concept visualization</ImageDisclosure>
        </div>
      </div>

      {/* ---- Layer B: aqua contour trajectories ---------------------------- */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[56%] lg:block"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          className="hero-trace"
          d="M 60 214 C 330 150 520 330 960 250"
          stroke="#8ad9cf"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        <path
          className="hero-trace hero-trace-2"
          d="M 20 452 C 320 388 560 566 980 476"
          stroke="#2f8a81"
          strokeWidth="1"
          strokeOpacity="0.34"
        />
        <path
          className="hero-trace hero-trace-3"
          d="M 180 688 C 470 620 640 742 1000 654"
          stroke="#8ad9cf"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
        <circle cx="498" cy="352" r="2.5" fill="#8ad9cf" fillOpacity="0.6" />
        <circle cx="742" cy="512" r="2" fill="#2f8a81" fillOpacity="0.7" />
      </svg>

      {/* ---- Copy --------------------------------------------------------- */}
      <div className="order-1 px-[clamp(1.25rem,4vw,3.5rem)] pb-10 pt-[4.5rem] lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-0 lg:pt-0">
        <div className="max-w-2xl">
          <p className="hero-enter hero-enter-1 flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-aqua">
            <span aria-hidden="true" className="h-px w-10 bg-aqua/70" />
            Strategy &middot; Design &middot; Realization
          </p>

          <h1 className="hero-enter hero-enter-2 mt-7 font-display text-[length:var(--text-hero)] font-normal leading-[1.02] tracking-[-0.025em] text-on-dark-strong">
            From Ambitious Ideas
            <br />
            to Real-World <span className="display-italic text-aqua">Projects.</span>
          </h1>

          <p className="hero-enter hero-enter-3 mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-on-dark sm:text-lg">
            Strategic thinking, creative design, product development and coordinated delivery for
            distinctive spaces, experiences and bespoke installations.
          </p>

          <div className="hero-enter hero-enter-4 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ActionLink href="/contact" size="lg">
              Start a Project
            </ActionLink>
            <ActionLink href="/strategy" size="lg" variant="light" arrow={false}>
              Explore Our Capabilities
            </ActionLink>
          </div>
        </div>
      </div>

      {/* ---- Summary row --------------------------------------------------- */}
      <dl className="hero-enter hero-enter-5 order-3 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-white/12 px-[clamp(1.25rem,4vw,3.5rem)] pb-12 pt-8 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:px-0 lg:pb-0 lg:pt-0 sm:grid-cols-4">
        {[
          { k: 'Strategy', v: 'Brief to programme' },
          { k: 'Design', v: 'Concept to specification' },
          { k: 'Delivery', v: 'Source to site' },
          { k: 'Partners', v: 'Qualified network' },
        ].map((item) => (
          <div key={item.k}>
            <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-aqua">
              {item.k}
            </dt>
            <dd className="mt-2 text-[0.875rem] leading-snug text-on-dark">{item.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}




