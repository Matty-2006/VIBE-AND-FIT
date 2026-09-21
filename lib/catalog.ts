import "server-only";
import fs from "node:fs";
import path from "node:path";
import catalogJson from "@/data/catalog.json";
import type { CatalogData, Product } from "@/lib/types";

/**
 * La fuente de verdad del catálogo es data/catalog.json (versionado en el repo).
 * - En local se lee del disco, así los cambios del panel se ven al momento.
 * - En Vercel el disco del servidor es efímero; el archivo se publica al repo
 *   y el despliegue regenera la página. Si el disco no está disponible se
 *   devuelve el JSON incluido en el build (el snapshot publicado).
 */

export const CATALOG_PATH = path.join(process.cwd(), "data", "catalog.json");

function validCatalog(data: unknown): data is CatalogData {
  if (!data || typeof data !== "object") return false;
  const d = data as CatalogData;
  return (
    Array.isArray(d.products) &&
    d.products.every(
      (p) =>
        p &&
        typeof p.id === "number" &&
        typeof p.name === "string" &&
        typeof p.image === "string"
    )
  );
}

export function loadCatalogFromDisk(): CatalogData | null {
  try {
    const raw = fs.readFileSync(CATALOG_PATH, "utf8");
    const data = JSON.parse(raw);
    return validCatalog(data) ? data : null;
  } catch {
    return null;
  }
}

/** Catálogo "fresco": el del disco si existe, si no el del build. */
export function getCatalog(): CatalogData {
  return loadCatalogFromDisk() ?? (catalogJson as CatalogData);
}

export function writeCatalogToDisk(catalog: CatalogData): void {
  fs.mkdirSync(path.dirname(CATALOG_PATH), { recursive: true });
  fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2) + "\n", "utf8");
}

/** Foto de producto guardada en /public/images. El nombre empieza por upload-. */
export const UPLOAD_RE = /^upload-\d{10,16}\.(webp|jpg|jpeg|png)$/i;

export function saveImageToDisk(fileName: string, base64Data: string): void {
  const safe = path.basename(fileName);
  if (!UPLOAD_RE.test(safe)) throw new Error("Nombre de imagen no válido");
  const buffer = Buffer.from(base64Data, "base64");
  if (buffer.byteLength <= 0 || buffer.byteLength > 4 * 1024 * 1024) {
    throw new Error("La imagen está vacía o pesa demasiado");
  }
  const dir = path.join(process.cwd(), "public", "images");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, safe), buffer);
}

export function deleteImageFromDisk(fileName: string): void {
  const safe = path.basename(fileName);
  if (!UPLOAD_RE.test(safe)) return;
  try {
    fs.unlinkSync(path.join(process.cwd(), "public", "images", safe));
  } catch {
    // Si no existe en disco (Vercel) no pasa nada.
  }
}

export function isUploadImage(imagePath: string): boolean {
  const name = imagePath.replace(/^\/images\//, "");
  return UPLOAD_RE.test(name);
}

export function nextProductId(products: Product[]): number {
  return products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
}