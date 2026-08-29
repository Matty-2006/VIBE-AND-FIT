"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { siteAsset } from "@/lib/siteAssets";

const PARAGRAPHS = [
  "ISABEL nace de una idea sencilla: la elegancia no se impone, se habita.",
  "Diseñamos pensando en la mujer que prefiere pocas prendas, pero excelentes. Siluetas que aguantan el paso del tiempo, tejidos que se sienten mejor con cada uso y una paleta serena que combina entre sí.",
  "Porque el estilo verdadero no es lo que muestras, sino lo que permanece.",
];

function splitWords(text: string) {
  return text.split(" ").map((word, i) => (
    <span
      key={`${word}-${i}`}
      className="bs-word inline-block will-change-transform"
    >
      {word.replace(/\s+$/, "")}
      {/\s$/.test(word) ? " " : " "}
    </span>
  ));
}

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bs-word",
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.035,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 72%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-32 text-white">
      <div className="container grid grid-cols-12 gap-10 items-center">
        <div className="col-span-4 max-[1024px]:col-span-12 max-[1024px]:mb-8">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={siteAsset(5)}
              alt="Nuestra historia"
              fill
              sizes="(max-width:1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="col-span-8 max-[1024px]:col-span-12">
          <div className="mb-10 flex items-baseline gap-4">
            <span className="font-display text-6xl text-bronze">01</span>
            <div>
              <span className="eyebrow block text-white/60">Nuestra Historia</span>
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold">
                Elegancia que permanece.
              </h2>
            </div>
          </div>

          <div className="max-w-[680px] space-y-7 font-serif text-[1.15rem] leading-[1.75] text-white/80">
            {PARAGRAPHS.map((text, i) => (
              <p key={i}>{splitWords(text)}</p>
            ))}
          </div>

          <Link
            href="/about"
            className="mt-12 inline-flex items-center gap-3 border-b border-bronze pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-[400ms] hover:text-bronze-light"
          >
            Conocer ISABEL
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}