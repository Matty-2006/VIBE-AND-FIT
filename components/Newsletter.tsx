"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError("Introduce un correo electrónico válido.");
      return;
    }
    setError("");
    setDone(true);
    setEmail("");
  };

  return (
    <section id="contacto" className="border-t border-grey-light py-28 text-center">
      <div className="container">
        <Reveal>
          <span className="eyebrow mb-6 block text-bronze">Newsletter</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            Sé parte de ISABEL
          </h2>
          <p className="mx-auto mt-4 mb-10 max-w-[460px] font-serif italic text-grey">
            Recibe nuevas colecciones, novedades y contenido exclusivo.
            Sin ruido, como a nosotros nos gusta.
          </p>

          {done ? (
            <div className="mx-auto max-w-[520px] border border-bronze py-6 font-serif italic text-charcoal">
              Gracias por unirte. Muy pronto tendrás noticias nuestras.
            </div>
          ) : (
            <>
              <form
                onSubmit={onSubmit}
                noValidate
                className="mx-auto flex max-w-[520px] border border-charcoal"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  aria-label="Correo electrónico"
                  className="flex-1 bg-transparent px-5 py-4 font-serif text-[0.95rem] italic outline-none placeholder:text-grey"
                />
                <button
                  type="submit"
                  className="bg-charcoal px-8 py-4 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-[400ms] hover:bg-bronze"
                >
                  Suscribirme
                </button>
              </form>
              {error && (
                <p role="alert" className="mt-3 text-[0.8rem] text-sale">
                  {error}
                </p>
              )}
            </>
          )}

          <p className="mt-5 text-[0.72rem] text-grey">
            Puedes darte de baja cuando quieras. Tu privacidad es importante.
          </p>
        </Reveal>
      </div>
    </section>
  );
}