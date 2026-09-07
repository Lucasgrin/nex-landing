import AnimateOnScroll from "./AnimateOnScroll";

/**
 * Notre méthode, en démonstration qui se joue seule.
 *
 * Six étapes de 2,2 s sur une horloge commune de 13,2 s : le fil se remplit,
 * l'étape active passe en noir, et le panneau montre le livrable réel de
 * l'étape — les notes d'atelier, la carte des flux, la maquette validée, les
 * livraisons, la prise en main, le module suivant.
 *
 * Sous lg, la démonstration cède la place à la liste des six étapes : à cette
 * largeur, un panneau qui change tout seul est plus déroutant qu'utile.
 */

const ETAPES = [
  ["01", "Écoute", "Votre entreprise, vos équipes, vos contraintes — avant la moindre ligne de code."],
  ["02", "Cartographie", "On relève vos flux réels et on marque ce qui coince : double saisie, ressaisie, angles morts."],
  ["03", "Maquettes", "Vous validez les écrans et les parcours. Rien n'est construit dans le vide."],
  ["04", "Développement", "Livraisons toutes les deux semaines. Vous voyez l'outil grandir au lieu d'attendre."],
  ["05", "Déploiement", "Vos équipes sont formées et accompagnées. L'adoption compte autant que l'outil."],
  ["06", "Évolutions", "Un nouveau besoin ? Il devient un module de plus, pas un nouveau projet."],
];

const NOTES = [
  "Relances clients faites à la main — environ 2 h par jour",
  "Trois fichiers Excel qui ne se parlent pas",
  "Aucune vue partagée sur l'avancement des dossiers",
];

const NOEUDS = [
  { x: 10, y: 24, label: "Devis" },
  { x: 190, y: 24, label: "Facture" },
  { x: 10, y: 134, label: "Suivi" },
  { x: 330, y: 24, label: "Stock" },
  { x: 330, y: 134, label: "Achats" },
];

function Illus({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="flex w-full max-w-[520px] flex-col gap-2.5">
        <div className="mono mb-1 text-[9px] tracking-[0.14em] text-neutral-300">NOTES D&apos;ATELIER</div>
        {NOTES.map((n, k) => (
          <div key={n} className={`note n${k + 1}`}>
            <span className="bul" />
            {n}
            {k === 2 && <span className="caret2">|</span>}
          </div>
        ))}
      </div>
    );

  if (i === 1)
    return (
      <svg viewBox="0 0 520 190" className="w-full max-w-[520px]" aria-hidden>
        <g className="mapline" stroke="#e5e5e5" strokeWidth="1.5" fill="none">
          <path d="M70 40 H 250" />
          <path d="M250 40 V 100 H 70 V 150 H 250" />
          <path d="M330 40 H 450 V 150 H 330" />
        </g>
        <g className="mapnode">
          {NOEUDS.map((n) => (
            <g key={n.label}>
              <rect x={n.x} y={n.y} width="120" height="32" rx="8" fill="#fff" stroke="#e5e5e5" />
              <text x={n.x + 60} y={n.y + 20} textAnchor="middle" fontSize="11" fill="#525252" fontFamily="var(--font-geist), system-ui">
                {n.label}
              </text>
            </g>
          ))}
        </g>
        <g className="mapflag">
          <circle cx="160" cy="40" r="11" fill="#fee2e2" />
          <text x="160" y="44" textAnchor="middle" fontSize="11" fill="#dc2626" fontFamily="var(--font-geist), system-ui">!</text>
          <circle cx="160" cy="150" r="11" fill="#fee2e2" />
          <text x="160" y="154" textAnchor="middle" fontSize="11" fill="#dc2626" fontFamily="var(--font-geist), system-ui">!</text>
          <text x="184" y="182" fontSize="10" fill="#dc2626" fontFamily="var(--font-mono-ui), monospace" letterSpacing=".08em">
            2 RESSAISIES MANUELLES
          </text>
        </g>
      </svg>
    );

  if (i === 2)
    return (
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-xl border border-neutral-100 bg-white">
        <div className="flex gap-[5px] border-b border-neutral-100 bg-neutral-50 px-3 py-2.5">
          {[0, 1, 2].map((k) => (
            <span key={k} className="h-1.5 w-1.5 rounded-full bg-neutral-200" />
          ))}
        </div>
        <div className="flex gap-2.5 p-3.5">
          <div className="wf w1 h-[116px] w-[118px] rounded-lg bg-neutral-100" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="wf w2 h-[22px] rounded-md bg-neutral-100" />
            <div className="wf w3 h-[38px] rounded-md bg-neutral-100" />
            <div className="wf w4 h-10 rounded-md bg-neutral-100" />
          </div>
        </div>
        <div className="cursor absolute left-[300px] top-[110px]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#0a0a0a"><path d="M5 2l14 9-6 1.5L10 20z" /></svg>
        </div>
        <div className="okchip absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-[5px]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5 9 17.5 20 6.5" /></svg>
          <span className="mono text-[9px] tracking-[0.1em] text-green-700">VALIDÉ PAR VOUS</span>
        </div>
      </div>
    );

  if (i === 3)
    return (
      <div className="w-full max-w-[520px]">
        <div className="mono mb-4 text-[9px] tracking-[0.14em] text-neutral-300">LIVRAISONS</div>
        <div className="flex h-[116px] items-end gap-3">
          {[["d1", 44, "S2"], ["d2", 68, "S4"], ["d3", 88, "S6"], ["d4", 110, "S8"]].map(([c, h, l]) => (
            <div key={c as string} className={`dl ${c} flex-1`}>
              <span style={{ height: `${h}px` }} />
              <b>{l}</b>
            </div>
          ))}
        </div>
      </div>
    );

  if (i === 4)
    return (
      <div className="w-full max-w-[520px]">
        <div className="mono mb-[18px] text-[9px] tracking-[0.14em] text-neutral-300">PRISE EN MAIN</div>
        <div className="flex flex-wrap gap-3">
          {["AB", "CD", "EF", "GH", "IJ", "KL"].map((v, k) => (
            <span key={v} className={`av a${k + 1}`}>{v}</span>
          ))}
        </div>
        <div className="counter mono mt-5 text-[11px] tracking-[0.1em] text-green-700">
          ÉQUIPE FORMÉE ET AUTONOME
        </div>
      </div>
    );

  return (
    <div className="w-full max-w-[520px]">
      <div className="mono mb-4 text-[9px] tracking-[0.14em] text-neutral-300">VOTRE OUTIL, PLUS TARD</div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <div className="mod">CRM</div>
        <div className="mod">Documents</div>
        <div className="mod">Automatisations</div>
        <div className="mod newmod">+ le suivant</div>
      </div>
      <div className="mono mt-[18px] text-[11px] text-neutral-500">
        Un besoin de plus, pas un projet de plus.
      </div>
    </div>
  );
}

