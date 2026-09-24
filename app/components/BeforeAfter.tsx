import { Fragment } from "react";

/**
 * La bascule, paire par paire : deux mondes, pas une colonne pâlie.
 *
 * Le site a déjà sa grammaire : l'existant est clair et dispersé, le
 * sur-mesure est noir. La bascule la reprend telle quelle — et chaque paire
 * partage sa ligne de grille, donc les deux états se lisent l'un en face de
 * l'autre.
 *
 * Partagée par la réalisation (constat) et le cas d'usage type (projection) :
 * c'est la même section, seuls les deux intitulés changent.
 *
 * En mobile les colonnes s'empilent : les en-têtes disparaissent et chaque
 * cellule porte son propre intitulé, sinon on lirait deux titres puis une
 * liste dont on ne saurait plus quelle ligne est « avant ».
 */
export default function BeforeAfter({
  rows,
  beforeLabel,
  afterLabel,
}: {
  rows: { before: string; after: string }[];
  beforeLabel: string;
  afterLabel: string;
}) {
  if (rows.length === 0) return null;

  return (
    <div className="grid overflow-hidden rounded-2xl border border-neutral-200 sm:grid-cols-2">
      <div className="hidden bg-neutral-100 px-6 py-4 sm:block md:px-8">
        <span className="text-[13px] font-semibold text-neutral-600">{beforeLabel}</span>
      </div>
      <div className="hidden bg-[#0a0a0a] px-6 py-4 sm:block md:px-8">
        <span className="text-[13px] font-semibold text-white">{afterLabel}</span>
      </div>

      {rows.map((row, i) => (
        <Fragment key={row.before}>
          <div
            className={`flex items-start gap-3 bg-neutral-50 px-6 py-5 md:px-8 ${
              i > 0 ? "border-t border-neutral-200" : "sm:border-t sm:border-neutral-200"
            }`}
          >
            <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-neutral-400" />
            <span className="text-[15px] leading-relaxed text-neutral-600">
              <span className="mono mb-1 block text-[9.5px] uppercase tracking-[0.14em] text-neutral-400 sm:hidden">
                {beforeLabel}
              </span>
              {row.before}
            </span>
          </div>
          <div className="flex items-start gap-3 border-t border-white/10 bg-[#0a0a0a] px-6 py-5 md:px-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" className="mt-[5px] shrink-0" aria-hidden>
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="text-[15px] font-medium leading-relaxed text-white">
              <span className="mono mb-1 block text-[9.5px] uppercase tracking-[0.14em] text-white/45 sm:hidden">
                {afterLabel}
              </span>
              {row.after}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
