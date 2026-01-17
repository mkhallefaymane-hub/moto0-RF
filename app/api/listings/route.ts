import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("GET /api/listings error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ listings: data || [] });
  } catch (err: any) {
    console.error("GET /api/listings unexpected error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("POST /api/listings body:", body);

    // Build listing object matching common Supabase patterns
    // Using a more flexible structure and explicitly mapping fields
    const listing = {
      title: body.title || `${body.brand} ${body.model}`,
      price: parseFloat(body.price),
      city: body.city,
      description: body.description || "",
      images: Array.isArray(body.images) ? body.images : (body.images ? [body.images] : []),
      status: 'PENDING',
      contact: body.contact || body.phone || "",
      category: body.category || "Voitures",
      type: body.type || 'car',
      // Store everything else in payload
      payload: {
        ...body,
        brand: body.brand,
        model: body.model,
        year: body.year,
        mileage: body.mileage,
        fuel: body.fuel
      }
    };

    const { data, error } = await supabaseAdmin
      .from('listings')
      .insert([listing])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return NextResponse.json({ 
        error: error.message, 
        details: error.details,
        code: error.code 
      }, { status: 500 });
    }

    console.log("Inserted listing successfully:", data);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("POST /api/listings unexpected exception:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    const { data, error } = await supabaseAdmin
      .from('listings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("PATCH /api/listings error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("PATCH /api/listings unexpected error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('listings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("DELETE /api/listings error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE /api/listings unexpected error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
