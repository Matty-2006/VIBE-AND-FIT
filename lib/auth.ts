import "server-only";
import { cookies } from "next/headers";
import crypto from "node:crypto";

/**
 * Autenticación simple del panel de administración.
 *
 * Las credenciales se pueden cambiar con variables de entorno
 * (ADMIN_USER / ADMIN_PASS) sin tocar el código; si no están definidas,
 * se usan las de seguridad «isabel» / «isable».
 *
 * La sesión es un token firmado (HMAC-SHA256) guardado en una cookie
 * del navegador. El proxy.ts solo comprueba que la cookie exista
 * (optimistic); la verificación de verdad la hacen estos servidores.
 */

export const SESSION_COOKIE = "vf_admin";
const SESSION_MAX_AGE = 60 * 60 * 12; // 12 horas
const LOGIN_USER = process.env.ADMIN_USER || "isabel";
const LOGIN_PASS = process.env.ADMIN_PASS || "isabel";
// Secreto para firmar las sesiones. En producción debe definirse ADMIN_SECRET.
const SECRET = process.env.ADMIN_SECRET || "vf-dev-secret-no-utilizar-en-produccion";

function b64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

function sign(input: string): string {
  return crypto.createHmac("sha256", SECRET).update(input).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

export function checkCredentials(user: string, pass: string): boolean {
  return safeEqual(user, LOGIN_USER) && safeEqual(pass, LOGIN_PASS) && user.length > 0;
}

export function createSessionToken(): string {
  const payload = b64url(
    JSON.stringify({ sub: LOGIN_USER, iat: Date.now(), exp: Date.now() + SESSION_MAX_AGE * 1000 })
  );
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  if (!safeEqual(sig, sign(payload))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      exp?: number;
    };
    if (typeof data.exp !== "number" || data.exp < Date.now()) return false;
  } catch {
    return false;
  }
  return true;
}

/** Verifica la cookie de sesión de la petición actual (ruta handler o servidor). */
export async function verifySession(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE,
};

export const UNAUTHORIZED = Response.json({ ok: false, error: "No autorizado" }, { status: 401 });