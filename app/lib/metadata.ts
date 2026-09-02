import type { Metadata } from 'next';
import { site } from '@/app/data/site';

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: CreatePageMetadataOptions): Metadata {
  const canonicalUrl = new URL(path, site.url).toString();
  const fullTitle = `${title} — ${site.seo.siteName}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: 'website',
      locale: site.seo.locale,
      url: canonicalUrl,
      siteName: site.seo.siteName,
      title: fullTitle,
      description,
    },

    twitter: {
      card: 'summary',
      title: fullTitle,
      description,
    },

    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: true,
          },
        }
      : {}),
  };
}