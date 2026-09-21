"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import { SITE } from "@/lib/data";

type FieldErrors = { telefono?: string; correo?: string; mensaje?: string };

export default function Newsletter() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: FieldErrors = {};
    if (!/^[+\d][\d\s\-()]{6,}$/.test(telefono.trim())) {
      errs.telefono = "Introduce un teléfono válido.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.trim())) {
      errs.correo = "Introduce un correo válido.";
    }
    if (mensaje.trim().length > 500) {
      errs.mensaje = "El mensaje no puede superar los 500 caracteres.";
    }
    setErrors(errs);
    if (errs.telefono || errs.correo || errs.mensaje) return;

    const lines = [
      "Hola Vibe & Fit, quiero más información:",
      "",
      ...(nombre.trim() ? [`Nombre: ${nombre.trim()}`] : []),
      `Teléfono: ${telefono.trim()}`,
      `Correo: ${correo.trim()}`,
      ...(mensaje.trim() ? [`Mensaje: ${mensaje.trim()}`] : []),
    ];
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setDone(true);
    setNombre("");
    setTelefono("");
    setCorreo("");
    setMensaje("");
  };

  const inputClass =
    "w-full border border-grey-light bg-transparent px-4 py-3.5 text-[0.98rem] outline-none transition-colors duration-[300ms] focus:border-bronze"; 

  return (
    <section id="contacto" className="border-t border-grey-light py-20 text-center">
      <div className="container px-5">
        <Reveal>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.05] tracking-tight">
            <SplitText
              words={[
                { text: "Hablemos," },
                { text: "o" },
                { text: "sé" },
                { text: "parte" },
                { text: "de" },
                { text: "Vibe" },
                { text: "&" },
                { text: "Fit" },
              ]}
            />
          </h2>
          <p className="mx-auto mt-5 mb-10 max-w-[440px] leading-relaxed text-grey">
            Escríbenos tus dudas o déjanos tus datos para recibir nuevas
            colecciones y contenido exclusivo. Sin ruido, como a nosotros nos
            gusta.
          </p>

          {done ? (
            <div className="mx-auto max-w-[520px] border border-bronze bg-bronze/[0.04] py-6 px-6 text-charcoal">
              ¡Listo! Tu mensaje se abrió en WhatsApp. Solo queda enviarlo
              desde allí y te responderemos en breve.
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

              <div className="text-start sm:col-span-2">
                <label
                  htmlFor="nl-mensaje"
                  className="mb-1.5 block text-[0.68rem] uppercase tracking-[0.16em] text-grey"
                >
                  Mensaje (opcional)
                </label>
                <textarea
                  id="nl-mensaje"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Cuéntanos en qué podemos ayudarte…"
                  rows={3}
                  maxLength={500}
                  className={`${inputClass} resize-none`}
                />
                {errors.mensaje && (
                  <p role="alert" className="mt-1.5 text-start text-[0.8rem] text-sale">
                    {errors.mensaje}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn-sweep sm:col-span-2 bg-charcoal px-8 py-4 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white"
              >
                Enviar por WhatsApp
              </button>
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