import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import AdminApp from "@/components/admin/AdminApp";

export const metadata = {
  title: "Administrar catálogo",
  robots: { index: false, follow: false },
};

export default async function AdminPanelPage() {
  if (!(await verifySession())) redirect("/admin");
  return <AdminApp />;
}