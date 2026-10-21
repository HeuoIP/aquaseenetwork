import { cn } from '@/lib/cn';

type SectionHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  tone?: 'light' | 'dark';
};

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'left',
  className,
  tone = 'light',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      <p className={cn('eyebrow', tone === 'dark' ? 'text-aqua' : 'text-accent')}>{eyebrow}</p>
      <h2 className={cn('mt-5 text-title', tone === 'dark' && 'text-on-dark-strong')}>{title}</h2>
      {lede ? (
        <p
          className={cn(
            'mt-5 text-lede leading-relaxed',
            tone === 'dark' ? 'text-on-dark' : 'text-body'
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}


