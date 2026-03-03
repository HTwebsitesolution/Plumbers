import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { StructuredData } from '@/components/structured-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://boilable.com'),
  title: {
    default: 'Boilable - Quality Boiler Installation from £1,750',
    template: '%s | Boilable'
  },
  description: 'Get your instant boiler installation quote online. Professional Gas Safe registered engineers. Up to 10 year warranty. From £1,750 installed.',
  keywords: ['boiler installation', 'combi boiler', 'gas boiler', 'boiler replacement', 'Gas Safe', 'Worcester Bosch', 'Vaillant', 'Ideal'],
  authors: [{ name: 'Boilable' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    siteName: 'Boilable',
    title: 'Boilable - Quality Boiler Installation from £1,750',
    description: 'Get your instant boiler installation quote online. Professional Gas Safe registered engineers. Up to 10 year warranty.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boilable - Quality Boiler Installation from £1,750',
    description: 'Get your instant boiler installation quote online. Professional Gas Safe registered engineers.',
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
