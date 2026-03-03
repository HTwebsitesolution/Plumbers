'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Lock, Download, Copy, Eye, Loader as Loader2, CircleCheck as CheckCircle2 } from 'lucide-react';
import { formatPrice } from '@/lib/quote-utils';
import { Lead } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        loadLeads();
      } else {
        toast({
          title: 'Error',
          description: 'Invalid password',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to authenticate',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads);
      } else if (response.status === 401) {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Failed to load leads:', error);
    }
  };

  const exportToCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      'Quote Ref',
      'Submitted At',
      'Customer Name',
      'Email',
      'Phone',
      'Postcode',
      'Property Type',
      'Bedrooms',
      'Bathrooms',
      'Fuel Type',
      'Current Boiler',
      'Boiler Location',
      'Tier',
      'Price',
      'Warranty',
      'Brand',
      'Contact Method',
      'Preferred Time',
      'Notes',
    ];

    const rows = leads.map((lead) => [
      lead.quoteRef,
      new Date(lead.submittedAt).toLocaleString(),
      lead.customerName,
      lead.customerEmail,
      lead.customerPhone,
      lead.postcode,
      lead.propertyType,
      lead.bedrooms,
      lead.bathrooms,
      lead.fuelType,
      lead.currentBoilerType,
      lead.boilerLocation,
      lead.tierName,
      lead.fromPrice,
      lead.warrantyYears,
      lead.brandPreference,
      lead.preferredContactMethod,
      lead.preferredTimeWindow,
      lead.customerNotes || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const copyWhatsAppMessage = (lead: Lead) => {
    const message = `Hi ${lead.customerName}, this is [Your Name] from Boilable. Thanks for your ${lead.tierName} quote request (${lead.quoteRef}). I'd love to arrange your free site survey. When would be a good time to visit ${lead.postcode}?`;
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: 'Copied!',
      description: 'WhatsApp message copied to clipboard',
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/leads');
        if (response.ok) {
          setIsAuthenticated(true);
          const data = await response.json();
          setLeads(data.leads);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Enter your password to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="mt-1 text-slate-600">
              {leads.length} {leads.length === 1 ? 'lead' : 'leads'} received
            </p>
          </div>
          <Button onClick={exportToCSV} disabled={leads.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote Ref</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Postcode</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-slate-500">
                    No leads yet
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-mono text-sm">
                      {lead.quoteRef}
                    </TableCell>
                    <TableCell>
                      {new Date(lead.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{lead.customerName}</div>
                      <div className="text-sm text-slate-500">
                        {lead.customerEmail}
                      </div>
                    </TableCell>
                    <TableCell>{lead.postcode}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{lead.tierName}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatPrice(lead.fromPrice)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{lead.preferredContactMethod}</div>
                      <div className="text-xs text-slate-500">
                        {lead.preferredTimeWindow}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyWhatsAppMessage(lead)}
                        >
                          {copied ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        {selectedLead && (
          <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Lead Details</DialogTitle>
                <DialogDescription className="font-mono">
                  {selectedLead.quoteRef}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-semibold text-slate-900">Customer Information</h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-slate-500">Name</dt>
                      <dd className="font-medium">{selectedLead.customerName}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Email</dt>
                      <dd className="font-medium">{selectedLead.customerEmail}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Phone</dt>
                      <dd className="font-medium">{selectedLead.customerPhone}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Postcode</dt>
                      <dd className="font-medium">{selectedLead.postcode}</dd>
                    </div>
                    {selectedLead.addressLine1 && (
                      <div className="col-span-2">
                        <dt className="text-slate-500">Address</dt>
                        <dd className="font-medium">{selectedLead.addressLine1}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold text-slate-900">Quote Details</h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-slate-500">Tier</dt>
                      <dd className="font-medium">{selectedLead.tierName}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Price</dt>
                      <dd className="font-medium">{formatPrice(selectedLead.fromPrice)}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Warranty</dt>
                      <dd className="font-medium">{selectedLead.warrantyYears} Years</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Brand Preference</dt>
                      <dd className="font-medium">{selectedLead.brandPreference}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold text-slate-900">Property Details</h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-slate-500">Property Type</dt>
                      <dd className="font-medium">{selectedLead.propertyType}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Bedrooms</dt>
                      <dd className="font-medium">{selectedLead.bedrooms}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Bathrooms</dt>
                      <dd className="font-medium">{selectedLead.bathrooms}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Fuel Type</dt>
                      <dd className="font-medium">{selectedLead.fuelType}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Current Boiler</dt>
                      <dd className="font-medium">{selectedLead.currentBoilerType}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Boiler Location</dt>
                      <dd className="font-medium">{selectedLead.boilerLocation}</dd>
                    </div>
                  </dl>
                </div>

                {selectedLead.customerNotes && (
                  <div>
                    <h3 className="mb-2 font-semibold text-slate-900">Additional Notes</h3>
                    <p className="text-sm text-slate-600">{selectedLead.customerNotes}</p>
                  </div>
                )}

                <div>
                  <h3 className="mb-2 font-semibold text-slate-900">Contact Preferences</h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-slate-500">Preferred Method</dt>
                      <dd className="font-medium">{selectedLead.preferredContactMethod}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Preferred Time</dt>
                      <dd className="font-medium">{selectedLead.preferredTimeWindow}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
