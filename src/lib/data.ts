import { FALLBACK_PRICING } from "@/lib/constants";
import { getSupabaseAdmin, hasSupabase } from "@/lib/supabase";
import { PricingItem, Review } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export async function getPricing(): Promise<PricingItem[]> {
  noStore();
  if (!hasSupabase) return FALLBACK_PRICING;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("pricing").select("*").order("label");
  if (error || !data?.length) return FALLBACK_PRICING;
  return data;
}

export async function getPublishedReviews(limit?: number): Promise<Review[]> {
  noStore();
  if (!hasSupabase) return [];
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return limit ? data.slice(0, limit) : data;
}

export async function getReviewBySlug(slug: string): Promise<Review | null> {
  noStore();
  if (!hasSupabase) return null;
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (data) return data;
  const { data: byId } = await supabase
    .from("reviews")
    .select("*")
    .eq("id", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (byId) return byId;
  console.warn(`[reviews] not found by slug/id: ${slug}`);
  return null;
}
