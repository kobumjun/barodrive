import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("reviews").insert({
    title: body.title,
    slug: body.slug || slugify(body.title),
    excerpt: body.excerpt,
    content: body.content,
    author_name: body.author_name,
    created_at: body.created_at,
    image_url: body.image_url,
    storage_path: body.storage_path,
    is_published: body.is_published,
  });

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
