'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Download, Copy, Eye, Loader as Loader2, CircleCheck as CheckCircle2 } from 'lucide-react';
import { formatPrice } from '@/lib/quote-utils';
import { Lead } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface ServicingRequest {
  id: string;
  service_ref: string;
  request_type: string;
  submitted_at: string;
  postcode: string;
  outward_code?: string;
  coverage_status?: string;
  fuel_type?: string;
  boiler_type?: string;
  boiler_make?: string;
  boiler_model?: string;
  last_serviced?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  preferred_contact_method?: string;
  preferred_time_window?: string;
  customer_notes?: string;
}

interface RepairsRequest {
  id: string;
  repair_ref: string;
  request_type: string;
  submitted_at: string;
  postcode: string;
  outward_code?: string;
  coverage_status?: string;
  issue_category?: string;
  error_code?: string;
  urgency?: string;
  gas_smell?: boolean;
  fuel_type?: string;
  boiler_type?: string;
  boiler_make?: string;
  boiler_model?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  preferred_contact_method?: string;
  preferred_time_window?: string;
  customer_notes?: string;
}

type RequestType = 'leads' | 'servicing' | 'repairs';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<RequestType>('leads');

  const [leads, setLeads] = useState<Lead[]>([]);
  const [servicingRequests, setServicingRequests] = useState<ServicingRequest[]>([]);
  const [repairsRequests, setRepairsRequests] = useState<RepairsRequest[]>([]);

  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [filteredServicing, setFilteredServicing] = useState<ServicingRequest[]>([]);
  const [filteredRepairs, setFilteredRepairs] = useState<RepairsRequest[]>([]);

  const [coverageFilter, setCoverageFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedServicing, setSelectedServicing] = useState<ServicingRequest | null>(null);
  const [selectedRepairs, setSelectedRepairs] = useState<RepairsRequest | null>(null);
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
        loadData();
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

  const loadData = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads);
        setServicingRequests(data.servicingRequests);
        setRepairsRequests(data.repairsRequests);
        setFilteredLeads(data.leads);
        setFilteredServicing(data.servicingRequests);
        setFilteredRepairs(data.repairsRequests);
      } else if (response.status === 401) {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  useEffect(() => {
    if (coverageFilter === 'all') {
      setFilteredLeads(leads);
      setFilteredServicing(servicingRequests);
      setFilteredRepairs(repairsRequests);
    } else {
      setFilteredLeads(leads.filter(lead => lead.coverageStatus === coverageFilter));
      setFilteredServicing(servicingRequests.filter(req => req.coverage_status === coverageFilter));
      setFilteredRepairs(repairsRequests.filter(req => req.coverage_status === coverageFilter));
    }
  }, [coverageFilter, leads, servicingRequests, repairsRequests]);

  const exportLeadsToCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      'Quote Ref', 'Submitted At', 'Coverage Status', 'Outward Code', 'Customer Name', 'Email', 'Phone',
      'Postcode', 'Property Type', 'Bedrooms', 'Bathrooms', 'Fuel Type', 'Current Boiler', 'Boiler Location',
      'Tier', 'Price', 'Warranty', 'Brand', 'Contact Method', 'Preferred Time', 'Notes',
    ];

    const rows = filteredLeads.map((lead) => [
      lead.quoteRef, new Date(lead.submittedAt).toLocaleString(), lead.coverageStatus, lead.outwardCode,
      lead.customerName, lead.customerEmail, lead.customerPhone, lead.postcode, lead.propertyType || '',
      String(lead.bedrooms || ''), String(lead.bathrooms || ''), lead.fuelType || '', lead.currentBoilerType || '',
      lead.boilerLocation || '', lead.tierName || '', String(lead.fromPrice || ''), String(lead.warrantyYears || ''),
      lead.brandPreference || '', lead.preferredContactMethod || '', lead.preferredTimeWindow || '',
      lead.customerNotes || '',
    ]);

    downloadCSV('leads', headers, rows);
  };

  const exportServicingToCSV = () => {
    if (servicingRequests.length === 0) return;

    const headers = [
      'Service Ref', 'Request Type', 'Submitted At', 'Coverage Status', 'Outward Code', 'Customer Name',
      'Email', 'Phone', 'Postcode', 'Fuel Type', 'Boiler Type', 'Boiler Make', 'Boiler Model',
      'Last Serviced', 'Contact Method', 'Preferred Time', 'Notes',
    ];

    const rows = filteredServicing.map((req) => [
      req.service_ref, req.request_type, new Date(req.submitted_at).toLocaleString(),
      req.coverage_status || '', req.outward_code || '', req.customer_name, req.customer_email,
      req.customer_phone, req.postcode, req.fuel_type || '', req.boiler_type || '',
      req.boiler_make || '', req.boiler_model || '', req.last_serviced || '',
      req.preferred_contact_method || '', req.preferred_time_window || '', req.customer_notes || '',
    ]);

    downloadCSV('servicing', headers, rows);
  };

  const exportRepairsToCSV = () => {
    if (repairsRequests.length === 0) return;

    const headers = [
      'Repair Ref', 'Request Type', 'Submitted At', 'Coverage Status', 'Outward Code', 'Customer Name',
      'Email', 'Phone', 'Postcode', 'Issue Category', 'Error Code', 'Urgency', 'Gas Smell',
      'Fuel Type', 'Boiler Type', 'Boiler Make', 'Boiler Model', 'Contact Method', 'Preferred Time', 'Notes',
    ];

    const rows = filteredRepairs.map((req) => [
      req.repair_ref, req.request_type, new Date(req.submitted_at).toLocaleString(),
      req.coverage_status || '', req.outward_code || '', req.customer_name, req.customer_email,
      req.customer_phone, req.postcode, req.issue_category || '', req.error_code || '',
      req.urgency || '', req.gas_smell ? 'YES' : 'No', req.fuel_type || '', req.boiler_type || '',
      req.boiler_make || '', req.boiler_model || '', req.preferred_contact_method || '',
      req.preferred_time_window || '', req.customer_notes || '',
    ]);

    downloadCSV('repairs', headers, rows);
  };

  const downloadCSV = (type: string, headers: string[], rows: (string | undefined)[][]) => {
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell || ''}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const copyWhatsAppLeadMessage = (lead: Lead) => {
    const message = `Hi ${lead.customerName}, this is [Your Name] from Boilable. Thanks for your ${lead.tierName} quote request (${lead.quoteRef}). I'd love to arrange your free site survey. When would be a good time to visit ${lead.postcode}?`;
    navigator.clipboard.writeText(message);
    showCopiedToast();
  };

  const copyWhatsAppServicingMessage = (req: ServicingRequest) => {
    const timeWindowText = req.preferred_time_window ? `You mentioned ${req.preferred_time_window} works best for you.` : 'When would suit you?';
    const message = `Hi ${req.customer_name}, this is [Your Name] from Boilable. Thanks for your servicing request (${req.service_ref}). I'd like to arrange a convenient time for your annual service. ${timeWindowText}`;
    navigator.clipboard.writeText(message);
    showCopiedToast();
  };

  const copyWhatsAppRepairsMessage = (req: RepairsRequest) => {
    const timeWindowText = req.preferred_time_window ? `You mentioned ${req.preferred_time_window} works best for you.` : 'When would suit you?';
    const message = `Hi ${req.customer_name}, this is [Your Name] from Boilable. Thanks for your repair request (${req.repair_ref}). I'd like to arrange a visit to fix your boiler issue. ${timeWindowText}`;
    navigator.clipboard.writeText(message);
    showCopiedToast();
  };

  const showCopiedToast = () => {
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
          setServicingRequests(data.servicingRequests);
          setRepairsRequests(data.repairsRequests);
          setFilteredLeads(data.leads);
          setFilteredServicing(data.servicingRequests);
          setFilteredRepairs(data.repairsRequests);
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

  const currentData = activeTab === 'leads' ? filteredLeads : activeTab === 'servicing' ? filteredServicing : filteredRepairs;
  const totalData = activeTab === 'leads' ? leads.length : activeTab === 'servicing' ? servicingRequests.length : repairsRequests.length;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="mt-1 text-slate-600">
                {currentData.length} of {totalData} {totalData === 1 ? 'request' : 'requests'}
              </p>
            </div>
            <Button
              onClick={activeTab === 'leads' ? exportLeadsToCSV : activeTab === 'servicing' ? exportServicingToCSV : exportRepairsToCSV}
              disabled={currentData.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
          <div className="flex gap-4">
            <Select value={coverageFilter} onValueChange={setCoverageFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by coverage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="in_area">In Area</SelectItem>
                <SelectItem value="out_of_area">Out of Area</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as RequestType)} className="space-y-4">
          <TabsList>
            <TabsTrigger value="leads">New Boiler Leads ({leads.length})</TabsTrigger>
            <TabsTrigger value="servicing">Servicing Requests ({servicingRequests.length})</TabsTrigger>
            <TabsTrigger value="repairs">Repair Requests ({repairsRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quote Ref</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Area Code</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Postcode</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-slate-500">
                        No leads found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-mono text-sm">{lead.quoteRef}</TableCell>
                        <TableCell>{new Date(lead.submittedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={lead.coverageStatus === 'in_area' ? 'default' : 'secondary'}>
                            {lead.coverageStatus === 'in_area' ? 'In Area' : 'Out of Area'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{lead.outwardCode}</TableCell>
                        <TableCell>
                          <div className="font-medium">{lead.customerName}</div>
                          <div className="text-sm text-slate-500">{lead.customerEmail}</div>
                        </TableCell>
                        <TableCell>{lead.postcode}</TableCell>
                        <TableCell>
                          {lead.tierName ? (
                            <Badge variant="secondary">{lead.tierName}</Badge>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {lead.fromPrice ? formatPrice(lead.fromPrice) : '-'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedLead(lead)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            {lead.coverageStatus === 'in_area' && (
                              <Button size="sm" variant="outline" onClick={() => copyWhatsAppLeadMessage(lead)}>
                                {copied ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="servicing">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Ref</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Area Code</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Postcode</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServicing.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-slate-500">
                        No servicing requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredServicing.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-mono text-sm">{req.service_ref}</TableCell>
                        <TableCell>{new Date(req.submitted_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={req.request_type === 'servicing' ? 'default' : 'secondary'}>
                            {req.request_type === 'servicing' ? 'Servicing' : 'Enquiry'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={req.coverage_status === 'in_area' ? 'default' : 'secondary'}>
                            {req.coverage_status === 'in_area' ? 'In Area' : 'Out of Area'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{req.outward_code || '-'}</TableCell>
                        <TableCell>
                          <div className="font-medium">{req.customer_name}</div>
                          <div className="text-sm text-slate-500">{req.customer_email}</div>
                        </TableCell>
                        <TableCell>{req.postcode}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedServicing(req)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => copyWhatsAppServicingMessage(req)}>
                              {copied ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="repairs">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Repair Ref</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Area Code</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRepairs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-slate-500">
                        No repair requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRepairs.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-mono text-sm">{req.repair_ref}</TableCell>
                        <TableCell>{new Date(req.submitted_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={req.request_type === 'repairs' ? 'default' : 'secondary'}>
                            {req.request_type === 'repairs' ? 'Repair' : 'Enquiry'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={req.coverage_status === 'in_area' ? 'default' : 'secondary'}>
                            {req.coverage_status === 'in_area' ? 'In Area' : 'Out of Area'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{req.outward_code || '-'}</TableCell>
                        <TableCell>
                          <div className="font-medium">{req.customer_name}</div>
                          <div className="text-sm text-slate-500">{req.customer_email}</div>
                        </TableCell>
                        <TableCell>{req.issue_category || '-'}</TableCell>
                        <TableCell>
                          {req.urgency && (
                            <Badge
                              variant={req.urgency === 'Emergency today' ? 'destructive' : 'default'}
                              className={req.urgency === 'ASAP' ? 'bg-amber-500' : ''}
                            >
                              {req.urgency}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedRepairs(req)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => copyWhatsAppRepairsMessage(req)}>
                              {copied ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedLead && (
          <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Lead Details</DialogTitle>
                <DialogDescription className="font-mono">{selectedLead.quoteRef}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-semibold text-slate-900">Coverage Information</h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-slate-500">Status</dt>
                      <dd className="font-medium">
                        <Badge variant={selectedLead.coverageStatus === 'in_area' ? 'default' : 'secondary'}>
                          {selectedLead.coverageStatus === 'in_area' ? 'In Area' : 'Out of Area'}
                        </Badge>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Outward Code</dt>
                      <dd className="font-medium font-mono">{selectedLead.outwardCode}</dd>
                    </div>
                  </dl>
                </div>

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
                  </dl>
                </div>

                {selectedLead.coverageStatus === 'in_area' && (
                  <>
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
                      </dl>
                    </div>
                  </>
                )}

                {selectedLead.customerNotes && (
                  <div>
                    <h3 className="mb-2 font-semibold text-slate-900">Additional Notes</h3>
                    <p className="text-sm text-slate-600">{selectedLead.customerNotes}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {selectedServicing && (
          <Dialog open={!!selectedServicing} onOpenChange={() => setSelectedServicing(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Servicing Request Details</DialogTitle>
                <DialogDescription className="font-mono">{selectedServicing.service_ref}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-semibold text-slate-900">Request Information</h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-slate-500">Type</dt>
                      <dd className="font-medium">
                        <Badge variant={selectedServicing.request_type === 'servicing' ? 'default' : 'secondary'}>
                          {selectedServicing.request_type === 'servicing' ? 'Servicing' : 'Enquiry'}
                        </Badge>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Coverage</dt>
                      <dd className="font-medium">
                        <Badge variant={selectedServicing.coverage_status === 'in_area' ? 'default' : 'secondary'}>
                          {selectedServicing.coverage_status === 'in_area' ? 'In Area' : 'Out of Area'}
                        </Badge>
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold text-slate-900">Customer Information</h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-slate-500">Name</dt>
                      <dd className="font-medium">{selectedServicing.customer_name}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Email</dt>
                      <dd className="font-medium">{selectedServicing.customer_email}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Phone</dt>
                      <dd className="font-medium">{selectedServicing.customer_phone}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Postcode</dt>
                      <dd className="font-medium">{selectedServicing.postcode}</dd>
                    </div>
                  </dl>
                </div>

                {(selectedServicing.fuel_type || selectedServicing.boiler_type || selectedServicing.boiler_make || selectedServicing.last_serviced) && (
                  <div>
                    <h3 className="mb-3 font-semibold text-slate-900">Boiler Details</h3>
                    <dl className="grid grid-cols-2 gap-3 text-sm">
                      {selectedServicing.fuel_type && (
                        <div>
                          <dt className="text-slate-500">Fuel Type</dt>
                          <dd className="font-medium">{selectedServicing.fuel_type}</dd>
                        </div>
                      )}
                      {selectedServicing.boiler_type && (
                        <div>
                          <dt className="text-slate-500">Boiler Type</dt>
                          <dd className="font-medium">{selectedServicing.boiler_type}</dd>
                        </div>
                      )}
                      {selectedServicing.boiler_make && (
                        <div>
                          <dt className="text-slate-500">Make</dt>
                          <dd className="font-medium">{selectedServicing.boiler_make}</dd>
                        </div>
                      )}
                      {selectedServicing.boiler_model && (
                        <div>
                          <dt className="text-slate-500">Model</dt>
                          <dd className="font-medium">{selectedServicing.boiler_model}</dd>
                        </div>
                      )}
                      {selectedServicing.last_serviced && (
                        <div className="col-span-2">
                          <dt className="text-slate-500">Last Serviced</dt>
                          <dd className="font-medium">{selectedServicing.last_serviced}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}

                {selectedServicing.customer_notes && (
                  <div>
                    <h3 className="mb-2 font-semibold text-slate-900">Additional Notes</h3>
                    <p className="text-sm text-slate-600">{selectedServicing.customer_notes}</p>
                  </div>
                )}

                <div>
                  <Button onClick={() => copyWhatsAppServicingMessage(selectedServicing)} className="w-full">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy WhatsApp Follow-up Message
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {selectedRepairs && (
          <Dialog open={!!selectedRepairs} onOpenChange={() => setSelectedRepairs(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Repair Request Details</DialogTitle>
                <DialogDescription className="font-mono">{selectedRepairs.repair_ref}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-semibold text-slate-900">Request Information</h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-slate-500">Type</dt>
                      <dd className="font-medium">
                        <Badge variant={selectedRepairs.request_type === 'repairs' ? 'default' : 'secondary'}>
                          {selectedRepairs.request_type === 'repairs' ? 'Repair' : 'Enquiry'}
                        </Badge>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Coverage</dt>
                      <dd className="font-medium">
                        <Badge variant={selectedRepairs.coverage_status === 'in_area' ? 'default' : 'secondary'}>
                          {selectedRepairs.coverage_status === 'in_area' ? 'In Area' : 'Out of Area'}
                        </Badge>
                      </dd>
                    </div>
                  </dl>
                </div>

                {(selectedRepairs.issue_category || selectedRepairs.error_code || selectedRepairs.urgency) && (
                  <div>
                    <h3 className="mb-3 font-semibold text-slate-900">Issue Details</h3>
                    <dl className="grid grid-cols-2 gap-3 text-sm">
                      {selectedRepairs.issue_category && (
                        <div>
                          <dt className="text-slate-500">Issue Category</dt>
                          <dd className="font-medium">{selectedRepairs.issue_category}</dd>
                        </div>
                      )}
                      {selectedRepairs.error_code && (
                        <div>
                          <dt className="text-slate-500">Error Code</dt>
                          <dd className="font-medium font-mono text-red-600">{selectedRepairs.error_code}</dd>
                        </div>
                      )}
                      {selectedRepairs.urgency && (
                        <div>
                          <dt className="text-slate-500">Urgency</dt>
                          <dd className="font-medium">
                            <Badge
                              variant={selectedRepairs.urgency === 'Emergency today' ? 'destructive' : 'default'}
                              className={selectedRepairs.urgency === 'ASAP' ? 'bg-amber-500' : ''}
                            >
                              {selectedRepairs.urgency}
                            </Badge>
                          </dd>
                        </div>
                      )}
                      {selectedRepairs.gas_smell !== undefined && (
                        <div>
                          <dt className="text-slate-500">Gas Smell</dt>
                          <dd className="font-medium">
                            <Badge variant={selectedRepairs.gas_smell ? 'destructive' : 'default'}>
                              {selectedRepairs.gas_smell ? 'YES - EMERGENCY' : 'No'}
                            </Badge>
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}

                <div>
                  <h3 className="mb-3 font-semibold text-slate-900">Customer Information</h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-slate-500">Name</dt>
                      <dd className="font-medium">{selectedRepairs.customer_name}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Email</dt>
                      <dd className="font-medium">{selectedRepairs.customer_email}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Phone</dt>
                      <dd className="font-medium">{selectedRepairs.customer_phone}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Postcode</dt>
                      <dd className="font-medium">{selectedRepairs.postcode}</dd>
                    </div>
                  </dl>
                </div>

                {(selectedRepairs.fuel_type || selectedRepairs.boiler_type || selectedRepairs.boiler_make) && (
                  <div>
                    <h3 className="mb-3 font-semibold text-slate-900">Boiler Details</h3>
                    <dl className="grid grid-cols-2 gap-3 text-sm">
                      {selectedRepairs.fuel_type && (
                        <div>
                          <dt className="text-slate-500">Fuel Type</dt>
                          <dd className="font-medium">{selectedRepairs.fuel_type}</dd>
                        </div>
                      )}
                      {selectedRepairs.boiler_type && (
                        <div>
                          <dt className="text-slate-500">Boiler Type</dt>
                          <dd className="font-medium">{selectedRepairs.boiler_type}</dd>
                        </div>
                      )}
                      {selectedRepairs.boiler_make && (
                        <div>
                          <dt className="text-slate-500">Make</dt>
                          <dd className="font-medium">{selectedRepairs.boiler_make}</dd>
                        </div>
                      )}
                      {selectedRepairs.boiler_model && (
                        <div>
                          <dt className="text-slate-500">Model</dt>
                          <dd className="font-medium">{selectedRepairs.boiler_model}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}

                {selectedRepairs.customer_notes && (
                  <div>
                    <h3 className="mb-2 font-semibold text-slate-900">Additional Notes</h3>
                    <p className="text-sm text-slate-600">{selectedRepairs.customer_notes}</p>
                  </div>
                )}

                <div>
                  <Button onClick={() => copyWhatsAppRepairsMessage(selectedRepairs)} className="w-full">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy WhatsApp Follow-up Message
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
