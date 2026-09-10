/**
 * Recursos de imagen locales, seguros para cliente (sin acceso al sistema
 * de archivos). Asume que /public/images contiene archivos numéricos
 * (1.jpg, 2.jpg … 10.jpg). Las imágenes de producto se subirán sin fondo
 * (PNG transparente) y se mostrarán sobre fondo blanco.
 *
 * Se reparten en un orden no secuencial (1, 3, 5, 7, 9, 2, 4, 6, 8, 10)
 * para que dos tarjetas contiguas nunca muestren la misma foto aunque solo
 * haya 10 archivos.
 */
const FALLBACK_ORDER = [1, 3, 5, 7, 9, 2, 4, 6, 8, 10];

export function siteAsset(index: number): string {
  const n = FALLBACK_ORDER[(index - 1) % FALLBACK_ORDER.length];
  return `/images/${n}.jpg`;
}

export function siteAssetList(total: number): string[] {
  return Array.from({ length: total }, (_, i) => siteAsset(i + 1));
}