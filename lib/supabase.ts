import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseService = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) console.error("Missing SUPABASE_URL");
if (!supabaseAnon) console.error("Missing SUPABASE_ANON_KEY");
if (!supabaseService) console.warn("Missing SUPABASE_SERVICE_ROLE_KEY - server operations will fail");

// For client usage
export const supabase = createClient(supabaseUrl || "", supabaseAnon || "", {
  auth: { persistSession: false },
});

// For server routes only
export const supabaseAdmin = createClient(supabaseUrl || "", supabaseService || supabaseAnon || "", {
  auth: { persistSession: false },
});
