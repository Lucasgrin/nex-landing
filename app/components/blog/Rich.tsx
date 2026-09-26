import Link from "next/link";
import { Fragment } from "react";

/**
 * Le texte enrichi du blog : **gras** et [lien](/chemin), rien d'autre.
 *
 * Une mini-syntaxe plutôt que du Markdown complet : les articles vivent dans
 * un fichier TypeScript, et deux marques suffisent à écrire un texte
 * lisible et bien maillé. Tout ce qui ressemblerait à de la mise en page
 * passe par les blocs (listes, tableaux, encadrés), pas par le texte.
 */
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

export default function Rich({ text, tone = "light" }: { text: string; tone?: "light" | "dark" }) {
  const link =
    tone === "dark"
      ? "font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
      : "font-medium text-[#0a0a0a] underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-[#0a0a0a]";
  const strong = tone === "dark" ? "font-semibold text-white" : "font-semibold text-[#0a0a0a]";

  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className={strong}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        const m = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (m) {
          const [, label, href] = m;
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={link}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={link}>
              {label}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
