import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/data";

export default function Catalog() {
  return (
    <section id="catalogo" className="bg-white py-24">
      <div className="container">
        <div className="mb-14 text-center">
          <span className="eyebrow block text-bronze">La Colección</span>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-charcoal">
            Catálogo
          </h2>
          <div
            className="mt-6 flex items-center justify-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px w-14 bg-bronze" />
            <span className="h-2 w-2 rotate-45 border border-bronze" />
            <span className="h-px w-14 bg-bronze" />
          </div>
          <p className="mt-6 font-serif text-[1.05rem] italic text-grey">
            Todas las piezas, a un clic de distancia.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-x-4 gap-y-12 max-[520px]:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:gap-x-7 lg:gap-y-16">
          {PRODUCTS.slice(0, 10).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}