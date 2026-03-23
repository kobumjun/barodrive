import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabase = Boolean(url && anonKey);

export function getSupabaseClient() {
  if (!url || !anonKey) {
    throw new Error("Supabase env is missing.");
  }
  return createClient(url, anonKey);
}

export function getSupabaseAdmin() {
  if (!url || !serviceRoleKey) {
    throw new Error("Supabase admin env is missing.");
  }
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
