import type { VisualKind } from "../content/metiers";

/**
 * L'illustration qui tient la place d'une capture d'écran.
 *
 * Même principe que la VSL du hero : le cadre existe et vit tout de suite,
 * la capture réelle vient s'y substituer sans rien redessiner. Six familles
 * d'écrans couvrent les modules des quatre métiers — c'est le vocabulaire
 * qui change d'un métier à l'autre, pas la forme de l'outil.
 *
 * Volontairement schématique : ça ne doit jamais se faire passer pour une
 * capture d'un produit existant.
 */

const CHIP = "rounded-md bg-neutral-100";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50 p-5">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#0a0a0a 1px,transparent 1px),linear-gradient(90deg,#0a0a0a 1px,transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative w-full">{children}</div>
    </div>
  );
}

export default function MetierVisual({ kind }: { kind: VisualKind }) {
  if (kind === "planning")
    return (
      <Frame>
        <div className="mb-2 flex gap-1.5">
          {["LU", "MA", "ME", "JE", "VE"].map((d) => (
            <span key={d} className="mono flex-1 text-center text-[7.5px] tracking-[0.1em] text-neutral-300">
              {d}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            [1, 0, 1, 1, 0],
            [0, 1, 1, 0, 1],
            [1, 1, 0, 1, 1],
          ].map((row, r) => (
            <div key={r} className="flex gap-1.5">
              {row.map((on, c) => (
                <span
                  key={c}
                  className={`h-5 flex-1 rounded ${
                    r === 1 && c === 2 ? "slidein bg-[#0a0a0a]" : on ? "bg-neutral-200" : "bg-neutral-100/70"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </Frame>
    );

  if (kind === "pointage")
    return (
      <Frame>
        <div className="mx-auto w-[122px] rounded-xl border border-neutral-200 bg-white p-3">
          <div className="playring mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#0a0a0a]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </div>
          <div className="hrow hr1 flex items-center gap-1.5 rounded-md bg-green-50 px-2 py-1.5">
            <span className="h-1 w-1 rounded-full bg-green-500" />
            <span className="mono text-[7.5px] text-green-700">08:02 · SUR SITE</span>
          </div>
        </div>
      </Frame>
    );

  if (kind === "rentabilite")
    return (
      <Frame>
        <div className="flex flex-col gap-3">
          <div>
            <div className="mono mb-1.5 text-[7.5px] tracking-[0.1em] text-neutral-300">VENDU</div>
            <div className="h-2.5 w-full rounded-full bg-neutral-200" />
          </div>
          <div>
            <div className="mono mb-1.5 text-[7.5px] tracking-[0.1em] text-neutral-400">RÉELLEMENT POINTÉ</div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-100">
              <div className="creep h-full rounded-full bg-[#0a0a0a]" />
            </div>
          </div>
          <div className="mono self-end rounded-full bg-red-50 px-2 py-1 text-[7.5px] text-red-600">
            L&apos;ÉCART SE VOIT AVANT LA FACTURE
          </div>
        </div>
      </Frame>
    );

  if (kind === "portail")
    return (
      <Frame>
        <div className="flex items-center gap-3">
          <div className="slidein flex h-14 w-11 shrink-0 flex-col gap-1 rounded-md border border-neutral-200 bg-white p-1.5">
            {[100, 70, 88].map((w, i) => (
              <span key={i} className="h-[2.5px] rounded-sm bg-neutral-200" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="flex-1 rounded-lg border border-dashed border-neutral-300 bg-white/60 p-2.5">
            {["Bilan 2025", "Relevés bancaires", "Factures Q4"].map((t, i) => (
              <div key={t} className={`hrow hr${i + 1} flex items-center gap-1.5 py-[3px]`}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="4" aria-hidden>
                  <path d="M4 12.5 9 17.5 20 6.5" />
                </svg>
                <span className="text-[8px] text-neutral-500">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    );

  if (kind === "echeances")
    return (
      <Frame>
        <div className="flex flex-col gap-1.5">
          {[
            { d: "30.09", t: "Décompte TVA", warn: true },
            { d: "15.10", t: "Salaires", warn: false },
            { d: "31.12", t: "Bouclement", warn: false },
          ].map((r) => (
            <div key={r.t} className="flex items-center gap-2.5 rounded-md bg-white px-2.5 py-2">
              <span className={`mono text-[7.5px] ${r.warn ? "text-amber-600" : "text-neutral-300"}`}>{r.d}</span>
              <span className="flex-1 text-[8.5px] text-neutral-500">{r.t}</span>
              <span className={`h-1.5 w-1.5 rounded-full ${r.warn ? "breathe bg-amber-400" : "bg-neutral-200"}`} />
            </div>
          ))}
        </div>
      </Frame>
    );

  return (
    <Frame>
      <div className="relative mx-auto w-[136px]">
        <span className={`absolute -left-3 top-2 h-16 w-full ${CHIP} opacity-50`} />
        <span className={`absolute -left-1.5 top-1 h-16 w-full ${CHIP} opacity-70`} />
        <div className="snap relative rounded-md border border-neutral-200 bg-white p-2.5">
          <div className="mono mb-1.5 text-[7px] tracking-[0.1em] text-neutral-300">HISTORIQUE DU SITE</div>
          {["2024 · pose", "2025 · SAV", "2026 · révision"].map((t, i) => (
            <div key={t} className={`hrow hr${i + 1} flex items-center gap-1.5 py-[2px]`}>
              <span className="h-1 w-1 rounded-full bg-neutral-300" />
              <span className="text-[8px] text-neutral-500">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}
