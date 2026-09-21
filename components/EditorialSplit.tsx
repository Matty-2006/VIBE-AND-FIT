"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import { siteAsset } from "@/lib/siteAssets";

export default function EditorialSplit() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".es-img",
        { yPercent: -6 },
        {
          yPercent: 6,
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
      className="border-y border-grey-light bg-white py-20"
    >
      <div className="container grid grid-cols-2 items-center gap-10 max-[1024px]:grid-cols-1">
        <Reveal>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[520px] overflow-hidden">
            <Image
              src={siteAsset(2)}
              alt="La esencia Vibe & Fit"
              fill
              quality={90}
              sizes="(max-width:1024px) 100vw, 50vw"
              className="es-img scale-[1.14] object-cover will-change-transform"
            />
          </div>
        </Reveal>
        <div className="mx-auto w-full max-w-[460px] text-start max-[1024px]:pt-4 max-[640px]:text-center">
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-[1.05] tracking-tight">
            <SplitText words={[{ text: "Menos" }, { text: "ruido." }]} />
            <br />
            <SplitText
              words={[{ text: "Más", accent: true }, { text: "estilo.", accent: true }]}
            />
          </h2>
          <p className="my-8 leading-[1.85] text-grey">
            Una propuesta limpia y elegante que surge de una convicción: la
            verdadera elegancia no necesita exceso. Composición serena, cortes
            depurados y una mirada que valora lo esencial.
          </p>
          <Link
            href="/about"
            className="btn-sweep inline-flex items-center gap-3 bg-charcoal px-10 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white"
          >
            Conocer Vibe & Fit
          </Link>
        </div>
      </div>
    </section>
  );
}