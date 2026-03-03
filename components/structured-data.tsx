export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Boilable',
    description: 'Quality boiler installations with transparent pricing and expert service',
    url: 'https://boilable.com',
    telephone: '+44-XXX-XXX-XXXX',
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
