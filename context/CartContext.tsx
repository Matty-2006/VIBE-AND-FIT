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

export type CartItem = { id: number; qty: number };
export type CartLine = Product & { qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  setQty: (id: number, delta: number) => void;
  openCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = "isabel_cart";

const CartContext = createContext<CartContextValue | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const timer = window.setTimeout(() => {
      try {
        setCart(JSON.parse(raw) as CartItem[]);
      } catch {
        /* noop */
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

  const addItem = (id: number) =>
    setCart((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id, qty: 1 }];
    });

  const removeItem = (id: number) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const setQty = (id: number, delta: number) =>
    setCart((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return [i];
        const next = i.qty + delta;
        return next < 1 ? [] : [{ ...i, qty: next }];
      })
    );

  const lines = useMemo<CartLine[]>(
    () =>
      cart
        .map((i) => {
          const product = PRODUCTS.find((p) => p.id === i.id);
          return product ? { ...product, qty: i.qty } : null;
        })
        .filter((x): x is CartLine => x !== null),
    [cart]
  );

  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const total = useMemo(
    () => lines.reduce((s, i) => s + (i.oldPrice || i.price) * i.qty, 0),
    [lines]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count,
      total,
      isOpen,
      addItem,
      removeItem,
      setQty,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [lines, count, total, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}