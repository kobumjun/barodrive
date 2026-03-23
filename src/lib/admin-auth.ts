import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

function buildToken(pin: string) {
  return crypto.createHash("sha256").update(`barodrive:${pin}`).digest("hex");
}

export async function isAdminAuthenticated() {
  const pin = process.env.ADMIN_PIN;
  if (!pin) return false;
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return token === buildToken(pin);
}

export async function setAdminSession() {
  const pin = process.env.ADMIN_PIN;
  if (!pin) throw new Error("ADMIN_PIN is missing");

  (await cookies()).set(COOKIE_NAME, buildToken(pin), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12,
    path: "/",
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}
