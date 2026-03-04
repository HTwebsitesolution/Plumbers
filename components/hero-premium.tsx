"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck as CheckCircle2 } from 'lucide-react';

export function HeroPremium() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-20 md:py-28 lg:py-32">
      {/* Subtle gradient lighting effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-cyan opacity-[0.08] blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 h-80 w-80 rounded-full bg-brand-blue opacity-[0.06] blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-brand-red opacity-[0.05] blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* LEFT COLUMN - Content */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center rounded-full border border-brand-cyan/20 bg-brand-cyan/5 px-4 py-1.5 text-sm font-medium text-brand-cyan backdrop-blur-sm">
              Boilers-only installation
            </div>

            {/* H1 */}
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Boiler installation, done properly.
            </h1>

            {/* Subhead */}
            <p className="mb-8 text-lg leading-relaxed text-white/75 sm:text-xl">
              Choose Budget, Mid price, or Premium. We confirm the final price after a free site survey — no surprises.
            </p>

            {/* Trust bullets */}
            <div className="mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan" />
                <span className="text-white/90">Includes filter, limescale reducer, chemical flush + thermostat</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan" />
                <span className="text-white/90">2 / 5 / 10-year warranty options</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan" />
                <span className="text-white/90">Gas, LPG & Oil supported</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-semibold text-base px-8 py-6 h-auto shadow-lg shadow-brand-cyan/20 transition-all duration-200 hover:shadow-xl hover:shadow-brand-cyan/30 hover:-translate-y-0.5"
              >
                <Link href="/quote">Start my survey estimate</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm font-semibold text-base px-8 py-6 h-auto transition-all duration-200"
              >
                <Link href="/boilers">View what&apos;s included</Link>
              </Button>
            </div>

            {/* Muted price line */}
            <p className="text-sm text-white/50">
              Provisional estimates from £1,750 — final price confirmed after survey.
            </p>
          </div>

          {/* RIGHT COLUMN - Visual + Feature Card */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              {/* Boiler illustration with radial glow */}
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Radial glow background */}
                <div className="absolute inset-0 -m-12 flex items-center justify-center">
                  <div className="h-80 w-80 rounded-full bg-gradient-to-br from-brand-cyan/10 via-brand-blue/10 to-transparent blur-2xl"></div>
                </div>

                {/* Boiler SVG illustration */}
                <div className="relative z-10">
                  <svg
                    viewBox="0 0 300 400"
                    className="mx-auto w-full max-w-[280px] drop-shadow-2xl"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Main boiler body */}
                    <rect x="50" y="50" width="200" height="300" rx="12" fill="white" fillOpacity="0.95" />
                    <rect x="50" y="50" width="200" height="300" rx="12" stroke="url(#paint0_linear)" strokeWidth="2" />

                    {/* Top panel */}
                    <rect x="70" y="70" width="160" height="60" rx="8" fill="url(#paint1_linear)" />

                    {/* Display screen */}
                    <rect x="85" y="85" width="80" height="30" rx="4" fill="hsl(218, 75%, 15%)" />
                    <text x="125" y="105" textAnchor="middle" fill="hsl(195, 100%, 50%)" fontSize="16" fontWeight="600" fontFamily="system-ui">75°</text>

                    {/* Controls */}
                    <circle cx="190" cy="100" r="12" fill="white" stroke="url(#paint2_linear)" strokeWidth="2" />
                    <circle cx="215" cy="100" r="12" fill="white" stroke="url(#paint2_linear)" strokeWidth="2" />

                    {/* Pipes section */}
                    <rect x="70" y="150" width="160" height="180" rx="8" fill="white" fillOpacity="0.5" stroke="url(#paint3_linear)" strokeWidth="1.5" />

                    {/* Vertical pipes */}
                    <line x1="110" y1="160" x2="110" y2="320" stroke="hsl(195, 100%, 50%)" strokeWidth="6" strokeLinecap="round" />
                    <line x1="150" y1="160" x2="150" y2="320" stroke="hsl(225, 100%, 56%)" strokeWidth="6" strokeLinecap="round" />
                    <line x1="190" y1="160" x2="190" y2="320" stroke="hsl(195, 100%, 50%)" strokeWidth="6" strokeLinecap="round" />

                    {/* Horizontal connectors */}
                    <line x1="70" y1="190" x2="230" y2="190" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                    <line x1="70" y1="240" x2="230" y2="240" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                    <line x1="70" y1="290" x2="230" y2="290" stroke="white" strokeWidth="3" strokeOpacity="0.3" />

                    {/* Bottom connection points */}
                    <circle cx="110" cy="340" r="8" fill="hsl(195, 100%, 50%)" />
                    <circle cx="150" cy="340" r="8" fill="hsl(225, 100%, 56%)" />
                    <circle cx="190" cy="340" r="8" fill="hsl(195, 100%, 50%)" />

                    {/* Gradient definitions */}
                    <defs>
                      <linearGradient id="paint0_linear" x1="150" y1="50" x2="150" y2="350" gradientUnits="userSpaceOnUse">
                        <stop stopColor="hsl(195, 100%, 50%)" stopOpacity="0.3" />
                        <stop offset="0.5" stopColor="hsl(225, 100%, 56%)" stopOpacity="0.2" />
                        <stop offset="1" stopColor="hsl(347, 100%, 59%)" stopOpacity="0.1" />
                      </linearGradient>
                      <linearGradient id="paint1_linear" x1="150" y1="70" x2="150" y2="130" gradientUnits="userSpaceOnUse">
                        <stop stopColor="hsl(195, 100%, 50%)" stopOpacity="0.1" />
                        <stop offset="1" stopColor="hsl(225, 100%, 56%)" stopOpacity="0.05" />
                      </linearGradient>
                      <linearGradient id="paint2_linear" x1="200" y1="88" x2="200" y2="112" gradientUnits="userSpaceOnUse">
                        <stop stopColor="hsl(195, 100%, 50%)" />
                        <stop offset="1" stopColor="hsl(225, 100%, 56%)" />
                      </linearGradient>
                      <linearGradient id="paint3_linear" x1="150" y1="150" x2="150" y2="330" gradientUnits="userSpaceOnUse">
                        <stop stopColor="hsl(195, 100%, 50%)" stopOpacity="0.3" />
                        <stop offset="1" stopColor="hsl(225, 100%, 56%)" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* "What you get" feature card */}
              <Card className="mt-8 border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-white">What you get</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan" />
                      <span className="text-sm text-white/80">Free site survey</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan" />
                      <span className="text-sm text-white/80">Clear final price before work starts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan" />
                      <span className="text-sm text-white/80">Warranty-backed installation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
