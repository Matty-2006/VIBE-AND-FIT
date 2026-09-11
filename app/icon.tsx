import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const jost = await readFile(join(process.cwd(), "app/fonts/jost-600.ttf"));

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          borderRadius: 7,
        }}
      >
        <span
          style={{
            fontFamily: "Jost",
            fontSize: 19,
            fontWeight: 600,
            color: "#cfbfa4",
            lineHeight: 1,
            transform: "translateY(-1px)",
          }}
        >
          {"&"}
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Jost", data: jost, weight: 600, style: "normal" }],
    }
  );
}
