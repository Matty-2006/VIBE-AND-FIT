import { SITE } from "@/lib/data";

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function whatsappOrderMessage(
  lines: { name: string; qty: number; price: number; oldPrice?: number | null }[],
  total: number,
  customer?: { name?: string; city?: string; notes?: string }
): string {
  const intro = `Hola, ${SITE.name}. Quiero realizar este pedido:`;
  const items = lines
    .map(
      (l) => `• ${l.qty} x ${l.name} — €${((l.oldPrice || l.price) * l.qty).toFixed(2)}`
    )
    .join("\n");
  const totalLine = `Total: €${total.toFixed(2)}`;
  const customerLines = [
    customer?.name ? `Nombre: ${customer.name}` : "",
    customer?.city ? `Ciudad: ${customer.city}` : "",
    customer?.notes ? `Notas: ${customer.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return [intro, items, "", totalLine, "", customerLines].filter(Boolean).join("\n");
}