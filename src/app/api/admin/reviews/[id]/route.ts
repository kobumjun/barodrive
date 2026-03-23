import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { data: existing } = await supabase.from("reviews").select("slug").eq("id", id).maybeSingle();

  const { error } = await supabase.from("reviews").update(body).eq("id", id);
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/reviews");
  if (existing?.slug) revalidatePath(`/reviews/${existing.slug}`);
  if (body.slug && typeof body.slug === "string") revalidatePath(`/reviews/${body.slug}`);
  revalidatePath("/admin");

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { data: existing } = await supabase.from("reviews").select("slug").eq("id", id).maybeSingle();

  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/reviews");
  if (existing?.slug) revalidatePath(`/reviews/${existing.slug}`);
  revalidatePath("/admin");

  return NextResponse.json({ ok: true });
}
