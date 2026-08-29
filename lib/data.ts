import { siteAsset } from "@/lib/siteAssets";

export const SITE = {
  name: "ISABEL",
  claim: "Elegancia que permanece.",
  description:
    "Descubre ISABEL, una propuesta de moda femenina elegante, contemporánea y sofisticada.",
  url: "https://isabel-ecru.vercel.app",
  instagram: "@isabel",
  domain: "isabel-ecru.vercel.app",
  whatsapp: "593993765542",
  whatsappDisplay: "099 376 5542",
};

export type HeroSlide = {
  src: string;
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type ProductCategory =
  | "Vestidos"
  | "Blusas"
  | "Conjuntos"
  | "Abrigos"
  | "Accesorios";

export type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  oldPrice: number | null;
  image: string;
  badge: "new" | "sale" | null;
  colors: string[];
  tags: string[];
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
    eyebrow: "COLECCIÓN ISABEL",
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
    eyebrow: "NOCHES ISABEL",
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
  "NUEVA COLECCIÓN DISPONIBLE",
  "ENVÍOS A TODO EL PAÍS",
  "CAMBIOS Y DEVOLUCIONES",
];

export const NAV_LINKS = [
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Lookbook", href: "/#lookbook" },
  { label: "Nosotras", href: "/about" },
];

export const CATEGORIES: Category[] = [
  { name: "Vestidos", image: siteAsset(1) },
  { name: "Conjuntos", image: siteAsset(2) },
  { name: "Blusas", image: siteAsset(3) },
  { name: "Abrigos", image: siteAsset(4) },
  { name: "Accesorios", image: siteAsset(5) },
];

export const FEATURED_IDS = [1, 4, 8, 5];

export const PRODUCTS: Product[] = [
  { id: 1, name: "Vestido Seda Dune", category: "Vestidos", price: 389, oldPrice: null, image: siteAsset(1), badge: "new", colors: ["#1a1a2e", "#a98f6d", "#8b2252"], tags: ["all", "new"] },
  { id: 2, name: "Blusa Alba Ivory", category: "Blusas", price: 189, oldPrice: 250, image: siteAsset(2), badge: "sale", colors: ["#f4efe9", "#a98f6d", "#8b2252"], tags: ["all", "sale"] },
  { id: 3, name: "Pantalón Structure Noir", category: "Vestidos", price: 225, oldPrice: null, image: siteAsset(3), badge: null, colors: ["#111111", "#2b2825", "#4a4a4a"], tags: ["all", "best"] },
  { id: 4, name: "Vestido Noche Alhelí", category: "Vestidos", price: 465, oldPrice: 590, image: siteAsset(4), badge: "sale", colors: ["#8b2252", "#1a1a2e", "#a98f6d"], tags: ["all", "sale", "best"] },
  { id: 5, name: "Abrigo Camel Arena", category: "Abrigos", price: 520, oldPrice: 680, image: siteAsset(5), badge: "sale", colors: ["#d6c8b4", "#2b2825", "#6b4c3b"], tags: ["all", "sale"] },
  { id: 6, name: "Bolso Estructura Ébano", category: "Accesorios", price: 445, oldPrice: null, image: siteAsset(6), badge: null, colors: ["#111111", "#a98f6d", "#8b4513"], tags: ["all", "best"] },
  { id: 7, name: "Bufanda Cashmere Norte", category: "Accesorios", price: 175, oldPrice: null, image: siteAsset(7), badge: "new", colors: ["#d6c8b4", "#a98f6d", "#8b2252"], tags: ["all", "new"] },
  { id: 8, name: "Sandalias Costa Arena", category: "Accesorios", price: 265, oldPrice: null, image: siteAsset(8), badge: "new", colors: ["#a98f6d", "#c0c0c0", "#111111"], tags: ["all", "new", "best"] },
  { id: 9, name: "Vestido Maxi Ceniza", category: "Vestidos", price: 520, oldPrice: null, image: siteAsset(9), badge: "new", colors: ["#e5dccd", "#a98f6d", "#111111"], tags: ["all", "new"] },
  { id: 10, name: "Camisa Lino Costa", category: "Blusas", price: 165, oldPrice: null, image: siteAsset(10), badge: null, colors: ["#f4efe9", "#a98f6d", "#2c3e50"], tags: ["all", "best"] },
  { id: 11, name: "Trench Neptuno", category: "Abrigos", price: 695, oldPrice: null, image: siteAsset(11), badge: "new", colors: ["#d6c8b4", "#111111", "#8b4513"], tags: ["all", "new", "best"] },
  { id: 12, name: "Chaleco Suave Bruma", category: "Abrigos", price: 345, oldPrice: null, image: siteAsset(12), badge: null, colors: ["#d6c8b4", "#a98f6d", "#2b2825"], tags: ["all", "best"] },
  { id: 13, name: "Collar Perla Clásica", category: "Accesorios", price: 285, oldPrice: null, image: siteAsset(13), badge: "new", colors: ["#e5dccd", "#a98f6d", "#111111"], tags: ["all", "new"] },
  { id: 14, name: "Gafas de Sol Clásicas", category: "Accesorios", price: 195, oldPrice: 260, image: siteAsset(14), badge: "sale", colors: ["#111111", "#8b4513", "#a98f6d"], tags: ["all", "sale"] },
  { id: 15, name: "Botines Cuero Toscano", category: "Accesorios", price: 395, oldPrice: null, image: siteAsset(15), badge: null, colors: ["#6b4c3b", "#111111", "#d6c8b4"], tags: ["all", "best"] },
  { id: 16, name: "Mocasines Piel Suave", category: "Accesorios", price: 310, oldPrice: 420, image: siteAsset(16), badge: "sale", colors: ["#d6c8b4", "#111111", "#8b4513"], tags: ["all", "sale"] },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "Cada pieza que he recibido supera mis expectativas. Se nota el cuidado en los detalles y en la elección de los materiales.",
    author: "Camila G.",
    role: "Cliente ISABEL",
    stars: 5,
  },
  {
    text: "Una marca con una estética limpia y elegante. El vestido que compré se ha convertido en mi pieza favorita del armario.",
    author: "Valentina R.",
    role: "Cliente ISABEL",
    stars: 5,
  },
  {
    text: "Me encanta la coherencia de sus colecciones: prendas versátiles que combinan entre sí y nunca pasan de moda.",
    author: "Paulina M.",
    role: "Cliente ISABEL",
    stars: 5,
  },
  {
    text: "El proceso de compra es sencillo y la atención al detalle se nota en el producto final. Volveré sin duda.",
    author: "Daniela S.",
    role: "Cliente ISABEL",
    stars: 5,
  },
  {
    text: "Encontré exactamente el estilo que buscaba. Elegante, cómodo y con una presencia que llama la atención sin gritar.",
    author: "Sofía L.",
    role: "Cliente ISABEL",
    stars: 5,
  },
  {
    text: "Una compra que superó lo que esperaba. Las prendas se sienten especiales y están pensadas para durar.",
    author: "Lorena V.",
    role: "Cliente ISABEL",
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
  "#1a1a2e": "Medianoche",
  "#a98f6d": "Bronce",
  "#8b2252": "Burdeos",
  "#f4efe9": "Marfil",
  "#111111": "Negro",
  "#2b2825": "Carbón",
  "#4a4a4a": "Grafito",
  "#d6c8b4": "Camel",
  "#6b4c3b": "Tabaco",
  "#8b4513": "Caoba",
  "#2c3e50": "Pizarra",
  "#c0c0c0": "Plata",
  "#e5dccd": "Arena",
};

