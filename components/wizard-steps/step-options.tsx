'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, ChevronLeft } from 'lucide-react';

interface StepOptionsProps {
  value?: string;
  onNext: (notes: string) => void;
  onBack: () => void;
}

export function StepOptions({ value, onNext, onBack }: StepOptionsProps) {
  const [notes, setNotes] = useState(value || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(notes);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl">Additional notes</CardTitle>
          <CardDescription className="text-base">
            Anything we should know before the survey?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="notes">Anything we should know before the survey?</Label>
              <Textarea
                id="notes"
                placeholder="e.g. I'd like to relocate the boiler, access is limited, current system has issues..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <p className="text-xs text-slate-500">
                Optional - This helps our team prepare for the survey
              </p>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onBack} className="w-32">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="submit" size="lg" className="flex-1">
                Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
