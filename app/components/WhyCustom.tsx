import AnimateOnScroll from "./AnimateOnScroll";
export default function WhyCustom() {
  return (
    <section className="py-28 px-6 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Pourquoi du sur-mesure</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 max-w-2xl" style={{fontFamily:"var(--font-space-grotesk)"}}>
            <span className="text-[#0a0a0a]">Un logiciel générique vous oblige à changer.</span><br />
            <span className="text-neutral-300">Le nôtre s&apos;adapte à vous.</span>
          </h2>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 gap-4">
          <AnimateOnScroll delay={0}>
            <div className="rounded-2xl p-8 bg-white border border-neutral-100">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center"><span className="text-neutral-300 text-sm">×</span></div>
                <p className="text-xs font-bold text-neutral-300 uppercase tracking-widest">Logiciel générique</p>
              </div>
              <ul className="space-y-4">
                {["Vous adaptez vos processus à l'outil","Des fonctionnalités dont vous n'avez pas besoin","Des limitations sur ce qui compte vraiment","Tarification par utilisateur qui explose","Dépendance à un éditeur étranger","Aucune évolution selon vos besoins"].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-neutral-400">
                    <span className="mt-0.5 shrink-0 text-neutral-200">—</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={80}>
            <div className="rounded-2xl p-8 bg-[#0a0a0a] text-white border border-[#0a0a0a]">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><span className="text-white text-sm">✓</span></div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Avec NeX</p>
              </div>
              <ul className="space-y-4">
                {["Le logiciel s'adapte à vos processus existants","Uniquement les fonctionnalités dont vous avez besoin","Aucune limitation sur vos cas d'usage métier","Coût fixe, prévisible, sans surprise","Vous restez propriétaire de votre solution","Évolutions continues selon votre croissance"].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="mt-0.5 shrink-0 text-white/30">—</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
