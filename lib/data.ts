import { siteAsset } from "@/lib/siteAssets";
import catalog from "@/data/catalog.json";
import type { Product, ProductCategory } from "@/lib/types";

export type { Product, ProductCategory, Collection, CatalogData } from "@/lib/types";

export const SITE = {
  name: "Vibe & Fit",
  claim: "Estilo que se mueve contigo.",
  description:
    "Vibe & Fit: moda de mujer y deportiva, contemporánea y con actitud. Piezas diseñadas para vestir bien en cada momento.",
  url: "https://vibe-and-fit.vercel.app",
  instagram: "@vibeyfit",
  domain: "vibe-and-fit.vercel.app",
  whatsapp: "593985335586",
  whatsappDisplay: "098 533 5586",
};

export type HeroSlide = {
  src: string;
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type Category = {
  name: string;
  image: string;
};

export type Testimonial = {
  text: string;
  author: string;
  role: string;
  stars: number;
};

/**
 * Contenido editorial del Hero, uno por imagen de campaña (1.jpg, 2.jpg …).
 * El cambio de fotografía cambia también el mensaje, para que el Hero
 * funcione como una campaña viva y no como un carrusel convencional.
 */
export const HERO_SLIDE_COPY: Omit<HeroSlide, "src">[] = [
  {
    eyebrow: "COLECCIÓN VIBE & FIT",
    title: "Elegancia que habla por ti.",
    subtitle:
      "Descubre una colección creada para la mujer que define su propio estilo.",
  },
  {
    eyebrow: "LA ESENCIA",
    title: "Menos ruido, más estilo.",
    subtitle: "Piezas esenciales pensadas para acompañar todos tus días.",
  },
  {
    eyebrow: "ELEGANCIA COTIDIANA",
    title: "Belleza de cada día.",
    subtitle:
      "Siluetas cómodas, materiales nobles y una presencia natural.",
  },
  {
    eyebrow: "NOCHES VIBE & FIT",
    title: "Para noches que se recuerdan.",
    subtitle: "Diseños que brillan sin estridencias.",
  },
  {
    eyebrow: "ATEMPORAL",
    title: "Lo clásico, reinterpretado.",
    subtitle: "Prendas que se heredan, estilos que permanecen.",
  },
  {
    eyebrow: "EDITORIAL",
    title: "Una mirada propia.",
    subtitle: "La moda como expresión personal, no como tendencia.",
  },
  {
    eyebrow: "ICONOS DE ESTILO",
    title: "Piezas que se recuerdan.",
    subtitle: "Formas que hablan el mismo idioma en cada temporada.",
  },
  {
    eyebrow: "MATERIA Y FORMA",
    title: "Donde el tejido encuentra su silueta.",
    subtitle: "El equilibrio entre la caída de la tela y la línea del diseño.",
  },
  {
    eyebrow: "AL ACABAR EL DÍA",
    title: "Una elegancia que descansa contigo.",
    subtitle: "La rutina también merece belleza y calma.",
  },
  {
    eyebrow: "NUEVA COLECCIÓN",
    title: "Lo que viene, ya está aquí.",
    subtitle: "Una propuesta fresca para empezar de nuevo.",
  },
];

export const ANNOUNCEMENTS = [
  "VIBE & FIT",
  "Ropa de mujer y deportiva",
  "Nueva colección disponible",
  "Estilo que se mueve contigo",
  "Compra fácil por WhatsApp",
];

export const NAV_LINKS = [
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Ropa de Mujer", href: "/categoria/ropa-de-mujer" },
  { label: "Deportiva", href: "/categoria/deportiva" },
  { label: "Nosotras", href: "/about" },
];

export const CATEGORIES: Category[] = [
  { name: "Ropa de Mujer", image: siteAsset(2) },
  { name: "Deportiva", image: siteAsset(4) },
];

/** Cada producto está disponible en los cuatro colores de la colección. */
export const COLORS = ["#8fb2c9", "#24405c", "#111111", "#f4efe9"];

/** Catálogo completo. La fuente de verdad es data/catalog.json, que se puede
 * editar desde el panel de administración (/admin). Este módulo solo lo lee. */
export const PRODUCTS: Product[] = catalog.products as Product[];

/** Tallas por defecto del catálogo (las de la Guía de Tallas). Cada producto
 * puede tener su propia lista en `product.sizes`. */
export const SIZES: string[] = catalog.sizes;

/** Colección de Ãºltima hora en el home. Se actualiza sola porque vive en el JSON. */
export function latestProducts(count = 4): Product[] {
  return PRODUCTS.slice().reverse().slice(0, count);
}

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "Cada pieza que he recibido supera mis expectativas. Se nota el cuidado en los detalles y en la elección de los materiales.",
    author: "Camila G.",
    role: "Cliente Vibe & Fit",
    stars: 5,
  },
  {
    text: "Una marca con una estética limpia y elegante. El jean que compré se ha convertido en mi pieza favorita del armario.",
    author: "Valentina R.",
    role: "Cliente Vibe & Fit",
    stars: 5,
  },
  {
    text: "Me encanta la coherencia de sus colecciones: prendas versátiles que combinan entre sí y nunca pasan de moda.",
    author: "Paulina M.",
    role: "Cliente Vibe & Fit",
    stars: 5,
  },
  {
    text: "El proceso de compra es sencillo y la atención al detalle se nota en el producto final. Volveré sin duda.",
    author: "Daniela S.",
    role: "Cliente Vibe & Fit",
    stars: 5,
  },
  {
    text: "Encontré exactamente el estilo que buscaba. Elegante, cómodo y con una presencia que llama la atención sin gritar.",
    author: "Sofía L.",
    role: "Cliente Vibe & Fit",
    stars: 5,
  },
  {
    text: "Una compra que superó lo que esperaba. Las prendas se sienten especiales y están pensadas para durar.",
    author: "Lorena V.",
    role: "Cliente Vibe & Fit",
    stars: 5,
  },
];

