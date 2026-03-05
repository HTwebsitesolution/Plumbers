'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleCheck as CheckCircle2 } from 'lucide-react';

interface StepServicingConfirmationProps {
  serviceRef: string;
}

export function StepServicingConfirmation({ serviceRef }: StepServicingConfirmationProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl">Service Request Received!</CardTitle>
          <CardDescription className="text-base">
            Your reference: <span className="font-mono font-semibold text-foreground">{serviceRef}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted p-6 text-left">
            <h3 className="mb-3 font-semibold text-foreground">What happens next?</h3>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Our team will contact you within 24 hours</li>
              <li>We'll arrange a convenient time for your boiler service</li>
              <li>Our Gas Safe engineer will perform a thorough service</li>
              <li>You'll receive a detailed service report and certificate</li>
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
        </CardContent>
      </Card>
    </div>
  );
}
