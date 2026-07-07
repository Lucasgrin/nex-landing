import AnimateOnScroll from "./AnimateOnScroll";

const benefits = [
  {
    stat: "5h",
    unit: "par semaine",
    title: "Vos équipes récupèrent leur temps",
    desc: "Les tâches répétitives disparaissent. Vos collaborateurs se concentrent sur ce qui a de la valeur.",
  },
  {
    stat: "1",
    unit: "seul outil",
    title: "Toutes vos données au même endroit",
    desc: "Fini les fichiers éparpillés et les informations introuvables. Une seule source de vérité, accessible par toute l'équipe.",
  },
  {
    stat: null,
    unit: null,
    title: "Des gains mesurables dès les premières semaines.",
    desc: "Chaque projet est conçu pour produire des résultats rapidement : temps gagné, erreurs évitées, processus fluidifiés.",
  },
  {
    stat: "0",
    unit: "double saisie",
    title: "Vos processus tournent sans intervention",
    desc: "Synchronisations, relances, rapports : tout s'exécute automatiquement. Vous supervisez, vous n'exécutez plus.",
  },
];

export default function Benefits() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Ce que vous gagnez</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-16 max-w-xl leading-[1.08]"
              style={{fontFamily:"var(--font-space-grotesk)"}}>
            Des résultats concrets,<br />pas des promesses.
          </h2>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 gap-4">
          {benefits.map(({ stat, unit, title, desc }, i) => (
            <AnimateOnScroll key={stat + title} delay={i * 80}>
              <div className="group h-full bg-white border border-neutral-100 rounded-2xl p-8 hover:border-neutral-300 hover:shadow-sm transition-all duration-200">
                {stat ? (
                  <div className="flex items-end gap-2 mb-5">
                    <span className="text-5xl font-bold text-[#0a0a0a] leading-none"
                          style={{fontFamily:"var(--font-space-grotesk)"}}>
                      {stat}
                    </span>
                    <span className="text-sm text-neutral-400 mb-1">{unit}</span>
                  </div>
                ) : (
                  <div className="mb-5 inline-flex items-center gap-2 border border-neutral-100 rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-xs font-medium text-neutral-400">Résultats rapides</span>
                  </div>
                )}
                <p className="text-base font-semibold text-[#0a0a0a] mb-2" style={{fontFamily:"var(--font-space-grotesk)"}}>{title}</p>
                <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
