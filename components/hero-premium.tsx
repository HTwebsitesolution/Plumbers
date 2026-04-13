'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck as CheckCircle2 } from 'lucide-react';

const HERO_IMAGES = [
  {
    src: '/hero section/1.png',
    alt: 'Freshly installed Baxi boiler in a clean utility space',
  },
  {
    src: '/hero section/2.png',
    alt: 'Modern Baxi boiler installed above a kitchen worktop',
  },
  {
    src: '/hero section/3.png',
    alt: 'Premium Baxi boiler installation with tidy pipework',
  },
];

export function HeroPremium() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5500);

    return () => clearInterval(id);
  }, []);
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.22),_transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]">
          {/* LEFT COLUMN - Content */}
          <div className="order-2 space-y-6 text-white lg:order-1">
            <div className="inline-flex items-center rounded-full border border-brand-cyan/30 bg-slate-900/60 px-4 py-1.5 text-sm font-medium text-brand-cyan shadow-sm backdrop-blur">
              New boilers, servicing & repairs in your area
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.2rem] lg:leading-[1.05]">
              Fixed provisional boiler quotes in minutes.
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-slate-200/80 sm:text-xl">
              Answer a few quick questions about your home and get a provisional price from £1,750.
              Final price is always confirmed after a free, no-obligation site survey.
            </p>

            <div className="grid gap-3 text-sm text-slate-100/90 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan" />
                <span>All installs include filter, limescale protection, system flush and thermostat.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan" />
                <span>2 / 5 / 10-year warranties available on Budget, Mid price and Premium tiers.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan" />
                <span>Gas and LPG boilers covered across our postcode catchment.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan" />
                <span>No online checkout or finance — just clear survey-backed pricing.</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-auto px-8 py-5 text-base font-semibold shadow-lg shadow-brand-cyan/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Link href="/quote">Get my boiler estimate</Link>
              </Button>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300/80">
                <span className="rounded-full bg-slate-900/60 px-3 py-1">Provisional from £1,750</span>
                <span className="hidden h-4 w-px bg-slate-700 sm:inline-block" />
                <span>Final price confirmed after free site survey</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Photo panel */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-xl">
              <Card className="overflow-hidden border-slate-800/70 bg-slate-900/80 shadow-2xl backdrop-blur-md">
                <div className="relative w-full aspect-[3/4]">
                  {HERO_IMAGES.map((image, index) => (
                    <Image
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority={index === 0}
                      className={`absolute inset-0 object-contain bg-slate-950 transition-opacity duration-700 ${
                        index === activeIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
                    <div className="rounded-full bg-slate-950/80 px-3 py-1 text-xs font-medium text-slate-100 shadow-md shadow-black/40">
                      South Yorkshire & North Notts coverage
                    </div>
                    <div className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-emerald-950 shadow-md shadow-emerald-500/40">
                      Free site survey
                    </div>
                  </div>

                  <div className="absolute inset-x-4 bottom-4 space-y-3">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-300/80">Example install</p>
                        <p className="text-2xl font-semibold text-white">
                          From <span className="text-brand-cyan">£1,750</span>
                        </p>
                        <p className="text-xs text-slate-300/80">Based on a standard like-for-like combi swap</p>
                      </div>
                      <div className="rounded-xl bg-slate-950/80 px-3 py-2 text-xs text-slate-200 shadow-md shadow-black/40">
                        <p className="font-semibold">Includes</p>
                        <p>Magnetic filter, limescale reducer, chemical flush, inhibitor & controls</p>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="border-t border-slate-800/80 bg-slate-950/80 px-4 py-4 sm:px-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300/90 sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-cyan/15 text-[0.65rem] font-semibold text-brand-cyan">
                        1
                      </span>
                      <span>Tell us about your home</span>
                    </div>
                    <span className="hidden h-[1px] flex-1 bg-slate-700/70 sm:inline-block" />
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-cyan/15 text-[0.65rem] font-semibold text-brand-cyan">
                        2
                      </span>
                      <span>Get your provisional quote</span>
                    </div>
                    <span className="hidden h-[1px] flex-1 bg-slate-700/70 sm:inline-block" />
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-cyan/15 text-[0.65rem] font-semibold text-brand-cyan">
                        3
                      </span>
                      <span>Book a free survey</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
