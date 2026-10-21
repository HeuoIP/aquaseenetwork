import { ImageResponse } from 'next/og';

export const alt = 'AQUASEE — Strategy. Creative Design. Project Realization.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0c1013',
          padding: '72px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'linear-gradient(120deg, rgba(12,16,19,0.95) 0%, rgba(12,16,19,0.55) 60%, rgba(47,138,129,0.35) 100%)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 30,
              letterSpacing: '0.34em',
              color: '#2f8a81',
              fontFamily: 'sans-serif',
            }}
          >
            AQUASEE
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 66,
              lineHeight: 1.08,
              color: '#eef1f2',
              fontFamily: 'serif',
              maxWidth: 960,
            }}
          >
            From Ambitious Ideas to Real-World Projects.
          </div>
          <div style={{ fontSize: 27, color: '#a7b0b6', fontFamily: 'sans-serif' }}>
            Strategy · Creative Design · Project Realization
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