export default function Method() {
  return (
    <section id="methode" className="px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1240px]">
        <AnimateOnScroll>
          <div className="mb-11 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                Notre méthode
              </p>
              <h2
                className="text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Comprendre avant de construire.
              </h2>
            </div>
            <p className="max-w-[330px] text-[14.5px] leading-relaxed text-neutral-500">
              Rien n&apos;est développé avant qu&apos;on ait compris comment vous travaillez
              réellement.
            </p>
          </div>
        </AnimateOnScroll>

        {/* ── Démonstration auto-jouée (lg et plus) ── */}
        <div className="hidden items-stretch gap-11 lg:flex">
          <div className="relative w-[340px] shrink-0 pl-[26px]">
            <div className="absolute bottom-3.5 left-[5px] top-3.5 w-px bg-neutral-100" />
            <div className="prog absolute left-[5px] top-3.5 w-px bg-[#0a0a0a]" />
            {ETAPES.map(([n, t], i) => (
              <div key={n} className={`strow sr${i + 1}`}>
                <span className="stnum mono">{n}</span>
                <span className="sttitle">{t}</span>
              </div>
            ))}
          </div>

          <div className="relative min-h-[348px] flex-1 overflow-hidden rounded-[18px] border border-neutral-100 bg-white px-[30px] py-7">
            {ETAPES.map(([n, t, d], i) => (
              <div key={n} className={`stpanel sp${i + 1}`}>
                <div className="mb-2.5 flex items-baseline gap-3">
                  <span className="mono text-[10px] tracking-[0.14em] text-neutral-400">{n}</span>
                  <span className="text-xl font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {t}
                  </span>
                </div>
                <p className="mb-[26px] max-w-[560px] text-sm leading-relaxed text-neutral-500">{d}</p>
                <Illus i={i} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Repli sous lg ── */}
        <ol className="grid gap-3 sm:grid-cols-2 lg:hidden">
          {ETAPES.map(([n, t, d]) => (
            <li key={n} className="rounded-2xl border border-neutral-100 p-5">
              <div className="mono mb-2 text-[10px] tracking-[0.14em] text-neutral-400">{n}</div>
              <h3 className="mb-1.5 text-[15px] font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {t}
              </h3>
              <p className="text-[13px] leading-relaxed text-neutral-500">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
