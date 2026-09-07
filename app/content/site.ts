/**
 * Source unique de vérité pour l'identité de NeX.
 *
 * ⚠️ Les champs marqués TODO alimentent le SEO local (schema LocalBusiness,
 * pages villes, footer, mentions légales). Tant qu'ils sont vides, Google ne
 * peut pas rattacher le site à la fiche Google Business — c'est le signal
 * n°1 du référencement local. Voir CONTENU-A-COMPLETER.md
 */
interface SiteConfig {
  url: string;
  name: string;
  legalName: string;
  tagline: string;
  street: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
  phone: string;
  email: string;
  googleBusinessUrl: string;
  linkedinUrl: string;
  calUrl: string;
  /** URL de la VSL. Vide = le hero affiche l'illustration animée à la place. */
  vslUrl: string;
  foundingYear: number;
}

export const SITE: SiteConfig = {
  url: "https://ne-x.ch",
  name: "NeX",
  legalName: "Scale X Sàrl",
  tagline: "Logiciels métier sur mesure pour les PME de Suisse romande",

  // — Coordonnées (NAP : Name, Address, Phone — doivent être STRICTEMENT
  //   identiques ici, sur la fiche Google Business et sur tout annuaire) —
  street: "Route du Châtelard 13",
  postalCode: "1530",
  city: "Payerne",
  region: "Vaud",
  country: "CH",
  phone: "", // TODO — format international, ex. "+41 26 000 00 00"
  email: "hello@ne-x.ch",

  // — Profils externes (champ sameAs du schema : consolide le signal local) —
  googleBusinessUrl: "", // TODO — lien "Partager" de ta fiche Google Business
  linkedinUrl: "", // TODO — page entreprise LinkedIn

  // — Conversion —
  calUrl: "https://cal.com/agencesolve/reservez-votre-audit-offert?overlayCalendar=true",
  vslUrl: "", // TODO — dès qu'elle existe, le lecteur remplace l'illustration

  foundingYear: 2024, // TODO — vérifier l'année de création de Scale X Sàrl
};

/** Adresse formatée sur une ligne, pour le footer et les mentions légales. */
export function formatAddress(): string {
  return [SITE.street, `${SITE.postalCode} ${SITE.city}`, "Suisse"]
    .filter(Boolean)
    .join(" · ");
}

/** Numéro nettoyé pour un href tel:. Renvoie null si non renseigné. */
export function telHref(): string | null {
  if (!SITE.phone) return null;
  return `tel:${SITE.phone.replace(/[^\d+]/g, "")}`;
}
