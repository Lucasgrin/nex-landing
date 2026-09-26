import AnimateOnScroll from "./AnimateOnScroll";
import { Photo } from "./Photo";
import { TEAM, LOCAUX } from "../content/team";
import { SITE } from "../content/site";

/**
 * Section confiance. Deux visages, et le lieu.
 *
 * Le trio compte : un prospect appelé à froid cherche d'abord à savoir si
 * l'entreprise existe vraiment. Deux portraits le rassurent à moitié ; une
 * vraie pièce, avec sa charpente et ses postes de travail, finit le travail.
 * Sur /a-propos, la photo des bureaux a déjà sa propre section — d'où le
 * `showOffice` à false pour ne pas la montrer deux fois.
 */
export default function Team({
  heading = "Deux personnes, joignables directement.",
  showOffice = true,
}: {
  heading?: string;
  showOffice?: boolean;
}) {
  const office = LOCAUX[0];
  const cards = showOffice && office?.src ? 3 : 2;

  return (
    <section
      id="equipe"
      className="border-y border-neutral-100 bg-neutral-50 px-6 py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-12 lg:flex-row lg:items-center lg:gap-11">
        <AnimateOnScroll className="lg:w-[372px] lg:shrink-0">
          <p className="mono mb-4 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
            L&apos;équipe
          </p>
          <h2
            className="mb-5 text-3xl font-bold leading-[1.08] tracking-tight text-[#0a0a0a] md:text-[40px]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {heading}
          </h2>
          <p className="mb-4 text-[15.5px] leading-relaxed text-neutral-500">
            Pas de commercial qui passe le dossier à une équipe que vous ne verrez jamais. Les
            personnes avec qui vous parlez sont celles qui conçoivent et développent votre outil.
          </p>
          <p className="text-[15.5px] leading-relaxed text-neutral-500">
            Nos propres entreprises tournent sur les outils que nous avons construits — nous savons
            exactement ce que ça change au quotidien.
          </p>
        </AnimateOnScroll>

        <div
          className={`grid flex-1 gap-3.5 sm:grid-cols-2 ${cards === 3 ? "lg:grid-cols-3" : ""}`}
        >
          {TEAM.map((member, i) => (
            <AnimateOnScroll key={member.slug} delay={i * 90}>
              <article className="h-full rounded-2xl border border-neutral-100 bg-white p-[18px]">
                <Photo
                  src={member.photo}
                  alt={`${member.name}, ${member.role} chez ${SITE.name}`}
                  className="mb-4 aspect-[4/5] w-full rounded-xl"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 280px"
                />
                <h3
                  className="mb-1 text-base font-bold text-[#0a0a0a]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {member.name}
                </h3>
                <p className="text-xs text-neutral-400">{member.role}</p>
                {member.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500">{member.bio}</p>
                )}
              </article>
            </AnimateOnScroll>
          ))}

          {cards === 3 && (
            <AnimateOnScroll delay={180}>
              <article className="h-full rounded-2xl border border-neutral-100 bg-white p-[18px]">
                <Photo
                  src={office.src}
                  alt={office.alt}
                  className="mb-4 aspect-[4/5] w-full rounded-xl"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 280px"
                />
                <h3
                  className="mb-1 text-base font-bold text-[#0a0a0a]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Nos bureaux
                </h3>
                <p className="text-xs text-neutral-400">
                  {SITE.city} · canton de {SITE.region}
                </p>
              </article>
            </AnimateOnScroll>
          )}
        </div>
      </div>
    </section>
  );
}
