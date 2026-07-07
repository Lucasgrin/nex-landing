import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["400","500","600","700"] });

export const metadata: Metadata = {
  title: "NeX — Logiciels métier sur mesure · Suisse romande",
  description: "NeX conçoit des logiciels métier sur mesure et intègre l'IA pour les PME de Suisse romande. CRM, ERP, portails clients, automatisations.",
  openGraph: {
    title: "NeX — Logiciels métier sur mesure",
    description: "Arrêtez d'adapter votre entreprise à vos logiciels. Construisons les logiciels qui s'adaptent à votre entreprise.",
    locale: "fr_CH",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geist.variable} ${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-[#0a0a0a]">{children}</body>
    </html>
  );
}
