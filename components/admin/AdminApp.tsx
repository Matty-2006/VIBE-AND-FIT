"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CatalogData, Collection, Product, ProductCategory } from "@/lib/types";
import { COLLECTION_NAMES, PRODUCT_CATEGORIES } from "@/lib/types";
import { processPhoto } from "@/lib/photo";
import { DEFAULT_COLOR_SWATCHES, detectColor, colorLabel } from "@/lib/colorNames";

const DEFAULT_COLORS = ["#8fb2c9", "#24405c", "#111111", "#f4efe9"];
const SIZE_SUGGESTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

const IS_COLLECTION: Record<Collection, string> = COLLECTION_NAMES;

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  Jeans: "Jeans",
  Pantalones: "Pantalones",
  Faldas: "Faldas",
  Shorts: "Shorts",
  Deportiva: "Deportiva",
};

const BADGE_LABELS: Record<string, string> = {
  new: "Nuevo",
  sale: "Oferta",
  null: "Sin etiqueta",
};

type Notice = { kind: "ok" | "err"; text: string } | null;

type PendingUpload = { productId: number; name: string; base64: string };

function emptyProduct(id: number, collection: Collection): Product {
  return {
    id,
    name: "",
    category: collection === "deportiva" ? "Deportiva" : "Jeans",
    collection,
    alt: "",
    image: "",
    badge: null,
    colors: DEFAULT_COLORS,
    tags: ["all"],
    sizes: [],
    description: "",
  };
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-charcoal">
      {children}
    </label>
  );
}

