import AnimateOnScroll from "./AnimateOnScroll";
import CtaInline from "./CtaInline";

/**
 * « Ce qui se passe si vous nous appelez. »
 *
 * Le dernier obstacle avant l'appel n'est pas le prix, c'est l'inconnu :
 * on ne décroche pas quand on ignore ce qui va suivre. Dire les cinq étapes
 * à l'avance retire le risque perçu — y compris celle qui dit qu'on peut
 * répondre non.
 *
 * Présent sur chaque page de réalisation, réelle ou cas d'usage type : c'est la même
 * promesse, elle doit se lire à l'identique partout.
 */
const ETAPES = [
  "Trente minutes, en visio ou par téléphone — comme vous préférez.",
  "On regarde ensemble vos processus et vos besoins, pour voir si on peut vraiment vous aider.",
  "Vous repartez avec une idée chiffrée de ce que vous coûte l'existant, et de ce qu'un outil changerait.",
  "Si le sur-mesure n'est pas la bonne réponse chez vous, on vous le dit. C'est déjà arrivé.",
  "Aucun engagement, aucune relance automatique.",
];

export default function PremierAppel({ ctaLabel }: { ctaLabel: string }) {
  return (
    <section className="px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-11 lg:flex-row lg:gap-[90px]">
        <AnimateOnScroll className="lg:w-[400px] lg:shrink-0">
          <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
            Avant de décider
          </p>
          <h2
            className="mb-5 text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[36px]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ce qui se passe si vous nous appelez.
          </h2>
          <p className="text-[14.5px] leading-relaxed text-neutral-500">
            Pas de démonstration produit, pas de devis surprise. Un échange pour savoir si ça vaut
            le coup chez vous.
          </p>
        </AnimateOnScroll>

        <div className="flex-1">
          <ol className="mb-9">
            {ETAPES.map((t, i) => (
              <AnimateOnScroll key={t} delay={i * 60}>
                <li className="flex items-start gap-4 border-b border-neutral-100 py-4 last:border-0">
                  <span className="mono mt-1 shrink-0 text-[10px] text-neutral-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-relaxed text-neutral-700">{t}</span>
                </li>
              </AnimateOnScroll>
            ))}
          </ol>
          <CtaInline label={ctaLabel} note="30 MIN" />
        </div>
      </div>
    </section>
  );
}
