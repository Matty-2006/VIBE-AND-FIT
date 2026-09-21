import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Acceso | Vibe & Fit",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (await verifySession()) redirect("/admin/panel");

  return (
    <div className="bg-cream px-6 py-24 max-[640px]:py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-12 text-center">
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-bronze">
            {SITE.name}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-charcoal">
            Panel de administración
          </h1>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-grey">
            Esta página es solo para administradores. Introduce tus datos para
            entrar y poder editar el catálogo de la página.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}