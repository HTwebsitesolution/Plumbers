import Link from 'next/link';
import { Metadata } from 'next';
import { PageLayout } from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star } from 'lucide-react';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata.reviews;

const REVIEWS = [
  {
    name: 'Sarah M.',
    location: 'London',
    rating: 5,
    review: 'Excellent service from start to finish. The quote was transparent, the survey was thorough, and the installation team were professional and tidy. Very happy with my new boiler.',
  },
  {
    name: 'James T.',
    location: 'Manchester',
    rating: 5,
    review: 'I was impressed by how quick and easy the whole process was. Got my quote online, had the survey done within two days, and the installation was completed in less than a day. Highly recommend.',
  },
  {
    name: 'Linda K.',
    location: 'Birmingham',
    rating: 5,
    review: 'The team explained everything clearly and there were no hidden costs. The engineer was knowledgeable and took time to show me how to use the new system. Great value for money.',
  },
  {
    name: 'Michael R.',
    location: 'Bristol',
    rating: 5,
    review: 'Professional installation and the quality of work was excellent. They cleaned up after themselves and left everything spotless. The new boiler is so much more efficient than the old one.',
  },
  {
    name: 'Emma W.',
    location: 'Leeds',
    rating: 5,
    review: 'Very pleased with the service. The online quote gave me a good idea of costs, and the final price after the survey was exactly what I expected. No surprises.',
  },
  {
    name: 'David P.',
    location: 'Glasgow',
    rating: 5,
    review: "From quote to installation, everything was smooth. The communication was great, they turned up on time, and finished when they said they would. Can't fault the service.",
  },
];

export default function ReviewsPage() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h1 className="mb-4 text-5xl font-bold text-slate-900">
            Customer Reviews
          </h1>
          <p className="text-xl text-slate-600">
            See what our customers have to say about their experience
          </p>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="mb-3 flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4 text-slate-600">{review.review}</p>
                  <div className="border-t border-slate-100 pt-4">
                    <div className="font-semibold text-slate-900">{review.name}</div>
                    <div className="text-sm text-slate-500">{review.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Why Choose Boilable?
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
