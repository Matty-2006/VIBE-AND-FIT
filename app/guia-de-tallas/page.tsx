import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import SizeConverter from "@/components/SizeConverter";
import { siteAsset } from "@/lib/siteAssets";

export const metadata: Metadata = {
  title: "Guía de Tallas",
  description:
    "Encuentra tu talla en Vibe & Fit: tabla de medidas en centímetros y consejos para acertar con la elección.",
};

const ROWS = [
  { name: "Contorno de Pecho", xs: "78–82 cm", s: "82–86 cm", m: "86–92 cm", l: "92–98 cm" },
  { name: "Contorno de Cintura", xs: "60–64 cm", s: "64–68 cm", m: "68–74 cm", l: "74–80 cm" },
  { name: "Contorno de Cadera", xs: "86–90 cm", s: "90–94 cm", m: "94–100 cm", l: "100–106 cm" },
  { name: "Largo de Brazo", xs: "58–60 cm", s: "60–62 cm", m: "62–64 cm", l: "64–66 cm" },
];

const TIPS = [
  "Recomendamos elegir la talla según tu contorno de pecho: es la medida que menos varía entre marcas.",
  "Si estás entre dos tallas, opta por la más holgada para mayor confort.",
  "Tómate las medidas con una camiseta interior ligera para máxima precisión.",
  "Mide siempre el mismo lado del cuerpo y mantén la cinta paralela al suelo.",
  "¿Tienes dudas? Escríbenos y te ayudamos a encontrar tu talla.",
];

export default function GuiaDeTallasPage() {
  return (
    <>
      <section className="relative flex h-[45vh] min-h-[330px] items-center justify-center overflow-hidden">
        <Image
          src={siteAsset(4)}
          alt="Guía de tallas Vibe & Fit"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-[1] max-w-[650px] px-8 text-center text-white">
          <span className="mb-5 block text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-bronze-light">
            Ayuda
          </span>
          <h1 className="mb-4 font-display text-[clamp(2.2rem,4vw,3.2rem)] font-bold">
            Guía de Tallas
          </h1>
          <p className="font-serif text-lg italic text-white/85">
            La talla perfecta está a un paso
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Medidas"
              titleBefore="Tabla de"
              titleEm="medidas"
              description="Medidas en centímetros. Ayúdate de una cinta métrica para lograr la precisión perfecta."
            />
          </Reveal>

          <Reveal>
            <div className="mt-12 overflow-x-auto">
              <table className="w-full border-collapse bg-white text-center">
                <thead>
                  <tr className="bg-black text-[0.72rem] uppercase tracking-[0.12em] text-white">
                    <th className="px-6 py-4 text-start">Medida</th>
                    <th className="px-6 py-4">XS</th>
                    <th className="px-6 py-4">S</th>
                    <th className="px-6 py-4">M</th>
                    <th className="px-6 py-4">L</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.name} className="border-b border-grey-light">
                      <td className="px-6 py-4 text-start font-serif">{row.name}</td>
                      <td className="px-6 py-4 text-grey">{row.xs}</td>
                      <td className="px-6 py-4 text-grey">{row.s}</td>
                      <td className="px-6 py-4 text-grey">{row.m}</td>
                      <td className="px-6 py-4 text-grey">{row.l}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <div className="my-16 aspect-video max-h-[500px] overflow-hidden">
            <Image
              src={siteAsset(2)}
              alt="Cómo tomar tus medidas"
              width={1200}
              height={675}
              className="h-full w-full object-cover"
            />
          </div>

          <ol className="my-10 grid grid-cols-3 gap-8 max-[768px]:grid-cols-1">
            {[
              {
                title: "Pecho",
                desc: "Rodea la parte más prominente del busto manteniendo la cinta nivelada y paralela al suelo.",
              },
              {
                title: "Cintura",
                desc: "Localiza la parte más estrecha de tu torso y mide justo por encima del ombligo.",
              },
              {
                title: "Cadera",
                desc: "Mide alrededor de la parte más ancha de tus caderas y glúteos.",
              },
            ].map((step, i) => (
              <li key={step.title} className="text-center">
                <div className="mx-auto mb-4 flex h-[44px] w-[44px] items-center justify-center rounded-full border border-bronze font-display text-bronze">
                  {i + 1}
                </div>
                <h3 className="mb-1 font-serif text-lg">{step.title}</h3>
                <p className="text-[0.85rem] leading-[1.6] text-grey">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Conversor"
              titleBefore="Conversor"
              titleEm="internacional"
              description="Convierte tu talla europea a otros mercados."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <SizeConverter />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <Reveal>
            <SectionHeader eyebrow="Consejos" titleBefore="Consejos" titleEm="prácticos" />
          </Reveal>
          <Reveal>
            <div className="mx-auto mt-10 max-w-[720px]">
              {TIPS.map((tip, i) => (
                <div
                  key={i}
                  className="flex gap-4 border-b border-grey-light py-4"
                >
                  <span className="font-display text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-serif italic leading-[1.7] text-charcoal">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}