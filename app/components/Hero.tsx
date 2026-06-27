"use client";
import { useEffect, useState, useCallback } from "react";

const flows = [
  {
    name: "Qualification automatique des leads",
    time: "~2 min · Sans intervention humaine",
    steps: [
      { type:"trigger", icon:"✉",  tag:"Déclencheur", label:"Nouveau lead reçu" },
      { type:"ai",      icon:"◆",  tag:"Agent IA",    label:"Qualification auto" },
      { type:"tool",    icon:"◎",  tag:"Outil",       label:"CRM mis à jour" },
      { type:"result",  icon:"✓",  tag:"Résultat",    label:"RDV booké" },
    ],
  },
  {
    name: "Traitement des factures entrantes",
    time: "~30 sec · 0 erreur de saisie",
    steps: [
      { type:"trigger", icon:"▤",  tag:"Déclencheur", label:"Facture reçue" },
      { type:"ai",      icon:"◆",  tag:"Agent IA",    label:"Extraction données" },
      { type:"tool",    icon:"≋",  tag:"Outil",       label:"Compta mise à jour" },
      { type:"result",  icon:"✓",  tag:"Résultat",    label:"Paiement tracé" },
    ],
  },
  {
    name: "Relance clients automatisée",
    time: "~5 sec · Personnalisée par client",
    steps: [
      { type:"trigger", icon:"◈",  tag:"Déclencheur", label:"Délai dépassé" },
      { type:"ai",      icon:"◆",  tag:"Agent IA",    label:"Rédaction auto" },
      { type:"tool",    icon:"✉",  tag:"Outil",       label:"Email envoyé" },
      { type:"result",  icon:"✓",  tag:"Résultat",    label:"Réponse tracée" },
    ],
  },
  {
    name: "Rapport hebdomadaire automatique",
    time: "~1 min · Chaque lundi à 8h",
    steps: [
      { type:"trigger", icon:"◻",  tag:"Déclencheur", label:"Planifié" },
      { type:"ai",      icon:"◆",  tag:"Agent IA",    label:"Analyse données" },
      { type:"tool",    icon:"▤",  tag:"Outil",       label:"Dashboard mis à jour" },
      { type:"result",  icon:"✉",  tag:"Résultat",    label:"Équipe notifiée" },
    ],
  },
  {
    name: "Onboarding client automatisé",
    time: "~3 min · 100% sans copier-coller",
    steps: [
      { type:"trigger", icon:"⊕",  tag:"Déclencheur", label:"Contrat signé" },
      { type:"ai",      icon:"◆",  tag:"Agent IA",    label:"Dossier créé" },
      { type:"tool",    icon:"◎",  tag:"Outil",       label:"Portail activé" },
      { type:"result",  icon:"✓",  tag:"Résultat",    label:"Client accueilli" },
    ],
  },
];

