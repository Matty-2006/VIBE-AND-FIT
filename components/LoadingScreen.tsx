"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

export default function LoadingScreen() {
  useEffect(() => {
    const el = document.getElementById("vibe-loader");
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.remove();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => el.remove(),
      });
      tl.fromTo(
        "[data-lp-logo]",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" }
      )
        .fromTo(
          "[data-lp-bar]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
          "-=0.2"
        )
        .to(el, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.1,
        });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="vibe-loader"
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black text-white"
      aria-hidden="true"
    >
      <p
        data-lp-logo
        className="will-change-transform font-display text-[1.6rem] font-semibold uppercase tracking-[0.34em] text-white opacity-0"
      >
        Vibe&nbsp;&amp;&nbsp;Fit
      </p>
      <div className="mt-6 h-px w-44 overflow-hidden bg-white/20">
        <div
          data-lp-bar
          className="h-full w-full origin-left scale-x-0 bg-bronze-light"
        />
      </div>
      <p
        data-lp-logo
        className="mt-4 font-serif text-sm italic text-white/50 opacity-0"
      >
        Estilo que se mueve contigo.
      </p>
    </div>
  );
}