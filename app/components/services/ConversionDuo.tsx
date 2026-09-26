import Link from "next/link";
import { SITE } from "../../content/site";

/**
 * Les deux portes de sortie, côte à côte, pour deux prospects différents.
 *
 * Celui qui est prêt réserve un appel. Celui qui ne l'est pas encore ne doit
 * pas repartir les mains vides : le diagnostic lui donne un premier chiffre
 * en cinq minutes, sans parler à personne. Deux cartes de même taille, mais
 * pas de même poids : l'appel est sur fond noir.
 */
export default function ConversionDuo({
  title = "Parlons de votre situation.",
  subtitle = "Deux façons de commencer, sans engagement.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 text-center">
          <h2
            className="text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {title}
          </h2>
          <p className="mt-3 text-[15.5px] text-neutral-500">{subtitle}</p>
        </div>

        <div className="mx-auto grid max-w-[980px] gap-3 md:grid-cols-2">
          <a
            href={SITE.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-3xl bg-[#0a0a0a] p-8 transition-transform hover:-translate-y-0.5 md:p-10"
          >
            <p className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/45">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden />
              Vous savez ce qui coince
            </p>
            <p
              className="mt-6 text-[26px] font-bold leading-tight tracking-tight text-white md:text-[30px]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Réserver un appel de 30 minutes
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/60">
              On regarde vos process réels et on vous dit franchement si un outil sur mesure vaut le
              coup chez vous.
            </p>
            <span className="mt-8 inline-flex min-h-[48px] items-center gap-2 self-start rounded-full bg-white px-6 py-3 text-[14.5px] font-semibold text-[#0a0a0a] transition-colors group-hover:bg-neutral-100">
              Choisir un créneau
              <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
            </span>
          </a>

          <Link
            href="/diagnostic"
            className="group flex flex-col rounded-3xl border border-neutral-200 bg-white p-8 transition-all hover:-translate-y-0.5 hover:border-neutral-400 md:p-10"
          >
            <p className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-neutral-500">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" aria-hidden />
              Vous voulez d&apos;abord un chiffre
            </p>
            <p
              className="mt-6 text-[26px] font-bold leading-tight tracking-tight text-[#0a0a0a] md:text-[30px]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Faire le diagnostic gratuit
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-500">
              Cinq minutes, sans inscription : estimez le temps que vous perdez en ressaisies et en
              tâches répétitives.
            </p>
            <span className="mt-8 inline-flex min-h-[48px] items-center gap-2 self-start rounded-full border border-neutral-300 px-6 py-3 text-[14.5px] font-semibold text-[#0a0a0a] transition-colors group-hover:border-[#0a0a0a]">
              Lancer le diagnostic
              <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
            </span>
          </Link>
        </div>
        <p className="mono mt-6 text-center text-[10px] uppercase tracking-[0.12em] text-neutral-400">
          Sans engagement · En visio ou par téléphone · Réponse franche
        </p>
      </div>
    </section>
  );
}