const stepCls: Record<string,string> = {
  trigger: "bg-neutral-100 border border-neutral-200 text-neutral-700",
  ai:      "bg-[#0a0a0a] border border-[#0a0a0a] text-white",
  tool:    "bg-neutral-100 border border-neutral-200 text-neutral-700",
  result:  "bg-green-50 border border-green-200 text-green-700",
};
const tagCls: Record<string,string> = {
  trigger: "text-neutral-400",
  ai:      "text-neutral-400",
  tool:    "text-neutral-400",
  result:  "text-green-500",
};

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [show, setShow]       = useState(true);

  const goTo = useCallback((i: number) => {
    setShow(false);
    setTimeout(() => { setCurrent(i); setShow(true); }, 320);
  }, []);

  const next = useCallback(() => goTo((current + 1) % flows.length), [current, goTo]);

  useEffect(() => {
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next]);

  const flow = flows[current];

  return (
    <section className="relative pt-28 pb-24 md:pt-36 md:pb-32 px-6 overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-[0.025]"
           style={{backgroundImage:"linear-gradient(#0a0a0a 1px,transparent 1px),linear-gradient(90deg,#0a0a0a 1px,transparent 1px)",backgroundSize:"60px 60px"}} />

      <div className="relative max-w-4xl mx-auto">

        {/* ── Text ──────────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="hero-badge inline-flex items-center gap-2 border border-neutral-200 rounded-full px-4 py-1.5 text-xs font-medium text-neutral-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Agence suisse · Payerne, Vaud
          </div>
          <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.04] text-[#0a0a0a] mb-7"
              style={{fontFamily:"var(--font-space-grotesk)"}}>
            Vos équipes ont<br />mieux à faire<br />
            <span className="text-neutral-300">que gérer leurs outils.</span>
          </h1>
          <p className="hero-sub text-base md:text-lg text-neutral-500 leading-relaxed max-w-xl mx-auto mb-10">
            NeX remplace vos processus manuels, vos fichiers Excel et vos outils déconnectés par des solutions sur mesure — qui tournent à votre place.
          </p>
          <div className="hero-ctas flex flex-col sm:flex-row gap-3 justify-center mb-5">
            <a href="#contact" className="inline-flex items-center justify-center bg-[#0a0a0a] text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-neutral-800 transition-colors">
              Réserver un appel stratégique
            </a>
            <a href="#diagnostic" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-neutral-500 border border-neutral-200 px-8 py-4 rounded-full hover:border-neutral-400 hover:text-[#0a0a0a] transition-colors">
              Diagnostic gratuit <span>→</span>
            </a>
          </div>
          <p className="hero-sub text-xs text-neutral-400">
            Premier échange sans engagement · 30 min · En français
          </p>
        </div>

        {/* ── Automation flow card ──────────────────────────────────── */}
        <div className="hero-mockup mockup-shadow bg-white border border-neutral-200 rounded-3xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-neutral-50 border-b border-neutral-100">
            <p className="text-sm font-semibold text-[#0a0a0a]">Vos automatisations NeX</p>
            <div className="flex items-center gap-1.5 text-xs font-medium text-green-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              actif
            </div>
          </div>

          {/* Steps */}
          <div className="px-6 md:px-10 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2"
                 style={{
                   opacity: show ? 1 : 0,
                   transform: show ? "translateY(0)" : "translateY(10px)",
                   transition: "opacity 0.32s ease-out, transform 0.32s ease-out",
                 }}>
              {flow.steps.map((step, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center flex-1 min-w-0">

                  {/* Pill */}
                  <div className="flex flex-col items-center shrink-0">
                    <p className={`text-[9px] font-bold uppercase tracking-widest mb-2.5 ${tagCls[step.type]}`}>
                      {step.tag}
                    </p>
                    <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl ${stepCls[step.type]}`}>
                      <span className="text-base leading-none">{step.icon}</span>
                      <span className="text-sm font-semibold whitespace-nowrap">{step.label}</span>
                    </div>
                  </div>

                  {/* Connector */}
                  {i < flow.steps.length - 1 && (
                    <div className="flex items-center justify-center flex-1 py-4 md:py-0 md:pb-6 md:px-2">
                      <div className="flex items-center gap-1">
                        <span className="flow-dot-1 w-1 h-1 rounded-full bg-neutral-300" />
                        <span className="flow-dot-2 w-1 h-1 rounded-full bg-neutral-300" />
                        <span className="flow-dot-3 w-1 h-1 rounded-full bg-neutral-300" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 md:px-10 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-neutral-100 pt-5">
            <div style={{
              opacity: show ? 1 : 0,
              transition: "opacity 0.32s ease-out 0.08s",
            }}>
              <p className="text-sm font-semibold text-[#0a0a0a]">{flow.name}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{flow.time}</p>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2 shrink-0">
              {flows.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} aria-label={`Flow ${i + 1}`}
                        className={`rounded-full transition-all duration-300 cursor-pointer ${
                          i === current ? "w-6 h-2 bg-[#0a0a0a]" : "w-2 h-2 bg-neutral-200 hover:bg-neutral-400"
                        }`} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
