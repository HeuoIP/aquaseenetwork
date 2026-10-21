import { cn } from '@/lib/cn';

/**
 * On-image disclosure. Rendered over every concept render so a reader can
 * never mistake an illustrative visual for a photograph of a delivered
 * project. The caller positions it inside a relatively-positioned frame.
 */
export function ImageDisclosure({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'pointer-events-none inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-ink/70 px-3 py-1.5 font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.14em] text-on-dark backdrop-blur-sm',
        className
      )}
    >
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" />
      {children}
    </span>
  );
}
