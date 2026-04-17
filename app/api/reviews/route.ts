import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

/** Public approved reviews for /reviews (server-side DB read; avoids browser-only anon env issues). */
export async function GET() {
  try {
    const supabaseAdmin = getSupabaseServerClient();
    const { data, error } = await supabaseAdmin
      .from('customer_reviews')
      .select('id, rating, review_text, customer_name, request_type, ref_code, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(12);

    if (error) {
      console.error('GET /api/reviews failed:', error);
      return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 });
    }

    return NextResponse.json({ reviews: data ?? [] }, { status: 200 });
  } catch (err) {
    console.error('GET /api/reviews error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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

