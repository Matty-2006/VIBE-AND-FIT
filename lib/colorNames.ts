/**
 * Nombres de color → código hex, para que en el panel de administración se
 * pueda escribir «azul marino» y que la prenda aparezca de ese color sin tener
 * que buscar el código a mano. Es un módulo puro (sin React); lo usa el Editor.
 */

type ColorEntry = { name: string; hex: string };

/** Nombres comunes en español (y sus alias en inglés) para autodetectar. */
const NAMED: ColorEntry[] = [
  { name: "Azul Claro", hex: "#8fb2c9" },
  { name: "Azul Claro", hex: "#8fb2c9" },
  { name: "Azul Marino", hex: "#24405c" },
  { name: "Azul Francia", hex: "#24405c" },
  { name: "Azul Noche", hex: "#24405c" },
  { name: "Blanco", hex: "#f4efe9" },
  { name: "Blanco Roto", hex: "#f4efe9" },
  { name: "Marfil", hex: "#f4efe9" },
  { name: "Crema", hex: "#f4efe9" },
  { name: "Negro", hex: "#111111" },
  { name: "Carbón", hex: "#111111" },
  { name: "Gris", hex: "#8a8a8a" },
  { name: "Gris Claro", hex: "#c8c2b8" },
  { name: "Gris Oxford", hex: "#6b6b6b" },
  { name: "Beige", hex: "#d9c7a7" },
  { name: "Beige Arena", hex: "#d9c7a7" },
  { name: "Camel", hex: "#c19a6b" },
  { name: "Tostado", hex: "#c19a6b" },
  { name: "Marrón", hex: "#6f4e37" },
  { name: "Chocolate", hex: "#4a2c17" },
  { name: "Ocre", hex: "#c99700" },
  { name: "Mostaza", hex: "#e1b23c" },
  { name: "Amarillo", hex: "#f4d03f" },
  { name: "Amarillo Pollo", hex: "#f4d03f" },
  { name: "Dorado", hex: "#caa14c" },
  { name: "Oro", hex: "#caa14c" },
  { name: "Naranja", hex: "#e67e22" },
  { name: "Mandarina", hex: "#f39c12" },
  { name: "Rojo", hex: "#c0392b" },
  { name: "Rojo Óxido", hex: "#a52d22" },
  { name: "Bordó", hex: "#800020" },
  { name: "Vino", hex: "#800020" },
  { name: "Burdeos", hex: "#800020" },
  { name: "Rosa", hex: "#f5c6c5" },
  { name: "Rosa Claro", hex: "#f5c6c5" },
  { name: "Rosa Pastel", hex: "#f5c6c5" },
  { name: "Rosa Chicle", hex: "#f5c6c5" },
  { name: "Rosa Antiguo", hex: "#d98d8a" },
  { name: "Fucsia", hex: "#e84393" },
  { name: "Magenta", hex: "#c2185b" },
  { name: "Lila", hex: "#b39ddb" },
  { name: "Lavanda", hex: "#b39ddb" },
  { name: "Morado", hex: "#6c5ce7" },
  { name: "Uva", hex: "#5e2a6e" },
  { name: "Púrpura", hex: "#5e2a6e" },
  { name: "Verde", hex: "#27ae60" },
  { name: "Verde Botella", hex: "#186a3b" },
  { name: "Verde Bosque", hex: "#0e5e3f" },
  { name: "Verde Oliva", hex: "#70841f" },
  { name: "Oliva", hex: "#70841f" },
  { name: "Verde Militar", hex: "#4f5d35" },
  { name: "Caqui", hex: "#8a7f3f" },
  { name: "Verde Menta", hex: "#a8e6cf" },
  { name: "Turquesa", hex: "#16a085" },
  { name: "Celeste", hex: "#7ac0e8" },
  { name: "Cielo", hex: "#7ac0e8" },
  { name: "Cyan", hex: "#00bcd4" },
  { name: "Añil", hex: "#283593" },
  { name: "Índigo", hex: "#4b0082" },
  { name: "Petróleo", hex: "#0e4c5e" },
  { name: "Vaquero", hex: "#4a7ba6" },
  { name: "Denim", hex: "#4a7ba6" },
  { name: "Jeans", hex: "#4a7ba6" },
  { name: "Violeta", hex: "#8e44ad" },
  { name: "Terracota", hex: "#cd5c3a" },
  { name: "Ladrillo", hex: "#b9422a" },
  { name: "Salmón", hex: "#fa8072" },
  { name: "Coral", hex: "#ff6f61" },
  { name: "Vermellón", hex: "#e84118" },
  { name: "Plateado", hex: "#b0b7bf" },
  { name: "Plata", hex: "#b0b7bf" },
  { name: "Grafito", hex: "#3a3a3a" },
  { name: "Antracita", hex: "#2f2f2f" },
  { name: "Piedra", hex: "#9a9a86" },
  { name: "Arena", hex: "#e3d5bd" },
  { name: "Rosa Claro", hex: "#f5c6c5" },
];

/** Paleta rápida que se sugiere al abrir el editor de un producto. */
export const DEFAULT_COLOR_SWATCHES = [
  "#8fb2c9",
  "#24405c",
  "#111111",
  "#f4efe9",
  "#d9c7a7",
  "#c0392b",
  "#f5c6c5",
  "#27ae60",
];

/** Normaliza un texto para comparar nombres (quita tildes, minúsculas). */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/** Devuelve true si el texto parece un color en hex (#fff, #a52d22…). */
export function looksLikeHex(value: string): boolean {
  return /^#?[0-9a-f]{3,8}$/i.test(value.trim());
}

/** Pasa un hex #rgb/#rgba a la forma #rrggbb (6 dígitos). */
export function toHex6(value: string): string {
  const v = (value.startsWith("#") ? value : `#${value}`).toLowerCase();
  if (/^#[0-9a-f]{6}$/.test(v)) return v;
  // #abc -> #aabbcc
  if (/^#[0-9a-f]{3}$/.test(v)) {
    return `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`;
  }
  // #abcd y #abcdef con 8 dígitos: tomamos solo el color (ignora alpha).
  if (/^#[0-9a-f]{8}$/.test(v)) return `#${v.slice(1, 7)}`;
  return v; // devolvemos lo que haya; el validador del formulario lo descarta
}

/**
 * Intenta «adivinar» el color a partir de lo que escribe el admin:
 *   1. Si es un código hex (#fff / a52d22) lo usa tal cual.
 *   2. Si es un nombre conocido (azul marino, beige, negro…) lo traduce.
 * Devuelve null si no reconoce nada (el formulario avisará con «equivocada»).
 */
export function detectColor(input: string): { name: string; hex: string } | null {
  const raw = String(input ?? "").trim();
  if (!raw) return null;

  if (looksLikeHex(raw)) {
    const hex = toHex6(raw.replace(/^#/, ""));
    return { name: hex, hex };
  }

  const key = normalize(raw);
  const match = NAMED.find((c) => normalize(c.name) === key);
  if (match) return { name: match.name, hex: match.hex };

  return null;
}

/** Nombre amigable para mostrar junto a un swatch conocido (o el hex). */
export function colorLabel(hex: string): string {
  const h = hex.toLowerCase();
  const known = NAMED.find((c) => c.hex === h);
  return known ? known.name : hex.toUpperCase();
}
