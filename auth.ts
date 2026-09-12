import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = "np_admin_session";
const SECRET = process.env.AUTH_SECRET || "dev-secret-change-me";

export type AdminSession = { adminId: string; email: string; role: string };

/** Signs a short-lived admin session token and sets it as an httpOnly cookie. */
export function createAdminSession(payload: AdminSession) {
  const token = jwt.sign(payload, SECRET, { expiresIn: "12h" });
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export function clearAdminSession() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

/** Verifies the signed session cookie. Returns null if missing, expired, or tampered with. */
export function getAdminSession(): AdminSession | null {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET) as AdminSession;
  } catch {
    return null;
  }
}

/**
 * Role check for routes that go beyond "any signed-in admin can do this" —
 * e.g. editing site-wide policy text or managing other admin accounts.
 * A single-admin deployment (the default here) is always OWNER, so this only
 * starts mattering once staff logins are added.
 */
export function requireOwner(session: AdminSession | null): session is AdminSession {
  return Boolean(session && session.role === "OWNER");
}
