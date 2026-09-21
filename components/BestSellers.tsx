import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { PRODUCTS } from "@/lib/data";

const BEST = PRODUCTS.filter((p) => p.tags.includes("best")).slice(0, 4);

export default function BestSellers() {
  return (
    <section id="mas-vendidos" className="bg-cream py-16">
      <div className="container">
        <Reveal>
          <SectionHeader
            titleBefore="Los más"
            titleEm="vendidos"
            description="Las piezas que las mujeres eligen una y otra vez."
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BEST.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} y={32}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}