'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { validateUKPostcode, formatPostcode, checkPostcodeCoverage } from '@/lib/quote-utils';
import { MapPin, CircleAlert as AlertCircle } from 'lucide-react';

interface StepPostcodeProps {
  value: string;
  onNext: (postcode: string, coverageData: { outwardCode: string; coverageStatus: 'in_area' | 'out_of_area' }) => void;
}

export function StepPostcode({ value, onNext }: StepPostcodeProps) {
  const [postcode, setPostcode] = useState(value || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!postcode.trim()) {
      setError('Please enter your postcode');
      return;
    }

    if (!validateUKPostcode(postcode)) {
      setError('Please enter a valid UK postcode');
      return;
    }

    const formattedPostcode = formatPostcode(postcode);
    const coverageData = checkPostcodeCoverage(formattedPostcode);

    onNext(formattedPostcode, {
      outwardCode: coverageData.outwardCode,
      coverageStatus: coverageData.coverageStatus
    });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <MapPin className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl">Where is your property?</CardTitle>
          <CardDescription className="text-base">
            Enter your postcode to get started with your boiler quote
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="postcode">Postcode</Label>
              <Input
                id="postcode"
                type="text"
                placeholder="e.g. SW1A 1AA"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                className="text-lg"
                autoFocus
              />
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Coverage is confirmed when we contact you to arrange a free site survey.
              </AlertDescription>
            </Alert>

            <Button type="submit" size="lg" className="w-full">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
