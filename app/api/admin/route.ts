import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const [listingsRes, trendsRes] = await Promise.all([
    supabaseAdmin
      .from("listings")
      .select("id, payload, status, created_at")
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("trends")
      .select("id, payload, active, created_at")
      .order("created_at", { ascending: false }),
  ]);

  if (listingsRes.error)
    return NextResponse.json(
      { error: listingsRes.error.message },
      { status: 500 },
    );
  if (trendsRes.error)
    return NextResponse.json(
      { error: trendsRes.error.message },
      { status: 500 },
    );

  const listings = (listingsRes.data || []).map((row: any) => ({
    id: row.id,
    status: row.status,
    createdAt: row.created_at,
    ...(row.payload || {}),
  }));

  const trends = (trendsRes.data || []).map((row: any) => ({
    id: row.id,
    active: row.active,
    createdAt: row.created_at,
    ...(row.payload || {}),
  }));

  return NextResponse.json({ listings, trends });
}

export async function POST(req: Request) {
  const body = await req.json();

  // 1) تغيير حالة إعلان + حذف إعلان
  if (body.type === "listing_status") {
    const { id, status } = body;

    const { error } = await supabaseAdmin
      .from("listings")
      .update({ status })
      .eq("id", id);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (body.type === "delete_listing") {
    const { id } = body;
    const { error } = await supabaseAdmin
      .from("listings")
      .delete()
      .eq("id", id);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  // 2) Trends
  if (body.type === "add_trend") {
    const trendPayload = body.trend || {};
    const { error } = await supabaseAdmin
      .from("trends")
      .insert([{ payload: trendPayload, active: true }]);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (body.type === "delete_trend") {
    const { id } = body;
    const { error } = await supabaseAdmin.from("trends").delete().eq("id", id);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (body.type === "toggle_trend") {
    const { id } = body;
    const { data, error } = await supabaseAdmin
      .from("trends")
      .select("active")
      .eq("id", id)
      .single();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    const { error: upErr } = await supabaseAdmin
      .from("trends")
      .update({ active: !data.active })
      .eq("id", id);
    if (upErr)
      return NextResponse.json({ error: upErr.message }, { status: 500 });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
