"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [verClave, setVerClave] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!usuario.trim() || !contraseña) {
      setError("Escribe tu usuario y tu contraseña.");
      return;
    }
    setEnviando(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: usuario.trim(), contraseña }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "No se pudo entrar. Revisa tus datos.");
        setEnviando(false);
        return;
      }
      router.push("/admin/panel");
      router.refresh();
    } catch {
      setError("No se pudo conectar. Inténtalo de nuevo.");
      setEnviando(false);
    }
  }

  const CLS =
    "w-full border border-grey-light bg-white px-5 py-4 text-lg text-charcoal outline-none transition-colors focus:border-bronze focus:ring-2 focus:ring-bronze/20";

  return (
    <form onSubmit={entrar} noValidate className="bg-white p-8 shadow-[0_20px_60px_rgb(0_0_0/0.06)]">
      <div className="mb-6">
        <label htmlFor="usr" className="mb-2 block text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-charcoal">
          Usuario
        </label>
        <input
          id="usr"
          type="text"
          autoComplete="username"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Tu usuario"
          className={CLS}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="pwd" className="mb-2 block text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-charcoal">
          Contraseña
        </label>
        <div className="relative">
          <input
            id="pwd"
            type={verClave ? "text" : "password"}
            autoComplete="current-password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder="Tu contraseña"
            className={CLS}
          />
          <button
            type="button"
            onClick={() => setVerClave((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-2 text-[0.72rem] font-semibold uppercase tracking-wider text-bronze transition-colors hover:text-bronze-dark"
          >
            {verClave ? "Ocultar" : "Ver"}
          </button>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mb-6 border border-[#bd3b2f]/30 bg-[#bd3b2f]/5 px-4 py-3 text-[0.85rem] font-medium text-[#a52d22]"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-charcoal py-4 text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-bronze disabled:cursor-wait disabled:opacity-60"
      >
        {enviando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}