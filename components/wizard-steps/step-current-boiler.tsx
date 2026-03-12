'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Flame, ChevronLeft, Droplet, Fuel, Wind } from 'lucide-react';
import { FUEL_TYPES, BOILER_TYPES, BOILER_LOCATIONS, QuoteFormData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StepCurrentBoilerProps {
  values: {
    fuelType?: QuoteFormData['fuelType'];
    currentBoilerType?: QuoteFormData['currentBoilerType'];
    boilerLocation?: QuoteFormData['boilerLocation'];
  };
  onNext: (data: Pick<QuoteFormData, 'fuelType' | 'currentBoilerType' | 'boilerLocation'>) => void;
  onBack: () => void;
}

export function StepCurrentBoiler({ values, onNext, onBack }: StepCurrentBoilerProps) {
  const [fuelType, setFuelType] = useState(values.fuelType || '');
  const [currentBoilerType, setCurrentBoilerType] = useState(values.currentBoilerType || '');
  const [boilerLocation, setBoilerLocation] = useState(values.boilerLocation || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fuelType) newErrors.fuelType = 'Please select a fuel type';
    if (!currentBoilerType) newErrors.currentBoilerType = 'Please select a boiler type';
    if (!boilerLocation) newErrors.boilerLocation = 'Please select the boiler location';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext({
      fuelType: fuelType as QuoteFormData['fuelType'],
      currentBoilerType: currentBoilerType as QuoteFormData['currentBoilerType'],
      boilerLocation: boilerLocation as QuoteFormData['boilerLocation'],
    });
  };

  const getFuelIcon = (fuel: string) => {
    switch (fuel) {
      case 'Gas':
        return Flame;
      case 'LPG':
        return Droplet;
      case 'Oil':
        return Fuel;
      default:
        return Wind;
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="rounded-3xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Flame className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl">Your current boiler</CardTitle>
          <CardDescription className="text-base">
            Tell us about your existing heating system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">What fuel type does your current boiler use?</Label>
              <div className="grid gap-3 sm:grid-cols-3">
                {FUEL_TYPES.map((type) => {
                  const Icon = getFuelIcon(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFuelType(type)}
                      className={cn(
                        'flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-50',
                        fuelType === type
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-200 bg-white'
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-full',
                          fuelType === type ? 'bg-blue-600' : 'bg-gray-100'
                        )}
                      >
                        <Icon
                          className={cn(
                            'h-6 w-6',
                            fuelType === type ? 'text-white' : 'text-gray-600'
                          )}
                        />
                      </div>
                      <span className="font-medium">{type}</span>
                    </button>
                  );
                })}
              </div>
              {errors.fuelType && (
                <p className="text-sm text-red-600">{errors.fuelType}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label>What type of boiler do you currently have?</Label>
              <RadioGroup value={currentBoilerType} onValueChange={setCurrentBoilerType}>
                {BOILER_TYPES.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={`boiler-${type}`} />
                    <Label htmlFor={`boiler-${type}`} className="cursor-pointer font-normal">
                      {type}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.currentBoilerType && (
                <p className="text-sm text-red-600">{errors.currentBoilerType}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Where is your boiler currently located?</Label>
              <RadioGroup value={boilerLocation} onValueChange={setBoilerLocation}>
                {BOILER_LOCATIONS.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <RadioGroupItem value={location} id={`location-${location}`} />
                    <Label htmlFor={`location-${location}`} className="cursor-pointer font-normal">
                      {location}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.boilerLocation && (
                <p className="text-sm text-red-600">{errors.boilerLocation}</p>
              )}
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
