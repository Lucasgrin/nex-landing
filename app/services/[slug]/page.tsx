import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import PageCTA from "../../components/PageCTA";
import { SERVICES, getService } from "../../content/services";
import { getCase, caseHref } from "../../content/cases";
import { CITIES } from "../../content/cities";
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
  const cases = service.relatedCases.map(getCase).filter((c) => c !== undefined);
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={serviceJsonLd({ name: service.name, description: service.metaDescription, path })} />
      <JsonLd data={faqJsonLd(service.faq)} />

      <Navbar />
      <main className="pt-32">
        {/* En-tête */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs trail={trail} />
            <h1
              className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#0a0a0a] md:text-5xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {service.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">{service.intro}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://cal.com/agencesolve/reservez-votre-audit-offert?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#0a0a0a] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Réserver un appel
              </a>
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-8 py-4 text-sm font-semibold text-neutral-500 transition-colors hover:border-neutral-400 hover:text-[#0a0a0a]"
              >
                Diagnostic gratuit <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Symptômes — le visiteur doit se reconnaître */}
        <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2
              className="mb-10 max-w-xl text-3xl font-bold tracking-tight text-[#0a0a0a] md:text-4xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Vous vous reconnaissez ?
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.symptoms.map((s) => (
                <li key={s} className="flex items-start gap-3 rounded-2xl border border-neutral-100 bg-white p-6">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-neutral-600">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ce que nous livrons */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">Ce que nous livrons</p>
            <h2
              className="mb-12 max-w-xl text-3xl font-bold tracking-tight text-[#0a0a0a] md:text-4xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Concrètement, {service.name.toLowerCase()} chez NeX
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {service.delivered.map(({ title, desc }) => (
                <div key={title} className="rounded-2xl border border-neutral-100 p-8 transition-colors hover:border-neutral-300">
                  <h3 className="mb-2 text-base font-semibold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preuve */}
        {cases.length > 0 && (
          <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-24">
            <div className="mx-auto max-w-4xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">Cas concrets</p>
              <h2
                className="mb-12 text-3xl font-bold tracking-tight text-[#0a0a0a] md:text-4xl"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Ils avaient le même problème
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {cases.map((c) => (
                  <Link
                    key={c.slug}
                    href={caseHref(c.slug)}
                    className="group rounded-2xl border border-neutral-100 bg-white p-8 transition-all hover:border-neutral-300 hover:shadow-sm"
                  >
                    <p className="text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {c.client}
                    </p>
                    <p className="mb-4 text-xs text-neutral-400">{c.type}</p>
                    <p className="text-sm leading-relaxed text-neutral-500">{c.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a0a0a]">
                      Lire l&apos;étude de cas
                      <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ spécifique au service */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2
              className="mb-10 text-3xl font-bold tracking-tight text-[#0a0a0a] md:text-4xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Questions fréquentes
            </h2>
            <dl className="divide-y divide-neutral-100 border-y border-neutral-100">
              {service.faq.map(({ q, a }) => (
                <div key={q} className="py-6">
                  <dt className="mb-2 text-base font-semibold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {q}
                  </dt>
                  <dd className="text-sm leading-relaxed text-neutral-500">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Maillage interne : autres services + villes */}
        <section className="border-t border-neutral-100 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-neutral-400">Nos autres expertises</p>
            <div className="mb-12 flex flex-wrap gap-2">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-500 transition-colors hover:border-neutral-400 hover:text-[#0a0a0a]"
                >
                  {s.name}
                </Link>
              ))}
            </div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-neutral-400">Où nous intervenons</p>
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

        <PageCTA />
      </main>
      <Footer />
    </>
  );
}
