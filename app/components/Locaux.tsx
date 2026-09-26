import AnimateOnScroll from "./AnimateOnScroll";
import { Photo } from "./Photo";
import { LOCAUX } from "../content/team";
import { SITE, formatAddress, telHref } from "../content/site";

/**
 * Ancrage physique. Une adresse vérifiable et des photos de vrais locaux
 * répondent à la question que se pose tout prospect appelé à froid :
 * « est-ce que ces gens existent vraiment ? »
 */
export default function Locaux() {
  const tel = telHref();

  return (
    <section id="locaux" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
          <AnimateOnScroll>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Nos locaux</p>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-6 leading-[1.08]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Une adresse à {SITE.city}, pas une boîte aux lettres.
            </h2>
            <p className="text-base text-neutral-500 leading-relaxed mb-4">
              Nous sommes installés à {SITE.city}, dans le canton de {SITE.region}. Vous pouvez passer nous
              voir, et nous nous déplaçons dans vos locaux partout en Suisse romande.
            </p>
            <p className="text-base text-neutral-500 leading-relaxed mb-8">
              C&apos;est aussi ce qui nous permet de comprendre votre métier : la première séance se fait
              souvent chez vous, à observer comment vos équipes travaillent réellement.
            </p>

            <address className="not-italic text-sm text-neutral-500 leading-relaxed border-l-2 border-neutral-200 pl-4">
              <span className="block font-semibold text-[#0a0a0a]">
                {SITE.name} · {SITE.legalName}
              </span>
              {formatAddress()}
              {tel && (
                <a href={tel} className="mt-1 block font-semibold text-[#0a0a0a] hover:underline">
                  {SITE.phone}
                </a>
              )}
              {SITE.email && (
                <a href={`mailto:${SITE.email}`} className="block hover:text-[#0a0a0a] transition-colors">
                  {SITE.email}
                </a>
              )}
            </address>
          </AnimateOnScroll>

          <AnimateOnScroll delay={120}>
            <div className="grid grid-cols-2 gap-3">
              <Photo
                src={LOCAUX[0].src}
                alt={LOCAUX[0].alt}
                caption={LOCAUX[0].caption}
                className="col-span-2 aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 620px"
              />
              {LOCAUX.slice(1, 3).map((p) => (
                <Photo
                  key={p.caption}
                  src={p.src}
                  alt={p.alt}
                  caption={p.caption}
                  className="aspect-[4/3]"
                  sizes="(max-width: 1024px) 50vw, 300px"
                />
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
