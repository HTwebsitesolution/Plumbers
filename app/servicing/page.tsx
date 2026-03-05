import { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, Shield, Clock, Wrench, FileText, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Boiler Servicing',
  description: 'Annual boiler servicing by Gas Safe registered engineers. Keep your boiler running efficiently and safely.',
};

export default function ServicingPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-gradient-brand py-24 md:py-32">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl animate-fade-in">
              Annual Boiler Servicing
            </h1>
            <p className="mb-10 text-xl text-white/90 animate-fade-in stagger-1">
              Keep your boiler running safely and efficiently with our professional servicing
            </p>
            <Button asChild size="lg" className="bg-white text-brand-navy hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-xl animate-fade-in stagger-2">
              <Link href="/servicing/book">
                Book Your Service
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4 animate-fade-in stagger-1 group">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-cyan/10 ring-1 ring-brand-cyan/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-cyan/20">
                <Shield className="h-7 w-7 text-brand-cyan" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Gas Safe</div>
                <div className="text-sm text-muted-foreground">Registered engineers</div>
              </div>
            </div>
            <div className="flex items-center gap-4 animate-fade-in stagger-2 group">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue/10 ring-1 ring-brand-blue/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-blue/20">
                <Clock className="h-7 w-7 text-brand-blue" />
              </div>
              <div>
                <div className="font-semibold text-foreground">24 Hour</div>
                <div className="text-sm text-muted-foreground">Response time</div>
              </div>
            </div>
            <div className="flex items-center gap-4 animate-fade-in stagger-3 group">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-cyan/10 ring-1 ring-brand-cyan/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-cyan/20">
                <FileText className="h-7 w-7 text-brand-cyan" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Full Report</div>
                <div className="text-sm text-muted-foreground">After every service</div>
              </div>
            </div>
            <div className="flex items-center gap-4 animate-fade-in stagger-4 group">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue/10 ring-1 ring-brand-blue/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-blue/20">
                <Wrench className="h-7 w-7 text-brand-blue" />
              </div>
              <div>
                <div className="font-semibold text-foreground">All Brands</div>
                <div className="text-sm text-muted-foreground">We service them all</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">What's Included</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Comprehensive checks to keep your boiler safe and efficient
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-2xl">Full Service Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'Visual inspection of boiler and flue',
                    'Check and clean main burner',
                    'Test gas pressure and flow',
                    'Check heat exchanger for corrosion',
                    'Inspect and clean condensate trap',
                    'Test all safety devices',
                    'Check system pressure and water flow',
                    'Analyze flue gas emissions',
                    'Test boiler controls and thermostat',
                    'Provide full written service report',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-card py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">How It Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Simple and straightforward servicing process
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="premium-card transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  1
                </div>
                <CardTitle>Book Online</CardTitle>
                <CardDescription>
                  Choose a convenient date and time for your service
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="premium-card transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  2
                </div>
                <CardTitle>Engineer Visits</CardTitle>
                <CardDescription>
                  Our Gas Safe engineer performs a thorough service
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="premium-card transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  3
                </div>
                <CardTitle>Receive Report</CardTitle>
                <CardDescription>
                  Get a detailed service report with recommendations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Common Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about boiler servicing
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="premium-card">
              <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                How often should I service my boiler?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4">
                We recommend annual servicing to ensure your boiler operates safely and efficiently. Regular servicing can also help maintain your manufacturer's warranty.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="premium-card">
              <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                How long does a service take?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4">
                A standard boiler service typically takes 45-60 minutes. If any issues are found, our engineer will discuss them with you and provide recommendations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="premium-card">
              <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                Do you service all boiler brands?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4">
                Yes, our Gas Safe registered engineers are trained to service all major boiler brands including Worcester Bosch, Vaillant, Baxi, Ideal, and more.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="premium-card">
              <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                What if you find a problem during the service?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4">
                Our engineer will explain any issues found and provide a quote for repairs. We'll never carry out additional work without your approval.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="premium-card">
              <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                Will I get a service certificate?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4">
                Yes, after every service you'll receive a detailed report and service certificate for your records and warranty purposes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-brand py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Ready to Book Your Service?
          </h2>
          <p className="mb-10 text-xl text-white/90">
            Keep your boiler running safely and efficiently
          </p>
          <Button asChild size="lg" className="bg-white text-brand-navy hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-xl">
            <Link href="/servicing/book">
              Book Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
