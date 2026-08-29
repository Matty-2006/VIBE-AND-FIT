import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { siteAsset } from "@/lib/siteAssets";

export default function EditorialSplit() {
  return (
    <section className="border-y border-grey-light bg-white py-28">
      <div className="container grid grid-cols-2 items-center gap-0 max-[768px]:grid-cols-1">
        <Reveal>
          <div className="relative aspect-[3/4] overflow-hidden max-[768px]:mb-10">
            <Image
              src={siteAsset(2)}
              alt="La esencia ISABEL"
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="max-w-[440px] pl-16 max-[1024px]:pl-10 max-[768px]:pl-0">
            <span className="eyebrow mb-6 block text-bronze">La Esencia ISABEL</span>
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-[1.08]">
              Menos ruido.
              <br />
              <em className="italic text-bronze">Más estilo.</em>
            </h2>
            <p className="my-8 leading-[1.85] text-grey">
              Una propuesta limpia y elegante que surge de una convicción:
              la verdadera elegancia no necesita exceso. Composición serena,
              cortes depurados y una mirada que valora lo esencial.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 bg-charcoal px-10 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-[400ms] hover:bg-bronze"
            >
              Conocer ISABEL
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}