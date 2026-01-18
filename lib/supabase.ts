// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// For client-side usage (uses anon key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("CRITICAL ERROR: Supabase client-side environment variables missing.");
}

export const supabasePublic = createClient(supabaseUrl || "", supabaseAnonKey || "");

// For server-side usage (uses service role key)
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceRoleKey) {
  console.warn("WARNING: SUPABASE_SERVICE_ROLE_KEY missing. Server-side admin operations will fail.");
}

export const supabaseAdmin = createClient(
  supabaseUrl || "",
  supabaseServiceRoleKey || supabaseAnonKey || "",
  {
    auth: {
      persistSession: false,
    },
  }
);
