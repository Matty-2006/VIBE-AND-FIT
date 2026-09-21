"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export type SplitWord = { text: string; accent?: boolean };

type SplitTextProps = {
  words: SplitWord[];
  accentClassName?: string;
  stagger?: number;
};

export default function SplitText({
  words,
  accentClassName = "italic text-bronze",
  stagger = 0.04,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = gsap.utils.toArray<HTMLElement>("[data-split-word]", el);
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        targets,
        { yPercent: 118, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          stagger,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
      const failSafe = window.setTimeout(() => {
        if (tween.progress() === 0 && !tween.isActive()) {
          gsap.set(targets, { yPercent: 0, autoAlpha: 1 });
        }
      }, 2500);
      tween.eventCallback("onStart", () => window.clearTimeout(failSafe));
    }, el);

    return () => ctx.revert();
  }, [stagger]);

  if (words.length === 0) return null;

  return (
    <span ref={ref} className="inline">
      {words.map((w, i) => (
        <span
          key={`${w.text}-${i}`}
          className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-top"
        >
          <span
            data-split-word
            className={`inline-block will-change-transform ${
              w.accent ? accentClassName : ""
            }`}
          >
            {w.text}
            {"\u00A0"}
          </span>
        </span>
      ))}
    </span>
  );
}