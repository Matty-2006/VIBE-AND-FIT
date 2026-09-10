const DOTS = ["#8fb2c9", "#24405c", "#111111", "#f4efe9"];

export function OgCard({
  name,
  claim,
  instagram,
  url,
}: {
  name: string;
  claim: string;
  instagram: string;
  url: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#111111",
        color: "#ffffff",
        fontFamily: "Jost",
        position: "relative",
        overflow: "hidden",
        padding: "62px 76px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 6,
          background: "linear-gradient(#8fb2c9, #24405c, #111111, #f4efe9)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -140,
          top: -190,
          width: 560,
          height: 560,
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -90,
          top: -120,
          width: 400,
          height: 400,
          borderRadius: 999,
          border: "1px solid rgba(198,169,120,0.35)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {DOTS.map((d) => (
            <div
              key={d}
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: d,
                border: d === "#111111" ? "1px solid rgba(255,255,255,0.4)" : "none",
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.34em",
            fontWeight: 600,
          }}
        >
          {name.toUpperCase()}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 1, background: "rgba(198,169,120,0.7)" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.4em",
              color: "rgba(255,255,255,0.62)",
              textTransform: "uppercase",
            }}
          >
            Moda de mujer y deportiva
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            flexWrap: "wrap",
            fontSize: 66,
            lineHeight: 1.18,
            fontWeight: 600,
          }}
        >
          {claim.split(" ").slice(0, 3).join(" ")}
          <span
            style={{
              fontFamily: "Jost",
              fontStyle: "italic",
              color: "#c6a978",
              paddingLeft: 14,
            }}
          >
            {claim.split(" ").slice(3).join(" ")}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: 26,
        }}
      >
        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.72)" }}>
          {instagram}
        </div>
        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.72)" }}>
          {url.replace("https://", "")}
        </div>
      </div>
    </div>
  );
}