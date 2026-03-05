'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CONTACT_METHODS, TIME_WINDOWS } from '@/lib/types';

interface ContactDetails {
  name: string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  preferredTimeWindow: string;
  notes: string;
}

interface StepServicingContactProps {
  value: ContactDetails;
  onNext: (data: ContactDetails) => void;
}

export function StepServicingContact({ value, onNext }: StepServicingContactProps) {
  const [name, setName] = useState(value.name || '');
  const [email, setEmail] = useState(value.email || '');
  const [phone, setPhone] = useState(value.phone || '');
  const [preferredContactMethod, setPreferredContactMethod] = useState(value.preferredContactMethod || 'Email');
  const [preferredTimeWindow, setPreferredTimeWindow] = useState(value.preferredTimeWindow || 'Anytime');
  const [notes, setNotes] = useState(value.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      preferredContactMethod,
      preferredTimeWindow,
      notes: notes.trim(),
    });
  };

  const isValid = name.trim() && email.trim() && phone.trim();

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Your Contact Details</CardTitle>
          <CardDescription className="text-base">
            How should we get in touch to arrange your service?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="07123 456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Preferred Contact Method</Label>
              <RadioGroup value={preferredContactMethod} onValueChange={setPreferredContactMethod}>
                {CONTACT_METHODS.map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <RadioGroupItem value={method} id={`contact-${method}`} />
                    <Label htmlFor={`contact-${method}`} className="font-normal cursor-pointer">
                      {method}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Preferred Time to Call</Label>
              <RadioGroup value={preferredTimeWindow} onValueChange={setPreferredTimeWindow}>
                {TIME_WINDOWS.map((window) => (
                  <div key={window} className="flex items-center space-x-2">
                    <RadioGroupItem value={window} id={`time-${window}`} />
                    <Label htmlFor={`time-${window}`} className="font-normal cursor-pointer">
                      {window}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label htmlFor="notes">Additional Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any specific concerns or questions about your boiler?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!isValid}
            >
              Next
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
