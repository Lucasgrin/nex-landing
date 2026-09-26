import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import AnimateOnScroll from "../components/AnimateOnScroll";
import PageCTA from "../components/PageCTA";
import BlogGrid from "../components/blog/BlogGrid";
import type { ArticleCardData } from "../components/blog/ArticleCard";
import { ARTICLES, TOPICS, articleHref, readingMinutes } from "../content/articles";
import { SITE } from "../content/site";
import { JsonLd, breadcrumbJsonLd, ORG_ID } from "../lib/seo";

const TITLE = "Blog · IA, logiciels et organisation pour les PME romandes";
const DESCRIPTION =
  "Réglementation, IA, organisation : des réponses concrètes aux problèmes actuels des artisans, fiduciaires, entreprises de nettoyage, courtiers, régies et agences de Suisse romande.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/blog", type: "website", locale: "fr_CH" },
};

const trail = [
  { name: "Accueil", path: "/" },
  { name: "Blog", path: "/blog" },
];

/**
 * L'index du blog.
 *
 * Un article à la une — le plus transversal —, puis tous les autres,
 * filtrables par métier : le visiteur qui arrive d'une page réalisation
 * cherche d'abord ce qui concerne son secteur.
 */
export default function BlogIndex() {
  const featured = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
  const rest: ArticleCardData[] = ARTICLES.filter((a) => a.slug !== featured.slug).map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    topic: a.topic,
    minutes: readingMinutes(a),
  }));
  const topics = TOPICS.filter((t) => rest.some((a) => a.topic === t));

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Blog ${SITE.name}`,
    description: DESCRIPTION,
    url: `${SITE.url}/blog`,
    inLanguage: "fr-CH",
    publisher: { "@id": ORG_ID },
    blogPost: ARTICLES.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: `${SITE.url}${articleHref(a.slug)}`,
      datePublished: a.publishedAt,
      dateModified: a.updatedAt,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={blogJsonLd} />
      <Navbar />

      <main>
        {/* ── En-tête ── */}
        <section className="px-6 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-[1240px]">
            <Breadcrumbs trail={trail} />
            <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">Blog</p>
            <h1
              className="mb-6 max-w-3xl text-4xl font-bold leading-[1.06] tracking-[-0.028em] text-[#0a0a0a] md:text-5xl lg:text-[52px]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Des réponses concrètes aux problèmes de votre métier.
            </h1>
            <p className="max-w-[680px] text-base leading-relaxed text-neutral-500 md:text-[17px]">
              Réglementation, IA, organisation&nbsp;: ce qui change pour les PME de Suisse romande, et
              comment y répondre sans alourdir votre quotidien. Chaque article répond à une question
              précise, sources à l&apos;appui.
            </p>
          </div>
        </section>

        {/* ── À la une ── */}
        <section className="px-6 pt-14 md:px-10">
          <div className="mx-auto max-w-[1240px]">
            <AnimateOnScroll>
              <Link
                href={articleHref(featured.slug)}
                className="group grid overflow-hidden rounded-3xl bg-[#0a0a0a] lg:grid-cols-[1.25fr_1fr]"
              >
                <div className="p-8 md:p-12">
                  <p className="mono mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/45">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden />
                    À la une · {featured.topic}
                  </p>
                  <h2
                    className="text-[28px] font-bold leading-[1.1] tracking-tight text-white md:text-[38px]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-white/60">{featured.excerpt}</p>
                  <span className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-6 py-3 text-[14.5px] font-semibold text-[#0a0a0a] transition-colors group-hover:bg-neutral-100">
                    Lire l&apos;article
                    <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                  </span>
                </div>
                <div className="border-t border-white/10 p-8 md:p-12 lg:border-l lg:border-t-0">
                  <p className="mono mb-5 text-[10px] uppercase tracking-[0.14em] text-white/35">En bref</p>
                  <ul className="space-y-4">
                    {featured.tldr.slice(0, 3).map((t) => (
                      <li key={t} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-white/70">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-1 shrink-0 text-green-400" aria-hidden>
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mono mt-8 text-[10px] uppercase tracking-[0.12em] text-white/35">
                    {readingMinutes(featured)} min de lecture
                  </p>
                </div>
              </Link>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── Tous les articles ── */}
        <section className="px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <AnimateOnScroll>
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">Par métier</p>
              <h2
                className="mb-9 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Trouvez ce qui concerne votre métier.
              </h2>
            </AnimateOnScroll>
            <BlogGrid articles={rest} topics={[...topics]} />
          </div>
        </section>

        <PageCTA
          title={"Une question qui n'est pas dans la liste ?"}
          desc="Posez-la-nous directement. Trente minutes, sans engagement : on regarde votre situation et on vous répond franchement."
        />
      </main>

      <Footer />
    </>
  );
}
