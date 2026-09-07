"use client";
import { SITE } from "../content/site";

import { useState, useEffect } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

type Screen = "intro"|"step1"|"step2"|"step3"|"step4"|"step5"|"calculating"|"lead"|"results"|"final";
type FrictionKey = "reDataEntry"|"reSearchDoc"|"reCopyPaste"|"reSameEmail"|"reWaitValidation"|"reMultiSoftware";

interface Answers {
  employees: string; sector: string; clients: string; digitalUsers: string;
  tools: string[]; toolsIntegrated: string; toolsCost: string;
  reDataEntry: number; reSearchDoc: number; reCopyPaste: number;
  reSameEmail: number; reWaitValidation: number; reMultiSoftware: number;
  infoAccess: string; adminHours: string; softwareCount: string; processesDoc: string;
  aiUsage: string; aiWants: string[];
}

interface Lead { name: string; company: string; role: string; email: string; phone: string; }

interface SubScore { label: string; value: number; insight: string }
interface Recommendation { priority: string; title: string; action: string }

interface Result {
  score: number; hoursLost: number; annualSavings: number; automatizable: number;
  maturity: "Débutant"|"Intermédiaire"|"Avancé";
  frictions: string[];
  frictionHours: number[];
  subScores: SubScore[];
  recommendations: Recommendation[];
}

