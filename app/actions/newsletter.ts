"use server";

export type RegistrationResult = { ok: boolean; message?: string };

export type RegistrationInput = {
  nombre: string;
  telefono: string;
  correo: string;
};

/**
 * Envía el registro por WhatsApp de forma automática al número del negocio
 * usando CallMeBot (no abre WhatsApp en el dispositivo del cliente).
 * Configura en Vercel: CALLMEBOT_WHATSAPP y CALLMEBOT_APIKEY.
 */
export async function sendRegistration(
  input: RegistrationInput
): Promise<RegistrationResult> {
  const phone = process.env.CALLMEBOT_WHATSAPP;
  const apikey = process.env.CALLMEBOT_APIKEY;

  if (!phone || !apikey) {
    return {
      ok: false,
      message:
        "El envío automático aún no está configurado. Configura CALLMEBOT_WHATSAPP y CALLMEBOT_APIKEY en Vercel.",
    };
  }

  const text = [
    "NUEVO REGISTRO · VIBE & FIT",
    `Nombre: ${input.nombre || "—"}`,
    `Teléfono: ${input.telefono}`,
    `Correo: ${input.correo}`,
  ].join("\n");

  const url =
    "https://api.callmebot.com/whatsapp.php?" +
    `phone=${encodeURIComponent(phone)}` +
    `&apikey=${encodeURIComponent(apikey)}` +
    `&text=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return { ok: false, message: "No se pudo enviar el mensaje ahora." };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: "Error de conexión al enviar el mensaje." };
  }
}