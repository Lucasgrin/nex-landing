import { ImageResponse } from "next/og";
import { ARTICLES, getArticle } from "../../content/articles";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Article du blog NeX";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

/**
 * L'image de partage d'un article : son titre, sur le noir du site.
 * C'est ce qu'on voit quand le lien circule sur LinkedIn ou WhatsApp — le
 * titre doit s'y lire d'un coup d'œil, sans la photo générique d'usage.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  const title = article?.title ?? "Blog NeX";
  const fontSize = title.length > 95 ? 50 : title.length > 70 ? 58 : 66;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0a0a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", width: 12, height: 12, borderRadius: 999, background: "#22c55e" }} />
          <div style={{ display: "flex", color: "rgba(255,255,255,0.55)", fontSize: 26, fontWeight: 600, letterSpacing: 2 }}>
            {(article?.topic ?? "Blog").toUpperCase()}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize,
            fontWeight: 700,
            letterSpacing: -1.5,
            lineHeight: 1.1,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <div style={{ display: "flex", color: "#ffffff", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>NeX</div>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.45)", fontSize: 24, fontWeight: 600 }}>
            Logiciels métier sur mesure &amp; IA · Suisse romande
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
