"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import FlipButton from "@/components/FlipButton";
import SplitText from "@/components/SplitText";
import { CATEGORIES } from "@/lib/data";

const CARDS: Record<
  string,
  { desc: string; numbers: string; cta: string; href: string; hasImage: boolean }
> = {
  "Ropa de Mujer": {
    desc: "Jeans, pantalones, faldas y shorts en denim, para cada momento del día.",
    numbers: "Toda la colección en un solo lugar.",
    cta: "Ver colección",
    href: "/categoria/ropa-de-mujer",
    hasImage: true,
  },
  Deportiva: {
    desc: "Energía, comodidad y actitud para cada entrenamiento.",
    numbers: "La línea deportiva, muy pronto disponible.",
    cta: "Explorar",
    href: "/categoria/deportiva",
    hasImage: false,
  },
};

const SPORT_IMAGE =
  "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Fit_woman_wearing_sportswear_doing_cardio_in_gym_on_a_treadmill.jpg/1920px-Fit_woman_wearing_sportswear_doing_cardio_in_gym_on_a_treadmill.jpg";

function SpotlightLayer() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.14), transparent 70%)",
      }}
    />
  );
}

function DeportivaCard() {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      ref={ref}
      onMouseMove={onMouseMove}
      href="/categoria/deportiva"
      data-cursor-text="Explorar"
      className="group relative flex h-[480px] flex-col items-center justify-center overflow-hidden bg-charcoal px-8 text-center text-white transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_22px_50px_-20px_rgba(24,21,18,0.45)] max-[768px]:h-[400px]"
    >
      <Image
        src={SPORT_IMAGE}
        alt="Mujer con ropa deportiva entrenando"
        fill
        quality={100}
        sizes="(max-width:768px) 100vw, 50vw"
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45" />
      <SpotlightLayer />
      <span
        className="relative z-[1] font-display text-[5.2rem] font-bold leading-none text-white/10 transition-all duration-[600ms] group-hover:text-bronze-light/30 max-[768px]:text-[4.2rem]"
        aria-hidden="true"
      >
        02
      </span>
      <span className="relative z-[1] mt-6 font-display text-4xl font-semibold text-white max-[768px]:text-3xl">
        Deportiva
      </span>
      <p className="relative z-[1] mt-3 max-w-[360px] font-serif text-[1.05rem] italic leading-relaxed text-white/75">
        Energía, comodidad y actitud para cada entrenamiento.
      </p>
      <span className="relative z-[1] mt-5 text-[0.7rem] uppercase tracking-[0.16em] text-bronze-light">
        La línea deportiva, muy pronto disponible.
      </span>
      <span className="relative z-[1] mt-8">
        <FlipButton
          front="Explorar"
          back="Ver más"
          className="rounded-full border border-white/60 px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white"
          backClass="rounded-full border border-bronze-light bg-bronze-light text-charcoal"
        />
      </span>
    </Link>
  );
}

export default function Catalog() {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="catalogo" className="bg-white py-16">
      <div className="container">
        <div className="mb-10 max-w-[820px]">
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.05] tracking-tight text-charcoal">
            <SplitText words={[{ text: "Catálogo" }]} />
          </h2>
          <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-grey">
            Elige tu mundo: mujer o deportiva. Todo en un solo lugar.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 max-[768px]:grid-cols-1 max-[768px]:gap-10">
          {CATEGORIES.map((c, i) => {
            const card = CARDS[c.name];
            if (!card) return null;
            if (!card.hasImage) return <DeportivaCard key={c.name} />;
            return (
              <Link
                key={c.name}
                ref={ref}
                onMouseMove={onMouseMove}
                href={card.href}
                data-cursor-text="Ver colección"
                className="group relative block h-[480px] overflow-hidden bg-black transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_22px_50px_-20px_rgba(24,21,18,0.45)] max-[768px]:h-[420px]"
              >
                <Image
                  src={c.image}
                  alt={`Categoría ${c.name}`}
                  fill
                  quality={100}
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
                <SpotlightLayer />
                <span className="absolute left-8 top-8 z-[1] font-display text-[0.9rem] font-semibold tracking-[0.3em] text-white/80">
                  {`0${i + 1}`}
                </span>
                <div className="absolute inset-x-0 bottom-0 z-[1] flex flex-col gap-5 p-8">
                  <div>
                    <span className="font-display text-4xl font-semibold text-white max-[768px]:text-3xl">
                      {c.name}
                    </span>
                    <p className="mt-3 max-w-[360px] font-serif text-[1.05rem] italic leading-relaxed text-white/80">
                      {card.desc}
                    </p>
                    <p className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-bronze-light">
                      {card.numbers}
                    </p>
                  </div>
                  <FlipButton
                    front={card.cta}
                    back="Descubrir"
                    className="rounded-full border border-white/60 px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white"
                    backClass="rounded-full border border-bronze-light bg-bronze-light text-charcoal"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}