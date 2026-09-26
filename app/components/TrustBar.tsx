import { SITE } from "../content/site";

const SIGNALS: { title: string; desc: string }[] = [
  {
    title: `Basés à ${SITE.city}`,
    desc: `Une adresse dans le canton de ${SITE.region}, des déplacements dans toute la Suisse romande.`,
  },
  {
    title: SITE.legalName,
    desc: "Société suisse inscrite au registre du commerce, avec des projets clients référencés.",
  },
  {
    title: "Vous êtes propriétaire",
    desc: "Le code, les données et la documentation vous appartiennent dès la livraison.",
  },
  {
    title: "Un interlocuteur unique",
    desc: "La personne à qui vous parlez est celle qui conçoit votre outil. Du premier appel à la livraison.",
  },
];

/**
 * Bandeau de réassurance placé juste sous le hero.
 *
 * Le visiteur type arrive après un appel à froid : il vient vérifier à qui il a
 * affaire avant de lire quoi que ce soit d'autre. Ces quatre signaux doivent
 * être visibles sans scroller sur grand écran.
 */
export default function TrustBar() {
  return (
    <section className="px-6 pb-4" aria-label="Garanties">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SIGNALS.map(({ title, desc }) => (
          <div key={title} className="rounded-2xl border border-neutral-100 bg-white p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#0a0a0a] shrink-0" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <p className="text-sm font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {title}
              </p>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
