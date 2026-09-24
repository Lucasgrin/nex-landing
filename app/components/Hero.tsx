import { SITE } from "../content/site";
import VslPlayer from "./VslPlayer";

/**
 * Hero : la VSL est la pièce maîtresse. C'est elle qui explique — le texte
 * pose la promesse et le CTA, rien de plus. Un seul objectif : l'appel.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pt-28 md:px-10 md:pt-36">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            "linear-gradient(#0a0a0a 1px,transparent 1px),linear-gradient(90deg,#0a0a0a 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[minmax(0,540px)_minmax(0,620px)] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-20 lg:gap-y-0">
        <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1 lg:self-end">
          <div className="hero-badge mb-7 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-1.5">
            <span className="breathe h-[5px] w-[5px] rounded-full bg-green-400" />
            <span className="mono text-[10.5px] tracking-[0.1em] text-neutral-500">
              PAYERNE · SUISSE ROMANDE
            </span>
          </div>

          <h1
            className="hero-title mb-6 text-4xl font-bold leading-[1.04] tracking-[-0.028em] text-[#0a0a0a] md:text-5xl lg:text-[55px]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Un seul outil,
            <br />
            construit autour
            <br />
            <span className="text-neutral-300">
              de votre façon
              <br />
              de travailler.
            </span>
          </h1>

          <p className="hero-sub mb-8 max-w-[470px] text-base leading-relaxed text-neutral-500 md:text-[17px]">
            NeX conçoit des logiciels métier sur mesure pour les PME de Suisse romande. Vos
            données réunies, vos tâches répétitives automatisées, l&apos;IA là où elle rapporte
            vraiment.
          </p>
        </div>

        {/* Un seul CTA dominant ; le diagnostic reste une porte de sortie discrète. */}
        <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2 lg:self-start">
          <div className="hero-ctas mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={SITE.calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0a0a0a] px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              Réserver un appel
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-1.5 text-[14.5px] font-medium text-neutral-400 transition-colors hover:text-[#0a0a0a]"
            >
              Pas encore prêt ? Faites le diagnostic <span aria-hidden>→</span>
            </a>
          </div>

          <p className="hero-sub mono text-[10.5px] tracking-[0.08em] text-neutral-400">
            30 MIN · SANS ENGAGEMENT
          </p>
        </div>

        {/* Emplacement VSL — dimensionné en 16/9 pour la vraie vidéo.
            En mobile il remonte entre l'accroche et le bouton (ordre VSL). */}
        <div className="hero-mockup order-2 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#0a0a0a] shadow-[0_32px_80px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.06)]">
            <VslPlayer />
          </div>

          {/* La légende décrit ce qui est réellement dans le cadre : la vidéo
              une fois qu'elle existe, l'illustration en attendant. */}
          <p className="mt-4 text-[13px] leading-relaxed text-neutral-400">
            {SITE.vsl.sources.length > 0 ? (
              <>
                <span className="font-medium text-neutral-600">
                  Ce que change un outil construit pour votre métier
                </span>{" "}
                — en {SITE.vsl.duration || "quelques minutes"}, sans jargon.
              </>
            ) : (
              <>
                <span className="font-medium text-neutral-600">
                  Quatre outils qui ne se parlent pas
                </span>{" "}
                — et ce que ça donne une fois réunis dans un seul, construit pour votre métier.
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
