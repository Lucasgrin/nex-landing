import AnimateOnScroll from "./AnimateOnScroll";
export default function FinalCTA() {
  return (
    <section id="contact" className="py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-6">Passons à l&apos;action</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-6 leading-[1.1]" style={{fontFamily:"var(--font-space-grotesk)"}}>
              Votre entreprise mérite mieux que des dizaines d&apos;outils mal connectés.
            </h2>
            <p className="text-base text-neutral-500 mb-10 leading-relaxed">
              Lors de notre premier échange, nous analysons vos processus et identifions ensemble les gains possibles.
            </p>
            <a href="https://cal.com/nex" className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-bold px-8 py-4 rounded-full hover:bg-neutral-800 transition-colors">
              Réserver un appel stratégique <span>→</span>
            </a>
            <div className="mt-7 flex items-center justify-center gap-6 text-xs text-neutral-400">
              {["Premier échange sans engagement","30 minutes","En français"].map(t => (
                <span key={t} className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-neutral-300" />{t}</span>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
