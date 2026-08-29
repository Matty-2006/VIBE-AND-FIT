/**
 * Recursos de imagen locales, seguros para cliente (sin acceso al sistema
 * de archivos). Asume que /public/images contiene archivos numéricos
 * (1.jpg, 2.jpg … 10.jpg). Las imágenes de producto se subirán sin fondo
 * (PNG transparente) y se mostrarán sobre fondo blanco.
 */
const FALLBACK_COUNT = 10;

export function siteAsset(index: number): string {
  const n = ((index - 1) % FALLBACK_COUNT) + 1;
  return `/images/${n}.jpg`;
}

export function siteAssetList(total: number): string[] {
  return Array.from({ length: total }, (_, i) => siteAsset(i + 1));
}