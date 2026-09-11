import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const jost = await readFile(join(process.cwd(), "app/fonts/jost-600.ttf"));

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
        }}
      >
        <span
          style={{
            fontFamily: "Jost",
            fontSize: 88,
            fontWeight: 600,
            color: "#cfbfa4",
            lineHeight: 1,
          }}
        >
          {"&"}
        </span>
        <span
          style={{
            marginTop: 10,
            fontFamily: "Jost",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: 4,
            color: "rgba(255,255,255,0.82)",
            textTransform: "uppercase",
          }}
        >
          {"Vibe & Fit"}
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Jost", data: jost, weight: 600, style: "normal" }],
    }
  );
}
