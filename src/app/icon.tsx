import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

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
          color: '#8ad9cf',
          fontSize: 20,
          fontFamily: 'sans-serif',
          letterSpacing: 2,
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
