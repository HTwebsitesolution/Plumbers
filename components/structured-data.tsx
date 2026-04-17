import { getSiteConfig } from '@/lib/site-config';

export function StructuredData() {
  const site = getSiteConfig();
  const structuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.siteName,
    description: site.businessDescription,
    url: site.siteUrl,
    priceRange: '£1,750 - £3,000',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
    serviceType: 'Boiler Installation',
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
  };

  if (site.businessPhone) {
    structuredData.telephone = site.businessPhone;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
