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
        <h2 className="text-3xl font-bold">Choose your boiler</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Select the tier that best suits your needs – you can still change this later in your quote.
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
          <p className="text-center text-sm text-destructive">{error}</p>
        )}

        <Card className="gradient-border-card">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan" />
              <div>
                <p className="font-medium text-foreground">
                  Final price confirmed after a free site survey
                </p>
              </div>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="price-changes" className="border-border">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:text-brand-cyan">
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
          <Button type="button" variant="outline" onClick={onBack} className="w-32 btn-secondary">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="submit" size="lg" className="flex-1 btn-gradient">
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
        'relative cursor-pointer transition-all hover:shadow-xl hover:scale-105',
        selected ? 'gradient-border-card ring-4 ring-brand-cyan/20 shadow-2xl' : 'premium-card'
      )}
      onClick={onSelect}
    >
      {selected && (
        <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand shadow-lg">
          <Check className="h-5 w-5 text-white" />
        </div>
      )}

      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{tier.name}</CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-muted-foreground">From</span>
          <span className="text-gradient text-3xl font-bold">
            {formatPrice(tier.fromPrice)}
          </span>
        </div>
        <Badge className="w-fit bg-brand-blue/10 text-brand-blue border-brand-blue/20 hover:bg-brand-blue/20">
          <Shield className="mr-1 h-3 w-3" />
          {tier.warrantyYears} Year Warranty
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-sm font-semibold text-foreground">Includes:</div>
        <ul className="space-y-2">
          {tier.inclusions.map((inclusion, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-cyan" />
              {inclusion}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
