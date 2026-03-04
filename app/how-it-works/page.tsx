import Link from 'next/link';
import { Metadata } from 'next';
import { PageLayout } from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CircleCheck as CheckCircle2, Calendar, ClipboardCheck, Wrench, Shield } from 'lucide-react';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata.howItWorks;

export default function HowItWorksPage() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-5xl font-bold text-slate-900">
            How It Works
          </h1>
          <p className="text-xl text-slate-600">
            Getting a new boiler installed is simple with Boilable
          </p>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row gap-8 animate-slide-in-left group">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200 group-hover:shadow-lg">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Get Your Instant Quote
                </h2>
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img
                    src="/boilable%20quote%20-how%20it%20works/1.png"
                    alt="Customer completing online boiler quote"
                    className="w-full h-64 object-cover rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mb-4 text-lg text-slate-600">
                  Start by completing our quick online form. We'll ask about your property,
                  current boiler, and your preferences. In just a few minutes, you'll receive
                  a provisional estimate based on one of our three tiers.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    Takes less than 5 minutes
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    No personal details required until the end
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    Instant provisional pricing
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 animate-slide-in-right group">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200 group-hover:shadow-lg">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Free Site Survey
                </h2>
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img
                    src="/boilable%20quote%20-how%20it%20works/2.png"
                    alt="Boilable engineer carrying out boiler survey"
                    className="w-full h-64 object-cover rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mb-4 text-lg text-slate-600">
                  We'll contact you within 24 hours to arrange a convenient time for a free,
                  no-obligation site survey. One of our Gas Safe registered engineers will
                  visit your property to assess your specific requirements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    Completely free with no obligation
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    Performed by qualified engineers
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    Identify any additional work needed
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 animate-slide-in-left group">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200 group-hover:shadow-lg">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Get Your Confirmed Quote
                </h2>
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img
                    src="/boilable%20quote%20-how%20it%20works/3.png"
                    alt="Boilable boiler installation quote on tablet"
                    className="w-full h-64 object-cover rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mb-4 text-lg text-slate-600">
                  After the survey, we'll provide you with a detailed, confirmed quote.
                  This will include the final price with a full breakdown of what's included
                  and any additional work identified during the survey.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    Fixed price guarantee
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    No hidden costs
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    Clear explanation of all work
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 animate-slide-in-right group">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200 group-hover:shadow-lg">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Professional Installation
                </h2>
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img
                    src="/boilable%20quote%20-how%20it%20works/4.png"
                    alt="Gas Safe registered boiler installation"
                    className="w-full h-64 object-cover rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mb-4 text-lg text-slate-600">
                  Once you're happy with the quote, we'll schedule your installation at a
                  time that suits you. Our Gas Safe registered engineers will complete the
                  work to the highest standards, ensuring everything is working perfectly.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    Most installations completed in one day
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    Full system testing and demonstration
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    All certificates and documentation provided
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-blue-600 p-8 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="mb-6 text-lg text-blue-100">
              Get your instant provisional quote in under 5 minutes
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/quote">
                Start Your Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
