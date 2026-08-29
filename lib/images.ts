import fs from "node:fs";
import path from "node:path";

const NUMERIC_RE = /^(\d+)\.(jpg|jpeg|png|webp)$/i;

/**
 * Devuelve las imágenes de campaña (Hero) ubicadas en /public/images
 * cuyo nombre base es únicamente un número, ordenadas de forma numérica
 * ascendente (1.jpg, 2.jpg, 3.jpg ...).
 */
export function numericImageFiles(): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "images");
    const names = fs.readdirSync(dir);
    return names
      .filter((name) => NUMERIC_RE.test(name))
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
      .map((name) => `/images/${name}`);
  } catch {
    return [];
  }
}

/**
 * Recurso de imagen local por índice. Recorre los archivos numéricos
 * realmente presentes en /public/images (p. ej. 1.jpg … 10.jpg) y, si no
 * existe ninguno, recurre al rango 1-6. Así el sistema crece con las
 * campañas sin tocar el código.
 */
export function localImage(index: number): string {
  const files = numericImageFiles();
  const count = files.length;
  if (count > 0) {
    return files[(index - 1) % count];
  }
  return `/images/${((index - 1) % 6) + 1}.jpg`;
}

export function localImageList(total: number): string[] {
  return Array.from({ length: total }, (_, i) => localImage(i + 1));
}