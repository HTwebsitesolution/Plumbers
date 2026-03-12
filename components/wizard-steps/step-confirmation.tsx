'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CircleCheck as CheckCircle2, Mail, Phone, Calendar, Chrome as Home } from 'lucide-react';
import { formatPrice } from '@/lib/quote-utils';

interface StepConfirmationProps {
  quoteRef: string;
  formData: {
    tierName?: string;
    fromPrice?: number;
    warrantyYears?: number;
    customerName?: string;
    customerEmail?: string;
    postcode?: string;
  };
}

export function StepConfirmation({ quoteRef, formData }: StepConfirmationProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl text-green-900">
            Quote request received!
          </CardTitle>
          <CardDescription className="text-base text-green-700">
            We'll be in touch soon to arrange your free site survey
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Quote Reference</CardTitle>
            <Badge variant="outline" className="text-base font-mono">
              {quoteRef}
            </Badge>
          </div>
          <CardDescription>
            Keep this reference for your records
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Your Quote Summary
            </h3>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium text-slate-900">
                    {formData.tierName}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                    <span>{formData.warrantyYears} Year Warranty</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500">From</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatPrice(formData.fromPrice || 0)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              What happens next?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">
                    Check your email
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">
                    We've sent a confirmation to{' '}
                    <span className="font-medium">{formData.customerEmail}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">
                    We'll contact you
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Our team will reach out within 24 hours to discuss your requirements.
                    We&apos;ll contact you from a local South Yorkshire or North Nottinghamshire number so you know it&apos;s us.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">
                    Schedule your survey
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">
                    We'll arrange a convenient time for a free, no-obligation site survey
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Home className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">
                    Get your final quote
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">
                    After the survey, we'll provide your confirmed price and installation timeline
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <strong className="text-slate-900">Important:</strong> The price shown is
            a provisional estimate based on a standard installation. Your final price
            will be confirmed after our free site survey, where we'll assess any
            specific requirements for your property.
          </div>

          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
