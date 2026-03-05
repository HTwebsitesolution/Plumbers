'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface OutOfAreaEnquiryData {
  postcode: string;
  outwardCode: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface StepServicingOutOfAreaProps {
  postcode: string;
  outwardCode: string;
  onSubmit: (data: OutOfAreaEnquiryData) => void;
}

export function StepServicingOutOfArea({ postcode, outwardCode, onSubmit }: StepServicingOutOfAreaProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      postcode,
      outwardCode,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
    });
  };

  const isValid = name.trim() && email.trim() && phone.trim();

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Out of Area Enquiry</CardTitle>
          <CardDescription className="text-base">
            Leave your details and we'll check if we can help
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <Info className="h-4 w-4 text-amber-700" />
            <AlertDescription className="text-amber-800">
              Your postcode <span className="font-semibold">{postcode}</span> is outside our standard service area. We'll review your enquiry and contact you if we can provide service.
            </AlertDescription>
          </Alert>

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
              <Label htmlFor="notes">Additional Information (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Tell us about your servicing requirements..."
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
              Submit Enquiry
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
