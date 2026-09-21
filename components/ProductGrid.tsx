import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, type Product } from "@/lib/data";

export default function ProductGrid({
  products = PRODUCTS,
  emptyTitle = "Estamos preparando esta selección",
  emptyText = "Todavía no hay piezas publicadas en esta categoría. Escríbenos y te avisamos en cuanto lleguen.",
}: {
  products?: Product[];
  emptyTitle?: string;
  emptyText?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="border border-dashed border-grey-light px-6 py-20 text-center">
        <p className="font-serif text-[1.35rem] text-charcoal">{emptyTitle}</p>
        <p className="mx-auto mt-3 max-w-md text-[0.9rem] leading-relaxed text-grey">
          {emptyText}
        </p>
        <Link
          href="/categoria/ropa-de-mujer"
          className="mt-8 inline-block border border-charcoal px-8 py-3 text-[0.78rem] uppercase tracking-[0.14em] text-charcoal transition-colors hover:bg-charcoal hover:text-white"
        >
          Ver la colección
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-16">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
