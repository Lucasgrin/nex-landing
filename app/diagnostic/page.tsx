"use client";
import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { SITE } from "../content/site";
import {
  type Answers, type Result,
  EMPTY_ANSWERS, EMPLOYEES, SECTORS, FIELD_TEAMS, ADMIN_PEOPLE, TOOLS, TOOLS_INTEGRATED, TOOLS_COST,
  FRICTION_QUESTIONS, FREQUENCY, INFO_ACCESS, ADMIN_HOURS, PROCESSES_DOC, PRIORITIES, TIMING,
  FRICTIONS, SECTOR_CASE, SECTOR_HINT, HOURLY_COST, WORK_WEEKS, calc, resultTitle,
} from "./engine";

/**
 * Le diagnostic gratuit.
 *
 * C'est la porte basse pression du site : on y arrive par « Pas encore
 * prêt ? ». Le site promet « 5 min, sans inscription, résultat immédiat » —
 * le résultat principal (score, heures, coût) s'affiche donc AVANT toute
 * demande de coordonnées. Ce qu'on échange contre l'e-mail, c'est le
 * détail : les frictions chiffrées, les priorités, les réalisations qui y
 * répondent, et le rapport dans sa boîte.
 */

type Screen = "intro" | "step1" | "step2" | "step3" | "step4" | "step5" | "calculating" | "preview" | "results";

interface Lead { name: string; company: string; role: string; email: string; phone: string }

interface StepProps {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  onNext: () => void;
  onBack: () => void;
}

const L0: Lead = { name: "", company: "", role: "", email: "", phone: "" };
const V = "#0a0a0a";
const STORAGE_KEY = "nex-diagnostic-v2";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const caseHref = (slug: string) => `/realisations/${slug}`;

// ── Atomes ───────────────────────────────────────────────────────────────────

function Chip({ label, selected, onClick, multi }: { label: string; selected: boolean; onClick: () => void; multi?: boolean }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={selected} className={`w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150 cursor-pointer ${
      selected ? "border-[#0a0a0a] bg-[#0a0a0a]/5 text-[#0a0a0a] shadow-[0_0_0_1px_#0a0a0a]" : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 hover:-translate-y-0.5"
    }`}>
      {multi && (
        <span className={`shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-all ${selected ? "border-[#0a0a0a] bg-[#0a0a0a]" : "border-neutral-300 bg-white"}`}>
          {selected && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><polyline points="1,3.5 3,5.5 8,1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </span>
      )}
      <span className="flex-1">{label}</span>
      {!multi && selected && (
        <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      )}
    </button>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", autoComplete }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; autoComplete?: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder ?? ""} autoComplete={autoComplete}
        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all bg-white"
      />
    </label>
  );
}

function Arrow() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="9 18 15 12 9 6"/></svg>;
}

function NavRow({ onBack, onNext, disabled, label = "Continuer" }: { onBack: () => void; onNext: () => void; disabled?: boolean; label?: string }) {
  return (
    <div className="flex items-center justify-between mt-12 pt-8 border-t border-neutral-100">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-700 transition-colors">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="15 18 9 12 15 6"/></svg>
        Retour
      </button>
      <button type="button" onClick={onNext} disabled={disabled}
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ backgroundColor: V }}>
        {label}<Arrow />
      </button>
    </div>
  );
}

function Q({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="mb-3">
      <p className="text-sm font-medium text-neutral-700">{label}</p>
      {hint && <p className="text-xs text-neutral-400 mt-0.5">{hint}</p>}
    </div>
  );
}

function StepHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] leading-tight mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>{title}</h2>
      {sub && <p className="text-sm text-neutral-500">{sub}</p>}
    </div>
  );
}

