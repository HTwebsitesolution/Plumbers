'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { User, ChevronLeft } from 'lucide-react';
import { CONTACT_METHODS, TIME_WINDOWS, QuoteFormData } from '@/lib/types';

interface StepDetailsProps {
  values: {
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    addressLine1?: string;
    preferredContactMethod?: QuoteFormData['preferredContactMethod'];
    preferredTimeWindow?: QuoteFormData['preferredTimeWindow'];
  };
  onSubmit: (data: Pick<QuoteFormData, 'customerName' | 'customerEmail' | 'customerPhone' | 'addressLine1' | 'preferredContactMethod' | 'preferredTimeWindow'>) => void;
  onBack: () => void;
}

export function StepDetails({ values, onSubmit, onBack }: StepDetailsProps) {
  const [formData, setFormData] = useState({
    customerName: values.customerName || '',
    customerEmail: values.customerEmail || '',
    customerPhone: values.customerPhone || '',
    addressLine1: values.addressLine1 || '',
    preferredContactMethod: values.preferredContactMethod || '',
    preferredTimeWindow: values.preferredTimeWindow || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Please enter your name';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Please enter your phone number';
    }

    if (!formData.preferredContactMethod) {
      newErrors.preferredContactMethod = 'Please select a contact method';
    }

    if (!formData.preferredTimeWindow) {
      newErrors.preferredTimeWindow = 'Please select a preferred time';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...formData,
      preferredContactMethod: formData.preferredContactMethod as QuoteFormData['preferredContactMethod'],
      preferredTimeWindow: formData.preferredTimeWindow as QuoteFormData['preferredTimeWindow'],
    });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="rounded-3xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl">Your contact details</CardTitle>
          <CardDescription className="text-base">
            So we can arrange your free site survey – we&apos;ll only use these details to contact you about this quote.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customerName">Full Name</Label>
                <Input
                  id="customerName"
                  type="text"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  placeholder="John Smith"
                />
                {errors.customerName && (
                  <p className="text-sm text-red-600">{errors.customerName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email Address</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, customerEmail: e.target.value })
                  }
                  placeholder="john@example.com"
                />
                {errors.customerEmail && (
                  <p className="text-sm text-red-600">{errors.customerEmail}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, customerPhone: e.target.value })
                  }
                  placeholder="07123 456789"
                />
                <p className="text-xs text-slate-500">
                  Mobile preferred – we&apos;ll call or text you to arrange your survey. No marketing lists.
                </p>
                {errors.customerPhone && (
                  <p className="text-sm text-red-600">{errors.customerPhone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine1">
                  Address Line 1 <span className="text-slate-400">(Optional)</span>
                </Label>
                <Input
                  id="addressLine1"
                  type="text"
                  value={formData.addressLine1}
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine1: e.target.value })
                  }
                  placeholder="123 High Street"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Preferred Contact Method</Label>
              <RadioGroup
                value={formData.preferredContactMethod}
                onValueChange={(value) =>
                  setFormData({ ...formData, preferredContactMethod: value })
                }
              >
                {CONTACT_METHODS.map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <RadioGroupItem value={method} id={`contact-${method}`} />
                    <Label
                      htmlFor={`contact-${method}`}
                      className="cursor-pointer font-normal"
                    >
                      {method}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.preferredContactMethod && (
                <p className="text-sm text-red-600">{errors.preferredContactMethod}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Preferred Contact Time</Label>
              <RadioGroup
                value={formData.preferredTimeWindow}
                onValueChange={(value) =>
                  setFormData({ ...formData, preferredTimeWindow: value })
                }
              >
                {TIME_WINDOWS.map((window) => (
                  <div key={window} className="flex items-center space-x-2">
                    <RadioGroupItem value={window} id={`time-${window}`} />
                    <Label
                      htmlFor={`time-${window}`}
                      className="cursor-pointer font-normal"
                    >
                      {window}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.preferredTimeWindow && (
                <p className="text-sm text-red-600">{errors.preferredTimeWindow}</p>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="w-full sm:w-32"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="submit" size="lg" className="flex-1 btn-gradient">
                Continue to review
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
