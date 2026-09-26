/**
 * Le coût de l'inaction, en arithmétique que le lecteur peut vérifier.
 *
 * Aucun chiffre inventé sur son entreprise : on pose une prémisse modeste —
 * une heure par jour — et on la déroule. C'est le déroulé qui frappe, pas
 * une statistique qu'il faudrait croire sur parole.
 */
const PALIERS = [
  { valeur: "1 h", unite: "par jour", detail: "à recopier, chercher, relancer", w: "12%", cls: "cout-1" },
  { valeur: "21 h", unite: "par mois", detail: "soit près de trois jours de travail", w: "38%", cls: "cout-2" },
  { valeur: "252 h", unite: "par an", detail: "l'équivalent de six semaines pleines", w: "100%", cls: "cout-3" },
];

export default function CoutCompteur() {
  return (
    <div className="flex flex-col gap-6">
      {PALIERS.map((p, i) => (
        <div key={p.unite} className={`cout ${p.cls}`}>
          <div className="mb-2 flex items-baseline gap-3">
            <span
              className={`font-bold tracking-[-0.03em] text-white ${i === 2 ? "text-6xl md:text-7xl" : i === 1 ? "text-4xl" : "text-3xl"}`}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {p.valeur}
            </span>
            <span className={`text-white/45 ${i === 2 ? "text-base" : "text-sm"}`}>{p.unite}</span>
            <span className="ml-auto hidden text-[13px] text-white/40 sm:block">{p.detail}</span>
          </div>
          <div className="h-1 w-full rounded-full bg-white/10">
            <div
              className={`cout-bar ${p.cls} h-full rounded-full ${i === 2 ? "bg-green-400" : "bg-white/35"}`}
              style={{ "--w": p.w } as React.CSSProperties}
            />
          </div>
          <p className="mt-2 text-[13px] text-white/40 sm:hidden">{p.detail}</p>
        </div>
      ))}
    </div>
  );
}
