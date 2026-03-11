import Link from 'next/link';
import { Metadata } from 'next';
import { PageLayout } from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Mail, Phone, Clock, MessageSquare } from 'lucide-react';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata.contact;

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-5xl font-bold text-slate-900">
            Get In Touch
          </h1>
          <p className="text-xl text-slate-600">
            We're here to answer your questions and help with your boiler installation
          </p>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid gap-8 md:grid-cols-2">
            <Card className="animate-slide-in-left group transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Start with a Quote</CardTitle>
                <CardDescription>
                  The quickest way to get started is to complete our online quote form.
                  You'll receive an instant provisional estimate and we'll contact you
                  within 24 hours to arrange your free survey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/quote">
                    Get Your Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="animate-slide-in-right group transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Response Time</CardTitle>
                <CardDescription>
                  We aim to respond to all enquiries within 24 hours during business
                  hours. Once you submit your quote request, our team will be in touch
                  quickly to discuss your requirements and arrange your free survey.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mb-16 grid gap-8 rounded-2xl bg-slate-50 p-6 shadow-sm md:grid-cols-[1fr_minmax(0,320px)] md:items-center md:p-8 lg:gap-10">
            <div className="order-2 md:order-1">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Other Ways to Reach Us
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-1">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">Email</h3>
                    <p className="text-sm text-slate-600">
                      Send us an email and we'll get back to you as soon as possible
                    </p>
                    <p className="mt-2 text-sm font-medium text-blue-600">
                      Contact details will be provided after quote submission
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">Phone</h3>
                    <p className="text-sm text-slate-600">
                      Prefer to speak to someone? Give us a call during business hours
                    </p>
                    <p className="mt-2 text-sm font-medium text-blue-600">
                      Contact details will be provided after quote submission
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative order-1 aspect-[4/3] max-h-64 w-full overflow-hidden rounded-xl bg-slate-200 md:order-2 md:max-h-none md:min-h-0">
              <img
                src="/Photos for boilable website/4.png"
                alt="Boiler and hot water cylinder installation in a dedicated plant room"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              Get your instant provisional quote and we'll be in touch within 24 hours
            </p>
            <Button asChild size="lg">
              <Link href="/quote">
                Start Your Quote Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="animate-scale-in stagger-1 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">How quickly will I hear back?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  We aim to contact all quote requests within 24 hours during business
                  hours. We'll discuss your requirements and arrange a convenient time for
                  your free survey.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in stagger-2 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Is the survey really free?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Yes, absolutely. Your site survey is completely free with no obligation
                  to proceed. We'll assess your property and provide a detailed, confirmed
                  quote.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in stagger-3 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">What areas do you cover?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Coverage is confirmed when we contact you to arrange your free site
                  survey. We'll let you know if we can service your area based on your
                  postcode.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in stagger-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Can I make changes after the survey?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Yes, you can discuss any changes with our team. If you want to upgrade
                  your tier or add extra work, we'll provide updated pricing before
                  proceeding.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link href="/faqs" className="text-blue-600 hover:underline">
              View all FAQs
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
