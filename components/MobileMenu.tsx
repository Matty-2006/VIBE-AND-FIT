"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { NAV_LINKS, SITE } from "@/lib/data";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(panel, { display: "flex" });
        gsap.fromTo(
          panel,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power3.inOut" }
        );
        gsap.fromTo(
          ".mm-link",
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            delay: 0.35,
            ease: "power3.out",
          }
        );
      } else {
        gsap.to(panel, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => gsap.set(panel, { display: "none" }),
        });
      }
    }, panel);

    return () => ctx.revert();
  }, [open]);

  return (
    <div
      ref={panelRef}
      style={{ display: "none" }}
      className="fixed inset-0 z-[9999] flex-col items-start justify-between bg-black px-8 pb-10 pt-28 text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
    >
      <nav className="w-full">
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="mm-link flex items-center justify-between border-b border-white/10 py-5 font-display text-3xl"
          >
            {link.label}
            <span className="font-serif text-sm text-bronze-light">{`0${i + 1}`}</span>
          </Link>
        ))}
      </nav>
      <div className="mm-link flex w-full items-center justify-between text-[0.72rem] uppercase tracking-[0.2em] text-white/60">
        <span>{SITE.instagram}</span>
        <span>Elegancia que permanece.</span>
      </div>
    </div>
  );
}