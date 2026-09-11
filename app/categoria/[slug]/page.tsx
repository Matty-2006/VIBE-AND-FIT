import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";
import { SITE } from "@/lib/data";
import { whatsappLink } from "@/lib/whatsapp";
import { siteAsset } from "@/lib/siteAssets";

type Props = {
  params: Promise<{ slug: string }>;
};

const ROUTES = [
  {
    slug: "ropa-de-mujer",
    title: "Ropa de Mujer",
    eyebrow: "La Colección",
    styleTag: "Toda la colección, pieza a pieza.",
    hero: siteAsset(1),
    heroAlt: "Ropa de mujer Vibe & Fit",
    description:
      "Descubre toda la colección Ropa de Mujer de Vibe & Fit: vestidos, blusas, abrigos y complementos para cada momento.",
  },
  {
    slug: "deportiva",
    title: "Deportiva",
    eyebrow: "Categoría",
    styleTag: "Energía, comodidad y actitud.",
    hero: null,
    heroAlt: "",
    description:
      "La línea deportiva de Vibe & Fit: comodidad, energía y estilo para cada entrenamiento. Pídelo por WhatsApp.",
  },
];

export function generateStaticParams() {
  return ROUTES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = ROUTES.find((r) => r.slug === slug);
  if (!route) return { title: "Categoría no encontrada" };
  const image = route.hero ?? siteAsset(1);
  return {
    title: `${route.title}`,
    description: route.description,
    alternates: { canonical: `/categoria/${route.slug}` },
    openGraph: {
      title: `${route.title} | Vibe & Fit`,
      description: route.description,
      images: [{ url: image, width: 1200, height: 630, alt: route.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${route.title} | Vibe & Fit`,
      description: route.description,
      images: [image],
    },
  };
}

function WhatsAppCta({ text, label }: { text: string; label: string }) {
  return (
    <a
      href={whatsappLink(text)}
      target="_blank"
      rel="noreferrer"
      data-cursor
      className="btn-glow inline-flex items-center gap-3 rounded-full bg-[#25D366] px-9 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-[300ms] hover:bg-[#1fb857]"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-5 w-5">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 27l6.3-1.6A12 12 0 0 0 16 27c6.6 0 12-5.4 12-12S22.6 3 16 3Zm0 21.9c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 0 1 6.1 15C6.1 9.6 10.6 5.1 16 5.1S25.9 9.6 25.9 15 21.4 24.9 16 24.9Zm5.5-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.2.2-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" />
      </svg>
      {label}
    </a>
  );
}

function PageHero({
  title,
  eyebrow,
  styleTag,
  src,
  alt,
}: {
  title: string;
  eyebrow: string;
  styleTag: string;
  src: string;
  alt: string;
}) {
  return (
    <section className="relative flex h-[48vh] min-h-[360px] items-center justify-center overflow-hidden max-[768px]:h-[42vh]">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-[1] max-w-[680px] px-6 text-center text-white">
        <span className="mb-5 block text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-bronze-light">
          {eyebrow}
        </span>
        <h1 className="mb-3 font-display text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.05]">
          {title}
        </h1>
        <p className="font-serif text-lg italic text-white/85">{styleTag}</p>
      </div>
    </section>
  );
}

const MOODS = [
  {
    number: "01",
    title: "Energía",
    desc: "Tejidos ligeros y de secado rápido que se adaptan a cada movimiento, desde el primer minuto de entrenamiento.",
  },
  {
    number: "02",
    title: "Movimiento",
    desc: "Cortes pensados para acompañarte: elasticidad donde se necesita y sujeción donde importa.",
  },
  {
    number: "03",
    title: "Comodidad",
    desc: "Prendas que se sienten tan bien como se ven. Diseño deportivo con el carácter de Vibe & Fit.",
  },
];

function DeportivaPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal py-28 text-white max-[640px]:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative z-[1]">
          <div className="container mx-auto max-w-3xl text-center">
            <span className="eyebrow block text-bronze-light">
              Categoría · Deportiva
            </span>
            <h1 className="mt-6 font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.02]">
              Deportiva
            </h1>
            <p className="mt-5 font-serif text-xl italic leading-relaxed text-white/75">
              Energía, comodidad y actitud para cada momento de tu día.
            </p>
            <div
              className="mt-8 flex items-center justify-center gap-3"
              aria-hidden="true"
            >
              <span className="h-px w-14 bg-bronze-light" />
              <span className="h-2 w-2 rotate-45 border border-bronze-light" />
              <span className="h-px w-14 bg-bronze-light" />
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <WhatsAppCta
                text={`Hola ${SITE.name}, quiero conocer la línea Deportiva.`}
                label="Preguntar por WhatsApp"
              />
              <Link
                href="/categoria/ropa-de-mujer"
                className="btn-ring inline-flex items-center justify-center rounded-full border border-white/60 px-9 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white"
              >
                Ver Ropa de Mujer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Vibe & Fit"
            titleBefore="Energía que"
            titleEm="se viste"
            description="Una propuesta pensada para quienes mueven su vida con estilo."
          />
          <div className="mx-auto grid max-w-[920px] grid-cols-3 gap-6 max-[768px]:grid-cols-1">
            {MOODS.map((m) => (
              <div key={m.number} className="border border-grey-light bg-cream p-8 text-center">
                <span className="font-display text-3xl text-bronze">
                  {m.number}
                </span>
                <h3 className="mt-4 font-serif text-xl text-charcoal">
                  {m.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-[1.75] text-grey">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container max-w-3xl text-center">
          <p className="font-serif text-[clamp(1.4rem,3vw,2rem)] italic leading-[1.5] text-charcoal">
            «La colección deportiva ya está en camino. Pronto encontrarás aquí
            sus piezas; mientras tanto, escríbenos y la conocerás antes que
            nadie.»
          </p>
          <div className="mt-10 flex justify-center">
            <WhatsAppCta
              text={`Hola ${SITE.name}, quiero enterarme de la colección Deportiva.`}
              label={SITE.whatsappDisplay}
            />
          </div>
          <Link
            href="/#catalogo"
            className="mt-8 inline-block border-b border-bronze pb-1 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-charcoal transition-colors hover:text-bronze"
          >
            Volver al Catálogo
          </Link>
        </div>
      </section>
    </>
  );
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;
  const route = ROUTES.find((r) => r.slug === slug);
  if (!route) notFound();

  if (route.slug === "deportiva") {
    return <DeportivaPage />;
  }

  return (
    <>
      <PageHero
        title={route.title}
        eyebrow={route.eyebrow}
        styleTag={route.styleTag}
        src={route.hero ?? siteAsset(1)}
        alt={route.heroAlt}
      />

      <section className="py-24">
        <div className="container">
          <div className="mb-4 text-center text-[0.75rem] uppercase tracking-[0.08em] text-grey">
            <Link
              href="/#catalogo"
              className="transition-colors hover:text-bronze"
            >
              Catálogo
            </Link>{" "}
            / <span className="text-charcoal">{route.title}</span>
          </div>
          <ProductGrid />

          <div className="mt-20 flex flex-col items-center gap-6 border-t border-grey-light pt-14 text-center">
            <p className="max-w-[480px] font-serif text-lg italic leading-relaxed text-charcoal">
              ¿Tienes dudas sobre tu talla o quieres asesorarte? Escríbenos y
              te ayudamos a elegir la pieza perfecta.
            </p>
            <WhatsAppCta
              text={`Hola ${SITE.name}, quiero asesoría sobre el catálogo Ropa de Mujer.`}
              label={SITE.whatsappDisplay}
            />
          </div>
        </div>
      </section>
    </>
  );
}