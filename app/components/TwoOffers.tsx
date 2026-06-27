import AnimateOnScroll from "./AnimateOnScroll";
const swTags = ["CRM","ERP","Portail client","Application web","Dashboard","Documents","Gestion interne","Intégrations"];
const aiTags = ["Agents IA","Automatisations","Workflows","Analyse de données","Chatbots métier","Relances auto","Détection d'anomalies","Synthèse IA"];

export default function TwoOffers() {
  return (
    <section className="py-28 px-6 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Nos deux expertises</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-4 max-w-2xl" style={{fontFamily:"var(--font-space-grotesk)"}}>
            Deux domaines. Une seule équipe.
          </h2>
          <p className="text-base text-neutral-500 max-w-lg mb-16 leading-relaxed">
            Nous n&apos;imposons ni l&apos;un ni l&apos;autre. Nous choisissons avec vous ce qui fait sens pour votre entreprise.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Offer 1 — Custom software */}
          <AnimateOnScroll delay={0}>
            <div className="group h-full bg-white border border-neutral-100 rounded-3xl p-8 hover:border-neutral-300 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-2xl text-neutral-300 group-hover:bg-[#0a0a0a] group-hover:text-white group-hover:border-[#0a0a0a] transition-all duration-300">
                  ⊞
                </div>
                <span className="text-xs font-bold text-neutral-200 uppercase tracking-widest">01</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0a0a0a] mb-4 leading-tight" style={{fontFamily:"var(--font-space-grotesk)"}}>
                Logiciels métier<br />sur mesure
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-8">
                Chaque entreprise a des processus qui lui sont propres. Nous construisons
                l&apos;outil qui s&apos;adapte exactement à votre façon de travailler — pas l&apos;inverse.
                CRM, ERP, portails, applications internes, dashboards.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {swTags.map(t => (
                  <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-neutral-100 text-neutral-500">{t}</span>
                ))}
              </div>
              <a href="#realisations" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a0a0a] hover:gap-3 transition-all duration-200">
                Voir nos réalisations <span>→</span>
              </a>
            </div>
          </AnimateOnScroll>

          {/* Offer 2 — AI */}
          <AnimateOnScroll delay={100}>
            <div className="group h-full bg-[#0a0a0a] border border-[#0a0a0a] rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-2xl text-white/50 group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                  ◆
                </div>
                <span className="text-xs font-bold text-white/20 uppercase tracking-widest">02</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight" style={{fontFamily:"var(--font-space-grotesk)"}}>
                Intelligence<br />artificielle
              </h3>
              <p className="text-sm text-white/60 leading-relaxed mb-8">
                Nous intégrons l&apos;IA uniquement là où elle fait une vraie différence :
                automatiser les tâches répétitives, analyser les données, prédire, décider.
                Pas de gadget — des résultats mesurables.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {aiTags.map(t => (
                  <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/60">{t}</span>
                ))}
              </div>
              <a href="#expertises" className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white hover:gap-3 transition-all duration-200">
                Découvrir nos solutions IA <span>→</span>
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