interface StepProps {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  onNext: () => void;
  onBack: () => void;
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const A0: Answers = {
  employees:"", sector:"", clients:"", digitalUsers:"",
  tools:[], toolsIntegrated:"", toolsCost:"",
  // -1 = "non renseigné" : évite qu'un slider jamais touché soit compté comme une vraie réponse.
  reDataEntry:-1, reSearchDoc:-1, reCopyPaste:-1, reSameEmail:-1, reWaitValidation:-1, reMultiSoftware:-1,
  infoAccess:"", adminHours:"", softwareCount:"", processesDoc:"",
  aiUsage:"", aiWants:[],
};
const L0: Lead = { name:"", company:"", role:"", email:"", phone:"" };
const V = "#0a0a0a";

// ── Score engine ──────────────────────────────────────────────────────────────

const FRICTION_INFO: Record<string, { insight: string; action: string }> = {
  "Double saisie et copier-coller fréquents": {
    insight: "Chaque ressaisie est une source d'erreur et un temps mort qui pourrait être investi ailleurs.",
    action: "Connecter vos outils pour supprimer les ressaisies manuelles et fiabiliser vos données.",
  },
  "Temps perdu à chercher des documents": {
    insight: "Sans base centralisée, vos équipes cherchent l'information au lieu de produire.",
    action: "Centraliser vos documents et informations dans un espace unique et facilement consultable.",
  },
  "Blocages sur les circuits de validation": {
    insight: "Les validations manuelles créent des goulots d'étranglement qui ralentissent toute l'équipe.",
    action: "Digitaliser vos circuits de validation pour éliminer les temps d'attente.",
  },
  "Dispersion entre plusieurs logiciels": {
    insight: "Jongler entre plusieurs outils fragmente l'attention et complique le suivi des dossiers.",
    action: "Regrouper vos outils dans une interface unique adaptée à votre métier.",
  },
  "Outils cloisonnés, non connectés": {
    insight: "Des outils qui ne communiquent pas entre eux génèrent des tâches manuelles évitables.",
    action: "Interconnecter vos logiciels existants grâce à des automatisations sur mesure.",
  },
  "Information difficile d'accès pour les équipes": {
    insight: "Une information dispersée ralentit la prise de décision à tous les niveaux de l'entreprise.",
    action: "Donner à chaque collaborateur un accès instantané à l'information dont il a besoin.",
  },
  "Processus non documentés": {
    insight: "Sans documentation, chaque absence ou départ fragilise la continuité de l'activité.",
    action: "Formaliser vos processus clés pour fiabiliser l'exécution et faciliter la délégation.",
  },
  "Potentiel d'automatisation inexploité": {
    insight: "De nombreuses tâches répétitives pourraient être déléguées à des automatisations fiables.",
    action: "Automatiser les tâches répétitives identifiées pour libérer du temps à forte valeur.",
  },
  "Trop d'outils différents au quotidien": {
    insight: "Multiplier les logiciels au quotidien fragmente l'attention et complique la formation des nouveaux arrivants.",
    action: "Regrouper vos outils dans une interface unique adaptée à votre métier.",
  },
  "Optimisations complémentaires à explorer": {
    insight: "Votre organisation est déjà bien structurée : la marge de progrès se joue sur des détails à fort effet de levier.",
    action: "Passer en revue avec vous les derniers irritants du quotidien pour identifier des gains rapides.",
  },
};

// Estimation en heures/semaine par personne pour chaque tranche déclarée à l'étape 4.
const ADMIN_HOURS_VALUE: Record<string, number> = {
  "Moins d'1h": 0.5, "1–3h": 2, "3–6h": 4.5, "6–10h": 8, "Plus de 10h": 12,
};
// Sévérité 0-4 (même échelle que les sliders de friction) pour les tranches de nombre de logiciels.
const SW_COUNT_SEVERITY: Record<string, number> = {
  "1–2": 0, "3–5": 1, "6–10": 2.5, "11–20": 3.5, "Plus de 20": 4,
};
const AI_USAGE_SEVERITY: Record<string, number> = {
  never: 4, occasionally: 2.5, regularly: 1, daily: 0,
};

// Extrait une valeur représentative d'une tranche du type "21–50" ou "200+" (milieu de la fourchette,
// ou 1.5x la borne basse pour les fourchettes ouvertes) plutôt que la seule borne basse.
function bracketMid(value: string, fallback: number): number {
  const nums = (value.match(/\d+/g) || []).map(Number);
  if (nums.length === 0) return fallback;
  if (value.includes("+")) return nums[0] * 1.5;
  if (nums.length === 1) return nums[0];
  return (nums[0] + nums[1]) / 2;
}

function calc(a: Answers): Result {
  const fr = (a.reDataEntry + a.reSearchDoc + a.reCopyPaste + a.reSameEmail + a.reWaitValidation + a.reMultiSoftware) / 24;
  const intPen  = a.toolsIntegrated==="yes" ? 0 : a.toolsIntegrated==="partial" ? 0.3 : 0.65;
  const accPen  = a.infoAccess==="always" ? 0 : a.infoAccess==="usually" ? 0.2 : a.infoAccess==="sometimes" ? 0.5 : 0.85;
  const docPen  = a.processesDoc==="yes" ? 0 : a.processesDoc==="partial" ? 0.3 : 0.65;

  // Score global (/100) = moyenne pondérée des 4 dimensions (50% frictions quotidiennes, 25% intégration
  // des outils, 15% accès à l'information, 10% documentation), inversée en "potentiel d'optimisation"
  // puis recalée sur 44-92 pour ne jamais afficher un score plancher démotivant ni un score plafond peu
  // crédible. La "maturité" ci-dessous utilise la même combinaison pour rester cohérente avec ce score.
  const combined = fr*0.50 + intPen*0.25 + accPen*0.15 + docPen*0.10;
  const rawPot   = combined * 100;
  const score    = Math.round(Math.min(92, Math.max(44, 44 + rawPot * 0.48)));
  const maturity: Result["maturity"] = combined>0.5 ? "Débutant" : combined>0.25 ? "Intermédiaire" : "Avancé";

  const team    = Math.max(1, Math.round(bracketMid(a.employees, 10)));
  const digital = Math.max(1, Math.round(a.digitalUsers ? bracketMid(a.digitalUsers, Math.ceil(team*0.7)) : Math.ceil(team*0.7)));

  // Heures perdues : mélange de l'estimation déclarée directement par l'utilisateur (adminHours, 60%) et
  // de l'intensité de friction mesurée par les sliders de l'étape 3 (40%), pour rester fidèle à ce que
  // l'utilisateur a lui-même indiqué tout en gardant la granularité des réponses détaillées.
  const declaredPerPerson = ADMIN_HOURS_VALUE[a.adminHours];
  const derivedPerPerson  = fr * 7;
  const perPerson = declaredPerPerson !== undefined ? declaredPerPerson*0.6 + derivedPerPerson*0.4 : derivedPerPerson;
  const hoursLost     = Math.max(3, Math.round(digital * perPerson));
  const annualSavings = Math.round(hoursLost * 52 * 85 / 500) * 500;
  const automatizable = [
    a.reDataEntry>=3, a.reCopyPaste>=3, a.reSameEmail>=3,
    a.reWaitValidation>=2, a.reMultiSoftware>=3,
    a.toolsIntegrated!=="yes", a.aiWants.length>=2, a.aiUsage==="never",
  ].filter(Boolean).length;

  // Chaque friction n'est retenue que si la réponse réelle la justifie (pas de remplissage arbitraire),
  // et porte un poids (0-4) qui sert ensuite à répartir les heures perdues entre les frictions affichées.
  const candidates: { title:string; weight:number }[] = [];
  if (a.reDataEntry>=3||a.reCopyPaste>=3) candidates.push({ title:"Double saisie et copier-coller fréquents", weight:Math.max(a.reDataEntry,a.reCopyPaste) });
  if (a.reSearchDoc>=3)                  candidates.push({ title:"Temps perdu à chercher des documents", weight:a.reSearchDoc });
  if (a.reWaitValidation>=3)              candidates.push({ title:"Blocages sur les circuits de validation", weight:a.reWaitValidation });
  if (a.reMultiSoftware>=3)               candidates.push({ title:"Dispersion entre plusieurs logiciels", weight:a.reMultiSoftware });
  if (a.toolsIntegrated==="never")        candidates.push({ title:"Outils cloisonnés, non connectés", weight:intPen*4 });
  if (a.infoAccess==="sometimes"||a.infoAccess==="rarely") candidates.push({ title:"Information difficile d'accès pour les équipes", weight:accPen*4 });
  if (a.processesDoc!=="yes")             candidates.push({ title:"Processus non documentés", weight:docPen*4 });
  if ((SW_COUNT_SEVERITY[a.softwareCount] ?? 0) >= 2.5) candidates.push({ title:"Trop d'outils différents au quotidien", weight:SW_COUNT_SEVERITY[a.softwareCount] });
  if (a.aiUsage==="never"||a.aiUsage==="occasionally") candidates.push({ title:"Potentiel d'automatisation inexploité", weight:AI_USAGE_SEVERITY[a.aiUsage] });

  candidates.sort((x,y)=>y.weight-x.weight);
  let top = candidates.slice(0,4);
  if (top.length===0) top = [{ title:"Optimisations complémentaires à explorer", weight:1 }];

  const totalWeight = top.reduce((s,c)=>s+c.weight,0) || top.length;
  const frictionHours = top.map(c => Math.max(1, Math.round(hoursLost * (c.weight/totalWeight))));
  const frictions = top.map(c=>c.title);

  const subScores: SubScore[] = [
    { label:"Automatisation des tâches", value:Math.round((1-fr)*100),
      insight: fr>0.6 ? "Beaucoup de tâches répétitives sont encore effectuées manuellement." : fr>0.3 ? "Une partie du travail répétitif pourrait être automatisée." : "Bon niveau d'automatisation déjà en place." },
    { label:"Intégration des outils", value:Math.round((1-intPen)*100),
      insight: intPen>=0.65 ? "Vos outils fonctionnent en silos, sans communiquer entre eux." : intPen>=0.3 ? "Vos outils communiquent partiellement entre eux." : "Vos outils sont bien connectés entre eux." },
    { label:"Accès à l'information", value:Math.round((1-accPen)*100),
      insight: accPen>=0.5 ? "L'information est difficile à trouver pour vos équipes." : accPen>0 ? "L'accès à l'information peut encore être fluidifié." : "Vos équipes trouvent l'information facilement." },
    { label:"Documentation des process", value:Math.round((1-docPen)*100),
      insight: docPen>=0.65 ? "Vos process reposent surtout sur la mémoire des équipes." : docPen>0 ? "Vos process sont partiellement documentés." : "Vos process sont bien documentés." },
  ];

  const recommendations: Recommendation[] = frictions.slice(0,3).map((title,i) => ({
    priority: `Priorité ${i+1}`,
    title,
    action: FRICTION_INFO[title]?.action ?? "Mettre en place un outil sur mesure adapté à ce point.",
  }));

  return {
    score, hoursLost, annualSavings, automatizable, maturity,
    frictions, frictionHours,
    subScores,
    recommendations,
  };
}

// ── Atom components ───────────────────────────────────────────────────────────

function Chip({ label, selected, onClick, multi }: { label:string; selected:boolean; onClick:()=>void; multi?:boolean }) {
  return (
    <button type="button" onClick={onClick} className={`w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-150 cursor-pointer ${
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

function Field({ label, value, onChange, placeholder, type="text" }: { label:string; value:string; onChange:(v:string)=>void; placeholder?:string; type?:string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder??""}
        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all bg-white"
      />
    </div>
  );
}

function BackBtn({ onClick }: { onClick:()=>void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-700 transition-colors">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      Retour
    </button>
  );
}

function NextBtn({ onClick, disabled, label="Continuer" }: { onClick:()=>void; disabled?:boolean; label?:string }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
      style={{ backgroundColor: V }}>
      {label}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  );
}

function NavRow({ onBack, onNext, disabled, label }: { onBack:()=>void; onNext:()=>void; disabled?:boolean; label?:string }) {
  return (
    <div className="flex items-center justify-between mt-12 pt-8 border-t border-neutral-100">
      <BackBtn onClick={onBack} />
      <NextBtn onClick={onNext} disabled={disabled} label={label} />
    </div>
  );
}

function Q({ label }: { label:string }) {
  return <p className="text-sm font-medium text-neutral-600 mb-3">{label}</p>;
}

function StepHead({ title, sub }: { n:number; title:string; sub?:string }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] leading-tight mb-2" style={{ fontFamily:"var(--font-space-grotesk)" }}>{title}</h2>
      {sub && <p className="text-sm text-neutral-500">{sub}</p>}
    </div>
  );
}

function FrictionSlider({ label, value, onChange }: { label:string; value:number; onChange:(v:number)=>void }) {
  // value = -1 tant que l'utilisateur n'a pas touché le slider ("non renseigné"), 0-4 ensuite.
  const answered = value >= 0;
  const pct = ((value+1)/5)*100;
  const ticks = ["Non renseigné","Jamais","Rarement","Parfois","Souvent","Tous les jours"];
  return (
    <div className="py-5 border-b border-neutral-100 last:border-0">
      <div className="flex items-start justify-between gap-4 mb-3">
        <p className="text-sm text-neutral-700 leading-relaxed">{label}</p>
        <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
              style={{ backgroundColor: answered ? V+"18" : "#f5f5f5", color: answered ? V : "#a3a3a3" }}>
          {ticks[value+1]}
        </span>
      </div>
      <input type="range" min={-1} max={4} step={1} value={value} onChange={e=>onChange(+e.target.value)}
        className="nex-slider w-full h-1.5 rounded-full cursor-pointer appearance-none"
        style={{ background:`linear-gradient(to right,${V} 0%,${V} ${pct}%,#e5e7eb ${pct}%,#e5e7eb 100%)` }}
      />
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] text-neutral-300">Jamais</span>
        <span className="text-[10px] text-neutral-300">Tous les jours</span>
      </div>
    </div>
  );
}

// ── Option data ───────────────────────────────────────────────────────────────

const EMPLOYEES     = ["1–5","6–20","21–50","51–200","200+"];
const SECTORS       = ["Commerce / Retail","Services professionnels","Industrie / Manufacture","BTP / Construction","Immobilier","Santé / Médecine","Finance / Fiduciaire","Hôtellerie / Restauration","Autre"];
// Courte accroche contextuelle par secteur, utilisée pour personnaliser légèrement le rapport final.
const SECTOR_HINT: Record<string,string> = {
  "Commerce / Retail":          "avec des enjeux de gestion de stock, de commandes et de suivi client au quotidien",
  "Services professionnels":    "avec des enjeux de suivi de mandats, de facturation et de reporting client",
  "Industrie / Manufacture":    "avec des enjeux de suivi de production, de commandes fournisseurs et de traçabilité",
  "BTP / Construction":         "avec des enjeux de suivi de chantiers, de devis et de coordination terrain",
  "Immobilier":                 "avec des enjeux de gestion de biens, de mandats et de suivi locataires/propriétaires",
  "Santé / Médecine":           "avec des enjeux de gestion de dossiers patients et de rendez-vous",
  "Finance / Fiduciaire":       "avec des enjeux de conformité, de suivi de dossiers clients et de reporting",
  "Hôtellerie / Restauration":  "avec des enjeux de réservations, de planning d'équipe et de suivi fournisseurs",
  "Autre":                      "propres à votre secteur d'activité",
};
const CLIENTS       = ["Moins de 50","50–200","200–500","500–2 000","Plus de 2 000"];
const DIGITAL_USERS = ["1–3","4–10","11–30","31–100","100+"];
const TOOLS_LIST    = ["CRM","ERP","Excel","Google Sheets","Outlook / Mail","Microsoft 365","Google Workspace","WhatsApp","Teams","Slack","Logiciel métier spécifique","Aucun outil spécifique"];
const TOOLS_INT     = [["never","Jamais, tout est cloisonné"],["partial","Partiellement"],["yes","Oui, bien connectés"]];
const TOOLS_COST     = ["Moins de CHF 100","CHF 100–300","CHF 300–800","CHF 800–2'000","Plus de CHF 2'000","Je ne sais pas"];
const INFO_ACCESS   = [["always","Toujours, facilement"],["usually","La plupart du temps"],["sometimes","Parfois, avec de la recherche"],["rarely","Rarement, c'est compliqué"]];
const ADMIN_HOURS   = ["Moins d'1h","1–3h","3–6h","6–10h","Plus de 10h"];
const SW_COUNT      = ["1–2","3–5","6–10","11–20","Plus de 20"];
const PROC_DOC      = [["yes","Oui, tout est documenté"],["partial","Partiellement"],["no","Non, c'est dans les têtes"]];
const AI_USAGE      = [["never","Jamais"],["occasionally","Occasionnellement"],["regularly","Régulièrement"],["daily","Au quotidien"]];
const AI_WANTS      = ["Rédaction d'emails","Comptes-rendus de réunions","Analyse de documents","Reporting automatique","Support client","Classement de données","Autre"];
const FRICTION_Q: { key:FrictionKey; label:string }[] = [
  { key:"reDataEntry",     label:"Vous ressaisissez une information dans un autre outil" },
  { key:"reSearchDoc",     label:"Vous cherchez un document ou une information précise" },
  { key:"reCopyPaste",     label:"Vous copiez-collez des données entre outils" },
  { key:"reSameEmail",     label:"Vous envoyez plusieurs fois le même type d'email" },
  { key:"reWaitValidation",label:"Vous attendez une validation avant de pouvoir avancer" },
  { key:"reMultiSoftware", label:"Vous ouvrez plusieurs logiciels pour terminer une tâche" },
];

const STEP_META: { nr:number; title:string; sub:string }[] = [
  { nr:1, title:"Votre entreprise",            sub:"Contexte général" },
  { nr:2, title:"Vos outils",                  sub:"Ce que vous utilisez aujourd'hui" },
  { nr:3, title:"Frictions quotidiennes",       sub:"Où le temps se perd" },
  { nr:4, title:"Fonctionnement des équipes",   sub:"Organisation interne" },
  { nr:5, title:"Potentiel IA",                 sub:"Vos priorités" },
];

// ── Step sidebar / progress ───────────────────────────────────────────────────

function StepSidebar({ current }: { current:number }) {
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
                <span
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                    done || active ? "text-white" : "bg-neutral-100 text-neutral-400"
                  }`}
                  style={{ backgroundColor: done || active ? V : undefined }}
                >
                  {done ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : s.nr}
                </span>
                {i < STEP_META.length - 1 && (
                  <span className="w-px flex-1 my-1 transition-colors duration-300" style={{ backgroundColor: done ? V : "#e5e7eb" }} />
                )}
              </div>
              <div className="pb-9">
                <p className={`text-sm font-semibold transition-colors duration-300 ${active ? "text-[#0a0a0a]" : done ? "text-neutral-500" : "text-neutral-300"}`}>{s.title}</p>
                <p className={`text-xs mt-0.5 transition-colors duration-300 ${active ? "text-neutral-500" : "text-neutral-300"}`}>{s.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-neutral-300 mt-auto pt-6">Étape {current} sur 5</p>
    </aside>
  );
}

function MobileStepBar({ current }: { current:number }) {
  const meta = STEP_META[current - 1];
  return (
    <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-100">
      <div className="px-6 py-4 flex items-center justify-between">
        <Link href="/"><img src="/nex-logo.svg" alt="NeX" className="h-6 w-auto" /></Link>
        <span className="text-xs font-semibold text-neutral-400">Étape {current}/5 · {meta.title}</span>
      </div>
      <div className="h-1 bg-neutral-100">
        <div className="h-full transition-all duration-500" style={{ width:`${(current/5)*100}%`, backgroundColor:V }} />
      </div>
    </div>
  );
}

// ── Step screens ──────────────────────────────────────────────────────────────

function Step1({ answers:a, setAnswers:sa, onNext, onBack }: StepProps) {
  const valid = !!a.employees && !!a.sector && !!a.clients && !!a.digitalUsers;
  const pick = (k:keyof Answers) => (v:string) => sa(x => ({ ...x, [k]:v } as Answers));
  return (
    <div>
      <StepHead n={1} title="Parlez-nous de votre entreprise." />
      <div className="space-y-8">
        <div>
          <Q label="Nombre de collaborateurs" />
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">{EMPLOYEES.map(e=><Chip key={e} label={e} selected={a.employees===e} onClick={()=>pick("employees")(e)}/>)}</div>
        </div>
        <div>
          <Q label="Secteur d'activité" />
          <div className="grid grid-cols-2 gap-2">{SECTORS.map(s=><Chip key={s} label={s} selected={a.sector===s} onClick={()=>pick("sector")(s)}/>)}</div>
        </div>
        <div>
          <Q label="Nombre de clients actifs" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{CLIENTS.map(c=><Chip key={c} label={c} selected={a.clients===c} onClick={()=>pick("clients")(c)}/>)}</div>
        </div>
        <div>
          <Q label="Collaborateurs utilisant des outils numériques au quotidien" />
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">{DIGITAL_USERS.map(d=><Chip key={d} label={d} selected={a.digitalUsers===d} onClick={()=>pick("digitalUsers")(d)}/>)}</div>
        </div>
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!valid} />
    </div>
  );
}

function Step2({ answers:a, setAnswers:sa, onNext, onBack }: StepProps) {
  const toggle = (t:string) => sa(x => ({ ...x, tools: x.tools.includes(t) ? x.tools.filter(v=>v!==t) : [...x.tools,t] }));
  const valid = a.tools.length>0 && !!a.toolsIntegrated && !!a.toolsCost;
  return (
    <div>
      <StepHead n={2} title="Quels outils utilisez-vous aujourd'hui ?" sub="Sélection multiple possible." />
      <div className="space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{TOOLS_LIST.map(t=><Chip key={t} label={t} multi selected={a.tools.includes(t)} onClick={()=>toggle(t)}/>)}</div>
        <div>
          <Q label="Vos outils communiquent-ils entre eux ?" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{TOOLS_INT.map(([v,l])=><Chip key={v} label={l} selected={a.toolsIntegrated===v} onClick={()=>sa(x=>({...x,toolsIntegrated:v}))}/>)}</div>
        </div>
        <div>
          <Q label="Coût mensuel cumulé de vos outils actuels (tous abonnements logiciels confondus)" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{TOOLS_COST.map(c=><Chip key={c} label={c} selected={a.toolsCost===c} onClick={()=>sa(x=>({...x,toolsCost:c}))}/>)}</div>
        </div>
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!valid} />
    </div>
  );
}

function Step3({ answers:a, setAnswers:sa, onNext, onBack }: StepProps) {
  const valid = FRICTION_Q.every(({key}) => a[key] >= 0);
  return (
    <div>
      <StepHead n={3} title="À quelle fréquence…" sub="Évaluez honnêtement chaque situation dans votre équipe." />
      <div className="bg-neutral-50/70 rounded-2xl px-6">
        {FRICTION_Q.map(({key,label})=>(
          <FrictionSlider key={key} label={label} value={a[key]} onChange={v=>sa(x=>({...x,[key]:v} as Answers))} />
        ))}
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!valid} />
    </div>
  );
}

function Step4({ answers:a, setAnswers:sa, onNext, onBack }: StepProps) {
  const valid = !!a.infoAccess && !!a.adminHours && !!a.softwareCount && !!a.processesDoc;
  const pick = (k:keyof Answers) => (v:string) => sa(x=>({...x,[k]:v} as Answers));
  return (
    <div>
      <StepHead n={4} title="Comment travaillent vos équipes au quotidien ?" />
      <div className="space-y-8">
        <div>
          <Q label="Vos collaborateurs savent-ils où trouver les bonnes informations ?" />
          <div className="grid grid-cols-2 gap-2">{INFO_ACCESS.map(([v,l])=><Chip key={v} label={l} selected={a.infoAccess===v} onClick={()=>pick("infoAccess")(v)}/>)}</div>
        </div>
        <div>
          <Q label="Temps estimé perdu par personne chaque semaine en tâches non productives" />
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">{ADMIN_HOURS.map(h=><Chip key={h} label={h} selected={a.adminHours===h} onClick={()=>pick("adminHours")(h)}/>)}</div>
        </div>
        <div>
          <Q label="Nombre de logiciels différents utilisés quotidiennement" />
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">{SW_COUNT.map(c=><Chip key={c} label={c} selected={a.softwareCount===c} onClick={()=>pick("softwareCount")(c)}/>)}</div>
        </div>
        <div>
          <Q label="Vos processus internes sont-ils documentés ?" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{PROC_DOC.map(([v,l])=><Chip key={v} label={l} selected={a.processesDoc===v} onClick={()=>pick("processesDoc")(v)}/>)}</div>
        </div>
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!valid} />
    </div>
  );
}

function Step5({ answers:a, setAnswers:sa, onNext, onBack }: StepProps) {
  const toggleWant = (w:string) => sa(x=>({ ...x, aiWants: x.aiWants.includes(w) ? x.aiWants.filter(v=>v!==w) : [...x.aiWants,w] }));
  return (
    <div>
      <StepHead n={5} title="Où voyez-vous le plus de potentiel ?" sub="Dernière étape — on y est presque." />
      <div className="space-y-8">
        <div>
          <Q label="Utilisez-vous déjà des outils d'automatisation ?" />
          <div className="grid grid-cols-2 gap-2">{AI_USAGE.map(([v,l])=><Chip key={v} label={l} selected={a.aiUsage===v} onClick={()=>sa(x=>({...x,aiUsage:v}))}/>)}</div>
        </div>
        <div>
          <Q label="Quelles tâches aimeriez-vous automatiser ?" />
          <div className="grid grid-cols-2 gap-2">{AI_WANTS.map(w=><Chip key={w} label={w} multi selected={a.aiWants.includes(w)} onClick={()=>toggleWant(w)}/>)}</div>
          <p className="text-xs text-neutral-400 mt-2">Sélection multiple possible</p>
        </div>
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!a.aiUsage} label="Voir mon rapport" />
    </div>
  );
}

// ── Calculating ───────────────────────────────────────────────────────────────

function Calculating() {
  const [step, setStep] = useState(0);
  const steps = ["Analyse de vos processus…","Calcul des points de friction…","Estimation des gains potentiels…","Génération de votre rapport…"];
  useEffect(() => {
    const id = setInterval(() => setStep(s => Math.min(s+1, steps.length-1)), 650);
    return () => clearInterval(id);
  }, [steps.length]);
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <div className="relative w-14 h-14 mx-auto mb-10">
          <svg className="w-14 h-14 animate-spin" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="23" stroke="#f0f0f0" strokeWidth="4"/>
            <circle cx="28" cy="28" r="23" stroke={V} strokeWidth="4" strokeDasharray="72" strokeDashoffset="54" strokeLinecap="round" transform="rotate(-90 28 28)"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#0a0a0a] mb-7" style={{ fontFamily:"var(--font-space-grotesk)" }}>Analyse en cours…</h2>
        <div className="space-y-3 text-left max-w-xs mx-auto">
          {steps.map((s,i) => (
            <div key={s} className={`flex items-center gap-3 text-sm transition-all duration-300 ${i<step?"text-neutral-400":i===step?"text-[#0a0a0a] font-medium":"text-neutral-200"}`}>
              {i<step
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={V} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                : i===step
                ? <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor:V }}/>
                : <span className="w-2 h-2 rounded-full bg-neutral-200 shrink-0"/>
              }
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Lead capture ──────────────────────────────────────────────────────────────

function LeadCapture({ lead, setLead, answers, result, onSubmit }: { lead:Lead; setLead:React.Dispatch<React.SetStateAction<Lead>>; answers:Answers; result:Result|null; onSubmit:()=>void }) {
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const valid = !!lead.name.trim() && !!lead.company.trim() && lead.email.includes("@") && lead.email.includes(".");
  const set = (k:keyof Lead) => (v:string) => setLead(l=>({ ...l,[k]:v }));

  /**
   * Repli qui ne dépend d'aucun service : si le serveur n'a pu ni enregistrer
   * ni notifier, on ouvre le client mail du visiteur avec tout pré-rempli.
   * Le lead n'est pas perdu, il arrive par un autre canal.
   */
  const mailtoFallback = () => {
    const l = [
      `Nom : ${lead.name}`, `Entreprise : ${lead.company}`,
      `Fonction : ${lead.role || "—"}`, `Email : ${lead.email}`,
      `Téléphone : ${lead.phone || "—"}`, "",
      result ? `Score : ${result.score}/100 (${result.maturity})` : "",
      result ? `Heures perdues / semaine : ${result.hoursLost}h` : "",
      result ? `Économie annuelle estimée : CHF ${result.annualSavings}` : "",
      result?.frictions?.length ? `Frictions : ${result.frictions.join(" · ")}` : "",
    ].filter(Boolean).join("\n");
    return `mailto:${SITE.email}?subject=${encodeURIComponent(`Diagnostic — ${lead.company}`)}&body=${encodeURIComponent(l)}`;
  };

  const handleSubmit = async () => {
    if (!valid || sending) return;
    setSending(true);
    setFailed(false);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead, answers, result }),
      });
      // fetch ne lève pas sur un 4xx/5xx : sans ce test, un échec serveur
      // passait pour un succès et le lead disparaissait sans bruit.
      if (!res.ok) { setFailed(true); setSending(false); return; }
      setSending(false);
      onSubmit();
    } catch (err) {
      console.error("[lead] requête impossible", err);
      setFailed(true);
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-6" style={{ backgroundColor:V+"14",color:V }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor:V }}/>
            Votre rapport est prêt
          </div>
          <h2 className="text-3xl font-bold text-[#0a0a0a] mb-3" style={{ fontFamily:"var(--font-space-grotesk)" }}>Recevez votre rapport personnalisé.</h2>
          <p className="text-sm text-neutral-500 leading-relaxed">Renseignez vos coordonnées pour accéder à votre audit complet.</p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Prénom & nom *" value={lead.name} onChange={set("name")} placeholder="Jean Dupont" />
            <Field label="Entreprise *" value={lead.company} onChange={set("company")} placeholder="Dupont SA" />
          </div>
          <Field label="Fonction" value={lead.role} onChange={set("role")} placeholder="Directeur général" />
          <Field label="Email professionnel *" type="email" value={lead.email} onChange={set("email")} placeholder="jean@dupont.ch" />
          <Field label="Téléphone (optionnel)" type="tel" value={lead.phone} onChange={set("phone")} placeholder="+41 78 123 45 67" />
        </div>
        <button type="button" onClick={handleSubmit} disabled={!valid || sending}
          className="w-full mt-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ backgroundColor:V, boxShadow:valid?`0 4px 24px ${V}40`:"none" }}>
          {sending ? "Envoi…" : failed ? "Réessayer" : "Accéder à mon rapport →"}
        </button>

        {failed && (
          <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">Nous n&apos;avons pas pu enregistrer votre demande.</p>
            <p className="mt-1 text-xs leading-relaxed text-red-600">
              Réessayez, ou envoyez-nous vos réponses en un clic — elles sont déjà pré-remplies.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a href={mailtoFallback()}
                 className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700">
                Nous l&apos;envoyer par email
              </a>
              <button type="button" onClick={onSubmit} className="text-xs font-semibold text-red-600 underline underline-offset-2">
                Voir mon rapport quand même
              </button>
            </div>
          </div>
        )}
        <p className="text-center text-xs text-neutral-300 mt-4">Aucun spam. Données traitées de manière confidentielle.</p>
      </div>
    </div>
  );
}

// ── Score ring ────────────────────────────────────────────────────────────────

function ScoreRing({ score }: { score:number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => { const t = setTimeout(()=>setShown(score), 150); return ()=>clearTimeout(t); }, [score]);
  const r = 66; const circ = 2*Math.PI*r;
  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <circle cx="90" cy="90" r={r} fill="none" stroke="#f0f0f0" strokeWidth="10"/>
      <circle cx="90" cy="90" r={r} fill="none" stroke={V} strokeWidth="10" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ-(shown/100)*circ}
        transform="rotate(-90 90 90)"
        style={{ transition:"stroke-dashoffset 1.4s cubic-bezier(0.34,1.1,0.64,1)" }}
      />
      <text x="90" y="85" textAnchor="middle" fontSize="36" fontWeight="700" fill="#0a0a0a" style={{ fontFamily:"var(--font-space-grotesk)" }}>{shown}</text>
      <text x="90" y="106" textAnchor="middle" fontSize="11" fill="#9ca3af">/100</text>
    </svg>
  );
}

// ── Sub-score bar ─────────────────────────────────────────────────────────────

function SubScoreBar({ label, value, insight }: SubScore) {
  const color = value>=66 ? "#22c55e" : value>=40 ? V : "#f59e0b";
  return (
    <div className="py-3.5 border-b border-neutral-100 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-neutral-700">{label}</p>
        <span className="text-xs font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden mb-2">
        <div className="h-full rounded-full transition-all duration-700" style={{ width:`${value}%`, backgroundColor:color }} />
      </div>
      <p className="text-xs text-neutral-400 leading-relaxed">{insight}</p>
    </div>
  );
}

// ── Results ───────────────────────────────────────────────────────────────────

function Results({ result:r, lead, answers, onFinal }: { result:Result; lead:Lead; answers:Answers; onFinal:()=>void }) {
  const title = r.score>=72
    ? "Votre organisation possède un potentiel d'optimisation majeur."
    : r.score>=56
    ? "Votre entreprise possède un excellent potentiel d'optimisation."
    : "Votre entreprise a de solides bases avec un beau potentiel à libérer.";
  const matColor = r.maturity==="Avancé" ? "#22c55e" : r.maturity==="Intermédiaire" ? V : "#f59e0b";
  const annualHours = r.hoursLost * 52;
  const annualDays = Math.round(annualHours / 8);

  return (
    <div className="min-h-screen px-6 py-24">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color:V }}>
            Audit confidentiel · {lead.company || "Votre entreprise"}
          </p>
          <h1 className="text-3xl font-bold text-[#0a0a0a] leading-tight mb-3" style={{ fontFamily:"var(--font-space-grotesk)" }}>{title}</h1>
          <p className="text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
            Score calculé à partir de vos réponses sur l&apos;automatisation, l&apos;intégration de vos outils, l&apos;accès à l&apos;information et la documentation de vos process.
          </p>
        </div>

        {/* Score + KPIs */}
        <div className="grid md:grid-cols-[220px_1fr] gap-6 mb-6 items-stretch">
          <div className="flex flex-col items-center justify-center bg-neutral-50 rounded-2xl py-10 px-6">
            <ScoreRing score={r.score} />
            <p className="mt-3 text-xs text-neutral-500 font-medium text-center">Potentiel d&apos;optimisation</p>
            <span className="mt-2 text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor:matColor+"18",color:matColor }}>
              Niveau {r.maturity}
            </span>
          </div>
          <div className="grid gap-3">
            {[
              { val:`${r.hoursLost}h`, lbl:"perdues par semaine, tous collaborateurs confondus" },
              { val:`CHF ${r.annualSavings.toLocaleString("fr-CH")}`, lbl:"de productivité récupérable chaque année" },
              { val:String(r.automatizable), lbl:"processus automatisables identifiés" },
            ].map(({ val,lbl }) => (
              <div key={lbl} className="bg-white border border-neutral-100 rounded-2xl p-6 flex items-center gap-5">
                <div>
                  <p className="text-2xl font-bold text-[#0a0a0a]" style={{ fontFamily:"var(--font-space-grotesk)" }}>{val}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{lbl}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why this score */}
        <div className="mb-10 bg-white border border-neutral-100 rounded-2xl px-6">
          <h3 className="text-base font-bold text-[#0a0a0a] pt-5 mb-1" style={{ fontFamily:"var(--font-space-grotesk)" }}>Pourquoi ce score ?</h3>
          <p className="text-xs text-neutral-400 mb-1">Le détail par domaine, pour comprendre precisément d&apos;où vient votre potentiel d&apos;optimisation.</p>
          {r.subScores.map(s => <SubScoreBar key={s.label} {...s} />)}
        </div>

        {/* Friction points */}
        <div className="mb-8">
          <h3 className="text-base font-bold text-[#0a0a0a] mb-1" style={{ fontFamily:"var(--font-space-grotesk)" }}>Points de friction identifiés</h3>
          <p className="text-xs text-neutral-400 mb-4">Ce que ces situations vous coûtent concrètement, chaque semaine.</p>
          <div className="space-y-2.5">
            {r.frictions.map((f,i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white border border-neutral-100 rounded-xl">
                <span className="shrink-0 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5" style={{ backgroundColor:V }}>{i+1}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-neutral-800">{f}</p>
                    <span className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor:V+"0f",color:V }}>~{r.frictionHours[i]}h/sem.</span>
                  </div>
                  {FRICTION_INFO[f] && <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{FRICTION_INFO[f].insight}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <h3 className="text-base font-bold text-[#0a0a0a] mb-1" style={{ fontFamily:"var(--font-space-grotesk)" }}>Nos recommandations pour {lead.company || "votre entreprise"}</h3>
          <p className="text-xs text-neutral-400 mb-4">
            Basées directement sur les frictions prioritaires ci-dessus{answers.sector ? `, ${SECTOR_HINT[answers.sector] ?? SECTOR_HINT["Autre"]}` : ""}.
          </p>
          <div className="space-y-3">
            {r.recommendations.map(({ priority,title,action }) => (
              <div key={priority} className="flex items-start gap-4 p-5 border border-neutral-100 rounded-xl bg-white">
                <span className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor:V+"14",color:V }}>{priority}</span>
                <div>
                  <p className="text-sm font-semibold text-neutral-800">{title}</p>
                  <p className="text-sm text-neutral-500 mt-0.5 leading-relaxed">{action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost of inaction */}
        <div className="mb-8 rounded-2xl px-7 py-7 text-white" style={{ backgroundColor:V }}>
          <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Sans changement</p>
          <p className="text-lg font-semibold leading-snug mb-1">
            Ces frictions représentent environ {annualHours.toLocaleString("fr-CH")}h perdues par an — l&apos;équivalent de {annualDays} jours de travail complets.
          </p>
          <p className="text-sm text-white/60 leading-relaxed">
            Soit environ CHF {r.annualSavings.toLocaleString("fr-CH")} de productivité non exploitée chaque année pour {lead.company || "votre entreprise"}.
          </p>
        </div>

        <button type="button" onClick={onFinal}
          className="w-full py-4 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ backgroundColor:V, boxShadow:`0 4px 24px ${V}40` }}>
          Voir comment résoudre ces points →
        </button>
      </div>
    </div>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────

function Final({ lead, result }: { lead:Lead; result:Result|null }) {
  const topFriction = result?.frictions[0];
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor:V+"14" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={V} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-5 leading-tight" style={{ fontFamily:"var(--font-space-grotesk)" }}>Et maintenant ?</h2>
        <p className="text-base text-neutral-500 leading-relaxed mb-3 max-w-md mx-auto">
          Lors d&apos;un échange de 30 minutes, nous vous montrons comment {lead.company || "votre entreprise"} peut récupérer jusqu&apos;à {result?.hoursLost ?? ""}h par semaine{topFriction ? <> en commençant par : <span className="font-semibold text-neutral-700">{topFriction.toLowerCase()}</span></> : null}.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed mb-12 max-w-md mx-auto">
          Vous repartirez avec une feuille de route concrète, sans engagement.
        </p>
        <div className="flex items-center justify-center">
          <a href="https://cal.com/agencesolve/reservez-votre-audit-offert?overlayCalendar=true" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor:V, boxShadow:`0 4px 24px ${V}40` }}>
            Réserver mon appel stratégique
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>
        <p className="mt-6 text-xs text-neutral-300">Premier échange gratuit · 30 minutes · En français</p>
      </div>
    </div>
  );
}

// ── Intro ─────────────────────────────────────────────────────────────────────

function Intro({ onStart }: { onStart:()=>void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full text-center">
        <div className="inline-flex items-center gap-2 border border-neutral-100 rounded-full px-4 py-1.5 text-xs text-neutral-500 mb-12">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor:V }}/>
          Audit de Performance Interne · NeX
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-[1.08] mb-6" style={{ fontFamily:"var(--font-space-grotesk)" }}>
          Découvrez où votre entreprise perd réellement du temps.
        </h1>
        <p className="text-sm text-neutral-500 leading-relaxed mb-4">En moins de 5 minutes, obtenez une estimation précise de :</p>
        <div className="space-y-2 mb-12 max-w-xs mx-auto text-left">
          {["Votre niveau de digitalisation actuel","Les heures perdues chaque semaine","Les processus prioritaires à optimiser","Votre potentiel de gain annuel"].map(t => (
            <div key={t} className="flex items-center gap-2.5 text-sm text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor:V }}/>{t}
            </div>
          ))}
        </div>
        <button type="button" onClick={onStart}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-lg"
          style={{ backgroundColor:V, boxShadow:`0 4px 24px ${V}40` }}>
          Commencer le diagnostic
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <p className="mt-5 text-xs text-neutral-300">Gratuit · Sans engagement · Résultats immédiats</p>
      </div>
    </div>
  );
}

// ── Main orchestrator ─────────────────────────────────────────────────────────

const STEP_NR: Partial<Record<Screen,number>> = { step1:1,step2:2,step3:3,step4:4,step5:5 };

export default function DiagnosticPage() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [answers, setAnswers] = useState<Answers>(A0);
  const [lead, setLead] = useState<Lead>(L0);
  const [result, setResult] = useState<Result|null>(null);
  const [animKey, setAnimKey] = useState(0);

  const go = (s: Screen) => {
    setAnimKey(k=>k+1);
    setScreen(s);
    if (typeof window!=="undefined") window.scrollTo({ top:0, behavior:"smooth" });
  };

  const startCalc = () => {
    go("calculating");
    setResult(calc(answers));
    setTimeout(()=>go("lead"), 2800);
  };

  const nr = STEP_NR[screen];

  if (nr !== undefined) {
    return (
      <div className="min-h-screen bg-neutral-50/60">
        <StepSidebar current={nr} />
        <MobileStepBar current={nr} />
        <div className="md:pl-[300px]">
          <div className="max-w-2xl mx-auto px-6 md:px-10 py-28 md:py-20">
            <div key={animKey} className="animate-fadeSlideIn bg-white border border-neutral-100 rounded-3xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-6 py-10 md:px-14 md:py-14">
              {screen==="step1" && <Step1 answers={answers} setAnswers={setAnswers} onNext={()=>go("step2")} onBack={()=>go("intro")} />}
              {screen==="step2" && <Step2 answers={answers} setAnswers={setAnswers} onNext={()=>go("step3")} onBack={()=>go("step1")} />}
              {screen==="step3" && <Step3 answers={answers} setAnswers={setAnswers} onNext={()=>go("step4")} onBack={()=>go("step2")} />}
              {screen==="step4" && <Step4 answers={answers} setAnswers={setAnswers} onNext={()=>go("step5")} onBack={()=>go("step3")} />}
              {screen==="step5" && <Step5 answers={answers} setAnswers={setAnswers} onNext={startCalc} onBack={()=>go("step4")} />}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/nex-logo.svg" alt="NeX" className="h-6 w-auto" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="pt-[65px]">
        <div key={animKey} className="animate-fadeSlideIn">
          {screen==="intro" && <Intro onStart={()=>go("step1")} />}
          {screen==="calculating" && <Calculating />}
          {screen==="lead" && <LeadCapture lead={lead} setLead={setLead} answers={answers} result={result} onSubmit={()=>go("results")} />}
          {screen==="results" && result && <Results result={result} lead={lead} answers={answers} onFinal={()=>go("final")} />}
          {screen==="final" && <Final lead={lead} result={result} />}
        </div>
      </div>
    </div>
  );
}
