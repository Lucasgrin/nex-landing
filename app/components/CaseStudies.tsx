import AnimateOnScroll from "./AnimateOnScroll";
const cases = [
  {client:"Welcomize",type:"Portail client",problem:"Échanges éparpillés entre emails, WhatsApp et fichiers partagés. Aucune visibilité client sur l'avancement des projets.",solution:"Portail client sur mesure avec suivi en temps réel, messagerie intégrée et accès aux documents.",gains:["Visibilité totale pour les clients","Moins de relances email","Image de marque renforcée"]},
  {client:"NYL",type:"Outil interne",problem:"Gestion sur Excel et emails. Informations dispersées, risques d'erreurs et perte de temps quotidienne.",solution:"Application interne centralisée avec gestion des dossiers, tableau de bord et automatisations des tâches récurrentes.",gains:["Temps de traitement divisé par deux","Zéro double saisie","Données toujours à jour"]},
  {client:"Pod X",type:"Plateforme métier",problem:"Processus métier complexes gérés avec plusieurs outils déconnectés. Coordination difficile entre les équipes.",solution:"Plateforme centralisée, adaptée à leur flux de travail, avec intégrations et reporting intégré.",gains:["Une seule source de vérité","Coordination simplifiée","Pilotage en temps réel"]},
  {client:"C Carré",type:"Solution spécifique",problem:"Besoins très spécifiques qu'aucun outil du marché ne couvrait. Adaptations coûteuses sans résultat satisfaisant.",solution:"Solution développée de zéro, calquée exactement sur les processus internes et contraintes métier.",gains:["Outil parfaitement adapté","Adoption immédiate","ROI mesurable dès le premier mois"]},
];
export default function CaseStudies() {
  return (
    <section id="realisations" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Nos réalisations</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-4 max-w-xl" style={{fontFamily:"var(--font-space-grotesk)"}}>
            Des projets réels. Des résultats concrets.
          </h2>
          <p className="text-base text-neutral-500 max-w-lg mb-16 leading-relaxed">Nous utilisons les outils que nous développons. Ce que nous construisons pour nos clients, nous le testons sur nos propres entreprises.</p>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 gap-3">
          {cases.map(({client,type,problem,solution,gains},i) => (
            <AnimateOnScroll key={client} delay={i*70}>
              <div className="group h-full border border-neutral-100 rounded-2xl p-8 hover:border-neutral-300 hover:shadow-md transition-all duration-200 bg-white">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xl font-bold text-[#0a0a0a]" style={{fontFamily:"var(--font-space-grotesk)"}}>{client}</p>
                    <span className="inline-block mt-1.5 text-[10px] font-semibold uppercase tracking-widest px-3 py-0.5 rounded-full bg-neutral-100 text-neutral-400">{type}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-base font-bold text-neutral-300">{client[0]}</div>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest mb-1.5">Situation</p>
                    <p className="text-sm text-neutral-500 leading-relaxed">{problem}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest mb-1.5">Notre réponse</p>
                    <p className="text-sm text-neutral-600 leading-relaxed">{solution}</p>
                  </div>
                </div>
                <div className="border-t border-neutral-100 pt-5">
                  <p className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest mb-3">Résultats</p>
                  <ul className="space-y-1.5">
                    {gains.map(g => (
                      <li key={g} className="flex items-center gap-2 text-sm text-neutral-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] shrink-0" />{g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
