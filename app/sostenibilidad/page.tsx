import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { siteAsset } from "@/lib/siteAssets";

export const metadata: Metadata = {
  title: "Sostenibilidad",
  description:
    "El enfoque responsable de Vibe & Fit: materiales cuidados, pequeñas producciones y un diseño pensado para durar.",
};

const PILLARS = [
  {
    title: "Materiales cuidados",
    desc: "Seleccionamos tejidos por su tacto, su caída y su durabilidad. Preferimos composiciones nobles que envejecen bien y reducen la necesidad de sustituir prendas.",
    src: siteAsset(7),
  },
  {
    title: "Producción serena",
    desc: "Trabajamos en pequeñas cantidades y con una mirada pausada. Producir menos y mejor es nuestra manera de respetar tanto al planeta como a las personas.",
    src: siteAsset(8),
  },
  {
    title: "Diseño atemporal",
    desc: "Diseñamos para que una prenda pueda acompañarte durante años. Nada de prisa, nada de desechable: piezas que permanecen.",
    src: siteAsset(9),
  },
];

const COMMITMENTS = [
  {
    number: "01",
    title: "Menos, pero mejor",
    desc: "Pequeñas colecciones y producciones limitadas que evitan el excedente y el desperdicio.",
  },
  {
    number: "02",
    title: "Materiales que duran",
    desc: "Tejidos escogidos por su resistencia y su tacto, para que cada prenda conserve su forma con el uso diario.",
  },
  {
    number: "03",
    title: "Cuidar el armario",
    desc: "Piezas que combinan entre sí y que no pasan de moda. Una propuesta que simplifica el armario y lo hace más honesto.",
  },
  {
    number: "04",
    title: "Transparencia",
    desc: "Comunicamos con claridad qué hacemos y cómo lo hacemos, sin eslóganes que no podamos sostener.",
  },
];

export default function SostenibilidadPage() {
  return (
    <>
      <section className="relative flex h-[55vh] min-h-[400px] items-center justify-center overflow-hidden">
        <Image
          src={siteAsset(6)}
          alt="Sostenibilidad Vibe & Fit"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-[1] max-w-[650px] px-8 text-center text-white">
          <span className="mb-5 block text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-bronze-light">
            Sostenibilidad
          </span>
          <h1 className="mb-4 font-display text-[clamp(2.5rem,5vw,4rem)] font-bold">
            Una mirada responsable
          </h1>
          <p className="font-serif text-lg italic text-white/85">
            Producir menos y mejor, también es elegancia.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Filosofía"
              titleBefore="Nuestra"
              titleEm="manera"
              description="En Vibe & Fit, la sostenibilidad no es una promesa aislada: es la consecuencia natural de diseñar con calma y con criterio."
            />
          </Reveal>
          <div className="mt-12 space-y-16">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title}>
                <div
                  className={`grid grid-cols-2 items-center gap-10 max-[768px]:grid-cols-1 ${
                    i % 2 !== 0
                      ? "[&>div:first-child]:order-2 max-[768px]:[&>div:first-child]:order-none"
                      : ""
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.src}
                      alt={p.title}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="mb-3 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-bronze">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mb-4 font-display text-3xl font-semibold">
                      {p.title}
                    </h3>
                    <p className="leading-[1.8] text-grey">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Compromisos"
              titleBefore="Cómo lo"
              titleEm="hacemos"
              description="Promesas que cumplimos, no eslóganes."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-8 max-[768px]:grid-cols-1">
            {COMMITMENTS.map((c) => (
              <Reveal key={c.number} delay={80}>
                <div className="flex gap-6 border border-grey-light bg-cream p-8">
                  <span className="font-display text-3xl text-bronze">
                    {c.number}
                  </span>
                  <div>
                    <h4 className="mb-2 font-serif text-lg">{c.title}</h4>
                    <p className="text-[0.9rem] leading-[1.7] text-grey">
                      {c.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}