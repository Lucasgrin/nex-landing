import Link from "next/link";
import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
import { Photo } from "./Photo";
import { PUBLISHED_CASES, LANDING_CASE_SLUGS, caseHref } from "../content/cases";

/**
 * Aperçu des réalisations sur la home. Chaque carte mène à sa page dédiée
 * (/realisations/[slug]) — c'est à la fois le parcours de réassurance et
 * quatre URLs indexables de plus.
 */
export default function CaseStudies({ variant = "grid" }: { variant?: "grid" | "rail" }) {
  if (variant === "rail") return <CaseRail />;
  return (
    <section id="realisations" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Nos réalisations</p>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-4 max-w-xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Des projets réels. Des résultats concrets.
          </h2>
          <p className="text-base text-neutral-500 max-w-lg mb-16 leading-relaxed">
            Quatre entreprises, quatre problèmes différents. À chaque fois, un outil conçu à partir de
            leurs processus réels — pas d&apos;un modèle standard.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-3">
          {PUBLISHED_CASES.map((c, i) => (
            <AnimateOnScroll key={c.slug} delay={i * 70}>
              <Link
                href={caseHref(c.slug)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
              >
                <CaseVisual
                  study={c}
                  className="aspect-[16/10] w-full border-b border-neutral-100"
                  sizes="(max-width: 768px) 100vw, 560px"
                />
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xl font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        {c.client}
                      </p>
                      <span className="text-xs font-medium text-neutral-400">{c.type}</span>
                    </div>
                    <Image
                      src={c.logo}
                      alt={`Logo ${c.client}`}
                      width={72}
                      height={26}
                      className="h-6 w-auto shrink-0 opacity-30 grayscale transition-opacity duration-300 group-hover:opacity-60"
                    />
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-neutral-500">{c.summary}</p>

                  <ul className="mt-auto space-y-2">
                    {c.gains.map((g) => (
                      <li key={g} className="flex items-start gap-2.5 text-sm text-neutral-600">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-1 shrink-0 text-[#0a0a0a]" aria-hidden="true">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {g}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a0a0a]">
                    Lire l&apos;étude de cas
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Variante home : un rail horizontal qui déborde volontairement du cadre —
 * c'est ce débordement qui dit au visiteur qu'il peut faire défiler.
 *
 * Là où une réalisation porte un chiffre solide, on affiche le chiffre plutôt
 * qu'une capture : à 168 px de haut, une capture d'outil métier est illisible,
 * alors qu'un « ÷2 » se lit en un dixième de seconde.
 */
function CaseRail() {
  const cases = LANDING_CASE_SLUGS.map((slug) =>
    PUBLISHED_CASES.find((c) => c.slug === slug),
  ).filter((c): c is (typeof PUBLISHED_CASES)[number] => Boolean(c));

  if (cases.length === 0) return null;

  return (
    <section id="realisations" className="border-t border-neutral-100 px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1240px]">
        <AnimateOnScroll>
          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                Réalisations
              </p>
              <h2
                className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Des entreprises. Des outils qui n&apos;existaient pas.
              </h2>
            </div>
            <Link href="/realisations" className="shrink-0 text-sm font-semibold text-neutral-600 hover:text-[#0a0a0a]">
              Tout voir <span aria-hidden>→</span>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>

      <div className="mx-auto flex max-w-[1240px] snap-x snap-mandatory gap-3.5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cases.map((c, i) => {
          const metric = c.metrics[0];
          return (
            <AnimateOnScroll key={c.slug} delay={i * 70} className="snap-start">
              <Link
                href={caseHref(c.slug)}
                className="group flex h-full w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-colors hover:border-neutral-300 sm:w-[340px]"
              >
                <CaseVisual
                  study={c}
                  className="h-[168px] w-full border-b border-neutral-100"
                  sizes="340px"
                />
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <Image
                      src={c.logo}
                      alt={`Logo ${c.client}`}
                      width={72}
                      height={17}
                      className="h-[17px] w-auto opacity-50 grayscale"
                    />
                    <span className="mono shrink-0 text-[9.5px] uppercase tracking-[0.08em] text-neutral-400">
                      {c.type}
                    </span>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-neutral-500">
                    {metric ? `${metric.value} sur le ${metric.label}. ${c.summary}` : c.summary}
                  </p>
                </div>
              </Link>
            </AnimateOnScroll>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Visuel de tête d'une réalisation, par ordre de force :
 *   1. le chiffre, quand il y en a un — c'est ce qui se lit le plus vite ;
 *   2. la capture, quand elle existe ;
 *   3. à défaut, le type de projet en grand, sur la trame du site.
 * Le troisième cas doit ressembler à un choix, pas à un trou.
 */
function CaseVisual({
  study,
  className,
  sizes,
}: {
  study: (typeof PUBLISHED_CASES)[number];
  className: string;
  sizes: string;
}) {
  const metric = study.metrics[0];

  if (metric)
    return (
      <div className={`flex items-center justify-center bg-[#0a0a0a] ${className}`}>
        <span
          className="text-5xl font-bold tracking-[-0.03em] text-white"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {metric.value}
        </span>
      </div>
    );

  if (study.photo)
    return <Photo src={study.photo} alt={study.photoAlt} className={className} sizes={sizes} />;

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-neutral-50 ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#0a0a0a 1px,transparent 1px),linear-gradient(90deg,#0a0a0a 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <span
        className="relative px-6 text-center text-xl font-bold leading-tight tracking-tight text-neutral-300"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {study.type}
      </span>
    </div>
  );
}
