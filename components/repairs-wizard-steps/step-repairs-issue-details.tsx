'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert as AlertTriangle } from 'lucide-react';

interface IssueDetails {
  issueCategory: string;
  errorCode: string;
  urgency: string;
  gasSmell: boolean;
}

interface StepRepairsIssueDetailsProps {
  value: IssueDetails;
  onNext: (data: IssueDetails) => void;
}

const ISSUE_CATEGORIES = [
  'No heating',
  'No hot water',
  'Leaking',
  'Pressure drops',
  'Strange noise',
  'Error code',
  'Other',
];

const URGENCY_OPTIONS = [
  'Emergency today',
  'ASAP',
  'This week',
];

export function StepRepairsIssueDetails({ value, onNext }: StepRepairsIssueDetailsProps) {
  const [issueCategory, setIssueCategory] = useState(value.issueCategory || '');
  const [errorCode, setErrorCode] = useState(value.errorCode || '');
  const [urgency, setUrgency] = useState(value.urgency || '');
  const [gasSmell, setGasSmell] = useState(value.gasSmell || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (gasSmell) {
      return;
    }

    onNext({
      issueCategory,
      errorCode: errorCode.trim(),
      urgency,
      gasSmell,
    });
  };

  const isValid = issueCategory && urgency && !gasSmell;

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">What's the issue?</CardTitle>
          <CardDescription className="text-base">
            Tell us about the problem with your boiler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Do you smell gas?</Label>
              <RadioGroup value={gasSmell ? 'yes' : 'no'} onValueChange={(val) => setGasSmell(val === 'yes')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="gas-no" />
                  <Label htmlFor="gas-no" className="font-normal cursor-pointer">
                    No
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="gas-yes" />
                  <Label htmlFor="gas-yes" className="font-normal cursor-pointer">
                    Yes
                  </Label>
                </div>
              </RadioGroup>

              {gasSmell && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <AlertTitle className="text-red-900 font-bold">EMERGENCY - Do Not Continue</AlertTitle>
                  <AlertDescription className="text-red-800 space-y-3">
                    <p className="font-semibold">If you smell gas, take immediate action:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Turn off the gas supply at the meter</li>
                      <li>Open windows and doors</li>
                      <li>Do NOT use electrical switches or naked flames</li>
                      <li>Evacuate the property</li>
                      <li>Call the National Gas Emergency Service: <a href="tel:0800111999" className="font-bold underline">0800 111 999</a></li>
                    </ol>
                    <p className="text-sm mt-4">Do not submit this form. Call the emergency number above immediately.</p>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {!gasSmell && (
              <>
                <div className="space-y-3">
                  <Label>What's the main issue?</Label>
                  <RadioGroup value={issueCategory} onValueChange={setIssueCategory}>
                    {ISSUE_CATEGORIES.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <RadioGroupItem value={category} id={`issue-${category}`} />
                        <Label htmlFor={`issue-${category}`} className="font-normal cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="errorCode">Error Code (optional)</Label>
                  <Input
                    id="errorCode"
                    type="text"
                    placeholder="e.g. E119, F22, etc."
                    value={errorCode}
                    onChange={(e) => setErrorCode(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    If your boiler is showing an error code, enter it here
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>How urgent is this?</Label>
                  <RadioGroup value={urgency} onValueChange={setUrgency}>
                    {URGENCY_OPTIONS.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`urgency-${option}`} />
                        <Label htmlFor={`urgency-${option}`} className="font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </>
            )}

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
