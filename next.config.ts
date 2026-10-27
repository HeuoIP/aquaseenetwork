import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // The runtime optimiser was measured in production and found to be a
    // pass-through: every file came back byte for byte identical to the
    // source, at every requested width. So it cost a Worker invocation per
    // image and delivered nothing - and the `srcset` it advertised was a
    // fiction, because a browser asking for a 640px candidate was handed
    // the full-size file. The images in `public/images` are already WebP at
    // the size they are meant to be served, so they go out as they are -
    // the same bytes, served straight from the edge instead of the Worker.
    unoptimized: true,
  },
  experimental: {
    // The root layout lives inside the [locale] segment, which is the
    // documented way to build an internationalised App Router — but it means
    // there is no single top-level layout to hang a global 404 on. This flag
    // provides one (src/app/global-not-found.tsx).
    globalNotFound: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;