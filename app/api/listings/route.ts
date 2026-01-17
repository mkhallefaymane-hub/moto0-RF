import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("listings")
    .select("id, payload, status, created_at")
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  // باش يبقى نفس الشكل اللي عندك: { listings: [...] }
  const listings = (data || []).map((row: any) => ({
    id: row.id,
    status: row.status,
    createdAt: row.created_at,
    ...(row.payload || {}),
  }));

  return NextResponse.json({ listings });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = {
      ...body,
      // هنا كتكون urls ديال الصور (جاية من upload)
    };

    const { data, error } = await supabaseAdmin
      .from("listings")
      .insert([{ payload, status: "PENDING" }])
      .select("id, payload, status, created_at")
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      id: data.id,
      status: data.status,
      createdAt: data.created_at,
      ...(data.payload || {}),
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    const { data, error } = await supabaseAdmin
      .from("listings")
      .update({ status })
      .eq("id", id)
      .select("id, payload, status, created_at")
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data)
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });

    return NextResponse.json({
      id: data.id,
      status: data.status,
      createdAt: data.created_at,
      ...(data.payload || {}),
    });
  } catch (e) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
