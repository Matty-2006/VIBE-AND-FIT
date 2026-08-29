"use client";

import Image from "next/image";
import { useState } from "react";

export default function Logo({
  className = "",
  imageClass = "h-8 w-auto",
}: {
  className?: string;
  imageClass?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`font-display text-[1.4rem] font-semibold tracking-[0.35em] ${className}`}
      >
        ISABEL
      </span>
    );
  }

  return (
    <Image
      src="/images/logo.png"
      alt="ISABEL"
      width={220}
      height={44}
      onError={() => setFailed(true)}
      className={`${imageClass} object-contain`}
      priority
    />
  );
}