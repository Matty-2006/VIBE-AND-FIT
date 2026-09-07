"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesSidebar() {
  const { lines, isOpen, closeFav, toggle } = useFavorites();
  const { addItem, openCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[9999] bg-black/40 transition-opacity duration-[400ms] ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeFav}
      />
      <aside
        className={`fixed right-0 top-0 z-[10000] flex h-full w-[420px] max-w-full flex-col bg-white transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] max-[600px]:w-screen ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Tus favoritos"
      >
        <div className="flex items-center justify-between border-b border-grey-light px-8 py-8">
          <h3 className="font-serif text-xl tracking-[0.06em]">
            Tus Favoritos{" "}
            <span className="text-[0.85rem] text-grey">
              ({lines.length})
            </span>
          </h3>
          <button
            onClick={closeFav}
            aria-label="Cerrar favoritos"
            className="text-[1.3rem] text-charcoal"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {lines.length === 0 ? (
            <div className="py-16 text-center text-grey">
              <p className="font-serif text-lg italic">
                Aún no tienes favoritos
              </p>
              <Link
                href="/categoria/ropa-de-mujer"
                onClick={closeFav}
                className="mt-6 inline-block border-b border-bronze pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-charcoal transition-colors hover:text-bronze"
              >
                Ver Ropa de Mujer
              </Link>
            </div>
          ) : (
            lines.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 border-b border-grey-light py-6"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={90}
                  height={110}
                  className="h-[110px] w-[90px] shrink-0 object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="font-serif text-[0.95rem] font-semibold">
                      {item.name}
                    </div>
                    <div className="text-[0.7rem] uppercase tracking-[0.1em] text-grey">
                      {item.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        addItem(item.id);
                        closeFav();
                        openCart();
                      }}
                      className="bg-charcoal px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-[400ms] hover:bg-bronze"
                    >
                      Añadir al carrito
                    </button>
                    <button
                      onClick={() => toggle(item.id)}
                      aria-label="Quitar de favoritos"
                      className="text-[0.75rem] text-grey underline transition-colors hover:text-sale"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-grey-light px-8 py-8">
            <Link
              href="/categoria/ropa-de-mujer"
              onClick={closeFav}
              className="block w-full border border-charcoal py-4 text-center text-[0.82rem] uppercase tracking-[0.18em] text-charcoal transition-colors duration-[400ms] hover:bg-charcoal hover:text-white"
            >
              Ver Ropa de Mujer
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}