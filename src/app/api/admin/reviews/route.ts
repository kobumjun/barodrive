import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generateReviewSlug } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const required = ["title", "excerpt", "content", "author_name", "created_at", "image_url"];
  for (const key of required) {
    if (!body[key]) {
      return NextResponse.json({ message: `${key} is required` }, { status: 400 });
    }
  }

  const slug = body.slug && String(body.slug).trim() ? String(body.slug).trim() : generateReviewSlug(String(body.title));
  const supabase = getSupabaseAdmin();
  const payload = {
    title: body.title,
    slug,
    excerpt: body.excerpt,
    content: body.content,
    author_name: body.author_name,
    created_at: body.created_at,
    image_url: body.image_url,
    storage_path: body.storage_path,
    is_published: body.is_published ?? true,
  };

  const { data, error } = await supabase.from("reviews").insert(payload).select("*").single();

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/reviews");
  revalidatePath(`/reviews/${slug}`);
  revalidatePath("/admin");

  return NextResponse.json({ ok: true, review: data });
}
