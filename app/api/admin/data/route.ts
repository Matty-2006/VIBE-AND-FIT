import { UNAUTHORIZED, verifySession } from "@/lib/auth";
import { getCatalog } from "@/lib/catalog";

export async function GET() {
  const sessionOk = await verifySession();
  if (!sessionOk) return UNAUTHORIZED;

  const catalog = getCatalog();
  return Response.json({ ok: true, catalog });
}