/**
 * Layer B of the hero system — fine aqua contour trajectories drifting across
 * the key art. Decorative: hidden from assistive technology.
 */
export function Contours({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={
        className ??
        'pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[56%] lg:block'
      }
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
  );
}
