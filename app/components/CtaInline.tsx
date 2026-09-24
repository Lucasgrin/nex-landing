import { SITE } from "../content/site";

/**
 * Le bouton d'appel, posé au fil de la page.
 *
 * Il apparaît plusieurs fois par page et sur plusieurs gabarits : page
 * métier, page réalisation. Le sortir d'un fichier de page est ce qui
 * garantit que les deux restent identiques quand l'un des deux bouge.
 */
export default function CtaInline({ label, note }: { label: string; note?: string }) {
  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
      <a
        href={SITE.calUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0a0a0a] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-neutral-800"
      >
        {label}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12h13M13 6l6 6-6 6" />
        </svg>
      </a>
      {note && <span className="mono text-[10.5px] tracking-[0.08em] text-neutral-400">{note}</span>}
    </div>
  );
}
