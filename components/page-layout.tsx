'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Flame } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/boilers', label: 'Boilers' },
    { href: '/faqs', label: 'FAQs' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-white/98 backdrop-blur-lg shadow-sm supports-[backdrop-filter]:bg-white/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3 transition-all duration-300 hover:scale-105">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-red shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-brand-cyan/30">
              <Flame className="h-6 w-6 text-white animate-pulse-subtle" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-cyan/0 to-brand-blue/0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold leading-none tracking-tight text-gradient">Boilable</span>
              <span className="text-[10px] font-medium text-muted-foreground/70 tracking-wider uppercase">Premium Installs</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:text-brand-cyan group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 scale-0 rounded-lg bg-brand-cyan/5 transition-transform duration-200 group-hover:scale-100"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild className="hidden sm:inline-flex btn-gradient shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/quote">Get a Quote</Link>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu" className="text-foreground hover:text-brand-cyan hover:bg-brand-cyan/10 transition-all duration-200">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card border-border">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-red shadow-lg">
                    <Flame className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gradient">Boilable</span>
                    <span className="text-[9px] font-medium text-muted-foreground/70 tracking-wider uppercase">Premium Installs</span>
                  </div>
                </div>
                <nav className="flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-lg px-4 py-3 text-base font-semibold text-slate-700 transition-all duration-200 hover:bg-brand-cyan/10 hover:text-brand-cyan"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button asChild className="mt-4 w-full btn-gradient shadow-lg">
                    <Link href="/quote" onClick={() => setIsOpen(false)}>Get a Quote</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-red shadow-md">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gradient leading-none">Boilable</span>
                  <span className="text-[9px] font-medium text-muted-foreground/70 tracking-wider uppercase">Premium Installs</span>
                </div>
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
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            &copy; 2024 Boilable. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
