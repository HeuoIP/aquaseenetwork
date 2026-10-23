import Image from 'next/image';

export type StudyVisualData = {
  kind: 'image';
  src: string;
  alt: string;
};

type Props = {
  visual: StudyVisualData;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Renders the visual for a capability study. Every visual is a generated
 * concept render and is accompanied by a disclosure label, so it is never
 * read as a photograph of a delivered project.
 */
export function StudyVisual({
  visual,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  className,
}: Props) {
  return (
    <Image
      src={visual.src}
      alt={visual.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className ?? ''}`}
    />
  );
}
