/**
 * Pages locales. ⚠️ Attention : des pages villes quasi identiques entre elles
 * sont traitées par Google comme des « doorway pages » et peuvent être
 * pénalisées. Chaque entrée ci-dessous a donc un contexte économique propre,
 * et le gabarit varie selon les données présentes. Si tu ajoutes une ville,
 * écris un vrai paragraphe local — ne duplique pas un texte existant.
 */
export interface City {
  slug: string;
  name: string;
  canton: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Contexte économique local, propre à la ville. */
  intro: string;
  /** Réalité du terrain observée dans ce bassin. */
  context: string;
  /** Comment NeX intervient concrètement ici. */
  presence: string;
  /** Services les plus demandés localement — varie l'angle d'une page à l'autre. */
  focusServices: string[];
}

export const CITIES: City[] = [
  {
    slug: "payerne",
    name: "Payerne",
    canton: "Vaud",
    metaTitle: "Logiciel sur mesure à Payerne · NeX",
    metaDescription:
      "NeX développe des logiciels métier sur mesure à Payerne et dans toute la Broye. Rencontrons-nous dans nos bureaux ou chez vous. CRM, ERP, automatisations, IA.",
    h1: "Développement de logiciels sur mesure à Payerne",
    intro:
      "Payerne est notre point d'ancrage. C'est ici que se trouvent nos bureaux, et c'est dans la Broye que nous avons appris à travailler avec des PME où chacun porte plusieurs casquettes.",
    context:
      "Le tissu économique de la Broye est fait d'entreprises familiales, industrielles et agroalimentaires, souvent structurées autour de quelques personnes clés. Les outils y sont hérités plutôt que choisis : un Excel devenu critique, un logiciel acheté il y a dix ans, des habitudes que personne n'a jamais écrites. C'est un terrain où le sur-mesure change concrètement le quotidien, parce qu'aucun logiciel générique n'a été pensé pour ces organisations.",
    presence:
      "Étant sur place, nous pouvons passer dans vos locaux pour observer votre activité en conditions réelles — c'est souvent la première heure la plus utile d'un projet. Vous pouvez aussi venir dans nos bureaux, ce que nous préférons pour un premier échange.",
    focusServices: ["application-metier", "automatisation-processus", "erp-sur-mesure"],
  },
  {
    slug: "lausanne",
    name: "Lausanne",
    canton: "Vaud",
    metaTitle: "Développement de logiciel sur mesure à Lausanne · NeX",
    metaDescription:
      "Agence de développement de logiciels métier sur mesure pour les PME lausannoises. CRM, ERP, portails clients et automatisations. Interlocuteur unique, basé dans le canton de Vaud.",
    h1: "Développement de logiciels sur mesure à Lausanne",
    intro:
      "Lausanne concentre une densité rare de PME de services : conseil, immobilier, santé, formation, associations et fondations. Des structures qui vendent du temps et de l'expertise, et pour qui chaque heure passée à recopier des données est une heure non facturée.",
    context:
      "Dans ces entreprises, le logiciel n'est pas le cœur de métier, mais il en conditionne la rentabilité. Le schéma que nous rencontrons le plus souvent est un empilement d'abonnements SaaS achetés au fil des années, qui ne communiquent pas entre eux : un outil pour les clients, un autre pour les projets, un troisième pour la facturation, et des exports manuels pour tout relier.",
    presence:
      "Nous intervenons régulièrement sur l'arc lémanique. Les ateliers de cadrage se font chez vous, le suivi de projet à distance — ce rythme fonctionne bien pour des équipes lausannoises déjà très sollicitées.",
    focusServices: ["crm-sur-mesure", "portail-client", "automatisation-processus"],
  },
  {
    slug: "geneve",
    name: "Genève",
    canton: "Genève",
    metaTitle: "Développement de logiciel sur mesure à Genève · NeX",
    metaDescription:
      "Logiciels métier sur mesure pour PME genevoises : négoce, finance, services, organisations internationales. Traçabilité, confidentialité et intégration à vos outils existants.",
    h1: "Développement de logiciels sur mesure à Genève",
    intro:
      "Le tissu genevois — négoce, finance, services professionnels, organisations internationales — travaille avec des exigences de traçabilité et de confidentialité plus élevées que la moyenne romande. Cela change la manière de concevoir un outil métier.",
    context:
      "Ici, la question n'est presque jamais « comment aller plus vite », mais « comment prouver ce qui a été fait, par qui et quand ». Les projets genevois que nous menons accordent une place centrale à l'historisation des actions, à la gestion fine des droits d'accès et au choix du lieu d'hébergement des données.",
    presence:
      "Nous nous déplaçons à Genève pour les ateliers de conception et les points d'étape importants. Le reste du suivi se fait à distance, avec un interlocuteur unique qui connaît votre dossier de bout en bout.",
    focusServices: ["portail-client", "application-metier", "agents-ia"],
  },
  {
    slug: "fribourg",
    name: "Fribourg",
    canton: "Fribourg",
    metaTitle: "Développement de logiciel sur mesure à Fribourg · NeX",
    metaDescription:
      "Développement de logiciels métier sur mesure pour les PME fribourgeoises : industrie, agroalimentaire, construction. ERP, applications internes et automatisations.",
    h1: "Développement de logiciels sur mesure à Fribourg",
    intro:
      "Fribourg est le canton voisin du nôtre, et celui où nous nous rendons le plus souvent après Vaud. Son économie mêle industrie, agroalimentaire, construction et un secteur de la recherche appliquée en croissance.",
    context:
      "Les entreprises industrielles fribourgeoises partagent un point commun : leurs processus de production sont précis et bien maîtrisés, mais l'informatique qui les accompagne a rarement suivi. Suivi de production sur papier ou sur Excel, stocks estimés de mémoire, planning affiché au mur. Ce sont des situations où un outil sur mesure produit un gain immédiat et facile à mesurer.",
    presence:
      "La proximité change la nature de la relation : nous passons volontiers pour une demi-journée d'observation en atelier, ce qui donne un cadrage bien plus juste qu'une réunion en visioconférence.",
    focusServices: ["erp-sur-mesure", "application-metier", "automatisation-processus"],
  },
  {
    slug: "neuchatel",
    name: "Neuchâtel",
    canton: "Neuchâtel",
    metaTitle: "Développement de logiciel sur mesure à Neuchâtel · NeX",
    metaDescription:
      "Logiciels métier sur mesure pour les PME neuchâteloises : microtechnique, horlogerie, sous-traitance de précision. Traçabilité, suivi de production, contrôle qualité.",
    h1: "Développement de logiciels sur mesure à Neuchâtel",
    intro:
      "Neuchâtel vit de la précision : microtechnique, horlogerie, sous-traitance industrielle. Des métiers où la tolérance se mesure au micron, mais où le suivi des séries se fait encore fréquemment sur des classeurs partagés.",
    context:
      "Les exigences de traçabilité y sont fortes, souvent imposées par les donneurs d'ordre. Reconstituer l'historique d'une série ou d'un lot demande alors de recouper plusieurs sources, sans garantie d'exhaustivité. Un outil métier bien conçu transforme cette reconstitution en simple consultation.",
    presence:
      "Nous accompagnons des PME neuchâteloises sur des projets de suivi de production et de contrôle qualité, avec des déplacements calés sur les étapes qui les justifient.",
    focusServices: ["application-metier", "erp-sur-mesure", "automatisation-processus"],
  },
  {
    slug: "yverdon-les-bains",
    name: "Yverdon-les-Bains",
    canton: "Vaud",
    metaTitle: "Développement de logiciel sur mesure à Yverdon-les-Bains · NeX",
    metaDescription:
      "Développement de logiciels métier sur mesure pour les PME du Nord vaudois. Applications internes, automatisations et intégration d'IA. Une agence basée dans le canton.",
    h1: "Développement de logiciels sur mesure à Yverdon-les-Bains",
    intro:
      "Le Nord vaudois combine un tissu industriel installé et un écosystème technologique actif autour d'Y-Parc et de la HEIG-VD. Deux mondes qui se croisent peu, alors qu'ils ont les mêmes besoins d'outillage.",
    context:
      "Nous y rencontrons deux profils : des PME industrielles dont les processus n'ont jamais été numérisés, et de jeunes structures qui ont grandi trop vite sur des outils improvisés. Dans les deux cas, le problème est le même — l'organisation a évolué, l'outillage non.",
    presence:
      "Yverdon fait partie de notre zone de déplacement courante. Les ateliers sur site sont simples à organiser, ce qui raccourcit sensiblement la phase de cadrage.",
    focusServices: ["application-metier", "automatisation-processus", "agents-ia"],
  },
  {
    slug: "sion",
    name: "Sion",
    canton: "Valais",
    metaTitle: "Développement de logiciel sur mesure à Sion et en Valais · NeX",
    metaDescription:
      "Logiciels métier sur mesure pour les PME valaisannes : viticulture, tourisme, énergie, construction. Outils adaptés aux activités saisonnières et multi-sites.",
    h1: "Développement de logiciels sur mesure à Sion et en Valais",
    intro:
      "L'économie valaisanne a une caractéristique que l'on retrouve peu ailleurs en Suisse romande : elle est fortement saisonnière et souvent répartie sur plusieurs sites. Tourisme, viticulture, énergie, construction — les pics d'activité sont concentrés, et les équipes rarement au même endroit.",
    context:
      "Un logiciel standard gère mal cette réalité. Il suppose des effectifs stables et un lieu de travail unique. Les PME valaisannes compensent avec des tableaux parallèles par site et par saison, qu'il faut ensuite consolider à la main. C'est exactement le type de contrainte qu'un outil sur mesure absorbe sans difficulté.",
    presence:
      "Le Valais se travaille bien en mode hybride : un déplacement pour le cadrage initial et les jalons structurants, puis un suivi à distance qui respecte vos périodes de forte activité.",
    focusServices: ["application-metier", "automatisation-processus", "portail-client"],
  },
  {
    slug: "delemont",
    name: "Delémont",
    canton: "Jura",
    metaTitle: "Développement de logiciel sur mesure à Delémont et dans le Jura · NeX",
    metaDescription:
      "Développement de logiciels métier sur mesure pour les PME jurassiennes : mécanique de précision, sous-traitance horlogère, industrie. Suivi de production et traçabilité.",
    h1: "Développement de logiciels sur mesure à Delémont et dans le Jura",
    intro:
      "Le Jura est un canton de sous-traitance industrielle et de mécanique de précision. Des entreprises très compétentes techniquement, qui travaillent pour des donneurs d'ordre exigeants, et dont le système d'information est souvent le maillon le moins soigné.",
    context:
      "La pression sur les délais et la traçabilité vient de l'aval : ce sont les clients qui imposent le niveau de preuve. Beaucoup d'ateliers jurassiens y répondent par de la rigueur humaine plutôt que par de l'outillage, ce qui fonctionne — jusqu'au jour où la personne qui tient le système est absente.",
    presence:
      "Nous travaillons avec des PME jurassiennes sur des projets de suivi d'atelier et de traçabilité, avec des déplacements groupés pour limiter les allers-retours.",
    focusServices: ["application-metier", "erp-sur-mesure", "automatisation-processus"],
  },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
