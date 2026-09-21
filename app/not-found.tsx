import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="max-w-lg text-center">
        <p className="text-[0.75rem] uppercase tracking-[0.28em] text-grey">
          Error 404
        </p>
        <h1 className="mt-5 font-display text-[2.4rem] leading-tight text-charcoal sm:text-[3rem]">
          Esta página ya no está aquí
        </h1>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-grey">
          Puede que la prenda se haya agotado o que el enlace haya cambiado.
          Vuelve al catálogo y sigue descubriendo la colección.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/categoria/ropa-de-mujer"
            className="w-full bg-charcoal px-8 py-4 text-[0.78rem] uppercase tracking-[0.14em] text-white transition-colors hover:bg-bronze sm:w-auto"
          >
            Ver la colección
          </Link>
          <Link
            href="/"
            className="w-full border border-charcoal px-8 py-4 text-[0.78rem] uppercase tracking-[0.14em] text-charcoal transition-colors hover:bg-charcoal hover:text-white sm:w-auto"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
