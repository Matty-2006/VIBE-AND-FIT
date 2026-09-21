import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Guard provisorio del panel de administración (optimistic).
 * Solo comprueba que exista la cookie de sesión; la verificación real
 * (firma HMAC + expiración) se hace en los route handlers y en el
 * panel mismo, que es donde vive el dato.
 */
const SESSION_COOKIE = "vf_admin";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith("/api/admin");
  const isLogin = pathname === "/api/admin/login";
  const isPanel = pathname.startsWith("/admin/panel");

  if (!isApi && !isPanel) return NextResponse.next();

  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  if (isPanel && !hasSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (isApi && !hasSession && !isLogin) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};