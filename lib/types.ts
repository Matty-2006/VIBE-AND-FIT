export type ProductCategory = "Jeans" | "Pantalones" | "Faldas" | "Shorts" | "Deportiva";

export type Collection = "mujer" | "deportiva";

export type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  /** Colección pública a la que pertenece: Ropa de Mujer o Deportiva. */
  collection: Collection;
  /** Texto alternativo de la foto (describe la imagen, no el nombre). */
  alt: string;
  image: string;
  badge: "new" | "sale" | null;
  colors: string[];
  tags: string[];
  /** Tallas disponibles de ESTE producto. Vacío = usar las del catálogo. */
  sizes: string[];
  /** Descripción propia del producto. Vacía = usar la genérica del tipo. */
  description: string;
};

export type CatalogData = {
  sizes: string[];
  products: Product[];
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Jeans",
  "Pantalones",
  "Faldas",
  "Shorts",
  "Deportiva",
];

export const COLLECTION_NAMES: Record<Collection, string> = {
  mujer: "Ropa de Mujer",
  deportiva: "Deportiva",
};