import { AdminDashboard } from "@/components/admin-dashboard";
import { AdminLogin } from "@/components/admin-login";
import { FALLBACK_PRICING, FALLBACK_REVIEWS } from "@/lib/constants";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin, hasSupabase } from "@/lib/supabase";

async function getAdminData() {
  if (!hasSupabase) {
    return { pricing: FALLBACK_PRICING, reviews: FALLBACK_REVIEWS, inquiries: [] };
  }
  const supabase = getSupabaseAdmin();

  const [{ data: pricing }, { data: reviews }, { data: inquiries }] = await Promise.all([
    supabase.from("pricing").select("*").order("label"),
    supabase.from("reviews").select("*").order("created_at", { ascending: false }),
    supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
  ]);

  return {
    pricing: pricing ?? FALLBACK_PRICING,
    reviews: reviews ?? FALLBACK_REVIEWS,
    inquiries: inquiries ?? [],
  };
}

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return <AdminLogin />;
  }

  const data = await getAdminData();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">관리자 페이지</h1>
      <AdminDashboard initialPricing={data.pricing} initialReviews={data.reviews} initialInquiries={data.inquiries} />
    </div>
  );
}
