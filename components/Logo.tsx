"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Logo({
  className = "",
  imageClass = "h-10 w-auto",
}: {
  className?: string;
  imageClass?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const upd = () => setDark(el.classList.contains("dark"));
    upd();
    const mo = new MutationObserver(upd);
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  if (failed || dark) {
    return (
      <span
        className={`font-display text-[1.35rem] font-semibold leading-none tracking-[0.18em] ${className}`}
      >
        <span className="text-white">
          Vibe{" "}
          <span className="font-serif text-[1.15rem] italic">&#38;</span> Fit
        </span>
      </span>
    );
  }

  return (
    <Image
      src="/images/logo.png"
      alt="Vibe & Fit"
      width={220}
      height={48}
      onError={() => setFailed(true)}
      className={`${imageClass} object-contain`}
      priority
    />
  );
}