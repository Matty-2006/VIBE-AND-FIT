"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { SITE } from "@/lib/data";
import { whatsappLink, whatsappOrderMessage } from "@/lib/whatsapp";

export default function CartSidebar() {
  const { lines, isOpen, closeCart, removeItem, setQty, total } = useCart();
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setStep("cart");
    setSent(false);
    closeCart();
  };

  const startCheckout = () => {
    setStep("checkout");
    setSent(false);
  };

  const submitOrder = () => {
    const message = whatsappOrderMessage(
      lines.map((l) => ({
        name: l.name,
        qty: l.qty,
        price: l.price,
        oldPrice: l.oldPrice,
      })),
      total,
      { name, city, notes }
    );
    window.open(whatsappLink(message), "_blank", "noopener");
    setSent(true);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[9999] bg-black/40 transition-opacity duration-[400ms] ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={handleClose}
      />
      <aside
        className={`fixed right-0 top-0 z-[10000] flex h-full w-[440px] max-w-full flex-col bg-white transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Carrito de compras"
      >
        <div className="flex items-center justify-between border-b border-grey-light px-8 py-8">
          <h3 className="font-serif text-xl tracking-[0.06em]">
            {step === "cart" ? "Tu Carrito" : "Finalizar Compra"}
          </h3>
          <button
            onClick={handleClose}
            aria-label="Cerrar carrito"
            className="text-[1.3rem] text-charcoal"
          >
            ✕
          </button>
        </div>

        {step === "cart" && (
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {lines.length === 0 ? (
              <div className="py-16 text-center text-grey">
                <p className="font-serif text-lg italic">Tu carrito está vacío</p>
                <Link
                  href="/#catalogo"
                  onClick={handleClose}
                  className="mt-6 inline-block border-b border-bronze pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-charcoal transition-colors hover:text-bronze"
                >
                  Ver Catálogo
                </Link>
              </div>
            ) : (
              lines.map((item) => {
                const unitPrice = item.oldPrice || item.price;
                return (
                  <div key={item.id} className="flex gap-6 border-b border-grey-light py-6">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={90}
                      height={110}
                      className="h-[110px] w-[90px] shrink-0 border border-grey-light bg-white object-contain p-1"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="font-serif text-[0.95rem] font-semibold">
                          {item.name}
                        </div>
                        <div
                          className={`text-[0.9rem] font-semibold ${
                            item.badge === "sale" ? "text-sale" : ""
                          }`}
                        >
                          €{unitPrice}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQty(item.id, -1)}
                          aria-label="Disminuir cantidad"
                          className="flex h-7 w-7 items-center justify-center border border-grey-light text-[0.85rem] transition-colors hover:border-charcoal"
                        >
                          −
                        </button>
                        <span className="min-w-5 text-center text-[0.85rem] font-semibold">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => setQty(item.id, 1)}
                          aria-label="Aumentar cantidad"
                          className="flex h-7 w-7 items-center justify-center border border-grey-light text-[0.85rem] transition-colors hover:border-charcoal"
                        >
                          +
                        </button>
                        <span
                          onClick={() => removeItem(item.id)}
                          className="ms-1 cursor-pointer text-[0.75rem] text-grey underline transition-colors hover:text-sale"
                        >
                          Eliminar
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {step === "checkout" && (
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {sent ? (
              <div className="py-10 text-center">
                <p className="font-serif text-lg italic">¡Pedido enviado!</p>
                <p className="mt-3 text-[0.85rem] leading-[1.7] text-grey">
                  Abrimos tu WhatsApp para que termines de confirmar los datos
                  con {SITE.name}. ¡Gracias por tu compra!
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6 space-y-3 text-[0.9rem] text-charcoal">
                  {lines.map((item) => (
                    <div key={item.id} className="flex justify-between gap-4">
                      <span>
                        {item.qty} × {item.name}
                      </span>
                      <span className="whitespace-nowrap font-semibold">
                        €{((item.oldPrice || item.price) * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-grey-light pt-3 text-lg font-bold">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="cart-name"
                    className="mb-1 block text-[0.72rem] uppercase tracking-[0.12em] text-grey"
                  >
                    Tu nombre
                  </label>
                  <input
                    id="cart-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre y apellido"
                    className="w-full border border-grey-light bg-white p-3 text-[0.9rem] outline-none focus:border-bronze"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="cart-city"
                    className="mb-1 block text-[0.72rem] uppercase tracking-[0.12em] text-grey"
                  >
                    Ciudad / zona de entrega
                  </label>
                  <input
                    id="cart-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ciudad"
                    className="w-full border border-grey-light bg-white p-3 text-[0.9rem] outline-none focus:border-bronze"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="cart-notes"
                    className="mb-1 block text-[0.72rem] uppercase tracking-[0.12em] text-grey"
                  >
                    Notas
                  </label>
                  <textarea
                    id="cart-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Detalles de envío, preferencias…"
                    className="w-full resize-none border border-grey-light bg-white p-3 text-[0.9rem] outline-none focus:border-bronze"
                  />
                </div>

                <p className="mb-6 text-[0.78rem] leading-[1.6] text-grey">
                  Al confirmar, el pedido se enviará a nuestro WhatsApp
                  ({SITE.whatsappDisplay}) para acordar el envío y el pago.
                </p>
              </>
            )}
          </div>
        )}

        <div className="border-t border-grey-light px-8 py-7">
          {step === "cart" ? (
            <>
              {lines.length > 0 && (
                <>
                  <div className="mb-6 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={startCheckout}
                    className="w-full bg-charcoal py-4 text-[0.82rem] uppercase tracking-[0.18em] text-white transition-colors duration-[400ms] hover:bg-bronze"
                  >
                    Finalizar Compra
                  </button>
                  <span
                    onClick={handleClose}
                    className="mt-4 block cursor-pointer text-center text-[0.78rem] text-grey underline"
                  >
                    Seguir Comprando
                  </span>
                </>
              )}
            </>
          ) : (
            <>
              {!sent ? (
                <button
                  onClick={submitOrder}
                  disabled={lines.length === 0}
                  className="flex w-full items-center justify-center gap-3 bg-[#25D366] py-4 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-[400ms] hover:bg-[#1fb857] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <svg viewBox="0 0 32 32" fill="currentColor" className="h-5 w-5">
                    <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 27l6.3-1.6A12 12 0 0 0 16 27c6.6 0 12-5.4 12-12S22.6 3 16 3Zm0 21.9c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 0 1 6.1 15C6.1 9.6 10.6 5.1 16 5.1S25.9 9.6 25.9 15 21.4 24.9 16 24.9Zm5.5-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.2.2-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" />
                  </svg>
                  Confirmar por WhatsApp
                </button>
              ) : (
                <button
                  onClick={handleClose}
                  className="w-full border border-charcoal py-4 text-[0.82rem] uppercase tracking-[0.18em] text-charcoal transition-colors duration-[400ms] hover:bg-charcoal hover:text-white"
                >
                  Seguir comprando
                </button>
              )}
              <span
                onClick={() => setStep("cart")}
                className="mt-4 block cursor-pointer text-center text-[0.78rem] text-grey underline"
              >
                Volver al carrito
              </span>
            </>
          )}
        </div>
      </aside>
    </>
  );
}