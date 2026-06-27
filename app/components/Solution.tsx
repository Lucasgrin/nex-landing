import AnimateOnScroll from "./AnimateOnScroll";
const steps = [
  {n:"01",title:"Audit",       desc:"Nous analysons vos processus, vos outils et vos points de friction. Rien n'est construit avant d'avoir compris comment vous travaillez."},
  {n:"02",title:"Conception",  desc:"Nous co-construisons la solution avec vous. Maquettes, parcours, architecture — validés à chaque étape."},
  {n:"03",title:"Développement",desc:"Livraisons itératives. Vous voyez avancer votre projet dès les premières semaines."},
  {n:"04",title:"Déploiement", desc:"Mise en production accompagnée, formation des équipes, documentation complète."},
  {n:"05",title:"Évolutions",  desc:"Votre entreprise grandit. Votre logiciel aussi. Nous restons partenaires sur le long terme."},
];
export default function Solution() {
  return (
    <section className="py-28 px-6 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Notre méthode</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-4 max-w-xl" style={{fontFamily:"var(--font-space-grotesk)"}}>
            Analyser avant de construire.
          </h2>
          <p className="text-base text-neutral-500 max-w-lg mb-16 leading-relaxed">Chaque projet commence par une compréhension profonde de votre façon de travailler.</p>
        </AnimateOnScroll>
        <div className="space-y-3">
          {steps.map(({n,title,desc},i) => (
            <AnimateOnScroll key={n} delay={i*80}>
              <div className="group flex items-start gap-8 p-6 rounded-2xl bg-white border border-neutral-100 hover:border-neutral-300 hover:shadow-sm transition-all duration-200">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-400 group-hover:bg-[#0a0a0a] group-hover:text-white group-hover:border-[#0a0a0a] transition-all duration-200">
                  {n}
                </div>
                <div>
                  <p className="text-base font-bold text-[#0a0a0a] mb-1.5" style={{fontFamily:"var(--font-space-grotesk)"}}>{title}</p>
                  <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
