import Image from 'next/image';
import { Art } from './Art';

export type StudyVisualData =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'diagram'; art: 'strata' | 'arc' | 'stack' | 'grid' | 'flow' | 'module' };

type Props = {
  visual: StudyVisualData;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Renders the visual for a capability study — either a concept render
 * (always accompanied by a disclosure label) or an abstract diagram.
 */
export function StudyVisual({ visual, sizes = '(min-width: 1024px) 50vw, 100vw', priority, className }: Props) {
  if (visual.kind === 'image') {
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

  return <Art variant={visual.art} className={className} />;
}
