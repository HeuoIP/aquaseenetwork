import { cn } from '@/lib/cn';

/**
 * Hero composition — an abstract, brand-derived mark built from layered
 * wave strata and a rising arc. Deliberately non-photographic: it states
 * the brand idea rather than illustrating an unbuilt project.
 */
export function HeroArt({ className }: { className?: string }) {
  const arcs = [110, 170, 230, 290, 350, 410];
  return (
    <svg
      viewBox="0 0 900 760"
      preserveAspectRatio="xMidYMid slice"
      className={cn('block h-full w-full', className)}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="hero-frame">
          <rect x="0" y="0" width="900" height="760" />
        </clipPath>
      </defs>

      <g clipPath="url(#hero-frame)">
        <rect width="900" height="760" fill="#0c1013" />

        {/* wave strata */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M0 ${150 + i * 92} C 220 ${110 + i * 92}, 430 ${210 + i * 86}, 900 ${140 + i * 92} L 900 ${190 + i * 92} C 430 ${260 + i * 86}, 220 ${160 + i * 92}, 0 ${200 + i * 92} Z`}
            fill={i % 3 === 0 ? '#2f8a81' : '#e9e5dc'}
            opacity={i % 3 === 0 ? 0.34 : 0.1 + i * 0.012}
          />
        ))}

        {/* rising arcs */}
        <g transform="translate(450 780)">
          {arcs.map((r, i) => (
            <path
              key={r}
              d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`}
              fill="none"
              stroke={i % 2 === 0 ? '#0e5a54' : '#2f8a81'}
              strokeOpacity={i % 2 === 0 ? 0.85 : 0.45}
              strokeWidth={i % 2 === 0 ? 2.2 : 1}
            />
          ))}
        </g>

        {/* single accent marker */}
        <circle cx="450" cy="392" r="7" fill="#2f8a81" />
      </g>
    </svg>
  );
}
