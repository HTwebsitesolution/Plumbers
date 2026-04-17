import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { StructuredData } from '@/components/structured-data';
import { getSiteConfig } from '@/lib/site-config';

const inter = Inter({ subsets: ['latin'] });
const site = getSiteConfig();
const facebookPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.siteName} | Boiler Installation Estimates`,
    template: `%s | ${site.siteName}`,
  },
  description: 'Get a boiler estimate in 60 seconds. Final price confirmed after a free site survey.',
  keywords: [
    'boiler installation',
    'combi boiler',
    'gas boiler',
    'boiler replacement',
    'Gas Safe',
    'Worcester Bosch',
    'Vaillant',
    'Ideal',
  ],
  authors: [{ name: site.siteName }],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    siteName: site.siteName,
    title: `${site.siteName} | Boiler Installation Estimates`,
    description: 'Get a boiler estimate in 60 seconds. Final price confirmed after a free site survey.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: site.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.siteName} | Boiler Installation Estimates`,
    description: 'Get a boiler estimate in 60 seconds. Final price confirmed after a free site survey.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        {facebookPixelId ? (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${facebookPixelId}');
          fbq('track', 'PageView');`}
          </Script>
        ) : null}
      </head>
      <body className={inter.className}>
        {facebookPixelId ? (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${encodeURIComponent(facebookPixelId)}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        ) : null}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
