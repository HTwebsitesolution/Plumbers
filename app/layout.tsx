import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { StructuredData } from '@/components/structured-data';

const inter = Inter({ subsets: ['latin'] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Boilable | Boiler Installation Estimates',
    template: '%s | Boilable'
  },
  description: 'Get a boiler estimate in 60 seconds. Final price confirmed after a free site survey.',
  keywords: ['boiler installation', 'combi boiler', 'gas boiler', 'boiler replacement', 'Gas Safe', 'Worcester Bosch', 'Vaillant', 'Ideal'],
  authors: [{ name: 'Boilable' }],
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
    siteName: 'Boilable',
    title: 'Boilable | Boiler Installation Estimates',
    description: 'Get a boiler estimate in 60 seconds. Final price confirmed after a free site survey.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Boilable - Boiler Installation Estimates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boilable | Boiler Installation Estimates',
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
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1503945774768004');
          fbq('track', 'PageView');`}
        </Script>
      </head>
      <body className={inter.className}>
        {/* Meta Pixel NoScript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1503945774768004&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
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
