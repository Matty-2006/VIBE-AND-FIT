"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import type { Product } from "@/lib/data";

function HeartButton({ product }: { product: Product }) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(product.id);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggle(product.id);
      }}
      aria-label={active ? "Quitar de favoritos" : "Añadir a favoritos"}
      aria-pressed={active}
      className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-all duration-[300ms] ${
        active
          ? "bg-bronze text-white"
          : "bg-white/80 text-charcoal hover:bg-white"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-[16px] w-[16px]"
      >
        <path d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.6 3.7 4.5 6.8 4.5c1.9 0 3.4 1 4.2 2.5.8-1.5 2.3-2.5 4.2-2.5 3.1 0 5.2 3.1 4 6.6-1.7 4.8-9.2 9.4-9.2 9.4Z" />
      </svg>
    </button>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent, quick: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id);
    if (quick) {
      openCart();
      return;
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Link
      href={`/producto/${product.id}`}
      data-cursor
      className="group flex h-full flex-col bg-white"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:520px) 50vw, (max-width:1024px) 33vw, 20vw"
          className="object-contain p-2"
        />
        {product.badge && (
          <span
            className={`absolute left-3 top-3 z-[1] px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white ${
              product.badge === "sale" ? "bg-sale" : "bg-charcoal"
            }`}
          >
            {product.badge === "sale" ? "Rebajas" : "Nuevo"}
          </span>
        )}
        <span className="absolute right-3 top-3 z-[2]">
          <HeartButton product={product} />
        </span>
      </div>

      <div className="flex flex-col pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="min-h-[2.7em] font-serif text-[1.02rem] font-semibold leading-snug text-charcoal">
            {product.name}
          </h3>
          <div className="whitespace-nowrap text-[0.95rem] font-semibold text-charcoal">
            €{product.price}
            {product.oldPrice && (
              <span className="ms-2 text-[0.8rem] text-grey line-through">
                €{product.oldPrice}
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto flex gap-2 pt-4">
          <button
            onClick={(e) => handleAdd(e, false)}
            aria-label={`Añadir ${product.name} al carrito`}
            className={`flex-1 border py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-[300ms] ${
              added
                ? "border-bronze bg-bronze text-white"
                : "border-grey-light text-charcoal hover:border-bronze hover:bg-bronze hover:text-white"
            }`}
          >
            {added ? "Añadido ✓" : "Añadir"}
          </button>
          <button
            onClick={(e) => handleAdd(e, true)}
            aria-label={`Comprar ${product.name} ahora`}
            className="flex-1 bg-charcoal py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-[300ms] hover:bg-bronze"
          >
            Comprar
          </button>
        </div>
      </div>
    </Link>
  );
}