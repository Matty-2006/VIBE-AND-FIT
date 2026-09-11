const SEAL_TEXT =
  "VIBE & FIT • ESTILO QUE SE MUEVE CONTIGO • VIBE & FIT • ESTILO QUE SE MUEVE CONTIGO • ";

export default function BrandSeal({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative hidden h-28 w-28 items-center justify-center lg:flex ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite] motion-reduce:animate-none"
      >
        <defs>
          <path
            id="brand-seal-path"
            d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          />
        </defs>
        <text fill="currentColor" fontSize="7" letterSpacing="1.5">
          <textPath xlinkHref="#brand-seal-path" href="#brand-seal-path" startOffset="0%">
            {SEAL_TEXT}
          </textPath>
        </text>
      </svg>
      <span className="font-serif text-2xl italic">&amp;</span>
    </div>
  );
}
