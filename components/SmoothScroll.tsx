"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const refreshTimer = window.setTimeout(refresh, 800);

    const onClick = (e: MouseEvent) => {
      // Los enlaces del sitio son "/#catalogo", no "#catalogo": filtrar por
      // href^="#" no casaba con ninguno y este manejador nunca se ejecutaba.
      const target = (e.target as HTMLElement).closest(
        'a[href*="#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;

      const href = target.getAttribute("href") ?? "";
      const [path, id] = href.split("#");
      if (!id) return;
      // Solo intercepta si el ancla es de esta misma página.
      if (path && path !== "/" && path !== window.location.pathname) return;
      if (path === "/" && window.location.pathname !== "/") return;

      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -72, duration: 1.2 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      window.clearTimeout(refreshTimer);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Al llegar con ancla desde otra página hay que ir a la sección, no al
    // inicio: subir primero dejaba al visitante arriba de la portada.
    const hash = window.location.hash.slice(1);
    const destino = hash ? document.getElementById(hash) : null;

    if (destino) {
      const ir = () =>
        lenisRef.current
          ? lenisRef.current.scrollTo(destino, { offset: -72, duration: 1 })
          : destino.scrollIntoView();
      // Un frame de margen para que la nueva página haya maquetado.
      requestAnimationFrame(() => requestAnimationFrame(ir));
    } else {
      window.scrollTo(0, 0);
      lenisRef.current?.scrollTo(0, { immediate: true });
    }

    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}