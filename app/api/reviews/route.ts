import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Public approved reviews for /reviews.
 * Uses a fresh Supabase client (not the module singleton) so serverless always picks up
 * current env and avoids a bad first-init cache. Prefer service role when set.
 */
export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url?.trim()) {
      return NextResponse.json(
        { error: 'Failed to load reviews', details: 'NEXT_PUBLIC_SUPABASE_URL is not set on the server.' },
        { status: 503 }
      );
    }

    const key = serviceRole?.trim() || anon?.trim();
    if (!key) {
      return NextResponse.json(
        {
          error: 'Failed to load reviews',
          details: 'Set SUPABASE_SERVICE_ROLE_KEY (recommended) or NEXT_PUBLIC_SUPABASE_ANON_KEY on Vercel.',
        },
        { status: 503 }
      );
    }

    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase
      .from('customer_reviews')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(12);

    if (error) {
      console.error('GET /api/reviews failed:', error);
      return NextResponse.json(
        {
          error: 'Failed to load reviews',
          details: error.message,
          code: error.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ reviews: data ?? [] }, { status: 200 });
  } catch (err) {
    console.error('GET /api/reviews error:', err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: 'Internal server error', details: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const ratingRaw = body.rating;
    const reviewTextRaw = body.reviewText;
    const customerNameRaw = body.customerName;
    const requestTypeRaw = body.requestType;
    const refCodeRaw = body.refCode;

    const rating = Number(ratingRaw);
    const reviewText = String(reviewTextRaw ?? '').trim();
    const customerName = customerNameRaw ? String(customerNameRaw).trim() : null;
    const requestType = requestTypeRaw ? String(requestTypeRaw).trim() : null;
    const refCode = refCodeRaw ? String(refCodeRaw).trim() : null;

    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid rating (must be 1-5).' }, { status: 400 });
    }

    if (reviewText.length < 5) {
      return NextResponse.json({ error: 'Review text is too short.' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseServerClient();

    const status = rating >= 4 ? 'approved' : 'pending';

    const { error } = await supabaseAdmin.from('customer_reviews').insert({
      rating,
      review_text: reviewText,
      customer_name: customerName,
      request_type: requestType,
      ref_code: refCode,
      status,
    });

    if (error) {
      console.error('Failed to insert customer review:', error);
      return NextResponse.json({ error: 'Failed to submit review.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, status }, { status: 201 });
  } catch (err) {
    console.error('Reviews API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

