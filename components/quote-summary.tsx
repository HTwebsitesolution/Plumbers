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
    <Card className="sticky top-8 shadow-lg">
      <CardHeader className="bg-slate-50">
        <CardTitle className="text-xl">Your Quote Summary</CardTitle>
        <CardDescription>
          Provisional estimate subject to survey
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-slate-900">
              {formData.tierName}
            </h3>
            <div className="text-right">
              <div className="text-sm text-slate-500">From</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatPrice(formData.fromPrice || 0)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <Badge variant="secondary" className="font-medium">
              {formData.warrantyYears} Year Warranty
            </Badge>
          </div>
        </div>

        <Separator />

        <div className="space-y-3 text-sm">
          {formData.postcode && (
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
              <div>
                <div className="font-medium text-slate-700">Postcode</div>
                <div className="text-slate-600">{formData.postcode}</div>
              </div>
            </div>
          )}

          {formData.propertyType && (
            <div className="flex items-start gap-2">
              <Home className="mt-0.5 h-4 w-4 text-slate-400" />
              <div>
                <div className="font-medium text-slate-700">Property</div>
                <div className="text-slate-600">
                  {formData.propertyType}
                  {formData.bedrooms && ` • ${formData.bedrooms} bed`}
                  {formData.bathrooms && ` • ${formData.bathrooms} bath`}
                </div>
              </div>
            </div>
          )}

          {formData.fuelType && (
            <div className="flex items-start gap-2">
              <Fuel className="mt-0.5 h-4 w-4 text-slate-400" />
              <div>
                <div className="font-medium text-slate-700">Current System</div>
                <div className="text-slate-600">
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
              <Package className="mt-0.5 h-4 w-4 text-slate-400" />
              <div>
                <div className="font-medium text-slate-700">Brand Preference</div>
                <div className="text-slate-600">{formData.brandPreference}</div>
              </div>
            </div>
          )}

          {formData.customerNotes && (
            <div className="flex items-start gap-2">
              <FileText className="mt-0.5 h-4 w-4 text-slate-400" />
              <div>
                <div className="font-medium text-slate-700">Notes</div>
                <div className="text-slate-600">
                  {formData.customerNotes.length > 60
                    ? `${formData.customerNotes.substring(0, 60)}...`
                    : formData.customerNotes}
                </div>
              </div>
            </div>
          )}
        </div>

        <Separator />

        <div className="rounded-lg bg-blue-50 p-3 text-xs text-slate-600">
          <strong className="text-slate-900">Please note:</strong> Final price
          confirmed after a free site survey.
        </div>
      </CardContent>
    </Card>
  );
}
