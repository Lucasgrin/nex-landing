import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import AnimateOnScroll from "../../components/AnimateOnScroll";
import BeforeAfter from "../../components/BeforeAfter";
import CaseStats from "../../components/CaseStats";
import ServiceVisual from "../../components/services/ServiceVisual";
import ServiceIcon from "../../components/services/ServiceIcon";
import ServiceSteps from "../../components/services/ServiceSteps";
import ConversionDuo from "../../components/services/ConversionDuo";
import StickyCta from "../../components/services/StickyCta";
import { SERVICES, getService } from "../../content/services";
import { getStudy, caseHref } from "../../content/cases";
import { CITIES } from "../../content/cities";
import { SITE } from "../../content/site";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "../../lib/seo";

type Props = { params: Promise<{ slug: string }> };

/** Toutes les pages service sont pré-rendues au build : rien de dynamique ici. */
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const path = `/services/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: path,
      type: "website",
      locale: "fr_CH",
    },
  };
}

/**
 * La page d'un service.
 *
 * Elle doit répondre à trois questions, dans cet ordre, sans qu'on ait à
 * lire un paragraphe : qu'est-ce que c'est (le titre, une phrase, un écran
 * type), est-ce pour moi (la section noire), qu'est-ce que ça change (avant
 * / après). Tout le reste — livrables, preuves, déroulé, FAQ — sert celui
 * qui veut vérifier avant d'appeler.
 *
 * Deux sorties à chaque étage : l'appel pour qui est prêt, le diagnostic
 * pour qui veut d'abord un chiffre. Sur téléphone, une barre fixe les garde
 * à portée de pouce.
 */
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const trail = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path },
  ];
  const cases = service.relatedCases
    .map(getStudy)
    .filter((c) => c !== undefined)
    .slice(0, 3);
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  const glance = [
    { label: "Pour qui", text: service.glance.forWho },
    { label: "Ce que ça remplace", text: service.glance.replaces },
    { label: "Ce que vous gagnez", text: service.glance.gain },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={serviceJsonLd({ name: service.name, description: service.metaDescription, path })} />
      <JsonLd data={faqJsonLd(service.faq)} />

      <Navbar />
      <main>
        {/* ── 1. Ce que c'est : un titre, une phrase, un écran ── */}
        <section className="px-6 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-[1240px]">
            <Breadcrumbs trail={trail} />
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              <div>
                <p className="mono mb-4 flex items-center gap-2.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-500">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0a0a0a] text-white">
                    <ServiceIcon slug={service.slug} size={15} />
                  </span>
                  {service.name}
                </p>
                <h1
                  className="text-4xl font-bold leading-[1.06] tracking-[-0.028em] text-[#0a0a0a] md:text-5xl lg:text-[52px]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {service.h1}
                </h1>
                <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-neutral-600 md:text-[19px]">
                  {service.pitch}
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={SITE.calUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[#0a0a0a] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-neutral-800"
                  >
                    Réserver un appel
                    <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                  </a>
                  <Link
                    href="/diagnostic"
                    className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-neutral-300 px-7 text-[15px] font-semibold text-[#0a0a0a] transition-colors hover:border-[#0a0a0a]"
                  >
                    Diagnostic gratuit · 5 min
                  </Link>
                </div>
                <p className="mono mt-5 text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                  30 min · Sans engagement · Hébergement en Suisse possible
                </p>
              </div>

              <ServiceVisual slug={service.slug} />
            </div>

            {/* En un coup d'œil : lu avant tout le reste. La dernière carte,
                le gain, est en noir — c'est elle qu'on doit retenir. */}
            <div className="mt-16 grid gap-3 md:grid-cols-3">
              {glance.map((g, i) => (
                <AnimateOnScroll key={g.label} delay={i * 70} className="h-full">
                  <div
                    className={`flex h-full flex-col rounded-2xl p-6 md:p-7 ${
                      i === 2 ? "bg-[#0a0a0a]" : "border border-neutral-200 bg-white"
                    }`}
                  >
                    <p
                      className={`mono flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] ${
                        i === 2 ? "text-white/45" : "text-neutral-400"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${i === 2 ? "bg-green-400" : "bg-neutral-300"}`} aria-hidden />
                      {g.label}
                    </p>
                    <p className={`mt-4 text-[16px] leading-relaxed ${i === 2 ? "font-medium text-white" : "text-neutral-700"}`}>
                      {g.text}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. Est-ce pour moi ? Le seul fond noir plein de la page. ── */}
        <section className="mt-20 bg-[#0a0a0a] px-6 py-20 md:mt-24 md:px-10 md:py-24">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-12 lg:flex-row lg:gap-20">
            <AnimateOnScroll className="lg:w-[400px] lg:shrink-0">
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-white/35">Le signal</p>
              <h2
                className="text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Vous vous reconnaissez&nbsp;?
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/55">
                Si une seule de ces phrases décrit votre semaine, ce service est fait pour vous.
              </p>
              <a
                href={SITE.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex min-h-[46px] items-center gap-2 rounded-full bg-white px-6 text-[14.5px] font-semibold text-[#0a0a0a] transition-colors hover:bg-neutral-100"
              >
                En parler 30 minutes
                <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </a>
            </AnimateOnScroll>

            <ul className="flex-1 divide-y divide-white/10 border-y border-white/10">
              {service.symptoms.map((s, i) => (
                <li key={s}>
                  <AnimateOnScroll delay={i * 60} className="flex items-start gap-5 py-5">
                    <span className="mono mt-1 shrink-0 text-[11px] text-white/30">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[16px] leading-relaxed text-white/85 md:text-[17px]">{s}</span>
                  </AnimateOnScroll>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 3. Ce qui change, ligne par ligne ── */}
        <section className="px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <AnimateOnScroll>
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">Avant, après</p>
              <h2
                className="mb-11 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Ce qui change, ligne par ligne.
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={80}>
              <BeforeAfter rows={service.beforeAfter} beforeLabel="Aujourd'hui" afterLabel="Avec votre outil" />
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── 4. Ce que nous livrons ── */}
        <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <AnimateOnScroll>
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">Ce que nous livrons</p>
              <h2
                className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Concrètement, dans votre outil.
              </h2>
            </AnimateOnScroll>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {service.delivered.map((d, i) => (
                <AnimateOnScroll key={d.title} delay={i * 60} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 md:p-7">
                    <span className="mono text-[11px] text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                    <p
                      className="mt-8 text-[19px] font-semibold leading-tight tracking-[-0.01em] text-[#0a0a0a]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {d.title}
                    </p>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-neutral-600">{d.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. La preuve : ceux qui l'utilisent déjà ── */}
        {cases.length > 0 && (
          <section className="px-6 py-20 md:px-10 md:py-24">
            <div className="mx-auto max-w-[1240px]">
              <AnimateOnScroll>
                <div className="mb-11 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">La preuve</p>
                    <h2
                      className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      Ils avaient le même problème.
                    </h2>
                  </div>
                  <Link href="/realisations" className="shrink-0 text-sm font-semibold text-neutral-600 hover:text-[#0a0a0a]">
                    Toutes les réalisations <span aria-hidden>→</span>
                  </Link>
                </div>
              </AnimateOnScroll>
              <div className="grid gap-3 md:grid-cols-3">
                {cases.map((c, i) => (
                  <AnimateOnScroll key={c.slug} delay={i * 70} className="h-full">
                    <Link
                      href={caseHref(c.slug)}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-colors hover:border-neutral-400"
                    >
                      <div className="flex h-[110px] items-center border-b border-neutral-100 px-7">
                        <div className="relative h-[34px] w-[140px]">
                          <Image src={c.logo} alt={`Logo ${c.client}`} fill sizes="140px" className="object-contain object-left" />
                        </div>
                      </div>
                      {c.stats.length > 0 && (
                        <CaseStats stats={c.stats} scale="card" className="border-b border-neutral-100 px-7 py-6" />
                      )}
                      <div className="flex flex-1 flex-col p-7">
                        <p className="text-[14.5px] leading-relaxed text-neutral-600">{c.summary}</p>
                        <span className="mt-auto pt-6 text-[13.5px] font-semibold text-[#0a0a0a]">
                          Lire le cas{" "}
                          <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                        </span>
                      </div>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 6. Comment ça démarre ── */}
        <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <AnimateOnScroll>
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">Comment ça démarre</p>
              <h2
                className="mb-11 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                De l&apos;appel à l&apos;outil, sans grand chantier.
              </h2>
            </AnimateOnScroll>
            <ServiceSteps />
          </div>
        </section>

        {/* ── 7. Les questions qu'on nous pose ── */}
        <section className="px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-10 lg:flex-row lg:gap-20">
            <AnimateOnScroll className="lg:w-[400px] lg:shrink-0">
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">Questions fréquentes</p>
              <h2
                className="text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Ce qu&apos;on nous demande avant de se lancer.
              </h2>
            </AnimateOnScroll>
            <div className="flex-1 border-t border-neutral-200">
              {service.faq.map(({ q, a }) => (
                <details key={q} className="group border-b border-neutral-200">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5">
                    <h3
                      className="text-[17px] font-semibold leading-snug text-[#0a0a0a]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {q}
                    </h3>
                    <span className="mt-0.5 shrink-0 text-[20px] leading-none text-neutral-400 transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p className="pb-6 pr-10 text-[15.5px] leading-relaxed text-neutral-600">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. Les deux portes de sortie ── */}
        <div className="border-t border-neutral-100">
          <ConversionDuo title={`Un projet de ${service.name.toLowerCase()} ?`} />
        </div>

        {/* ── 9. Maillage interne ── */}
        <section className="border-t border-neutral-100 px-6 py-16 md:px-10">
          <div className="mx-auto max-w-[1240px]">
            <p className="mono mb-5 text-[10px] uppercase tracking-[0.14em] text-neutral-400">Nos autres expertises</p>
            <div className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-neutral-200 p-4 transition-colors hover:border-neutral-400"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-[#0a0a0a] transition-colors group-hover:bg-[#0a0a0a] group-hover:text-white">
                    <ServiceIcon slug={s.slug} size={17} />
                  </span>
                  <span className="text-[14px] font-semibold text-[#0a0a0a]">{s.name}</span>
                </Link>
              ))}
            </div>
            <p className="mono mb-5 text-[10px] uppercase tracking-[0.14em] text-neutral-400">Où nous intervenons</p>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/logiciel-sur-mesure/${c.slug}`}
                  className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-500 transition-colors hover:border-neutral-400 hover:text-[#0a0a0a]"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
