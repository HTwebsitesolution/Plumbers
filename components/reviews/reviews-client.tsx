'use client';

import { useEffect, useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';

type ReviewRow = {
  id: string;
  rating: number;
  review_text: string;
  customer_name: string | null;
  request_type: string | null;
  ref_code: string | null;
  created_at: string;
};

async function fetchApprovedReviews(): Promise<ReviewRow[]> {
  const res = await fetch('/api/reviews', { cache: 'no-store' });
  if (!res.ok) {
    console.error('Failed to fetch reviews:', res.status);
    return [];
  }
  const json = (await res.json()) as { reviews?: ReviewRow[] };
  return json.reviews ?? [];
}

export function ReviewsClient() {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const initialType = searchParams.get('type') ?? undefined;
  const initialRef = searchParams.get('ref') ?? undefined;

  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState<number>(5);
  const [customerName, setCustomerName] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prefill = useMemo(() => {
    return {
      requestType: initialType,
      refCode: initialRef,
    };
  }, [initialRef, initialType]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const res = await fetchApprovedReviews();
      if (mounted) setReviews(res);
      if (mounted) setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      toast({ title: 'Add your review', description: 'Please write a short review message.', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          reviewText,
          customerName: customerName.trim() || null,
          requestType: prefill.requestType || null,
          refCode: prefill.refCode || null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to submit review');
      }

      const responseData = await res.json().catch(() => ({}));
      const submittedStatus = responseData.status as 'approved' | 'pending' | undefined;

      toast({
        title: 'Thanks for your review!',
        description: submittedStatus === 'pending'
          ? 'Your review has been submitted and is waiting for approval.'
          : 'Your review is now visible on our website.',
      });
      setReviewText('');
      setCustomerName('');
      setRating(5);

      const updated = await fetchApprovedReviews();
      setReviews(updated);
    } catch (err) {
      toast({ title: 'Error', description: err instanceof Error ? err.message : 'Failed to submit review', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <div className="mb-3 flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <h1 className="text-4xl font-bold text-slate-900">Customer Reviews</h1>
        <p className="mt-3 text-lg text-slate-600">
          Tell us about your experience with {process.env.NEXT_PUBLIC_SITE_NAME || 'our team'}.
        </p>
      </div>

      {/* Reviews list */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center text-slate-500">Loading reviews…</div>
        ) : reviews.length === 0 ? (
          <div className="col-span-full text-center text-slate-500">Be the first to leave a review.</div>
        ) : (
          reviews.map((r) => (
            <Card key={r.id} className="transition-shadow hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="mb-3 flex items-center gap-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 text-slate-600 whitespace-pre-wrap">{r.review_text}</p>
                <div className="border-t border-slate-100 pt-4">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <div className="font-semibold text-slate-900">{r.customer_name || 'Customer'}</div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                      {r.request_type || 'Review'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Leave a review */}
      <div className="mt-14">
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-6">
            <h2 className="mb-2 text-2xl font-bold text-slate-900">Leave a review</h2>
            <p className="mb-6 text-slate-600">It only takes a minute. Thank you for helping our team.</p>

            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Rating</label>
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setRating(v)}
                      className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition ${
                        rating === v ? 'border-yellow-500 bg-yellow-50 text-yellow-900' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Star className={rating === v ? 'h-4 w-4 fill-yellow-400 text-yellow-400' : 'h-4 w-4 fill-slate-200 text-slate-300'} />
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-1">
                <label className="mb-2 block text-sm font-medium text-slate-700">Your name (optional)</label>
                <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="e.g. Joseph" />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Your review</label>
                <Textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write a short review about your installation/service/repair…" rows={5} />
              </div>

              <div className="md:col-span-2">
                <p className="mb-4 text-xs text-slate-500">
                  By submitting, you agree that your review may be displayed on our website.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" disabled={isSubmitting} className="sm:flex-1">
                    {isSubmitting ? 'Submitting…' : 'Submit review'}
                  </Button>
                  <Button type="button" variant="outline" asChild className="sm:flex-1">
                    <a href="/reviews">Cancel</a>
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

