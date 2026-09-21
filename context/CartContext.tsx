"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "@/lib/data";

export type CartItem = {
  id: number;
  qty: number;
  size?: string;
  color?: string;
};
export type CartLine = Product & {
  qty: number;
  size?: string;
  color?: string;
  /** Identifica la línea: el mismo producto en dos tallas son dos líneas. */
  key: string;
};

export type CartOptions = { size?: string; color?: string };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  isOpen: boolean;
  addItem: (id: number, options?: CartOptions) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, delta: number) => void;
  openCart: () => void;
  closeCart: () => void;
};

const lineKey = (item: Pick<CartItem, "id" | "size" | "color">) =>
  `${item.id}__${item.size ?? ""}__${item.color ?? ""}`;

const STORAGE_KEY = "vibefit_cart";

const CartContext = createContext<CartContextValue | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const timer = window.setTimeout(() => {
      try {
        // localStorage lo puede editar cualquiera: un JSON válido pero con otra
        // forma rompería el render entero, así que se filtra entrada por entrada.
        const parsed: unknown = JSON.parse(raw);
        if (!Array.isArray(parsed)) return;
        setCart(
          parsed.filter(
            (i): i is CartItem =>
              !!i &&
              typeof i === "object" &&
              typeof (i as CartItem).id === "number" &&
              typeof (i as CartItem).qty === "number" &&
              (i as CartItem).qty > 0
          )
        );
      } catch {
        /* almacenamiento no disponible o JSON inválido */
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* noop */
    }
  }, [cart]);

  const addItem = (id: number, options?: CartOptions) =>
    setCart((prev) => {
      const next: CartItem = {
        id,
        qty: 1,
        size: options?.size,
        color: options?.color,
      };
      const key = lineKey(next);
      const found = prev.find((i) => lineKey(i) === key);
      if (found) {
        return prev.map((i) =>
          lineKey(i) === key ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, next];
    });

  const removeItem = (key: string) =>
    setCart((prev) => prev.filter((i) => lineKey(i) !== key));

  const setQty = (key: string, delta: number) =>
    setCart((prev) =>
      prev.flatMap((i) => {
        if (lineKey(i) !== key) return [i];
        const next = i.qty + delta;
        return next < 1 ? [] : [{ ...i, qty: next }];
      })
    );

  const lines = useMemo<CartLine[]>(
    () =>
      cart
        .map((i): CartLine | null => {
          const product = PRODUCTS.find((p) => p.id === i.id);
          if (!product) return null;
          return {
            ...product,
            qty: i.qty,
            ...(i.size ? { size: i.size } : {}),
            ...(i.color ? { color: i.color } : {}),
            key: lineKey(i),
          };
        })
        .filter((x): x is CartLine => x !== null),
    [cart]
  );

  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count,
      isOpen,
      addItem,
      removeItem,
      setQty,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [lines, count, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}