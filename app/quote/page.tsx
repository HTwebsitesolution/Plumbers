'use client';

import { useState } from 'react';
import { QuoteWizard } from '@/components/quote-wizard';
import { QuoteSummary } from '@/components/quote-summary';
import { StepPostcode } from '@/components/wizard-steps/step-postcode';
import { StepOutOfArea } from '@/components/wizard-steps/step-out-of-area';
import { StepProperty } from '@/components/wizard-steps/step-property';
import { StepCurrentBoiler } from '@/components/wizard-steps/step-current-boiler';
import { StepTierSelection } from '@/components/wizard-steps/step-tier-selection';
import { StepBrand } from '@/components/wizard-steps/step-brand';
import { StepOptions } from '@/components/wizard-steps/step-options';
import { StepDetails } from '@/components/wizard-steps/step-details';
import { StepReview } from '@/components/wizard-steps/step-review';
import { StepConfirmation } from '@/components/wizard-steps/step-confirmation';
import { QuoteFormData, OutOfAreaEnquiry } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function QuotePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOutOfArea, setIsOutOfArea] = useState(false);
  const [quoteRef, setQuoteRef] = useState('');
  const [submittedData, setSubmittedData] = useState<Partial<QuoteFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleOutOfAreaSubmit = async (enquiry: OutOfAreaEnquiry) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enquiry),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to submit enquiry');
      }

      const data = await response.json();

      setQuoteRef(data.quoteRef);
      setSubmittedData(enquiry);
      setIsSubmitted(true);
      setIsOutOfArea(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit enquiry. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalSubmit = async (formData: Partial<QuoteFormData>, resetWizard: () => void) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to submit quote');
      }

      const data = await response.json();

      setQuoteRef(data.quoteRef);
      setSubmittedData(formData);
      setIsSubmitted(true);
      resetWizard();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit quote. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && quoteRef) {
    return <StepConfirmation quoteRef={quoteRef} formData={submittedData} />;
  }

  return (
    <QuoteWizard>
      {({ currentStep, formData, updateFormData, nextStep, prevStep, resetWizard }) => {
        if (formData.coverageStatus === 'out_of_area' && currentStep === 2) {
          return (
            <StepOutOfArea
              postcode={formData.postcode || ''}
              outwardCode={formData.outwardCode || ''}
              onSubmit={handleOutOfAreaSubmit}
            />
          );
        }

        return (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <StepPostcode
                  value={formData.postcode || ''}
                  onNext={(postcode, coverageData) => {
                    updateFormData({
                      postcode,
                      outwardCode: coverageData.outwardCode,
                      coverageStatus: coverageData.coverageStatus
                    });
                    nextStep();
                  }}
                  onEnquiry={() => {
                    nextStep();
                  }}
                />
              )}

            {currentStep === 2 && (
              <StepProperty
                values={{
                  propertyType: formData.propertyType,
                  bedrooms: formData.bedrooms,
                  bathrooms: formData.bathrooms,
                }}
                onNext={(data) => {
                  updateFormData(data);
                  nextStep();
                }}
                onBack={prevStep}
              />
            )}

            {currentStep === 3 && (
              <StepCurrentBoiler
                values={{
                  fuelType: formData.fuelType,
                  currentBoilerType: formData.currentBoilerType,
                  boilerLocation: formData.boilerLocation,
                }}
                onNext={(data) => {
                  updateFormData(data);
                  nextStep();
                }}
                onBack={prevStep}
              />
            )}

            {currentStep === 4 && (
              <StepTierSelection
                value={formData.tierName}
                onNext={(data) => {
                  updateFormData(data);
                  nextStep();
                }}
                onBack={prevStep}
              />
            )}

            {currentStep === 5 && (
              <StepBrand
                value={formData.brandPreference}
                onNext={(brandPreference) => {
                  updateFormData({ brandPreference });
                  nextStep();
                }}
                onBack={prevStep}
              />
            )}

            {currentStep === 6 && (
              <StepOptions
                value={formData.customerNotes}
                onNext={(customerNotes) => {
                  updateFormData({ customerNotes });
                  nextStep();
                }}
                onBack={prevStep}
              />
            )}

            {currentStep === 7 && (
              <StepDetails
                values={{
                  customerName: formData.customerName,
                  customerEmail: formData.customerEmail,
                  customerPhone: formData.customerPhone,
                  addressLine1: formData.addressLine1,
                  preferredContactMethod: formData.preferredContactMethod,
                  preferredTimeWindow: formData.preferredTimeWindow,
                }}
                onSubmit={(data) => {
                  updateFormData(data);
                  nextStep();
                }}
                onBack={prevStep}
              />
            )}

            {currentStep === 8 && (
              <StepReview
                formData={formData}
                onSubmit={() => handleFinalSubmit(formData, resetWizard)}
                onBack={prevStep}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

            {currentStep >= 4 && currentStep <= 7 && (
              <div className="lg:col-span-1">
                <QuoteSummary formData={formData} />
              </div>
            )}
          </div>
        );
      }}
    </QuoteWizard>
  );
}
