'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/page-layout';
import { WizardLoadingSkeleton } from '@/components/wizard-loading';
import { StepRepairsPostcode } from '@/components/repairs-wizard-steps/step-repairs-postcode';
import { StepRepairsIssueDetails } from '@/components/repairs-wizard-steps/step-repairs-issue-details';
import { StepRepairsBoilerDetails } from '@/components/repairs-wizard-steps/step-repairs-boiler-details';
import { StepRepairsContact } from '@/components/repairs-wizard-steps/step-repairs-contact';
import { StepRepairsConfirmation } from '@/components/repairs-wizard-steps/step-repairs-confirmation';
import { StepRepairsOutOfArea } from '@/components/repairs-wizard-steps/step-repairs-out-of-area';

interface RepairsFormData {
  postcode: string;
  outwardCode?: string;
  coverageStatus?: 'in_area' | 'out_of_area';
  issueCategory: string;
  errorCode: string;
  urgency: string;
  gasSmell: boolean;
  fuelType: string;
  boilerType: string;
  boilerMake: string;
  boilerModel: string;
  name: string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  preferredTimeWindow: string;
  notes: string;
}

export default function RepairsRequestPage() {
  const [currentStep, setCurrentStep] = useState<'postcode' | 'issue-details' | 'boiler-details' | 'contact' | 'out-of-area' | 'confirmation'>('postcode');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [repairRef, setRepairRef] = useState('');
  const [formData, setFormData] = useState<Partial<RepairsFormData>>({
    postcode: '',
    issueCategory: '',
    errorCode: '',
    urgency: '',
    gasSmell: false,
    fuelType: '',
    boilerType: '',
    boilerMake: '',
    boilerModel: '',
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
    setCurrentStep('issue-details');
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

  const handleIssueDetailsNext = (data: {
    issueCategory: string;
    errorCode: string;
    urgency: string;
    gasSmell: boolean;
  }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep('boiler-details');
  };

  const handleBoilerDetailsNext = (data: {
    fuelType: string;
    boilerType: string;
    boilerMake: string;
    boilerModel: string;
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
        requestType: 'repairs',
      };

      const response = await fetch('/api/repairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit repair request');
      }

      const result = await response.json();
      setRepairRef(result.repairRef);
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Error submitting repair request:', error);
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

      const response = await fetch('/api/repairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      const result = await response.json();
      setRepairRef(result.repairRef);
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
            <StepRepairsPostcode
              value={formData.postcode || ''}
              onNext={handlePostcodeNext}
              onOutOfArea={handlePostcodeOutOfArea}
            />
          )}

          {currentStep === 'issue-details' && (
            <StepRepairsIssueDetails
              value={{
                issueCategory: formData.issueCategory || '',
                errorCode: formData.errorCode || '',
                urgency: formData.urgency || '',
                gasSmell: formData.gasSmell || false,
              }}
              onNext={handleIssueDetailsNext}
            />
          )}

          {currentStep === 'boiler-details' && (
            <StepRepairsBoilerDetails
              value={{
                fuelType: formData.fuelType || '',
                boilerType: formData.boilerType || '',
                boilerMake: formData.boilerMake || '',
                boilerModel: formData.boilerModel || '',
              }}
              onNext={handleBoilerDetailsNext}
            />
          )}

          {currentStep === 'contact' && (
            <StepRepairsContact
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
            <StepRepairsOutOfArea
              postcode={formData.postcode || ''}
              outwardCode={formData.outwardCode || ''}
              onSubmit={handleOutOfAreaSubmit}
            />
          )}

          {currentStep === 'confirmation' && (
            <StepRepairsConfirmation repairRef={repairRef} />
          )}
        </div>
      </div>
    </PageLayout>
  );
}
