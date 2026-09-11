"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import type { HeroSlide } from "@/lib/data";
import Magnetic from "@/components/Magnetic";

const AUTO_MS = 3000;

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

  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    if (isReduced) {
      gsap.set(el.children, { y: 0, autoAlpha: 1 });
      return;
    }
    const tween = gsap.fromTo(
      el.children,
      { y: 26, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.35,
        overwrite: "auto",
      }
    );
    return () => {
      tween.kill();
    };
  }, [pos, isReduced]);

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
      {slides.map((s, idx) => (
        <div
          key={idx}
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
            quality={80}
            className="h-full w-full object-cover object-center"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/50" />

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-7xl px-6 pb-16 sm:pb-20">
          <div ref={contentRef} className="max-w-xl">
            <p className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.38em] text-bronze-light">
              <span className="inline-block h-px w-10 bg-bronze-light" />
              {slide.eyebrow}
            </p>

            <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5.2rem)] leading-[1.02] font-semibold text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.45)]">
              {titleParts.join(" ")}{" "}
              <em className="font-serif font-medium italic text-bronze-light">
                {accent}
              </em>
            </h1>

            <p className="mt-5 max-w-md font-serif text-lg italic leading-relaxed text-[#cfc6b8] sm:text-xl">
              {slide.subtitle}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/#catalogo"
                  data-hover="Explorar"
                  className="btn-swap rounded-full bg-black/50 px-8 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm"
                >
                  <span>Ver Catálogo</span>
                </Link>
              </Magnetic>
              <Link
                href="/categoria/ropa-de-mujer"
                className="btn-ring rounded-full border border-white/60 px-8 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white"
              >
                Comprar
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
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === pos ? "w-7 bg-white" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}