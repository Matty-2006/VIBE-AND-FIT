"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest(
        "a, button, [data-cursor]"
      );
      gsap.to(ring, { scale: hit ? 1.7 : 1, duration: 0.35 });
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      gsap.set([dot, ring], { clearProps: "all" });
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[10001] hidden lg:block"
      aria-hidden="true"
    >
      <div ref={ringRef} className="absolute h-9 w-9 rounded-full border border-bronze/60" />
      <div ref={dotRef} className="absolute h-1.5 w-1.5 rounded-full bg-bronze" />
    </div>
  );
}