'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
};

/* -------------------------------------------------------------------------- */
/* Shared viewport sweep                                                       */
/*                                                                             */
/* IntersectionObserver is the fast path, but it silently stops delivering      */
/* callbacks in some embedded / headless / background-tab environments. A single */
/* shared scroll listener is used as a backstop so revealed content can never   */
/* stay invisible — a serious failure mode for a business site.                 */
/* -------------------------------------------------------------------------- */

type Entry = { el: HTMLElement; reveal: () => void };

const registry = new Set<Entry>();
let frameQueued = false;
let pollTimer: number | undefined;

/**
 * Scheduling is done with setTimeout rather than requestAnimationFrame on
 * purpose: rAF is paused in background tabs and in some embedded browsers,
 * which would leave content stuck at opacity 0.
 */
const requestFrame: (cb: () => void) => void = (cb) => window.setTimeout(cb, 16);

function sweep() {
  frameQueued = false;
  const limit = window.innerHeight * 0.92;

  for (const entry of Array.from(registry)) {
    const rect = entry.el.getBoundingClientRect();
    // `rect.top < limit` (not "intersects the viewport") is deliberate: an
    // element the reader has already scrolled past must also count as
    // reached, otherwise a jump — an anchor link, End key, a restored scroll
    // position — would leave whole sections permanently invisible.
    if (rect.top < limit) {
      entry.reveal();
      registry.delete(entry);
    }
  }

  // Keep checking while anything is still below the fold. Scroll events are
  // not delivered reliably in every environment (background tabs, embedded
  // browsers, automated navigation), and a missed event would otherwise
  // leave content invisible for the rest of the session.
  if (registry.size > 0) {
    pollTimer = window.setTimeout(sweep, 400);
  } else if (pollTimer !== undefined) {
    window.clearTimeout(pollTimer);
    pollTimer = undefined;
  }
}

function onScroll() {
  if (frameQueued) return;
  frameQueued = true;
  requestFrame(sweep);
}

function register(entry: Entry) {
  registry.add(entry);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}

function unregister(entry: Entry) {
  registry.delete(entry);
  if (registry.size === 0) {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (pollTimer !== undefined) {
      window.clearTimeout(pollTimer);
      pollTimer = undefined;
    }
  }
}

/* -------------------------------------------------------------------------- */

export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(true);
      return;
    }

    const reveal = () => setShown(true);

    // Already within the viewport (deep link, restored scroll position, or a
    // page that was scrolled before hydration) — show immediately.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      reveal();
      return;
    }

    const entry: Entry = { el: node, reveal };
    register(entry);

    // Fast path: IntersectionObserver, when the environment supports it.
    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const item of entries) {
            if (item.isIntersecting) {
              reveal();
              observer?.disconnect();
              unregister(entry);
              return;
            }
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0 }
      );
      observer.observe(node);
    }

    return () => {
      observer?.disconnect();
      unregister(entry);
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn('reveal', shown && 'reveal-in', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}




