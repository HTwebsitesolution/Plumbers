import { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CircleCheck as CheckCircle2, Shield, Clock, Wrench, TriangleAlert as AlertTriangle, ArrowRight, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Boiler Repairs',
  description: 'Fast and reliable boiler repairs by Gas Safe registered engineers. Get your heating back on quickly.',
};

export default function RepairsPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-gradient-brand py-24 md:py-32">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl animate-fade-in">
              Fast Boiler Repairs
            </h1>
            <p className="mb-10 text-xl text-white/90 animate-fade-in stagger-1">
              Expert repairs to get your heating back on quickly and safely
            </p>
            <Button asChild size="lg" className="bg-white text-brand-navy hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-xl animate-fade-in stagger-2">
              <Link href="/repairs/request">
                Request a Repair
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-900">
              <strong>Gas Leak Emergency?</strong> If you smell gas, immediately turn off your gas supply at the meter, open windows, don't use electrical switches, and call the National Gas Emergency Service on <strong>0800 111 999</strong>
            </AlertDescription>
          </Alert>

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
                <Wrench className="h-7 w-7 text-brand-cyan" />
              </div>
              <div>
                <div className="font-semibold text-foreground">All Brands</div>
                <div className="text-sm text-muted-foreground">We repair them all</div>
              </div>
            </div>
            <div className="flex items-center gap-4 animate-fade-in stagger-4 group">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue/10 ring-1 ring-brand-blue/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-blue/20">
                <CheckCircle2 className="h-7 w-7 text-brand-blue" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Guaranteed</div>
                <div className="text-sm text-muted-foreground">Work guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">Common Boiler Problems</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We fix all types of boiler issues quickly and professionally
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'No Hot Water',
                description: 'Boiler not producing hot water or heating',
              },
              {
                title: 'Low Pressure',
                description: 'Pressure gauge showing below 1 bar',
              },
              {
                title: 'Strange Noises',
                description: 'Banging, whistling, or gurgling sounds',
              },
              {
                title: 'Leaking Water',
                description: 'Water leaking from boiler or pipes',
              },
              {
                title: 'Pilot Light Out',
                description: 'Pilot light keeps going out',
              },
              {
                title: 'Error Codes',
                description: 'Boiler displaying error messages',
              },
            ].map((problem, index) => (
              <Card key={index} className="premium-card group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-cyan/10 ring-1 ring-brand-cyan/20 transition-transform duration-300 group-hover:scale-110">
                    <Wrench className="h-5 w-5 text-brand-cyan" />
                  </div>
                  <CardTitle className="text-lg">{problem.title}</CardTitle>
                  <CardDescription>{problem.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">How It Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Quick and easy repair process
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="premium-card transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  1
                </div>
                <CardTitle>Report Issue</CardTitle>
                <CardDescription>
                  Tell us about your boiler problem and we'll respond quickly
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="premium-card transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  2
                </div>
                <CardTitle>Engineer Diagnoses</CardTitle>
                <CardDescription>
                  Our engineer identifies the problem and provides a quote
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="premium-card transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  3
                </div>
                <CardTitle>Fixed & Tested</CardTitle>
                <CardDescription>
                  Repair completed and boiler fully tested for safety
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
              Everything you need to know about boiler repairs
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="premium-card">
              <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                How quickly can you attend?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4">
                We aim to respond within 24 hours. For emergency situations, we'll prioritize your repair and get an engineer to you as soon as possible.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="premium-card">
              <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                Do you repair all boiler brands?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4">
                Yes, our Gas Safe registered engineers are trained to repair all major boiler brands including Worcester Bosch, Vaillant, Baxi, Ideal, Viessmann, and more.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="premium-card">
              <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                Will you provide a quote before starting work?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4">
                Yes, our engineer will diagnose the problem and provide a clear quote before carrying out any repair work. We'll never proceed without your approval.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="premium-card">
              <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                Do you carry parts with you?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4">
                Our engineers carry common replacement parts for most boiler brands. For specialist parts, we'll order them and arrange a follow-up visit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="premium-card">
              <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                Is the repair guaranteed?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4">
                Yes, all our repair work comes with a guarantee. We'll provide details of the warranty on parts and labour when we complete the work.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-brand py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Need a Repair?
          </h2>
          <p className="mb-10 text-xl text-white/90">
            Get expert help from our Gas Safe engineers
          </p>
          <Button asChild size="lg" className="bg-white text-brand-navy hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-xl">
            <Link href="/repairs/request">
              Request a Repair
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
