"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeader from "@/components/SectionHeader";
import { TESTIMONIALS } from "@/lib/data";

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${count} de 5 estrellas`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`h-[15px] w-[15px] ${i < count ? "text-bronze" : "text-grey/40"}`}
        >
          <path d="M12 2.5 14.9 8.6l6.6.8-4.9 4.5 1.3 6.5L12 17.3l-5.9 3.1 1.3-6.5-4.9-4.5 6.6-.8L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-quote]",
        { autoAlpha: 0, y: 44 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="testimonios"
      className="border-y border-grey-light bg-white py-24"
    >
      <div className="container">
        <SectionHeader
          eyebrow="Testimonios"
          titleBefore="Lo que"
          titleEm="dicen"
          description="Historias reales de quienes ya visten Vibe & Fit."
        />
        <div className="mt-2 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.author}
              data-quote
              className="flex flex-col justify-between rounded-md border border-grey-light bg-cream p-8 transition-colors duration-[400ms] hover:border-bronze/50"
            >
              <div>
                <Stars count={t.stars} />
                <blockquote className="mt-5 font-serif text-[1.05rem] italic leading-[1.8] text-charcoal">
                  “{t.text}”
                </blockquote>
              </div>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-grey-light pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal font-display text-sm font-semibold text-white">
                  {t.author.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-charcoal">
                    {t.author}
                  </p>
                  <p className="font-serif text-sm italic text-grey">
                    {t.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}