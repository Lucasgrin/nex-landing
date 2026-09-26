import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";
import { SITE } from "../content/site";

/** Le seul bloc noir plein de la page : il doit rester le point d'arrivée. */
export default function FinalCTA() {
  return (
    <section id="contact" className="px-6 pb-24 md:px-10">
      <div className="mx-auto max-w-[1240px]">
        <AnimateOnScroll>
          <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] px-6 py-20 text-center md:px-16 md:py-24">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
            <div className="relative">
              <p className="mono mb-5 text-[10px] tracking-[0.16em] text-white/30">
                PASSONS À L&apos;ACTION
              </p>
              <h2
                className="mx-auto mb-5 max-w-[720px] text-3xl font-bold leading-[1.08] tracking-[-0.028em] text-white md:text-[46px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Construisons l&apos;outil que votre entreprise mérite.
              </h2>
              <p className="mx-auto mb-9 max-w-[520px] text-base leading-relaxed text-white/50">
                Un premier échange pour analyser vos processus et identifier ensemble ce qui vaut
                vraiment la peine d&apos;être construit.
              </p>
              <a
                href={SITE.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-semibold text-[#0a0a0a] transition-colors hover:bg-neutral-100"
              >
                Réserver un appel
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
              </a>
              <p className="mono mt-6 text-[10px] tracking-[0.1em] text-white/25">
                30 MIN · SANS ENGAGEMENT
              </p>
              {/* Porte de sortie basse pression — après le CTA, jamais avant. */}
              <p className="mt-9 text-sm text-white/40">
                Vous préférez y voir clair avant d&apos;en parler ?{" "}
                <Link
                  href="/diagnostic"
                  className="font-semibold text-white underline underline-offset-4 transition-colors hover:text-white/70"
                >
                  Faites le diagnostic gratuit
                </Link>{" "}
                — 5 min, sans inscription.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
