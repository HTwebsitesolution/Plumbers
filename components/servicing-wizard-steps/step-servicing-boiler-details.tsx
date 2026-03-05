'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BoilerDetails {
  fuelType: string;
  boilerType: string;
  boilerMake: string;
  boilerModel: string;
  lastServiced: string;
}

interface StepServicingBoilerDetailsProps {
  value: BoilerDetails;
  onNext: (data: BoilerDetails) => void;
}

export function StepServicingBoilerDetails({ value, onNext }: StepServicingBoilerDetailsProps) {
  const [fuelType, setFuelType] = useState(value.fuelType || '');
  const [boilerType, setBoilerType] = useState(value.boilerType || '');
  const [boilerMake, setBoilerMake] = useState(value.boilerMake || '');
  const [boilerModel, setBoilerModel] = useState(value.boilerModel || '');
  const [lastServiced, setLastServiced] = useState(value.lastServiced || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      fuelType,
      boilerType,
      boilerMake,
      boilerModel,
      lastServiced,
    });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Your Boiler Details</CardTitle>
          <CardDescription className="text-base">
            Tell us about your boiler to help us prepare for your service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label>Fuel Type</Label>
              <RadioGroup value={fuelType} onValueChange={setFuelType}>
                {['Gas', 'LPG', 'Oil'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={`fuel-${type}`} />
                    <Label htmlFor={`fuel-${type}`} className="font-normal cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Boiler Type</Label>
              <RadioGroup value={boilerType} onValueChange={setBoilerType}>
                {['Combi', 'System', 'Regular', 'Not sure'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={`boiler-${type}`} />
                    <Label htmlFor={`boiler-${type}`} className="font-normal cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label htmlFor="boilerMake">Boiler Make (optional)</Label>
              <Input
                id="boilerMake"
                type="text"
                placeholder="e.g. Worcester Bosch, Vaillant, Baxi"
                value={boilerMake}
                onChange={(e) => setBoilerMake(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="boilerModel">Boiler Model (optional)</Label>
              <Input
                id="boilerModel"
                type="text"
                placeholder="e.g. Greenstar 30CDi"
                value={boilerModel}
                onChange={(e) => setBoilerModel(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="lastServiced">When was it last serviced? (optional)</Label>
              <Select value={lastServiced} onValueChange={setLastServiced}>
                <SelectTrigger id="lastServiced">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Within the last year">Within the last year</SelectItem>
                  <SelectItem value="1-2 years ago">1-2 years ago</SelectItem>
                  <SelectItem value="2-3 years ago">2-3 years ago</SelectItem>
                  <SelectItem value="Over 3 years ago">Over 3 years ago</SelectItem>
                  <SelectItem value="Never serviced">Never serviced</SelectItem>
                  <SelectItem value="Not sure">Not sure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!fuelType || !boilerType}
            >
              Next
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
