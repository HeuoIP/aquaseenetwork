import { cn } from '@/lib/cn';

/**
 * Explicit labelling of illustrative / conceptual material. Used wherever
 * artwork is shown so that a concept is never mistaken for a completed
 * project.
 */
export function DisclosureTag({
  children,
  className,
  tone = 'light',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.14em]',
        tone === 'dark' ? 'text-on-dark/80' : 'text-muted',
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'inline-block h-1.5 w-1.5 shrink-0 rounded-full',
          tone === 'dark' ? 'bg-accent-2' : 'bg-accent-2'
        )}
      />
      {children}
    </p>
  );
}
