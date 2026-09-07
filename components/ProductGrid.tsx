import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/data";

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-16">
      {PRODUCTS.slice(0, 10).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}