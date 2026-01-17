// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnon = process.env.SUPABASE_ANON_KEY!;
const supabaseService = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// للاستعمال فـ server routes فقط (POST/PATCH/UPLOAD/ADMIN)
export const supabaseAdmin = createClient(supabaseUrl, supabaseService, {
  auth: { persistSession: false },
});

// إلا احتجنا قراءة ب anon
export const supabaseAnonClient = createClient(supabaseUrl, supabaseAnon, {
  auth: { persistSession: false },
});
