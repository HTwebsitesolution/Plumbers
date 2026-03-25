'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { LogOut, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type PendingReview = {
  id: string;
  rating: number;
  review_text: string;
  customer_name: string | null;
  request_type: string | null;
  ref_code: string | null;
  created_at: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
};

async function approveReview(id: string) {
  const res = await fetch('/api/admin/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || 'Failed to approve review');
  }
}

export default function AdminReviewsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [reviews, setReviews] = useState<PendingReview[]>([]);

  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const { toast } = useToast();

  const loadPendingReviews = async () => {
    const res = await fetch('/api/admin/reviews');
    if (!res.ok) {
      throw new Error('Failed to load pending reviews');
    }
    const data = await res.json();
    setReviews((data.reviews ?? []) as PendingReview[]);
  };

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
        await loadPendingReviews();
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

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch {
      // Ignore; we still reset UI state.
    } finally {
      setIsAuthenticated(false);
      setPassword('');
      setReviews([]);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      setIsSubmittingReview(true);
      await approveReview(id);
      toast({ title: 'Approved', description: 'The review is now visible publicly.' });
      await loadPendingReviews();
    } catch (err) {
      toast({ title: 'Error', description: err instanceof Error ? err.message : 'Failed to approve', variant: 'destructive' });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  useEffect(() => {
    // If you refresh after login, try loading.
    if (!isAuthenticated) return;
    loadPendingReviews().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-lg">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Admin Reviews Login</CardTitle>
              <CardDescription>Enter your admin password to moderate customer reviews.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Verifying…' : 'Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Review Moderation</h1>
            <p className="mt-1 text-slate-600">{reviews.length} pending review(s)</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending reviews (1–3 stars)</CardTitle>
            <CardDescription>Approve once the customer issue has been resolved.</CardDescription>
          </CardHeader>
          <CardContent>
            {reviews.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">
                No pending reviews right now.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stars</TableHead>
                    <TableHead>Ref</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{r.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{r.ref_code ?? '-'}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{r.request_type ?? '-'}</Badge>
                      </TableCell>
                      <TableCell className="max-w-lg">
                        <div className="line-clamp-4 whitespace-normal text-slate-700">{r.review_text}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-slate-900">{r.contact_name ?? r.customer_name ?? '-'}</div>
                          {r.contact_email ? (
                            <a className="block text-xs text-blue-600 hover:underline" href={`mailto:${r.contact_email}`}>
                              {r.contact_email}
                            </a>
                          ) : null}
                          {r.contact_phone ? (
                            <a className="block text-xs text-blue-600 hover:underline" href={`tel:${r.contact_phone}`}>
                              {r.contact_phone}
                            </a>
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={isSubmittingReview}
                          onClick={() => handleApprove(r.id)}
                          size="sm"
                        >
                          Approve
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

