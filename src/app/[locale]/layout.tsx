import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Inter, Newsreader } from 'next/font/google';
import '../globals.css';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { JsonLd } from '@/components/site/JsonLd';
import { getDictionary } from '@/lib/dictionary';
import { organizationLd, websiteLd } from '@/lib/jsonld';
import { LOCALE_TAGS, PUBLISHED_LOCALES, isRtl, type Locale } from '@/lib/locale';
import { SITE_ORIGIN } from '@/lib/metadata';

/**
 * The root layout.
 *
 * It lives inside the `[locale]` segment — the approach the Next.js
 * documentation describes for internationalised routing — so a single
 * implementation renders every language and the `lang` / `dir` attributes are
 * always correct. English is served from the root paths by an internal
 * rewrite in `src/proxy.ts`, so visitors never see an `/en/` prefix.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED_LOCALES.map((locale) => ({ locale }));
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  display: 'swap',
  weight: ['400', '500'],
});
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  variable: '--font-plex-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: false,
});

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const tag = LOCALE_TAGS[locale as Locale] ?? 'en';

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: {
      default: `${dict.site.name} — ${dict.site.tagline}`,
      template: `%s — ${dict.site.name}`,
    },
    description: dict.site.shortDescription,
    applicationName: dict.site.name,
    authors: [{ name: dict.site.name }],
    keywords: [
      'consulting',
      'creative design',
      'product development',
      'R&D',
      'supply chain',
      'project delivery',
      'custom installations',
      'theme park development',
      'resort development',
      'play equipment specification',
      'public space installation',
    ],
    openGraph: {
      type: 'website',
      siteName: dict.site.name,
      title: `${dict.site.name} — ${dict.site.tagline}`,
      description: dict.site.shortDescription,
      url: SITE_ORIGIN,
      locale: tag.replace('-', '_'),
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${dict.site.name} — ${dict.site.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dict.site.name} — ${dict.site.tagline}`,
      description: dict.site.shortDescription,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: '#fbfaf8',
  colorScheme: 'light',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const ui = dict.ui;
  const tag = LOCALE_TAGS[locale as Locale] ?? 'en';

  return (
    <html
      lang={tag}
      dir={isRtl(locale as Locale) ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${newsreader.variable} ${plexMono.variable} ${plexArabic.variable}`}
    >
      <body className="min-h-screen antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-paper"
        >{ui.global.skipToContent}</a>
        <Header locale={locale as Locale} nav={dict.site.nav} site={dict.site} ui={ui} />
        <main id="main">{children}</main>
        <Footer locale={locale as Locale} site={dict.site} audiences={dict.collaboration.audiences} ui={ui} />
        <JsonLd data={organizationLd(dict)} />
        <JsonLd data={websiteLd(dict)} />
      </body>
    </html>
  );
}