'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';
import type { OutOfAreaEnquiry } from '@/lib/types';

interface StepOutOfAreaProps {
  postcode: string;
  outwardCode: string;
  onSubmit: (enquiry: OutOfAreaEnquiry) => void;
}

export function StepOutOfArea({ postcode, outwardCode, onSubmit }: StepOutOfAreaProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerNotes: '',
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
      newErrors.customerEmail = 'Please enter a valid email';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Please enter your phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const enquiry: OutOfAreaEnquiry = {
      postcode,
      outwardCode,
      coverageStatus: 'out_of_area',
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      customerNotes: formData.customerNotes || undefined,
    };

    onSubmit(enquiry);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <MapPin className="h-8 w-8 text-amber-600" />
          </div>
          <CardTitle className="text-3xl">We don't currently cover your area</CardTitle>
          <CardDescription className="text-base">
            Sorry — we don't currently cover the postcode district <span className="font-semibold">{outwardCode}</span>.
            <br />
            If you're just outside our service area, send your details below and we'll confirm if we can help.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Your Name</Label>
              <Input
                id="customerName"
                type="text"
                placeholder="John Smith"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                autoFocus
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
                placeholder="john@example.com"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
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
                placeholder="07123 456789"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              />
              {errors.customerPhone && (
                <p className="text-sm text-red-600">{errors.customerPhone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerNotes">Additional Notes (Optional)</Label>
              <Textarea
                id="customerNotes"
                placeholder="Tell us about your boiler requirements..."
                value={formData.customerNotes}
                onChange={(e) => setFormData({ ...formData, customerNotes: e.target.value })}
                rows={4}
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Send enquiry
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
