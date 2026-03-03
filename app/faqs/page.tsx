import Link from 'next/link';
import { Metadata } from 'next';
import { PageLayout } from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, CircleCheck as CheckCircle2 } from 'lucide-react';
import { STANDARD_INSTALL_DEFINITION, BOILER_TIERS } from '@/lib/types';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata.faqs;

export default function FAQsPage() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-5xl font-bold text-slate-900">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600">
            Everything you need to know about your boiler installation
          </p>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg">
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
              <AccordionTrigger className="text-left text-lg">
                How long does installation take?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <p className="mb-4">
                  Most standard boiler installations are completed within one day. However,
                  the exact time can vary depending on several factors:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    Like-for-like replacements typically take 4-6 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    Boiler relocations may add an extra day
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    System upgrades or modifications will extend the timeline
                  </li>
                </ul>
                <p className="mt-4">
                  We'll give you a clear timeframe during your free survey.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg">
                Are your engineers Gas Safe registered?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <p className="mb-4">
                  Yes, absolutely. All our engineers are fully Gas Safe registered and
                  insured. Gas Safe registration is a legal requirement for anyone working
                  on gas appliances in the UK.
                </p>
                <p>
                  We'll provide all necessary certificates and documentation for your
                  installation, including the Gas Safe certificate and any building
                  compliance documents required.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-lg">
                What warranty is included?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <p className="mb-4">
                  Our warranty coverage varies by tier:
                </p>
                <ul className="space-y-2">
                  {BOILER_TIERS.map((tier) => (
                    <li key={tier.name} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>
                        <strong>{tier.name}:</strong> {tier.warrantyYears} years warranty
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">
                  All warranties cover parts and labour, giving you complete peace of mind.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left text-lg">
                What happens if something goes wrong after installation?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <p className="mb-4">
                  If you experience any issues with your new boiler during the warranty
                  period, simply contact us and we'll arrange for a qualified engineer to
                  visit your property.
                </p>
                <p>
                  Most issues can be resolved quickly, and all repairs during the warranty
                  period are covered at no extra cost to you.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left text-lg">
                Can I get finance for my boiler?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <p>
                  We'll discuss payment options with you during your survey. Our primary
                  focus is on providing transparent, competitive pricing with no hidden
                  costs. We believe in upfront, honest pricing so you can make an informed
                  decision.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left text-lg">
                Do you remove and dispose of my old boiler?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <p>
                  Yes, as part of every installation, we'll safely remove your old boiler
                  and dispose of it in accordance with environmental regulations. We'll
                  leave your property clean and tidy with your new boiler fully
                  operational.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left text-lg">
                What's the difference between combi, system, and regular boilers?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <ul className="space-y-4">
                  <li>
                    <strong className="text-slate-900">Combi Boilers:</strong> Provide
                    heating and hot water on demand without needing a separate tank.
                    Perfect for smaller homes with limited space.
                  </li>
                  <li>
                    <strong className="text-slate-900">System Boilers:</strong> Require a
                    cylinder for storing hot water but don't need a tank in the loft. Good
                    for homes with multiple bathrooms.
                  </li>
                  <li>
                    <strong className="text-slate-900">Regular Boilers:</strong> Require
                    both a cylinder and a tank in the loft. Best for homes with traditional
                    heating systems and high hot water demand.
                  </li>
                </ul>
                <p className="mt-4">
                  During your free survey, we'll recommend the best type for your property.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-left text-lg">
                Will my heating be off during installation?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <p className="mb-4">
                  Yes, your heating and hot water will be unavailable during the
                  installation. For most standard installations completed in one day, this
                  is typically only for a few hours while we complete the work.
                </p>
                <p>
                  We'll work as efficiently as possible to minimize disruption and get your
                  heating system back up and running quickly.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-left text-lg">
                Do I need to do anything to prepare for the installation?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <p className="mb-4">
                  We'll provide specific instructions before your installation date, but
                  typically you should:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    Clear the area around your current boiler
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    Ensure our engineers have easy access to the installation location
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    Make sure someone over 18 is home during the installation
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Still Have Questions?
          </h2>
          <p className="mb-8 text-lg text-slate-600">
            Get in touch with our team or start your quote to speak with us directly
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/quote">
                Get Your Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
