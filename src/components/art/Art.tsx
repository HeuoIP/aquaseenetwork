import { cn } from '@/lib/cn';

export type ArtVariant =
  | 'strata'
  | 'arc'
  | 'stack'
  | 'grid'
  | 'flow'
  | 'module';

const INK = '#0c1013';
const ACCENT = '#0e5a54';
const ACCENT_2 = '#2f8a81';
const SAND = '#e9e5dc';
const SAND_2 = '#d2cec5';
const PAPER = '#fbfaf8';

type ArtProps = {
  variant: ArtVariant;
  className?: string;
  /** Renders the composition on the light paper ground instead of the dark ground. */
  light?: boolean;
  title?: string;
};

function Strata({ light }: { light: boolean }) {
  const bands = [
    { y: 150, h: 26, o: 0.95, c: ACCENT },
    { y: 196, h: 8, o: 0.55, c: ACCENT_2 },
    { y: 232, h: 44, o: 0.28, c: ACCENT },
    { y: 300, h: 12, o: 0.7, c: light ? SAND_2 : SAND },
    { y: 336, h: 60, o: 0.16, c: light ? ACCENT : ACCENT_2 },
    { y: 424, h: 18, o: 0.45, c: light ? ACCENT_2 : ACCENT_2 },
    { y: 470, h: 90, o: 0.1, c: light ? ACCENT : PAPER },
  ];
  return (
    <g>
      {bands.map((b, i) => (
        <path
          key={i}
          d={`M0 ${b.y} C 180 ${b.y - 34 - i * 3}, 420 ${b.y + 26 + i * 4}, 800 ${b.y - 14} L 800 ${b.y + b.h} C 420 ${b.y + b.h + 26 + i * 4}, 180 ${b.y + b.h - 34 - i * 3}, 0 ${b.y + b.h} Z`}
          fill={b.c}
          opacity={b.o}
        />
      ))}
    </g>
  );
}

function Arc({ light }: { light: boolean }) {
  const radii = [70, 130, 190, 250, 310, 370, 430];
  return (
    <g transform="translate(400 620)">
      {radii.map((r, i) => (
        <path
          key={r}
          d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`}
          fill="none"
          stroke={i % 3 === 0 ? ACCENT : light ? SAND_2 : SAND}
          strokeOpacity={i % 3 === 0 ? 0.9 : 0.38}
          strokeWidth={i % 3 === 0 ? 3 : 1.5}
        />
      ))}
      <circle cx="0" cy="0" r="22" fill={ACCENT} opacity="0.9" />
      <circle cx="0" cy="-190" r="9" fill={ACCENT_2} opacity="0.9" />
    </g>
  );
}

function Stack({ light }: { light: boolean }) {
  const layers = [
    { y: 180, o: 0.9, c: ACCENT },
    { y: 260, o: 0.5, c: ACCENT_2 },
    { y: 340, o: 0.75, c: light ? SAND_2 : SAND },
    { y: 420, o: 0.35, c: ACCENT },
    { y: 500, o: 0.6, c: light ? ACCENT : ACCENT_2 },
  ];
  return (
    <g transform="translate(400 300)">
      {layers.map((l, i) => (
        <g key={l.y} transform={`translate(0 ${l.y - 300})`}>
          <path
            d={`M 0 -150 L 260 -60 L 0 30 L -260 -60 Z`}
            fill={l.c}
            opacity={l.o}
          />
          <path
            d={`M -260 -60 L 0 30 L 0 40 L -260 -50 Z`}
            fill={INK}
            opacity={light ? 0.06 : 0.25}
          />
          <path d={`M 260 -60 L 0 30 L 0 40 L 260 -50 Z`} fill={INK} opacity={0.16} />
        </g>
      ))}
    </g>
  );
}

function GridArt({ light }: { light: boolean }) {
  const cols = 8;
  const rows = 6;
  const w = 800 / cols;
  const h = 600 / rows;
  const filled = new Set(['1-2', '2-2', '3-2', '3-3', '4-3', '5-3', '5-4', '6-4']);
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${c}-${r}`;
      const on = filled.has(key);
      cells.push(
        <rect
          key={key}
          x={c * w}
          y={r * h}
          width={w}
          height={h}
          fill={on ? (r < 3 ? ACCENT : ACCENT_2) : 'none'}
          stroke={on ? 'none' : light ? SAND_2 : SAND}
          strokeOpacity={on ? 1 : 0.28}
          strokeWidth={1}
        />
      );
    }
  }
  return <g>{cells}</g>;
}

function Flow({ light }: { light: boolean }) {
  const lines = [];
  for (let i = 0; i < 11; i++) {
    const y = 60 + i * 48;
    const amp = 34 + (i % 4) * 16;
    const phase = i * 28;
    lines.push(
      <path
        key={i}
        d={`M -20 ${y} C 160 ${y - amp}, 300 ${y + amp - phase * 0.1}, 460 ${y} S 720 ${y - amp * 0.8}, 820 ${y + 10}`}
        fill="none"
        stroke={i % 4 === 1 ? ACCENT : light ? SAND_2 : SAND}
        strokeOpacity={i % 4 === 1 ? 0.85 : 0.34}
        strokeWidth={i % 4 === 1 ? 2.4 : 1.2}
      />
    );
  }
  return (
    <g>
      {lines}
      <circle cx="452" cy="252" r="16" fill={ACCENT} opacity="0.92" />
      <circle cx="452" cy="252" r="30" fill="none" stroke={ACCENT_2} strokeOpacity="0.6" />
    </g>
  );
}

function Module({ light }: { light: boolean }) {
  const items = [];
  const accent = new Set([2, 6, 9, 13, 18, 21, 26, 27]);
  for (let i = 0; i < 30; i++) {
    const col = i % 6;
    const row = Math.floor(i / 6);
    const s = 52 + ((i * 37) % 30);
    items.push(
      <rect
        key={i}
        x={40 + col * 122}
        y={40 + row * 122}
        width={s}
        height={s}
        fill={accent.has(i) ? ACCENT : light ? SAND_2 : SAND}
        opacity={accent.has(i) ? 0.92 : 0.3}
      />
    );
  }
  return <g>{items}</g>;
}

const MAP: Record<ArtVariant, (p: { light: boolean }) => React.ReactElement> = {
  strata: Strata,
  arc: Arc,
  stack: Stack,
  grid: GridArt,
  flow: Flow,
  module: Module,
};

export function Art({ variant, className, light = false, title }: ArtProps) {
  const Drawing = MAP[variant];
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={cn('block h-full w-full', className)}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="800" height="600" fill={light ? PAPER : INK} />
      <Drawing light={light} />
    </svg>
  );
}