export const PRODUCT_DESCRIPTIONS: Record<ProductCategory, string> = {
  Vestidos:
    "Un diseño pensado para acompañar tu silueta con fluidez. Líneas depuradas, tejidos nobles y una caída impecable para cualquier ocasión.",
  Abrigos:
    "Siluetas amplias y materiales cálidos que abrazan el frío sin renunciar a la elegancia. Prendas para vivir muchos inviernos.",
  Blusas:
    "Detalles sencillos y tejidos ligeros que se adaptan tanto al día como a la noche. La versatilidad de una pieza esencial.",
  Conjuntos:
    "Coordinados estudiados para vestir sin esfuerzo. La combinación perfecta entre comodidad y estilo.",
  Accesorios:
    "Los complementos que terminan de definir un look. Piezas discretas, atemporales y fáciles de combinar.",
};

export const PRODUCT_COMPOSITION: Record<ProductCategory, string> = {
  Vestidos:
    "Tejidos nobles seleccionados para una caída natural. Confección con acabados cuidados y forro interior suave al tacto.",
  Abrigos:
    "Lana y tejidos cálidos de origen responsable. Forro interior para una mayor protección y comodidad en invierno.",
  Blusas:
    "Lino y algodón de tacto suave y transpirable. Entallado ligeramente holgado para mayor confort.",
  Conjuntos:
    "Tejidos de punto e hilados seleccionados por su comodidad y durabilidad. Acabados limpios en cada costura.",
  Accesorios:
    "Cuero y materiales seleccionados por su textura y durabilidad. Herrajes resistentes y acabados cuidados.",
};

export const SIZES = ["XS", "S", "M", "L", "XL"];

export function imageUrl(url: string): string {
  // Las imágenes locales no deben llevar parámetros de consulta internos.
  return url.split("?")[0];
}