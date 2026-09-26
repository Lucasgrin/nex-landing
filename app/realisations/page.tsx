import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import AnimateOnScroll from "../components/AnimateOnScroll";
import CaseStudies from "../components/CaseStudies";
import PageCTA from "../components/PageCTA";
import { ALL_STUDIES, EXAMPLES, caseHref } from "../content/cases";
import { JsonLd, breadcrumbJsonLd } from "../lib/seo";

const TITLE = "Réalisations et logiciels par métier · NeX";
const DESCRIPTION =
  "Nettoyage, fiduciaires, studios, photographes, agences, installateurs, régies : les outils que NeX a livrés à des PME romandes, et ceux que nous construirions pour votre métier.";

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

/**
 * Le hub des métiers.
 *
 * Métiers et réalisations étaient deux entrées qui racontaient la même chose.
 * Il n'en reste qu'une, qui part de ce que le visiteur cherche — son métier :
 * les réalisations d'abord, parce qu'elles prouvent, puis les cas d'usage
 * type pour les métiers que nous n'avons pas encore équipés.
 */
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
              className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#0a0a0a] md:text-5xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Un outil pensé pour votre métier, pas pour tout le monde.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">
              Chaque page part du quotidien réel d&apos;un métier — son vocabulaire, ses outils,
              ce qui lui coûte du temps — et montre ce qu&apos;un outil sur mesure y change.
            </p>

            {/* Le raccourci : le visiteur cherche son métier, pas une liste de
                clients. Un clic, et il est sur la page qui lui parle. */}
            <p className="mono mb-3 mt-10 text-[10px] uppercase tracking-[0.14em] text-neutral-400">
              Trouvez votre métier
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_STUDIES.map((c) => (
                <Link
                  key={c.slug}
                  href={caseHref(c.slug)}
                  className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600 transition-colors hover:border-neutral-500 hover:text-[#0a0a0a]"
                >
                  {c.sector}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CaseStudies />

        {/* Les métiers que nous n'avons pas encore équipés, dans la même
            grammaire. Cartes en pointillés : c'est à construire. */}
        <section className="border-t border-neutral-100 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <AnimateOnScroll>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                D&apos;autres métiers
              </p>
              <h2
                className="mb-4 max-w-2xl text-4xl font-bold tracking-tight text-[#0a0a0a] md:text-5xl"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Et pour votre métier ?
              </h2>
              <p className="mb-14 max-w-2xl text-base leading-relaxed text-neutral-500">
                Le problème de fond — des outils qui ne se parlent pas, et quelqu&apos;un au milieu
                qui recopie — se retrouve à peu près partout. Voici à quoi ressemblerait l&apos;outil
                dans d&apos;autres métiers.
              </p>
            </AnimateOnScroll>

            <div className="grid gap-3 md:grid-cols-2">
              {EXAMPLES.map((c, i) => (
                <AnimateOnScroll key={c.slug} delay={i * 70} className="h-full">
                  <Link
                    href={caseHref(c.slug)}
                    className="group flex h-full flex-col rounded-2xl border border-dashed border-neutral-300 p-8 transition-colors hover:border-neutral-500"
                  >
                    <p className="mono text-[10px] uppercase tracking-[0.14em] text-neutral-400">
                      {c.sector}
                    </p>
                    <p
                      className="mt-4 text-2xl font-bold leading-tight text-[#0a0a0a]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {c.headline ?? c.sector}
                    </p>
                    <p className="mt-4 text-[14.5px] leading-relaxed text-neutral-500">{c.summary}</p>
                    <ul className="mt-6 space-y-2">
                      {c.delivered.map((d) => (
                        <li key={d.title} className="flex items-start gap-2.5 text-sm text-neutral-600">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                          {d.title}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto pt-7 text-sm font-semibold text-[#0a0a0a]">
                      Découvrir{" "}
                      <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                    </span>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>

            <p className="mt-12 max-w-2xl text-[15px] leading-relaxed text-neutral-500">
              Votre métier n&apos;est pas dans la liste ? C&apos;est le cas de la plupart. Décrivez-nous le vôtre au premier appel : trente minutes suffisent
              pour savoir si un outil sur mesure vaut le coup chez vous.
            </p>
          </div>
        </section>

        <PageCTA />
      </main>
      <Footer />
    </>
  );
}
