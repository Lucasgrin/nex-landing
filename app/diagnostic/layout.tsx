import type { Metadata } from "next";

const TITLE = "Diagnostic gratuit — Audit de vos processus";
const DESCRIPTION =
  "Faites le diagnostic gratuit de la digitalisation de votre PME en 5 minutes. Heures perdues, potentiel d'automatisation et gains estimés, pour les entreprises de toute la Suisse romande — Genève, Lausanne, Fribourg, Neuchâtel, Valais, Jura.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/diagnostic" },
  openGraph: {
    title: `${TITLE} · NeX`,
    description: DESCRIPTION,
    url: "/diagnostic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} · NeX`,
    description: DESCRIPTION,
  },
};

export default function DiagnosticLayout({ children }: { children: React.ReactNode }) {
  return children;
}
