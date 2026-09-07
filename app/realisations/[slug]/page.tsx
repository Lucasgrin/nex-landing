import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import PageCTA from "../../components/PageCTA";
import { Photo } from "../../components/Photo";
import { CASES, PUBLISHED_CASES, STANDALONE_CASES, getCase, caseHref } from "../../content/cases";
import { SERVICES } from "../../content/services";
import { getMetier } from "../../content/metiers";
import { JsonLd, breadcrumbJsonLd, ORG_ID } from "../../lib/seo";
import { SITE } from "../../content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return STANDALONE_CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) return {};

  const title = `${study.client} — ${study.type} sur mesure`;
  const path = `/realisations/${study.slug}`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: path },
    openGraph: { title, description: study.summary, url: path, type: "article", locale: "fr_CH" },
  };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();

  const path = `/realisations/${study.slug}`;
  const trail = [
    { name: "Accueil", path: "/" },
    { name: "Réalisations", path: "/realisations" },
    { name: study.client, path },
  ];
  const others = STANDALONE_CASES.filter((c) => c.slug !== study.slug);
  // Le problème de fond dépasse le métier du client : c'est ce qui transforme
  // une étude de cas en argument pour un prospect d'un autre secteur.
  const metiers = study.relatedMetiers.map(getMetier).filter((m) => m !== undefined);
  const related = SERVICES.filter((s) => s.relatedCases.includes(study.slug));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${study.client} — ${study.type} sur mesure`,
    description: study.summary,
    url: `${SITE.url}${path}`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: study.type,
    inLanguage: "fr-CH",
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={articleJsonLd} />

      <Navbar />
      <main className="pt-32">
        <section className="px-6 pb-14">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs trail={trail} />
            <div className="mb-7 flex items-center gap-4">
              <Image
                src={study.logo}
                alt={`Logo ${study.client}`}
                width={100}
                height={34}
                className="h-8 w-auto opacity-60 grayscale"
              />
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-500">
                {study.type}
              </span>
            </div>
            <h1
              className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#0a0a0a] md:text-5xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {study.client}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">{study.summary}</p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-4xl">
            <Photo
              src={study.photo}
              alt={study.photoAlt}
              caption={`${study.client} — ${study.type}`}
              className="aspect-[16/9] w-full"
              sizes="(max-width: 1024px) 100vw, 900px"
              eager
            />
          </div>
        </section>

        {study.metrics.length > 0 && (
          <section className="px-6 pb-20">
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
              {study.metrics.map((m) => (
                <div key={m.label} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-8">
                  <p className="text-4xl font-bold leading-none text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {m.value}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">{m.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {study.beforeAfter.length > 0 && (
          <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-20 md:px-10 md:py-24">
            <div className="mx-auto max-w-[1000px]">
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                Avant / après
              </p>
              <h2
                className="mb-11 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[36px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Ce qui a changé, ligne par ligne.
              </h2>

              <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white">
                <div className="grid grid-cols-[1fr_44px_1fr] items-center border-b border-neutral-100 bg-neutral-50 px-6 py-3.5">
                  <span className="mono text-[9.5px] tracking-[0.14em] text-neutral-400">AVANT</span>
                  <span />
                  <span className="mono text-[9.5px] tracking-[0.14em] text-[#0a0a0a]">APRÈS</span>
                </div>
                {study.beforeAfter.map((row) => (
                  <div
                    key={row.before}
                    className="grid grid-cols-[1fr_44px_1fr] items-center border-b border-neutral-50 px-6 py-5 last:border-0"
                  >
                    <span className="text-[13.5px] leading-relaxed text-neutral-400">{row.before}</span>
                    <span className="flex justify-center">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4d4d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12h13M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <span className="text-[13.5px] font-medium leading-relaxed text-[#0a0a0a]">{row.after}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-10 md:grid-cols-3">
                {([["Le contexte", study.context], ["Le problème", study.problem], ["Notre réponse", study.solution]] as const)
                  .filter(([, v]) => Boolean(v))
                  .map(([label, value]) => (
                    <div key={label}>
                      <p className="mono mb-2.5 text-[9.5px] uppercase tracking-[0.14em] text-neutral-400">{label}</p>
                      <p className="text-[13.5px] leading-relaxed text-neutral-500">{value}</p>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-4xl gap-14 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Ce que nous avons livré
              </h2>
              <ul className="space-y-3">
                {study.delivered.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-2xl font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Les résultats
              </h2>
              <ul className="space-y-3">
                {study.gains.map((g) => (
                  <li key={g} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-600">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-1 shrink-0 text-[#0a0a0a]" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {study.quote && (
          <section className="px-6 pb-24">
            <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-100 bg-neutral-50 p-12">
              <blockquote
                className="text-xl leading-relaxed text-[#0a0a0a] md:text-2xl"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                « {study.quote.text} »
              </blockquote>
              <p className="mt-6 text-sm font-semibold text-[#0a0a0a]">{study.quote.author}</p>
              <p className="text-sm text-neutral-400">
                {study.quote.role} · {study.client}
              </p>
            </div>
          </section>
        )}

        <section className="border-t border-neutral-100 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            {related.length > 0 && (
              <>
                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  Expertises mobilisées
                </p>
                <div className="mb-12 flex flex-wrap gap-2">
                  {related.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-500 transition-colors hover:border-neutral-400 hover:text-[#0a0a0a]"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-neutral-400">Autres réalisations</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {others.map((c) => (
                <Link
                  key={c.slug}
                  href={caseHref(c.slug)}
                  className="group rounded-2xl border border-neutral-100 p-6 transition-all hover:border-neutral-300 hover:shadow-sm"
                >
                  <p className="text-base font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {c.client}
                  </p>
                  <p className="mt-1 text-xs text-neutral-400">{c.type}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {metiers.length > 0 && (
          <section className="border-t border-neutral-100 px-6 py-20 md:px-10 md:py-24">
            <div className="mx-auto max-w-[1000px]">
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                Le même problème, ailleurs
              </p>
              <h2
                className="mb-5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[36px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Ce n&apos;est pas un problème de {study.sector.toLowerCase()}.
              </h2>
              <p className="mb-8 max-w-[660px] text-[15.5px] leading-relaxed text-neutral-500">
                Le métier change, le problème de fond non : des équipes qui produisent
                l&apos;information ailleurs que là où elle est utilisée, et quelqu&apos;un au milieu
                qui recopie. L&apos;outil qui répond à ça se ressemble d&apos;un métier à
                l&apos;autre — c&apos;est le vocabulaire et les règles qui diffèrent.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {metiers.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/metiers/${m.slug}`}
                    className="group rounded-2xl border border-neutral-100 p-6 transition-colors hover:border-neutral-300"
                  >
                    <p className="text-base font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {m.label}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
                      {m.status === "realise" ? "Métier déjà équipé" : "Ce que nous construirions"}{" "}
                      <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <PageCTA
          title={`Et si vous aviez le vôtre ?`}
          desc={`${study.client} est parti d'un périmètre réduit, pas d'un grand chantier. Décrivez-nous votre situation en 30 minutes : nous vous dirons franchement si le sur-mesure est la bonne réponse, ou si une solution plus simple suffit.`}
        />
      </main>
      <Footer />
    </>
  );
}
