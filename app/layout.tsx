import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["400","500","600","700"] });

const SITE_URL = "https://ne-x.ch";
const SITE_NAME = "NeX";
const TITLE = "NeX — Logiciels métier sur mesure · Suisse romande";
const DESCRIPTION =
  "NeX conçoit des logiciels métier sur mesure et intègre l'IA pour les PME de Suisse romande — Genève, Lausanne, Vaud, Fribourg, Neuchâtel, Valais, Jura. CRM, ERP, portails clients, automatisations.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · NeX" },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "logiciel sur mesure Suisse romande",
    "développement logiciel métier",
    "CRM sur mesure",
    "ERP sur mesure",
    "automatisation PME",
    "intelligence artificielle PME",
    "agence digitale Genève",
    "agence digitale Lausanne",
    "développement logiciel Fribourg",
    "développement logiciel Neuchâtel",
    "développement logiciel Valais",
    "développement logiciel Jura",
    "logiciel sur mesure Payerne",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  alternateName: "Scale X Sàrl",
  url: SITE_URL,
  logo: `${SITE_URL}/apple-icon.png`,
  image: `${SITE_URL}/opengraph-image`,
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Payerne",
    addressRegion: "Vaud",
    addressCountry: "CH",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Vaud" },
    { "@type": "AdministrativeArea", name: "Genève" },
    { "@type": "AdministrativeArea", name: "Fribourg" },
    { "@type": "AdministrativeArea", name: "Neuchâtel" },
    { "@type": "AdministrativeArea", name: "Valais" },
    { "@type": "AdministrativeArea", name: "Jura" },
    { "@type": "AdministrativeArea", name: "Suisse romande" },
  ],
  knowsLanguage: "fr",
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geist.variable} ${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-[#0a0a0a]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
