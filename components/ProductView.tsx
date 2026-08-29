"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import {
  COLOR_NAMES,
  PRODUCT_COMPOSITION,
  PRODUCT_DESCRIPTIONS,
  SIZES,
  type Product,
} from "@/lib/data";

const POSITIONS = ["object-center", "object-top", "object-bottom"];

export default function ProductView({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addItem, openCart } = useCart();
  const { isFavorite, toggle } = useFavorites();
  const [main, setMain] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [size, setSize] = useState("M");

  const isNew = product.badge === "new";
  const isSale = product.badge === "sale";
  const fav = isFavorite(product.id);

  const details = [
    {
      title: "Composición y Cuidados",
      body: `${PRODUCT_COMPOSITION[product.category]}<br />Recomendamos seguir las instrucciones de la etiqueta de la prenda. Guardar en un lugar seco y fresco para conservar el tejido.`,
    },
    {
      title: "Envío y Devoluciones",
      body: "En ISABEL cuidamos cada detalle. Las condiciones de envío y el plazo de devolución se detallan durante el proceso de compra, sin sorpresas.",
    },
    {
      title: "Sostenibilidad",
      body: "Trabajamos con materiales seleccionados y una producción responsable. Cada pieza busca reducir el impacto y durar más tiempo en tu armario.",
    },
  ];

  return (
    <div className="py-24">
      <div className="container">
        <div className="grid grid-cols-2 items-start gap-10 max-[768px]:grid-cols-1">
          <div>
            <div className="relative aspect-[3/4] overflow-hidden bg-sand">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width:768px) 100vw, 50vw"
                className={`object-cover transition-all duration-[500ms] ${POSITIONS[main]}`}
              />
            </div>
            <div className="mt-4 flex gap-3">
              {POSITIONS.map((pos, i) => (
                <button
                  key={pos}
                  onClick={() => setMain(i)}
                  aria-label={`Vista ${i + 1}`}
                  className={`h-[96px] w-[76px] cursor-pointer overflow-hidden border-2 transition-colors ${
                    i === main ? "border-bronze" : "border-transparent hover:border-grey-light"
                  }`}
                >
                  <Image
                    src={product.image}
                    alt=""
                    width={76}
                    height={96}
                    className={`h-full w-full object-cover ${pos}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <div className="mb-4 text-[0.75rem] uppercase tracking-[0.08em] text-grey">
              <Link
                href="/#catalogo"
                className="transition-colors hover:text-bronze"
              >
                Catálogo
              </Link>{" "}
              / <span>{product.name}</span>
            </div>

            <h1 className="mb-1 font-display text-4xl font-semibold">
              {product.name}
              {product.badge && (
                <span
                  className={`ms-3 inline-block px-3 py-1 align-middle text-[0.65rem] uppercase tracking-[0.12em] text-white ${
                    isSale ? "bg-sale" : "bg-charcoal"
                  }`}
                >
                  {isNew ? "Nuevo" : isSale ? "Rebajas" : product.badge}
                </span>
              )}
            </h1>

            <div className="mb-6 font-serif text-[1.3rem] text-bronze">
              {product.oldPrice && (
                <span className="mr-2 text-grey line-through">
                  €{product.oldPrice}
                </span>
              )}
              €{product.price}
            </div>

            <p className="mb-8 text-[0.95rem] leading-[1.8] text-grey">
              {PRODUCT_DESCRIPTIONS[product.category]}
            </p>

            <div className="mb-8">
              <div className="mb-2 text-[0.75rem] uppercase tracking-[0.1em]">
                Color:{" "}
                <strong>
                  {COLOR_NAMES[product.colors[colorIdx]] || "Seleccionar"}
                </strong>
              </div>
              <div className="flex gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c}
                    onClick={() => setColorIdx(i)}
                    aria-label={`Color ${i + 1}`}
                    className={`h-7 w-7 cursor-pointer rounded-full border-2 transition-all ${
                      i === colorIdx
                        ? "border-bronze shadow-[0_0_0_2px_var(--color-bronze)]"
                        : "border-grey-light"
                    }`}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[0.75rem] uppercase tracking-[0.1em]">
                  Talla
                </span>
                <Link
                  href="/guia-de-tallas"
                  className="text-[0.75rem] underline transition-colors hover:text-bronze"
                >
                  Guía de tallas
                </Link>
              </div>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 text-[0.85rem] transition-colors ${
                      size === s
                        ? "border border-bronze bg-bronze text-white"
                        : "border border-grey-light bg-white hover:border-bronze hover:bg-bronze hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                addItem(product.id);
                openCart();
              }}
              className="mb-4 w-full bg-black py-4 text-[0.85rem] uppercase tracking-[0.12em] text-white transition-colors duration-[0.3s] hover:bg-bronze"
            >
              Añadir al Carrito
            </button>
            <button
              onClick={() => toggle(product.id)}
              aria-pressed={fav}
              className={`mb-8 flex w-full items-center justify-center gap-2 border py-3 text-[0.8rem] uppercase tracking-[0.1em] transition-colors ${
                fav
                  ? "border-bronze text-bronze"
                  : "border-grey-light hover:border-bronze hover:text-bronze"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill={fav ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-4 w-4"
              >
                <path d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.6 3.7 4.5 6.8 4.5c1.9 0 3.4 1 4.2 2.5.8-1.5 2.3-2.5 4.2-2.5 3.1 0 5.2 3.1 4 6.6-1.7 4.8-9.2 9.4-9.2 9.4Z" />
              </svg>
              {fav ? "Guardado en Favoritos" : "Añadir a Favoritos"}
            </button>

            <div className="border-t border-grey-light pt-8">
              {details.map((d) => (
                <details
                  key={d.title}
                  className="group border-b border-grey-light"
                  open={d.title === "Composición y Cuidados"}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-serif text-base [&::-webkit-details-marker]:hidden">
                    {d.title}
                    <span className="float-right transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div
                    className="py-6 text-[0.88rem] leading-[1.75] text-grey"
                    dangerouslySetInnerHTML={{ __html: d.body }}
                  />
                </details>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24 border-t border-grey-light pt-14">
            <h3 className="mb-8 text-center font-display text-2xl">
              También Te Puede Gustar
            </h3>
            <div className="grid grid-cols-4 gap-x-5 gap-y-10 max-[768px]:grid-cols-2">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}