import Link from 'next/link';
import { Metadata } from 'next';
import { PageLayout } from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/metadata';
import { ReviewsClient } from '@/components/reviews/reviews-client';
import { getSiteConfig } from '@/lib/site-config';

export const metadata: Metadata = pageMetadata.reviews;

export default function ReviewsPage() {
  const site = getSiteConfig();
  return (
    <PageLayout>
      <ReviewsClient />

      <div className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Why Choose {site.siteName}?
          </h2>
          <div className="mx-auto mb-8 max-w-2xl space-y-4 text-lg text-slate-600">
            <p>
              We're committed to providing transparent pricing, quality installations,
              and excellent customer service. Every boiler we install comes with a
              comprehensive warranty and is fitted by Gas Safe registered engineers.
            </p>
            <p>
              Our streamlined online quote system makes it easy to get started, and our
              free site survey ensures you get an accurate, no-obligation final price.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/quote">
              Get Your Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
