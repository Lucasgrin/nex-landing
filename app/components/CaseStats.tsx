import type { CaseStat } from "../content/cases";

/**
 * Les trois faits chiffrés d'une réalisation.
 *
 * Un chiffre seul ne dit rien : « 5 » n'est pas un argument, « 5 opérations
 * réunies » en est un. L'unité est donc collée au chiffre, dans le même
 * souffle, et c'est ce couple qui porte le sens — le libellé en dessous ne
 * fait que préciser.
 *
 * Trois, parce que deux se ressemblent et quatre ne se retiennent pas ; et
 * trois angles différents plutôt que trois mesures du même genre : ce que
 * l'outil encaisse, ce qui a disparu, ce que ça fait gagner.
 *
 * Le premier porte l'accent vert — c'est le résultat qu'on veut voir en
 * premier, et le vert est déjà la couleur d'« actif » sur le site.
 */

const TONES = {
  light: { rule: "divide-neutral-200", lead: "text-green-600", value: "text-[#0a0a0a]", unit: "text-neutral-400", label: "text-neutral-700" },
  dark: { rule: "divide-white/15", lead: "text-green-400", value: "text-white", unit: "text-white/40", label: "text-white/80" },
} as const;

const SCALES = {
  rail: { value: "text-[23px]", unit: "text-[12px]", label: "mt-2 text-[11px]", cell: "px-3 first:pl-0 last:pr-0" },
  card: { value: "text-[30px]", unit: "text-[14px]", label: "mt-2.5 text-[12.5px]", cell: "px-4 first:pl-0 last:pr-0" },
} as const;

export default function CaseStats({
  stats,
  tone = "light",
  scale = "card",
  className = "",
}: {
  stats: CaseStat[];
  tone?: keyof typeof TONES;
  /**
   * rail et card : une bande serrée sous le logo d'une carte.
   * page : trois cartes de même largeur sur toute la grille — sur une page
   * réalisation, les chiffres sont la preuve, pas une ligne de légende.
   */
  scale?: keyof typeof SCALES | "page";
  className?: string;
}) {
  if (stats.length === 0) return null;

  const shown = stats.slice(0, 3);

  if (scale === "page") return <PageStats stats={shown} className={className} />;

  const c = TONES[tone];
  const s = SCALES[scale];

  return (
    <div className={className}>
      <dl className={`grid grid-cols-3 divide-x ${c.rule}`}>
        {shown.map((stat, i) => (
          <div key={stat.label} className={`min-w-0 ${s.cell}`}>
            <dd
              className={`flex items-baseline gap-1 font-bold leading-none tracking-[-0.03em] ${s.value} ${i === 0 ? c.lead : c.value}`}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {stat.value}
              {stat.unit && (
                <span className={`font-semibold tracking-normal ${s.unit} ${c.unit}`}>{stat.unit}</span>
              )}
            </dd>
            <dt className={`${s.label} ${c.label} font-medium leading-snug`}>{stat.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Les chiffres à l'échelle d'une page : une carte par fait, réparties à
 * parts égales sur toute la largeur. Le chiffre tient la carte, le libellé
 * se lit sans effort juste dessous — c'est lui qui dit de quoi il s'agit.
 * En mobile les cartes s'empilent : trois chiffres de 50 px ne tiennent pas
 * côte à côte sur 360 px.
 */
function PageStats({ stats, className }: { stats: CaseStat[]; className: string }) {
  return (
    <dl className={`grid gap-3 sm:grid-cols-3 ${className}`}>
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col-reverse justify-end rounded-2xl px-7 py-7 md:px-8 md:py-8 ${
            i === 0 ? "bg-[#0a0a0a]" : "border border-neutral-200 bg-white"
          }`}
        >
          <dt className={`mt-3 text-[15px] font-medium leading-snug ${i === 0 ? "text-white/80" : "text-neutral-600"}`}>
            {stat.label}
          </dt>
          <dd
            className={`flex items-baseline gap-1.5 text-[44px] font-bold leading-none tracking-[-0.03em] md:text-[52px] ${
              i === 0 ? "text-green-400" : "text-[#0a0a0a]"
            }`}
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {stat.value}
            {stat.unit && (
              <span className={`text-[20px] font-semibold tracking-normal ${i === 0 ? "text-white/45" : "text-neutral-400"}`}>
                {stat.unit}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
