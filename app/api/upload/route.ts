import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const urls: string[] = [];

    for (const file of files) {
      if (!file.type?.startsWith("image/")) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const fileName = `${crypto.randomUUID()}.${ext}`;
      const filePath = `listings/${fileName}`;

      const { error: upErr } = await supabaseAdmin.storage
        .from("listings")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (upErr) {
        console.error("Supabase storage upload error:", upErr);
        return NextResponse.json({ error: upErr.message }, { status: 500 });
      }

      const { data } = supabaseAdmin.storage
        .from("listings")
        .getPublicUrl(filePath);

      urls.push(data.publicUrl);
    }

    return NextResponse.json({ urls });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed: " + error.message }, { status: 500 });
  }
}
