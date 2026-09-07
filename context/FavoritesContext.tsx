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

type FavoritesContextValue = {
  ids: number[];
  lines: Product[];
  count: number;
  isOpen: boolean;
  isFavorite: (id: number) => boolean;
  toggle: (id: number) => void;
  openFav: () => void;
  closeFav: () => void;
};

const STORAGE_KEY = "vibefit_favorites";

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const timer = window.setTimeout(() => {
      try {
        const parsed = JSON.parse(raw) as number[];
        if (Array.isArray(parsed)) setIds(parsed);
      } catch {
        /* noop */
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* noop */
    }
  }, [ids]);

  const value = useMemo<FavoritesContextValue>(() => {
    const isFavorite = (id: number) => ids.includes(id);
    const toggle = (id: number) =>
      setIds((prev) =>
        isFavorite(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );

    const lines = ids
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));

    return {
      ids,
      lines,
      count: ids.length,
      isOpen,
      isFavorite,
      toggle,
      openFav: () => setIsOpen(true),
      closeFav: () => setIsOpen(false),
    };
  }, [ids, isOpen]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return ctx;
}