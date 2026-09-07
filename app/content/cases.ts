/**
 * Études de cas. Alimente la section home, la page /realisations et une page
 * dédiée par client (/realisations/[slug]) — chacune est une URL indexable
 * de plus qui cible des requêtes métier précises.
 *
 * ⚠️ Les champs `quote` sont volontairement à null : un témoignage doit venir
 * du client, jamais être écrit à sa place. Demande une phrase par téléphone,
 * c'est le contenu qui rassure le plus un prospect appelé à froid.
 * Les `metrics` reprennent les gains déjà annoncés sur le site — vérifie-les
 * avant mise en ligne, un chiffre faux se retourne contre toi.
 */
export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseQuote {
  text: string;
  author: string;
  role: string;
}

export interface CaseStudy {
  slug: string;
  /** false = brouillon : masqué partout tant que le contenu manque. */
  published: boolean;
  client: string;
  logo: string;
  type: string;
  sector: string;
  /** Résumé d'une ligne, utilisé en carte et en meta description. */
  summary: string;
  context: string;
  problem: string;
  solution: string;
  delivered: string[];
  metrics: CaseMetric[];
  /** Le contraste, paire par paire. C'est ce que la page métier ne fait pas. */
  beforeAfter: { before: string; after: string }[];
  /** Métiers dont le problème de fond est le même — le maillage qui fait sens. */
  relatedMetiers: string[];
  gains: string[];
  /** Capture d'écran ou photo du projet. null = placeholder. */
  photo: string | null;
  photoAlt: string;
  quote: CaseQuote | null;
}

