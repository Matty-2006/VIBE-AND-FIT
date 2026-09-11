import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/data";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[17px] w-[17px]">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
      <path d="M14.5 22v-8.4h2.8l.4-3.3h-3.2V8.1c0-.95.26-1.6 1.63-1.6H18V3.55A21 21 0 0 0 15.5 3.4c-2.47 0-4.16 1.51-4.16 4.29v2.6H8.5v3.3h2.84V22h3.16Z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
      <path d="M12 2.2c-5.4 0-9.8 4.4-9.8 9.8 0 4.14 2.56 7.68 6.18 9.13-.09-.78-.16-1.97.03-2.82.18-.77 1.16-4.9 1.16-4.9s-.3-.6-.3-1.47c0-1.38.8-2.4 1.8-2.4.85 0 1.26.64 1.26 1.4 0 .85-.55 2.13-.83 3.32-.24 1 .5 1.81 1.48 1.81 1.78 0 3.15-1.88 3.15-4.58 0-2.4-1.72-4.07-4.18-4.07-2.85 0-4.52 2.13-4.52 4.34 0 .86.33 1.78.75 2.28a.3.3 0 0 1 .07.29c-.08.33-.25 1-.29 1.15-.05.19-.15.24-.35.14-1.32-.61-2.14-2.54-2.14-4.09 0-3.33 2.42-6.38 6.98-6.38 3.66 0 6.51 2.61 6.51 6.1 0 3.64-2.29 6.57-5.48 6.57-1.07 0-2.07-.56-2.42-1.21l-.66 2.5c-.24.92-.88 2.08-1.31 2.78.99.3 2.03.47 3.12.47 5.4 0 9.8-4.4 9.8-9.8s-4.4-9.8-9.8-9.8Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
      <path d="M16.6 2h-3.2v13.9c0 1.5-1.2 2.7-2.7 2.7a2.7 2.7 0 0 1-2.7-2.7 2.7 2.7 0 0 1 2.7-2.7c.3 0 .6.05.86.13V10c-.28-.04-.57-.06-.86-.06A5.9 5.9 0 0 0 5 15.85 5.9 5.9 0 0 0 10.7 21.7a5.9 5.9 0 0 0 5.9-5.85V8.4a8.2 8.2 0 0 0 4.8 1.55V6.7a4.9 4.9 0 0 1-4.8-4.7Z" />
    </svg>
  );
}

const SOCIAL = [
  {
    label: "Instagram",
    href: `https://instagram.com/${SITE.instagram.replace("@", "")}`,
    Icon: InstagramIcon,
  },
  { label: "TikTok", href: "https://tiktok.com", Icon: TikTokIcon },
  { label: "Pinterest", href: "https://pinterest.com", Icon: PinterestIcon },
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container border-b border-white/10 py-16">
        <div className="grid grid-cols-4 gap-10 max-[1024px]:grid-cols-2">
          <div className="max-[1024px]:col-span-2">
            <p className="font-display text-2xl font-semibold tracking-[0.32em]">
              VIBE&nbsp;&amp;&nbsp;FIT
            </p>
            <p className="mt-6 max-w-[320px] text-[0.85rem] leading-[1.8] text-white/60">
              Ropa de mujer y deportiva con estilo propio. Viste bien en cada
              momento, sin perder tu esencia.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-bronze-light">
              Colección
            </h4>
            <ul className="space-y-3 text-[0.85rem] text-white/70">
              {NAV_LINKS.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-[400ms] hover:text-bronze-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-bronze-light">
              Catálogo
            </h4>
            <ul className="space-y-3 text-[0.85rem] text-white/70">
              <li>
                <Link
                  href="/#catalogo"
                  className="transition-colors duration-[400ms] hover:text-bronze-light"
                >
                  Categorías
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/ropa-de-mujer"
                  className="transition-colors duration-[400ms] hover:text-bronze-light"
                >
                  Ropa de Mujer
                </Link>
              </li>
              <li>
                <Link
                  href="/categoria/deportiva"
                  className="transition-colors duration-[400ms] hover:text-bronze-light"
                >
                  Deportiva
                </Link>
              </li>
              <li>
                <Link
                  href="/guia-de-tallas"
                  className="transition-colors duration-[400ms] hover:text-bronze-light"
                >
                  Guía de Tallas
                </Link>
              </li>
              <li>
                <Link
                  href="/sostenibilidad"
                  className="transition-colors duration-[400ms] hover:text-bronze-light"
                >
                  Sostenibilidad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-bronze-light">
              Contacto
            </h4>
            <ul className="space-y-3 text-[0.85rem] text-white/70">
              <li>
                <a
                  href={`mailto:hola@${SITE.domain}`}
                  className="transition-colors duration-[400ms] hover:text-bronze-light"
                >
                  hola@{SITE.domain}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 transition-colors duration-[400ms] hover:text-bronze-light"
                  aria-label={`WhatsApp de ${SITE.name}: ${SITE.whatsappDisplay}`}
                >
                  <svg viewBox="0 0 32 32" fill="currentColor" className="h-[15px] w-[15px] text-bronze-light">
                    <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 27l6.3-1.6A12 12 0 0 0 16 27c6.6 0 12-5.4 12-12S22.6 3 16 3Zm0 21.9c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 0 1 6.1 15C6.1 9.6 10.6 5.1 16 5.1S25.9 9.6 25.9 15 21.4 24.9 16 24.9Zm5.5-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.2.2-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" />
                  </svg>
                  {SITE.whatsappDisplay} · {SITE.name}
                </a>
              </li>
              <li>
                <Link
                  href="/#contacto"
                  className="transition-colors duration-[400ms] hover:text-bronze-light"
                >
                  Contacto y Newsletter
                </Link>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-2.5">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${SITE.name} en ${s.label}`}
                  className="btn-glow flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-[300ms] hover:border-bronze-light hover:text-bronze-light"
                >
                  <s.Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container flex flex-wrap items-center justify-between gap-3 py-7 text-[0.75rem] text-white/40">
        <span>
          © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
        </span>
        <span className="font-serif italic text-white/60">
          Estilo que se mueve contigo.
        </span>
      </div>
    </footer>
  );
}