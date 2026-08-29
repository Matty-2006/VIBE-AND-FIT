import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { siteAsset } from "@/lib/siteAssets";

export const metadata: Metadata = {
  title: "Nosotras",
  description:
    "Conoce la historia y el espíritu de ISABEL: una marca de moda femenina que prioriza la elegancia, lo esencial y lo atemporal.",
};

const VALUES = [
  {
    title: "Elegancia",
    desc: "Una elegancia serena que no necesita llamar la atención. Prendas que se sienten tan bien como se ven.",
  },
  {
    title: "Lo Esencial",
    desc: "Favorecemos la calidad frente a la cantidad. Pocas piezas, bien pensadas, que combinan entre sí.",
  },
  {
    title: "Atemporalidad",
    desc: "Diseños que no obedecen a la prisa de la temporada. Piezas que permanecen contigo temporada tras temporada.",
  },
];

const PILLARS = [
  {
    number: "01",
    title: "El origen",
    desc: "ISABEL nace del deseo de vestir a la mujer contemporánea con una propuesta limpia: formas sencillas, tejidos nobles y una paleta serena que lo combina todo.",
  },
  {
    number: "02",
    title: "La idea",
    desc: "Creemos que la moda femenina puede ser tranquila y decidida a la vez. Menos ruido, más estilo.",
  },
  {
    number: "03",
    title: "El compromiso",
    desc: "Preferimos pequeñas producciones, materiales cuidados y diseños pensados para durar. Cada pieza cuenta una historia que merece quedarse.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden">
        <Image
          src={siteAsset(3)}
          alt="ISABEL"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-[1] max-w-[650px] px-8 text-center text-white">
          <span className="mb-5 block text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-bronze-light">
            Nosotras
          </span>
          <h1 className="mb-4 font-display text-[clamp(2.5rem,5vw,4rem)] font-bold">
            Nuestra Historia
          </h1>
          <p className="font-serif text-lg italic text-white/85">
            Elegancia que permanece.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container grid grid-cols-2 items-center gap-10 max-[768px]:grid-cols-1">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden">
              <Image
                src={siteAsset(1)}
                alt="La esencia ISABEL"
                width={800}
                height={1000}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <span className="eyebrow mb-6 block text-bronze">Quiénes Somos</span>
              <h2 className="mb-6 font-display text-4xl font-bold">
                Una idea <em className="italic text-bronze">sencilla</em>
              </h2>
              <p className="mb-6 leading-[1.85] text-grey">
                ISABEL nace de una convicción: la elegancia no se impone, se
                habita. Una colección pensada para la mujer que define su
                propio estilo y prefiere pocas piezas, pero excelentes.
              </p>
              <p className="mb-6 leading-[1.85] text-grey">
                Trabajamos siluetas que aguantan el paso del tiempo, tejidos
                que se sienten mejor con cada uso y una paleta que combina
                entre sí sin esfuerzo.
              </p>
              <p className="mb-6 leading-[1.85] text-grey">
                Porque el estilo verdadero no es lo que muestras, sino lo que
                permanece.
              </p>
              <p className="leading-[1.85] text-grey">
                Así vestimos a quienes acompañan cada temporada, con una
                propuesta que se siente suya.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container">
          <Reveal>
            <div className="grid grid-cols-3 gap-10 text-center max-[768px]:grid-cols-1">
              {VALUES.map((v) => (
                <div key={v.title} className="px-4">
                  <h3 className="mb-2 font-serif text-xl text-bronze">{v.title}</h3>
                  <p className="text-sm leading-[1.7] text-grey">{v.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container">
          <Reveal>
            <blockquote className="mx-auto max-w-[700px] font-serif text-[1.6rem] italic leading-[1.5] text-charcoal">
              «No diseñamos prendas para una temporada; creamos piezas para
              toda una vida.»
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="bg-black py-24 text-white">
        <div className="container">
          <Reveal>
            <SectionHeader
              dark
              eyebrow="Principios"
              titleBefore="Lo que nos"
              titleEm="define"
              description="Tres ideas guían cada prenda que creamos."
            />
          </Reveal>
          <div className="mx-auto max-w-[760px]">
            {PILLARS.map((item) => (
              <Reveal key={item.number}>
                <div className="flex gap-8 border-b border-white/10 py-8">
                  <span className="font-display text-4xl text-bronze">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-[1.7] text-white/65">
                      {item.desc}
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