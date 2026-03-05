import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('admin_auth');

    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseAdmin = getSupabaseServerClient();

    const { data: leads, error: leadsError } = await supabaseAdmin
      .from('leads')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (leadsError) {
      console.error('Database error:', leadsError);
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    const { data: servicingRequests, error: servicingError } = await supabaseAdmin
      .from('servicing_requests')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (servicingError) {
      console.error('Database error:', servicingError);
    }

    const { data: repairsRequests, error: repairsError } = await supabaseAdmin
      .from('repairs_requests')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (repairsError) {
      console.error('Database error:', repairsError);
    }

    return NextResponse.json({
      leads,
      servicingRequests: servicingRequests || [],
      repairsRequests: repairsRequests || [],
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
