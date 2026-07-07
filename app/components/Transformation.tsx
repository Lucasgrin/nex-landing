"use client";
import { useEffect, useRef, useState } from "react";

function s(visible: boolean, delay: number, from: "left" | "right" | "up" = "up") {
  const x = from === "left" ? (visible ? 0 : -56) : from === "right" ? (visible ? 0 : 56) : 0;
  const y = from === "up" ? (visible ? 0 : 28) : 0;
  return {
    opacity: visible ? 1 : 0,
    transform: `translate(${x}px, ${y}px)`,
    transition: `opacity 0.75s ease-out ${delay}ms, transform 0.75s ease-out ${delay}ms`,
  } as React.CSSProperties;
}

const beforeItems = [
  { bg:"bg-green-50", text:"text-green-600", icon:"⊞", name:"Excel_clients_FINAL_v3.xlsx",  sub:"Modifié il y a 3 jours · 847 lignes",    badge:null },
  { bg:"bg-blue-50",  text:"text-blue-500",  icon:"✉", name:"Boîte mail",                    sub:"RE: RE: RE: Devis Dupont…",               badge:{n:"47",c:"bg-red-100 text-red-500"} },
  { bg:"bg-[#e7fbe7]",text:"text-[#25d366]", icon:"💬",name:"WhatsApp — Équipe",             sub:"\"T'as le contact de Martin ?\"",         badge:{n:"12",c:"bg-[#e7fbe7] text-[#25d366]"} },
  { bg:"bg-green-50", text:"text-green-600", icon:"⊞", name:"Planning_2024_NEW_v2.xlsx",     sub:"⚠ Doublons détectés · 3 onglets",         badge:null },
  { bg:"bg-orange-50",text:"text-orange-400",icon:"📋",name:"Calendrier — 3 conflits",       sub:"Réunions non synchronisées",              badge:{n:"!",c:"bg-orange-100 text-orange-500"} },
  { bg:"bg-amber-50", text:"text-amber-500", icon:"📌",name:"Post-it: Rappeler Dupont",      sub:"Voir email Marc du 12/03",                badge:null },
];

