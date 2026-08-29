import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import { PRODUCTS } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === Number(id));
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: `${product.name}`,
    description: `${product.name} — ${product.category}. €${product.price}.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === Number(id));
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return <ProductView product={product} related={related} />;
}