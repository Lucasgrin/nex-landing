import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import CaseStudies from "../components/CaseStudies";
import PageCTA from "../components/PageCTA";
import { JsonLd, breadcrumbJsonLd } from "../lib/seo";

const TITLE = "Réalisations · Projets clients NeX en Suisse romande";
const DESCRIPTION =
  "Portails clients, outils internes, plateformes métier : les projets que NeX a livrés à des PME romandes, avec le problème de départ et la solution mise en place.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/realisations" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/realisations", type: "website", locale: "fr_CH" },
};

const trail = [
  { name: "Accueil", path: "/" },
  { name: "Réalisations", path: "/realisations" },
];

export default function RealisationsIndex() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <Navbar />
      <main className="pt-32">
        <section className="px-6 pb-4">
          <div className="mx-auto max-w-6xl">
            <Breadcrumbs trail={trail} />
            <h1
              className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-[#0a0a0a] md:text-5xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Les projets que nous avons livrés
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">
              Chaque étude de cas part du problème réel de l&apos;entreprise, pas de la technologie
              employée. C&apos;est le meilleur moyen de savoir si votre situation ressemble à l&apos;une
              des leurs.
            </p>
          </div>
        </section>

        <CaseStudies />
        <PageCTA />
      </main>
      <Footer />
    </>
  );
}
