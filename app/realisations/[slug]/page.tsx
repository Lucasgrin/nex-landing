import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import AnimateOnScroll from "../../components/AnimateOnScroll";
import CaseStats from "../../components/CaseStats";
import CaseChain from "../../components/CaseChain";
import BeforeAfter from "../../components/BeforeAfter";
import CtaInline from "../../components/CtaInline";
import PremierAppel from "../../components/PremierAppel";
import PageCTA from "../../components/PageCTA";
import ToolCarousel from "../../components/ToolCarousel";
import ToolSchema from "../../components/ToolSchema";
import MetierScene from "../../components/MetierScene";
import ArticleCard from "../../components/blog/ArticleCard";
import { articlesForPage, readingMinutes } from "../../content/articles";
import { ALL_STUDIES, PUBLISHED_CASES, getStudy, caseHref } from "../../content/cases";
import { SERVICES } from "../../content/services";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, ORG_ID } from "../../lib/seo";
import { SITE } from "../../content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ALL_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) return {};

  const title = study.seo?.title ?? `${study.client} — ${study.type} sur mesure`;
  const description = study.seo?.description ?? study.summary;
  const path = `/realisations/${study.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "article", locale: "fr_CH" },
  };
}

/**
 * La page d'un métier : une réalisation, ou un cas d'usage type.
 *
 * Il y avait deux types de pages — métier et réalisation — qui racontaient la
 * même histoire dans le même ordre. Il n'y en a plus qu'une : on reconnaît la
 * situation, on mesure ce qu'elle coûte, on voit la bascule, le mécanisme, ce
 * qui a été construit, puis la preuve. Seule la source change : une
 * réalisation constate, un cas d'usage type (`example`) projette — et parle
 * au conditionnel d'un bout à l'autre.
 *
 * Le rythme des fonds fait partie de la grammaire — blanc, blanc, noir, blanc,
 * blanc, gris, blanc, gris. Deux sections de même fond à la suite, et la page
 * redevient un long document qu'on ne lit pas.
 */
export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) notFound();

  const ex = !!study.example;
  const path = `/realisations/${study.slug}`;
  const trail = [
    { name: "Accueil", path: "/" },
    { name: "Réalisations", path: "/realisations" },
    { name: ex ? study.sector : study.client, path },
  ];
  const others = ALL_STUDIES.filter((c) => c.slug !== study.slug);
  // Le même problème de fond, dans d'autres métiers : le maillage qui fait sens.
  const voisins = study.relatedMetiers
    .map(getStudy)
    .filter((c) => c !== undefined);
  // Un cas d'usage type n'a pas de preuve propre. Il emprunte celle des
  // réalisations qui partagent son problème de fond — attribuée, avec le logo.
  const preuves = ex
    ? PUBLISHED_CASES.filter((c) => c.relatedMetiers.includes(study.slug)).slice(0, 3)
    : [];
  const articles = articlesForPage(study.slug).map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    topic: a.topic,
    minutes: readingMinutes(a),
  }));
  const related = SERVICES.filter((s) => s.relatedCases.includes(study.slug));
  // Ce qu'on a fait aux données des captures, dit en une fois pour toute la série.
  const fictives = study.photos.some((ph) => ph.anonymised);
  const floutees = study.photos.some((ph) => ph.masked);
  const cleaned = fictives && floutees ? "fictives ou floutées" : fictives ? "fictives" : floutees ? "floutées" : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.headline ?? `${study.client} — ${study.type} sur mesure`,
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
      {study.faq && <JsonLd data={faqJsonLd(study.faq)} />}

      <Navbar />
      <main>
        {/* ── 1. La promesse, et le CTA disponible tout de suite ──
               Le logo tient la colonne de droite, en grand et en couleurs.
               Il était jusqu'ici réduit à 16 px, grisé, dans une pastille :
               le signe d'identité le plus fort de la page en était l'élément
               le plus faible. Sur une étude de cas, le client est le sujet —
               son logo doit se voir avant qu'on lise son nom. ── */}
        <section className="px-6 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-[1240px]">
            <Breadcrumbs trail={trail} />
            {/* flex-col-reverse en mobile : le logo passe alors avant le
                titre, là où il annonce de qui on parle. Laissé en fin de
                DOM, il se retrouvait sous le bouton d'appel — orphelin. */}
            <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
            <div className="max-w-[680px]">
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                {ex ? study.sector : study.type}
              </p>
              <h1
                className="mb-6 text-4xl font-bold leading-[1.06] tracking-[-0.028em] text-[#0a0a0a] md:text-5xl lg:text-[52px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {study.headline ?? study.client}
              </h1>
              <p className="mb-8 text-base leading-relaxed text-neutral-500 md:text-[17px]">
                {study.summary}
              </p>
              {/* Les métiers que la page regroupe : le lecteur y cherche le
                  sien avant de lire la suite. */}
              {study.trades && (
                <ul className="-mt-2 mb-8 flex flex-wrap gap-2" aria-label="Métiers concernés">
                  {study.trades.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-neutral-200 px-3.5 py-1.5 text-[13px] text-neutral-600"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              <CtaInline label="Réserver un appel" note="30 MIN · SANS ENGAGEMENT" />
            </div>

            {/* Un métier sans client n'a pas de logo à montrer : le titre
                porte la page seul. */}
            {ex ? null : (
              /* Boîte de taille fixe : les logos clients n'ont pas deux fois
                 la même proportion, et sans cadre commun l'un écraserait
                 l'autre d'une page à la suivante. Couleurs d'origine — le
                 gris les faisait disparaître. */
              <div className="shrink-0 lg:pt-4">
                <div className="relative h-[54px] w-[210px] md:h-[68px] md:w-[260px]">
                  <Image
                    src={study.logo}
                    alt={`Logo ${study.client}`}
                    fill
                    sizes="260px"
                    priority
                    className="object-contain object-left lg:object-right"
                  />
                </div>
              </div>
            )}
            </div>
          </div>
        </section>

        {/* ── 2. Le miroir. Quand le métier a sa scène — ce qui arrive sur le
               téléphone un matin ordinaire — on la montre : un prospect ne lit
               pas un paragraphe, il reconnaît un écran. Sinon, le récit. ── */}
        {study.scene ? (
          <section className="px-6 py-20 md:px-10 md:py-24">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-14 lg:flex-row lg:items-center lg:gap-20">
              <AnimateOnScroll className="lg:w-[380px] lg:shrink-0">
                <MetierScene messages={study.scene.messages} />
              </AnimateOnScroll>

              <AnimateOnScroll delay={100} className="flex-1">
                <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                  {ex ? "Une matinée type" : "Avant l'outil"}
                </p>
                <h2
                  className="mb-6 text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Vous reconnaissez ?
                </h2>
                <p className="mb-7 max-w-[68ch] text-base leading-[1.75] text-neutral-600">{study.context}</p>
                <ul className="space-y-3">
                  {study.scene.frictions.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px] leading-relaxed text-neutral-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-300" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mono mt-7 text-[10px] tracking-[0.1em] text-neutral-400">
                  {`${ex ? "AUJOURD'HUI" : "AVANT"} : ${study.scene.currentTools.join(" · ").toUpperCase()}`}
                </p>
              </AnimateOnScroll>
            </div>
          </section>
        ) : (
        <section className="px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-14 lg:flex-row lg:gap-20">
            <AnimateOnScroll className="lg:w-[420px] lg:shrink-0">
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                Avant l&apos;outil
              </p>
              <h2
                className="text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Ce qu&apos;ils vivaient.
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100} className="flex-1">
              <p className="max-w-[68ch] text-base leading-[1.75] text-neutral-600">{study.context}</p>
              {study.beforeAfter.length > 0 && (
                <ul className="mt-8 space-y-3">
                  {study.beforeAfter.map((row) => (
                    <li
                      key={row.before}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-neutral-600"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-300" />
                      {row.before}
                    </li>
                  ))}
                </ul>
              )}
            </AnimateOnScroll>
          </div>
        </section>
        )}

        {/* ── 3. Ce que ça coûtait. Fond noir : c'est le moment où le lecteur
               doit sentir le poids, pas le lire. Seul « Et ensuite ? »
               reprend ce fond, en miroir. ── */}
        <section className="border-y border-neutral-100 bg-[#0a0a0a] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-14 lg:flex-row lg:gap-20">
            <AnimateOnScroll className="lg:w-[420px] lg:shrink-0">
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-white/35">
                Le problème de fond
              </p>
              <h2
                className="text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {ex ? "Ce que ça coûte." : "Ce que ça coûtait."}
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100} className="flex-1">
              <p className="max-w-[68ch] text-[17px] leading-[1.75] text-white/70">{study.problem}</p>
              {study.cost && (
                <div className="mt-10 grid gap-x-8 gap-y-5 border-t border-white/10 pt-8 sm:grid-cols-3">
                  {study.cost.map((c) => (
                    <div key={c.titre}>
                      <p className="mono mb-2 text-[9.5px] uppercase tracking-[0.14em] text-white/35">{c.titre}</p>
                      <p className="text-[13.5px] leading-relaxed text-white/60">{c.texte}</p>
                    </div>
                  ))}
                </div>
              )}
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── 4. La bascule : les chiffres, puis le contraste ligne par ligne ── */}
        <section className="px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <AnimateOnScroll>
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                {ex ? "Ce qui changerait chez vous" : `Ce qui a changé chez ${study.client}`}
              </p>
              <h2
                className="mb-11 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {ex ? "À quoi ressemblerait votre semaine." : "Avant, après. Ligne par ligne."}
              </h2>
            </AnimateOnScroll>

            {study.stats.length > 0 && (
              <AnimateOnScroll>
                <CaseStats stats={study.stats} scale="page" className="mb-3" />
              </AnimateOnScroll>
            )}

            <AnimateOnScroll delay={80}>
              <BeforeAfter
                rows={study.beforeAfter}
                beforeLabel={ex ? "Aujourd'hui" : "Avant"}
                afterLabel={ex ? "Avec votre outil" : "Avec l'outil"}
              />
            </AnimateOnScroll>

            {ex && (
              <p className="mt-4 text-[13px] text-neutral-500">
                Projection : ce que nous construirions pour ce métier, pas un résultat déjà mesuré.
              </p>
            )}
          </div>
        </section>

        {/* ── 4 bis. Le mécanisme : comment l'information traverse la chaîne ── */}
        {study.chain.length > 0 && (
          <section className="px-6 py-20 md:px-10 md:py-24">
            <div className="mx-auto max-w-[1240px]">
              <AnimateOnScroll>
                <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                  Comment ça s&apos;enchaîne
                </p>
                <h2
                  className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  D&apos;un bout à l&apos;autre, sans ressaisie.
                </h2>
                <p className="mt-5 max-w-[660px] text-[15.5px] leading-relaxed text-neutral-500">
                  {`Ces ${study.chain.length} opérations portent sur la même réalité. `}
                  Tant qu&apos;elles vivent dans des outils séparés, la même information doit être
                  reprise à chaque étape — et c&apos;est à chaque reprise qu&apos;on perd du temps
                  et qu&apos;on se trompe.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll delay={80}>
                <CaseChain steps={study.chain} className="mt-12 max-w-[720px]" />
              </AnimateOnScroll>
            </div>
          </section>
        )}

        {/* ── 5. La réponse, et ce qu'elle contient ──
               Une phrase d'accroche lisible, puis quatre briques en cartes : un
               titre qu'on retient, une ligne qui le précise. La version
               précédente — un paragraphe dense à gauche, une liste de phrases
               longues à droite — se lisait comme un cahier des charges. ── */}
        <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <AnimateOnScroll>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
                <div className="lg:w-[420px] lg:shrink-0">
                  <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                    Notre réponse
                  </p>
                  <h2
                    className="text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {ex ? "Ce que nous construirions." : "Ce que nous avons construit."}
                  </h2>
                </div>
                <p className="max-w-[620px] text-[17px] leading-relaxed text-neutral-700 md:text-[19px]">
                  {study.solution}
                </p>
              </div>
            </AnimateOnScroll>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {study.delivered.map((d, i) => (
                <AnimateOnScroll key={d.title} delay={i * 60} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 md:p-7">
                    <span className="mono text-[11px] text-neutral-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className="mt-8 text-[19px] font-semibold leading-tight tracking-[-0.01em] text-[#0a0a0a]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {d.title}
                    </p>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-neutral-600">{d.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Ce que seul quelqu'un qui connaît le métier pouvait prévoir. */}
            {study.constraint && (
              <AnimateOnScroll delay={200}>
                <div className="mt-3 rounded-2xl bg-[#0a0a0a] p-7 md:p-9">
                  <p className="mono mb-3 text-[10px] uppercase tracking-[0.14em] text-white/35">
                    La contrainte qu&apos;un généraliste oublie
                  </p>
                  <p className="max-w-3xl text-[15.5px] leading-relaxed text-white/75">{study.constraint}</p>
                </div>
              </AnimateOnScroll>
            )}
          </div>
        </section>

        {/* ── 6. La preuve : les écrans, chacun légendé. Ils arrivent après le
               récit, jamais avant : une capture répond à une question posée,
               elle ne la pose pas. Toujours présente — sans capture nettoyée,
               l'outil est montré en schéma, dans le même cadre : la page garde
               sa grammaire et son rythme de fonds (sinon deux gris se
               suivent). ── */}
        <section className="px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <AnimateOnScroll>
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                L&apos;outil en fonctionnement
              </p>
              <h2
                className="mb-12 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                À quoi ressemble l&apos;outil.
              </h2>
              <p className="-mt-7 mb-12 max-w-[660px] text-[14.5px] leading-relaxed text-neutral-500">
                {ex
                  ? `Cet outil reste à construire : pas de capture, donc. Voici sa structure — les modules et la chaîne qu'ils couvriraient.`
                  : study.photos.length === 0
                  ? `Les écrans de ${study.client} contiennent les données de ses propres clients. Nous en montrons ici la structure — les modules livrés et la chaîne qu'ils couvrent — sans le contenu.`
                  : cleaned
                    ? `Ces écrans sont ceux de l'outil livré. En revanche, les données visibles sont ${cleaned} : les dossiers de ${study.client} appartiennent à ses clients, pas à nous.`
                    : `Les écrans tels qu'ils ont été livrés, tels que leurs utilisateurs les voient.`}
              </p>
            </AnimateOnScroll>

            {/* Sans capture nettoyée : le schéma. Avec une ou plusieurs : la
                même fenêtre, qui fait tourner les écrans s'il y en a plus
                d'un. Jamais d'empilement — un écran de plus ne doit pas
                rallonger la page d'un écran. */}
            <AnimateOnScroll>
              {study.photos.length === 0 ? (
                <ToolSchema study={study} />
              ) : (
                <ToolCarousel photos={study.photos} alt={study.photoAlt} />
              )}
            </AnimateOnScroll>
          </div>
        </section>

        {study.quote && (
          <section className="px-6 pb-20 md:px-10">
            <div className="mx-auto max-w-[1240px]">
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-10 md:p-12">
                <blockquote
                  className="max-w-3xl text-xl leading-relaxed text-[#0a0a0a] md:text-2xl"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  « {study.quote.text} »
                </blockquote>
                <p className="mt-6 text-sm font-semibold text-[#0a0a0a]">{study.quote.author}</p>
                <p className="text-sm text-neutral-400">
                  {study.quote.role}, {study.client}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── 7. Ce que ça change au quotidien ── */}
        <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-14 lg:flex-row lg:gap-20">
            <AnimateOnScroll className="lg:w-[420px] lg:shrink-0">
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                Au quotidien
              </p>
              <h2
                className="text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {ex ? "Ce que ça changerait." : "Ce que ça change."}
              </h2>
            </AnimateOnScroll>
            <div className="flex-1">
              <ul className="space-y-4">
                {study.gains.map((g, i) => (
                  <AnimateOnScroll key={g} delay={i * 60}>
                    <li className="flex items-start gap-3.5 text-[15.5px] leading-relaxed text-neutral-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-1 shrink-0 text-[#0a0a0a]" aria-hidden>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {g}
                    </li>
                  </AnimateOnScroll>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 7 bis. La preuve empruntée, pour un cas d'usage type. Rien à
               montrer chez ce métier : on montre le même problème de fond,
               déjà résolu ailleurs — avec le nom du client. ── */}
        {preuves.length > 0 && (
          <section className="px-6 py-20 md:px-10 md:py-24">
            <div className="mx-auto max-w-[1240px]">
              <AnimateOnScroll>
                <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                  La preuve
                </p>
                <h2
                  className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Déjà construit ailleurs.
                </h2>
                <p className="mt-5 max-w-[660px] text-[15.5px] leading-relaxed text-neutral-500">
                  Le métier change, le problème de fond non : de l&apos;information produite à un
                  endroit, utilisée à un autre, et quelqu&apos;un au milieu qui recopie. Nous
                  l&apos;avons déjà réglé chez eux.
                </p>
              </AnimateOnScroll>

              <div className="mt-11 grid gap-3 md:grid-cols-3">
                {preuves.map((c, i) => (
                  <AnimateOnScroll key={c.slug} delay={i * 60} className="h-full">
                    <Link
                      href={caseHref(c.slug)}
                      className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-400 md:p-7"
                    >
                      <div className="relative h-8 w-28">
                        <Image src={c.logo} alt={`Logo ${c.client}`} fill sizes="112px" className="object-contain object-left" />
                      </div>
                      <p className="mt-5 text-[15px] leading-relaxed text-neutral-600">{c.summary}</p>
                      <span className="mt-auto pt-6 text-[13.5px] font-semibold text-[#0a0a0a]">
                        Lire le cas{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                      </span>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 7 ter. Et ensuite ? Ce que l'outil pourrait devenir. Les cartes
               en pointillés répondent aux cartes pleines de « Ce que nous
               avons construit » : même grille, mais rien n'y est encore
               livré — et la page le dit. Fond noir, comme « Ce que ça
               coûtait » : la page s'ouvre sur ce que le problème pesait et
               se referme sur ce que l'outil peut encore devenir. ── */}
        {study.next.length > 0 && (
          <section className="bg-[#0a0a0a] px-6 py-20 md:px-10 md:py-24">
            <div className="mx-auto max-w-[1240px]">
              <AnimateOnScroll>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
                  <div className="lg:w-[420px] lg:shrink-0">
                    <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-white/35">
                      Et ensuite ?
                    </p>
                    <h2
                      className="text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-[40px]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      Ce n&apos;est que le début.
                    </h2>
                  </div>
                  <p className="max-w-[620px] text-[15.5px] leading-relaxed text-white/60">
                    {ex
                      ? `Un outil sur mesure n'est jamais figé : il grandit avec l'entreprise, une itération après l'autre. Une fois la base en place, voici ce qu'on pourrait y ajouter.`
                      : `Un outil sur mesure n'est jamais figé : il grandit avec l'entreprise, une itération après l'autre. Voici quelques pistes de ce que celui de ${study.client} pourrait devenir — des idées, pas des fonctionnalités déjà livrées.`}
                  </p>
                </div>
              </AnimateOnScroll>

              <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {study.next.map((n, i) => (
                  <AnimateOnScroll key={n.title} delay={i * 60} className="h-full">
                    <div className="flex h-full flex-col rounded-2xl border border-dashed border-white/20 p-6 md:p-7">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 text-green-400" aria-hidden>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                      <p
                        className="mt-6 text-[17px] font-semibold leading-tight tracking-[-0.01em] text-white"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {n.title}
                      </p>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{n.desc}</p>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>

              <AnimateOnScroll>
                <p
                  className="mt-12 text-2xl font-bold leading-tight tracking-tight text-white md:text-[28px]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  La seule limite, c&apos;est ce que vous imaginez.
                </p>
              </AnimateOnScroll>
            </div>
          </section>
        )}

        {/* ── 7 quater. Les objections du métier ── */}
        {study.faq && study.faq.length > 0 && (
          <section className="border-b border-neutral-100 bg-neutral-50 px-6 py-20 md:px-10 md:py-24">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-10 lg:flex-row lg:gap-20">
              <AnimateOnScroll className="lg:w-[420px] lg:shrink-0">
                <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                  Questions fréquentes
                </p>
                <h2
                  className="text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Ce qu&apos;on nous demande dans ce métier.
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll delay={100} className="flex-1">
                {study.faq.map(({ q, a }, i) => (
                  <div key={q} className={i > 0 ? "mt-6 border-t border-neutral-200 pt-6" : ""}>
                    <h3
                      className="mb-2.5 text-[16px] font-semibold text-[#0a0a0a]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {q}
                    </h3>
                    <p className="max-w-[68ch] text-[15px] leading-relaxed text-neutral-600">{a}</p>
                  </div>
                ))}
              </AnimateOnScroll>
            </div>
          </section>
        )}

        {/* ── 8. Lever le risque ── */}
        <PremierAppel ctaLabel="Parler de votre situation" />

        {/* ── 9. Le même problème, ailleurs ── */}
        <section className="border-t border-neutral-100 px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <AnimateOnScroll>
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                Le même problème, ailleurs
              </p>
              <h2
                className="mb-5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {ex ? "Ce problème n'est pas propre à votre métier." : `Ce problème n'est pas propre à ${study.client}.`}
              </h2>
              <p className="mb-9 max-w-[660px] text-[15.5px] leading-relaxed text-neutral-500">
                Le métier change, le problème de fond non : des équipes qui produisent
                l&apos;information ailleurs que là où elle est utilisée, et quelqu&apos;un au
                milieu qui recopie. L&apos;outil qui répond à ça se ressemble d&apos;un métier à
                l&apos;autre — c&apos;est le vocabulaire et les règles qui diffèrent.
              </p>
            </AnimateOnScroll>

            {voisins.length > 0 && (
              <div className="mb-10 grid gap-3 md:grid-cols-2">
                {voisins.map((c, i) => (
                  <AnimateOnScroll key={c.slug} delay={i * 60} className="h-full">
                    <Link
                      href={caseHref(c.slug)}
                      className="group flex h-full flex-col rounded-2xl border border-neutral-200 p-6 transition-colors hover:border-neutral-400 md:p-7"
                    >
                      <p className="mono text-[10px] uppercase tracking-[0.14em] text-neutral-400">
                        {c.sector}
                      </p>
                      <p
                        className="mt-3 text-[19px] font-semibold leading-tight tracking-[-0.01em] text-[#0a0a0a]"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {c.headline ?? c.client}
                      </p>
                      <p className="mt-2.5 text-[14.5px] leading-relaxed text-neutral-500">{c.summary}</p>
                      <span className="mt-auto pt-6 text-[13.5px] font-semibold text-[#0a0a0a]">
                        {c.example ? "Découvrir" : "Lire le cas"}{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                      </span>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>
            )}

            <AnimateOnScroll>
              <Link
                href="/realisations"
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0a0a0a] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Voir tous les métiers
                <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── 10. Maillage interne ── */}
        <section className="border-t border-neutral-100 px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[1240px]">
            {/* Les articles du blog sur ce métier : le lecteur qui hésite
                encore trouve une réponse à la question qu'il se pose. */}
            {articles.length > 0 && (
              <>
                <p className="mono mb-5 text-[10px] uppercase tracking-[0.14em] text-neutral-400">
                  Pour aller plus loin
                </p>
                <div className="mb-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {articles.map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </>
            )}
            {related.length > 0 && (
              <>
                <p className="mono mb-5 text-[10px] uppercase tracking-[0.14em] text-neutral-400">
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
            <p className="mono mb-5 text-[10px] uppercase tracking-[0.14em] text-neutral-400">
              Autres métiers
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {others.map((c) => (
                <Link
                  key={c.slug}
                  href={caseHref(c.slug)}
                  className="group rounded-2xl border border-neutral-100 p-6 transition-all hover:border-neutral-300 hover:shadow-sm"
                >
                  <p className="text-base font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {c.sector}
                  </p>
                  <p className="mt-1 text-xs text-neutral-400">{c.example ? c.type : c.client}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <PageCTA
          title="Et si vous aviez le vôtre ?"
          desc={`${ex ? "Tout part d'un périmètre réduit" : `${study.client} est parti d'un périmètre réduit`}, pas d'un grand chantier. Décrivez-nous votre situation en 30 minutes : nous vous dirons franchement si le sur-mesure est la bonne réponse, ou si une solution plus simple suffit.`}
        />
      </main>
      <Footer />
    </>
  );
}
