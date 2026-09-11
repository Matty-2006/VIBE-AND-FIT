"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { NAV_LINKS, SITE } from "@/lib/data";
import ThemeToggle from "@/components/ThemeToggle";

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
      id="mobile-menu"
      ref={panelRef}
      style={{ display: "none" }}
      className="fixed inset-0 z-[9999] flex-col items-start justify-between bg-black px-8 pb-10 pt-6 text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
    >
      <div className="flex w-full items-center justify-between">
        <Link
          href="/"
          onClick={onClose}
          className="font-display text-lg font-semibold uppercase tracking-[0.3em]"
        >
          Vibe&nbsp;&amp;&nbsp;Fit
        </Link>
        <div className="flex items-center gap-1">
          <span className="text-white">
            <ThemeToggle />
          </span>
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="flex h-10 w-10 items-center justify-center text-white transition-transform duration-[400ms] hover:rotate-90"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-[22px] w-[22px]"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="w-full pt-10">
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
        <span>Estilo que se mueve contigo.</span>
      </div>
    </div>
  );
}