export default function Transformation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="transformation" className="py-28 md:py-40 px-6 overflow-hidden bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20" style={s(visible, 0, "up")}>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Ce que ça change</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a0a0a] leading-[1.06]" style={{fontFamily:"var(--font-space-grotesk)"}}>
            De la dispersion<br />à la clarté.
          </h2>
          <p className="mt-6 text-base md:text-lg text-neutral-500 max-w-lg mx-auto leading-relaxed">
            Avant, vos données vivent dans 5 outils différents qui ne se parlent pas.<br className="hidden md:block" />
            Après, tout converge. L&apos;IA automatise le reste.
          </p>
        </div>

        {/* Three-column visual */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_88px_1fr] gap-6 lg:gap-0 items-stretch mb-16">

          {/* ── LEFT — AVANT ─────────────────────────────────── */}
          <div style={s(visible, 160, "left")}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Avant NeX</p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
              {/* mock chrome */}
              <div className="shrink-0 flex items-center gap-1.5 px-4 py-3 bg-neutral-50 border-b border-neutral-100">
                <span className="w-2 h-2 rounded-full bg-red-300" />
                <span className="w-2 h-2 rounded-full bg-amber-300" />
                <span className="w-2 h-2 rounded-full bg-green-300" />
                <p className="ml-3 text-xs text-neutral-400">Bureau · Accueil</p>
              </div>
              {/* cards */}
              <div className="flex-1 p-4 space-y-2.5">
                {beforeItems.map(({bg,text,icon,name,sub,badge},i) => (
                  <div key={name} style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-24px)",
                    transition: `opacity 0.5s ease-out ${220 + i * 80}ms, transform 0.5s ease-out ${220 + i * 80}ms`,
                  }}>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-neutral-100 bg-white">
                      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center text-sm shrink-0 ${text}`}>{icon}</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-neutral-600 truncate">{name}</p>
                        <p className="text-[10px] text-neutral-400 truncate">{sub}</p>
                      </div>
                      {badge && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${badge.c}`}>{badge.n}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="shrink-0 px-4 pb-4 flex items-center gap-2" style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 0.5s ease-out ${220 + beforeItems.length * 80}ms`,
              }}>
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <p className="text-[10px] text-neutral-400">6 outils · aucune synchronisation · temps perdu chaque jour</p>
              </div>
            </div>
          </div>

          {/* ── CENTER — arrow ────────────────────────────────── */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-4"
               style={s(visible, 500, "up")}>
            <div className="w-1 h-10 rounded bg-neutral-200" />
            <div className="flow-dot-1 w-1 h-1 rounded-full bg-neutral-300" />
            <div className="flow-dot-2 w-1 h-1 rounded-full bg-neutral-300" />
            <div className="flow-dot-3 w-1 h-1 rounded-full bg-neutral-300" />
            <div className="pulse-arrow w-12 h-12 rounded-full bg-[#0a0a0a] flex items-center justify-center text-white font-bold text-xl shadow-xl">
              →
            </div>
            <div className="flow-dot-1 w-1 h-1 rounded-full bg-neutral-300" />
            <div className="flow-dot-2 w-1 h-1 rounded-full bg-neutral-300" />
            <div className="flow-dot-3 w-1 h-1 rounded-full bg-neutral-300" />
            <div className="w-1 h-10 rounded bg-neutral-200" />
            <p className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest">NeX</p>
          </div>

          {/* mobile center */}
          <div className="flex lg:hidden items-center justify-center gap-3 py-2"
               style={s(visible, 500, "up")}>
            <div className="h-1 w-10 rounded bg-neutral-200" />
            <div className="pulse-arrow w-10 h-10 rounded-full bg-[#0a0a0a] flex items-center justify-center text-white font-bold shadow-xl">↓</div>
            <div className="h-1 w-10 rounded bg-neutral-200" />
          </div>

          {/* ── RIGHT — APRÈS ─────────────────────────────────── */}
          <div style={s(visible, 280, "right")}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Avec NeX</p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
              {/* mock chrome */}
              <div className="shrink-0 flex items-center gap-1.5 px-4 py-3 bg-neutral-50 border-b border-neutral-100">
                <span className="w-2 h-2 rounded-full bg-neutral-200" />
                <span className="w-2 h-2 rounded-full bg-neutral-200" />
                <span className="w-2 h-2 rounded-full bg-neutral-200" />
                <p className="ml-3 text-xs text-neutral-400">NeX · Vue centralisée</p>
              </div>
              {/* stats */}
              <div className="grid grid-cols-3 gap-px bg-neutral-100 shrink-0" style={s(visible, 420, "up")}>
                {[{l:"Clients",v:"127",d:"+12%"},{l:"Tâches auto",v:"23",d:"actives"},{l:"Relances",v:"8",d:"aujourd'hui"}].map(({l,v,d}) => (
                  <div key={l} className="bg-white px-4 py-3">
                    <p className="text-[9px] text-neutral-400 mb-0.5">{l}</p>
                    <p className="text-lg font-bold text-[#0a0a0a]">{v}</p>
                    <p className="text-[9px] text-green-500">{d} ✓</p>
                  </div>
                ))}
              </div>
              {/* clients */}
              <div className="flex-1 p-4 space-y-2">
                {[
                  {n:"Dupont SA",       s:"Relance auto envoyée ✓",   dot:"bg-green-400", delay:460},
                  {n:"Fiduciaire Vallon",s:"Devis signé — archivé ✓", dot:"bg-green-400", delay:520},
                  {n:"Atelier Muller",  s:"En attente de signature",  dot:"bg-amber-400", delay:580},
                  {n:"Martin & Co",     s:"Nouveau prospect — IA",    dot:"bg-blue-400",  delay:640},
                ].map(({n,s:status,dot,delay}) => (
                  <div key={n} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-neutral-50"
                       style={{
                         opacity: visible ? 1 : 0,
                         transform: visible ? "translateX(0)" : "translateX(24px)",
                         transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
                       }}>
                    <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center text-[11px] font-bold text-neutral-500 shrink-0">{n[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#0a0a0a]">{n}</p>
                      <p className="text-[10px] text-neutral-400">{status}</p>
                    </div>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                  </div>
                ))}
              </div>
              {/* AI */}
              <div className="shrink-0 mx-4 mb-4 p-4 rounded-xl bg-[#0a0a0a]"
                   style={s(visible, 700, "up")}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white">◆</span>
                  <p className="text-xs font-semibold text-white">Agent IA — Actif</p>
                  <span className="ml-auto w-2 h-2 rounded-full bg-green-400" />
                </div>
                <p className="text-[10px] text-white/60 leading-relaxed">
                  3 relances envoyées · 2 documents traités · 0 saisie manuelle ce matin
                </p>
              </div>
              <div className="shrink-0 px-4 pb-4 flex items-center gap-2" style={s(visible, 760, "up")}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <p className="text-[10px] text-neutral-400">1 outil · tout synchronisé · zéro saisie manuelle</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={s(visible, 860, "up")}>
          {[
            {v:"−6h",    l:"par semaine récupérées"},
            {v:"0",      l:"saisie manuelle"},
            {v:"1",      l:"outil centralisé"},
            {v:"100%",   l:"données en temps réel"},
          ].map(({v,l}) => (
            <div key={l} className="text-center py-6 px-4 bg-white border border-neutral-100 rounded-2xl">
              <p className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-1.5" style={{fontFamily:"var(--font-space-grotesk)"}}>{v}</p>
              <p className="text-xs text-neutral-400">{l}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
