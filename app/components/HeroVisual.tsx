/**
 * Ce qui occupe le cadre 16/9 du hero tant que la VSL n'existe pas.
 *
 * Même cadre, même place : le jour où la vidéo arrive, elle se substitue à
 * cette illustration sans rien déplacer. En attendant, le cadre ne doit pas
 * être une promesse vide — il explique déjà l'offre : quatre sources
 * dispersées dont la donnée remonte vers un seul outil, qui vit.
 *
 * Tout est en SVG avec viewBox : la scène suit la largeur de la colonne.
 */

const SOURCES = [
  { y: 40, label: "Excel_clients_v3", badge: null },
  { y: 100, label: "Boîte mail", badge: "47" },
  { y: 160, label: "Groupe WhatsApp", badge: null },
  { y: 220, label: "Classeurs papier", badge: null },
];

const ROWS = [
  { n: "Dupont SA", s: "Relance envoyée automatiquement", dot: "#4ade80" },
  { n: "Fiduciaire Vallon", s: "Devis signé · archivé", dot: "#4ade80" },
  { n: "Atelier Muller", s: "En attente de signature", dot: "#fbbf24" },
];

export default function HeroVisual() {
  return (
    <svg
      className="herovis h-full w-full"
      viewBox="0 0 620 349"
      role="img"
      aria-label="Quatre sources dispersées — un tableur, une boîte mail, un groupe de messagerie et des classeurs papier — dont les données remontent vers un outil unique où les relances partent toutes seules."
    >
      <rect width="620" height="349" fill="#0a0a0a" />
      <g stroke="rgba(255,255,255,.05)" strokeWidth="1">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="349" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={`h${i}`} x1="0" y1={i * 48} x2="620" y2={i * 48} />
        ))}
      </g>

      {/* Les liaisons : elles convergent toutes vers le même point. */}
      <g stroke="rgba(255,255,255,.16)" strokeWidth="1" strokeDasharray="3 4">
        {SOURCES.map((s, i) => (
          <line key={i} x1="188" y1={s.y + 19} x2="318" y2="174" />
        ))}
      </g>
      {SOURCES.map((s, i) => (
        <circle
          key={`sp${i}`}
          className={`hspark hs${i + 1}`}
          r="3"
          fill="#4ade80"
          style={{ offsetPath: `path("M 188 ${s.y + 19} L 318 174")` } as React.CSSProperties}
        />
      ))}

      {/* Les sources, éparpillées et sans lien entre elles. */}
      {SOURCES.map((s, i) => (
        <g key={s.label} className={`hdrift hd${i + 1}`}>
          <rect x="30" y={s.y} width="158" height="38" rx="9" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.1)" />
          <text x="44" y={s.y + 23} fontSize="10.5" fill="rgba(255,255,255,.5)" fontFamily="var(--font-geist), system-ui">
            {s.label}
          </text>
          {s.badge && (
            <>
              <rect x="152" y={s.y + 11} width="24" height="16" rx="8" fill="rgba(239,68,68,.18)" />
              <text x="164" y={s.y + 22} fontSize="9" textAnchor="middle" fill="#f87171" fontFamily="var(--font-mono-ui), monospace">
                {s.badge}
              </text>
            </>
          )}
        </g>
      ))}

      {/* L'outil unique : c'est le seul endroit où il se passe quelque chose. */}
      <g>
        <rect x="318" y="46" width="272" height="256" rx="14" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.12)" />
        <line x1="318" y1="76" x2="590" y2="76" stroke="rgba(255,255,255,.12)" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={334 + i * 11} cy="61" r="3" fill="rgba(255,255,255,.2)" />
        ))}
        <text x="376" y="65" fontSize="9" fill="rgba(255,255,255,.35)" fontFamily="var(--font-mono-ui), monospace">
          votre-outil.ch
        </text>
        <circle className="hpulse" cx="546" cy="61" r="3" fill="#22c55e" />
        <text x="556" y="64" fontSize="8.5" fill="#22c55e" fontFamily="var(--font-mono-ui), monospace">
          ACTIF
        </text>

        {ROWS.map((r, i) => (
          <g key={r.n} className={`hrow hr${i + 1}`}>
            <rect x="332" y={90 + i * 44} width="244" height="36" rx="9" fill="rgba(255,255,255,.05)" />
            <circle cx="352" cy={108 + i * 44} r="10" fill="rgba(255,255,255,.08)" />
            <text x="352" y={111 + i * 44} fontSize="9" textAnchor="middle" fill="rgba(255,255,255,.5)" fontFamily="var(--font-mono-ui), monospace">
              {r.n[0]}
            </text>
            <text x="370" y={105 + i * 44} fontSize="10" fill="#fff" fontFamily="var(--font-geist), system-ui" fontWeight="600">
              {r.n}
            </text>
            <text x="370" y={117 + i * 44} fontSize="8.5" fill="rgba(255,255,255,.4)" fontFamily="var(--font-geist), system-ui">
              {r.s}
            </text>
            <circle cx="562" cy={108 + i * 44} r="3.5" fill={r.dot} />
          </g>
        ))}

        <rect x="332" y="228" width="244" height="58" rx="10" fill="rgba(74,222,128,.09)" />
        <path
          className="hscan"
          d="M332 230 H576"
          stroke="rgba(74,222,128,.7)"
          strokeWidth="1"
        />
        <path d="M348 246l1.6 5.5L355 253l-5.4 1.6L348 260l-1.6-5.4L341 253l5.4-1.5z" fill="#4ade80" />
        <text x="362" y="252" fontSize="9" fill="#4ade80" fontFamily="var(--font-mono-ui), monospace" letterSpacing=".06em">
          AGENT IA
        </text>
        <circle className="hpulse" cx="562" cy="248" r="3" fill="#4ade80" />
        <text x="348" y="270" fontSize="9" fill="rgba(255,255,255,.45)" fontFamily="var(--font-geist), system-ui">
          3 relances envoyées · 2 documents lus · 0 saisie manuelle
        </text>
      </g>
    </svg>
  );
}