function FrictionSlider({ label, hint, value, onChange }: { label: string; hint: string; value: number; onChange: (v: number) => void }) {
  const answered = value >= 0;
  const pct = answered ? (value / 4) * 100 : 0;
  return (
    <div className="py-5 border-b border-neutral-100 last:border-0">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-sm text-neutral-800 font-medium leading-snug">{label}</p>
          <p className="text-xs text-neutral-400 mt-0.5">{hint}</p>
        </div>
        <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
              style={{ backgroundColor: answered ? V + "18" : "#f5f5f5", color: answered ? V : "#a3a3a3" }}>
          {answered ? FREQUENCY[value] : "À choisir"}
        </span>
      </div>
      {/* Cinq boutons plutôt qu'un curseur : un curseur non touché ressemble
          à une réponse, et il se règle mal au pouce. */}
      <div className="grid grid-cols-5 gap-1.5" role="radiogroup" aria-label={label}>
        {FREQUENCY.map((f, i) => (
          <button key={f} type="button" role="radio" aria-checked={value === i} onClick={() => onChange(i)}
            className={`rounded-lg border px-1 py-2 text-[11px] font-semibold leading-tight transition-colors ${
              value === i ? "border-[#0a0a0a] bg-[#0a0a0a] text-white" : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-400"
            }`}>
            {f}
          </button>
        ))}
      </div>
      <div className="h-1 mt-3 rounded-full bg-neutral-100 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: V }} />
      </div>
    </div>
  );
}

// ── Progression ──────────────────────────────────────────────────────────────

const STEP_META = [
  { nr: 1, title: "Votre entreprise", sub: "Le contexte" },
  { nr: 2, title: "Vos outils", sub: "Ce que vous utilisez" },
  { nr: 3, title: "Le quotidien", sub: "Où le temps se perd" },
  { nr: 4, title: "L'organisation", sub: "Comment l'équipe travaille" },
  { nr: 5, title: "Votre projet", sub: "Par quoi commencer" },
];