export const CASES: CaseStudy[] = [
  {
    slug: "welcomize",
    published: true,
    client: "Welcomize",
    logo: "/logos/welcomize.png",
    type: "Portail client",
    sector: "Services",
    summary:
      "Un portail client sur mesure qui remplace les échanges dispersés entre emails, WhatsApp et fichiers partagés.",
    context:
      "Welcomize suivait ses projets clients à travers trois canaux différents. Chaque demande de point d'avancement déclenchait une recherche manuelle dans les emails, puis un aller-retour pour retrouver le bon document.",
    problem:
      "Échanges éparpillés entre emails, WhatsApp et fichiers partagés. Aucune visibilité client sur l'avancement des projets.",
    solution:
      "Portail client sur mesure avec suivi en temps réel, messagerie intégrée et accès aux documents. Chaque client dispose de son espace : il voit où en est son projet sans avoir à demander.",
    delivered: [
      "Espace client avec suivi d'avancement en temps réel",
      "Messagerie intégrée, historique conservé par projet",
      "Bibliothèque de documents versionnés",
      "Notifications automatiques à chaque étape franchie",
    ],
    beforeAfter: [
      { before: "Le client appelle pour savoir où en est son projet", after: "Il ouvre son espace et voit l'avancement en temps réel" },
      { before: "L'historique se cherche dans trois boîtes mail", after: "Chaque échange est rattaché à son projet" },
      { before: "Le bon document se retrouve à la main, ou pas", after: "Une bibliothèque versionnée, accessible des deux côtés" },
    ],
    relatedMetiers: ["regie-immobiliere"],
    metrics: [],
    gains: [
      "Visibilité totale pour les clients",
      "Moins de relances email",
      "Image de marque renforcée",
    ],
    photo: null, // TODO — public/realisations/welcomize.jpg (capture du portail)
    photoAlt: "Le portail client Welcomize développé par NeX",
    quote: null, // TODO — une phrase du client + nom + fonction
  },
  {
    slug: "nyl",
    published: true,
    client: "NYL",
    logo: "/logos/nyl.png",
    type: "Outil interne",
    sector: "Services",
    summary:
      "Une application interne qui remplace la gestion sur Excel et supprime la double saisie quotidienne.",
    context:
      "La gestion des dossiers reposait sur des classeurs Excel partagés et des emails. Les informations existaient en plusieurs versions, et personne ne savait laquelle faisait foi.",
    problem:
      "Gestion sur Excel et emails. Informations dispersées, risques d'erreurs et perte de temps quotidienne.",
    solution:
      "Application interne centralisée avec gestion des dossiers, tableau de bord et automatisation des tâches récurrentes. Une seule base, mise à jour en direct par toute l'équipe.",
    delivered: [
      "Gestion centralisée des dossiers, une seule source de vérité",
      "Tableau de bord de pilotage pour la direction",
      "Automatisation des tâches récurrentes et des relances",
      "Historique complet des modifications",
    ],
    beforeAfter: [
      { before: "Les pièces arrivent par email et se ressaisissent à la main", after: "Elles passent par l'OCR et arrivent pré-écrites, à valider" },
      { before: "Les échéances TVA et AVS se tiennent dans un tableur", after: "Chaque échéance remonte seule, avec ses mandats concernés" },
      { before: "Les relances de pièces manquantes dépendent de quelqu'un qui y pense", after: "Elles partent seules, et rendent compte de ce qu'elles ont fait" },
      { before: "Le pilotage du cabinet se reconstruit à la main", after: "Dossiers, bouclements et pièces manquantes se lisent en une ligne" },
      { before: "La rentabilité d'un mandat se découvre en fin d'exercice", after: "Le réalisé se compare au planifié, semaine après semaine" },
    ],
    relatedMetiers: ["regie-immobiliere"],
    metrics: [{ value: "÷2", label: "temps de traitement" }],
    gains: [
      "Temps de traitement divisé par deux",
      "Zéro double saisie",
      "Données toujours à jour",
    ],
    photo: null, // TODO — public/realisations/nyl.jpg
    photoAlt: "L'application interne NYL développée par NeX",
    quote: null, // TODO
  },
  {
    slug: "pod-x",
    published: true,
    client: "Pod X",
    logo: "/logos/podx.png",
    type: "Plateforme métier",
    sector: "Production",
    summary:
      "Une plateforme métier unique qui remplace plusieurs outils déconnectés et fluidifie la coordination entre équipes.",
    context:
      "Plusieurs équipes travaillaient sur des outils différents, sans passerelle entre eux. La coordination se faisait par recoupement manuel, avec les décalages que cela implique.",
    problem:
      "Processus métier complexes gérés avec plusieurs outils déconnectés. Coordination difficile entre les équipes.",
    solution:
      "Plateforme centralisée, adaptée à leur flux de travail, avec intégrations et reporting intégré. Les équipes travaillent au même endroit, sur les mêmes données.",
    delivered: [
      "Plateforme unique calquée sur le flux de travail réel",
      "Intégrations avec les outils déjà en place",
      "Reporting intégré et pilotage en temps réel",
      "Gestion des rôles et des permissions par équipe",
    ],
    beforeAfter: [
      { before: "Plusieurs outils déconnectés à faire coïncider", after: "Une plateforme calquée sur le flux de travail réel" },
      { before: "La coordination entre équipes passe par des allers-retours", after: "Chacun voit l'état d'avancement sans demander" },
      { before: "Le reporting se fabrique après coup", after: "Il se lit en temps réel, à même l'outil" },
    ],
    relatedMetiers: ["installateur-chauffage-sanitaire-electricite"],
    metrics: [],
    gains: [
      "Une seule source de vérité",
      "Coordination simplifiée",
      "Pilotage en temps réel",
    ],
    photo: null, // TODO — public/realisations/pod-x.jpg
    photoAlt: "La plateforme métier Pod X développée par NeX",
    quote: null, // TODO
  },
  {
    slug: "c-carre",
    published: true,
    client: "C Carré",
    logo: "/logos/c-carre.svg",
    type: "Solution spécifique",
    sector: "Services",
    summary:
      "Une solution développée de zéro pour des besoins métier qu'aucun logiciel du marché ne couvrait.",
    context:
      "C Carré avait déjà tenté d'adapter des outils existants. Chaque adaptation coûtait cher et laissait le problème de fond intact : le logiciel ne correspondait pas au métier.",
    problem:
      "Besoins très spécifiques qu'aucun outil du marché ne couvrait. Adaptations coûteuses sans résultat satisfaisant.",
    solution:
      "Solution développée de zéro, calquée exactement sur les processus internes et les contraintes métier. Pas de contournement, pas de fonctionnalité inutile.",
    delivered: [
      "Développement sur mesure intégral, sans socle générique",
      "Modélisation fidèle des règles métier spécifiques",
      "Interface pensée avec les utilisateurs finaux",
      "Documentation et formation des équipes",
    ],
    beforeAfter: [
      { before: "Aucun logiciel du marché ne couvrait la règle métier", after: "L'outil modélise la règle telle qu'elle existe" },
      { before: "Des contournements installés depuis des années", after: "Le contournement disparaît avec sa cause" },
      { before: "Une interface pensée pour un autre usage", after: "Des écrans conçus avec les utilisateurs finaux" },
    ],
    relatedMetiers: [],
    metrics: [],
    gains: [
      "Outil parfaitement adapté",
      "Adoption immédiate",
      "ROI mesurable dès le premier mois",
    ],
    photo: null, // TODO — public/realisations/c-carre.jpg
    photoAlt: "La solution sur mesure C Carré développée par NeX",
    quote: null, // TODO
  },
  {
    slug: "solve",
    published: false, // TODO — passer à true une fois type + summary remplis
    client: "Solve",
    logo: "/logos/solve.svg",
    type: "", // TODO — deux ou trois mots, ex. « Portail client »
    sector: "Services",
    summary: "", // TODO — une phrase : ce que l'outil remplace, et pour qui
    context: "",
    problem: "",
    solution: "",
    delivered: [],
    beforeAfter: [], // TODO — trois paires « avant / après », c'est ce qui porte la page
    relatedMetiers: [],
    metrics: [],
    gains: [],
    photo: null,
    photoAlt: "L'outil sur mesure développé pour Solve",
    quote: null,
  },
  {
    slug: "1pecc",
    published: true,
    client: "1pecc",
    logo: "/logos/1pecc.png",
    type: "Gestion d'exploitation",
    sector: "Propreté",
    summary:
      "Le planning des équipes, le timbrage sur site, le reporting de mission, la rentabilité et la facturation réunis dans un seul outil.",
    context:
      "1pecc est une entreprise de nettoyage qui intervient sur de nombreux sites, avec des équipes mobiles et des contrats aux périmètres très différents. Chaque intervention a son planning, ses heures réelles et son périmètre facturable.",
    problem:
      "Planifier, pointer, rendre compte, mesurer la rentabilité et facturer sont cinq opérations sur la même réalité. Tant qu'elles vivent dans des outils séparés, la même information doit être reprise à chaque étape — et la rentabilité d'un contrat ne se lit qu'une fois le mois clôturé.",
    solution:
      "Une plateforme unique où la mission se planifie, se pointe sur site, se documente, se mesure et se facture. La même donnée traverse toute la chaîne : ce qui est pointé alimente le reporting, le reporting alimente la rentabilité, et la rentabilité alimente la facture.",
    delivered: [
      "Planning des équipes et affectation des missions par site",
      "Timbrage sur site : les heures réelles rattachées à la mission",
      "Reporting de mission documenté directement par les équipes",
      "Suivi de rentabilité par contrat et par site",
      "Facturation alimentée par les heures et les missions réellement réalisées",
    ],
    beforeAfter: [
      { before: "Le planning des tournées vit dans un tableur partagé", after: "Équipes, sites et fréquences au même endroit" },
      { before: "Les heures remontent par SMS, par photo, en fin de mois", after: "Le collaborateur pointe sur site, l'heure est rattachée à la mission" },
      { before: "La mission se raconte de mémoire", after: "Elle se documente sur place, preuve à l'appui" },
      { before: "La rentabilité se découvre à la facturation", after: "Elle se lit contrat par contrat, en cours de mois" },
      { before: "La facture se reconstruit à la main", after: "Elle se nourrit des heures réellement pointées" },
    ],
    relatedMetiers: ["installateur-chauffage-sanitaire-electricite", "regie-immobiliere"],
    metrics: [], // TODO — un chiffre solide aurait ici plus d'impact que tout le reste
    gains: [
      "Une seule saisie, du terrain à la facture",
      "La rentabilité d'un contrat se lit sans attendre la clôture",
      "Les heures facturées correspondent aux heures pointées",
    ],
    photo: null, // TODO — public/realisations/1pecc.jpg (capture de la plateforme)
    photoAlt: "La plateforme de gestion d'exploitation développée pour 1pecc",
    quote: null,
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}


/** Les réalisations réellement publiables — la seule liste que les pages doivent lire. */
export const PUBLISHED_CASES: CaseStudy[] = CASES.filter((c) => c.published);

/**
 * Une page par sujet.
 *
 * Quand un métier est déjà équipé, c'est la page métier qui raconte le cas :
 * elle porte le mot-clé que les gens cherchent réellement (« logiciel pour
 * entreprise de nettoyage »), là où le nom du client n'est cherché par
 * personne. La page /realisations/[slug] correspondante n'existe plus et
 * redirige — voir next.config.ts.
 *
 * Les réalisations dont le métier n'est pas encore ciblé gardent leur page.
 */
export const CASE_TO_METIER: Record<string, string> = {
  "1pecc": "entreprise-de-nettoyage",
  nyl: "fiduciaire",
};

/** L'URL canonique d'une réalisation : sa page métier si elle en a une. */
export function caseHref(slug: string): string {
  const metier = CASE_TO_METIER[slug];
  return metier ? `/metiers/${metier}` : `/realisations/${slug}`;
}

/** Les réalisations qui gardent une page propre (les autres vivent dans leur métier). */
export const STANDALONE_CASES: CaseStudy[] = PUBLISHED_CASES.filter((c) => !CASE_TO_METIER[c.slug]);

/**
 * Ordre d'affichage sur la home. Welcomize en est volontairement absent ;
 * Solve et 1pecc apparaîtront dès que leur contenu sera renseigné.
 */
export const LANDING_CASE_SLUGS = ["solve", "1pecc", "pod-x", "nyl", "c-carre"] as const;
