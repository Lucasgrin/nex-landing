"use client";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
const faqs = [
  {q:"À qui appartient le logiciel développé ?",a:"Chaque solution développée est votre propriété. Vous restez libre de faire évoluer votre outil avec le partenaire de votre choix. Notre objectif est que vous restiez avec nous parce que nous créons de la valeur, et non parce que vous êtes dépendant de notre technologie."},
  {q:"Pourquoi du sur-mesure plutôt qu'un logiciel standard ?",a:"Un logiciel standard est conçu pour des besoins génériques. Il vous impose des contraintes et des limitations sur ce qui compte vraiment pour vous. Une solution sur mesure s'adapte exactement à vos processus, votre vocabulaire, vos équipes. L'adoption est immédiate et les gains sont mesurables."},
  {q:"Peut-on commencer petit et faire évoluer l'outil ensuite ?",a:"C'est la façon dont nous recommandons de démarrer. Un premier module ciblé sur votre point de friction le plus coûteux, livré en quelques semaines, puis des ajouts au rythme de votre entreprise. Votre outil est conçu dès le départ pour accueillir de nouveaux modules — y compris des capacités d'intelligence artificielle qui n'existent pas encore aujourd'hui."},
  {q:"Combien de temps faut-il pour développer une solution ?",a:"Un outil interne ciblé peut être livré en 4 à 8 semaines. Un CRM ou ERP complet prend généralement 3 à 6 mois. Nous travaillons de manière itérative : vous voyez des résultats concrets bien avant la livraison finale."},
  {q:"Quel est l'ordre de grandeur du budget ?",a:"Chaque projet est unique. Lors de notre premier échange, nous évaluons ensemble la portée du projet et proposons un chiffrage transparent. Ce qui est certain : le retour sur investissement est rapide quand le bon problème est adressé."},
  {q:"Travaillez-vous uniquement avec des PME ?",a:"Nous sommes spécialisés dans les PME de Suisse romande, car nous comprenons leurs contraintes : budgets maîtrisés, équipes réduites, besoin de solutions pragmatiques. Cela dit, nous évaluons chaque demande selon sa complexité."},
  {q:"L'intelligence artificielle est-elle obligatoire ?",a:"Absolument pas. L'IA n'est intégrée que lorsqu'elle apporte une valeur réelle et mesurable. Nous refusons de l'utiliser comme argument commercial. Si elle n'est pas utile dans votre cas, nous ne l'imposons pas."},
  {q:"Dans quelles régions de Suisse romande intervenez-vous ?",a:"Basés à Payerne, nous accompagnons des PME dans tout le canton de Vaud (Lausanne, Yverdon-les-Bains, Nyon, Vevey, Montreux) ainsi qu'à Genève, Fribourg, Neuchâtel, en Valais (Sion, Martigny) et dans le Jura. Nos échanges et déploiements se font aussi bien sur site qu'à distance."},
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FAQ() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <section id="faq" className="px-6 py-20 md:px-10 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 lg:flex-row lg:gap-[90px]">
        <AnimateOnScroll className="lg:w-[330px] lg:shrink-0">
          <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
            Questions fréquentes
          </p>
          <h2
            className="mb-4 text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ce que vous voulez savoir.
          </h2>
          <p className="text-[14.5px] leading-relaxed text-neutral-500">
            Une question qui n&apos;est pas là ? Posez-la pendant l&apos;appel — c&apos;est fait
            pour ça.
          </p>
        </AnimateOnScroll>

        {/* Filets fins plutôt que gros accordéons encadrés : la FAQ se scanne. */}
        <div className="flex-1">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className={i < faqs.length - 1 ? "border-b border-neutral-100" : ""}>
              <button
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span
                  className="text-[15.5px] font-bold text-[#0a0a0a]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {q}
                </span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={open === i ? "#0a0a0a" : "#c4c4c4"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="shrink-0"
                  aria-hidden
                >
                  {open === i ? <path d="M5 12h14" /> : <path d="M12 5v14M5 12h14" />}
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? "max-h-80" : "max-h-0"}`}>
                <p className="max-w-[640px] pb-5 text-[13.5px] leading-[1.7] text-neutral-500">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
