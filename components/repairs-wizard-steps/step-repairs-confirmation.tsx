'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleCheck as CheckCircle2 } from 'lucide-react';

interface StepRepairsConfirmationProps {
  repairRef: string;
}

export function StepRepairsConfirmation({ repairRef }: StepRepairsConfirmationProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl">Repair Request Received!</CardTitle>
          <CardDescription className="text-base">
            Your reference: <span className="font-mono font-semibold text-foreground">{repairRef}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted p-6 text-left">
            <h3 className="mb-3 font-semibold text-foreground">What happens next?</h3>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Our team will review your repair request</li>
              <li>We'll contact you to discuss the issue and arrange a visit</li>
              <li>Our Gas Safe engineer will diagnose and repair your boiler</li>
              <li>You'll receive confirmation once the repair is complete</li>
            </ol>
          </div>

          <p className="text-sm text-muted-foreground">
            We've sent a confirmation email with your reference number.
          </p>

          <Button
            asChild
            size="lg"
            className="w-full"
          >
            <a href="/">Back to Home</a>
          </Button>

          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">Leave a review</div>
                <div className="text-sm text-slate-600">
                  After your repair is complete, help other customers by sharing your experience.
                </div>
              </div>
              <Button asChild variant="outline" className="sm:w-auto">
                <Link href={`/reviews?type=repairs&ref=${encodeURIComponent(repairRef)}`}>
                  Leave a review
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
