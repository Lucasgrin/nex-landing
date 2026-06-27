import AnimateOnScroll from "./AnimateOnScroll";
const problems = [
  {icon:"⊞",label:"Excel partout",     desc:"Des fichiers qui se multiplient, que personne ne tient à jour."},
  {icon:"✉",label:"Emails perdus",      desc:"Des informations noyées dans des boîtes mail surchargées."},
  {icon:"◎",label:"WhatsApp pro",       desc:"Des décisions importantes dans des fils éphémères."},
  {icon:"⟳",label:"Double saisie",      desc:"Les mêmes données ressaisies dans plusieurs outils."},
  {icon:"⚙",label:"Processus manuels", desc:"Des tâches répétitives qui mobilisent vos équipes chaque jour."},
  {icon:"◫",label:"Données dispersées",desc:"Impossible de savoir où se trouve l'information fiable."},
  {icon:"⊗",label:"Logiciels isolés",  desc:"Vos outils ne se parlent pas. Vous faites le lien à la main."},
  {icon:"◷",label:"Temps perdu",       desc:"Des heures chaque semaine à gérer l'outil plutôt que le business."},
];
export default function Problems() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Le constat</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-4 max-w-2xl" style={{fontFamily:"var(--font-space-grotesk)"}}>
            Votre entreprise fonctionne avec trop d&apos;outils.
          </h2>
          <p className="text-base text-neutral-500 max-w-lg mb-16 leading-relaxed">Ce n&apos;est pas une question de taille. C&apos;est le quotidien de la plupart des PME.</p>
        </AnimateOnScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {problems.map(({icon,label,desc},i) => (
            <AnimateOnScroll key={label} delay={i*50}>
              <div className="group border border-neutral-100 rounded-2xl p-6 hover:border-neutral-300 hover:-translate-y-1 hover:shadow-md transition-all duration-200 bg-white cursor-default">
                <span className="text-2xl block mb-4 text-neutral-300 group-hover:text-[#0a0a0a] transition-colors">{icon}</span>
                <p className="text-sm font-semibold text-[#0a0a0a] mb-2">{label}</p>
                <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
