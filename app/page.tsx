import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BackToTopButton } from '@/components/back-to-top';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, CircleCheck as CheckCircle2, Shield, Clock, Award } from 'lucide-react';
import { BOILER_TIERS, STANDARD_INSTALL_DEFINITION } from '@/lib/types';
import { formatPrice } from '@/lib/quote-utils';
import { HeroPremium } from '@/components/hero-premium';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex items-center transition-all duration-300 hover:opacity-80"
            aria-label="Boilable Home"
          >
            <div className="relative h-12 sm:h-14 bg-[#0A1628] rounded-lg px-2 overflow-hidden">
              <Image
                src="/brand/Boilable.co.uk_logo.png"
                alt="Boilable"
                width={220}
                height={52}
                priority
                className="h-full w-auto object-contain scale-[1.18] translate-y-[1px]"
              />
            </div>
            <span className="sr-only">Boilable - Boiler Installation Estimates</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-cyan">
              How It Works
            </Link>
            <Link href="/boilers" className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-cyan">
              Boilers
            </Link>
            <Link href="/faqs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-cyan">
              FAQs
            </Link>
            <Link href="/reviews" className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-cyan">
              Reviews
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-cyan">
              Contact
            </Link>
          </nav>
          <Button asChild className="btn-gradient">
            <Link href="/quote">Get a Quote</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <HeroPremium />

        <section className="border-y border-border bg-card py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-4 animate-fade-in stagger-1 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-cyan/10 ring-1 ring-brand-cyan/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-cyan/20 group-hover:ring-brand-cyan/40">
                  <CheckCircle2 className="h-7 w-7 text-brand-cyan transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Quality Brands</div>
                  <div className="text-sm text-muted-foreground">Baxi, Viessmann & more</div>
                </div>
              </div>
              <div className="flex items-center gap-4 animate-fade-in stagger-2 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue/10 ring-1 ring-brand-blue/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-blue/20 group-hover:ring-brand-blue/40">
                  <Shield className="h-7 w-7 text-brand-blue transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Up to 10 Years</div>
                  <div className="text-sm text-muted-foreground">Warranty included</div>
                </div>
              </div>
              <div className="flex items-center gap-4 animate-fade-in stagger-3 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-cyan/10 ring-1 ring-brand-cyan/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-cyan/20 group-hover:ring-brand-cyan/40">
                  <Clock className="h-7 w-7 text-brand-cyan transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">24 Hour</div>
                  <div className="text-sm text-muted-foreground">Response time</div>
                </div>
              </div>
              <div className="flex items-center gap-4 animate-fade-in stagger-4 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue/10 ring-1 ring-brand-blue/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-blue/20 group-hover:ring-brand-blue/40">
                  <Award className="h-7 w-7 text-brand-blue transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Expert Team</div>
                  <div className="text-sm text-muted-foreground">Gas Safe registered</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center animate-fade-in">
              <h2 className="mb-4 text-4xl font-bold md:text-5xl">How It Works</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Get your new boiler installed in 4 simple steps
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="premium-card transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-up stagger-1 group">
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <img
                    src="https://images.pexels.com/photos/5475765/pexels-photo-5475765.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Online quote form"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    1
                  </div>
                  <CardTitle>Get Your Quote</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Complete our quick online form to receive your instant provisional estimate
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="premium-card transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-up stagger-2 group">
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <img
                    src="https://images.pexels.com/photos/8092169/pexels-photo-8092169.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Engineer conducting survey"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    2
                  </div>
                  <CardTitle>Free Survey</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    We'll visit your property to assess your needs and confirm the final price
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="premium-card transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-up stagger-3 group">
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <img
                    src="https://images.pexels.com/photos/7689732/pexels-photo-7689732.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Quote document"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    3
                  </div>
                  <CardTitle>Confirmed Quote</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Receive your detailed quote with no hidden costs or surprises
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="premium-card transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-up stagger-4 group">
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <img
                    src="https://images.pexels.com/photos/5691607/pexels-photo-5691607.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Professional installation"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    4
                  </div>
                  <CardTitle>Installation</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Professional installation by our Gas Safe registered engineers
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-card py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center animate-fade-in">
              <h2 className="mb-4 text-4xl font-bold md:text-5xl">Choose Your Boiler Tier</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                All installations include the same quality service and essentials
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {BOILER_TIERS.map((tier, index) => (
                <Card key={tier.name} className="gradient-border-card relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-scale-in group" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={
                        index === 0
                          ? "https://images.pexels.com/photos/8092175/pexels-photo-8092175.jpeg?auto=compress&cs=tinysrgb&w=600"
                          : index === 1
                          ? "https://images.pexels.com/photos/5691625/pexels-photo-5691625.jpeg?auto=compress&cs=tinysrgb&w=600"
                          : "https://images.pexels.com/photos/8092157/pexels-photo-8092157.jpeg?auto=compress&cs=tinysrgb&w=600"
                      }
                      alt={`${tier.name} boiler`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-muted-foreground">From</span>
                      <span className="text-gradient text-5xl font-bold">
                        {formatPrice(tier.fromPrice)}
                      </span>
                    </div>
                    <Badge className="w-fit bg-brand-blue/10 text-brand-blue border-brand-blue/20 hover:bg-brand-blue/20">
                      <Shield className="mr-1 h-3 w-3" />
                      {tier.warrantyYears} Year Warranty
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="mb-3 text-sm font-semibold text-foreground">
                        Includes:
                      </div>
                      <ul className="space-y-2">
                        {tier.inclusions.map((inclusion, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-cyan" />
                            {inclusion}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild className="btn-gradient w-full">
                      <Link href="/quote">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about your boiler installation
              </p>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="premium-card">
                <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                  What is included in a standard installation?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground px-4">
                  <ul className="space-y-2">
                    {STANDARD_INSTALL_DEFINITION.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-cyan" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4">{STANDARD_INSTALL_DEFINITION.note}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="premium-card">
                <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                  How long does installation take?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground px-4">
                  Most standard boiler installations are completed within one day. More complex installations may take longer, which we'll discuss during your free survey.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="premium-card">
                <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                  Are your engineers Gas Safe registered?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground px-4">
                  Yes, all our engineers are fully Gas Safe registered and insured. We'll provide certificates for all work carried out.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="premium-card">
                <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                  What warranty is included?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground px-4">
                  Our Budget tier includes 2 years, Mid price includes 5 years, and Premium includes 10 years warranty. All warranties cover parts and labour.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="premium-card">
                <AccordionTrigger className="text-left px-4 hover:text-brand-cyan">
                  Can I get finance for my boiler?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground px-4">
                  We'll discuss payment options during your survey. Our focus is on transparent pricing with no hidden costs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="relative overflow-hidden bg-gradient-brand py-24">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mb-10 text-xl text-white/90">
              Get your instant provisional quote in under 5 minutes
            </p>
            <Button asChild size="lg" className="bg-white text-brand-navy hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-xl">
              <Link href="/quote">
                Get Your Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 bg-[#0A1628] rounded-lg px-3 py-2 inline-block">
                <Image
                  src="/brand/Boilable.co.uk_logo.png"
                  alt="Boilable.co.uk"
                  width={140}
                  height={35}
                  className="h-7 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Quality boiler installations with transparent pricing and expert service.
              </p>
              <p className="mt-3 text-xs text-muted-foreground/60">
                A Delaney & Salter Ltd company
              </p>
            </div>
            <div>
              <div className="mb-4 text-sm font-semibold uppercase text-foreground">
                Services
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/boilers" className="hover:text-brand-cyan transition-colors">
                    Boiler Installation
                  </Link>
                </li>
                <li>
                  <Link href="/quote" className="hover:text-brand-cyan transition-colors">
                    Get a Quote
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-4 text-sm font-semibold uppercase text-foreground">
                Company
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/how-it-works" className="hover:text-brand-cyan transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:text-brand-cyan transition-colors">
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="hover:text-brand-cyan transition-colors">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-4 text-sm font-semibold uppercase text-foreground">
                Contact
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-brand-cyan transition-colors">
                    Get in Touch
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
            <p>&copy; 2024 Boilable. All rights reserved.</p>
            <BackToTopButton />
          </div>
        </div>
      </footer>
    </div>
  );
}
