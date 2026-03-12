'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, Loader as Loader2, ClipboardCheck } from 'lucide-react';
import { QuoteFormData } from '@/lib/types';
import { formatPrice } from '@/lib/quote-utils';

interface StepReviewProps {
  formData: Partial<QuoteFormData>;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function StepReview({ formData, onSubmit, onBack, isSubmitting }: StepReviewProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <Card className="rounded-3xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <ClipboardCheck className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl">Review your quote request</CardTitle>
          <CardDescription className="text-base">
            Please check everything is correct before submitting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4 sm:pt-6">
          <div className="border border-slate-200/80 rounded-2xl bg-slate-50/80 p-4 sm:p-5">
            <h3 className="mb-3 text-lg font-semibold text-slate-900">Selected Package</h3>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-xl font-semibold text-slate-900">
                  {formData.tierName || 'Not selected'}
                </div>
                <div className="mt-2 space-y-1 text-sm text-slate-600">
                  <div>Warranty: {formData.warrantyYears} years</div>
                  <div>Brand preference: {formData.brandPreference || 'Not specified'}</div>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-sm text-slate-500">From</div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatPrice(formData.fromPrice || 0)}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Property Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-600">Postcode:</dt>
                  <dd className="font-medium text-slate-900">{formData.postcode || 'N/A'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Property type:</dt>
                  <dd className="font-medium text-slate-900">{formData.propertyType || 'N/A'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Bedrooms:</dt>
                  <dd className="font-medium text-slate-900">{formData.bedrooms || 'N/A'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Bathrooms:</dt>
                  <dd className="font-medium text-slate-900">{formData.bathrooms || 'N/A'}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Current Boiler</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-600">Fuel type:</dt>
                  <dd className="font-medium text-slate-900">{formData.fuelType || 'N/A'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Boiler type:</dt>
                  <dd className="font-medium text-slate-900">{formData.currentBoilerType || 'N/A'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Location:</dt>
                  <dd className="font-medium text-slate-900">{formData.boilerLocation || 'N/A'}</dd>
                </div>
              </dl>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 text-lg font-semibold text-slate-900">Your Contact Details</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-600">Name:</dt>
                <dd className="font-medium text-slate-900">{formData.customerName || 'N/A'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Email:</dt>
                <dd className="font-medium text-slate-900">{formData.customerEmail || 'N/A'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Phone:</dt>
                <dd className="font-medium text-slate-900">{formData.customerPhone || 'N/A'}</dd>
              </div>
              {formData.addressLine1 && (
                <div className="flex justify-between">
                  <dt className="text-slate-600">Address:</dt>
                  <dd className="font-medium text-slate-900">{formData.addressLine1}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-slate-600">Preferred contact:</dt>
                <dd className="font-medium text-slate-900">{formData.preferredContactMethod || 'N/A'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Preferred time:</dt>
                <dd className="font-medium text-slate-900">{formData.preferredTimeWindow || 'N/A'}</dd>
              </div>
            </dl>
          </div>

          {formData.customerNotes && (
            <>
              <Separator />
              <div>
                <h3 className="mb-3 text-lg font-semibold text-slate-900">Additional Notes</h3>
                <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  {formData.customerNotes}
                </p>
              </div>
            </>
          )}

          <Separator />

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
            <strong>Important:</strong> By submitting this request, you agree to us contacting you
            about your boiler quote. The price shown is indicative and based on a standard installation.
            Your final price will be confirmed after a free site survey.
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="w-full sm:w-32"
              disabled={isSubmitting}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              type="button"
              onClick={onSubmit}
              size="lg"
              className="flex-1 btn-gradient"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Request Free Survey'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
