'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/page-layout';
import { WizardLoadingSkeleton } from '@/components/wizard-loading';
import { StepServicingPostcode } from '@/components/servicing-wizard-steps/step-servicing-postcode';
import { StepServicingBoilerDetails } from '@/components/servicing-wizard-steps/step-servicing-boiler-details';
import { StepServicingContact } from '@/components/servicing-wizard-steps/step-servicing-contact';
import { StepServicingConfirmation } from '@/components/servicing-wizard-steps/step-servicing-confirmation';
import { StepServicingOutOfArea } from '@/components/servicing-wizard-steps/step-servicing-out-of-area';

interface ServicingFormData {
  postcode: string;
  outwardCode?: string;
  coverageStatus?: 'in_area' | 'out_of_area';
  fuelType: string;
  boilerType: string;
  boilerMake: string;
  boilerModel: string;
  lastServiced: string;
  name: string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  preferredTimeWindow: string;
  notes: string;
}

export default function ServicingBookPage() {
  const [currentStep, setCurrentStep] = useState<'postcode' | 'boiler-details' | 'contact' | 'out-of-area' | 'confirmation'>('postcode');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceRef, setServiceRef] = useState('');
  const [formData, setFormData] = useState<Partial<ServicingFormData>>({
    postcode: '',
    fuelType: '',
    boilerType: '',
    boilerMake: '',
    boilerModel: '',
    lastServiced: '',
    name: '',
    email: '',
    phone: '',
    preferredContactMethod: 'Email',
    preferredTimeWindow: 'Anytime',
    notes: '',
  });

  const handlePostcodeNext = (postcode: string, coverageData: { outwardCode: string; coverageStatus: 'in_area' | 'out_of_area' }) => {
    setFormData((prev) => ({
      ...prev,
      postcode,
      outwardCode: coverageData.outwardCode,
      coverageStatus: coverageData.coverageStatus,
    }));
    setCurrentStep('boiler-details');
  };

  const handlePostcodeOutOfArea = (postcode: string, outwardCode: string) => {
    setFormData((prev) => ({
      ...prev,
      postcode,
      outwardCode,
      coverageStatus: 'out_of_area',
    }));
    setCurrentStep('out-of-area');
  };

  const handleBoilerDetailsNext = (data: {
    fuelType: string;
    boilerType: string;
    boilerMake: string;
    boilerModel: string;
    lastServiced: string;
  }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep('contact');
  };

  const handleContactNext = async (data: {
    name: string;
    email: string;
    phone: string;
    preferredContactMethod: string;
    preferredTimeWindow: string;
    notes: string;
  }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        ...data,
        requestType: 'servicing',
      };

      const response = await fetch('/api/servicing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit servicing request');
      }

      const result = await response.json();
      setServiceRef(result.serviceRef);
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Error submitting servicing request:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOutOfAreaSubmit = async (data: {
    postcode: string;
    outwardCode: string;
    name: string;
    email: string;
    phone: string;
    notes: string;
  }) => {
    setIsSubmitting(true);

    try {
      const payload = {
        ...data,
        requestType: 'out_of_area_enquiry',
        coverageStatus: 'out_of_area',
      };

      const response = await fetch('/api/servicing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      const result = await response.json();
      setServiceRef(result.serviceRef);
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('There was an error submitting your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <PageLayout>
        <div className="bg-gradient-to-b from-background to-muted/20 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <WizardLoadingSkeleton />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-background to-muted/20 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {currentStep === 'postcode' && (
            <StepServicingPostcode
              value={formData.postcode || ''}
              onNext={handlePostcodeNext}
              onOutOfArea={handlePostcodeOutOfArea}
            />
          )}

          {currentStep === 'boiler-details' && (
            <StepServicingBoilerDetails
              value={{
                fuelType: formData.fuelType || '',
                boilerType: formData.boilerType || '',
                boilerMake: formData.boilerMake || '',
                boilerModel: formData.boilerModel || '',
                lastServiced: formData.lastServiced || '',
              }}
              onNext={handleBoilerDetailsNext}
            />
          )}

          {currentStep === 'contact' && (
            <StepServicingContact
              value={{
                name: formData.name || '',
                email: formData.email || '',
                phone: formData.phone || '',
                preferredContactMethod: formData.preferredContactMethod || 'Email',
                preferredTimeWindow: formData.preferredTimeWindow || 'Anytime',
                notes: formData.notes || '',
              }}
              onNext={handleContactNext}
            />
          )}

          {currentStep === 'out-of-area' && (
            <StepServicingOutOfArea
              postcode={formData.postcode || ''}
              outwardCode={formData.outwardCode || ''}
              onSubmit={handleOutOfAreaSubmit}
            />
          )}

          {currentStep === 'confirmation' && (
            <StepServicingConfirmation serviceRef={serviceRef} />
          )}
        </div>
      </div>
    </PageLayout>
  );
}
