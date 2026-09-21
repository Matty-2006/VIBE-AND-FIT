"use server";

import { headers } from "next/headers";

export type RegistrationResult = { ok: boolean; message?: string };

export type RegistrationInput = {
  nombre: string;
  telefono: string;
  correo: string;
  mensaje?: string;
};

const LIMITS = { nombre: 80, telefono: 25, correo: 120, mensaje: 500 } as const;

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

// Los saltos de línea se eliminan para que ningún campo pueda falsificar las
// otras líneas del mensaje que recibe el negocio.
function clean(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);
}

export async function sendRegistration(
  input: RegistrationInput
): Promise<RegistrationResult> {
  // Una Server Action es un endpoint público: se puede invocar sin pasar por el
  // formulario, así que todo se valida de nuevo aquí.
  const nombre = clean(input?.nombre, LIMITS.nombre);
  const telefono = clean(input?.telefono, LIMITS.telefono);
  const correo = clean(input?.correo, LIMITS.correo);
  const mensaje = clean(input?.mensaje, LIMITS.mensaje);

  if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return { ok: false, message: "Escribe un correo electrónico válido." };
  }
  if (!telefono || !/^[+\d\s()-]{7,25}$/.test(telefono)) {
    return { ok: false, message: "Escribe un número de teléfono válido." };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headerList.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return {
      ok: false,
      message: "Has enviado varios mensajes seguidos. Inténtalo en unos minutos.",
    };
  }

  const phone = process.env.CALLMEBOT_WHATSAPP;
  const apikey = process.env.CALLMEBOT_APIKEY;

  if (!phone || !apikey) {
    console.error(
      "newsletter: faltan CALLMEBOT_WHATSAPP o CALLMEBOT_APIKEY en el entorno"
    );
    return {
      ok: false,
      message: "No podemos recibir mensajes en este momento. Escríbenos por WhatsApp.",
    };
  }

  const text = [
    mensaje ? "NUEVO MENSAJE DE CONTACTO · VIBE & FIT" : "NUEVO REGISTRO · VIBE & FIT",
    `Nombre: ${nombre || "—"}`,
    `Teléfono: ${telefono}`,
    `Correo: ${correo}`,
    mensaje ? `Mensaje: ${mensaje}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const url =
    "https://api.callmebot.com/whatsapp.php?" +
    `phone=${encodeURIComponent(phone)}` +
    `&apikey=${encodeURIComponent(apikey)}` +
    `&text=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.error("newsletter: CallMeBot respondió", res.status);
      return { ok: false, message: "No se pudo enviar el mensaje ahora." };
    }
    return { ok: true };
  } catch (error) {
    console.error("newsletter: error de red al llamar a CallMeBot", error);
    return { ok: false, message: "Error de conexión al enviar el mensaje." };
  }
}
