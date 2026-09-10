import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/data";
import { OgCard } from "./og-card";

export const alt = `${SITE.name} — ${SITE.claim}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const jost = await readFile(join(process.cwd(), "app/fonts/jost-600.ttf"));

export default async function Image() {
  return new ImageResponse(
    <OgCard
      name={SITE.name}
      claim={SITE.claim}
      instagram={SITE.instagram}
      url={SITE.url}
    />,
    {
      ...size,
      fonts: [
        {
          name: "Jost",
          data: jost,
          weight: 600,
          style: "normal",
        },
      ],
    }
  );
}