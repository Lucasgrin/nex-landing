"use client";

import { useState } from "react";
import ArticleCard, { type ArticleCardData } from "./ArticleCard";

/**
 * La grille du blog, filtrable par métier.
 *
 * Tous les articles sont rendus côté serveur — le filtre ne fait que
 * masquer : les moteurs voient toute la liste, le lecteur ne voit que son
 * métier. Un filtre qui viderait la grille n'est jamais proposé.
 */
export default function BlogGrid({ articles, topics }: { articles: ArticleCardData[]; topics: string[] }) {
  const [topic, setTopic] = useState<string | null>(null);
  const shown = topic ? articles.filter((a) => a.topic === topic) : articles;

  const chip = (on: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition-colors ${
      on
        ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
        : "border-neutral-200 text-neutral-600 hover:border-neutral-500 hover:text-[#0a0a0a]"
    }`;

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtrer par métier">
        <button type="button" className={chip(topic === null)} aria-pressed={topic === null} onClick={() => setTopic(null)}>
          Tous les articles
        </button>
        {topics.map((t) => (
          <button key={t} type="button" className={chip(topic === t)} aria-pressed={topic === t} onClick={() => setTopic(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
