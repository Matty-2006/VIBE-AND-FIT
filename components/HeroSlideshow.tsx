"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import type { HeroSlide } from "@/lib/data";
import Magnetic from "@/components/Magnetic";

const AUTO_MS = 3000;
const KEN_BURNS_MS = 9000;

function useReducedMotion() {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  return reduced;
}

export default function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);
  const [paused, setPaused] = useState(false);
  const isReduced = useReducedMotion();

  const length = slides.length;
  const slide = useMemo(() => slides[pos % length], [slides, pos, length]);

  // Entrada del contenido: el titular se revela palabra a palabra bajo su
  // máscara; el resto (eyebrow, subtítulo, CTAs) sube junto la base.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const words = gsap.utils.toArray<HTMLElement>("[data-hero-word]", el);
    const fades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]", el);

    if (isReduced) {
      gsap.set([...fades, ...words], { y: 0, yPercent: 0, autoAlpha: 1 });
      return;
    }

    const tl = gsap.timeline({ overwrite: "auto" });
    tl.fromTo(
      fades,
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
    );
    tl.fromTo(
      words,
      { yPercent: 130, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.05,
        stagger: 0.07,
        ease: "power4.out",
      },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, [pos, isReduced]);

  // Ken Burns: el slide activo respira (zoom lento de salida), como en los
  // héroes de producto de Apple. Cada cambio de slide reinicia la cámara.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || isReduced) return;
    const img = el.querySelector<HTMLImageElement>(`[data-slide="${pos}"] img`);
    if (!img) return;
    const tween = gsap.fromTo(
      img,
      { scale: 1.07 },
      { scale: 1, duration: KEN_BURNS_MS / 1000, ease: "none", overwrite: "auto" }
    );
    return () => {
      tween.kill();
      gsap.set(img, { scale: 1 });
    };
  }, [pos, isReduced]);

  // Salida tipo Apple: al hacer scroll el contenido se eleva y se desvanece
  // mientras el conjunto de imágenes hace un zoom sutil (profundidad).
  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el || isReduced) return;

    const ctx = gsap.context(() => {
      const st = {
        trigger: el,
        start: "top top",
        end: "+=65%",
        scrub: true,
      };
      gsap.to("[data-hero-media]", { scale: 1.1, ease: "none", scrollTrigger: st });
      gsap.to("[data-hero-inner]", {
        yPercent: -26,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: st,
      });
    }, el);

    return () => ctx.revert();
  }, [isReduced]);

  const go = useCallback(
    (dir: 1 | -1) => {
      setPos((p) => (p + dir + length * 1000) % length);
    },
    [length]
  );

  useEffect(() => {
    if (paused || isReduced) return;
    const timer = window.setInterval(() => {
      setPos((prev) => {
        let next = Math.floor(Math.random() * length);
        if (next === prev) next = (prev + 1) % length;
        return next;
      });
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [paused, isReduced, length]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      const t = e.target;
      if (
        t instanceof HTMLElement &&
        (t.closest("input, textarea, select") || t.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    },
    [go]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let startX = 0;
    const onDown = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onUp = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
    };
    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchend", onUp, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchend", onUp);
    };
  }, [go]);

  if (!slide) return null;

  const titleParts = slide.title.split(" ");
  const accent = titleParts.pop();

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="grain-overlay relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-black"
      aria-label="Presentación Vibe & Fit"
    >
      <div data-hero-media className="absolute inset-0 will-change-transform">
        {slides.map((s, idx) => (
          <div
            key={idx}
            data-slide={idx}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              idx === pos ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.src}
              alt={s.eyebrow}
              fill
              priority={idx === 0}
              sizes="100vw"
              quality={90}
              className="h-full w-full object-cover object-center will-change-transform"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/50" />

      <div className="absolute inset-x-0 bottom-0">
        <div data-hero-inner className="mx-auto max-w-7xl px-6 pb-16 will-change-transform sm:pb-20">
          <div ref={contentRef} className="max-w-xl">
            <p data-hero-fade className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.38em] text-bronze-light">
              <span className="inline-block h-px w-10 bg-bronze-light" />
              {slide.eyebrow}
            </p>

            <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5.2rem)] font-semibold leading-[1.02] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.45)]">
              {titleParts.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-top"
                >
                  <span
                    data-hero-word
                    className="inline-block will-change-transform"
                  >
                    {word}
                    {"\u00A0"}
                  </span>
                </span>
              ))}
              {accent && (
                <span className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-top">
                  <em
                    data-hero-word
                    className="inline-block font-serif font-medium italic text-bronze-light will-change-transform"
                  >
                    {accent}
                  </em>
                </span>
              )}
            </h1>

            <p data-hero-fade className="mt-5 max-w-md font-serif text-lg italic leading-relaxed text-[#cfc6b8] sm:text-xl">
              {slide.subtitle}
            </p>

            <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/categoria/ropa-de-mujer"
                  className="btn-glow rounded-full bg-bronze px-8 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white transition-[background-color,box-shadow,transform] duration-[300ms] hover:bg-bronze-dark"
                >
                  Comprar
                </Link>
              </Magnetic>
              <Link
                href="/#catalogo"
                data-hover="Explorar"
                className="btn-swap rounded-full bg-black/50 px-8 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm"
              >
                <span>Ver Catálogo</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPos(idx)}
            aria-label={`Ir a la diapositiva ${idx + 1}`}
            aria-current={idx === pos}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === pos ? "w-7 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}