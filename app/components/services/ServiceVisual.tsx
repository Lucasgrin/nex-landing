import type { ReactNode } from "react";
import WindowBar from "../WindowBar";

/**
 * L'illustration d'un service : un écran type, dessiné en HTML.
 *
 * Un prospect ne sait pas toujours ce que recouvre « ERP » ou « portail
 * client ». Il reconnaît en revanche un pipeline, un tableau de bord, un
 * espace où son client suit son dossier. L'écran dit ce que le mot ne dit
 * pas — en trois secondes, avant la moindre phrase.
 *
 * Même cadre que les captures des réalisations, avec le badge
 * « Illustration » : ce sont des écrans types aux données fictives, pas des
 * captures d'un outil livré, et la barre le dit.
 */
export default function ServiceVisual({ slug, className = "" }: { slug: string; className?: string }) {
  const v = VISUALS[slug];
  if (!v) return null;
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)]">
        <WindowBar screen={v.screen} badge="Illustration" />
        <div className="relative h-[300px] overflow-hidden bg-neutral-50/60 p-4 md:h-[340px] md:p-5">{v.body}</div>
      </div>
    </figure>
  );
}

const mono = "mono text-[9px] uppercase tracking-[0.12em] text-neutral-400";

function Check({ className = "text-green-600" }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" className={`shrink-0 ${className}`} aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* ── CRM : un pipeline à vos étapes ─────────────────────────────────── */
const PIPE = [
  { t: "Nouveau", total: "CHF 11 600", cards: [["Menuiserie Roux", "CHF 8 400"], ["Cabinet Morel", "CHF 3 200"]] },
  { t: "Devis envoyé", total: "CHF 12 900", cards: [["Garage du Lac", "CHF 12 900"]], relance: true },
  { t: "Négociation", total: "CHF 8 050", cards: [["Traiteur Blanc", "CHF 5 600"], ["Studio Nord", "CHF 2 450"]] },
  { t: "Gagné", total: "CHF 9 800", cards: [["Atelier Vidal", "CHF 9 800"]], won: true },
];

function Crm() {
  return (
    // Deux colonnes sur téléphone : à quatre, les noms deviennent illisibles.
    <div className="grid h-full grid-cols-2 gap-2.5 sm:grid-cols-4">
      {PIPE.map((col, i) => (
        <div key={col.t} className={`flex min-w-0 flex-col gap-2 rounded-lg bg-neutral-100/80 p-2 ${i >= 2 ? "hidden sm:flex" : ""}`}>
          <div className="flex items-center justify-between gap-1 px-1 pt-0.5">
            <span className={`${mono} truncate`}>{col.t}</span>
            <span className="mono shrink-0 text-[9px] text-neutral-400">{col.cards.length}</span>
          </div>
          {col.cards.map(([name, amount]) => (
            <div key={name} className="rounded-md border border-neutral-200 bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <p className="truncate text-[11.5px] font-semibold text-[#0a0a0a]">{name}</p>
              <p className="mono mt-1 text-[10px] text-neutral-500">{amount}</p>
              {col.relance && (
                <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[9.5px] font-medium text-green-700">
                  <span className="h-1 w-1 rounded-full bg-green-500" /> Relance auto · demain
                </p>
              )}
              {col.won && (
                <p className="mt-2 inline-flex items-center gap-1 text-[9.5px] font-medium text-green-700">
                  <Check /> Signé
                </p>
              )}
            </div>
          ))}
          {/* Le total de la colonne, en pied : ce qu'un dirigeant regarde en premier. */}
          <div className="mt-auto border-t border-neutral-200 px-1 pt-2">
            <p className="mono text-[8.5px] uppercase tracking-[0.1em] text-neutral-400">Total</p>
            <p className={`text-[12.5px] font-bold ${col.won ? "text-green-700" : "text-[#0a0a0a]"}`} style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {col.total}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── ERP : un tableau de bord consolidé ─────────────────────────────── */
function Erp() {
  const kpis: [string, string, number[]][] = [
    ["Stock valorisé", "CHF 184 k", [5, 7, 6, 8, 7, 9]],
    ["Commandes en cours", "23", [3, 4, 6, 5, 7, 8]],
    ["Marge du mois", "31 %", [6, 5, 7, 6, 8, 9]],
  ];
  const rows: [string, string, string][] = [
    ["OF-2291 · Châssis alu", "Atelier 2", "En cours"],
    ["OF-2292 · Portail acier", "Atelier 1", "Prêt"],
    ["OF-2294 · Garde-corps", "Atelier 2", "Matière attendue"],
  ];
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-3 gap-2.5">
        {kpis.map(([l, v, bars]) => (
          <div key={l} className="rounded-lg border border-neutral-200 bg-white p-3">
            <p className={`${mono} truncate`}>{l}</p>
            <p className="mt-1.5 text-[17px] font-bold tracking-tight text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {v}
            </p>
            <div className="mt-2 flex h-6 items-end gap-[3px]">
              {bars.map((b, i) => (
                <span key={i} className={`flex-1 rounded-[2px] ${i === bars.length - 1 ? "bg-green-500" : "bg-neutral-200"}`} style={{ height: `${b * 10}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-lg border border-neutral-200 bg-white">
        <p className={`${mono} border-b border-neutral-100 px-3 py-2`}>Production · cette semaine</p>
        {rows.map(([of, where, status]) => (
          <div key={of} className="flex items-center gap-3 border-b border-neutral-100 px-3 py-2.5 last:border-0">
            <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium text-[#0a0a0a]">{of}</span>
            <span className="hidden text-[10.5px] text-neutral-500 sm:inline">{where}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[9.5px] font-medium ${
                status === "Prêt" ? "bg-green-50 text-green-700" : status === "En cours" ? "bg-neutral-100 text-neutral-600" : "bg-amber-50 text-amber-700"
              }`}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Portail client : le client suit son dossier ────────────────────── */
function Portail() {
  const steps = ["Dossier reçu", "Analyse", "À valider", "Livré"];
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="rounded-lg border border-neutral-200 bg-white p-3.5">
        <p className="text-[12.5px] font-semibold text-[#0a0a0a]">Bonjour Mme Rochat</p>
        <p className="mt-0.5 text-[10.5px] text-neutral-500">Dossier · Bouclement 2025</p>
        <div className="mt-3.5 flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold ${
                    i < 2 ? "bg-[#0a0a0a] text-white" : i === 2 ? "border-2 border-green-500 bg-white text-green-700" : "border border-neutral-300 bg-white text-neutral-400"
                  }`}
                >
                  {i < 2 ? <Check className="text-white" /> : i + 1}
                </span>
                <span className={`whitespace-nowrap text-[9px] ${i === 2 ? "font-semibold text-[#0a0a0a]" : "text-neutral-500"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && <span className={`mx-1 mb-4 h-px flex-1 ${i < 2 ? "bg-[#0a0a0a]" : "bg-neutral-200"}`} />}
            </div>
          ))}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 bg-white p-3">
          <p className={mono}>Documents</p>
          {[
            ["Bilan 2025.pdf", "À valider"],
            ["Mandat signé.pdf", ""],
            ["Relevés T3.pdf", ""],
          ].map(([d, s]) => (
            <div key={d} className="mt-2 flex items-center gap-2">
              <span className="flex h-6 w-5 items-center justify-center rounded-[3px] border border-neutral-200 text-[6px] font-bold text-neutral-400">PDF</span>
              <span className="min-w-0 flex-1 truncate text-[11px] text-[#0a0a0a]">{d}</span>
              {s ? <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-[9px] font-medium text-green-700">{s}</span> : <Check />}
            </div>
          ))}
        </div>
        <div className="hidden flex-col justify-between rounded-lg border border-neutral-200 bg-white p-3 sm:flex">
          <p className={mono}>Messages</p>
          <div className="rounded-lg rounded-tl-sm bg-neutral-100 px-3 py-2 text-[11px] leading-snug text-neutral-700">
            Votre bilan est prêt. Vous pouvez le valider ici.
          </div>
          <span className="self-start rounded-full bg-[#0a0a0a] px-3 py-1.5 text-[10.5px] font-semibold text-white">Valider le bilan</span>
        </div>
      </div>
    </div>
  );
}

/* ── Application métier : le terrain saisit, le bureau reçoit ────────── */
function AppMetier() {
  return (
    <div className="flex h-full items-center justify-center gap-5">
      <div className="h-full w-[200px] shrink-0 rounded-[26px] border border-neutral-300 bg-white p-2.5 shadow-[0_12px_30px_-16px_rgba(0,0,0,0.3)]">
        <div className="flex h-full flex-col rounded-[18px] bg-neutral-50 p-3">
          <p className={mono}>Intervention</p>
          <p className="mt-1 text-[12px] font-semibold leading-tight text-[#0a0a0a]">Ch. des Vignes 4, Pully</p>
          {[
            ["Heures", "2 h 30"],
            ["Matériel", "3 articles"],
            ["Photos", "2"],
          ].map(([k, v]) => (
            <div key={k} className="mt-2 flex items-center justify-between rounded-md border border-neutral-200 bg-white px-2.5 py-1.5">
              <span className="text-[10.5px] text-neutral-500">{k}</span>
              <span className="text-[10.5px] font-semibold text-[#0a0a0a]">{v}</span>
            </div>
          ))}
          <div className="mt-2 flex-1 rounded-md border border-dashed border-neutral-300 bg-white px-2 pt-1">
            <p className="text-[8.5px] text-neutral-400">Signature du client</p>
            <svg viewBox="0 0 120 30" className="h-7 w-full" aria-hidden>
              <path d="M6 20 C 18 4, 24 28, 36 14 S 54 6, 62 18 S 84 24, 96 10 L 112 16" fill="none" stroke="#0a0a0a" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <span className="mt-2 rounded-full bg-[#0a0a0a] py-2 text-center text-[10.5px] font-semibold text-white">Valider et envoyer</span>
        </div>
      </div>
      <div className="hidden w-[210px] flex-col gap-2 sm:flex">
        <p className={mono}>Au bureau · aujourd&apos;hui</p>
        {[
          ["Ch. des Vignes 4", "Signé · 11:42", true],
          ["Rue du Port 12", "En cours", false],
          ["Av. de la Gare 8", "Planifié · 15:00", false],
        ].map(([a, s, done]) => (
          <div key={a as string} className="rounded-lg border border-neutral-200 bg-white p-2.5">
            <p className="text-[11px] font-semibold text-[#0a0a0a]">{a}</p>
            <p className={`mt-0.5 flex items-center gap-1 text-[10px] ${done ? "text-green-700" : "text-neutral-500"}`}>
              {done && <Check />} {s}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Automatisation : une donnée, saisie une fois, qui circule ───────── */
function Auto() {
  const nodes = ["Formulaire web", "CRM", "Facture", "E-mail client"];
  const log: [string, string][] = [
    ["Fiche client créée", "09:02"],
    ["Facture générée et envoyée", "09:02"],
    ["Relance programmée à J+7", "09:03"],
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-5">
      <div className="grid grid-cols-2 items-center gap-3 sm:flex sm:gap-0">
        {nodes.map((n, i) => (
          <div key={n} className="flex items-center sm:flex-1 sm:last:flex-none">
            <div className={`w-full rounded-lg border px-3 py-3 text-center sm:w-auto ${i === 0 ? "border-[#0a0a0a] bg-[#0a0a0a] text-white" : "border-neutral-200 bg-white text-[#0a0a0a]"}`}>
              <p className="whitespace-nowrap text-[11.5px] font-semibold">{n}</p>
              <p className={`mono mt-0.5 text-[8.5px] uppercase tracking-[0.1em] ${i === 0 ? "text-white/50" : "text-neutral-400"}`}>
                {i === 0 ? "saisie unique" : "automatique"}
              </p>
            </div>
            {i < nodes.length - 1 && (
              <span className="hidden flex-1 items-center justify-center gap-1 sm:flex" aria-hidden>
                <span className="flow-dot-1 h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className="flow-dot-2 h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className="flow-dot-3 h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2.5">
        <span className="rounded-full bg-[#0a0a0a] px-3 py-1 text-[10.5px] font-semibold text-white">1 saisie</span>
        <span className="text-[12px] text-neutral-400" aria-hidden>→</span>
        <span className="rounded-full bg-green-50 px-3 py-1 text-[10.5px] font-semibold text-green-700">3 outils à jour</span>
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white">
        <p className={`${mono} border-b border-neutral-100 px-3 py-2`}>Journal · sans intervention</p>
        {log.map(([l, t]) => (
          <div key={l} className="flex items-center gap-2.5 border-b border-neutral-100 px-3 py-2.5 last:border-0">
            <Check />
            <span className="flex-1 text-[11.5px] text-[#0a0a0a]">{l}</span>
            <span className="mono text-[9.5px] text-neutral-400">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Agents IA : l'IA lit, un humain valide ─────────────────────────── */
function Ia() {
  const fields: [string, string][] = [
    ["Fournisseur", "Électro Romandie SA"],
    ["Date", "12.09.2026"],
    ["Montant TTC", "CHF 1 284.60"],
    ["TVA", "8,1 %"],
  ];
  return (
    <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-[0.9fr_1.1fr]">
      <div className="hidden flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-3.5 sm:flex">
        <p className={mono}>Facture reçue · PDF</p>
        <div className="rounded-sm bg-green-500/10 px-1.5 py-1 outline outline-1 outline-green-500/50">
          <span className="block h-2 w-3/4 rounded-sm bg-neutral-300" />
        </div>
        <span className="h-1.5 w-1/2 rounded-sm bg-neutral-200" />
        <div className="w-1/3 rounded-sm bg-green-500/10 px-1.5 py-1 outline outline-1 outline-green-500/50">
          <span className="block h-1.5 rounded-sm bg-neutral-300" />
        </div>
        <span className="mt-2 h-1.5 w-full rounded-sm bg-neutral-100" />
        <span className="h-1.5 w-full rounded-sm bg-neutral-100" />
        <span className="h-1.5 w-5/6 rounded-sm bg-neutral-100" />
        <div className="mt-auto flex justify-end">
          <div className="w-1/2 rounded-sm bg-green-500/10 px-1.5 py-1 outline outline-1 outline-green-500/50">
            <span className="block h-2 rounded-sm bg-neutral-400" />
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-3.5">
        <div className="flex items-center justify-between">
          <p className={mono}>Extrait par l&apos;IA</p>
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9.5px] font-medium text-amber-700">À valider</span>
        </div>
        <div className="mt-2">
          {fields.map(([k, v]) => (
            <div key={k} className="flex items-center gap-2 border-b border-neutral-100 py-2 last:border-0">
              <span className="w-[86px] shrink-0 text-[10.5px] text-neutral-500">{k}</span>
              <span className="min-w-0 flex-1 truncate text-[11.5px] font-semibold text-[#0a0a0a]">{v}</span>
              <Check />
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="rounded-full bg-[#0a0a0a] px-3 py-1.5 text-[10.5px] font-semibold text-white">Valider l&apos;écriture</span>
          <span className="text-[10px] text-neutral-500">Contrôle humain</span>
        </div>
      </div>
    </div>
  );
}

const VISUALS: Record<string, { screen: string; body: ReactNode }> = {
  "crm-sur-mesure": { screen: "Pipeline commercial", body: <Crm /> },
  "erp-sur-mesure": { screen: "Tableau de bord", body: <Erp /> },
  "portail-client": { screen: "Espace client", body: <Portail /> },
  "application-metier": { screen: "Application terrain", body: <AppMetier /> },
  "automatisation-processus": { screen: "Flux automatisé", body: <Auto /> },
  "agents-ia": { screen: "Lecture de documents", body: <Ia /> },
};
