"use client";

import { useSyncExternalStore } from "react";

const THEME_EVENT = "vibefit-theme";

function subscribe(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(THEME_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

const getSnapshot = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

const getServerSnapshot = () => false;

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !getSnapshot();
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("vibefit-theme", next ? "dark" : "light");
    } catch {
      /* almacenamiento no disponible */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}
      aria-pressed={dark}
      className={`flex h-10 w-10 items-center justify-center transition-transform duration-[400ms] hover:rotate-12 ${className}`}
    >
      {dark ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-[18px] w-[18px]"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-[18px] w-[18px]"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  );
}