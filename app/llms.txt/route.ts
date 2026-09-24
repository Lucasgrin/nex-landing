import { ARTICLES, articleHref, plain } from "../content/articles";
import { ALL_STUDIES, caseHref } from "../content/cases";
import { SERVICES } from "../content/services";
import { SITE } from "../content/site";

export const dynamic = "force-static";

/**
 * /llms.txt — la carte du site pour les moteurs de réponse (ChatGPT,
 * Perplexity, Claude, les aperçus IA de Google).
 *
 * Même rôle qu'un sitemap, mais lisible : qui est NeX, ce que fait chaque
 * page, en une ligne. Un modèle qui doit citer une source choisit celle
 * qu'il comprend le plus vite. Généré depuis la couche contenu : ajouter un
 * article ou une réalisation suffit à le faire apparaître ici.
 */
export function GET() {
  const lines: string[] = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.name} (${SITE.legalName}, ${SITE.city}) conçoit des logiciels métier sur mesure et intègre l'intelligence artificielle pour les PME de Suisse romande — Vaud, Genève, Fribourg, Neuchâtel, Valais, Jura. Ses outils remplacent les tableurs, les ressaisies et les abonnements empilés par une chaîne continue, du terrain à la facture.`,
    "",
    `Contact : ${SITE.email} · Premier échange de 30 minutes, sans engagement : ${SITE.calUrl}`,
    "",
    "## Réalisations et logiciels par métier",
    "",
    ...ALL_STUDIES.map(
      (c) => `- [${c.headline ?? `${c.client} — ${c.type}`}](${SITE.url}${caseHref(c.slug)}) (${c.sector}) : ${plain(c.summary)}`,
    ),
    "",
    "## Articles",
    "",
    ...ARTICLES.map((a) => `- [${a.title}](${SITE.url}${articleHref(a.slug)}) : ${plain(a.tldr[0])}`),
    "",
    "## Services",
    "",
    ...SERVICES.map((s) => `- [${s.name}](${SITE.url}/services/${s.slug}) : ${s.metaDescription}`),
    "",
    "## Pages utiles",
    "",
    `- [Diagnostic gratuit](${SITE.url}/diagnostic) : estimer en cinq minutes le temps perdu en ressaisies et tâches répétitives.`,
    `- [À propos](${SITE.url}/a-propos) : l'équipe et les locaux de ${SITE.name}.`,
    `- [Blog](${SITE.url}/blog) : réglementation, IA et organisation pour les PME romandes.`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
