"use client";

import { useState } from "react";
import { ANNOUNCEMENTS } from "@/lib/data";

export default function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <div className="relative flex h-9 items-center justify-center overflow-hidden bg-black text-[0.72rem] uppercase tracking-[0.24em] text-bronze-light">
      <div className="flex w-max animate-marquee gap-20 whitespace-nowrap will-change-transform">
        {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map(
          (message, i) => (
            <span
              key={i}
              aria-hidden={i >= ANNOUNCEMENTS.length}
              className="inline-flex items-center gap-4 whitespace-nowrap"
            >
              <span className="h-1 w-1 rounded-full bg-bronze" aria-hidden="true" />
              {message}
            </span>
          )
        )}
      </div>
      <button
        onClick={() => setHidden(true)}
        aria-label="Cerrar aviso"
        className="absolute right-4 z-[2] text-sm text-white/50 transition-colors hover:text-bronze-light"
      >
        ✕
      </button>
    </div>
  );
}