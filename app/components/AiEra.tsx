import AnimateOnScroll from "./AnimateOnScroll";

/**
 * Commencez petit, avancez au rythme de l'IA.
 *
 * Un graphique qui se trace de gauche à droite, tête de lecture en tête :
 * la courbe de ce que l'IA rend possible, celle d'un outil sur mesure qui la
 * suit, et l'escalier d'un logiciel du marché qui décroche. La cote de droite
 * est la seule chose à retenir — l'écart, et il se creuse tout seul.
 *
 * Schéma volontairement sans valeurs : pas d'axe chiffré, temps relatif, et la
 * mention en clair. Un graphique précis sans source se retourne contre vous au
 * premier prospect qui demande d'où il sort.
 */

const AI_D =
  "M 0 250 C 30.5 247.7, 121.8 242.0, 183 236 C 244.2 230.0, 305.8 223.0, 367 214 C 428.2 205.0, 489.0 194.7, 550 182 C 611.0 169.3, 671.8 154.0, 733 138 C 794.2 122.0, 855.8 104.0, 917 86 C 978.2 68.0, 1069.5 39.3, 1100 30";
const YOU_D =
  "M 0 258 C 30.5 256.0, 121.8 251.3, 183 246 C 244.2 240.7, 305.8 234.7, 367 226 C 428.2 217.3, 489.0 206.7, 550 194 C 611.0 181.3, 671.8 165.7, 733 150 C 794.2 134.3, 855.8 117.3, 917 100 C 978.2 82.7, 1069.5 55.0, 1100 46";
const MK_D = "M 0 256 L 380 256 L 380 238 L 700 238 L 700 224 L 1000 224 L 1000 218 L 1100 218";

