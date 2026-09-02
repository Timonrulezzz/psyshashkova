import './globals.css';
import type { Metadata } from 'next';
import { site } from '@/app/data/site';
import { Literata, Manrope } from 'next/font/google';

const literata = Literata({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-literata',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),

  title: {
    default: site.seo.defaultTitle,
    template: site.seo.titleTemplate,
  },

  description: site.seo.defaultDescription,

  applicationName: site.seo.siteName,

  openGraph: {
    type: 'website',
    locale: site.seo.locale,
    url: site.url,
    siteName: site.seo.siteName,
    title: site.seo.defaultTitle,
    description: site.seo.defaultDescription,
  },

  twitter: {
    card: 'summary',
    title: site.seo.defaultTitle,
    description: site.seo.defaultDescription,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="ru"
  className={`${literata.variable} ${manrope.variable}`}
>
  <body>{children}</body>
</html>
  );
}