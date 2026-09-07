"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/Reveal";
import { sendRegistration } from "@/app/actions/newsletter";

type FieldErrors = { telefono?: string; correo?: string };

export default function Newsletter() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: FieldErrors = {};
    if (!/^[+\d][\d\s\-()]{6,}$/.test(telefono.trim())) {
      errs.telefono = "Introduce un teléfono válido.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.trim())) {
      errs.correo = "Introduce un correo válido.";
    }
    setErrors(errs);
    if (errs.telefono || errs.correo) return;

    setSending(true);
    setError("");
    const res = await sendRegistration({
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      correo: correo.trim(),
    });
    setSending(false);

    if (!res.ok) {
      setError(res.message ?? "No se pudo guardar. Inténtalo de nuevo.");
      return;
    }
    setDone(true);
    setNombre("");
    setTelefono("");
    setCorreo("");
  };

  const inputClass =
    "w-full border border-grey-light bg-transparent px-4 py-3.5 font-serif text-[0.98rem] italic outline-none transition-colors duration-[300ms] focus:border-bronze"; 

  return (
    <section id="contacto" className="border-t border-grey-light py-28 text-center">
      <div className="container px-5">
        <Reveal>
          <span className="eyebrow mb-6 block text-bronze">Newsletter</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            Sé parte de Vibe &amp; Fit
          </h2>
          <p className="mx-auto mt-4 mb-10 max-w-[440px] font-serif italic text-grey">
            Recibe nuevas colecciones, novedades y contenido exclusivo.
            Sin ruido, como a nosotros nos gusta.
          </p>

          {done ? (
            <div className="mx-auto max-w-[520px] border border-bronze py-6 px-6 font-serif italic text-charcoal">
              Registro guardado. Te escribiremos por WhatsApp con novedades.
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="mx-auto grid max-w-[540px] grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div className="text-start sm:col-span-2">
                <label
                  htmlFor="nl-nombre"
                  className="mb-1.5 block text-[0.68rem] uppercase tracking-[0.16em] text-grey"
                >
                  Nombre (opcional)
                </label>
                <input
                  id="nl-nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  autoComplete="name"
                  className={inputClass}
                />
              </div>

              <div className="text-start">
                <label
                  htmlFor="nl-telefono"
                  className="mb-1.5 block text-[0.68rem] uppercase tracking-[0.16em] text-grey"
                >
                  Teléfono
                </label>
                <input
                  id="nl-telefono"
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="099 123 4567"
                  autoComplete="tel"
                  className={inputClass}
                />
                {errors.telefono && (
                  <p role="alert" className="mt-1.5 text-start text-[0.8rem] text-sale">
                    {errors.telefono}
                  </p>
                )}
              </div>

              <div className="text-start">
                <label
                  htmlFor="nl-correo"
                  className="mb-1.5 block text-[0.68rem] uppercase tracking-[0.16em] text-grey"
                >
                  Correo electrónico
                </label>
                <input
                  id="nl-correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="nombre@correo.com"
                  autoComplete="email"
                  className={inputClass}
                />
                {errors.correo && (
                  <p role="alert" className="mt-1.5 text-start text-[0.8rem] text-sale">
                    {errors.correo}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn-sweep sm:col-span-2 bg-charcoal px-8 py-4 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white disabled:cursor-wait disabled:opacity-70"
              >
                {sending ? "Enviando…" : "Guardar"}
              </button>

              {error && (
                <p role="alert" className="sm:col-span-2 text-[0.8rem] text-sale">
                  {error}
                </p>
              )}
            </form>
          )}

          <p className="mt-5 text-[0.72rem] text-grey">
            Tus datos solo se usan para contarte novedades. Tu privacidad es
            importante.
          </p>
        </Reveal>
      </div>
    </section>
  );
}