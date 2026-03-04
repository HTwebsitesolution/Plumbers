'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
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
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-2xl font-bold transition-colors hover:opacity-80">
            <span className="text-gradient">Boilable</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-cyan"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild className="hidden sm:inline-flex btn-gradient">
              <Link href="/quote">Get a Quote</Link>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu" className="text-foreground hover:text-brand-cyan">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card border-border">
                <nav className="flex flex-col gap-4 mt-8" role="navigation" aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-muted-foreground transition-colors hover:text-brand-cyan py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button asChild className="mt-4 w-full btn-gradient">
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
              <div className="mb-4 text-xl font-bold">
                <span className="text-gradient">Boilable</span>
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
