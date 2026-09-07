import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import PageCTA from "../../components/PageCTA";
import AnimateOnScroll from "../../components/AnimateOnScroll";
import { Photo } from "../../components/Photo";
import MetierVisual from "../../components/MetierVisual";
import ShotOverlay from "../../components/ShotOverlay";
import { METIERS, getMetier } from "../../content/metiers";
import { getService } from "../../content/services";
import { getCase } from "../../content/cases";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "../../lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return METIERS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const metier = getMetier(slug);
  if (!metier) return {};
  const path = `/metiers/${metier.slug}`;
  return {
    title: metier.metaTitle,
    description: metier.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: metier.metaTitle,
      description: metier.metaDescription,
      url: path,
      type: "website",
      locale: "fr_CH",
    },
  };
}

export default async function MetierPage({ params }: Props) {
  const { slug } = await params;
  const metier = getMetier(slug);
  if (!metier) notFound();

  const path = `/metiers/${metier.slug}`;
  const trail = [
    { name: "Accueil", path: "/" },
    { name: "Métiers", path: "/metiers" },
    { name: metier.name, path },
  ];
  const study = metier.relatedCase ? getCase(metier.relatedCase) : undefined;
  const services = metier.relatedServices.map(getService).filter((s) => s !== undefined);
  const others = METIERS.filter((m) => m.slug !== metier.slug);
  const proven = metier.status === "realise";

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={faqJsonLd(metier.faq)} />
      <JsonLd
        data={serviceJsonLd({
          name: metier.h1,
          description: metier.metaDescription,
          path,
        })}
      />
      <Navbar />

      <main>
        {/* ── Promesse ── */}
        <section className="px-6 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-[1240px]">
            <Breadcrumbs trail={trail} />

            {/* Le badge sépare le prouvé du projeté, et doit rester visible :
                laisser croire à une expérience qu'on n'a pas se paie au premier appel. */}
            <div
              className={`mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 ${
                proven ? "border-green-200 bg-green-50" : "border-neutral-200"
              }`}
            >
              <span className={`h-[5px] w-[5px] rounded-full ${proven ? "bg-green-500" : "bg-neutral-300"}`} />
              <span className={`mono text-[10.5px] tracking-[0.1em] ${proven ? "text-green-700" : "text-neutral-500"}`}>
                {proven ? "MÉTIER DÉJÀ ÉQUIPÉ" : "PROJECTION — PAS ENCORE DE CLIENT DANS CE MÉTIER"}
              </span>
            </div>

            <h1
              className="mb-6 max-w-3xl text-4xl font-bold leading-[1.06] tracking-[-0.028em] text-[#0a0a0a] md:text-5xl lg:text-[52px]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {metier.h1}
            </h1>
            <p className="max-w-[680px] text-base leading-relaxed text-neutral-500 md:text-[17px]">
              {metier.intro}
            </p>
          </div>
        </section>

        {/* ── Le miroir : la section qui décide ── */}
        <section className="px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-10 lg:flex-row lg:gap-[90px]">
            <AnimateOnScroll className="lg:w-[340px] lg:shrink-0">
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                Ce qu&apos;on entend
              </p>
              <h2
                className="mb-4 text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[36px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Si vous vous reconnaissez ici, on peut faire quelque chose.
              </h2>
              <p className="text-[14.5px] leading-relaxed text-neutral-500">
                Aujourd&apos;hui, tout ça vit dans{" "}
                {metier.currentTools.slice(0, -1).join(", ")} et {metier.currentTools.slice(-1)}.
              </p>
            </AnimateOnScroll>

            <ul className="flex-1">
              {metier.frictions.map((f, i) => (
                <AnimateOnScroll key={f} delay={i * 60}>
                  <li className="flex items-start gap-4 border-b border-neutral-100 py-5 last:border-0">
                    <span className="mono mt-1 shrink-0 text-[10px] text-neutral-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15.5px] leading-relaxed text-neutral-700">{f}</span>
                  </li>
                </AnimateOnScroll>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Ce qu'on construirait, dans leurs termes ── */}
        <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <AnimateOnScroll>
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                Ce que nous construisons
              </p>
              <h2
                className="mb-11 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Trois briques, et rien d&apos;autre au départ.
              </h2>
            </AnimateOnScroll>

            <div className="grid gap-3.5 md:grid-cols-3">
              {metier.modules.map((m, i) => (
                <AnimateOnScroll key={m.title} delay={i * 80}>
                  <div className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-white p-5">
                    {m.visual ? (
                      <div className="relative mb-5 overflow-hidden rounded-xl border border-neutral-100">
                        <Photo
                          src={m.visual.src}
                          alt={m.visual.alt}
                          className="aspect-[16/10] w-full rounded-none"
                          sizes="(max-width: 768px) 100vw, 380px"
                        />
                        <ShotOverlay kind={m.kind} />
                      </div>
                    ) : (
                      <div className="mb-5">
                        <MetierVisual kind={m.kind} />
                      </div>
                    )}
                    <div className="px-2 pb-2">
                      <div className="mono mb-3 text-[10px] tracking-[0.14em] text-neutral-300">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3
                        className="mb-2.5 text-base font-bold text-[#0a0a0a]"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {m.title}
                      </h3>
                      <p className="text-[13.5px] leading-relaxed text-neutral-500">{m.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {metier.visual && (
              <AnimateOnScroll delay={160}>
                <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-100 bg-white">
                  <Photo
                    src={metier.visual.src}
                    alt={metier.visual.alt}
                    className="aspect-[16/9] w-full rounded-none"
                    sizes="(max-width: 1024px) 100vw, 1240px"
                  />
                  {!proven && (
                    <p className="mono border-t border-neutral-100 px-6 py-3 text-[9.5px] tracking-[0.1em] text-neutral-400">
                      MAQUETTE — CE QUE NOUS CONSTRUIRIONS, PAS UNE CAPTURE D&apos;UN OUTIL EXISTANT
                    </p>
                  )}
                </div>
              </AnimateOnScroll>
            )}

            {metier.constraint && (
              <AnimateOnScroll delay={200}>
                <div className="mt-4 rounded-2xl bg-[#0a0a0a] p-7 md:p-9">
                  <p className="mono mb-3 text-[10px] tracking-[0.14em] text-white/35">
                    LA CONTRAINTE QU&apos;UN GÉNÉRALISTE OUBLIE
                  </p>
                  <p className="max-w-3xl text-[15.5px] leading-relaxed text-white/75">
                    {metier.constraint}
                  </p>
                </div>
              </AnimateOnScroll>
            )}
          </div>
        </section>

        {/* ── La preuve : l'étude de cas vit ici, pas sur une page jumelle ── */}
        <section className="px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            {study ? (
              <>
                <AnimateOnScroll>
                  <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                    Déjà construit — {study.client}
                  </p>
                  <h2
                    className="mb-5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[36px]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Ce qui a changé, ligne par ligne.
                  </h2>
                  <p className="mb-9 max-w-[680px] text-[15.5px] leading-relaxed text-neutral-500">
                    {study.summary}
                  </p>
                </AnimateOnScroll>

                {study.metrics.length > 0 && (
                  <div className="mb-4 grid gap-3.5 sm:grid-cols-3">
                    {study.metrics.map((m) => (
                      <div key={m.label} className="rounded-2xl bg-[#0a0a0a] p-8 text-center">
                        <p
                          className="mb-1.5 text-5xl font-bold tracking-[-0.03em] text-white"
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {m.value}
                        </p>
                        <p className="text-[13px] text-white/50">{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                <AnimateOnScroll delay={80}>
                  <div className="overflow-hidden rounded-2xl border border-neutral-100">
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
                </AnimateOnScroll>

                <div className="mt-11 grid gap-11 md:grid-cols-2">
                  <AnimateOnScroll>
                    <h3
                      className="mb-5 text-xl font-bold text-[#0a0a0a]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      Ce qui a été livré
                    </h3>
                    <ul className="space-y-3">
                      {study.delivered.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-600">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-1 shrink-0 text-[#0a0a0a]" aria-hidden>
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </AnimateOnScroll>
                  <AnimateOnScroll delay={80}>
                    <h3
                      className="mb-5 text-xl font-bold text-[#0a0a0a]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      Ce que ça a changé
                    </h3>
                    <ul className="space-y-3">
                      {study.gains.map((g) => (
                        <li key={g} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-600">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-300" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </AnimateOnScroll>
                </div>

                {study.quote && (
                  <AnimateOnScroll delay={140}>
                    <blockquote className="mt-11 rounded-2xl bg-neutral-50 p-9">
                      <p className="text-lg leading-relaxed text-[#0a0a0a]">« {study.quote.text} »</p>
                      <p className="mt-5 text-sm font-semibold text-[#0a0a0a]">{study.quote.author}</p>
                      <p className="text-xs text-neutral-400">
                        {study.quote.role} · {study.client}
                      </p>
                    </blockquote>
                  </AnimateOnScroll>
                )}
              </>
            ) : (
              <AnimateOnScroll>
                <div className="max-w-[760px]">
                  <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                    Soyons clairs
                  </p>
                  <h2
                    className="mb-5 text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[36px]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Nous n&apos;avons pas encore équipé ce métier.
                  </h2>
                  <p className="mb-4 text-[15.5px] leading-relaxed text-neutral-500">
                    Nous préférons l&apos;écrire plutôt que de le laisser deviner. Ce que nous
                    savons faire, c&apos;est relier des outils qui ne se parlent pas et supprimer la
                    ressaisie — nous l&apos;avons construit pour d&apos;autres métiers dont le
                    problème de fond est le même.
                  </p>
                  <p className="text-[15.5px] leading-relaxed text-neutral-500">
                    Être le premier de son métier a d&apos;ailleurs un avantage concret :{" "}
                    <span className="font-semibold text-[#0a0a0a]">
                      c&apos;est vous qui cadrez l&apos;outil
                    </span>
                    , sans hériter des compromis faits pour quelqu&apos;un d&apos;autre.
                  </p>
                  <Link
                    href="/realisations"
                    className="mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-neutral-200 px-7 py-3.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:text-[#0a0a0a]"
                  >
                    Voir ce que nous avons construit ailleurs <span aria-hidden>→</span>
                  </Link>
                </div>
              </AnimateOnScroll>
            )}
          </div>
        </section>

        {metier.gallery.length > 0 && (
          <section className="border-t border-neutral-100 py-20 md:py-24">
            <div className="mx-auto max-w-[1240px] px-6 md:px-10">
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                L&apos;outil en images
              </p>
              <h2
                className="mb-9 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[36px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {proven ? "À quoi ça ressemble vraiment." : "À quoi ça ressemblerait."}
              </h2>
            </div>
            <div className="mx-auto flex max-w-[1240px] snap-x snap-mandatory gap-3.5 overflow-x-auto px-6 pb-4 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {metier.gallery.map((g) => (
                <figure key={g.src} className="w-[420px] shrink-0 snap-start">
                  <div className="relative overflow-hidden rounded-2xl border border-neutral-100">
                    <Photo
                      src={g.src}
                      alt={g.alt}
                      className="aspect-[16/10] w-full rounded-none"
                      sizes="420px"
                    />
                    <ShotOverlay kind="planning" />
                  </div>
                  <figcaption className="mt-3 text-[13px] leading-relaxed text-neutral-500">
                    {g.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mx-auto max-w-[1240px] px-6 md:px-10">
              {!proven && (
                <p className="mono mt-3 text-[9.5px] tracking-[0.1em] text-neutral-400">
                  MAQUETTES — CE QUE NOUS CONSTRUIRIONS, PAS DES CAPTURES D&apos;UN OUTIL EXISTANT
                </p>
              )}
              {metier.visualNote && (
                <p className="mt-3 text-xs text-neutral-400">{metier.visualNote}</p>
              )}
            </div>
          </section>
        )}

        {/* ── Objections propres au métier ── */}
        <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-10 lg:flex-row lg:gap-[90px]">
            <div className="lg:w-[330px] lg:shrink-0">
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                Questions fréquentes
              </p>
              <h2
                className="text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[36px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Ce qu&apos;on nous demande dans ce métier.
              </h2>
            </div>
            <div className="flex-1">
              {metier.faq.map(({ q, a }, i) => (
                <div key={q} className={i < metier.faq.length - 1 ? "border-b border-neutral-100 pb-6" : ""}>
                  <h3
                    className={`mb-2.5 text-[15.5px] font-bold text-[#0a0a0a] ${i > 0 ? "mt-6" : ""}`}
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {q}
                  </h3>
                  <p className="max-w-[660px] text-[13.5px] leading-[1.7] text-neutral-500">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Maillage interne ── */}
        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <p className="mono mb-4 text-[10px] tracking-[0.14em] text-neutral-300">
                  CE QUE ÇA MOBILISE CHEZ NOUS
                </p>
                <ul className="space-y-2.5">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="text-sm text-neutral-600 hover:text-[#0a0a0a]">
                        {s.name} <span aria-hidden>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mono mb-4 text-[10px] tracking-[0.14em] text-neutral-300">AUTRES MÉTIERS</p>
                <ul className="space-y-2.5">
                  {others.map((m) => (
                    <li key={m.slug}>
                      <Link href={`/metiers/${m.slug}`} className="text-sm text-neutral-600 hover:text-[#0a0a0a]">
                        {m.label} <span aria-hidden>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <PageCTA
          title={`Parlons de votre ${metier.name.toLowerCase().replace(/s$/, "")}.`}
          desc="Un premier échange de 30 minutes, sans engagement. On regarde vos processus réels et on vous dit honnêtement si un outil sur mesure vaut le coup chez vous."
        />
      </main>

      <Footer />
    </>
  );
}
