"use client";

import { useEffect } from "react";

// Reemplaza al layout raíz, así que debe traer sus propios <html> y <body> y no
// puede apoyarse en los estilos ni las fuentes de la aplicación.
export default function GlobalError({
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
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4efe9",
          color: "#2b2724",
          fontFamily: "Georgia, 'Times New Roman', serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "32rem" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#8a817a",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Vibe &amp; Fit
          </p>
          <h1 style={{ margin: "1.25rem 0 0", fontSize: "2rem", fontWeight: 500 }}>
            La tienda no ha podido cargarse
          </h1>
          <p style={{ margin: "1.25rem 0 0", lineHeight: 1.6, color: "#6f6862" }}>
            Ha ocurrido un error inesperado. Vuelve a intentarlo en unos
            segundos.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "2.25rem",
              padding: "1rem 2rem",
              border: "none",
              background: "#2b2724",
              color: "#fff",
              fontSize: "0.78rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
