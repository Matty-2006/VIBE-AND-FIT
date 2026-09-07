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
      data-cursor
      className="group fixed bottom-6 right-6 z-[9000] flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-3 pr-3 text-white shadow-lg transition-all duration-[400ms] hover:pr-5 max-[600px]:bottom-5 max-[600px]:right-5"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-6 w-6 shrink-0">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 27l6.3-1.6A12 12 0 0 0 16 27c6.6 0 12-5.4 12-12S22.6 3 16 3Zm0 21.9c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 0 1 6.1 15C6.1 9.6 10.6 5.1 16 5.1S25.9 9.6 25.9 15 21.4 24.9 16 24.9Zm5.5-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.2.2-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.82rem] font-semibold opacity-0 transition-all duration-[400ms] group-hover:max-w-[180px] group-hover:opacity-100">
        {SITE.whatsappDisplay}
      </span>
    </a>
  );
}