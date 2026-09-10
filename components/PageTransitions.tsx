"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function PageTransitions() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.45,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.to(el, {
              clipPath: "inset(0 0 100% 0)",
              duration: 0.45,
              ease: "power3.inOut",
            });
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9500] bg-black"
      style={{ clipPath: "inset(0 0 100% 0)" }}
    />
  );
}