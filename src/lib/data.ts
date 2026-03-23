import { FALLBACK_PRICING, FALLBACK_REVIEWS } from "@/lib/constants";
import { getSupabaseAdmin, hasSupabase } from "@/lib/supabase";
import { PricingItem, Review } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

function sortByDateDesc(items: Review[]) {
  return [...items].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

function mergeReviews(dbReviews: Review[]) {
  const merged = [...dbReviews, ...FALLBACK_REVIEWS];
  const unique = new Map<string, Review>();

  for (const item of merged) {
    if (!unique.has(item.slug)) {
      unique.set(item.slug, item);
    }
  }

  return sortByDateDesc(Array.from(unique.values()));
}

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
  if (!hasSupabase) return limit ? FALLBACK_REVIEWS.slice(0, limit) : FALLBACK_REVIEWS;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return limit ? FALLBACK_REVIEWS.slice(0, limit) : FALLBACK_REVIEWS;
  }

  const merged = mergeReviews(data);
  return limit ? merged.slice(0, limit) : merged;
}

export async function getReviewBySlug(slug: string): Promise<Review | null> {
  noStore();
  if (!hasSupabase) return FALLBACK_REVIEWS.find((review) => review.slug === slug) ?? null;
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (data) return data;
  return FALLBACK_REVIEWS.find((review) => review.slug === slug) ?? null;
}
