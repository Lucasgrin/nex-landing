import type { CaseStudy } from "../content/cases";
import WindowBar from "./WindowBar";

/**
 * L'outil, dessiné à partir de sa propre fiche — quand on n'a pas (encore)
 * de capture nettoyée à montrer.
 *
 * Même cadre que ToolCarousel, pour que la section « L'outil en fonctionnement »
 * ait la même tête sur toutes les réalisations : sans lui, trois pages sur
 * sept montraient un écran et les quatre autres sautaient directement de
 * « Ce que nous avons construit » à « Ce que ça change ».
 *
 * Ce n'est pas une fausse capture, et elle ne doit pas en avoir l'air : pas
 * de chiffres, pas de noms, pas de lignes de tableau inventées. Elle montre
 * uniquement ce que la fiche affirme déjà — les modules livrés et la chaîne
 * qu'ils couvrent — et la barre le dit en toutes lettres : « Schéma ».
 */
export default function ToolSchema({ study }: { study: CaseStudy }) {
  const steps = study.chain;
  const first = steps[0]?.label.toLowerCase();
  const last = steps[steps.length - 1]?.label.toLowerCase();
  const owner = study.example ? "que nous construirions" : `livré à ${study.client}`;

  return (
    <figure className="mx-auto" style={{ maxWidth: 1100 }}>
      <div className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-[0_18px_44px_-24px_rgba(0,0,0,0.35)]">
        <WindowBar screen={`${study.client} · ${study.type}`} badge="Schéma" />

        <div className="grid md:grid-cols-[260px_1fr]">
          {/* Les modules, comme une barre latérale d'application. */}
          <div className="border-b border-neutral-100 bg-neutral-50 p-5 md:border-b-0 md:border-r">
            <p className="mono mb-4 text-[9px] uppercase tracking-[0.14em] text-neutral-400">Modules</p>
            <ul className="space-y-1">
              {study.delivered.map((d, i) => (
                <li
                  key={d.title}
                  className={`flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px] leading-snug ${
                    i === 0 ? "bg-white text-[#0a0a0a] shadow-sm" : "text-neutral-500"
                  }`}
                >
                  <span className="mono mt-[2px] shrink-0 text-[9px] text-neutral-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {d.title}
                </li>
              ))}
            </ul>
          </div>

          {/* La chaîne, comme un flux : une étape mène à la suivante. */}
          <div className="relative p-5 md:p-8">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(#0a0a0a 1px,transparent 1px),linear-gradient(90deg,#0a0a0a 1px,transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <p className="mono relative mb-5 text-[9px] uppercase tracking-[0.14em] text-neutral-400">
              Une seule donnée, d&apos;un bout à l&apos;autre
            </p>
            <ol className="relative flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
              {steps.map((step, i) => {
                const isLast = i === steps.length - 1;
                return (
                  <li key={step.label} className="flex flex-col lg:flex-1 lg:flex-row">
                    <div
                      className={`flex-1 rounded-xl border bg-white p-4 ${
                        isLast ? "border-green-500/40" : "border-neutral-200"
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          aria-hidden
                          className={`h-[7px] w-[7px] rounded-full ${isLast ? "bg-green-500" : "bg-[#0a0a0a]"}`}
                        />
                        <span
                          className="text-[14px] font-semibold text-[#0a0a0a]"
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {step.label}
                        </span>
                      </div>
                      <p className="text-[12px] leading-snug text-neutral-500">{step.detail}</p>
                    </div>
                    {!isLast && (
                      <span aria-hidden className="flex items-center justify-center py-1 text-neutral-300 lg:px-1.5 lg:py-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-90 lg:rotate-0">
                          <path d="M5 12h13M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      <figcaption className="mt-4 max-w-[68ch] text-[14.5px] leading-relaxed text-neutral-500">
        {`Vue schématique de l'outil ${owner} : ${study.delivered.length} modules, et une seule chaîne de «\u00a0${first}\u00a0» à «\u00a0${last}\u00a0».`}
      </figcaption>
    </figure>
  );
}
