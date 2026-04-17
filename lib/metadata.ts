import { Metadata } from 'next';
import { getSiteConfig } from './site-config';

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = ''
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const site = getSiteConfig();

export const pageMetadata = {
  home: generatePageMetadata(
    `${site.siteName} - Quality Boiler Installation from £1,750`,
    'Get your instant boiler installation quote online. Professional Gas Safe registered engineers. Up to 10 year warranty. From £1,750 installed.',
    '/'
  ),
  quote: generatePageMetadata(
    'Get Your Instant Quote',
    'Get an instant boiler installation quote in minutes. Choose from Good, Better, or Best packages with warranties up to 10 years.',
    '/quote'
  ),
  boilers: generatePageMetadata(
    'Our Boilers',
    'Explore our range of quality boilers from trusted brands like Worcester Bosch, Vaillant, and Ideal. Find the perfect heating solution for your home.',
    '/boilers'
  ),
  howItWorks: generatePageMetadata(
    'How It Works',
    'Simple 3-step process: Get your quote online, book a free survey, and have your new boiler professionally installed by Gas Safe engineers.',
    '/how-it-works'
  ),
  faqs: generatePageMetadata(
    'Frequently Asked Questions',
    'Find answers to common questions about boiler installation, pricing, warranties, and our services.',
    '/faqs'
  ),
  reviews: generatePageMetadata(
    'Customer Reviews',
    `Read what our customers say about their boiler installation experience with ${site.siteName}. Trusted by homeowners across the UK.`,
    '/reviews'
  ),
  contact: generatePageMetadata(
    'Contact Us',
    'Get in touch with our team for expert advice on boiler installation. Call us or fill out our contact form.',
    '/contact'
  ),
  privacy: generatePageMetadata(
    'Privacy Policy',
    `How ${site.siteName} collects, uses, and protects your personal data in line with UK GDPR and the Data Protection Act 2018.`,
    '/privacy'
  ),
  terms: generatePageMetadata(
    'Terms & Conditions',
    `Terms of use for the ${site.siteName} website, including provisional quotes and limitations of liability.`,
    '/terms'
  ),
};
