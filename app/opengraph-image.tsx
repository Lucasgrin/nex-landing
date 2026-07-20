import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "NeX — Logiciels métier sur mesure en Suisse romande";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 44,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#22c55e",
            }}
          />
          <div style={{ display: "flex", color: "rgba(255,255,255,0.55)", fontSize: 28, fontWeight: 600 }}>
            Suisse romande · Genève · Lausanne · Fribourg · Neuchâtel · Valais · Jura
          </div>
        </div>
        <div style={{ display: "flex", color: "#ffffff", fontSize: 108, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
          NeX
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.75)",
            fontSize: 38,
            fontWeight: 600,
            marginTop: 20,
            maxWidth: 900,
          }}
        >
          Logiciels métier sur mesure &amp; IA pour les PME
        </div>
      </div>
    ),
    { ...size }
  );
}
