import "server-only";
import type { CatalogData } from "@/lib/types";

/**
 * Publica el catálogo y las fotos en el repositorio de GitHub mediante la
 * API de Contents. Vercel detecta el push a `main` y redespliega solo,
 * así el sitio público recibe los cambios sin pasos manuales.
 *
 * Requiere la variable de entorno GITHUB_TOKEN (token con permiso de repo).
 * Sin token, la web funciona igual en local pero no se publica.
 */

const REPO = process.env.GITHUB_REPO || "Matty-2006/VIBE-AND-FIT";
const BRANCH = "main";
const BASE = "https://api.github.com";

export type PublishResult =
  | { ok: true; commitUrl?: string }
  | { ok: false; error: string };

function token(): string | null {
  return process.env.GITHUB_TOKEN?.trim() || null;
}

async function ghRequest(path: string, method: string, body?: unknown): Promise<Response> {
  return fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token()!}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "vibe-and-fit-admin",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function errorText(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { message?: string };
    return data.message || `HTTP ${res.status}`;
  } catch {
    return `HTTP ${res.status}`;
  }
}

async function putFile(filePath: string, contentBase64: string, message: string): Promise<PublishResult> {
  // GitHub exige el `sha` del archivo actual para poder actualizarlo
  // (es el mecanismo que evita pisar cambios de otra persona). Si el
  // archivo todavía no existe, se crea sin sha.
  let sha: string | undefined;
  const existing = await ghRequest(`/repos/${REPO}/contents/${filePath}?branch=${BRANCH}`, "GET");
  if (existing.ok) {
    const data = (await existing.json()) as { sha?: string };
    sha = data.sha;
  }
  const payload: Record<string, unknown> = { message, content: contentBase64, branch: BRANCH };
  if (sha) payload.sha = sha;
  const res = await ghRequest(`/repos/${REPO}/contents/${filePath}?branch=${BRANCH}`, "PUT", payload);
  if (!res.ok) return { ok: false, error: `GitHub: no se pudo guardar ${filePath}: ${await errorText(res)}` };
  const data = (await res.json()) as { commit?: { html_url?: string } };
  return data.commit?.html_url ? { ok: true, commitUrl: data.commit.html_url } : { ok: true };
}

async function deleteFile(filePath: string, message: string): Promise<PublishResult> {
  const get = await ghRequest(`/repos/${REPO}/contents/${filePath}?branch=${BRANCH}`, "GET");
  if (!get.ok) {
    // Si ya no existe en el repo, no es un error para nosotros.
    return { ok: true };
  }
  const data = (await get.json()) as { sha: string };
  const res = await ghRequest(`/repos/${REPO}/contents/${filePath}`, "DELETE", {
    message,
    sha: data.sha,
    branch: BRANCH,
  });
  if (!res.ok) return { ok: false, error: `GitHub: no se pudo borrar ${filePath}: ${await errorText(res)}` };
  return { ok: true };
}

export async function publishCatalogToRepo(opts: {
  catalog: CatalogData;
  images: Array<{ name: string; data: string }>;
  deleteImages: string[];
}): Promise<PublishResult> {
  const ghToken = token();
  if (!ghToken) {
    return { ok: false, error: "Falta GITHUB_TOKEN: los cambios se guardaron solo en este equipo." };
  }

  const stamp = new Date().toISOString().slice(0, 10);
  const message = `Admin: actualizar catálogo (${stamp})`;

  // 1) Imágenes nuevas.
  for (const img of opts.images) {
    const result = await putFile(`public/images/${img.name}`, img.data, message);
    if (!result.ok) return result;
  }

  // 2) Catálogo (JSON normalizado).
  const jsonContent = Buffer.from(JSON.stringify(opts.catalog, null, 2) + "\n").toString("base64");
  const catalogResult = await putFile("data/catalog.json", jsonContent, message);
  if (!catalogResult.ok) return catalogResult;

  // 3) Imágenes eliminadas.
  for (const imagePath of opts.deleteImages) {
    const name = imagePath.replace(/^\/images\//, "");
    if (!/^upload-\d{10,16}\.(webp|jpg|jpeg|png)$/i.test(name)) continue;
    const result = await deleteFile(`public/images/${name}`, message);
    if (!result.ok) return result;
  }

  return { ok: true };
}