import Link from "next/link";

/** Ce qu'une carte d'article affiche — calculé côté serveur. */
export interface ArticleCardData {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  minutes: number;
}

/**
 * Une carte d'article. Pas d'image : le site est typographique, et une
 * photo d'illustration générique dirait moins que le titre lui-même.
 */
export default function ArticleCard({ article }: { article: ArticleCardData }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-7 transition-colors hover:border-neutral-400"
    >
      <p className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-neutral-500">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
        {article.topic}
      </p>
      <h3
        className="mt-5 text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#0a0a0a]"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {article.title}
      </h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-neutral-500">{article.excerpt}</p>
      <div className="mt-auto flex items-center justify-between pt-7">
        <span className="mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">
          {article.minutes} min de lecture
        </span>
        <span className="text-[13.5px] font-semibold text-[#0a0a0a]">
          Lire{" "}
          <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
