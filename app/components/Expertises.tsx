import AnimateOnScroll from "./AnimateOnScroll";
const expertises = [
  {title:"CRM sur mesure",       desc:"Gérez clients, contacts et pipeline dans un outil pensé pour vos processus.",icon:"◎"},
  {title:"ERP sur mesure",       desc:"Centralisez stocks, finances, RH et production dans une seule interface.",icon:"⊞"},
  {title:"Portail client",       desc:"Un espace dédié pour vos clients : suivi de projets, documents, messagerie.",icon:"◫"},
  {title:"Applications métier",  desc:"Outils internes construits pour vos équipes opérationnelles. Pour leur quotidien réel.",icon:"◈"},
  {title:"Automatisations",      desc:"Relances, notifications, synchronisations — sans aucune intervention manuelle.",icon:"⟳"},
  {title:"Agents IA",            desc:"Assistants intelligents qui analysent, rédigent ou décident selon vos règles métier.",icon:"◆"},
  {title:"Dashboards",           desc:"Vos données en temps réel, avec les indicateurs qui comptent vraiment pour vous.",icon:"▤"},
  {title:"Intégrations",         desc:"Connectez vos outils existants. Plus de double saisie, plus de silos.",icon:"⊕"},
  {title:"Gestion documentaire", desc:"Centralisez, organisez et partagez avec workflows de validation et de signature.",icon:"≋"},
];
export default function Expertises() {
  return (
    <section id="expertises" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Ce que nous construisons</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-4 max-w-xl" style={{fontFamily:"var(--font-space-grotesk)"}}>
            Des solutions pour chaque besoin.
          </h2>
          <p className="text-base text-neutral-500 max-w-lg mb-16 leading-relaxed">Chaque outil est conçu de zéro, autour de vos processus — pas l&apos;inverse.</p>
        </AnimateOnScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {expertises.map(({title,desc,icon},i) => (
            <AnimateOnScroll key={title} delay={i*55}>
              <div className="group h-full border border-neutral-100 rounded-2xl p-7 hover:border-neutral-300 hover:-translate-y-1 hover:shadow-md transition-all duration-200 bg-white cursor-default">
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
