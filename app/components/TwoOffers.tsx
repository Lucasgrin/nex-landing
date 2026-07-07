import AnimateOnScroll from "./AnimateOnScroll";

const offers = [
  {
    number: "01",
    icon: "⊞",
    title: "Logiciels métier sur mesure",
    tagline: "L'outil qui s'adapte à vous — pas l'inverse.",
    desc: "Chaque entreprise a ses propres processus. Nous construisons exactement ce dont vous avez besoin : ni plus, ni moins. CRM, ERP, portails, applications internes.",
    features: [
      "CRM et ERP pensés pour vos flux réels",
      "Portails clients et espaces partenaires",
      "Applications internes pour vos équipes",
      "Dashboards et reporting en temps réel",
      "Intégrations avec vos outils existants",
    ],
    cta: { label: "Voir nos réalisations", href: "#realisations" },
    dark: false,
  },
  {
    number: "02",
    icon: "◆",
    title: "Intelligence artificielle",
    tagline: "L'IA utile — là où elle fait une vraie différence.",
    desc: "Nous n'intégrons l'IA que là où elle apporte une valeur mesurable : automatiser les tâches répétitives, analyser vos données, décider à votre place.",
    features: [
      "Agents IA pour vos processus métier",
      "Automatisations et workflows intelligents",
      "Analyse de données et détection d'anomalies",
      "Chatbots et assistants métier sur mesure",
      "Relances et notifications automatisées",
    ],
    cta: { label: "Découvrir nos solutions IA", href: "#expertises" },
    dark: true,
  },
];

export default function TwoOffers() {
  return (
    <section className="py-28 px-6 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-5xl mx-auto">

        {/* Header centré */}
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Nos deux expertises</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-5" style={{fontFamily:"var(--font-space-grotesk)"}}>
              Deux domaines. Une seule équipe.
            </h2>
            <p className="text-base text-neutral-500 max-w-md mx-auto leading-relaxed">
              Nous ne vous imposons rien — nous choisissons avec vous ce qui fait sens pour votre entreprise.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {offers.map(({ number, icon, title, tagline, desc, features, cta, dark }, i) => (
            <AnimateOnScroll key={number} delay={i * 100}>
              <div className={`h-full rounded-3xl p-10 flex flex-col ${
                dark
                  ? "bg-[#0a0a0a]"
                  : "bg-white border border-neutral-300 shadow-lg"
              }`}>

                {/* Top */}
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                    dark ? "bg-white/10 text-white/70" : "bg-neutral-50 border border-neutral-100 text-neutral-400"
                  }`}>
                    {icon}
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${dark ? "text-white/15" : "text-neutral-200"}`}>
                    {number}
                  </span>
                </div>

                {/* Titre + accroche */}
                <h3 className={`text-2xl font-bold leading-tight mb-2 ${dark ? "text-white" : "text-[#0a0a0a]"}`}
                    style={{fontFamily:"var(--font-space-grotesk)"}}>
                  {title}
                </h3>
                <p className={`text-sm font-medium mb-5 ${dark ? "text-white/40" : "text-neutral-400"}`}>
                  {tagline}
                </p>
                <p className={`text-sm leading-relaxed mb-8 ${dark ? "text-white/55" : "text-neutral-500"}`}>
                  {desc}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-10 flex-1">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <span className={`mt-[3px] shrink-0 text-[11px] font-bold ${dark ? "text-white/30" : "text-neutral-300"}`}>✓</span>
                      <span className={`text-sm leading-snug ${dark ? "text-white/65" : "text-neutral-600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a href={cta.href}
                   className={`inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-full transition-colors ${
                     dark
                       ? "bg-white text-[#0a0a0a] hover:bg-neutral-100"
                       : "bg-[#0a0a0a] text-white hover:bg-neutral-800"
                   }`}>
                  {cta.label} <span>→</span>
                </a>

              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* CTA secondaire */}
        <AnimateOnScroll delay={220}>
          <div className="text-center">
            <p className="text-sm text-neutral-400 mb-4">Vous ne savez pas encore par où commencer ?</p>
            <a href="#contact"
               className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 border border-neutral-200 bg-white px-7 py-3 rounded-full hover:border-neutral-400 hover:text-[#0a0a0a] transition-colors">
              Parlons-en ensemble <span>→</span>
            </a>
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
