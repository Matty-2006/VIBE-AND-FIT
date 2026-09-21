"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { siteAsset } from "@/lib/siteAssets";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-img",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="grain-overlay relative flex h-[62vh] min-h-[420px] items-center justify-center overflow-hidden bg-black"
    >
      <Image
        src={siteAsset(9)}
        alt="Nueva colección Vibe & Fit"
        fill
        quality={90}
        sizes="100vw"
        className="cta-img scale-[1.16] object-cover opacity-70 will-change-transform"
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