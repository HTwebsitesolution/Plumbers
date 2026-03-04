'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { validateUKPostcode, formatPostcode, checkPostcodeCoverage } from '@/lib/quote-utils';
import { CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Info } from 'lucide-react';

interface StepPostcodeProps {
  value: string;
  onNext: (postcode: string, coverageData: { outwardCode: string; coverageStatus: 'in_area' | 'out_of_area' }) => void;
  onEnquiry?: () => void;
}

export function StepPostcode({ value, onNext, onEnquiry }: StepPostcodeProps) {
  const [postcode, setPostcode] = useState(value || '');

  const validationStatus = useMemo(() => {
    const trimmed = postcode.trim();

    if (!trimmed) {
      return { type: 'empty' as const };
    }

    const isValid = validateUKPostcode(trimmed);

    if (!isValid) {
      return { type: 'invalid' as const };
    }

    const formatted = formatPostcode(trimmed);
    const coverage = checkPostcodeCoverage(formatted);

    if (coverage.isInArea) {
      return {
        type: 'in_area' as const,
        outwardCode: coverage.outwardCode,
        formatted
      };
    }

    return {
      type: 'out_of_area' as const,
      outwardCode: coverage.outwardCode,
      formatted
    };
  }, [postcode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setPostcode(value);
  };

  const handleBlur = () => {
    const trimmed = postcode.trim().replace(/\s+/g, ' ');
    setPostcode(trimmed);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validationStatus.type === 'in_area') {
      const coverage = checkPostcodeCoverage(validationStatus.formatted);
      onNext(validationStatus.formatted, {
        outwardCode: coverage.outwardCode,
        coverageStatus: 'in_area'
      });
    }
  };

  const handleEnquiry = () => {
    if (onEnquiry) {
      onEnquiry();
    }
  };

  const canProceed = validationStatus.type === 'in_area';

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Check your postcode</CardTitle>
          <CardDescription className="text-base">
            Enter your postcode to confirm we cover your area.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="postcode">Postcode</Label>
              <Input
                id="postcode"
                type="text"
                placeholder="e.g. DN22 7ZZ"
                value={postcode}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="text-lg"
                autoFocus
              />

              {validationStatus.type === 'empty' && (
                <p className="text-sm text-muted-foreground">
                  Enter a postcode to check coverage
                </p>
              )}

              {validationStatus.type === 'invalid' && (
                <div className="flex items-start gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Please enter a valid UK postcode.</span>
                </div>
              )}

              {validationStatus.type === 'in_area' && (
                <div className="space-y-1">
                  <div className="flex items-start gap-2 text-sm text-green-700">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Covered — we serve {validationStatus.outwardCode}.</p>
                      <p className="text-muted-foreground mt-0.5">You can continue to get your provisional estimate.</p>
                    </div>
                  </div>
                </div>
              )}

              {validationStatus.type === 'out_of_area' && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-amber-700">
                    <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Not currently covered — {validationStatus.outwardCode}.</span>
                  </div>

                  <Alert className="border-amber-200 bg-amber-50">
                    <Info className="h-4 w-4 text-amber-700" />
                    <AlertTitle className="text-amber-900">Outside our service area</AlertTitle>
                    <AlertDescription className="text-amber-800 space-y-3">
                      <p>If you're just outside, send an enquiry and we'll confirm if we can help.</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleEnquiry}
                        className="border-amber-300 bg-white hover:bg-amber-50"
                      >
                        Send enquiry
                      </Button>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!canProceed}
            >
              Next
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
