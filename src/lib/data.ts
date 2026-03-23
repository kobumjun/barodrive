import { FALLBACK_PRICING, FALLBACK_REVIEWS } from "@/lib/constants";
import { getSupabaseAdmin, hasSupabase } from "@/lib/supabase";
import { PricingItem, Review } from "@/types";

export async function getPricing(): Promise<PricingItem[]> {
  if (!hasSupabase) return FALLBACK_PRICING;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("pricing").select("*").order("label");
  if (error || !data?.length) return FALLBACK_PRICING;
  return data;
}

export async function getPublishedReviews(limit?: number): Promise<Review[]> {
  if (!hasSupabase) return limit ? FALLBACK_REVIEWS.slice(0, limit) : FALLBACK_REVIEWS;
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("reviews")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error || !data) return limit ? FALLBACK_REVIEWS.slice(0, limit) : FALLBACK_REVIEWS;
  return data;
}

export async function getReviewBySlug(slug: string): Promise<Review | null> {
  if (!hasSupabase) return FALLBACK_REVIEWS.find((review) => review.slug === slug) ?? null;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  if (error || !data) return null;
  return data;
}
