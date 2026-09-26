import AnimateOnScroll from "./AnimateOnScroll";

/**
 * Les six briques, en rail horizontal.
 *
 * Chaque carte porte une micro-illustration animée plutôt qu'une icône morte :
 * la brique qui se cale, le visiteur qui entre dans le portail, le document que
 * l'IA balaie. Le rail déborde du cadre — c'est le signal qu'on peut défiler.
 */

function Card({
  title,
  desc,
  dark = false,
  children,
}: {
  title: string;
  desc: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`w-[268px] shrink-0 snap-start rounded-2xl border p-[22px] sm:w-[288px] ${
        dark ? "border-[#0a0a0a] bg-[#0a0a0a]" : "border-neutral-100 bg-white"
      }`}
    >
      <div className="mb-4 h-[72px]">{children}</div>
      <h3
        className={`mb-2 text-[15px] font-bold ${dark ? "text-white" : "text-[#0a0a0a]"}`}
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {title}
      </h3>
      <p className={`text-[13px] leading-relaxed ${dark ? "text-white/50" : "text-neutral-500"}`}>
        {desc}
      </p>
    </div>
  );
}

export default function WhatWeBuild() {
  return (
    <section id="services" className="px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1240px]">
        <AnimateOnScroll>
          <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
            Ce que nous construisons
          </p>
          <h2
            className="mb-3.5 max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Six briques. Assemblées pour vous.
          </h2>
          <p className="mb-9 max-w-[520px] text-[15.5px] leading-relaxed text-neutral-500">
            On ne vend pas un produit à configurer. On assemble ce dont votre métier a besoin — et
            rien d&apos;autre.
          </p>
        </AnimateOnScroll>
      </div>

      <div className="mx-auto flex max-w-[1240px] snap-x snap-mandatory gap-3.5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        <Card title="Logiciels métier" desc="CRM, ERP, applications internes — calqués sur vos flux réels, pas sur un standard.">
          <div className="flex h-full flex-col justify-center gap-1.5" aria-hidden>
            <div className="h-[15px] w-full rounded-[5px] bg-neutral-100" />
            <div className="slidein h-[15px] w-[68%] rounded-[5px] bg-[#0a0a0a]" />
            <div className="h-[15px] w-[86%] rounded-[5px] bg-neutral-100" />
          </div>
        </Card>

        <Card title="Portails" desc="Vos clients et partenaires voient où en est leur dossier, sans vous le demander.">
          <div className="relative flex h-full items-center" aria-hidden>
            <span className="enterdoor absolute left-2 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#0a0a0a]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
              </svg>
            </span>
            <span className="absolute left-[62px] h-16 w-[52px] rounded-lg border border-neutral-200 bg-neutral-50" />
            <span className="breathe absolute left-[106px] h-[5px] w-[5px] rounded-full bg-green-400" />
          </div>
        </Card>

        <Card title="Automatisations" desc="Relances, synchronisations, rapports. Ça tourne la nuit, vous supervisez le matin.">
          <div className="flex h-full items-center pl-5" aria-hidden>
            <div className="relative h-11 w-11">
              <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-neutral-200" />
              <div className="orbit absolute left-1/2 top-1/2 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#0a0a0a]" />
            </div>
          </div>
        </Card>

        <Card dark title="Intelligence artificielle" desc="Lecture de documents, rédaction, décisions selon vos règles. Là où c'est mesurable.">
          <div className="flex h-full items-center pl-2" aria-hidden>
            <div className="relative h-[58px] w-[46px] overflow-hidden rounded-md border border-white/[0.18] bg-white/[0.04]">
              <div className="flex flex-col gap-1 p-2">
                {["100%", "78%", "90%", "62%"].map((w, i) => (
                  <span key={i} className="h-[3px] rounded-sm bg-white/20" style={{ width: w }} />
                ))}
              </div>
              <div
                className="scan absolute left-0 right-0 top-1 h-px"
                style={{ background: "linear-gradient(90deg,transparent,#4ade80,transparent)" }}
              />
            </div>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="2" className="mx-2.5">
              <path d="M5 12h13M13 6l6 6-6 6" />
            </svg>
            <div className="rounded-full bg-green-400/[0.14] px-2.5 py-1.5">
              <span className="mono text-[9.5px] text-green-400">TRIÉ</span>
            </div>
          </div>
        </Card>

        <Card title="Dashboards" desc="Les chiffres qui comptent pour vous, à jour en temps réel.">
          <div className="flex h-full items-end gap-[7px] pl-1" aria-hidden>
            {[
              { h1: "22px", h2: "44px", dark: false, d: "0s" },
              { h1: "48px", h2: "30px", dark: true, d: ".4s" },
              { h1: "30px", h2: "56px", dark: false, d: ".8s" },
              { h1: "40px", h2: "24px", dark: false, d: "1.2s" },
            ].map((b, i) => (
              <span
                key={i}
                className={`bar w-[13px] rounded-[3px] ${b.dark ? "bg-[#0a0a0a]" : "bg-neutral-100"}`}
                style={
                  { "--h1": b.h1, "--h2": b.h2, animationDelay: b.d } as React.CSSProperties
                }
              />
            ))}
          </div>
        </Card>

        <Card title="Intégrations" desc="Bexio, Microsoft 365, Google Workspace. Plus de double saisie.">
          <div className="relative flex h-full items-center gap-12 pl-1.5" aria-hidden>
            <span className="h-[26px] w-[26px] rounded-[7px] border border-neutral-200 bg-neutral-50" />
            <span className="h-[26px] w-[26px] rounded-[7px] border border-neutral-200 bg-neutral-50" />
            <span className="absolute left-8 right-0 top-1/2 h-px bg-neutral-100" />
            <span className="pingpong absolute left-8 top-1/2 -mt-[3px] h-1.5 w-1.5 rounded-full bg-[#0a0a0a]" />
          </div>
        </Card>
      </div>
    </section>
  );
}
