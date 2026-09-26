"use client";

import { useEffect, useState } from "react";

/**
 * Le sommaire, collé à droite du texte sur grand écran.
 *
 * Il sert deux fois : il dit dès l'arrivée ce que l'article couvre — on
 * reste quand on voit sa question dans la liste —, puis il montre où l'on en
 * est. La section active est celle dont le titre a passé le haut de l'écran
 * en dernier.
 */
export default function ArticleToc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const update = () => {
      const line = 140;
      let current = sections[0].id;
      for (const s of sections) {
        if (s.getBoundingClientRect().top - line <= 0) current = s.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav aria-label="Sommaire de l'article">
      <p className="mono mb-4 text-[10px] uppercase tracking-[0.14em] text-neutral-400">Sommaire</p>
      <ol className="space-y-0.5 border-l border-neutral-200">
        {items.map((it, i) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px flex gap-3 border-l py-1.5 pl-4 text-[13px] leading-snug transition-colors ${
                  on
                    ? "border-[#0a0a0a] font-medium text-[#0a0a0a]"
                    : "border-transparent text-neutral-500 hover:text-[#0a0a0a]"
                }`}
              >
                <span className="mono mt-[2px] shrink-0 text-[10px] text-neutral-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {it.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
