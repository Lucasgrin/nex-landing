import type { VisualKind } from "../content/metiers";

/**
 * Le calque animé posé sur une capture réelle.
 *
 * Il ne redessine rien et ne simule aucune fonction : il balaie, il pointe,
 * il signale. La capture reste la preuve, l'animation dit seulement « ça
 * tourne » — ce qu'une image figée ne dira jamais.
 *
 * Le mouvement est choisi selon ce que l'écran fait : une file se balaie de
 * haut en bas, une courbe se lit de gauche à droite, une échéance clignote.
 */
export default function ShotOverlay({ kind }: { kind: VisualKind }) {
  const horizontal = kind === "rentabilite" || kind === "planning";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Le liseré du haut : la même respiration sur toutes les captures. */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
        <div
          className="shot-edge h-px w-2/5"
          style={{ background: "linear-gradient(90deg,transparent,rgba(22,163,74,.65),transparent)" }}
        />
      </div>

      {horizontal ? (
        // Une courbe se lit dans le temps : tête de lecture qui traverse.
        <div className="shot-head absolute bottom-0 top-0 w-px" style={{ background: "rgba(10,10,10,.26)" }}>
          <div
            className="absolute inset-y-0 -left-24 w-24"
            style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,.13))" }}
          />
        </div>
      ) : (
        // Une file se dépile : balayage de haut en bas.
        <div className="shot-scan absolute inset-x-0 h-px" style={{ background: "rgba(10,10,10,.22)" }}>
          <div
            className="absolute inset-x-0 -top-14 h-14"
            style={{ background: "linear-gradient(180deg,transparent,rgba(10,10,10,.075))" }}
          />
        </div>
      )}

      {kind === "echeances" && (
        <span className="absolute right-[7%] top-[17%] flex h-2.5 w-2.5">
          <span className="shot-ping absolute inline-flex h-full w-full rounded-full bg-red-400" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-400/70" />
        </span>
      )}

      {(kind === "portail" || kind === "dossier" || kind === "pointage") && (
        <span className="absolute left-[4%] top-[26%] flex h-2.5 w-2.5">
          <span className="shot-ping absolute inline-flex h-full w-full rounded-full bg-green-500" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </span>
      )}
    </div>
  );
}
