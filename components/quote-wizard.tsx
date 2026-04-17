'use client';

import { useState, useEffect, useReducer } from 'react';
import Link from 'next/link';
import { Check, ArrowLeft } from 'lucide-react';
import { QuoteFormData, isAllowedFuelType } from '@/lib/types';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 1, name: 'Postcode', label: 'Check coverage' },
  { id: 2, name: 'Property', label: 'Home basics' },
  { id: 3, name: 'Current Boiler', label: 'Existing system' },
  { id: 4, name: 'Choose Tier', label: 'Pick your package' },
  { id: 5, name: 'Brand', label: 'Brand preference' },
  { id: 6, name: 'Options', label: 'Extra notes' },
  { id: 7, name: 'Your Details', label: 'Contact & survey' },
  { id: 8, name: 'Review', label: 'Final check' },
];

const STORAGE_KEY =
  process.env.NEXT_PUBLIC_QUOTE_WIZARD_STORAGE_KEY || 'plumber_quote_wizard_v1';

interface WizardState {
  currentStep: number;
  formData: Partial<QuoteFormData>;
}

type WizardAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<QuoteFormData> }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'LOAD_STATE'; payload: WizardState }
  | { type: 'RESET' };

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, STEPS.length),
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      };
    case 'LOAD_STATE':
      return action.payload;
    case 'RESET':
      return { currentStep: 1, formData: {} };
    default:
      return state;
  }
}

interface QuoteWizardProps {
  children: (props: {
    currentStep: number;
    formData: Partial<QuoteFormData>;
    updateFormData: (data: Partial<QuoteFormData>) => void;
    nextStep: () => void;
    prevStep: () => void;
    isLastStep: boolean;
    resetWizard: () => void;
  }) => React.ReactNode;
}

export function QuoteWizard({ children }: QuoteWizardProps) {
  const [state, dispatch] = useReducer(wizardReducer, {
    currentStep: 1,
    formData: {},
  });

  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState) as WizardState;
        const ft = parsed.formData?.fuelType;
        if (ft !== undefined && !isAllowedFuelType(ft)) {
          const { fuelType: _drop, ...rest } = parsed.formData;
          parsed.formData = rest;
        }
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      } catch (error) {
        console.error('Failed to load wizard state:', error);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save wizard state:', error);
    }
  }, [state]);

  const updateFormData = (data: Partial<QuoteFormData>) => {
    dispatch({ type: 'UPDATE_FORM_DATA', payload: data });
  };

  const nextStep = () => {
    dispatch({ type: 'NEXT_STEP' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    dispatch({ type: 'PREV_STEP' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetWizard = () => {
    dispatch({ type: 'RESET' });
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
        <div className="space-y-2">
          <ProgressIndicator currentStep={state.currentStep} steps={STEPS} />
          <p className="text-xs text-muted-foreground">
            Takes around 3–5 minutes to complete. You can move back and forth between steps at any time.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-card px-4 py-6 shadow-xl sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          {children({
            currentStep: state.currentStep,
            formData: state.formData,
            updateFormData,
            nextStep,
            prevStep,
            isLastStep: state.currentStep === STEPS.length,
            resetWizard,
          })}
        </div>
      </div>
    </div>
  );
}

function ProgressIndicator({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: typeof STEPS;
}) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center justify-between">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={cn(
              stepIdx !== steps.length - 1 ? 'flex-1' : '',
              'relative'
            )}
          >
            {step.id < currentStep ? (
              <div className="group flex w-full items-center">
                <span className="flex items-center">
                  <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-brand shadow-lg">
                    <Check className="h-5 w-5 text-white" />
                  </span>
                  <span className="ml-3 hidden sm:block">
                    <span className="block text-sm font-medium text-foreground">
                      {step.name}
                    </span>
                    <span className="block text-xs text-slate-400">
                      {step.label}
                    </span>
                  </span>
                </span>
                {stepIdx !== steps.length - 1 && (
                  <div className="ml-4 hidden h-0.5 w-full bg-gradient-brand sm:block" />
                )}
              </div>
            ) : step.id === currentStep ? (
              <div className="flex items-center">
                <span className="flex items-center">
                  <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-brand-cyan bg-card ring-4 ring-brand-cyan/20">
                    <span className="text-sm font-semibold text-brand-cyan">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-3 hidden sm:block">
                    <span className="block text-sm font-medium text-brand-cyan">
                      {step.name}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {step.label}
                    </span>
                  </span>
                </span>
                {stepIdx !== steps.length - 1 && (
                  <div className="ml-4 hidden h-0.5 w-full bg-border sm:block" />
                )}
              </div>
            ) : (
              <div className="group flex items-center">
                <span className="flex items-center">
                  <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-border bg-card">
                    <span className="text-sm font-medium text-muted-foreground">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-3 hidden sm:block">
                    <span className="block text-sm font-medium text-muted-foreground">
                      {step.name}
                    </span>
                    <span className="block text-xs text-slate-400">
                      {step.label}
                    </span>
                  </span>
                </span>
                {stepIdx !== steps.length - 1 && (
                  <div className="ml-4 hidden h-0.5 w-full bg-border sm:block" />
                )}
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
