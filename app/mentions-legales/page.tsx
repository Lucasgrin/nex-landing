import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { SITE, formatAddress } from "../content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${SITE.url} — ${SITE.legalName}, ${SITE.city}, Suisse.`,
  alternates: { canonical: "/mentions-legales" },
};

const trail = [
  { name: "Accueil", path: "/" },
  { name: "Mentions légales", path: "/mentions-legales" },
];

export default function MentionsLegales() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <article className="mx-auto max-w-3xl px-6 pb-24">
          <Breadcrumbs trail={trail} />
          <h1
            className="text-4xl font-bold tracking-tight text-[#0a0a0a]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Mentions légales
          </h1>

          <div className="mt-12 space-y-10 text-sm leading-relaxed text-neutral-600">
            <section>
              <h2 className="mb-3 text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Éditeur du site
              </h2>
              <p>
                <strong className="text-[#0a0a0a]">{SITE.legalName}</strong>
                <br />
                Marque commerciale : {SITE.name}
                <br />
                {formatAddress()}
                {SITE.phone && (
                  <>
                    <br />
                    Téléphone : {SITE.phone}
                  </>
                )}
                {SITE.email && (
                  <>
                    <br />
                    Email : {SITE.email}
                  </>
                )}
              </p>
              <p className="mt-3 text-neutral-400">
                {/* TODO — reprendre les numéros exacts sur zefix.ch, la recherche
                    officielle du registre du commerce suisse. */}
                Numéro IDE / registre du commerce : à compléter
                <br />
                Numéro de TVA : à compléter (le cas échéant)
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Responsable de la publication
              </h2>
              <p>La direction de {SITE.legalName}.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Hébergement
              </h2>
              {/* TODO — indiquer l'hébergeur réel et son adresse (Vercel Inc.,
                  Infomaniak, etc.) une fois le déploiement en place. */}
              <p className="text-neutral-400">Hébergeur : à compléter (raison sociale et adresse).</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble des contenus de ce site — textes, visuels, logos, code et structure — est
                la propriété de {SITE.legalName}, sauf mention contraire. Les logos des entreprises
                clientes restent la propriété de leurs détenteurs respectifs et sont affichés avec leur
                accord. Toute reproduction ou représentation, totale ou partielle, sans autorisation
                écrite préalable est interdite.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Responsabilité
              </h2>
              <p>
                {SITE.legalName} met tout en œuvre pour assurer l&apos;exactitude des informations
                publiées sur ce site, sans pouvoir en garantir l&apos;exhaustivité ni l&apos;actualité
                permanente. Les informations présentées à titre indicatif — notamment les ordres de
                grandeur de durée, de budget ou les estimations issues de l&apos;outil de diagnostic — ne
                constituent pas une offre contractuelle.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Droit applicable
              </h2>
              <p>
                Le présent site est soumis au droit suisse. Le for juridique est celui du siège de{" "}
                {SITE.legalName}, sous réserve de dispositions légales impératives contraires.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
