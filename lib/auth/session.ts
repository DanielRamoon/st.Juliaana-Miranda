import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "jm_admin_session";

function getSecret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "jm-dev-secret";
}

function getPassword() {
  return process.env.ADMIN_PASSWORD || "juliana2024";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function verifyPassword(password: string) {
  const expected = getPassword();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken() {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${sign(issuedAt)}`;
}

export function isValidSessionToken(token: string | undefined) {
  if (!token) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;
  const expected = sign(issuedAt);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  const age = Date.now() - Number(issuedAt);
  return Number.isFinite(age) && age < 1000 * 60 * 60 * 24 * 7;
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return isValidSessionToken(jar.get(ADMIN_COOKIE)?.value);
}
