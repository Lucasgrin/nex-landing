import AnimateOnScroll from "./AnimateOnScroll";

/**
 * Générique ou sur mesure.
 *
 * Une seule scène qui se métamorphose, plutôt que deux tableaux à comparer
 * soi-même : les mêmes six briques passent de l'éparpillement à l'alignement,
 * le fond bascule au noir, les prix deviennent « inclus ». Le lecteur ne
 * compare pas deux images — il voit son propre bazar se ranger.
 *
 * La sixième brique est celle qu'aucun éditeur ne vend : « votre métier,
 * introuvable » devient « sur mesure ». C'est elle qui empêche de lire les
 * cinq autres comme un catalogue.
 *
 * En dessous de lg, la scène est remplacée par un comparatif statique : à
 * moins de ~900 px de large, les briques deviennent illisibles.
 */

const BRIQUES = [
  { cls: "m1", nom: "CRM" },
  { cls: "m2", nom: "Facturation" },
  { cls: "m3", nom: "Planning" },
  { cls: "m4", nom: "Documents" },
  { cls: "m5", nom: "Boîte mail" },
];

const STUBS = [7.823, 24.66, 41.497, 58.333, 75.17, 92.007];
const RIFTS = [
  { left: "18.707%", top: "52px", delay: "0s" },
  { left: "46.769%", top: "30px", delay: ".55s" },
  { left: "29.762%", top: "170px", delay: "1.1s" },
];

const GAINS = [
  ["Propriété", "Le code et les données sont à vous dès la livraison."],
  ["Coût", "Un collaborateur de plus ne coûte pas un abonnement de plus."],
  ["Évolution", "Vous décidez de ce qui est développé, et dans quel ordre."],
  ["Dépendance", "Aucun éditeur ne décide à votre place."],
];

