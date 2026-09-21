"use client";

import { useEffect } from "react";

// El carrito, los favoritos, el buscador y el menú móvil pueden solaparse.
// Si cada uno escribe body.style.overflow por su cuenta, cerrar el de arriba
// desbloquea el scroll aunque siga habiendo otro panel abierto. Un contador
// compartido garantiza que solo se libere cuando no queda ninguno.
let abiertos = 0;
let overflowPrevio = "";
let paddingPrevio = "";

function bloquear() {
  if (abiertos === 0) {
    overflowPrevio = document.body.style.overflow;
    paddingPrevio = document.body.style.paddingRight;
    const barra = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    // Compensa el ancho de la barra de scroll para que el contenido no salte.
    if (barra > 0) document.body.style.paddingRight = `${barra}px`;
  }
  abiertos += 1;
}

function liberar() {
  abiertos = Math.max(0, abiertos - 1);
  if (abiertos === 0) {
    document.body.style.overflow = overflowPrevio;
    document.body.style.paddingRight = paddingPrevio;
  }
}

export function useScrollLock(activo: boolean) {
  useEffect(() => {
    if (!activo) return;
    bloquear();
    return liberar;
  }, [activo]);
}
