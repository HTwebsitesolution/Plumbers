import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, CircleCheck as CheckCircle2, Shield, Clock, PhoneCall, Award, Zap, Calendar } from 'lucide-react';
import { BOILER_TIERS, STANDARD_INSTALL_DEFINITION } from '@/lib/types';
import { formatPrice } from '@/lib/quote-utils';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Boilable
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              How It Works
            </Link>
            <Link href="/boilers" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Boilers
            </Link>
            <Link href="/faqs" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              FAQs
            </Link>
            <Link href="/reviews" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Reviews
            </Link>
            <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Contact
            </Link>
          </nav>
          <Button asChild>
            <Link href="/quote">Get a Quote</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-4" variant="secondary">
                Quality Boiler Installations
              </Badge>
              <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                New Boiler Installation
                <br />
                <span className="text-blue-600">From £1,750</span>
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-600">
                Get your instant provisional quote online. All installations include magnetic filter, limescale reducer, chemical flush, and programmable thermostat.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link href="/quote">
                    Get Your Quote Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link href="/how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Quality Brands</div>
                  <div className="text-sm text-slate-600">Baxi, Viessmann & more</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Up to 10 Years</div>
                  <div className="text-sm text-slate-600">Warranty included</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">24 Hour</div>
                  <div className="text-sm text-slate-600">Response time</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Expert Team</div>
                  <div className="text-sm text-slate-600">Gas Safe registered</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-slate-900">How It Works</h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                Get your new boiler installed in 4 simple steps
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                    1
                  </div>
                  <CardTitle>Get Your Quote</CardTitle>
                  <CardDescription>
                    Complete our quick online form to receive your instant provisional estimate
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                    2
                  </div>
                  <CardTitle>Free Survey</CardTitle>
                  <CardDescription>
                    We'll visit your property to assess your needs and confirm the final price
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                    3
                  </div>
                  <CardTitle>Confirmed Quote</CardTitle>
                  <CardDescription>
                    Receive your detailed quote with no hidden costs or surprises
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                    4
                  </div>
                  <CardTitle>Installation</CardTitle>
                  <CardDescription>
                    Professional installation by our Gas Safe registered engineers
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-slate-900">Choose Your Boiler Tier</h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                All installations include the same quality service and essentials
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {BOILER_TIERS.map((tier) => (
                <Card key={tier.name} className="relative overflow-hidden">
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-slate-500">From</span>
                      <span className="text-4xl font-bold text-slate-900">
                        {formatPrice(tier.fromPrice)}
                      </span>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      <Shield className="mr-1 h-3 w-3" />
                      {tier.warrantyYears} Year Warranty
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="mb-2 text-sm font-medium text-slate-900">
                        Includes:
                      </div>
                      <ul className="space-y-2">
                        {tier.inclusions.map((inclusion, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                            {inclusion}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/quote">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-600">
                Everything you need to know about your boiler installation
              </p>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  What is included in a standard installation?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  <ul className="space-y-2">
                    {STANDARD_INSTALL_DEFINITION.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4">{STANDARD_INSTALL_DEFINITION.note}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  How long does installation take?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Most standard boiler installations are completed within one day. More complex installations may take longer, which we'll discuss during your free survey.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Are your engineers Gas Safe registered?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Yes, all our engineers are fully Gas Safe registered and insured. We'll provide certificates for all work carried out.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  What warranty is included?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Our Budget tier includes 2 years, Mid price includes 5 years, and Premium includes 10 years warranty. All warranties cover parts and labour.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  Can I get finance for my boiler?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  We'll discuss payment options during your survey. Our focus is on transparent pricing with no hidden costs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="bg-blue-600 py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-6 text-4xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-xl text-blue-100">
              Get your instant provisional quote in under 5 minutes
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link href="/quote">
                Get Your Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 text-xl font-bold text-slate-900">Boilable</div>
              <p className="text-sm text-slate-600">
                Quality boiler installations with transparent pricing and expert service.
              </p>
            </div>
            <div>
              <div className="mb-4 text-sm font-semibold uppercase text-slate-900">
                Services
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/boilers" className="hover:text-slate-900">
                    Boiler Installation
                  </Link>
                </li>
                <li>
                  <Link href="/quote" className="hover:text-slate-900">
                    Get a Quote
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-4 text-sm font-semibold uppercase text-slate-900">
                Company
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/how-it-works" className="hover:text-slate-900">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:text-slate-900">
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="hover:text-slate-900">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-4 text-sm font-semibold uppercase text-slate-900">
                Contact
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/contact" className="hover:text-slate-900">
                    Get in Touch
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            &copy; 2024 Boilable. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