export const INSTAGRAM_IMAGES = [
  siteAsset(1),
  siteAsset(2),
  siteAsset(3),
  siteAsset(4),
  siteAsset(5),
  siteAsset(6),
  siteAsset(2),
  siteAsset(5),
];

export const COLOR_NAMES: Record<string, string> = {
  "#8fb2c9": "Azul Claro",
  "#24405c": "Azul Oscuro",
  "#111111": "Negro",
  "#f4efe9": "Blanco",
};

export const PRODUCT_DESCRIPTIONS: Record<ProductCategory, string> = {
  Jeans:
    'Denim de tiro alto que sujeta y estiliza sin apretar. Elasticidad justa para moverte todo el día y una costura que aguanta lavado tras lavado.',
  Pantalones:
    'Cortes amplios y rectos que estilizan la pierna. Caída limpia, cintura definida y un tejido con cuerpo que mantiene la forma.',
  Faldas:
    'Largo corto con estructura: mantienen la silueta en su sitio y se combinan igual de bien con zapatilla que con tacón.',
  Shorts:
    'Denim de verano con tiro alto y bajo trabajado. Cómodos de llevar y fáciles de combinar con cualquier top.',
  Deportiva:
    'Tejidos ligeros que acompañan cada movimiento. Comodidad y actitud para el día a día o el entrenamiento.',
};

/** Descripción que se muestra de un producto: la propia si la escribió el
 * admin, o la genérica del tipo de prenda si está vacía. */
export function productDescription(product: Pick<Product, "description" | "category">): string {
  return product.description?.trim() ? product.description.trim() : PRODUCT_DESCRIPTIONS[product.category];
}

export const PRODUCT_COMPOSITION: Record<ProductCategory, string> = {
  Jeans:
    'Mezclilla de algodón con elastano para dar recuperación. Lava del revés en frío para conservar el tono.',
  Pantalones:
    'Tejido de algodón con cuerpo y poca elasticidad, pensado para que el corte no se deforme con el uso.',
  Faldas:
    'Mezclilla firme con forro en la cintura. Lava del revés y evita la secadora para mantener el color.',
  Shorts:
    'Mezclilla de algodón con acabado lavado. Los deshilachados del bajo son parte del diseño y se asientan con el uso.',
  Deportiva:
    'Tejido ligero con elasticidad para el movimiento. Lava en frío y tiende plano para conservar la prenda.',
};

export function imageUrl(url: string): string {
  // Las imágenes locales no deben llevar parámetros de consulta internos.
  return url.split("?")[0];
}