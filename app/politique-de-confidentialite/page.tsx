import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { SITE, formatAddress } from "../content/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Comment ${SITE.name} collecte, utilise et protège vos données personnelles, conformément à la loi fédérale sur la protection des données (LPD).`,
  alternates: { canonical: "/politique-de-confidentialite" },
};

const trail = [
  { name: "Accueil", path: "/" },
  { name: "Politique de confidentialité", path: "/politique-de-confidentialite" },
];

export default function Confidentialite() {
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
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-sm text-neutral-400">
            Conforme à la loi fédérale sur la protection des données (LPD) révisée, en vigueur depuis le
            1<sup>er</sup> septembre 2023.
          </p>

          <div className="mt-12 space-y-10 text-sm leading-relaxed text-neutral-600">
            <section>
              <h2 className="mb-3 text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Responsable du traitement
              </h2>
              <p>
                {SITE.legalName} ({SITE.name})
                <br />
                {formatAddress()}
                {SITE.email && (
                  <>
                    <br />
                    Email : {SITE.email}
                  </>
                )}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Données que nous collectons
              </h2>
              <p className="mb-3">
                Nous ne collectons que les données que vous nous transmettez volontairement :
              </p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>
                  <strong className="text-[#0a0a0a]">Via l&apos;outil de diagnostic</strong> : nom,
                  entreprise, fonction, adresse email, numéro de téléphone, ainsi que les réponses que
                  vous fournissez sur votre organisation (effectif, secteur, outils utilisés).
                </li>
                <li>
                  <strong className="text-[#0a0a0a]">Via la prise de rendez-vous</strong> : les données
                  que vous saisissez dans notre outil de réservation, hébergé par un prestataire tiers.
                </li>
              </ul>
              <p className="mt-3">
                Nous ne collectons aucune donnée sensible au sens de la LPD, et nous n&apos;achetons ni ne
                revendons de fichiers de contacts.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Finalité et base légale
              </h2>
              <p>
                Ces données servent exclusivement à vous recontacter au sujet de votre demande, à préparer
                notre échange et à établir une proposition. Le traitement repose sur votre consentement,
                donné au moment où vous remplissez le formulaire, et sur notre intérêt légitime à répondre
                à une sollicitation commerciale. Vos données ne sont utilisées à aucune autre fin.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Destinataires et sous-traitants
              </h2>
              <p className="mb-3">
                Vos données ne sont jamais vendues ni transmises à des tiers à des fins commerciales.
                Elles transitent par les prestataires techniques strictement nécessaires à notre activité :
              </p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>notre hébergeur, pour la mise à disposition du site ;</li>
                <li>notre service d&apos;envoi d&apos;emails, pour l&apos;acheminement des demandes ;</li>
                <li>notre outil de prise de rendez-vous, pour la planification des appels.</li>
              </ul>
              <p className="mt-3">
                {/* TODO — nommer explicitement les prestataires (hébergeur, Resend,
                    Cal.com) et préciser le pays d'hébergement. La LPD exige que le
                    transfert de données à l'étranger soit transparent. */}
                <span className="text-neutral-400">
                  À compléter : nom de chaque prestataire et pays d&apos;hébergement des données.
                </span>
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Durée de conservation
              </h2>
              <p>
                Les données liées à une demande sont conservées le temps nécessaire au traitement de
                celle-ci, puis pendant la durée de la relation commerciale. En l&apos;absence de suite,
                elles sont supprimées au plus tard deux ans après le dernier contact.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Cookies et mesure d&apos;audience
              </h2>
              {/* TODO — si un outil d'analytics est ajouté (Google Analytics,
                  Plausible…), cette section doit être mise à jour et une bannière
                  de consentement peut devenir nécessaire selon l'outil retenu. */}
              <p>
                Ce site ne dépose aucun cookie publicitaire et n&apos;utilise pas de traceur à des fins de
                profilage. Les polices de caractères sont servies depuis le site lui-même.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Vos droits
              </h2>
              <p>
                Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et
                d&apos;opposition sur vos données, ainsi que du droit de demander la remise ou le
                transfert de celles-ci. Pour l&apos;exercer, écrivez-nous
                {SITE.email ? ` à ${SITE.email}` : " à l'adresse de contact indiquée ci-dessus"}. Nous
                répondons dans un délai de 30 jours. Vous pouvez également saisir le Préposé fédéral à la
                protection des données et à la transparence (PFPDT).
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Sécurité
              </h2>
              <p>
                Le site est servi en HTTPS et l&apos;accès aux données de contact est restreint aux seules
                personnes de {SITE.legalName} qui en ont besoin. Nous appliquons à notre propre
                infrastructure les principes que nous recommandons à nos clients.
              </p>
            </section>

            <p className="border-t border-neutral-100 pt-6 text-neutral-400">
              Une question sur cette politique ?{" "}
              <Link href="/#contact" className="font-semibold text-[#0a0a0a] hover:underline">
                Contactez-nous
              </Link>
              .
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
