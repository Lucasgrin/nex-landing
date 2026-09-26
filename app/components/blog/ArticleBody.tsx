import Link from "next/link";
import type { Article, Block } from "../../content/articles";
import Rich from "./Rich";

/**
 * Le corps d'un article.
 *
 * Une colonne de lecture d'environ 70 caractères, du texte à 17 px et un
 * interlignage généreux : un article se lit, il ne se survole pas. Les
 * sections sont numérotées comme les étapes du reste du site — même mono,
 * même gris — pour qu'on reconnaisse la maison.
 *
 * L'appel à l'action tombe après la deuxième section : le lecteur a compris
 * le problème, il n'a pas encore lu la solution. C'est le moment où il se
 * demande « et chez moi ? ».
 */
export default function ArticleBody({ article }: { article: Article }) {
  return (
    <div>
      {article.sections.map((section, i) => (
        <div key={section.id} className={i > 0 ? "pt-16" : ""}>
          <section id={section.id} className="scroll-mt-28">
            <p className="mono mb-3 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2
              className="mb-6 text-[26px] font-bold leading-[1.15] tracking-tight text-[#0a0a0a] md:text-[32px]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {section.title}
            </h2>
            <div className="space-y-6">
              {section.blocks.map((block, j) => (
                <BlockView key={j} block={block} />
              ))}
            </div>
          </section>

          {i === 1 && <MidCta cta={article.cta} />}
        </div>
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[17px] leading-[1.8] text-neutral-700">
          <Rich text={block.text} />
        </p>
      );

    case "h3":
      return (
        <h3
          className="pt-2 text-[19px] font-semibold text-[#0a0a0a]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {block.text}
        </h3>
      );

    case "list":
      return block.ordered ? (
        <ol className="space-y-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-4 text-[17px] leading-[1.75] text-neutral-700">
              <span className="mono mt-[7px] w-5 shrink-0 text-[11px] text-neutral-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <Rich text={item} />
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3.5 text-[17px] leading-[1.75] text-neutral-700">
              <span className="mt-[13px] h-1 w-1 shrink-0 rounded-full bg-neutral-400" aria-hidden />
              <span>
                <Rich text={item} />
              </span>
            </li>
          ))}
        </ul>
      );

    case "callout":
      return block.tone === "alert" ? (
        <aside className="rounded-2xl bg-[#0a0a0a] p-7 md:p-8">
          <p className="mono mb-3 text-[10px] uppercase tracking-[0.14em] text-white/40">{block.title}</p>
          <p className="text-[15.5px] leading-relaxed text-white/75">
            <Rich text={block.text} tone="dark" />
          </p>
        </aside>
      ) : (
        <aside className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-7">
          <p className="mono mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
            {block.title}
          </p>
          <p className="text-[15.5px] leading-relaxed text-neutral-700">
            <Rich text={block.text} />
          </p>
        </aside>
      );

    case "table":
      return (
        <figure>
          <figcaption className="mono mb-3 text-[10.5px] uppercase tracking-[0.12em] text-neutral-400">
            {block.caption}
          </figcaption>
          <div className="overflow-x-auto rounded-2xl border border-neutral-200">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead className="bg-neutral-50">
                <tr>
                  {block.head.map((h, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="mono px-5 py-3 text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => {
                  // Les lignes de résultat d'un exemple chiffré se lisent en premier.
                  const total = /^(Total|Manque à gagner)/.test(row[0]);
                  return (
                    <tr key={i} className={`border-t border-neutral-200 ${total ? "bg-neutral-50" : ""}`}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-5 py-3.5 align-top text-[14.5px] leading-relaxed ${
                            total
                              ? "font-semibold text-[#0a0a0a]"
                              : j === 0
                                ? "font-medium text-[#0a0a0a]"
                                : "text-neutral-600"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </figure>
      );
  }
}

/** L'appel au milieu de l'article, relié au problème qu'il traite. */
function MidCta({ cta }: { cta: Article["cta"] }) {
  return (
    <aside className="mt-14 overflow-hidden rounded-2xl bg-[#0a0a0a] p-8 md:p-10">
      <p className="mono mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/40">
        <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden />
        Et chez vous&nbsp;?
      </p>
      <p
        className="max-w-[520px] text-[23px] font-bold leading-tight tracking-tight text-white md:text-[26px]"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {cta.title}
      </p>
      <p className="mt-3 max-w-[520px] text-[15px] leading-relaxed text-white/60">{cta.text}</p>
      <Link
        href={cta.href}
        className="group mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-6 py-3 text-[14.5px] font-semibold text-[#0a0a0a] transition-colors hover:bg-neutral-100"
      >
        {cta.label}
        <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>
          →
        </span>
      </Link>
    </aside>
  );
}
