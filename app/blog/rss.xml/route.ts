import { ARTICLES, articleHref, plain } from "../../content/articles";
import { SITE } from "../../content/site";

export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Le flux RSS du blog. Il sert aux lecteurs de flux, mais surtout aux
 * agrégateurs et aux robots qui découvrent un nouvel article par là plutôt
 * qu'en attendant le passage suivant sur le sitemap.
 */
export function GET() {
  const items = [...ARTICLES]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map((a) => {
      const url = `${SITE.url}${articleHref(a.slug)}`;
      const summary = [a.excerpt, "", ...a.tldr.map((t) => `— ${plain(t)}`)].join("\n");
      return `    <item>
      <title>${escape(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <category>${escape(a.topic)}</category>
      <pubDate>${new Date(`${a.publishedAt}T08:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(summary)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog ${escape(SITE.name)}</title>
    <link>${SITE.url}/blog</link>
    <atom:link href="${SITE.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>IA, logiciels et organisation pour les PME de Suisse romande.</description>
    <language>fr-CH</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
