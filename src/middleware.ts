import { NextResponse, type NextRequest } from 'next/server';

/**
 * Canonical-host redirect.
 *
 * `www.aquasee.art` is the one public address for the site. The apex
 * `aquasee.art` permanently (308) redirects to it so search engines treat the
 * two as a single site and no inbound link loses its equity.
 *
 * `*.workers.dev` preview hosts and `localhost` are left untouched.
 */
const CANONICAL_HOST = 'www.aquasee.art';
const ROOT_DOMAIN = 'aquasee.art';

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') ?? '').split(':')[0].toLowerCase();

  if (host === ROOT_DOMAIN) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Static assets are served straight from the asset store and never need a
  // host rewrite, so files with an extension are excluded from the match.
  matcher: ['/((?!_next/static|_next/image|.*\\.[\\w]+$).*)'],
};
