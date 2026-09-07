import { SITE } from "@/lib/data";

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function whatsappOrderMessage(
  lines: { name: string; qty: number }[],
  customer?: { name?: string; city?: string; notes?: string }
): string {
  const intro = `Hola, ${SITE.name}. Quiero realizar este pedido:`;
  const items = lines.map((l) => `• ${l.qty} x ${l.name}`).join("\n");
  const customerLines = [
    customer?.name ? `Nombre: ${customer.name}` : "",
    customer?.city ? `Ciudad: ${customer.city}` : "",
    customer?.notes ? `Notas: ${customer.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return [intro, items, "", customerLines].filter(Boolean).join("\n");
}