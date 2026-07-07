const modules = [
  { icon: "◫", name: "Documents" },
  { icon: "◎", name: "Clients",        active: true },
  { icon: "◆", name: "IA" },
  { icon: "⟳", name: "Automatisations" },
  { icon: "▤", name: "Dashboard" },
  { icon: "≋", name: "Reporting" },
];

const clients = [
  { name: "Dupont SA",          status: "Relance envoyée ✓",  dot: "bg-green-400" },
  { name: "Fiduciaire Vallon",  status: "Devis signé ✓",      dot: "bg-green-400" },
  { name: "Atelier Muller",     status: "En attente",          dot: "bg-amber-400" },
  { name: "Martin & Co",        status: "Nouveau prospect",    dot: "bg-blue-400"  },
];

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-6 overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-[0.025]"
           style={{backgroundImage:"linear-gradient(#0a0a0a 1px,transparent 1px),linear-gradient(90deg,#0a0a0a 1px,transparent 1px)",backgroundSize:"60px 60px"}} />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

        {/* ── Text ── */}
        <div>
          <div className="hero-badge inline-flex items-center gap-2 border border-neutral-200 rounded-full px-4 py-1.5 text-xs font-medium text-neutral-400 mb-8">
            🇨🇭 Basés à Payerne · Actifs dans toute la Suisse romande
          </div>
          <h1 className="hero-title text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.06] text-[#0a0a0a] mb-6"
              style={{fontFamily:"var(--font-space-grotesk)"}}>
            Vos outils devraient travailler pour vos équipes.{" "}
            <span className="text-neutral-300">Pas l&apos;inverse.</span>
          </h1>
          <p className="hero-sub text-base text-neutral-500 leading-relaxed mb-3">
            NeX conçoit des outils métier sur mesure qui simplifient vos processus, centralisent vos informations et automatisent les tâches répétitives.
          </p>
          <p className="hero-sub text-base text-neutral-500 leading-relaxed mb-10">
            Chaque entreprise est différente. Vos outils devraient l&apos;être aussi.
          </p>
          <div className="hero-ctas flex flex-col sm:flex-row gap-3 mb-5">
            <a href="https://cal.com/agencesolve/reservez-votre-audit-offert?overlayCalendar=true" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center bg-[#0a0a0a] text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-neutral-800 transition-colors">
              Réserver un appel stratégique
            </a>
            <a href="/diagnostic"
               className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-neutral-500 border border-neutral-200 px-8 py-4 rounded-full hover:border-neutral-400 hover:text-[#0a0a0a] transition-colors">
              Diagnostic gratuit <span>→</span>
            </a>
          </div>
          <p className="hero-sub text-xs text-neutral-400">
            Premier échange sans engagement · 30 min · En français
          </p>
        </div>

        {/* ── App mockup ── */}
        <div className="hero-mockup mockup-shadow bg-white border border-neutral-200 rounded-2xl overflow-hidden">
          {/* Chrome */}
          <div className="flex items-center gap-1.5 px-4 py-3 bg-neutral-50 border-b border-neutral-100">
            <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
            <p className="ml-3 text-xs font-medium text-neutral-400">NeX Workspace</p>
            <div className="ml-auto flex items-center gap-1.5 text-xs font-medium text-green-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              actif
            </div>
          </div>

          {/* Body */}
          <div className="flex min-h-0">
            {/* Sidebar */}
            <div className="w-36 shrink-0 border-r border-neutral-100 py-3">
              {modules.map(({ icon, name, active }) => (
                <div key={name}
                     className={`flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg text-xs font-medium cursor-default ${
                       active ? "bg-[#0a0a0a] text-white" : "text-neutral-400"
                     }`}>
                  <span>{icon}</span>
                  {name}
                </div>
              ))}
            </div>

            {/* Main */}
            <div className="flex-1 p-4 min-w-0">
              {/* KPIs */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { l: "Clients",     v: "127", d: "+12%" },
                  { l: "Tâches auto", v: "23",  d: "actives" },
                  { l: "Relances",    v: "8",   d: "auto" },
                ].map(({ l, v, d }) => (
                  <div key={l} className="bg-neutral-50 rounded-xl p-2.5">
                    <p className="text-[9px] text-neutral-400 mb-1">{l}</p>
                    <p className="text-base font-bold text-[#0a0a0a] leading-none">{v}</p>
                    <p className="text-[9px] text-green-500 mt-0.5">{d} ✓</p>
                  </div>
                ))}
              </div>

              {/* Client list */}
              <div className="space-y-1.5 mb-3">
                {clients.map(({ name, status, dot }) => (
                  <div key={name} className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-neutral-50">
                    <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] font-bold text-neutral-500 shrink-0">
                      {name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#0a0a0a] truncate">{name}</p>
                      <p className="text-[9px] text-neutral-400">{status}</p>
                    </div>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                  </div>
                ))}
              </div>

              {/* AI agent */}
              <div className="bg-[#0a0a0a] rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white text-xs">◆</span>
                  <p className="text-[11px] font-semibold text-white">Agent IA — Actif</p>
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
                </div>
                <p className="text-[9px] text-white/55">3 relances · 2 docs traités · 0 saisie manuelle</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