function StepSidebar({ current }: { current: number }) {
  return (
    <aside className="hidden md:flex md:flex-col md:w-[300px] md:fixed md:inset-y-0 md:left-0 border-r border-neutral-100 bg-white px-8 py-10 z-40 overflow-y-auto">
      <Link href="/" className="mb-14 w-fit">
        <img src="/nex-logo.svg" alt="NeX" className="h-6 w-auto" />
      </Link>
      <div>
        {STEP_META.map((s, i) => {
          const done = s.nr < current;
          const active = s.nr === current;
          return (
            <div key={s.nr} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${done || active ? "text-white" : "bg-neutral-100 text-neutral-400"}`}
                  style={{ backgroundColor: done || active ? V : undefined }}>
                  {done ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : s.nr}
                </span>
                {i < STEP_META.length - 1 && <span className="w-px flex-1 my-1 transition-colors duration-300" style={{ backgroundColor: done ? V : "#e5e7eb" }} />}
              </div>
              <div className="pb-9">
                <p className={`text-sm font-semibold transition-colors duration-300 ${active ? "text-[#0a0a0a]" : done ? "text-neutral-500" : "text-neutral-300"}`}>{s.title}</p>
                <p className={`text-xs mt-0.5 transition-colors duration-300 ${active ? "text-neutral-500" : "text-neutral-300"}`}>{s.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-neutral-300 mt-auto pt-6">Étape {current} sur 5 · environ 4 minutes au total</p>
    </aside>
  );
}

function MobileStepBar({ current }: { current: number }) {
  const meta = STEP_META[current - 1];
  return (
    <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-100">
      <div className="px-6 py-4 flex items-center justify-between">
        <Link href="/"><img src="/nex-logo.svg" alt="NeX" className="h-6 w-auto" /></Link>
        <span className="text-xs font-semibold text-neutral-400">Étape {current}/5 · {meta.title}</span>
      </div>
      <div className="h-1 bg-neutral-100">
        <div className="h-full transition-all duration-500" style={{ width: `${(current / 5) * 100}%`, backgroundColor: V }} />
      </div>
    </div>
  );
}

// ── Étapes ───────────────────────────────────────────────────────────────────

function Step1({ answers: a, setAnswers: sa, onNext, onBack }: StepProps) {
  const valid = !!a.employees && !!a.sector && !!a.fieldTeams && !!a.adminPeople;
  const pick = (k: keyof Answers) => (v: string) => sa(x => ({ ...x, [k]: v } as Answers));
  return (
    <div>
      <StepHead title="Parlez-nous de votre entreprise." />
      <div className="space-y-8">
        <div>
          <Q label="Votre métier" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{SECTORS.map(s => <Chip key={s} label={s} selected={a.sector === s} onClick={() => pick("sector")(s)} />)}</div>
        </div>
        <div>
          <Q label="Nombre de collaborateurs" />
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">{EMPLOYEES.map(e => <Chip key={e} label={e} selected={a.employees === e} onClick={() => pick("employees")(e)} />)}</div>
        </div>
        <div>
          <Q label="Une partie de vos équipes travaille-t-elle sur le terrain ?" hint="Chantiers, sites clients, interventions, événements" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{FIELD_TEAMS.map(([v, l]) => <Chip key={v} label={l} selected={a.fieldTeams === v} onClick={() => pick("fieldTeams")(v)} />)}</div>
        </div>
        <div>
          <Q label="Combien de personnes passent une partie de leur semaine sur l'administratif ?" hint="Saisie, facturation, suivi des dossiers, relances — direction comprise" />
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">{ADMIN_PEOPLE.map(d => <Chip key={d} label={d} selected={a.adminPeople === d} onClick={() => pick("adminPeople")(d)} />)}</div>
        </div>
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!valid} />
    </div>
  );
}

function Step2({ answers: a, setAnswers: sa, onNext, onBack }: StepProps) {
  const toggle = (t: string) => sa(x => ({ ...x, tools: x.tools.includes(t) ? x.tools.filter(v => v !== t) : [...x.tools, t] }));
  const valid = a.tools.length > 0 && !!a.toolsIntegrated && !!a.toolsCost;
  return (
    <div>
      <StepHead title="Avec quoi travaillez-vous aujourd'hui ?" sub="Cochez tout ce qui sert au quotidien, même le papier." />
      <div className="space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{TOOLS.map(t => <Chip key={t} label={t} multi selected={a.tools.includes(t)} onClick={() => toggle(t)} />)}</div>
        <div>
          <Q label="Ces outils se transmettent-ils les informations entre eux ?" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{TOOLS_INTEGRATED.map(([v, l]) => <Chip key={v} label={l} selected={a.toolsIntegrated === v} onClick={() => sa(x => ({ ...x, toolsIntegrated: v }))} />)}</div>
        </div>
        <div>
          <Q label="Ce que vous coûtent vos abonnements logiciels, par mois" hint="Tous outils confondus — une estimation suffit" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{TOOLS_COST.map(c => <Chip key={c} label={c} selected={a.toolsCost === c} onClick={() => sa(x => ({ ...x, toolsCost: c }))} />)}</div>
        </div>
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!valid} />
    </div>
  );
}

function Step3({ answers: a, setAnswers: sa, onNext, onBack }: StepProps) {
  const valid = FRICTION_QUESTIONS.every(({ key }) => a[key] >= 0);
  return (
    <div>
      <StepHead title="Dans une semaine normale, à quelle fréquence…" sub="Pensez à l'équipe dans son ensemble, pas seulement à vous." />
      <div className="bg-neutral-50/70 rounded-2xl px-5 md:px-6">
        {FRICTION_QUESTIONS.map(({ key, label, hint }) => (
          <FrictionSlider key={key} label={label} hint={hint} value={a[key]} onChange={v => sa(x => ({ ...x, [key]: v } as Answers))} />
        ))}
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!valid} />
    </div>
  );
}

function Step4({ answers: a, setAnswers: sa, onNext, onBack }: StepProps) {
  const valid = !!a.infoAccess && !!a.adminHours && !!a.processesDoc;
  const pick = (k: keyof Answers) => (v: string) => sa(x => ({ ...x, [k]: v } as Answers));
  return (
    <div>
      <StepHead title="Comment l'équipe s'organise-t-elle ?" />
      <div className="space-y-8">
        <div>
          <Q label="Pour chaque personne sur l'administratif, combien d'heures par semaine partent dans des tâches répétitives ?" hint="Recopier, chercher, relancer, reconstruire un tableau" />
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">{ADMIN_HOURS.map(h => <Chip key={h} label={h} selected={a.adminHours === h} onClick={() => pick("adminHours")(h)} />)}</div>
        </div>
        <div>
          <Q label="Vos collaborateurs trouvent-ils l'information dont ils ont besoin ?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{INFO_ACCESS.map(([v, l]) => <Chip key={v} label={l} selected={a.infoAccess === v} onClick={() => pick("infoAccess")(v)} />)}</div>
        </div>
        <div>
          <Q label="Si la personne qui connaît le mieux un processus est absente, le reste de l'équipe sait-il comment faire ?" hint="Autrement dit : vos processus sont-ils écrits quelque part ?" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{PROCESSES_DOC.map(([v, l]) => <Chip key={v} label={l} selected={a.processesDoc === v} onClick={() => pick("processesDoc")(v)} />)}</div>
        </div>
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!valid} />
    </div>
  );
}

function Step5({ answers: a, setAnswers: sa, onNext, onBack }: StepProps) {
  const toggle = (w: string) => sa(x => ({ ...x, priorities: x.priorities.includes(w) ? x.priorities.filter(v => v !== w) : [...x.priorities, w] }));
  return (
    <div>
      <StepHead title="Si vous pouviez régler une chose en premier…" sub="Dernière étape." />
      <div className="space-y-8">
        <div>
          <Q label="Qu'aimeriez-vous ne plus faire à la main ?" hint="Plusieurs choix possibles" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{PRIORITIES.map(w => <Chip key={w} label={w} multi selected={a.priorities.includes(w)} onClick={() => toggle(w)} />)}</div>
        </div>
        <div>
          <Q label="Où en êtes-vous ?" />
          <div className="grid grid-cols-1 gap-2">{TIMING.map(([v, l]) => <Chip key={v} label={l} selected={a.timing === v} onClick={() => sa(x => ({ ...x, timing: v }))} />)}</div>
        </div>
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!a.timing || a.priorities.length === 0} label="Voir mon résultat" />
    </div>
  );
}

// ── Calcul en cours ──────────────────────────────────────────────────────────

const CALC_STEPS = ["Lecture de vos réponses…", "Repérage des points de friction…", "Estimation des heures et du coût…", "Préparation de votre résultat…"];

function Calculating() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep(s => Math.min(s + 1, CALC_STEPS.length - 1)), 550);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <svg className="w-14 h-14 mx-auto mb-10 animate-spin" viewBox="0 0 56 56" fill="none" aria-hidden>
          <circle cx="28" cy="28" r="23" stroke="#f0f0f0" strokeWidth="4"/>
          <circle cx="28" cy="28" r="23" stroke={V} strokeWidth="4" strokeDasharray="72" strokeDashoffset="54" strokeLinecap="round" transform="rotate(-90 28 28)"/>
        </svg>
        <h2 className="text-xl font-bold text-[#0a0a0a] mb-7" style={{ fontFamily: "var(--font-space-grotesk)" }}>Analyse en cours…</h2>
        <div className="space-y-3 text-left max-w-xs mx-auto">
          {CALC_STEPS.map((s, i) => (
            <div key={s} className={`flex items-center gap-3 text-sm transition-all duration-300 ${i < step ? "text-neutral-400" : i === step ? "text-[#0a0a0a] font-medium" : "text-neutral-200"}`}>
              {i < step
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={V} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                : <span className={`w-2 h-2 rounded-full shrink-0 ${i === step ? "animate-pulse" : "bg-neutral-200"}`} style={i === step ? { backgroundColor: V } : undefined} />}
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Résultat principal (visible sans coordonnées) ────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => { const t = setTimeout(() => setShown(score), 150); return () => clearTimeout(t); }, [score]);
  const r = 66; const circ = 2 * Math.PI * r;
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" role="img" aria-label={`Potentiel de gain : ${score} sur 100`}>
      <circle cx="90" cy="90" r={r} fill="none" stroke="#f0f0f0" strokeWidth="10"/>
      <circle cx="90" cy="90" r={r} fill="none" stroke={V} strokeWidth="10" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ - (shown / 100) * circ} transform="rotate(-90 90 90)"
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.34,1.1,0.64,1)" }} />
      <text x="90" y="85" textAnchor="middle" fontSize="36" fontWeight="700" fill="#0a0a0a" style={{ fontFamily: "var(--font-space-grotesk)" }}>{shown}</text>
      <text x="90" y="106" textAnchor="middle" fontSize="11" fill="#9ca3af">/100</text>
    </svg>
  );
}

function Headline({ r }: { r: Result }) {
  const matColor = r.maturity === "Avancé" ? "#16a34a" : r.maturity === "En cours" ? V : "#d97706";
  return (
    <>
      <div className="grid md:grid-cols-[220px_1fr] gap-4 items-stretch">
        <div className="flex flex-col items-center justify-center bg-neutral-50 rounded-2xl py-8 px-6">
          <ScoreRing score={r.score} />
          <p className="mt-3 text-xs text-neutral-500 font-medium text-center">Potentiel de gain</p>
          <span className="mt-2 whitespace-nowrap text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: matColor + "18", color: matColor }}>
            Niveau : {r.maturity}
          </span>
        </div>
        <div className="grid gap-3">
          {[
            { val: `${r.hoursLost} h`, lbl: "perdues chaque semaine en tâches répétitives, équipe comprise" },
            { val: `CHF ${r.annualCost.toLocaleString("fr-CH")}`, lbl: "ce que ces heures vous coûtent par an" },
            { val: `${r.annualDays} jours`, lbl: "de travail complets par an, partis dans ces tâches" },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="bg-white border border-neutral-100 rounded-2xl px-6 py-5">
              <p className="text-2xl font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>{val}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{lbl}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-neutral-400">
        Estimation à partir de vos réponses : personnes concernées × heures répétitives par personne, sur {WORK_WEEKS} semaines travaillées, au coût complet de CHF {HOURLY_COST}/h.
      </p>
    </>
  );
}

// ── Aperçu + coordonnées ─────────────────────────────────────────────────────

function Preview({ result: r, answers, lead, setLead, onUnlocked }: { result: Result; answers: Answers; lead: Lead; setLead: React.Dispatch<React.SetStateAction<Lead>>; onUnlocked: () => void }) {
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hp, setHp] = useState("");
  const valid = !!lead.name.trim() && !!lead.company.trim() && EMAIL_RE.test(lead.email.trim());
  const set = (k: keyof Lead) => (v: string) => setLead(l => ({ ...l, [k]: v }));

  /** Si le serveur n'a pu ni enregistrer ni notifier : le client mail du visiteur, tout pré-rempli. */
  const mailtoFallback = () => {
    const body = [
      `Nom : ${lead.name}`, `Entreprise : ${lead.company}`, `Fonction : ${lead.role || "—"}`,
      `Email : ${lead.email}`, `Téléphone : ${lead.phone || "—"}`, "",
      `Métier : ${answers.sector}`, `Potentiel de gain : ${r.score}/100`,
      `Heures perdues / semaine : ${r.hoursLost} h`, `Coût annuel estimé : CHF ${r.annualCost}`,
      `Frictions : ${r.frictions.map(f => f.title).join(" · ")}`,
      `Priorités : ${answers.priorities.join(", ")}`,
    ].join("\n");
    return `mailto:${SITE.email}?subject=${encodeURIComponent(`Diagnostic — ${lead.company}`)}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!valid || sending) return;
    setSending(true);
    setFailed(false);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead, answers, hp }),
      });
      // fetch ne lève pas sur un 4xx/5xx : sans ce test, un échec serveur
      // passerait pour un succès et le lead disparaîtrait sans bruit.
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      onUnlocked();
    } catch (err) {
      console.error("[lead] envoi impossible", err);
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-20 md:py-24">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-4 text-neutral-400">Votre résultat</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] leading-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>{resultTitle(r.score)}</h1>
        </div>

        <Headline r={r} />

        {/* Ce qui reste à voir : nommé, pas montré. */}
        <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a] leading-tight mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            D&apos;où viennent ces {r.hoursLost} heures, et par quoi commencer.
          </h2>
          <p className="text-sm text-neutral-500 leading-relaxed mb-5">Le rapport complet, à l&apos;écran et dans votre boîte mail :</p>
          <ul className="space-y-2 mb-8">
            {[
              `Vos ${r.frictions.length} points de friction, chiffrés en heures par semaine`,
              `Les ${Math.min(3, r.recommendations.length)} chantiers à attaquer en premier`,
              "Les projets similaires que nous avons déjà livrés",
            ].map(t => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-neutral-700">
                <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={V} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </li>
            ))}
          </ul>

          <form onSubmit={submit} noValidate>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Prénom & nom *" value={lead.name} onChange={set("name")} placeholder="Jean Dupont" autoComplete="name" />
              <Field label="Entreprise *" value={lead.company} onChange={set("company")} placeholder="Dupont SA" autoComplete="organization" />
              <Field label="Email professionnel *" type="email" value={lead.email} onChange={set("email")} placeholder="jean@dupont.ch" autoComplete="email" />
              <Field label="Téléphone (optionnel)" type="tel" value={lead.phone} onChange={set("phone")} placeholder="+41 78 123 45 67" autoComplete="tel" />
            </div>
            <div className="mt-4">
              <Field label="Fonction (optionnel)" value={lead.role} onChange={set("role")} placeholder="Directeur, associé, responsable administratif…" autoComplete="organization-title" />
            </div>
            {/* Piège à robots : invisible pour un humain, rempli par un script. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Site web<input tabIndex={-1} autoComplete="off" value={hp} onChange={e => setHp(e.target.value)} /></label>
            </div>
            <button type="submit" disabled={!valid || sending}
              className="w-full mt-7 py-4 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ backgroundColor: V, boxShadow: valid ? `0 4px 24px ${V}40` : "none" }}>
              {sending ? "Envoi…" : failed ? "Réessayer" : "Voir mon rapport complet →"}
            </button>
          </form>

          {failed && (
            <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-700">Nous n&apos;avons pas pu enregistrer votre demande.</p>
              <p className="mt-1 text-xs leading-relaxed text-red-600">Réessayez, ou envoyez-nous vos réponses en un clic — elles sont déjà pré-remplies.</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a href={mailtoFallback()} className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700">Nous l&apos;envoyer par email</a>
                <button type="button" onClick={onUnlocked} className="text-xs font-semibold text-red-600 underline underline-offset-2">Voir mon rapport quand même</button>
              </div>
            </div>
          )}

          <p className="text-center text-[11px] leading-relaxed text-neutral-400 mt-4">
            Un seul e-mail : votre rapport. Pas de newsletter, pas de relance automatique.{" "}
            <Link href="/politique-de-confidentialite" className="underline underline-offset-2 hover:text-neutral-600">Confidentialité</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Rapport complet ──────────────────────────────────────────────────────────

function SubScoreBar({ label, value, insight }: Result["subScores"][number]) {
  const color = value >= 66 ? "#16a34a" : value >= 40 ? V : "#d97706";
  return (
    <div className="py-3.5 border-b border-neutral-100 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-neutral-700">{label}</p>
        <span className="text-xs font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden mb-2">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <p className="text-xs text-neutral-400 leading-relaxed">{insight}</p>
    </div>
  );
}

function Results({ result: r, lead, answers, onRestart }: { result: Result; lead: Lead; answers: Answers; onRestart: () => void }) {
  const company = lead.company.trim() || "votre entreprise";
  // La carte « proche de votre métier » ne répète pas une réalisation déjà citée plus haut.
  const sectorCase = r.recommendations.some(rec => rec.case?.slug === SECTOR_CASE[answers.sector]?.slug) ? undefined : SECTOR_CASE[answers.sector];
  const hint = SECTOR_HINT[answers.sector];
  const urgent = answers.timing === "soon";

  return (
    <div className="min-h-screen px-6 py-20 md:py-24">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-4 text-neutral-400">Rapport · {company}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] leading-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>{resultTitle(r.score)}</h1>
          {lead.email && <p className="mt-3 text-sm text-neutral-500">Une copie part à {lead.email}.</p>}
        </div>

        <Headline r={r} />

        {/* Frictions */}
        <section className="mt-12">
          <h2 className="text-lg font-bold text-[#0a0a0a] mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>Où partent ces heures</h2>
          <p className="text-xs text-neutral-400 mb-4">Réparties selon l&apos;intensité de vos réponses.</p>
          <div className="space-y-2.5">
            {r.frictions.map((f, i) => (
              <div key={f.title} className="flex items-start gap-4 p-4 bg-white border border-neutral-100 rounded-xl">
                <span className="shrink-0 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5" style={{ backgroundColor: V }}>{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-neutral-800">{f.title}</p>
                    <span className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap bg-neutral-100 text-neutral-700">~{f.hours} h/sem.</span>
                  </div>
                  {FRICTIONS[f.title] && <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{FRICTIONS[f.title].insight}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Priorités, chacune avec sa preuve */}
        <section className="mt-12">
          <h2 className="text-lg font-bold text-[#0a0a0a] mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>Par quoi commencer</h2>
          <p className="text-xs text-neutral-400 mb-4">Dans l&apos;ordre où nous nous y attaquerions{hint ? `, ${hint}` : ""}.</p>
          <div className="space-y-3">
            {r.recommendations.map((rec, i) => (
              <div key={rec.title} className="p-5 border border-neutral-100 rounded-xl bg-white">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700">Priorité {i + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">{rec.title}</p>
                    <p className="text-sm text-neutral-500 mt-0.5 leading-relaxed">{rec.action}</p>
                  </div>
                </div>
                {rec.case && (
                  <Link href={caseHref(rec.case.slug)} target="_blank" className="group mt-4 flex items-start gap-3 rounded-lg bg-neutral-50 px-4 py-3 text-xs leading-relaxed text-neutral-600 hover:bg-neutral-100 transition-colors">
                    <span className="mono shrink-0 pt-px text-[10px] uppercase tracking-[0.12em] text-neutral-400">Déjà fait</span>
                    <span><span className="font-semibold text-neutral-800">{rec.case.client}</span> — {rec.case.proof} <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>→</span></span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Détail par domaine */}
        <section className="mt-12 bg-white border border-neutral-100 rounded-2xl px-6">
          <h2 className="text-base font-bold text-[#0a0a0a] pt-5 mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>Le détail par domaine</h2>
          <p className="text-xs text-neutral-400 mb-1">Plus la barre est pleine, mieux c&apos;est déjà organisé.</p>
          {r.subScores.map(s => <SubScoreBar key={s.label} {...s} />)}
        </section>

        {sectorCase && (
          <Link href={caseHref(sectorCase.slug)} target="_blank" className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 px-6 py-5 hover:border-neutral-400 transition-colors">
            <div>
              <p className="mono text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-1">Proche de votre métier</p>
              <p className="text-sm font-semibold text-neutral-800">{sectorCase.label}</p>
            </div>
            <span className="text-neutral-400 transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
          </Link>
        )}

        {/* L'appel */}
        <section className="mt-12 rounded-3xl px-7 py-9 md:px-10 md:py-11 text-white" style={{ backgroundColor: V }}>
          <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">{urgent ? "Votre projet" : "La suite"}</p>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            {urgent ? "Cadrons-le en 30 minutes." : `Récupérer ces ${r.hoursLost} heures, concrètement.`}
          </h2>
          <p className="text-sm text-white/70 leading-relaxed mb-8 max-w-lg">
            {/* En chaîne : le compilateur JSX avalait l'espace après {company}. */}
            {`On part de ce rapport. Vous nous montrez comment ${company} travaille aujourd'hui, et vous repartez avec ce qu'on construirait en premier, en combien de temps et pour quel budget. Si le sur-mesure n'est pas la bonne réponse, on vous le dit.`}
          </p>
          <a href={SITE.calUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0a0a0a] transition-colors hover:bg-neutral-100">
            Réserver un appel de 30 min <Arrow />
          </a>
          <p className="mono mt-5 text-[10px] tracking-[0.1em] text-white/35">GRATUIT · SANS ENGAGEMENT</p>
        </section>

        <div className="mt-8 text-center">
          <button type="button" onClick={onRestart} className="text-xs text-neutral-400 underline underline-offset-2 hover:text-neutral-600">Refaire le diagnostic</button>
        </div>
      </div>
    </div>
  );
}

// ── Intro ────────────────────────────────────────────────────────────────────

function Intro({ onStart, resumable, onResume }: { onStart: () => void; resumable: boolean; onResume: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full text-center">
        <div className="inline-flex items-center gap-2 border border-neutral-100 rounded-full px-4 py-1.5 text-xs text-neutral-500 mb-10">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: V }} />
          Diagnostic gratuit · NeX
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-[1.08] mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Combien d&apos;heures votre équipe perd-elle chaque semaine&nbsp;?
        </h1>
        <p className="text-[15px] text-neutral-500 leading-relaxed mb-8 max-w-md mx-auto">
          Dix-huit questions sur votre quotidien, environ 4 minutes. Le résultat s&apos;affiche tout de suite :
        </p>
        <div className="space-y-2.5 mb-10 max-w-sm mx-auto text-left">
          {[
            "Les heures perdues chaque semaine, et ce qu'elles coûtent par an",
            "Les tâches qui vous en coûtent le plus",
            "Par quoi commencer, avec les projets similaires déjà livrés",
          ].map(t => (
            <div key={t} className="flex items-start gap-2.5 text-sm text-neutral-600">
              <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={V} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="20 6 9 17 4 12"/></svg>
              {t}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-3">
          <button type="button" onClick={resumable ? onResume : onStart}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-lg"
            style={{ backgroundColor: V, boxShadow: `0 4px 24px ${V}40` }}>
            {resumable ? "Reprendre où j'en étais" : "Commencer le diagnostic"}<Arrow />
          </button>
          {resumable && (
            <button type="button" onClick={onStart} className="text-xs text-neutral-400 underline underline-offset-2 hover:text-neutral-600">Recommencer à zéro</button>
          )}
        </div>
        <p className="mt-6 text-xs text-neutral-400">Gratuit · Sans inscription pour voir le résultat</p>
        <p className="mt-10 text-xs leading-relaxed text-neutral-400 max-w-md mx-auto">
          Pensé pour les PME de Suisse romande : fiduciaires, régies, artisans, entreprises de nettoyage, courtiers, agences.
        </p>
      </div>
    </div>
  );
}

// ── Orchestration ────────────────────────────────────────────────────────────

const STEP_NR: Partial<Record<Screen, number>> = { step1: 1, step2: 2, step3: 3, step4: 4, step5: 5 };

/** Ce qu'on garde si la page est rechargée : les réponses et l'étape, jamais les coordonnées. */
interface Saved { answers: Answers; screen: Screen }

function rawSaved(): string {
  try { return sessionStorage.getItem(STORAGE_KEY) ?? ""; } catch { return ""; }
}

function readSaved(): Saved | null {
  try {
    const raw = rawSaved();
    if (!raw) return null;
    const s = JSON.parse(raw) as Saved;
    return s && s.answers && s.screen ? { answers: { ...EMPTY_ANSWERS, ...s.answers }, screen: s.screen } : null;
  } catch { return null; }
}

export default function DiagnosticPage() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [lead, setLead] = useState<Lead>(L0);
  const [result, setResult] = useState<Result | null>(null);
  const [animKey, setAnimKey] = useState(0);
  // sessionStorage n'existe pas côté serveur : vide au premier rendu, lu ensuite.
  const resumable = useSyncExternalStore(() => () => {}, rawSaved, () => "") !== "";

  useEffect(() => {
    if (screen === "intro") return;
    try {
      // Au-delà des questions, on retient seulement qu'il faut revenir au résultat.
      const s: Screen = STEP_NR[screen] ? screen : "step5";
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, screen: s }));
    } catch { /* navigation privée : on s'en passe */ }
  }, [answers, screen]);

  const go = (s: Screen) => {
    setAnimKey(k => k + 1);
    setScreen(s);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const start = () => {
    setAnswers(EMPTY_ANSWERS);
    setResult(null);
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* rien */ }
    go("step1");
  };

  const resume = () => {
    const saved = readSaved();
    if (!saved) return start();
    setAnswers(saved.answers);
    go(saved.screen);
  };

  const startCalc = () => {
    setResult(calc(answers));
    go("calculating");
    setTimeout(() => go("preview"), 2200);
  };

  const nr = STEP_NR[screen];

  if (nr !== undefined) {
    return (
      <div className="min-h-screen bg-neutral-50/60">
        <StepSidebar current={nr} />
        <MobileStepBar current={nr} />
        <div className="md:pl-[300px]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-10 py-24 md:py-20">
            <div key={animKey} className="animate-fadeSlideIn bg-white border border-neutral-100 rounded-3xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-5 py-9 md:px-14 md:py-14">
              {screen === "step1" && <Step1 answers={answers} setAnswers={setAnswers} onNext={() => go("step2")} onBack={() => go("intro")} />}
              {screen === "step2" && <Step2 answers={answers} setAnswers={setAnswers} onNext={() => go("step3")} onBack={() => go("step1")} />}
              {screen === "step3" && <Step3 answers={answers} setAnswers={setAnswers} onNext={() => go("step4")} onBack={() => go("step2")} />}
              {screen === "step4" && <Step4 answers={answers} setAnswers={setAnswers} onNext={() => go("step5")} onBack={() => go("step3")} />}
              {screen === "step5" && <Step5 answers={answers} setAnswers={setAnswers} onNext={startCalc} onBack={() => go("step4")} />}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/"><img src="/nex-logo.svg" alt="NeX" className="h-6 w-auto" /></Link>
          {(screen === "preview" || screen === "results") && (
            <a href={SITE.calUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-neutral-500 hover:text-[#0a0a0a]">Réserver un appel →</a>
          )}
        </div>
      </div>

      <div className="pt-[65px]">
        <div key={animKey} className="animate-fadeSlideIn">
          {screen === "intro" && <Intro onStart={start} resumable={resumable} onResume={resume} />}
          {screen === "calculating" && <Calculating />}
          {screen === "preview" && result && <Preview result={result} answers={answers} lead={lead} setLead={setLead} onUnlocked={() => go("results")} />}
          {screen === "results" && result && <Results result={result} lead={lead} answers={answers} onRestart={start} />}
        </div>
      </div>
    </div>
  );
}

