import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.phone_number) {
    return NextResponse.json({ message: "phone_number is required" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("site_settings").upsert({
    id: 1,
    phone_number: body.phone_number,
  });

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/pricing");
  revalidatePath("/admin");

  return NextResponse.json({ ok: true });
}
