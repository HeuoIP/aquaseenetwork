/**
 * The AQUASEE mark.
 *
 * Three nested arcs - the contour lines that already drift across the hero
 * art, drawn as the mark itself: the site read as lines on a plan. It is
 * drawn inline so that it inherits the colour of the text beside it and
 * costs no request.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="3 10.8 26 21"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.5 21.5c3.6-6.2 6.8-9.3 11.5-9.3s7.9 3.1 11.5 9.3" />
      <path d="M8 26.2c2.9-4.7 5.4-7 8-7s5.1 2.3 8 7" />
      <path d="M12 30.2c1.7-2.8 3.1-4.2 4-4.2s2.3 1.4 4 4.2" />
    </svg>
  );
}
