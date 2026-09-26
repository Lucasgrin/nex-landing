import type { CaseChainStep } from "../content/cases";

/**
 * La chaîne d'opérations que l'outil porte d'un bout à l'autre.
 *
 * C'est le mécanisme de toutes nos réalisations, et c'est 1pecc qui le dit
 * le mieux : « planifier, pointer, rendre compte, mesurer la rentabilité et
 * facturer sont cinq opérations sur la même réalité. Tant qu'elles vivent
 * dans des outils séparés, la même information doit être reprise à chaque
 * étape. »
 *
 * D'où le dessin : un trait continu qui traverse tous les maillons, et non
 * une rangée de cartes séparées. Des cartes diraient exactement l'inverse
 * de la phrase — des boîtes côte à côte, avec des trous entre elles. Ici le
 * trait ne s'interrompt jamais : c'est lui l'argument, les puces ne font que
 * marquer les étapes.
 */
export default function CaseChain({
  steps,
  className = "",
}: {
  steps: CaseChainStep[];
  className?: string;
}) {
  if (steps.length === 0) return null;

  return (
    <ol className={`relative ${className}`}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={step.label} className="relative pl-8 pb-9 last:pb-0 md:pl-10">
            {/* Le trait est porté par chaque maillon sauf le dernier : il
                court d'une puce à la suivante et s'arrête net sur la
                dernière. Un trait unique posé sur la liste dépasserait sous
                le dernier détail, et la chaîne n'aurait plus de fin. */}
            {!last && (
              <span aria-hidden className="absolute bottom-0 left-[5px] top-[14px] w-px bg-[#0a0a0a]" />
            )}
            <span
              aria-hidden
              className={`absolute left-0 top-[3px] h-[11px] w-[11px] rounded-full ${
                last ? "bg-green-500" : "bg-[#0a0a0a]"
              }`}
            />
            <p
              className="text-[17px] font-semibold leading-none tracking-[-0.01em] text-[#0a0a0a] md:text-[19px]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {step.label}
            </p>
            <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-neutral-500">
              {step.detail}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
