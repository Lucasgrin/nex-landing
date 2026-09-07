import { SITE } from "../content/site";

/**
 * Constructeurs de données structurées.
 *
 * L'entité principale porte un @id stable : toutes les autres pages y font
 * référence au lieu de redéclarer l'entreprise. C'est ce qui permet à Google
 * de comprendre que /services/crm-sur-mesure et /logiciel-sur-mesure/lausanne
 * parlent bien de la même organisation.
 */
export const ORG_ID = `${SITE.url}/#organization`;

/** Champ sameAs : ne garde que les profils réellement renseignés. */
function sameAs(): string[] {
  return [SITE.googleBusinessUrl, SITE.linkedinUrl].filter(Boolean);
}

export function organizationJsonLd() {
  const links = sameAs();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/apple-icon.png`,
    image: `${SITE.url}/opengraph-image`,
    description: SITE.tagline,
    foundingDate: String(SITE.foundingYear),
    address: {
      "@type": "PostalAddress",
      // streetAddress est omis tant qu'il n'est pas renseigné : une adresse
      // partielle vaut mieux qu'une adresse fausse pour le pack local.
      ...(SITE.street ? { streetAddress: SITE.street } : {}),
      postalCode: SITE.postalCode,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    ...(SITE.email ? { email: SITE.email } : {}),
    ...(links.length ? { sameAs: links } : {}),
    areaServed: [
      "Vaud",
      "Genève",
      "Fribourg",
      "Neuchâtel",
      "Valais",
      "Jura",
      "Suisse romande",
    ].map((name) => ({ "@type": "AdministrativeArea", name })),
    knowsLanguage: "fr",
    priceRange: "$$",
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE.url}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Suisse romande" },
    serviceType: name,
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Rend un bloc <script type="application/ld+json"> sérialisé. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
