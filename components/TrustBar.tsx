const ITEMS = [
  {
    label: "Envío a todo Ecuador",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7.5" cy="18" r="1.6" />
        <circle cx="17.5" cy="18" r="1.6" />
      </svg>
    ),
  },
  {
    label: "Cambios sencillos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
        <path d="M4 12a8 8 0 0 1 13.66-5.66L20 8" />
        <path d="M20 4v4h-4" />
        <path d="M20 12a8 8 0 0 1-13.66 5.66L4 16" />
        <path d="M4 20v-4h4" />
      </svg>
    ),
  },
  {
    label: "Atención personalizada",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
        <path d="M4 18v-1a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v1" />
        <circle cx="12" cy="7" r="3.4" />
      </svg>
    ),
  },
  {
    label: "Compra 100% segura",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
        <path d="M12 3.5 19 6.5v5.2c0 4.4-3 7.2-7 8.8-4-1.6-7-4.4-7-8.8V6.5L12 3.5Z" />
        <path d="m9.3 12 1.9 1.9 3.5-3.8" />
      </svg>
    ),
  },
];

export default function TrustBar() {
  return (
    <section className="border-b border-grey-light bg-white py-8" aria-label="Beneficios de comprar en Vibe & Fit">
      <div className="container">
        <div className="grid grid-cols-2 gap-y-7 gap-x-4 sm:grid-cols-4">
          {ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2.5 text-center sm:flex-row sm:gap-3 sm:text-left"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bronze/40 text-bronze">
                {item.icon}
              </span>
              <span className="text-[0.72rem] font-semibold uppercase leading-tight tracking-[0.08em] text-charcoal">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
