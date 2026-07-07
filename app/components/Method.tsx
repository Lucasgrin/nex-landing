import AnimateOnScroll from "./AnimateOnScroll";

const steps = [
  { n: "01", title: "Découverte",              desc: "Nous prenons le temps de comprendre votre entreprise, vos équipes et vos contraintes avant d'écrire une seule ligne de code." },
  { n: "02", title: "Analyse des processus",   desc: "Nous cartographions vos flux de travail pour identifier ce qui doit être simplifié, automatisé ou centralisé." },
  { n: "03", title: "Prototype",               desc: "Vous validez l'interface et les parcours utilisateurs avant le développement. Rien n'est construit dans le vide." },
  { n: "04", title: "Développement",           desc: "Livraisons itératives et régulières. Vous voyez votre outil prendre forme dès les premières semaines." },
  { n: "05", title: "Formation",               desc: "Vos équipes sont accompagnées à la prise en main. L'adoption est au cœur de chaque déploiement." },
  { n: "06", title: "Évolution continue",      desc: "Votre outil grandit avec votre entreprise. Nous restons partenaires sur le long terme." },
];

export default function Method() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* Left: header */}
          <AnimateOnScroll>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Notre approche</p>
            <h2 className="text-4xl font-bold tracking-tight text-[#0a0a0a] mb-5 leading-[1.08]"
                style={{fontFamily:"var(--font-space-grotesk)"}}>
              Nous commençons toujours par comprendre votre entreprise.
            </h2>
            <p className="text-base text-neutral-500 leading-relaxed">
              Nous ne développons pas simplement un logiciel. Nous construisons un outil capable d&apos;évoluer avec votre entreprise.
            </p>
          </AnimateOnScroll>

          {/* Right: vertical timeline */}
          <div className="relative">
            {/* Connecting line behind the circles */}
            <div className="absolute left-[19px] top-5 bottom-10 w-px bg-gradient-to-b from-neutral-200 via-neutral-100 to-transparent pointer-events-none" />

            {steps.map(({ n, title, desc }, i) => (
              <AnimateOnScroll key={n} delay={i * 80}>
                <div className="relative flex items-start gap-5 pb-9 last:pb-0">
                  {/* Number circle */}
                  <div className={`shrink-0 relative z-10 w-[38px] h-[38px] rounded-full flex items-center justify-center text-[11px] font-bold tracking-tight transition-colors ${
                    n === "01"
                      ? "bg-[#0a0a0a] border-2 border-[#0a0a0a] text-white"
                      : "bg-white border-2 border-neutral-200 text-neutral-400"
                  }`}>
                    {n}
                  </div>
                  {/* Content */}
                  <div className="pt-1.5">
                    <p className="text-sm font-bold text-[#0a0a0a] mb-1.5"
                       style={{fontFamily:"var(--font-space-grotesk)"}}>{title}</p>
                    <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
