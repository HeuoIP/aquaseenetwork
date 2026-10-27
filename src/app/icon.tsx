import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/**
 * The tab icon carries the mark: the same three contour arcs that run
 * through the hero art, in the aqua of the site, on the ink ground.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0c1013',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="3.2 10.8 25.6 21"
          fill="none"
          stroke="#8ad9cf"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 21.5c3.6-6.2 6.8-9.3 11.5-9.3s7.9 3.1 11.5 9.3" />
          <path d="M8 26.2c2.9-4.7 5.4-7 8-7s5.1 2.3 8 7" />
          <path d="M12 30.2c1.7-2.8 3.1-4.2 4-4.2s2.3 1.4 4 4.2" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
