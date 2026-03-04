import './globals.css';
import type { Metadata } from 'next';
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
      </head>
      <body className={inter.className}>
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
