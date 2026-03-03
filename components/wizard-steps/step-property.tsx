'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Chrome as Home, ChevronLeft } from 'lucide-react';
import { PROPERTY_TYPES, QuoteFormData } from '@/lib/types';

interface StepPropertyProps {
  values: {
    propertyType?: QuoteFormData['propertyType'];
    bedrooms?: number;
    bathrooms?: number;
  };
  onNext: (data: Pick<QuoteFormData, 'propertyType' | 'bedrooms' | 'bathrooms'>) => void;
  onBack: () => void;
}

export function StepProperty({ values, onNext, onBack }: StepPropertyProps) {
  const [propertyType, setPropertyType] = useState(values.propertyType || '');
  const [bedrooms, setBedrooms] = useState(values.bedrooms?.toString() || '');
  const [bathrooms, setBathrooms] = useState(values.bathrooms?.toString() || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!propertyType) newErrors.propertyType = 'Please select a property type';
    if (!bedrooms) newErrors.bedrooms = 'Please select number of bedrooms';
    if (!bathrooms) newErrors.bathrooms = 'Please select number of bathrooms';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext({
      propertyType: propertyType as QuoteFormData['propertyType'],
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
    });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Home className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl">Tell us about your property</CardTitle>
          <CardDescription className="text-base">
            This helps us provide an accurate estimate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label>Property Type</Label>
              <RadioGroup value={propertyType} onValueChange={setPropertyType}>
                {PROPERTY_TYPES.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type} className="cursor-pointer font-normal">
                      {type}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.propertyType && (
                <p className="text-sm text-red-600">{errors.propertyType}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Number of Bedrooms</Label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger id="bedrooms">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'bedroom' : 'bedrooms'}
                      </SelectItem>
                    ))}
                    <SelectItem value="7">7+ bedrooms</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bedrooms && (
                  <p className="text-sm text-red-600">{errors.bedrooms}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Number of Bathrooms</Label>
                <Select value={bathrooms} onValueChange={setBathrooms}>
                  <SelectTrigger id="bathrooms">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'bathroom' : 'bathrooms'}
                      </SelectItem>
                    ))}
                    <SelectItem value="6">6+ bathrooms</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bathrooms && (
                  <p className="text-sm text-red-600">{errors.bathrooms}</p>
                )}
              </div>
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
