'use client';

import { useState, useEffect, useReducer } from 'react';
import Link from 'next/link';
import { Check, ArrowLeft } from 'lucide-react';
import { QuoteFormData } from '@/lib/types';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 1, name: 'Postcode' },
  { id: 2, name: 'Property' },
  { id: 3, name: 'Current Boiler' },
  { id: 4, name: 'Choose Tier' },
  { id: 5, name: 'Brand' },
  { id: 6, name: 'Options' },
  { id: 7, name: 'Your Details' },
  { id: 8, name: 'Review' },
];

const STORAGE_KEY = 'boilable_quote_wizard';

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
        <ProgressIndicator currentStep={state.currentStep} steps={STEPS} />

        <div className="mt-8">
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
                  <span className="ml-3 hidden text-sm font-medium text-foreground sm:block">
                    {step.name}
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
                  <span className="ml-3 hidden text-sm font-medium text-brand-cyan sm:block">
                    {step.name}
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
                  <span className="ml-3 hidden text-sm font-medium text-muted-foreground sm:block">
                    {step.name}
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
