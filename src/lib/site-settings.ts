import { DEFAULT_PHONE_NUMBER } from "@/lib/constants";
import { getSupabaseAdmin, hasSupabase } from "@/lib/supabase";
import { unstable_noStore as noStore } from "next/cache";

export function toPhoneLink(phoneNumber: string) {
  const digits = phoneNumber.replace(/[^0-9]/g, "");
  return `tel:${digits}`;
}

export async function getSitePhoneNumber() {
  noStore();
  if (!hasSupabase) return DEFAULT_PHONE_NUMBER;
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("site_settings")
    .select("phone_number")
    .eq("id", 1)
    .maybeSingle();

  return data?.phone_number || DEFAULT_PHONE_NUMBER;
}
