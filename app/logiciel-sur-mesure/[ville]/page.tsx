import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import PageCTA from "../../components/PageCTA";
import Locaux from "../../components/Locaux";
import { CITIES, getCity } from "../../content/cities";
import { getService } from "../../content/services";
import { CASES, PUBLISHED_CASES, caseHref } from "../../content/cases";
import { JsonLd, breadcrumbJsonLd, ORG_ID } from "../../lib/seo";
import { SITE } from "../../content/site";

type Props = { params: Promise<{ ville: string }> };

export function generateStaticParams() {
  return CITIES.map((c) => ({ ville: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params;
  const city = getCity(ville);
  if (!city) return {};

  const path = `/logiciel-sur-mesure/${city.slug}`;
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: path,
      type: "website",
      locale: "fr_CH",
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { ville } = await params;
  const city = getCity(ville);
  if (!city) notFound();

  const path = `/logiciel-sur-mesure/${city.slug}`;
  const trail = [
    { name: "Accueil", path: "/" },
    { name: "Où nous intervenons", path: "/logiciel-sur-mesure" },
    { name: city.name, path },
  ];
  const services = city.focusServices.map(getService).filter((s) => s !== undefined);
  const others = CITIES.filter((c) => c.slug !== city.slug);

  /* La page cible une zone : on décrit le service rendu là-bas, en renvoyant
     vers l'entité principale plutôt qu'en déclarant un second établissement —
     déclarer une adresse par ville alors qu'il n'y a qu'un bureau est une
     fausse déclaration que Google sanctionne. */
  const areaJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Développement de logiciels sur mesure à ${city.name}`,
    description: city.metaDescription,
    url: `${SITE.url}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: `Canton de ${city.canton}` },
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={areaJsonLd} />

      <Navbar />
      <main className="pt-32">
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs trail={trail} />
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Canton de {city.canton}
            </p>
            <h1
              className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#0a0a0a] md:text-5xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {city.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">{city.intro}</p>
          </div>
        </section>

        <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-24">
          <div className="mx-auto max-w-3xl space-y-12">
            <div>
              <h2
                className="mb-4 text-2xl font-bold text-[#0a0a0a] md:text-3xl"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Ce que nous observons à {city.name}
              </h2>
              <p className="text-base leading-relaxed text-neutral-600">{city.context}</p>
            </div>
            <div>
              <h2
                className="mb-4 text-2xl font-bold text-[#0a0a0a] md:text-3xl"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Comment nous travaillons avec vous
              </h2>
              <p className="text-base leading-relaxed text-neutral-600">{city.presence}</p>
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Les plus demandés dans la région
            </p>
            <h2
              className="mb-12 max-w-xl text-3xl font-bold tracking-tight text-[#0a0a0a] md:text-4xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Nos expertises à {city.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex flex-col rounded-2xl border border-neutral-100 p-7 transition-all hover:border-neutral-300 hover:shadow-sm"
                >
                  <h3 className="mb-3 text-base font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {s.name}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-neutral-500">{s.metaDescription}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a0a0a]">
                    Découvrir
                    <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Locaux />

        <section className="border-t border-neutral-100 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Nos réalisations
            </p>
            <div className="mb-12 flex flex-wrap gap-2">
              {PUBLISHED_CASES.map((c) => (
                <Link
                  key={c.slug}
                  href={caseHref(c.slug)}
                  className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-500 transition-colors hover:border-neutral-400 hover:text-[#0a0a0a]"
                >
                  {c.client}
                </Link>
              ))}
            </div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Nous intervenons aussi à
            </p>
            <div className="flex flex-wrap gap-2">
              {others.map((c) => (
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

        <PageCTA
          title={`Un projet à ${city.name} ?`}
          desc="Trente minutes au téléphone suffisent pour savoir si votre situation justifie du sur-mesure. Nous vous le dirons franchement, même si la réponse est non."
        />
      </main>
      <Footer />
    </>
  );
}
