import Link from 'next/link';
import { Metadata } from 'next';
import { PageLayout } from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CircleCheck as CheckCircle2, Shield, Fuel, Package } from 'lucide-react';
import { BOILER_TIERS, STANDARD_INSTALL_DEFINITION } from '@/lib/types';
import { formatPrice } from '@/lib/quote-utils';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata.boilers;

export default function BoilersPage() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-5xl font-bold text-slate-900">
            Our Boiler Tiers
          </h1>
          <p className="text-xl text-slate-600">
            Choose the tier that best suits your needs and budget
          </p>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-slate-900">
                All Tiers Include
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {BOILER_TIERS[0].inclusions.map((inclusion, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="text-slate-600">{inclusion}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img
                src="/Photos for boilable website/1.png"
                alt="New boiler neatly installed in a kitchen cupboard above a washing machine"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          <div className="mb-16 rounded-lg border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-4 text-xl font-semibold text-slate-900">
              {STANDARD_INSTALL_DEFINITION.title}
            </h3>
            <ul className="mb-4 space-y-2">
              {STANDARD_INSTALL_DEFINITION.points.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-600">{STANDARD_INSTALL_DEFINITION.note}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {BOILER_TIERS.map((tier, index) => (
              <Card key={tier.name} className="relative overflow-hidden animate-scale-in group transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{animationDelay: `${index * 0.15}s`}}>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={
                      index === 0
                        ? "/boilable%20-%20choose%20your%20boiler/1.png"
                        : index === 1
                        ? "/boilable%20-%20choose%20your%20boiler/2.png"
                        : "/boilable%20-%20choose%20your%20boiler/3.png"
                    }
                    alt={`${tier.name} installation`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
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
                  <p className="text-sm text-slate-600">
                    {tier.name === 'Budget boiler' &&
                      'Perfect for homeowners looking for a reliable, cost-effective solution with essential features.'}
                    {tier.name === 'Mid price boiler' &&
                      'Our most popular option, offering excellent value with an extended warranty period.'}
                    {tier.name === 'Premium boiler' &&
                      'Top-tier quality with the longest warranty for complete peace of mind.'}
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/quote">Choose This Tier</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Fuel Types We Cover
            </h2>
            <p className="text-lg text-slate-600">
              Natural gas and LPG installations within our service area
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="animate-fade-in stagger-1 group transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200">
                  <Fuel className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Gas</CardTitle>
                <CardDescription>
                  Natural gas boilers are the most common type in the UK, offering
                  efficient and reliable heating with lower running costs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="animate-fade-in stagger-2 group transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200">
                  <Fuel className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>LPG</CardTitle>
                <CardDescription>
                  Liquefied petroleum gas is ideal for properties without mains gas
                  connection, offering similar benefits to natural gas.
                </CardDescription>
              </CardHeader>
            </Card>

          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-amber-200 bg-amber-50/90 px-6 py-5 text-center">
            <p className="font-semibold text-slate-900">Oil-fired boilers</p>
            <p className="mt-2 text-sm text-slate-700">
              We do not install or service oil-fired boilers. If you need oil heating work, please
              contact an OFTEC-registered specialist in your area.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Trusted Brands
            </h2>
            <p className="text-lg text-slate-600">
              We work with leading manufacturers
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Baxi</CardTitle>
                <CardDescription>
                  A well-established British brand known for reliable, efficient boilers
                  with excellent customer support. Baxi boilers are popular among UK
                  homeowners for their dependability and value.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Viessmann</CardTitle>
                <CardDescription>
                  A premium German manufacturer renowned for innovative technology and
                  exceptional build quality. Viessmann boilers offer industry-leading
                  efficiency and long-term reliability.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-slate-600">
              During your free survey, we'll recommend the best-fit model based on your
              property's specific requirements and your preferences.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Find the Perfect Boiler
          </h2>
          <p className="mb-6 text-lg text-blue-100">
            Get your instant quote and choose your preferred tier
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/quote">
              Get Your Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
