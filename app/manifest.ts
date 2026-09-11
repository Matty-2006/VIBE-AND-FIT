import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Vibe & Fit",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f4efe9",
    theme_color: "#111111",
    lang: "es",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
