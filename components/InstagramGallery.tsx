import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { INSTAGRAM_IMAGES, SITE } from "@/lib/data";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function InstagramGallery() {
  return (
    <section className="pb-28">
      <div className="container">
        <Reveal>
          <SectionHeader
            eyebrow="Instagram"
            titleBefore={SITE.instagram}
            titleEm=""
            description="Síguenos en Instagram"
          />
        </Reveal>
      </div>

      <Reveal className="px-1">
        <div className="grid grid-cols-4 gap-1 max-[768px]:grid-cols-2">
          {INSTAGRAM_IMAGES.map((src, i) => (
            <a
              key={src + i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              data-cursor
              aria-label={`Ver publicación ${i + 1} en Instagram`}
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={src}
                alt={`Publicación de ${SITE.instagram}`}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/35 text-white opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100">
                <InstagramIcon />
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}