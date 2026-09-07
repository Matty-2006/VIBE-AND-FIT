"use client";

import Image from "next/image";
import { useState } from "react";

export default function Logo({
  className = "",
  imageClass = "h-10 w-auto",
}: {
  className?: string;
  imageClass?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`font-display text-[1.35rem] font-semibold leading-none tracking-[0.18em] ${className}`}
      >
        Vibe{" "}
        <span className="font-serif text-[1.15rem] italic">&#38;</span> Fit
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