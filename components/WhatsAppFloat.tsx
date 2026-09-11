"use client";

import { SITE } from "@/lib/data";
import { whatsappLink } from "@/lib/whatsapp";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hola, estoy escribiendo a Vibe & Fit desde la web.")}
      target="_blank"
      rel="noreferrer"
      aria-label={`Escríbenos por WhatsApp: ${SITE.whatsappDisplay}`}
      data-cursor-text="Escribir"
      className="group fixed bottom-6 right-6 z-[9000] flex items-center max-[600px]:bottom-5 max-[600px]:right-5"
    >
      <span className="pointer-events-none absolute right-full mr-4 hidden whitespace-nowrap rounded-full bg-charcoal px-4 py-2 text-[0.8rem] font-semibold tracking-wide text-white opacity-0 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-opacity duration-[400ms] group-hover:opacity-100 sm:block">
        {SITE.whatsappDisplay}
      </span>

      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#2fd26d] to-[#1fbd5a] text-white shadow-[0_12px_28px_-8px_rgba(37,211,102,0.65)] transition-transform duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-95 max-[600px]:h-[52px] max-[600px]:w-[52px]">
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-wa-ring rounded-full border-2 border-[#25D366]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-wa-ring rounded-full border-2 border-[#25D366]"
          style={{ animationDelay: "1.2s" }}
        />
        <svg viewBox="0 0 32 32" fill="currentColor" className="relative h-7 w-7 max-[600px]:h-6 max-[600px]:w-6">
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 27l6.3-1.6A12 12 0 0 0 16 27c6.6 0 12-5.4 12-12S22.6 3 16 3Zm0 21.9c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 0 1 6.1 15C6.1 9.6 10.6 5.1 16 5.1S25.9 9.6 25.9 15 21.4 24.9 16 24.9Zm5.5-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.2.2-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" />
        </svg>
      </span>
    </a>
  );
}