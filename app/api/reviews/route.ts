import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

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

    const { error } = await supabaseAdmin.from('customer_reviews').insert({
      rating,
      review_text: reviewText,
      customer_name: customerName,
      request_type: requestType,
      ref_code: refCode,
      status: 'approved',
    });

    if (error) {
      console.error('Failed to insert customer review:', error);
      return NextResponse.json({ error: 'Failed to submit review.' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Reviews API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

