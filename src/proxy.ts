import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, internalPath, shouldRewrite } from '@/lib/locale';

/**
 * Canonical-host redirect and language routing.
 *
 * Two jobs, in order:
 *
 *  1. `aquasee.art` permanently redirects to `www.aquasee.art`, so the two
 *     addresses are never treated as two sites.
 *
 *  2. Paths without a language prefix are rewritten internally to the English
 *     tree. The visitor (and the crawler) keeps the clean URL — `/strategy`,
 *     not `/en/strategy` — while the application serves it from a single
 *     locale-aware route tree. Prefixed URLs (`/zh/...`, `/ar/...`) pass
 *     through untouched.
 */
const CANONICAL_HOST = 'www.aquasee.art';
const ROOT_DOMAIN = 'aquasee.art';

export function proxy(request: NextRequest) {
  const host = (request.headers.get('host') ?? '').split(':')[0].toLowerCase();

  if (host === ROOT_DOMAIN) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  const { pathname } = request.nextUrl;
  if (shouldRewrite(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = internalPath(DEFAULT_LOCALE, pathname);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Static assets are served straight from the asset store and never need a
  // host rewrite, so files with an extension are excluded from the match.
  matcher: ['/((?!_next/static|_next/image|.*\\.[\\w]+$).*)'],
};