import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/data";

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container border-b border-white/10 py-16">
        <div className="grid grid-cols-4 gap-10 max-[1024px]:grid-cols-2">
          <div className="max-[1024px]:col-span-2">
            <p className="font-display text-2xl font-semibold tracking-[0.32em]">
              ISABEL
            </p>
            <p className="mt-6 max-w-[320px] text-[0.85rem] leading-[1.8] text-white/60">
              Moda femenina de esencia atemporal. Elegancia que permanece,
              pieza a pieza, a tu lado.
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
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href="/#catalogo"
                  className="transition-colors duration-[400ms] hover:text-bronze-light"
                >
                  Todas las piezas
                </Link>
              </li>
              <li>
                <Link
                  href="/#lookbook"
                  className="transition-colors duration-[400ms] hover:text-bronze-light"
                >
                  Lookbook
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
                  Newsletter
                </Link>
              </li>
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors duration-[400ms] hover:text-bronze-light"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container flex flex-wrap items-center justify-between gap-3 py-7 text-[0.75rem] text-white/40">
        <span>
          © {new Date().getFullYear()} ISABEL. Todos los derechos reservados.
        </span>
        <span className="font-serif italic text-white/60">
          Elegancia que permanece.
        </span>
      </div>
    </footer>
  );
}