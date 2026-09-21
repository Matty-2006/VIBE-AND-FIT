import { SITE } from "@/lib/data";

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function whatsappOrderMessage(
  lines: { name: string; qty: number; size?: string; color?: string }[],
  customer?: { name?: string; city?: string; notes?: string }
): string {
  const intro = `Hola, ${SITE.name}. Quiero realizar este pedido:`;
  const items = lines
    .map((l) => {
      const detalles = [
        l.size ? `talla ${l.size}` : "",
        l.color ? `color ${l.color}` : "",
      ].filter(Boolean);
      return `• ${l.qty} x ${l.name}${
        detalles.length ? ` (${detalles.join(", ")})` : ""
      }`;
    })
    .join("\n");
  const customerLines = [
    customer?.name ? `Nombre: ${customer.name}` : "",
    customer?.city ? `Ciudad: ${customer.city}` : "",
    customer?.notes ? `Notas: ${customer.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return [intro, items, "", customerLines].filter(Boolean).join("\n");
}