export default function AiEra() {
  return (
    <section
      id="evolutif"
      className="border-y border-neutral-100 bg-neutral-50 px-6 py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-[1240px]">
        <AnimateOnScroll>
          <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
            Évolutif par nature
          </p>
          <h2
            className="mb-3.5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight md:text-[40px]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-[#0a0a0a]">Commencez petit.</span>{" "}
            <span className="text-neutral-300">Avancez au rythme de l&apos;IA.</span>
          </h2>
          <p className="mb-9 max-w-[700px] text-[15.5px] leading-relaxed text-neutral-500">
            Chaque semaine apporte de nouveaux modèles et de nouvelles automatisations.
            L&apos;avantage ne va pas à ceux qui attendent l&apos;outil parfait — il va à ceux qui
            ont déjà une base sur laquelle greffer ces nouveautés, le jour où elles sortent.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={80}>
          <div className="chartwrap relative overflow-hidden rounded-[20px] bg-[#0a0a0a] px-6 pb-6 pt-7 md:px-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-36 -top-40 h-[420px] w-[620px]"
              style={{ background: "radial-gradient(ellipse, rgba(74,222,128,.09), transparent 68%)" }}
            />

            <div className="relative mb-1.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] px-2.5 py-[5px]">
                  <span className="livedot h-[5px] w-[5px] rounded-full bg-green-400" />
                  <span className="mono text-[9px] tracking-[0.14em] text-white/[0.55]">EN CONTINU</span>
                </span>
                <span className="hidden text-[13.5px] text-white/[0.62] sm:inline">
                  Ce que l&apos;IA rend possible — et ce que vous en faites
                </span>
              </div>
              <span className="mono shrink-0 text-[9px] tracking-[0.12em] text-white/[0.28]">
                SCHÉMA ILLUSTRATIF
              </span>
            </div>

            <svg
              className="chart w-full"
              viewBox="0 0 1176 316"
              role="img"
              aria-label="Schéma : la capacité rendue possible par l'IA progresse vite ; un outil sur mesure la suit de près, un logiciel du marché décroche par paliers."
            >
              <defs>
                <linearGradient id="gAi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity=".09" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gYou" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#4ade80" stopOpacity=".13" />
                  <stop offset="1" stopColor="#4ade80" stopOpacity="0" />
                </linearGradient>
                <filter id="fGlow" x="-30%" y="-40%" width="160%" height="180%">
                  <feGaussianBlur stdDeviation="5" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g stroke="rgba(255,255,255,.09)" strokeWidth="1" strokeDasharray="2 5">
                <line className="tk tk1" x1="367" y1="10" x2="367" y2="270" />
                <line className="tk tk2" x1="733" y1="10" x2="733" y2="270" />
                <line className="tk tk3" x1="1100" y1="10" x2="1100" y2="270" />
              </g>
              <line x1="0" y1="270" x2="1176" y2="270" stroke="rgba(255,255,255,.12)" strokeWidth="1" />

              <g className="fills">
                <path d={`${AI_D} L 1100 270 L 0 270 Z`} fill="url(#gAi)" />
                <path d={`${YOU_D} L 1100 270 L 0 270 Z`} fill="url(#gYou)" />
              </g>

              <g className="gap">
                <rect x="1004" y="66" width="96" height="152" fill="rgba(255,255,255,.07)" rx="3" />
                <line x1="1004" y1="66" x2="1100" y2="66" stroke="rgba(74,222,128,.5)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="1004" y1="218" x2="1100" y2="218" stroke="rgba(74,222,128,.5)" strokeWidth="1" strokeDasharray="3 3" />
                <text x="994" y="138" textAnchor="end" fontFamily="var(--font-mono-ui), monospace" fontSize="10" letterSpacing=".9" fill="#4ade80">
                  L&apos;ÉCART
                </text>
                <text x="994" y="154" textAnchor="end" fontFamily="var(--font-geist), system-ui" fontSize="11.5" fill="rgba(255,255,255,.5)">
                  ce que vous ne faites pas
                </text>
              </g>

              <path className="ln lnAi" d={AI_D} fill="none" stroke="rgba(255,255,255,.34)" strokeWidth="1.6" strokeDasharray="6 5" />
              <path className="ln lnMk" d={MK_D} fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="2" strokeLinejoin="round" />
              <path className="ln lnYouGlow" d={YOU_D} fill="none" stroke="rgba(74,222,128,.32)" strokeWidth="4" strokeLinecap="round" filter="url(#fGlow)" />
              <path className="ln lnYou" d={YOU_D} fill="none" stroke="#4ade80" strokeWidth="2.6" strokeLinecap="round" />

              {[
                { c: "mk1", x: 183, y: 246 },
                { c: "mk2", x: 550, y: 194 },
                { c: "mk3", x: 917, y: 100 },
              ].map((m) => (
                <g key={m.c} className={`mk ${m.c}`}>
                  <circle cx={m.x} cy={m.y} r="4.5" fill="#0a0a0a" stroke="#4ade80" strokeWidth="2.4" />
                </g>
              ))}

              <g className="runner">
                <circle r="16" fill="rgba(74,222,128,.18)" />
                <circle r="5.5" fill="#4ade80" />
              </g>

              <g fontFamily="var(--font-mono-ui), monospace" fontSize="9.5" letterSpacing=".7">
                <g className="lb lb1">
                  <line x1="0" y1="40" x2="20" y2="40" stroke="rgba(255,255,255,.34)" strokeWidth="1.6" strokeDasharray="6 5" />
                  <text x="28" y="44" fill="rgba(255,255,255,.42)">CE QUE L&apos;IA REND POSSIBLE</text>
                </g>
                <text className="lb lb2" x="742" y="214" fill="rgba(255,255,255,.38)">UN LOGICIEL DU MARCHÉ</text>
                <text className="lb lb3" x="1100" y="22" textAnchor="end" fill="#4ade80">VOTRE OUTIL SUR MESURE</text>
              </g>
              <g className="lb lb4" fontFamily="var(--font-mono-ui), monospace" fontSize="9" letterSpacing=".6" fill="rgba(255,255,255,.42)">
                <text x="183" y="228" textAnchor="middle">PREMIER MODULE</text>
                <text x="917" y="66" textAnchor="middle">+ AGENT IA</text>
              </g>

              <g fontFamily="var(--font-mono-ui), monospace" fontSize="9" letterSpacing="1" fill="rgba(255,255,255,.26)">
                <text x="0" y="294">AUJOURD&apos;HUI</text>
                <text x="367" y="294" textAnchor="middle">+ 6 MOIS</text>
                <text x="733" y="294" textAnchor="middle">+ 1 AN</text>
                <text x="1100" y="294" textAnchor="end">+ 2 ANS</text>
              </g>
            </svg>

            <p className="relative mt-3.5 max-w-[900px] text-[13.5px] leading-relaxed text-white/50">
              <span className="font-semibold text-white">
                Une nouveauté arrive dans un logiciel du marché le jour où l&apos;éditeur décide de
                la sortir
              </span>{" "}
              — identique pour ses dizaines de milliers de clients. Dans le vôtre, elle arrive quand
              elle vous est utile, réglée sur votre métier. Vous n&apos;attendez la feuille de route
              de personne.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
