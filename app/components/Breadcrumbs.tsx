import Link from "next/link";

/**
 * Fil d'Ariane. Affiché sur toutes les pages internes et repris en JSON-LD :
 * Google s'en sert pour remplacer l'URL brute par un chemin lisible dans les
 * résultats de recherche.
 */
export default function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-400">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-neutral-500">{item.name}</span>
              ) : (
                <Link href={item.path} className="transition-colors hover:text-[#0a0a0a]">
                  {item.name}
                </Link>
              )}
              {!last && <span aria-hidden="true" className="text-neutral-300">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
