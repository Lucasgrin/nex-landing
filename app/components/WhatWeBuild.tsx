import AnimateOnScroll from "./AnimateOnScroll";

const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
    <path d="M5 3.5L5.8 5.8L8 6.5L5.8 7.2L5 9.5L4.2 7.2L2 6.5L4.2 5.8L5 3.5Z" opacity="0.5" />
    <path d="M19 14L19.8 16.3L22 17L19.8 17.7L19 20L18.2 17.7L16 17L18.2 16.3L19 14Z" opacity="0.5" />
  </svg>
);

const BarChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const cards = [
  { Icon: MonitorIcon,  title: "Logiciels métier",        items: ["CRM sur mesure", "ERP sur mesure", "Applications internes"] },
  { Icon: UsersIcon,    title: "Portails",                 items: ["Portail clients", "Espace collaborateurs", "Interface partenaires"] },
  { Icon: ZapIcon,      title: "Automatisations",          items: ["Workflows métier", "Synchronisations", "Notifications automatiques"] },
  { Icon: SparkleIcon,  title: "Intelligence artificielle",items: ["Assistants métier", "Analyse documentaire", "Agents IA"] },
  { Icon: BarChartIcon, title: "Dashboards",               items: ["KPIs en temps réel", "Reporting", "Pilotage"] },
  { Icon: LinkIcon,     title: "Intégrations",             items: ["Bexio · Microsoft 365", "Google Workspace", "API & connecteurs"] },
];

export default function WhatWeBuild() {
  return (
    <section className="py-28 px-6 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-5xl mx-auto">

        <AnimateOnScroll>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Ce que nous construisons</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-5 max-w-xl leading-[1.08]"
              style={{fontFamily:"var(--font-space-grotesk)"}}>
            Les outils dont votre entreprise a réellement besoin.
          </h2>
          <p className="text-base text-neutral-500 max-w-lg mb-16 leading-relaxed">
            Nous ne vendons pas de technologie. Nous concevons les bons outils en fonction de vos processus et de vos objectifs.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {cards.map(({ Icon, title, items }, i) => (
            <AnimateOnScroll key={title} delay={i * 60}>
              <div className="group h-full bg-white border border-neutral-100 rounded-2xl p-7 hover:border-neutral-300 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-500 mb-5 group-hover:bg-[#0a0a0a] group-hover:text-white group-hover:border-[#0a0a0a] transition-all duration-200">
                  <Icon />
                </div>
                <h3 className="text-sm font-bold text-[#0a0a0a] mb-3"
                    style={{fontFamily:"var(--font-space-grotesk)"}}>{title}</h3>
                <ul className="space-y-1.5">
                  {items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-neutral-500">
                      <span className="w-1 h-1 rounded-full bg-neutral-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={400}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white border border-neutral-100 rounded-2xl px-8 py-6">
            <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
              Chaque projet est différent. Nous construisons uniquement ce qui apporte une réelle valeur à votre entreprise.
            </p>
            <a href="https://cal.com/agencesolve/reservez-votre-audit-offert?overlayCalendar=true" target="_blank" rel="noopener noreferrer"
               className="shrink-0 inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors whitespace-nowrap">
              Réserver un appel <span>→</span>
            </a>
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
