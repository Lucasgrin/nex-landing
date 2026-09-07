import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import Team from "../components/Team";
import Locaux from "../components/Locaux";
import Method from "../components/Method";
import PageCTA from "../components/PageCTA";
import { JsonLd, breadcrumbJsonLd } from "../lib/seo";
import { SITE } from "../content/site";

const TITLE = "À propos · L'équipe NeX à Payerne";
const DESCRIPTION =
  "Qui est derrière NeX : une équipe de deux personnes basée à Payerne, qui conçoit et développe elle-même les logiciels métier de ses clients romands.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/a-propos" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/a-propos", type: "website", locale: "fr_CH" },
};

const trail = [
  { name: "Accueil", path: "/" },
  { name: "À propos", path: "/a-propos" },
];

export default function AProposPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <Navbar />
      <main className="pt-32">
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs trail={trail} />
            <h1
              className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#0a0a0a] md:text-5xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Une petite équipe, volontairement.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">
              {SITE.name} est la marque de {SITE.legalName}, société basée à {SITE.city}. Nous sommes deux,
              et c&apos;est un choix : les personnes qui vous répondent au téléphone sont celles qui
              conçoivent et développent votre outil. Aucun dossier ne change de mains en cours de route.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-500">
              Cette taille impose une discipline utile — nous ne prenons que les projets que nous pouvons
              mener correctement, et nous le disons quand un besoin ne justifie pas du sur-mesure.
            </p>
          </div>
        </section>

        <Team heading="Les deux personnes qui construiront votre outil." showOffice={false} />
        <Locaux />
        <Method />
        <PageCTA />
      </main>
      <Footer />
    </>
  );
}
