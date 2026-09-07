import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import PageCTA from "../components/PageCTA";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { METIERS } from "../content/metiers";
import { JsonLd, breadcrumbJsonLd } from "../lib/seo";

const TRAIL = [
  { name: "Accueil", path: "/" },
  { name: "Métiers", path: "/metiers" },
];

export const metadata: Metadata = {
  title: "Logiciels métier par secteur · NeX",
  description:
    "Nettoyage, fiduciaires, installateurs, régies : ce que nous construisons pour chaque métier, et ce que nous n'avons pas encore fait. Suisse romande.",
  alternates: { canonical: "/metiers" },
};

export default function MetiersPage() {
  const proven = METIERS.filter((m) => m.status === "realise");
  const projected = METIERS.filter((m) => m.status === "projection");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(TRAIL)} />
      <Navbar />

      <main>
        <section className="px-6 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-[1240px]">
            <Breadcrumbs trail={TRAIL} />
            <h1
              className="mb-6 max-w-3xl text-4xl font-bold leading-[1.06] tracking-[-0.028em] text-[#0a0a0a] md:text-5xl lg:text-[52px]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Chaque métier a ses frictions. Rarement les mêmes.
            </h1>
            <p className="max-w-[680px] text-base leading-relaxed text-neutral-500 md:text-[17px]">
              Un logiciel générique traite tout le monde pareil. Nous partons de votre métier — de
              son vocabulaire, de ses contraintes et de ce qui vous coûte réellement du temps.
              Ci-dessous, ce que nous avons déjà construit, et ce que nous construirions.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            {[
              { titre: "Métiers déjà équipés", liste: proven, prouve: true },
              { titre: "Métiers que nous n'avons pas encore équipés", liste: projected, prouve: false },
            ]
              .filter((g) => g.liste.length > 0)
              .map((groupe) => (
                <div key={groupe.titre} className="mb-14 last:mb-0">
                  <p className="mono mb-6 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                    {groupe.titre}
                  </p>
                  <div className="grid gap-3.5 md:grid-cols-2">
                    {groupe.liste.map((m, i) => (
                      <AnimateOnScroll key={m.slug} delay={i * 70}>
                        <Link
                          href={`/metiers/${m.slug}`}
                          className="group flex h-full flex-col rounded-2xl border border-neutral-100 p-7 transition-colors hover:border-neutral-300"
                        >
                          <div
                            className={`mb-5 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 ${
                              groupe.prouve ? "border-green-200 bg-green-50" : "border-neutral-200"
                            }`}
                          >
                            <span className={`h-[4px] w-[4px] rounded-full ${groupe.prouve ? "bg-green-500" : "bg-neutral-300"}`} />
                            <span className={`mono text-[9px] tracking-[0.1em] ${groupe.prouve ? "text-green-700" : "text-neutral-400"}`}>
                              {groupe.prouve ? "RÉALISÉ" : "PROJECTION"}
                            </span>
                          </div>
                          <h2
                            className="mb-2.5 text-xl font-bold text-[#0a0a0a]"
                            style={{ fontFamily: "var(--font-space-grotesk)" }}
                          >
                            {m.label}
                          </h2>
                          <p className="mb-5 text-[13.5px] leading-relaxed text-neutral-500">{m.intro}</p>
                          <span className="mt-auto text-sm font-semibold text-[#0a0a0a]">
                            Voir la page{" "}
                            <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>
                              →
                            </span>
                          </span>
                        </Link>
                      </AnimateOnScroll>
                    ))}
                  </div>
                </div>
              ))}

            <p className="mt-10 max-w-[680px] text-sm leading-relaxed text-neutral-400">
              Votre métier n&apos;est pas dans la liste ? C&apos;est le cas de la plupart. Le
              problème de fond — des outils qui ne se parlent pas et une ressaisie qui coûte cher —
              se retrouve à peu près partout. Dites-nous le vôtre au premier appel.
            </p>
          </div>
        </section>

        <PageCTA />
      </main>

      <Footer />
    </>
  );
}
