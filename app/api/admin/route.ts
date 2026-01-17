import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const [listingsRes, trendsRes] = await Promise.all([
      supabaseAdmin
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false }),
      supabaseAdmin
        .from('trends')
        .select('*')
        .order('created_at', { ascending: false })
    ]);

    if (listingsRes.error) throw listingsRes.error;
    if (trendsRes.error) throw trendsRes.error;

    return NextResponse.json({
      listings: listingsRes.data || [],
      trends: trendsRes.data || []
    });
  } catch (err: any) {
    console.error("GET /api/admin error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (body.type === 'add_trend') {
      const { error } = await supabaseAdmin
        .from('trends')
        .insert([body.trend]);
      
      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    if (body.type === 'delete_trend') {
      const { error } = await supabaseAdmin
        .from('trends')
        .delete()
        .eq('id', body.id);
      
      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: any) {
    console.error("POST /api/admin error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
