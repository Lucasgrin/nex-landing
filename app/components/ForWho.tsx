import AnimateOnScroll from "./AnimateOnScroll";

const signals = [
  "Vous gérez encore avec des fichiers Excel que personne ne tient à jour.",
  "Vos outils ne se parlent pas. Vous faites le lien à la main, chaque jour.",
  "Votre logiciel actuel vous impose des contournements depuis des mois.",
  "Vous perdez des heures sur des tâches qui devraient être automatiques.",
  "Vous voulez intégrer l'IA concrètement, pas pour l'effet de mode.",
  "Vous êtes une PME de Suisse romande qui veut un partenaire, pas un prestataire.",
  "Vous souhaitez un partenaire capable de faire évoluer vos outils dans le temps.",
];

export default function ForWho() {
  return (
    <section className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <AnimateOnScroll>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Pour qui ?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.08] mb-6"
                style={{fontFamily:"var(--font-space-grotesk)"}}>
              NeX est fait pour vous si…
            </h2>
            <p className="text-base text-white/50 leading-relaxed mb-10">
              Nous travaillons avec des dirigeants et des équipes qui en ont assez de subir leurs outils.
            </p>
            <a href="https://cal.com/agencesolve/reservez-votre-audit-offert?overlayCalendar=true" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] text-sm font-bold px-7 py-3.5 rounded-full hover:bg-neutral-100 transition-colors">
              Réserver un appel <span>→</span>
            </a>
          </AnimateOnScroll>

          {/* Right — checklist */}
          <AnimateOnScroll delay={100}>
            <ul className="space-y-5">
              {signals.map((signal, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-0.5 w-5 h-5 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  </span>
                  <p className="text-sm text-white/65 leading-relaxed">{signal}</p>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}
