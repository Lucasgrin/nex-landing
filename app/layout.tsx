import type { Metadata } from "next";
import { Geist, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { organizationJsonLd, JsonLd } from "./lib/seo";
import { SITE } from "./content/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["400","500","600","700"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-ui", weight: ["500"] });

const TITLE = "NeX — Logiciels métier sur mesure · Suisse romande";
const DESCRIPTION =
  "NeX conçoit des logiciels métier sur mesure et intègre l'IA pour les PME de Suisse romande — Genève, Lausanne, Vaud, Fribourg, Neuchâtel, Valais, Jura. CRM, ERP, portails clients, automatisations.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: `%s · ${SITE.name}` },
  description: DESCRIPTION,
  applicationName: SITE.name,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE.url,
    siteName: SITE.name,
    locale: "fr_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geist.variable} ${spaceGrotesk.variable} ${jetbrains.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-[#0a0a0a]">
        <JsonLd data={organizationJsonLd()} />
        {children}
      </body>
    </html>
  );
}
