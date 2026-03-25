import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabaseServerClient } from '@/lib/supabase/server';

type PendingReviewRow = {
  id: string;
  rating: number;
  review_text: string;
  customer_name: string | null;
  request_type: string | null;
  ref_code: string | null;
  status: string;
  created_at: string;
};

function isAuthed(authCookie: string | undefined): boolean {
  return authCookie === 'authenticated';
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('admin_auth');

    if (!isAuthed(authCookie?.value)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseAdmin = getSupabaseServerClient();

    const { data: pending, error } = await supabaseAdmin
      .from('customer_reviews')
      .select('id, rating, review_text, customer_name, request_type, ref_code, status, created_at')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch pending customer reviews:', error);
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }

    const pendingReviews = (pending ?? []) as PendingReviewRow[];

    const installationRefs = pendingReviews
      .filter((r) => r.request_type === 'installation' && r.ref_code)
      .map((r) => r.ref_code as string);
    const servicingRefs = pendingReviews
      .filter((r) => r.request_type === 'servicing' && r.ref_code)
      .map((r) => r.ref_code as string);
    const repairsRefs = pendingReviews
      .filter((r) => r.request_type === 'repairs' && r.ref_code)
      .map((r) => r.ref_code as string);

    const installationContactMap = new Map<string, { name: string; email: string; phone: string }>();
    const servicingContactMap = new Map<string, { name: string; email: string; phone: string }>();
    const repairsContactMap = new Map<string, { name: string; email: string; phone: string }>();

    if (installationRefs.length > 0) {
      const { data: leads } = await supabaseAdmin
        .from('leads')
        .select('quote_ref, customer_name, customer_email, customer_phone')
        .in('quote_ref', installationRefs);

      (leads ?? []).forEach((l) => {
        installationContactMap.set(l.quote_ref, {
          name: l.customer_name,
          email: l.customer_email,
          phone: l.customer_phone,
        });
      });
    }

    if (servicingRefs.length > 0) {
      const { data: servicing } = await supabaseAdmin
        .from('servicing_requests')
        .select('service_ref, customer_name, customer_email, customer_phone')
        .in('service_ref', servicingRefs);

      (servicing ?? []).forEach((s) => {
        servicingContactMap.set(s.service_ref, {
          name: s.customer_name,
          email: s.customer_email,
          phone: s.customer_phone,
        });
      });
    }

    if (repairsRefs.length > 0) {
      const { data: repairs } = await supabaseAdmin
        .from('repairs_requests')
        .select('repair_ref, customer_name, customer_email, customer_phone')
        .in('repair_ref', repairsRefs);

      (repairs ?? []).forEach((rep) => {
        repairsContactMap.set(rep.repair_ref, {
          name: rep.customer_name,
          email: rep.customer_email,
          phone: rep.customer_phone,
        });
      });
    }

    const withContacts = pendingReviews.map((r) => {
      const ref = r.ref_code ?? '';
      if (r.request_type === 'installation') {
        const c = installationContactMap.get(ref);
        return { ...r, contact_name: c?.name ?? null, contact_email: c?.email ?? null, contact_phone: c?.phone ?? null };
      }
      if (r.request_type === 'servicing') {
        const c = servicingContactMap.get(ref);
        return { ...r, contact_name: c?.name ?? null, contact_email: c?.email ?? null, contact_phone: c?.phone ?? null };
      }
      if (r.request_type === 'repairs') {
        const c = repairsContactMap.get(ref);
        return { ...r, contact_name: c?.name ?? null, contact_email: c?.email ?? null, contact_phone: c?.phone ?? null };
      }
      return { ...r, contact_name: null, contact_email: null, contact_phone: null };
    });

    return NextResponse.json({ reviews: withContacts });
  } catch (err) {
    console.error('Admin reviews GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('admin_auth');

    if (!isAuthed(authCookie?.value)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const idRaw = body.id;

    if (!idRaw) {
      return NextResponse.json({ error: 'Missing review id' }, { status: 400 });
    }

    const id = String(idRaw);
    const supabaseAdmin = getSupabaseServerClient();

    const { error } = await supabaseAdmin
      .from('customer_reviews')
      .update({ status: 'approved' })
      .eq('id', id);

    if (error) {
      console.error('Failed to approve review:', error);
      return NextResponse.json({ error: 'Failed to approve review' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Admin reviews POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

