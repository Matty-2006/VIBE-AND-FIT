"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import type { Product } from "@/lib/data";
import { flyToCart } from "@/lib/flyToCart";

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
  const tiltRef = useRef<HTMLDivElement>(null);

  const onTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const onTiltLeave = () => {
    const el = tiltRef.current;
    if (el) el.style.transform = "";
  };

  const TINTS = [
    "linear-gradient(180deg, #ffffff 0%, #f7f1e7 100%)",
    "linear-gradient(180deg, #ffffff 0%, #eef2f6 100%)",
    "linear-gradient(180deg, #ffffff 0%, #f4eef0 100%)",
    "linear-gradient(180deg, #ffffff 0%, #eef0ec 100%)",
  ];
  const PADS = ["p-1.5", "p-2", "p-2.5", "p-1"];
  const tint = TINTS[(product.id - 1) % TINTS.length];
  const pad = PADS[(product.id - 1) % PADS.length];

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>, quick: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    const btn = e.currentTarget;
    addItem(product.id);
    if (quick) {
      flyToCart(btn, product.image, openCart);
      return;
    }
    flyToCart(btn, product.image);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Link
      href={`/producto/${product.id}`}
      data-cursor-text="Ver producto"
      className="group flex h-full flex-col bg-white"
    >
      <div
        ref={tiltRef}
        onMouseMove={onTiltMove}
        onMouseLeave={onTiltLeave}
        className="relative aspect-[3/4] overflow-hidden bg-white transition-transform duration-300 ease-out will-change-transform"
        style={{ backgroundImage: tint }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:520px) 50vw, (max-width:1024px) 33vw, 20vw"
          className={`object-contain ${pad}`}
        />
        {product.badge === "new" && (
          <span className="absolute left-3 top-3 z-[1] bg-charcoal px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white">
            Nuevo
          </span>
        )}
        <span className="absolute right-3 top-3 z-[2]">
          <HeartButton product={product} />
        </span>
      </div>

      <div className="flex flex-col items-center pt-4 text-center">
        <div className="text-[0.62rem] uppercase tracking-[0.2em] text-bronze-dark">
          {product.category}
        </div>
        <div className="my-2 h-px w-6 bg-bronze/50" aria-hidden="true" />
        <h3 className="line-clamp-2 min-h-[2.6em] font-serif text-[1.05rem] font-medium leading-[1.3] text-charcoal">
          {product.name}
        </h3>

        <div className="mt-3 flex w-full gap-2">
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
            className="btn-sweep flex-1 bg-charcoal py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white"
          >
            Comprar
          </button>
        </div>
      </div>
    </Link>
  );
}