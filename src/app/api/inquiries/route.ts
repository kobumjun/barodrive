import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const required = ["name", "phone", "training_type", "region", "desired_schedule", "driving_level"];

    for (const key of required) {
      if (!body[key]) {
        return NextResponse.json({ message: `${key} is required` }, { status: 400 });
      }
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("inquiries").insert({
      name: body.name,
      phone: body.phone,
      training_type: body.training_type,
      region: body.region,
      desired_schedule: body.desired_schedule,
      driving_level: body.driving_level,
      message: body.message ?? "",
      status: "신규",
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "invalid request" }, { status: 400 });
  }
}
