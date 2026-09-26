import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import AnimateOnScroll from "../components/AnimateOnScroll";
import CaseStudies from "../components/CaseStudies";
import ServiceIcon from "../components/services/ServiceIcon";
import ServiceVisual from "../components/services/ServiceVisual";
import ServiceSteps from "../components/services/ServiceSteps";
import ConversionDuo from "../components/services/ConversionDuo";
import StickyCta from "../components/services/StickyCta";
import { SERVICES } from "../content/services";
import { SITE } from "../content/site";
import { JsonLd, breadcrumbJsonLd } from "../lib/seo";

const TITLE = "Nos services · Logiciels métier sur mesure pour PME";
const DESCRIPTION =
  "CRM, ERP, portails clients, applications métier, automatisations et agents IA sur mesure pour les PME de Suisse romande. Partez de votre problème, on vous montre l'outil.";

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

/**
 * L'index des services.
 *
 * Un prospect ne cherche pas un « ERP » : il a des stocks et une facturation
 * qui ne se parlent pas. La page part donc de son problème, dans ses mots,
 * et le mène au bon service — le jargon n'arrive qu'une fois qu'il s'est
 * reconnu. Les cartes viennent ensuite, pour qui sait déjà ce qu'il cherche.
 */
export default function ServicesIndex() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <Navbar />
      <main>
        {/* ── En-tête ── */}
        <section className="px-6 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-[1240px]">
            <Breadcrumbs trail={trail} />
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">Services</p>
                <h1
                  className="text-4xl font-bold leading-[1.06] tracking-[-0.028em] text-[#0a0a0a] md:text-5xl lg:text-[52px]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Des logiciels construits autour de votre façon de travailler.
                </h1>
                <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-neutral-600 md:text-[19px]">
                  Six expertises, un seul principe : on part de vos process réels, jamais d&apos;un
                  modèle standard.
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
                    Pas sûr&nbsp;? Diagnostic gratuit · 5 min
                  </Link>
                </div>
              </div>
              <ServiceVisual slug="automatisation-processus" className="hidden md:block" />
            </div>
          </div>
        </section>

        {/* ── Par où commencer : le problème, dans les mots du prospect ── */}
        <section className="px-6 pt-20 md:px-10 md:pt-24">
          <div className="mx-auto max-w-[1240px]">
            <AnimateOnScroll>
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">Par où commencer</p>
              <h2
                className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Choisissez la phrase qui vous ressemble.
              </h2>
            </AnimateOnScroll>
            <ul className="mt-10 border-t border-neutral-200">
              {SERVICES.map((s, i) => (
                <li key={s.slug}>
                  <AnimateOnScroll delay={i * 50}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group -mx-4 flex items-center gap-5 rounded-2xl border-b border-neutral-200 px-4 py-5 transition-colors hover:bg-[#0a0a0a] md:gap-8 md:py-6"
                    >
                      <span className="mono hidden w-6 shrink-0 text-[11px] text-neutral-400 transition-colors group-hover:text-white/40 sm:block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="flex-1 text-[18px] font-semibold leading-snug text-[#0a0a0a] transition-colors group-hover:text-white md:text-[22px]"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        «&nbsp;{s.problem}&nbsp;»
                      </span>
                      <span className="hidden shrink-0 items-center gap-2.5 rounded-full border border-neutral-200 px-4 py-2 text-[13.5px] font-medium text-neutral-600 transition-colors group-hover:border-white/20 group-hover:text-white md:flex">
                        <ServiceIcon slug={s.slug} size={15} />
                        {s.name}
                      </span>
                      <span className="shrink-0 text-[20px] text-neutral-400 transition-all group-hover:translate-x-0.5 group-hover:text-white" aria-hidden>
                        →
                      </span>
                    </Link>
                  </AnimateOnScroll>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[15px] text-neutral-500">
              Rien ne vous ressemble&nbsp;?{" "}
              <Link href="/diagnostic" className="font-semibold text-[#0a0a0a] underline decoration-neutral-300 underline-offset-4 hover:decoration-[#0a0a0a]">
                Le diagnostic vous oriente en cinq minutes
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ── Les six expertises ── */}
        <section className="px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <AnimateOnScroll>
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">Nos expertises</p>
              <h2
                className="mb-11 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Vous savez déjà ce qu&apos;il vous faut&nbsp;?
              </h2>
            </AnimateOnScroll>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, i) => (
                <AnimateOnScroll key={s.slug} delay={i * 60} className="h-full">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-7 transition-colors hover:border-neutral-400"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0a0a0a] text-white">
                      <ServiceIcon slug={s.slug} />
                    </span>
                    <p
                      className="mt-6 text-[21px] font-semibold leading-tight text-[#0a0a0a]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {s.name}
                    </p>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-neutral-500">{s.pitch}</p>
                    <ul className="mt-5 space-y-2 border-t border-neutral-100 pt-5">
                      {s.delivered.slice(0, 3).map((d) => (
                        <li key={d.title} className="flex items-center gap-2.5 text-[13.5px] text-neutral-700">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0 text-green-600" aria-hidden>
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          {d.title}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto pt-7 text-[14px] font-semibold text-[#0a0a0a]">
                      Découvrir{" "}
                      <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                    </span>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comment ça démarre ── */}
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

        {/* ── La preuve ── */}
        <CaseStudies variant="rail" />

        <div className="border-t border-neutral-100">
          <ConversionDuo />
        </div>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
