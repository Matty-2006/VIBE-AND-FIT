import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { siteAsset } from "@/lib/siteAssets";

export default function CTASection() {
  return (
    <section className="grain-overlay relative flex h-[62vh] min-h-[420px] items-center justify-center overflow-hidden bg-black">
      <Image
        src={siteAsset(9)}
        alt="Nueva colección Vibe & Fit"
        fill
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />

      <Reveal className="relative z-[1] max-w-[620px] px-6 text-center text-white">
        <span className="eyebrow mb-5 block text-bronze-light">
          Nueva Colección
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.1]">
          Encuentra la pieza que te define.
        </h2>
        <p className="mx-auto mt-4 max-w-[440px] font-serif text-lg italic leading-relaxed text-white/80">
          Explora la colección completa y descubre por qué cada prenda Vibe
          &amp; Fit está pensada para durar.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Link
              href="/#catalogo"
              data-hover="Explorar"
              className="btn-swap rounded-full bg-white px-9 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-charcoal"
            >
              <span>Ver Catálogo</span>
            </Link>
          </Magnetic>
          <Link
            href="/categoria/ropa-de-mujer"
            className="btn-ring rounded-full border border-white/60 px-9 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-white"
          >
            Comprar Ahora
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
