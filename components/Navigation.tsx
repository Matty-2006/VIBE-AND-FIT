"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { NAV_LINKS, PRODUCTS } from "@/lib/data";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[18px] w-[18px]">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className="h-[18px] w-[18px]">
      <path d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.6 3.7 4.5 6.8 4.5c1.9 0 3.4 1 4.2 2.5.8-1.5 2.3-2.5 4.2-2.5 3.1 0 5.2 3.1 4 6.6-1.7 4.8-9.2 9.4-9.2 9.4Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[18px] w-[18px]">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { count, openCart } = useCart();
  const { count: favCount, openFav } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathname = usePathname();
  const solid = scrolled || pathname !== "/" || searchOpen;
  const light = !solid;

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  return (
    <>
      <header
        className={`sticky top-0 z-[1000] transition-all duration-[400ms] ease-out ${
          solid
            ? "border-b border-grey-light/70 bg-cream/90 shadow-sm backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`container relative flex items-center justify-between gap-6 transition-all duration-[400ms] ease-out ${
            solid ? "h-16" : "h-20"
          }`}
        >
          <button
            className={`flex cursor-pointer flex-col gap-[5px] lg:hidden ${
              light ? "text-white" : "text-charcoal"
            }`}
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <span className="h-[1.5px] w-[22px] bg-current" />
            <span className="h-[1.5px] w-[22px] bg-current" />
            <span className="h-[1.5px] w-[22px] bg-current" />
          </button>

          <Link
            href="/"
            aria-label="Inicio Vibe & Fit"
            className="transition-all duration-[400ms]"
          >
            {solid ? (
              <Logo imageClass="h-11 w-auto" />
            ) : (
              <Logo
                className="drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)]"
                imageClass="h-14 w-auto"
              />
            )}
          </Link>

          <nav
            className={`hidden items-center gap-10 lg:flex ${
              light ? "text-white/90" : "text-charcoal"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-[0.76rem] font-medium uppercase tracking-[0.16em] transition-colors duration-[400ms] ${
                  light ? "hover:text-bronze-light" : "hover:text-bronze"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-[-4px] left-0 h-px w-0 transition-all duration-[400ms] group-hover:w-full ${
                    light ? "bg-bronze-light" : "bg-bronze"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div
            className={`flex items-center gap-1 ${
              light ? "text-white" : "text-charcoal"
            }`}
          >
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Buscar"
              className={`flex h-10 w-10 items-center justify-center transition-colors duration-[400ms] ${
                light ? "hover:text-bronze-light" : "hover:text-bronze"
              }`}
            >
              <SearchIcon />
            </button>
            <button
              onClick={openFav}
              aria-label="Favoritos"
              className={`relative flex h-10 w-10 items-center justify-center transition-colors duration-[400ms] ${
                light ? "hover:text-bronze-light" : "hover:text-bronze"
              }`}
            >
              <HeartIcon filled={favCount > 0} />
              {favCount > 0 && (
                <span className="absolute -right-0.5 top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-bronze px-1 text-[0.55rem] font-bold text-white">
                  {favCount}
                </span>
              )}
            </button>
            <button
              onClick={openCart}
              aria-label="Carrito"
              className={`relative flex h-10 w-10 items-center justify-center transition-colors duration-[400ms] ${
                light ? "hover:text-bronze-light" : "hover:text-bronze"
              }`}
            >
              <BagIcon />
              {count > 0 && (
                <span
                  key={count}
                  className="absolute -right-0.5 top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-charcoal px-1 text-[0.55rem] font-bold text-white animate-pulse-badge"
                >
                  {count}
                </span>
              )}
            </button>
          </div>

          <div
            className={`absolute inset-x-0 top-full transition-opacity duration-[300ms] ${
              searchOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="border-b border-grey-light bg-cream/95 backdrop-blur-md">
              <div className="container flex items-center gap-4 py-4">
                <SearchIcon />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar en Vibe & Fit…"
                  aria-label="Buscar productos"
                  className="flex-1 bg-transparent font-serif text-[1.05rem] italic outline-none placeholder:text-grey"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  aria-label="Cerrar búsqueda"
                  className="text-lg text-charcoal"
                >
                  ✕
                </button>
              </div>
              {results.length > 0 && (
                <div className="container pb-4">
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      href={`/producto/${p.id}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery("");
                      }}
                      className="flex items-center justify-between border-t border-grey-light py-3 text-[0.95rem] transition-colors hover:text-bronze"
                    >
                      <span className="font-serif">{p.name}</span>
                      <span className="text-[0.85rem] text-grey">
                        {p.category}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}