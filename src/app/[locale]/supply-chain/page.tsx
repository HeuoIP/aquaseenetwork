import type { Metadata } from 'next';
import { ServicePage } from '@/components/service/ServicePage';
import { getDictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/metadata';

const SLUG = 'supply-chain';

export async function generateMetadata({ params }: PageProps<'/[locale]/supply-chain'>): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const service = dict.services.find((s) => s.slug === SLUG) ?? dict.services[0];
  return pageMetadata({
    locale: locale as never,
    path: service.href,
    title: service.title,
    description: service.definition,
  });
}

export default async function CapabilityRoute({ params }: PageProps<'/[locale]/supply-chain'>) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const service = dict.services.find((s) => s.slug === SLUG) ?? dict.services[0];
  return (
      <ServicePage
        service={service}
        locale={locale as never}
        ui={dict.ui}
        labels={{ work: dict.ui.service.galleryWork, illustration: dict.ui.service.galleryIllustration }}
      />
    );
}