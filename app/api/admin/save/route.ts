import { UNAUTHORIZED, verifySession } from "@/lib/auth";
import {
  deleteImageFromDisk,
  getCatalog,
  isUploadImage,
  nextProductId,
  saveImageToDisk,
  writeCatalogToDisk,
} from "@/lib/catalog";
import { publishCatalogToRepo } from "@/lib/github";
import { COLLECTION_NAMES, PRODUCT_CATEGORIES } from "@/lib/types";
import type { CatalogData, Product } from "@/lib/types";

const BADGES = ["new", "sale"] as const;

function cleanString(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

function cleanArray(value: unknown, max: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => String(v ?? "").trim())
    .filter(Boolean)
    .slice(0, max);
}

function sanitizeProduct(raw: unknown, index: number): Product | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Record<string, unknown>;

  const id = Number(p.id);
  const name = cleanString(p.name, 120);
  const category = String(p.category ?? "");
  const collection = String(p.collection ?? "");
  const image = String(p.image ?? "");
  const badge = p.badge as string | null;

  if (!Number.isInteger(id) || id <= 0) return null;
  if (!name) return null;
  if (!PRODUCT_CATEGORIES.includes(category as Product["category"])) return null;
  if (!(collection in COLLECTION_NAMES)) return null;
  if (!image.startsWith("/images/")) return null;
  if (badge !== null && !BADGES.includes(badge as (typeof BADGES)[number])) {
    return null;
  }

  return {
    id,
    name,
    category: category as Product["category"],
    collection: collection as Product["collection"],
    alt: cleanString(p.alt, 300),
    image,
    badge: badge as Product["badge"],
    colors: cleanArray(p.colors, 12),
    tags: cleanArray(p.tags, 8),
    sizes: cleanArray(p.sizes, 20),
    description: cleanString(p.description, 2000),
  };
}

export async function POST(request: Request) {
  return saveFromRequest(request);
}

async function saveFromRequest(request: Request): Promise<Response> {
  try {
    return await saveFromRequestInner(request);
  } catch (err) {
    return Response.json(
      { ok: false, error: `Error interno al guardar: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }
}

async function saveFromRequestInner(request: Request): Promise<Response> {
  const sessionOk = await verifySession();
  if (!sessionOk) return UNAUTHORIZED;

  let body: {
    catalog?: { sizes?: unknown; products?: unknown };
    images?: Array<{ name?: unknown; data?: unknown }>;
    deleteImages?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Datos inválidos" }, { status: 400 });
  }

  const rawProducts = Array.isArray(body?.catalog?.products) ? body.catalog.products : [];
  if (rawProducts.length > 500) {
    return Response.json({ ok: false, error: "Demasiados productos" }, { status: 400 });
  }

  const products: Product[] = [];
  for (let i = 0; i < rawProducts.length; i++) {
    const cleaned = sanitizeProduct(rawProducts[i], i);
    if (!cleaned) {
      return Response.json(
        { ok: false, error: `El producto nº ${i + 1} tiene datos incompletos o inválidos. Revisa el formulario.` },
        { status: 400 }
      );
    }
    if (!cleaned.image || cleaned.image.length === 0) {
      return Response.json(
        { ok: false, error: `Falta la foto del producto nº ${i + 1}.` },
        { status: 400 }
      );
    }
    products.push(cleaned);
  }

  // IDs únicos (por si el cliente enviara duplicados).
  const seen = new Set<number>();
  let nextId = nextProductId(products);
  const finalProducts: Product[] = [];
  for (const p of products) {
    if (seen.has(p.id)) {
      finalProducts.push({ ...p, id: nextId++ });
    } else {
      seen.add(p.id);
      finalProducts.push(p);
    }
  }

  const sizes = cleanArray(body?.catalog?.sizes, 30).filter((s) => s.length <= 8);
  if (sizes.length === 0) sizes.push("M");

  const catalog: CatalogData = { sizes, products: finalProducts };

  // 1) Imágenes nuevas → disco (sin repetir el mismo archivo dos veces).
  const images: Array<{ name: string; data: string }> = [];
  const uploadedNames = new Set<string>();
  for (const img of Array.isArray(body?.images) ? body.images : []) {
    const name = String(img?.name ?? "");
    const data = String(img?.data ?? "");
    if (!name || !data || uploadedNames.has(name)) continue;
    try {
      saveImageToDisk(name, data);
      uploadedNames.add(name);
      images.push({ name, data });
    } catch (err) {
      return Response.json(
        {
          ok: false,
          error: err instanceof Error ? err.message : `No se pudo guardar la foto ${name}.`,
        },
        { status: 400 }
      );
    }
  }

  // 2) Fotos que ya nadie usa (reemplazadas o de productos borrados) → disco.
  const previousImages = new Set(
    getCatalog().products.map((p) => p.image).filter(isUploadImage)
  );
  const nextImages = new Set(finalProducts.map((p) => p.image).filter(isUploadImage));
  const deleteImages = [...previousImages].filter((image) => !nextImages.has(image));
  for (const imagePath of deleteImages) {
    deleteImageFromDisk(imagePath.replace(/^\/images\//, ""));
  }

  // 3) Catálogo → disco (mantiene la web en local al día al momento).
  try {
    writeCatalogToDisk(catalog);
  } catch (err) {
    return Response.json(
      { ok: false, error: `No se pudo guardar el catálogo: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }

  // 4) Publicar en GitHub (requiere GITHUB_TOKEN). Vercel redespliega solo.
  let pushed: PublishResult;
  try {
    pushed = await publishCatalogToRepo({ catalog, images, deleteImages });
  } catch (err) {
    return Response.json(
      { ok: false, error: `No se pudo publicar en GitHub: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }

  const message = pushed.ok
    ? "Cambios guardados. Vercel está redesplegando; en 1–2 minutos la página quedará actualizada (sin recargar nada). Esto se hace automáticamente."
    : pushed.error;

  return Response.json({
    ok: true,
    pushed: pushed.ok,
    message,
    catalog,
  });
}