export default function AdminApp() {
  const router = useRouter();
  const [catalog, setCatalog] = useState<CatalogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [initError, setInitError] = useState("");
  const [filter, setFilter] = useState<"todas" | Collection>("todas");
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [customSize, setCustomSize] = useState("");
  const [customColor, setCustomColor] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/data");
        if (res.status === 401) {
          router.push("/admin");
          router.refresh();
          return;
        }
        const data = await res.json();
        if (!res.ok || !data.ok) throw new Error(data.error || "Error al leer el catálogo");
        setCatalog(data.catalog);
      } catch (err) {
        setInitError(err instanceof Error ? err.message : "Error al leer el catálogo");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const products = useMemo(() => catalog?.products ?? [], [catalog]);

  const shown = useMemo(() => {
    if (filter === "todas") return products;
    return products.filter((p) => p.collection === filter);
  }, [products, filter]);

  const counts = useMemo(() => {
    const mujer = products.filter((p) => p.collection === "mujer").length;
    const deportiva = products.filter((p) => p.collection === "deportiva").length;
    return { todas: products.length, mujer, deportiva };
  }, [products]);

  async function persist(nextProducts: Product[]) {
    if (!catalog) return;
    setSaving(true);
    setNotice(null);
    try {
      const payload = {
        catalog: { sizes: catalog.sizes, products: nextProducts },
        images: pendingUploads.map((u) => ({ name: u.name, data: u.base64 })),
      };
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setNotice({ kind: "err", text: data.error || "No se pudo guardar. Inténtalo de nuevo." });
        return;
      }
      setCatalog({ sizes: data.catalog.sizes, products: data.catalog.products });
      setPendingUploads([]);
      setNotice({ kind: "ok", text: data.message });
    } catch {
      setNotice({ kind: "err", text: "No se pudo conectar para guardar." });
    } finally {
      setSaving(false);
    }
  }

  function startAdd() {
    if (!catalog) return;
    const id = products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    setOriginalImage("");
    setEditing(emptyProduct(id, filter === "deportiva" ? "deportiva" : "mujer"));
    setIsNew(true);
    setPreviewDataUrl(null);
    setCustomSize("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startEdit(p: Product) {
    setOriginalImage(p.image);
    setEditing({ ...p, colors: p.colors.length ? p.colors : DEFAULT_COLORS });
    setIsNew(false);
    setPreviewDataUrl(null);
    setCustomSize("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    // Se descartan las fotos subidas en este formulario sin llegar a guardar.
    if (editing) setPendingUploads((prev) => prev.filter((u) => u.productId !== editing.id));
    setEditing(null);
    setPreviewDataUrl(null);
  }

  function removeNewPhoto() {
    if (!editing) return;
    setPendingUploads((prev) => prev.filter((u) => u.productId !== editing.id));
    setEditing((d) => (d ? { ...d, image: originalImage || "" } : d));
    setPreviewDataUrl(null);
  }

  async function pickPhoto(file: File | null) {
    if (!file || !editing) return;
    const ALLOWED_TYPES = ["image/webp", "image/jpeg", "image/png", "image/gif", "image/avif", "image/bmp"];
    if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      setNotice({ kind: "err", text: "Formato no compatible. Usa WebP, JPG, PNG, GIF, AVIF o BMP (los más usados)." });
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setNotice({ kind: "err", text: "La foto pesa más de 8 MB y haría la página lenta. Elige una foto más ligera." });
      return;
    }
    setSaving(true);
    try {
      const { base64, dataUrl } = await processPhoto(file);
      const name = `upload-${Date.now()}.webp`;
      setPendingUploads((prev) =>
        prev.filter((u) => u.productId !== editing.id).concat([{ productId: editing.id, name, base64 }])
      );
      setEditing((d) => (d ? { ...d, image: `/images/${name}` } : d));
      setPreviewDataUrl(dataUrl);
      setNotice(null);
    } catch (err) {
      setNotice({ kind: "err", text: err instanceof Error ? err.message : "No se pudo leer la foto." });
    } finally {
      setSaving(false);
    }
  }

  function addCustomSize() {
    const s = customSize.trim().toUpperCase().slice(0, 8);
    if (!s) return;
    setEditing((d) => (d ? { ...d, sizes: d.sizes.includes(s) ? d.sizes : [...d.sizes, s] } : d));
    setCustomSize("");
  }

  function addCustomColor() {
    const raw = customColor.trim();
    if (!raw) return;
    const detected = detectColor(raw);
    if (!detected) {
      setNotice({ kind: "err", text: `No reconozco «${raw}». Prueba con un nombre (azul marino, camel…) o un código como #a52d22.` });
      return;
    }
    setEditing((d) => (d ? { ...d, colors: d.colors.includes(detected.hex) ? d.colors : [...d.colors, detected.hex] } : d));
    setCustomColor("");
  }

  function confirmDelete(p: Product) {
    const ok = window.confirm(
      `¿Eliminar «${p.name}»?\n\nEsta acción no se puede deshacer. La foto y el producto desaparecerán de la tienda.`
    );
    if (!ok) return;
    persist(products.filter((x) => x.id !== p.id));
  }

  async function saveEditor() {
    if (!editing) return;
    if (!editing.name.trim()) {
      setNotice({ kind: "err", text: "Escribe el nombre del producto." });
      return;
    }
    if (!editing.image) {
      setNotice({ kind: "err", text: "Sube la foto del producto." });
      return;
    }
    if (editing.sizes.length === 0 && !window.confirm("Sin tallas marcadas se mostrarán todas las tallas del catálogo. ¿Continuar?")) {
      return;
    }
    const next = products.map((p) => (p.id === editing.id ? { ...editing, name: editing.name.trim() } : p));
    if (!next.some((p) => p.id === editing.id)) next.push(editing);
    setEditing(null);
    setPreviewDataUrl(null);
    await persist(next);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  async function refresh() {
    setLoading(true);
    setInitError("");
    try {
      const res = await fetch("/api/admin/data", { cache: "no-store" });
      if (res.status === 401) {
        router.push("/admin");
        router.refresh();
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Error");
      setCatalog(data.catalog);
      setNotice({ kind: "ok", text: "Datos recargados desde la web." });
    } catch (err) {
      setInitError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  if (loading && !catalog) {
    return (
      <div className="bg-cream px-6 py-32 text-center">
        <p className="font-serif text-xl text-charcoal">Cargando el catálogo…</p>
      </div>
    );
  }

  if (!catalog) {
    return (
      <div className="bg-cream px-6 py-32 text-center">
        <p className="font-serif text-xl text-charcoal">{initError || "No se pudo leer el catálogo."}</p>
        <button
          onClick={refresh}
          className="mt-8 border border-charcoal px-8 py-3 text-[0.8rem] uppercase tracking-[0.14em] text-charcoal transition-colors hover:bg-charcoal hover:text-white"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-cream px-6 py-16 max-[640px]:px-4">
      <div className="mx-auto max-w-5xl">
        {/* Barra superior */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-bronze">
              Vibe & Fit
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-charcoal">
              Catálogo de la tienda
            </h1>
            <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-grey">
              Añade, edita o quita productos. Todo lo que guardes se publica
              solo: la página se actualizará en 1–2 minutos.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-grey-light bg-white px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-charcoal transition-colors hover:border-bronze hover:text-bronze"
            >
              Ver la tienda ↗
            </a>
            <button
              onClick={refresh}
              className="border border-grey-light bg-white px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-charcoal transition-colors hover:border-bronze hover:text-bronze"
            >
              Refrescar datos
            </button>
            <button
              onClick={logout}
              className="border border-transparent bg-charcoal px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-bronze"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {notice && (
          <div
            role="status"
            className={`mb-8 border px-5 py-4 text-[0.92rem] leading-relaxed ${
              notice.kind === "ok"
                ? "border-[#1f8f4d]/40 bg-[#25D366]/10 text-[#166b3a]"
                : "border-[#bd3b2f]/40 bg-[#bd3b2f]/10 text-[#a52d22]"
            }`}
          >
            {notice.text}
          </div>
        )}

        {editing ? (
          <Editor
            key={editing.id}
            draft={editing}
            isNew={isNew}
            catalogSizes={catalog.sizes}
            catalogColors={DEFAULT_COLOR_SWATCHES}
            previewDataUrl={previewDataUrl}
            saving={saving}
            customSize={customSize}
            setCustomSize={setCustomSize}
            customColor={customColor}
            setCustomColor={setCustomColor}
            setDraft={(updater) => setEditing((d) => (d ? updater(d) : d))}
            onAddCustomSize={addCustomSize}
            onAddCustomColor={addCustomColor}
            onPickPhoto={pickPhoto}
            onRemoveNewPhoto={removeNewPhoto}
            onCancel={cancelEdit}
            onSave={saveEditor}
          />
        ) : (
          <>
            {/* Filtros + añadir */}
            <div className="mb-8 flex flex-wrap items-center gap-3">
              {(["todas", "mujer", "deportiva"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`border px-5 py-2.5 text-[0.82rem] font-semibold transition-colors ${
                    filter === f
                      ? "border-bronze bg-bronze text-white"
                      : "border-grey-light bg-white text-charcoal hover:border-bronze hover:text-bronze"
                  }`}
                >
                  {f === "todas" ? "Todas" : IS_COLLECTION[f]}{" "}
                  <span className={filter === f ? "text-bronze-light" : "text-grey"}>
                    ({f === "todas" ? counts.todas : f === "mujer" ? counts.mujer : counts.deportiva})
                  </span>
                </button>
              ))}
              <button
                onClick={startAdd}
                className="ml-auto bg-charcoal px-6 py-3 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-bronze"
              >
                ＋ Añadir producto
              </button>
            </div>

            {shown.length === 0 ? (
              <div className="border border-dashed border-grey-light bg-white px-6 py-20 text-center">
                <p className="font-serif text-[1.3rem] text-charcoal">
                  Todavía no hay productos aquí.
                </p>
                <p className="mx-auto mt-2 max-w-md text-[0.9rem] text-grey">
                  Pulsa «＋ Añadir producto» para crear el primero de esta colección.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-grey-light border border-grey-light bg-white">
                {shown.map((p) => (
                  <li key={p.id} className="flex flex-wrap items-center gap-4 px-5 py-4 max-[640px]:px-4">
                    <span className="block h-20 w-16 shrink-0 overflow-hidden border border-grey-light bg-white">
                      <img src={p.image} alt={p.alt || p.name} className="h-full w-full object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block break-words font-serif text-[1.05rem] leading-snug text-charcoal">
                        {p.name}
                      </span>
                      <span className="mt-1 block text-[0.74rem] uppercase tracking-[0.1em] text-grey">
                        {CATEGORY_LABELS[p.category]} · {IS_COLLECTION[p.collection]} ·{" "}
                        {p.sizes.length ? p.sizes.join(", ") : catalog.sizes.join(", ")} ·{" "}
                        {BADGE_LABELS[String(p.badge)]}
                      </span>
                    </span>
                    <span className="flex shrink-0 flex-col gap-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="border border-bronze bg-bronze px-5 py-2.5 text-[0.76rem] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-bronze-dark"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => confirmDelete(p)}
                        className="border border-grey-light px-5 py-2.5 text-[0.76rem] font-semibold uppercase tracking-[0.1em] text-charcoal transition-colors hover:border-[#bd3b2f] hover:bg-[#bd3b2f]/5 hover:text-[#a52d22]"
                      >
                        Eliminar
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Editor({
  draft,
  isNew,
  catalogSizes,
  previewDataUrl,
  saving,
  customSize,
  setCustomSize,
  setDraft,
  customColor,
  setCustomColor,
  catalogColors,
  onAddCustomSize,
  onAddCustomColor,
  onPickPhoto,
  onRemoveNewPhoto,
  onCancel,
  onSave,
}: {
  draft: Product;
  isNew: boolean;
  catalogSizes: string[];
  previewDataUrl: string | null;
  saving: boolean;
  customSize: string;
  setCustomSize: (v: string) => void;
  setDraft: (updater: (d: Product) => Product) => void;
  customColor: string;
  setCustomColor: (v: string) => void;
  catalogColors: string[];
  onAddCustomSize: () => void;
  onAddCustomColor: () => void;
  onPickPhoto: (file: File | null) => void;
  onRemoveNewPhoto: () => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  const inputCls =
    "w-full border border-grey-light bg-white px-4 py-3 text-charcoal outline-none transition-colors focus:border-bronze focus:ring-2 focus:ring-bronze/20";
  const missingSizes = SIZE_SUGGESTIONS.filter((s) => !draft.sizes.includes(s));
  const missingColors = catalogColors.filter((c) => !draft.colors.includes(c));

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) onPickPhoto(file);
    e.target.value = "";
  }

  return (
    <div className="border border-grey-light bg-white p-8 max-[640px]:p-5">
      <div className="mb-7 flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-bold text-charcoal">
          {isNew ? "Nuevo producto" : "Editar producto"}
        </h2>
        <button
          onClick={onCancel}
          className="text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-grey transition-colors hover:text-charcoal"
        >
          Cancelar ✕
        </button>
      </div>

      <div className="grid gap-7 max-[900px]:grid-cols-1 min-[901px]:grid-cols-[minmax(0,1fr)_240px]">
        <div className="space-y-6">
          <div>
            <FieldLabel>Nombre del producto *</FieldLabel>
            <input
              type="text"
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              placeholder="Ejemplo: Jean Skinny Azul Medio"
              className={inputCls}
            />
          </div>

          <div>
            <FieldLabel>¿Dónde se publica?</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {(["mujer", "deportiva"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, collection: c }))}
                  className={`border px-5 py-3 text-[0.85rem] font-semibold transition-colors ${
                    draft.collection === c
                      ? "border-bronze bg-bronze text-white"
                      : "border-grey-light bg-white text-charcoal hover:border-bronze hover:text-bronze"
                  }`}
                >
                  {IS_COLLECTION[c]}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[0.8rem] text-grey">
              «Ropa de Mujer» o «Deportiva». Aparecerá en la sección que le corresponda.
            </p>
          </div>

          <div>
            <FieldLabel>Tipo de prenda</FieldLabel>
            <select
              value={draft.category}
              onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value as ProductCategory }))}
              className={inputCls}
            >
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel>Descripción (opcional)</FieldLabel>
            <textarea
              value={draft.description}
              onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
              rows={4}
              placeholder="Cuéntanos la prenda: corte, tejido, cómo se siente…"
              className={`${inputCls} resize-y leading-relaxed`}
            />
            <p className="mt-2 text-[0.8rem] text-grey">
              Si la dejas vacía, usaremos una descripción genérica para este tipo de prenda.
            </p>
          </div>

          <div>
            <FieldLabel>Tallas disponibles</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {draft.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, sizes: d.sizes.filter((x) => x !== s) }))}
                  className="border border-bronze bg-bronze px-5 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-bronze-dark"
                  title="Quitar talla"
                >
                  {s} ✕
                </button>
              ))}
              {missingSizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, sizes: [...d.sizes, s] }))}
                  className="border border-dashed border-grey-light bg-white px-5 py-3 text-[0.95rem] font-semibold text-charcoal transition-colors hover:border-bronze hover:text-bronze"
                >
                  + {s}
                </button>
              ))}
            </div>
            <div className="mt-3 flex max-w-sm flex-wrap gap-2">
              <input
                type="text"
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onAddCustomSize();
                  }
                }}
                placeholder="Otra talla (ej. 28, XLG…)"
                className={inputCls}
              />
              <button
                type="button"
                onClick={onAddCustomSize}
                className="shrink-0 border border-charcoal px-5 text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-charcoal transition-colors hover:bg-charcoal hover:text-white"
              >
                Añadir
              </button>
            </div>
            <p className="mt-2 text-[0.8rem] text-grey">
              {draft.sizes.length === 0
                ? "Sin tallas marcadas = se muestran todas las del catálogo (" + catalogSizes.join(", ") + ")."
                : "Toca una talla marcada para quitarla; toca «+ talla» para añadirla."}
            </p>
          </div>

          <div>
            <FieldLabel>Colores del producto</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {draft.colors.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, colors: d.colors.filter((c) => c !== hex) }))}
                  className="flex items-center gap-2 border border-bronze bg-bronze px-4 py-2.5 text-[0.9rem] font-semibold text-white transition-colors hover:bg-bronze-dark"
                  title="Quitar color"
                >
                  <span
                    className="inline-block h-4 w-4 rounded-full border border-white/60"
                    style={{ backgroundColor: hex }}
                  />
                  {colorLabel(hex)} ✕
                </button>
              ))}
              {missingColors.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, colors: d.colors.includes(hex) ? d.colors : [...d.colors, hex] }))}
                  className="flex items-center gap-2 border border-dashed border-grey-light bg-white px-4 py-2.5 text-[0.9rem] font-semibold text-charcoal transition-colors hover:border-bronze hover:text-bronze"
                >
                  <span
                    className="inline-block h-4 w-4 rounded-full border border-grey-light"
                    style={{ backgroundColor: hex }}
                  />
                  + {colorLabel(hex)}
                </button>
              ))}
            </div>
            <div className="mt-3 flex max-w-sm flex-wrap gap-2">
              <input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onAddCustomColor();
                  }
                }}
                placeholder="Nombre o #hex (ej. arena, #d9c7a7)"
                className={inputCls}
              />
              <button
                type="button"
                onClick={onAddCustomColor}
                className="shrink-0 border border-charcoal px-5 text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-charcoal transition-colors hover:bg-charcoal hover:text-white"
              >
                AÑadir
              </button>
            </div>
            <p className="mt-2 text-[0.8rem] text-grey">
              {draft.colors.length === 0
                ? "Sin colores marcados = se muestran todas las variantes del catálogo."
                : "Toca un color marcado para quitarlo; toca «+ color» para añadirlo."}
            </p>
          </div>

          <div>
            <FieldLabel>Etiqueta del producto</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {([null, "new", "sale"] as const).map((b) => (
                <button
                  key={String(b)}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, badge: b }))}
                  className={`border px-5 py-3 text-[0.85rem] font-semibold transition-colors ${
                    draft.badge === b
                      ? "border-bronze bg-bronze text-white"
                      : "border-grey-light bg-white text-charcoal hover:border-bronze hover:text-bronze"
                  }`}
                >
                  {BADGE_LABELS[String(b)]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Foto */}
        <div>
          <FieldLabel>Foto del producto *</FieldLabel>
          <div className="border border-grey-light bg-cream p-3">
            <div className="aspect-[3/4] w-full overflow-hidden border border-grey-light bg-white">
              {previewDataUrl ? (
                <img src={previewDataUrl} alt="Nueva foto" className="h-full w-full object-cover" />
              ) : draft.image ? (
                <img src={draft.image} alt={draft.alt || draft.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center px-4 text-center text-[0.85rem] text-grey">
                  Sube la foto de la prenda…
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="product-photo"
              onChange={handleFile}
            />
          </div>
          <label
            htmlFor="product-photo"
            className="mt-3 block cursor-pointer border border-charcoal bg-charcoal px-5 py-3 text-center text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-bronze"
          >
            {previewDataUrl || !draft.image ? "Subir foto" : "Cambiar foto"}
          </label>
          {previewDataUrl && (
            <button
              type="button"
              onClick={onRemoveNewPhoto}
              className="mt-2 w-full border border-grey-light py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-charcoal transition-colors hover:text-[#a52d22]"
            >
              Quitar la foto nueva
            </button>
          )}
          <p className="mt-3 text-[0.8rem] leading-relaxed text-grey">
            Puedes subir una foto desde el móvil o el ordenador. Se optimiza sola
            para que la web cargue rápido.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-grey-light pt-7">
        <button
          onClick={onSave}
          disabled={saving}
          className="bg-charcoal px-10 py-4 text-[0.88rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-bronze disabled:cursor-wait disabled:opacity-60"
        >
          {saving ? "Guardando…" : isNew ? "Crear producto" : "Guardar cambios"}
        </button>
        <button
          onClick={onCancel}
          disabled={saving}
          className="border border-grey-light px-8 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-charcoal transition-colors hover:border-grey"
        >
          Cancelar
        </button>
        <p className="text-[0.8rem] text-grey">Al guardar, la web entera se actualiza sola.</p>
      </div>
    </div>
  );
}

