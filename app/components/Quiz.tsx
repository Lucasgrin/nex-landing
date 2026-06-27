import AnimateOnScroll from "./AnimateOnScroll";
export default function Quiz() {
  return (
    <section id="diagnostic" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <div className="bg-[#0a0a0a] rounded-3xl px-10 py-20 text-white text-center max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-6">Diagnostic gratuit</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4" style={{fontFamily:"var(--font-space-grotesk)"}}>
              Votre entreprise est-elle prête à gagner plusieurs heures chaque semaine ?
            </h2>
            <p className="text-base text-white/60 leading-relaxed mb-10 max-w-md mx-auto">
              En 5 minutes, notre diagnostic identifie les processus à fort potentiel d&apos;optimisation dans votre entreprise.
            </p>
            <a href="#diagnostic-form" className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] text-sm font-bold px-8 py-4 rounded-full hover:bg-neutral-100 transition-colors">
              Faire le diagnostic gratuit <span>→</span>
            </a>
            <p className="mt-5 text-xs text-white/25">Sans inscription · Résultat immédiat</p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
