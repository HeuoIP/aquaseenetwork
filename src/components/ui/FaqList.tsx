import type { FaqItem } from '@/content/types';

/**
 * A question-and-answer block.
 *
 * Rendered as `<details>` so the answer is already in the document — a
 * crawler and an answer engine read the same HTML a visitor does, without
 * needing to click. The first answer is expanded by default.
 */
export function FaqList({ items, openFirst = true }: { items: FaqItem[]; openFirst?: boolean }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => (
        <details key={item.q} open={openFirst && i === 0} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium text-ink marker:hidden">
            <span>{item.q}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="mt-1.5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
            >
              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </summary>
          <p className="pb-6 pr-10 text-[0.9375rem] leading-[1.75] text-body">{item.a}</p>
        </details>
      ))}
    </div>
  );
}