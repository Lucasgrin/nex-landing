import Link from "next/link";
import { SITE } from "../content/site";

/** Bloc de conversion réutilisé au bas de chaque page interne. */
export default function PageCTA({
  title = "Parlons de votre projet.",
  desc = "Un premier échange de 30 minutes, sans engagement, pour comprendre votre situation et vous dire honnêtement si nous sommes le bon partenaire.",
}: {
  title?: string;
  desc?: string;
}) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl rounded-3xl bg-[#0a0a0a] px-8 py-16 text-center md:px-14">
        <h2
          className="text-3xl font-bold tracking-tight text-white md:text-4xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/60">{desc}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={SITE.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold text-[#0a0a0a] transition-colors hover:bg-neutral-100"
          >
            Réserver un appel
          </a>
          <Link
            href="/diagnostic"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white/80 transition-colors hover:border-white/50 hover:text-white"
          >
            Diagnostic gratuit <span aria-hidden="true">→</span>
          </Link>
        </div>
        <p className="mt-5 text-xs text-white/30">Premier échange sans engagement · 30 min</p>
      </div>
    </section>
  );
}
