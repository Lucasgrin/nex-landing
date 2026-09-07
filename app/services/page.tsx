import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import PageCTA from "../components/PageCTA";
import { SERVICES } from "../content/services";
import { JsonLd, breadcrumbJsonLd } from "../lib/seo";

const TITLE = "Nos services · Logiciels métier sur mesure pour PME";
const DESCRIPTION =
  "CRM, ERP, portails clients, applications métier, automatisations et agents IA sur mesure pour les PME de Suisse romande. Une expertise, une page, un devis transparent.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/services", type: "website", locale: "fr_CH" },
};

const trail = [
  { name: "Accueil", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesIndex() {
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
              Ce que nous construisons pour les PME romandes
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">
              Six expertises, un même principe : nous partons de vos processus réels, jamais d&apos;un
              modèle standard. Chaque page détaille les situations concrètes que nous rencontrons et ce
              que nous livrons.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col rounded-2xl border border-neutral-100 p-8 transition-all hover:border-neutral-300 hover:shadow-sm"
              >
                <h2
                  className="mb-3 text-xl font-bold text-[#0a0a0a]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.name}
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-neutral-500">{s.intro}</p>
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
