"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { siteAssetList } from "@/lib/siteAssets";

const SPANS = ["md:col-span-7 aspect-[4/5]", "md:col-span-5 aspect-[3/4]", "md:col-span-5 aspect-[4/5]", "md:col-span-7 aspect-[3/4]", "md:col-span-6 aspect-[3/4]", "md:col-span-6 aspect-[3/4]"];

export default function Lookbook() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((item) => {
        gsap.fromTo(
          item,
          { y: -26 },
          {
            y: 26,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const images = siteAssetList(6);

  return (
    <section id="lookbook" ref={sectionRef} className="py-28">
      <div className="container">
        <Reveal>
          <SectionHeader
            eyebrow="Lookbook"
            titleBefore="Una Narrativa"
            titleEm="Visual"
            description="La colección contada en imágenes. Una mirada editorial a cada propuesta."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {images.map((src, i) => (
            <Reveal key={src + i} delay={i % 2 === 0 ? 0 : 100}>
              <div
                className={`group relative overflow-hidden will-change-transform ${SPANS[i % SPANS.length]}`}
              >
                <div data-parallax className="absolute inset-[-8%]">
                  <Image
                    src={src}
                    alt={`Lookbook ISABEL ${i + 1}`}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <span className="absolute bottom-5 left-5 z-[1] text-[0.65rem] uppercase tracking-[0.24em] text-white/70">
                  0{i + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}