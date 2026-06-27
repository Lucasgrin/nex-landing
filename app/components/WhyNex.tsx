import AnimateOnScroll from "./AnimateOnScroll";
const reasons = [
  {icon:"◆",title:"Nous utilisons nos propres solutions",desc:"L'ensemble de nos entreprises fonctionnent avec des outils que nous avons développés. Nous savons exactement ce que ça change."},
  {icon:"⊕",title:"Basés en Suisse romande",             desc:"Siège à Payerne. Nous connaissons le tissu économique local et les réalités des PME."},
  {icon:"◎",title:"Accompagnement humain",                desc:"Un interlocuteur dédié. Une relation directe avec les personnes qui construisent votre outil."},
  {icon:"▤",title:"Une seule équipe, de A à Z",          desc:"Audit, conception, développement, formation. Une équipe qui connaît votre projet dans sa globalité."},
  {icon:"⟳",title:"Évolutif par conception",             desc:"Votre outil est conçu pour grandir. Nouvelles fonctionnalités, nouveaux processus — tout peut s'adapter."},
  {icon:"≋",title:"Pensé pour durer",                    desc:"Technologies éprouvées, code propre, documentation complète. Pas de dette technique dès le départ."},
  {icon:"✦",title:"L'IA utile, jamais gadget",           desc:"Nous n'intégrons l'IA que là où elle apporte une valeur mesurable. Des résultats concrets, pas des buzzwords."},
];
export default function WhyNex() {
  return (
    <section id="pourquoi-nex" className="py-28 px-6 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Pourquoi nous choisir</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-16 max-w-xl" style={{fontFamily:"var(--font-space-grotesk)"}}>
            Une agence qui construit ce qu&apos;elle utilise.
          </h2>
        </AnimateOnScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {reasons.map(({icon,title,desc},i) => (
            <AnimateOnScroll key={title} delay={i*55} className={i===6?"sm:col-span-2 lg:col-span-1":""}>
              <div className="group h-full bg-white border border-neutral-100 rounded-2xl p-7 hover:border-neutral-300 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-default">
                <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-lg text-neutral-300 mb-5 group-hover:bg-[#0a0a0a] group-hover:text-white group-hover:border-[#0a0a0a] transition-all duration-200">
                  {icon}
                </div>
                <h3 className="text-sm font-bold text-[#0a0a0a] mb-2" style={{fontFamily:"var(--font-space-grotesk)"}}>{title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
