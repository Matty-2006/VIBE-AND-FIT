"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="max-w-lg text-center">
        <p className="text-[0.75rem] uppercase tracking-[0.28em] text-grey">
          Algo no ha ido bien
        </p>
        <h1 className="mt-5 font-display text-[2.2rem] leading-tight text-charcoal sm:text-[2.7rem]">
          No hemos podido cargar esta página
        </h1>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-grey">
          Ha sido un problema puntual por nuestra parte. Puedes intentarlo de
          nuevo o volver al inicio.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className="w-full bg-charcoal px-8 py-4 text-[0.78rem] uppercase tracking-[0.14em] text-white transition-colors hover:bg-bronze sm:w-auto"
          >
            Reintentar
          </button>
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
