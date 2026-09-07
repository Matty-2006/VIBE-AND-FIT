"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { siteAssetList } from "@/lib/siteAssets";

const SPANS = [
  "aspect-[4/5] md:col-span-7",
  "aspect-[3/4] md:col-span-5",
  "aspect-[4/5] md:col-span-5",
  "aspect-[3/4] md:col-span-7",
  "aspect-[3/4] md:col-span-6",
  "aspect-[3/4] md:col-span-6",
];

export default function Lookbook() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-tile]",
        { autoAlpha: 0, y: 64, scale: 0.96, rotate: 1.2 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 76%",
            once: true,
          },
        }
      );

      if (!window.matchMedia("(pointer: coarse)").matches) {
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

        gsap.utils.toArray<HTMLElement>("[data-tile-caption]").forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                once: true,
              },
            }
          );
        });
      }
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

        <div className="grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-12">
          {images.map((src, i) => (
            <figure
              key={src + i}
              data-tile
              className={`${SPANS[i % SPANS.length]} mx-auto h-auto`}
            >
              <div className="group relative h-full max-h-[720px] w-full overflow-hidden bg-black">
                <div data-parallax className="absolute inset-[-8%]">
                  <Image
                    src={src}
                    alt={`Lookbook Vibe & Fit N.º ${i + 1}`}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <span className="absolute bottom-4 left-5 z-[1] inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/45 font-display text-[0.7rem] text-white backdrop-blur-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <figcaption
                data-tile-caption
                className="mt-4 flex items-baseline justify-between gap-4"
              >
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-bronze-dark">
                  Lookbook Vibe &amp; Fit
                </span>
                <span className="font-serif text-[0.95rem] italic text-charcoal">
                  N.º {String(i + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}