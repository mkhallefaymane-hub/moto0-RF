import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const urls: string[] = [];

    for (const file of files) {
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${crypto.randomUUID()}.${ext}`;

      const buffer = Buffer.from(await file.arrayBuffer());

      const { error } = await supabase.storage
        .from("listings")
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        console.error("UPLOAD ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      const { data } = supabase.storage.from("listings").getPublicUrl(fileName);

      urls.push(data.publicUrl);
    }

    return NextResponse.json({ urls });
  } catch (err) {
    console.error("UPLOAD FATAL:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
