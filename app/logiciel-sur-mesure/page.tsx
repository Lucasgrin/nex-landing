import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import PageCTA from "../components/PageCTA";
import { CITIES } from "../content/cities";
import { JsonLd, breadcrumbJsonLd } from "../lib/seo";
import { SITE } from "../content/site";

const TITLE = "Où nous intervenons · Suisse romande";
const DESCRIPTION =
  "NeX développe des logiciels métier sur mesure dans toute la Suisse romande : Vaud, Genève, Fribourg, Neuchâtel, Valais et Jura. Bureaux à Payerne, déplacements sur site.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/logiciel-sur-mesure" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/logiciel-sur-mesure", type: "website", locale: "fr_CH" },
};

const trail = [
  { name: "Accueil", path: "/" },
  { name: "Où nous intervenons", path: "/logiciel-sur-mesure" },
];

export default function CitiesIndex() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <Navbar />
      <main className="pt-32">
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs trail={trail} />
            <h1
              className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-[#0a0a0a] md:text-5xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Une agence romande, sur le terrain
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">
              Nos bureaux sont à {SITE.city}, dans le canton de {SITE.region}. Nous nous déplaçons dans
              toute la Suisse romande — et chaque bassin économique a ses propres réalités, que nous
              détaillons ci-dessous.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/logiciel-sur-mesure/${c.slug}`}
                className="group flex flex-col rounded-2xl border border-neutral-100 p-8 transition-all hover:border-neutral-300 hover:shadow-sm"
              >
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  Canton de {c.canton}
                </p>
                <h2 className="mb-3 text-xl font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {c.name}
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-neutral-500">{c.intro}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a0a0a]">
                  En savoir plus
                  <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <PageCTA />
      </main>
      <Footer />
    </>
  );
}
