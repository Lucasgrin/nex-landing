import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import PageCTA from "../../components/PageCTA";
import ArticleBody from "../../components/blog/ArticleBody";
import ArticleToc from "../../components/blog/ArticleToc";
import ArticleCard from "../../components/blog/ArticleCard";
import {
  ARTICLES,
  articleHref,
  formatDate,
  getArticle,
  plain,
  readingMinutes,
  relatedArticles,
} from "../../content/articles";
import { getStudy, caseHref } from "../../content/cases";
import { TEAM } from "../../content/team";
import { SITE } from "../../content/site";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, ORG_ID } from "../../lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const path = articleHref(article.slug);
  const author = TEAM.find((m) => m.slug === article.author);
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    authors: author ? [{ name: author.name }] : undefined,
    alternates: { canonical: path },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: path,
      type: "article",
      locale: "fr_CH",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      section: article.topic,
      tags: article.keywords,
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.metaDescription },
  };
}

/**
 * Un article du blog.
 *
 * L'ordre répond à la façon dont on lit en ligne : la réponse d'abord (« En
 * bref »), le détail ensuite, l'action au moment où le lecteur se reconnaît.
 * Même grammaire que le reste du site — surtitres en mono, titres en Space
 * Grotesk, fonds noirs réservés aux moments forts.
 */
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const path = articleHref(article.slug);
  const trail = [
    { name: "Accueil", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: article.title, path },
  ];
  const author = TEAM.find((m) => m.slug === article.author);
  const minutes = readingMinutes(article);
  const toc = article.sections.map((s) => ({ id: s.id, title: s.title }));
  const pages = article.pages.map(getStudy).filter((s) => s !== undefined);
  const related = relatedArticles(article).map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    topic: a.topic,
    minutes: readingMinutes(a),
  }));

  const postingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription,
    abstract: article.tldr.join(" "),
    url: `${SITE.url}${path}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}${path}` },
    image: `${SITE.url}${path}/opengraph-image`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "fr-CH",
    articleSection: article.topic,
    keywords: article.keywords.join(", "),
    wordCount: minutes * 220,
    author: author
      ? { "@type": "Person", name: author.name, jobTitle: author.role, worksFor: { "@id": ORG_ID } }
      : { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: pages.map((p) => ({ "@type": "Thing", name: p.sector })),
    hasPart: article.sections.map((s) => ({
      "@type": "WebPageElement",
      name: s.title,
      url: `${SITE.url}${path}#${s.id}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={postingJsonLd} />
      <JsonLd data={faqJsonLd(article.faq.map(({ q, a }) => ({ q, a: plain(a) })))} />
      <Navbar />

      <main>
        <article>
          {/* ── En-tête ── */}
          <header className="px-6 pt-32 md:px-10 md:pt-40">
            <div className="mx-auto max-w-[1240px]">
              <Breadcrumbs trail={trail} />
              <div className="max-w-[880px]">
                <p className="mono mb-4 flex items-center gap-2 text-[10.5px] uppercase tracking-[0.16em] text-neutral-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
                  {article.topic}
                </p>
                <h1
                  className="text-[34px] font-bold leading-[1.08] tracking-[-0.025em] text-[#0a0a0a] md:text-[46px] lg:text-[52px]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {article.title}
                </h1>
                <p className="mt-6 max-w-[720px] text-[17px] leading-relaxed text-neutral-500 md:text-[19px]">
                  {article.excerpt}
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-neutral-100 pt-6">
                  {author && (
                    <div className="flex items-center gap-3">
                      {author.photo ? (
                        <Image
                          src={author.photo}
                          alt={author.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="mono flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-[11px] text-neutral-500">
                          {author.name.split(" ").map((w) => w[0]).join("")}
                        </span>
                      )}
                      <div>
                        <p className="text-[14px] font-semibold text-[#0a0a0a]">{author.name}</p>
                        <p className="text-[12.5px] text-neutral-500">{author.role}</p>
                      </div>
                    </div>
                  )}
                  <p className="mono flex flex-wrap gap-x-2 gap-y-1 text-[10.5px] uppercase tracking-[0.12em] text-neutral-400">
                    <time dateTime={article.updatedAt} className="whitespace-nowrap">
                      Mis à jour le {formatDate(article.updatedAt)}
                    </time>
                    <span className="text-neutral-300" aria-hidden>·</span>
                    <span className="whitespace-nowrap">{minutes} min de lecture</span>
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* ── Le texte, et le sommaire à côté ── */}
          <div className="px-6 pb-20 pt-12 md:px-10 md:pb-24">
            <div className="mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-[minmax(0,720px)_260px] lg:justify-between">
              <div className="min-w-0">
                {/* En bref : la réponse d'abord. C'est aussi ce que les
                    moteurs de réponse reprennent en premier. */}
                <section aria-labelledby="en-bref" className="rounded-2xl border border-neutral-200 bg-neutral-50 p-7 md:p-8">
                  <h2 id="en-bref" className="mono mb-5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-500">
                    En bref
                  </h2>
                  <ul className="space-y-3.5">
                    {article.tldr.map((t) => (
                      <li key={t} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-neutral-700">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-[5px] shrink-0 text-green-600" aria-hidden>
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {t}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Sommaire replié, sur mobile : la colonne de droite n'existe pas. */}
                <details className="group mt-6 rounded-2xl border border-neutral-200 lg:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 text-[14px] font-semibold text-[#0a0a0a]">
                    Sommaire
                    <span className="text-neutral-400 transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <ol className="space-y-2 border-t border-neutral-100 px-6 py-4">
                    {toc.map((it, i) => (
                      <li key={it.id}>
                        <a href={`#${it.id}`} className="flex gap-3 text-[14px] leading-snug text-neutral-600 hover:text-[#0a0a0a]">
                          <span className="mono mt-[2px] text-[10px] text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                          {it.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>

                <div className="mt-14">
                  <ArticleBody article={article} />
                </div>

                {/* ── FAQ ── */}
                <section id="questions-frequentes" className="scroll-mt-28 pt-16">
                  <p className="mono mb-3 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                    Questions fréquentes
                  </p>
                  <h2
                    className="mb-6 text-[26px] font-bold leading-[1.15] tracking-tight text-[#0a0a0a] md:text-[32px]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Ce qu&apos;on nous demande à ce sujet.
                  </h2>
                  <div className="border-t border-neutral-200">
                    {article.faq.map(({ q, a }) => (
                      <details key={q} className="group border-b border-neutral-200">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5">
                          <h3
                            className="text-[17px] font-semibold leading-snug text-[#0a0a0a]"
                            style={{ fontFamily: "var(--font-space-grotesk)" }}
                          >
                            {q}
                          </h3>
                          <span className="mt-0.5 shrink-0 text-[20px] leading-none text-neutral-400 transition-transform group-open:rotate-45" aria-hidden>
                            +
                          </span>
                        </summary>
                        <p className="pb-6 pr-10 text-[15.5px] leading-relaxed text-neutral-600">{a}</p>
                      </details>
                    ))}
                  </div>
                </section>

                {/* Le métier concerné : la suite logique de la lecture. */}
                {pages.length > 0 && (
                  <section className="pt-14">
                    <p className="mono mb-4 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
                      Voir l&apos;outil en situation
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {pages.map((p) => (
                        <Link
                          key={p.slug}
                          href={caseHref(p.slug)}
                          className="group flex flex-col rounded-2xl border border-neutral-200 p-6 transition-colors hover:border-neutral-400"
                        >
                          <span className="mono text-[10px] uppercase tracking-[0.14em] text-neutral-400">{p.sector}</span>
                          <span
                            className="mt-2 text-[17px] font-semibold leading-snug text-[#0a0a0a]"
                            style={{ fontFamily: "var(--font-space-grotesk)" }}
                          >
                            {p.headline ?? p.client}
                          </span>
                          <span className="mt-4 text-[13.5px] font-semibold text-[#0a0a0a]">
                            {p.example ? "Découvrir" : "Lire le cas"}{" "}
                            <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-10">
                  <ArticleToc items={[...toc, { id: "questions-frequentes", title: "Questions fréquentes" }]} />
                  <div className="rounded-2xl border border-neutral-200 p-5">
                    <p className="text-[14px] font-semibold leading-snug text-[#0a0a0a]">
                      Un cas concret à nous soumettre&nbsp;?
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
                      30 minutes, sans engagement. On regarde vos process, on vous répond franchement.
                    </p>
                    <a
                      href={SITE.calUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-neutral-800"
                    >
                      Réserver un appel <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {/* ── À lire ensuite ── */}
        {related.length > 0 && (
          <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-20 md:px-10 md:py-24">
            <div className="mx-auto max-w-[1240px]">
              <p className="mono mb-3.5 text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">À lire ensuite</p>
              <h2
                className="mb-10 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Sur le même sujet.
              </h2>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}

        <PageCTA
          title={"Et si on regardait votre cas ?"}
          desc="Un premier échange de 30 minutes, sans engagement : on regarde vos process réels et on vous dit honnêtement si un outil sur mesure vaut le coup chez vous."
        />
      </main>

      <Footer />
    </>
  );
}
