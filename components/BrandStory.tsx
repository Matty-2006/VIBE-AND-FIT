"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { siteAsset } from "@/lib/siteAssets";

const PARAGRAPHS = [
  "Vibe & Fit nace de una idea sencilla: vestirse bien también es una actitud.",
  "Diseñamos pensando en la mujer que prefiere pocas prendas, pero excelentes. Siluetas que aguantan el paso del tiempo, tejidos que se sienten mejor con cada uso y una paleta serena que combina entre sí.",
  "Porque el estilo verdadero no es lo que muestras, sino cómo te sientes.",
];

function splitWords(text: string) {
  return text.split(" ").map((word, i) => (
    <span
      key={`${word}-${i}`}
      className="bs-word inline-block will-change-transform"
    >
      {word}
      {"\u00A0"}
    </span>
  ));
}

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el.querySelectorAll(".bs-word, .bs-img"), {
        autoAlpha: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bs-word",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 72%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".bs-img",
        { clipPath: "inset(0 0 100% 0)", y: 32 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-32 text-white max-[1024px]:py-20">
      <div className="container grid grid-cols-12 items-center gap-14 max-[1024px]:grid-cols-1 max-[1024px]:gap-10">
        <div className="col-span-4 max-[1024px]:col-span-1 max-[1024px]:order-2 max-[640px]:mx-auto max-[640px]:w-full max-w-[340px]">
          <div className="bs-img relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src={siteAsset(5)}
              alt="Nuestra historia"
              fill
              sizes="(max-width:1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="col-span-8 max-[1024px]:col-span-1 max-[1024px]:order-1">
          <div className="mb-10 flex items-baseline gap-4 max-[640px]:flex-col max-[640px]:items-center max-[640px]:gap-2 max-[640px]:text-center">
            <span className="font-display text-6xl text-bronze max-[640px]:text-4xl">
              01
            </span>
            <div>
              <span className="eyebrow block text-white/60">
                Nuestra Historia
              </span>
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold">
                Estilo que se mueve contigo.
              </h2>
            </div>
          </div>

          <div className="max-w-[680px] space-y-7 font-serif text-[1.15rem] leading-[1.75] text-white/80 max-[640px]:mx-auto max-[640px]:text-center">
            {PARAGRAPHS.map((text, i) => (
              <p key={i}>{splitWords(text)}</p>
            ))}
          </div>

          <div className="mt-12 max-[640px]:text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 border-b border-bronze pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-[400ms] hover:text-bronze-light"
            >
              Conocer Vibe & Fit
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}