'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Package, ChevronLeft } from 'lucide-react';
import { BRAND_OPTIONS, QuoteFormData } from '@/lib/types';

interface StepBrandProps {
  value?: QuoteFormData['brandPreference'];
  onNext: (brandPreference: QuoteFormData['brandPreference']) => void;
  onBack: () => void;
}

export function StepBrand({ value, onNext, onBack }: StepBrandProps) {
  const [brandPreference, setBrandPreference] = useState(value || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!brandPreference) {
      setError('Please select a brand preference');
      return;
    }

    onNext(brandPreference as QuoteFormData['brandPreference']);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Package className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl">Brand preference</CardTitle>
          <CardDescription className="text-base">
            Do you have a preferred boiler brand?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <RadioGroup value={brandPreference} onValueChange={setBrandPreference}>
                {BRAND_OPTIONS.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <RadioGroupItem value={brand} id={`brand-${brand}`} />
                    <Label htmlFor={`brand-${brand}`} className="cursor-pointer font-normal">
                      {brand}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              We'll recommend the best-fit model at the survey.
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onBack} className="w-32">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="submit" size="lg" className="flex-1">
                Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
