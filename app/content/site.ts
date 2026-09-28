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
  vsl: VslConfig;
  foundingYear: number;
}

/** La vidéo de vente du hero. Tant que `sources` est vide, le hero affiche
 *  l'illustration animée à la place — rien ne casse. */
interface VslConfig {
  /** Les encodages, du plus moderne au plus compatible : le navigateur prend
   *  le premier qu'il sait lire. L'AV1 passe partout sauf sur les vieux
   *  Safari, qui retombent sur le H.264 — d'où les deux. */
  sources: { src: string; type: string }[];
  /** Image d'aperçu 16/9. Une frame nette, sans sous-titre incrusté : tout
   *  le texte de la vignette est posé par-dessus en CSS, pas dans le JPEG —
   *  net à toutes les tailles, et modifiable sans réexporter d'image. */
  poster: string;
  /** L'accroche de la vignette. Une promesse concrète tirée de la vidéo
   *  vaut mieux qu'un « Découvrez NeX » : on clique pour la vérifier. */
  hook: string;
  /** Qui parle. Un visage avec un nom rassure avant même la lecture. */
  speaker: string;
  /** Sous-titres .vtt. Beaucoup ouvriront la page sans le son : sans piste,
   *  ceux-là repartent sans avoir rien compris. */
  captions: string;
  /** Durée affichée sur le bouton, ex. "2 min". La promesse de durée fait
   *  monter le taux de clic — on sait dans quoi on s'engage. */
  duration: string;
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
  phone: "+41 79 466 02 78",
  email: "hello@ne-x.ch",

  // — Profils externes (champ sameAs du schema : consolide le signal local) —
  // L'URL stable de la fiche (son identifiant kgmid), pas le lien « Partager »
  // share.google/… : celui-ci n'est qu'une redirection qui peut changer.
  googleBusinessUrl: "https://www.google.com/search?kgmid=/g/11zgw6qmjg",
  linkedinUrl: "https://www.linkedin.com/company/agence-nex/",

  // — Conversion —
  calUrl: "https://cal.com/agencesolve/reservez-votre-audit-offert?overlayCalendar=true",
  vsl: {
    sources: [
      { src: "/vsl/nex-vsl.webm", type: 'video/webm; codecs="av01.0.08M.08"' },
      { src: "/vsl/nex-vsl.mp4", type: "video/mp4" },
    ],
    poster: "/vsl/nex-vsl-cover.jpg",
    hook: "2 h de rapport client. Aujourd’hui, 30 secondes.",
    speaker: "Lucas · Co-fondateur NeX",
    // Les sous-titres sont déjà incrustés dans l'image ; une piste .vtt
    // resterait utile aux lecteurs d'écran et aux moteurs. TODO si besoin.
    captions: "",
    duration: "2 min",
  },

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
