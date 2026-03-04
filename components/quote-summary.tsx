'use client';

import { QuoteFormData } from '@/lib/types';
import { formatPrice } from '@/lib/quote-utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, MapPin, Fuel, Chrome as Home, Package, FileText } from 'lucide-react';

interface QuoteSummaryProps {
  formData: Partial<QuoteFormData>;
}

export function QuoteSummary({ formData }: QuoteSummaryProps) {
  if (!formData.tierName) {
    return null;
  }

  return (
    <Card className="sticky top-8 shadow-2xl gradient-border-card">
      <CardHeader className="bg-card/50 backdrop-blur">
        <CardTitle className="text-xl">Your Quote Summary</CardTitle>
        <CardDescription className="text-muted-foreground">
          Provisional estimate subject to survey
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-foreground">
              {formData.tierName}
            </h3>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">From</div>
              <div className="text-gradient text-3xl font-bold">
                {formatPrice(formData.fromPrice || 0)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-brand-cyan" />
            <Badge className="font-medium bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20 hover:bg-brand-cyan/20">
              {formData.warrantyYears} Year Warranty
            </Badge>
          </div>
        </div>

        <Separator className="bg-border" />

        <div className="space-y-3 text-sm">
          {formData.postcode && (
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-brand-cyan" />
              <div>
                <div className="font-medium text-foreground">Postcode</div>
                <div className="text-muted-foreground">{formData.postcode}</div>
              </div>
            </div>
          )}

          {formData.propertyType && (
            <div className="flex items-start gap-2">
              <Home className="mt-0.5 h-4 w-4 text-brand-blue" />
              <div>
                <div className="font-medium text-foreground">Property</div>
                <div className="text-muted-foreground">
                  {formData.propertyType}
                  {formData.bedrooms && ` • ${formData.bedrooms} bed`}
                  {formData.bathrooms && ` • ${formData.bathrooms} bath`}
                </div>
              </div>
            </div>
          )}

          {formData.fuelType && (
            <div className="flex items-start gap-2">
              <Fuel className="mt-0.5 h-4 w-4 text-brand-cyan" />
              <div>
                <div className="font-medium text-foreground">Current System</div>
                <div className="text-muted-foreground">
                  {formData.fuelType}
                  {formData.currentBoilerType &&
                    ` • ${formData.currentBoilerType}`}
                  {formData.boilerLocation && ` • ${formData.boilerLocation}`}
                </div>
              </div>
            </div>
          )}

          {formData.brandPreference && (
            <div className="flex items-start gap-2">
              <Package className="mt-0.5 h-4 w-4 text-brand-blue" />
              <div>
                <div className="font-medium text-foreground">Brand Preference</div>
                <div className="text-muted-foreground">{formData.brandPreference}</div>
              </div>
            </div>
          )}

          {formData.customerNotes && (
            <div className="flex items-start gap-2">
              <FileText className="mt-0.5 h-4 w-4 text-brand-cyan" />
              <div>
                <div className="font-medium text-foreground">Notes</div>
                <div className="text-muted-foreground">
                  {formData.customerNotes.length > 60
                    ? `${formData.customerNotes.substring(0, 60)}...`
                    : formData.customerNotes}
                </div>
              </div>
            </div>
          )}
        </div>

        <Separator className="bg-border" />

        <div className="rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 p-3 text-xs text-muted-foreground">
          <strong className="text-foreground">Please note:</strong> Final price
          confirmed after a free site survey.
        </div>
      </CardContent>
    </Card>
  );
}
