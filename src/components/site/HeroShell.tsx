'use client';

import Image from 'next/image';
import { useEffect, useRef, type ReactNode } from 'react';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';

type HeroShellProps = {
  /** Key art. Full-bleed from `lg` up, a band beneath the copy below it. */
  art: string;
  artAlt?: string;
  /** Visible disclosure so the artwork is never read as a delivered project. */
  caption?: string;
  /** Horizontal focal point for the narrow (band) crop, e.g. "68%". */
  mobilePosition?: string;
  priority?: boolean;
  children: ReactNode;
};

/**
 * Shared hero shell — the Phase 1 visual signature.
 *
 * Layout: from `lg` up the key art is a full-bleed layer behind a two-column
 * grid (copy left, art right). Below `lg` the art is recomposed into a band
 * that sits under the copy, so the subject stays visible and the headline is
 * never overlapped.
 *
 * Motion (all CSS, no animation framework):
 *   A. a slow shift in background light  (.hero-atmosphere)
 *   B. aqua contour trajectories           (inline SVG dash keyframes)
 *   C. a small pointer parallax on the art (CSS variables only)
 */
export function HeroShell({
  art,
  artAlt = '',
  caption,
  mobilePosition = '68%',
  priority = false,
  children,
}: HeroShellProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  // Layer C — pointer parallax. Written straight to CSS custom properties so
  // React never re-renders on pointer movement.
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
      className="relative isolate flex flex-col overflow-hidden bg-ink text-paper lg:grid lg:min-h-[100svh] lg:grid-cols-12 lg:content-center lg:gap-x-0 lg:gap-y-10 lg:px-[clamp(1.25rem,4vw,3.5rem)] lg:pb-[3rem] lg:pt-[5.5rem]"
    >
      {/* ---- Key art ------------------------------------------------------- */}
      <div className="relative order-2 h-[42svh] w-full shrink-0 lg:absolute lg:inset-0 lg:order-none lg:z-0 lg:h-auto">
        <div className="relative h-full w-full">
          <Image
            src={art}
            alt={artAlt}
            fill
            priority={priority}
            sizes="100vw"
            className="hero-art object-cover object-[var(--hero-pos)] lg:object-center"
            style={{ '--hero-pos': `${mobilePosition} center` } as React.CSSProperties}
          />

          {/* Scrim: vertical on mobile (art in a band below the copy),
              horizontal from lg (art behind the right half). */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,#0c1013_0%,rgba(12,16,19,0.45)_24%,rgba(12,16,19,0.16)_100%)] lg:bg-[linear-gradient(90deg,rgba(12,16,19,0.95)_0%,rgba(12,16,19,0.86)_34%,rgba(12,16,19,0.42)_62%,rgba(12,16,19,0.14)_100%)]"
          />
          <div aria-hidden="true" className="hero-atmosphere absolute inset-0" />
        </div>

        {caption ? (
          <div className="pointer-events-none absolute bottom-4 right-[clamp(1.25rem,4vw,3.5rem)]">
            <ImageDisclosure>{caption}</ImageDisclosure>
          </div>
        ) : null}
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

      {children}
    </section>
  );
}