function Croix() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3.6" strokeLinecap="round" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function WhyCustom() {
  return (
    <section id="sur-mesure" className="border-t border-neutral-100 px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1240px]">
        <AnimateOnScroll>
          <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
            Générique ou sur mesure
          </p>
          <h2
            className="mb-3.5 max-w-[900px] text-3xl font-bold leading-[1.1] tracking-tight md:text-[40px]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-[#0a0a0a]">Cinq abonnements qui ne se parlent pas.</span>
            <br />
            <span className="text-neutral-300">Ou un outil qui est à vous.</span>
          </h2>
          <p className="mb-8 max-w-[640px] text-[15.5px] leading-relaxed text-neutral-500">
            La plupart des PME n&apos;ont pas choisi leur système : elles ont empilé des
            abonnements, un par problème. C&apos;est l&apos;addition qui coûte cher.
          </p>
        </AnimateOnScroll>

        {/* ── Scène animée (lg et plus) ── */}
        <div className="reset mb-6 hidden lg:block">
          <div className="stage rounded-[20px] px-8 pb-[26px] pt-[30px]">
            <div className="relative mb-[18px] h-[22px]">
              <div className="ph-a absolute inset-0 flex items-center gap-3">
                <span className="mono text-[10px] tracking-[0.14em] text-neutral-500">AUJOURD&apos;HUI</span>
                <span className="text-[13px] text-neutral-500">cinq abonnements qui ne se parlent pas</span>
              </div>
              <div className="ph-b absolute inset-0 flex items-center gap-3">
                <span className="mono text-[10px] tracking-[0.14em] text-green-400">AVEC NEX</span>
                <span className="text-[13px] text-white">un seul outil, et il est à vous</span>
              </div>
              <div className="ph-a absolute right-0 top-0 flex h-[22px] items-center">
                <span className="mono text-[10px] tracking-[0.1em] text-neutral-300">×5 ABONNEMENTS</span>
              </div>
              <div className="ph-b absolute right-0 top-0 flex h-[22px] items-center">
                <span className="mono text-[10px] tracking-[0.1em] text-white/40">×1</span>
              </div>
            </div>

            <div className="relative h-[220px]">
              <div className="hull" />

              <div className="bus">
                <div className="absolute left-0 right-0 top-[152px] h-px bg-white/20" />
                {STUBS.map((x) => (
                  <div key={x} className="absolute top-[126px] h-[26px] w-px bg-white/20" style={{ left: `${x}%` }} />
                ))}
                <div
                  className="glide absolute top-[149px] h-[7px] w-[7px] rounded-full bg-green-400"
                  style={{ boxShadow: "0 0 12px rgba(74,222,128,.9)" }}
                />
              </div>

              {RIFTS.map((r) => (
                <div key={r.left} className="rift" style={{ left: r.left, top: r.top }}>
                  <span className="rift-line" />
                  <span className="rift-pkt" style={{ animationDelay: r.delay }} />
                  <span className="rift-x" style={{ animationDelay: r.delay }}>
                    <Croix />
                  </span>
                </div>
              ))}

              {BRIQUES.map((b) => (
                <div key={b.cls} className={`mt ${b.cls}`}>
                  <b>{b.nom}</b>
                  <span className="pa mono ph-a">CHF / MOIS</span>
                  <span className="pb mono ph-b">INCLUS</span>
                </div>
              ))}
              <div className="mt gh m6">
                <b>Votre métier</b>
                <span className="pa mono ph-a">INTROUVABLE</span>
                <span className="pb mono ph-b">SUR MESURE</span>
              </div>
            </div>

            <div className="relative mt-3.5 h-[42px]">
              <div className="ph-a absolute inset-0 flex items-center gap-2.5 rounded-[10px] bg-red-100 px-3.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                </svg>
                <span className="mono text-[10px] tracking-[0.1em] text-red-600">SAISIE MANUELLE</span>
                <span className="text-[12.5px] text-red-700">quelqu&apos;un recopie d&apos;un outil à l&apos;autre, tous les jours</span>
              </div>
              <div className="ph-b absolute inset-0 flex items-center gap-2.5 rounded-[10px] bg-green-400/[0.11] px-3.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M4 12.5 9 17.5 20 6.5" />
                </svg>
                <span className="mono text-[10px] tracking-[0.1em] text-green-400">0 SAISIE MANUELLE</span>
                <span className="text-[12.5px] text-white/[0.66]">la donnée passe d&apos;un module à l&apos;autre toute seule</span>
              </div>
            </div>

            <div className="rule mt-4 pt-4">
              <div className="relative mb-2.5 h-3.5">
                <span className="mono ink-mut absolute left-0 text-[9.5px] tracking-[0.1em]">CE QUE ÇA VOUS COÛTE</span>
                <span className="mono ph-a absolute right-0 text-[9.5px] tracking-[0.06em] text-neutral-400">↑ RÉVISÉ CHAQUE ANNÉE</span>
                <span className="mono ph-b absolute right-0 text-[9.5px] tracking-[0.06em] text-white/45">→ NE BOUGE PAS</span>
              </div>
              <div className="track">
                <div className="fill" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Repli sous lg : le même arbitrage, sans la scène ── */}
        <div className="mb-6 grid gap-3 lg:hidden">
          <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
            <p className="mono mb-4 text-[10px] tracking-[0.12em] text-neutral-500">
              UN EMPILEMENT D&apos;OUTILS DU MARCHÉ
            </p>
            <ul className="space-y-2.5 text-sm text-neutral-500">
              <li>Cinq abonnements facturés par utilisateur, révisés chaque année.</li>
              <li>Des liaisons qui n&apos;aboutissent pas : quelqu&apos;un recopie, tous les jours.</li>
              <li>Et la brique qui compte pour votre métier n&apos;existe nulle part.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-[#0a0a0a] p-6">
            <p className="mono mb-4 text-[10px] tracking-[0.12em] text-white">VOTRE OUTIL, AVEC NEX</p>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>Un seul outil, un investissement qui ne grimpe pas à chaque embauche.</li>
              <li>La donnée passe d&apos;un module à l&apos;autre toute seule : zéro saisie manuelle.</li>
              <li>Et ce que le marché ne vend pas devient un module comme un autre.</li>
            </ul>
          </div>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {GAINS.map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-neutral-100 p-5">
              <div className="mono mb-2.5 text-[9.5px] uppercase tracking-[0.12em] text-neutral-400">{k}</div>
              <p className="text-[13.5px] font-medium leading-snug text-[#0a0a0a]">{v}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-[660px] text-[13.5px] leading-relaxed text-neutral-500">
          Un logiciel du marché reste le bon choix pour ce qui est vraiment standard —
          comptabilité, messagerie, paie. Nous vous le dirons au premier appel plutôt que de vous
          vendre un développement inutile.
        </p>

        <p className="mt-6 max-w-[940px] text-[15px] leading-[1.7] text-neutral-600">
          <span className="font-semibold text-[#0a0a0a]">Ces six briques ne sont qu&apos;un exemple.</span>{" "}
          Un outil sur mesure n&apos;a pas de catalogue : suivi de chantier, calcul de marge,
          contrôle qualité, gestion de tournées, traçabilité, conformité — si votre métier le fait,
          ça peut être développé. La question n&apos;est presque jamais « est-ce possible ? », mais
          « est-ce que ça vaut le coup ? ». C&apos;est exactement ce qu&apos;on regarde ensemble au
          premier appel.
        </p>
      </div>
    </section>
  );
}
