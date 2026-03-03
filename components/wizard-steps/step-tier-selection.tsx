'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, ChevronLeft, Shield, CircleAlert as AlertCircle } from 'lucide-react';
import { BOILER_TIERS, PRICE_CHANGE_FACTORS, BoilerTier, QuoteFormData } from '@/lib/types';
import { formatPrice } from '@/lib/quote-utils';
import { cn } from '@/lib/utils';

interface StepTierSelectionProps {
  value?: QuoteFormData['tierName'];
  onNext: (data: Pick<QuoteFormData, 'tierName' | 'fromPrice' | 'warrantyYears'>) => void;
  onBack: () => void;
}

export function StepTierSelection({ value, onNext, onBack }: StepTierSelectionProps) {
  const [selectedTier, setSelectedTier] = useState(value || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedTier) {
      setError('Please select a boiler tier');
      return;
    }

    const tier = BOILER_TIERS.find((t) => t.name === selectedTier);
    if (tier) {
      onNext({
        tierName: tier.name as QuoteFormData['tierName'],
        fromPrice: tier.fromPrice,
        warrantyYears: tier.warrantyYears,
      });
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900">Choose your boiler</h2>
        <p className="mt-2 text-lg text-slate-600">
          Select the tier that best suits your needs
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {BOILER_TIERS.map((tier) => (
            <TierCard
              key={tier.name}
              tier={tier}
              selected={selectedTier === tier.name}
              onSelect={() => setSelectedTier(tier.name)}
            />
          ))}
        </div>

        {error && (
          <p className="text-center text-sm text-red-600">{error}</p>
        )}

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              <div>
                <p className="font-medium text-slate-900">
                  Final price confirmed after a free site survey
                </p>
              </div>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="price-changes">
                <AccordionTrigger className="text-sm font-medium">
                  What can change the final price?
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {PRICE_CHANGE_FACTORS.map((factor, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

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
    </div>
  );
}

function TierCard({
  tier,
  selected,
  onSelect,
}: {
  tier: BoilerTier;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      className={cn(
        'relative cursor-pointer transition-all hover:shadow-lg',
        selected ? 'border-blue-600 shadow-lg ring-2 ring-blue-600' : 'border-slate-200'
      )}
      onClick={onSelect}
    >
      {selected && (
        <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
          <Check className="h-5 w-5 text-white" />
        </div>
      )}

      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{tier.name}</CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-slate-500">From</span>
          <span className="text-3xl font-bold text-slate-900">
            {formatPrice(tier.fromPrice)}
          </span>
        </div>
        <Badge variant="secondary" className="w-fit">
          <Shield className="mr-1 h-3 w-3" />
          {tier.warrantyYears} Year Warranty
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-sm font-medium text-slate-900">Includes:</div>
        <ul className="space-y-2">
          {tier.inclusions.map((inclusion, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
              {inclusion}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
