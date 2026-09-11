"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const BASE = 36;
const PLAIN_SCALE = 1.7;
const LABEL_PAD_X = 20;
const LABEL_HEIGHT = 40;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const wrap = wrapRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !wrap || !ring || !label) return;

    document.documentElement.classList.add("has-custom-cursor");

    gsap.set([dot, wrap], { xPercent: -50, yPercent: -50 });
    gsap.set(ring, {
      width: BASE,
      height: BASE,
      scale: 1,
      backgroundColor: "rgba(17,17,17,0)",
      borderColor: "rgba(169,143,109,0.6)",
    });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const wrapX = gsap.quickTo(wrap, "x", { duration: 0.5, ease: "power3.out" });
    const wrapY = gsap.quickTo(wrap, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      wrapX(e.clientX);
      wrapY(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const textEl = target.closest<HTMLElement>("[data-cursor-text]");
      const plainHit = target.closest("a, button, [data-cursor]");

      if (textEl) {
        // Measure the label at its natural width first, then size the
        // pill to fit it exactly — a fixed circle made the text spill
        // outside its edges on longer labels like "Ver producto".
        label.textContent = textEl.getAttribute("data-cursor-text") ?? "";
        const textWidth = label.getBoundingClientRect().width;
        const pillWidth = Math.max(BASE, Math.round(textWidth) + LABEL_PAD_X * 2);

        gsap.to(ring, {
          width: pillWidth,
          height: LABEL_HEIGHT,
          scale: 1,
          backgroundColor: "rgba(17,17,17,0.94)",
          borderColor: "rgba(17,17,17,0.94)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(label, { autoAlpha: 1, duration: 0.25, delay: 0.05 });
        gsap.to(dot, { autoAlpha: 0, duration: 0.2 });
      } else {
        gsap.to(ring, {
          width: BASE,
          height: BASE,
          scale: plainHit ? PLAIN_SCALE : 1,
          backgroundColor: "rgba(17,17,17,0)",
          borderColor: "rgba(169,143,109,0.6)",
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.to(label, { autoAlpha: 0, duration: 0.15 });
        gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      gsap.set([dot, wrap], { clearProps: "all" });
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[10001] hidden lg:block"
      aria-hidden="true"
    >
      <div ref={wrapRef} className="absolute h-9 w-9">
        <div
          ref={ringRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-none"
        />
        <span
          ref={labelRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white opacity-0"
        />
      </div>
      <div ref={dotRef} className="absolute h-1.5 w-1.5 rounded-full bg-bronze" />
    </div>
  );
}
