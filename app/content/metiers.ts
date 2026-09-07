/**
 * Pages métier — le troisième axe du maillage, après « quoi » (/services) et
 * « où » (/logiciel-sur-mesure). Celui-ci répond à « pour qui ».
 *
 * ⚠️ Même avertissement que pour les villes, en plus sévère : quatre pages
 * métier issues du même gabarit avec le mot-clé permuté sont des doorway
 * pages, et depuis les mises à jour « helpful content » de Google elles
 * tirent tout le domaine vers le bas — pas seulement elles-mêmes.
 *
 * La barre à tenir : chaque page doit contenir ce que SEUL quelqu'un qui
 * connaît ce métier pourrait écrire. Son vocabulaire réel, les outils qu'il
 * utilise aujourd'hui, ses frictions propres. En dessous, on ne publie pas.
 *
 * `status` sépare le prouvé du projeté, et cette distinction doit rester
 * visible à l'écran. Laisser croire à une expérience qu'on n'a pas, c'est
 * perdre le prospect dès le premier appel — alors qu'une projection assumée
 * est plus persuasive, parce qu'elle est rare.
 */

/** Les six familles d'écrans qu'on retrouve d'un métier à l'autre. */
export type VisualKind =
  | "planning"
  | "pointage"
  | "rentabilite"
  | "portail"
  | "echeances"
  | "dossier";

export interface Metier {
  slug: string;
  /** Nom court, pour la navigation et le maillage interne. */
  name: string;
  /** Comment le métier se nomme lui-même, pour les titres et le fil d'ariane. */
  label: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** « realise » = un client de ce métier existe. « projection » = pas encore. */
  status: "realise" | "projection";
  intro: string;
  /** Le miroir. Dans LEUR vocabulaire — c'est la section qui décide. */
  frictions: string[];
  /** Ce qu'ils utilisent réellement aujourd'hui. Sert la crédibilité et le SEO longue traîne. */
  currentTools: string[];
  /**
   * Trois modules, nommés dans leurs termes, pas dans les nôtres.
   *
   * `kind` choisit l'illustration animée qui tient la place tant qu'il n'y a
   * pas de capture — la page est vivante tout de suite. `visual` la remplace
   * dès qu'une vraie capture existe, sans rien redessiner.
   */
  modules: {
    title: string;
    desc: string;
    kind: VisualKind;
    visual: { src: string; alt: string } | null;
  }[];
  /** Captures supplémentaires, en rail sous la preuve. Vide = section masquée. */
  gallery: { src: string; alt: string; caption: string }[];
  /** La contrainte réglementaire ou métier qu'un généraliste ignore. */
  constraint: string | null;
  faq: { q: string; a: string }[];
  /** Slug d'une réalisation, si le métier en a une. */
  relatedCase: string | null;
  relatedServices: string[];
  /** Emplacement visuel — capture réelle, ou maquette annotée comme telle. */
  visual: { src: string; alt: string } | null;
  /**
   * Ce que montrent réellement les visuels, dit à l'écran.
   * Un dashboard de démonstration aux données fictives n'est pas une capture
   * de production : le taire, c'est laisser croire autre chose.
   */
  visualNote: string | null;
}

export const METIERS: Metier[] = [
  {
    slug: "entreprise-de-nettoyage",
    name: "Nettoyage",
    label: "Entreprises de nettoyage et de conciergerie",
    metaTitle: "Logiciel pour entreprise de nettoyage · NeX",
    metaDescription:
      "Planning des tournées, timbrage sur site, rentabilité par contrat et facturation dans un seul outil. Développé sur mesure pour les entreprises de nettoyage de Suisse romande.",
    h1: "Un logiciel pensé pour les entreprises de nettoyage",
    status: "realise",
    intro:
      "Une entreprise de nettoyage vit sur trois réalités qui ne se parlent jamais : ce qui était prévu, ce qui a réellement été fait sur site, et ce qui finit sur la facture. Tant que ces trois-là vivent dans des outils séparés, quelqu'un recopie — et la marge se découvre après coup.",
    frictions: [
      "Le planning des tournées est un tableur que trois personnes modifient en même temps",
      "Les heures réellement passées sur site remontent par SMS, par photo, ou pas du tout",
      "Un cahier des charges signé, mais aucun moyen de prouver ce qui a été fait ce mois-ci",
      "La rentabilité d'un contrat ne se voit qu'à la facturation, un mois trop tard",
      "Chaque nouveau site oblige à tout ressaisir ailleurs",
    ],
    currentTools: ["Excel", "WhatsApp", "carnets papier", "Bexio"],
    modules: [
      {
        title: "Planning et tournées",
        desc: "Les équipes, les sites et les fréquences au même endroit. Une absence se remplace en trois clics au lieu de dix appels.",
        kind: "planning",
        visual: { src: "/metiers/pecc-planning.jpg", alt: "Les missions du jour : horaires, chantiers, intervenants et statut de chacune" },
      },
      {
        title: "Timbrage sur site",
        desc: "Le collaborateur pointe depuis son téléphone, sur le site. L'heure réelle est rattachée à la mission, pas à une feuille rendue en fin de mois.",
        kind: "pointage",
        visual: null,
      },
      {
        title: "Rentabilité par contrat",
        desc: "Heures pointées face aux heures vendues, contrat par contrat, en cours de mois. Vous voyez le dérapage avant qu'il coûte.",
        kind: "rentabilite",
        visual: { src: "/metiers/pecc-marge.jpg", alt: "Masse salariale et marge brute estimées du mois, en pourcentage du chiffre d'affaires" },
      },
    ],
    constraint:
      "La CCT du nettoyage encadre les heures, les majorations et les temps de déplacement. Un outil qui les ignore produit des décomptes que personne ne peut défendre.",
    faq: [
      {
        q: "Nos équipes ne sont pas à l'aise avec l'informatique. Est-ce réaliste ?",
        a: "C'est justement pourquoi le timbrage se limite à un écran et un bouton. Le reste — la mission, le site, le cahier des charges — est déjà chargé quand le collaborateur ouvre son téléphone. S'il faut une formation de plus de dix minutes pour pointer, l'outil est mal conçu.",
      },
      {
        q: "Nous facturons déjà avec Bexio. Faut-il tout changer ?",
        a: "Non. L'intérêt est justement de garder votre comptabilité là où elle est et d'y envoyer des heures déjà justes. L'outil s'occupe du terrain jusqu'à la ligne de facture, votre fiduciaire garde ses habitudes.",
      },
      {
        q: "Combien de sites faut-il gérer pour que ça vaille le coup ?",
        a: "La bascule se joue moins sur le nombre de sites que sur le nombre de ressaisies. Si quelqu'un chez vous recopie des heures d'un support à un autre toutes les semaines, le calcul est déjà fait. On le vérifie ensemble au premier appel, chiffres en main.",
      },
    ],
    relatedCase: "1pecc",
    relatedServices: ["application-metier", "automatisation-processus", "portail-client"],
    gallery: [
      {
        src: "/metiers/pecc-cockpit.jpg",
        alt: "Les indicateurs du mois : missions en cours, chiffre d'affaires estimé, masse salariale, marge brute, facturé et encaissé",
        caption: "L'état de l'entreprise en une ligne : missions en cours, chiffre d'affaires, masse salariale, marge — et ce qui reste à encaisser.",
      },
      {
        src: "/metiers/pecc-perf.jpg",
        alt: "La performance par chantier : revenu, heures prévues face aux heures réalisées, écart, marge et statut",
        caption: "Chantier par chantier : les heures prévues face aux heures réellement pointées, l'écart, et la marge qui en découle.",
      },
      {
        src: "/metiers/pecc-problemes.jpg",
        alt: "Les problèmes signalés sur le terrain et non encore résolus, avec leur auteur et l'heure du signalement",
        caption: "Ce que le terrain remonte : local verrouillé, matériel manquant. Horodaté, nominatif, et traité depuis le bureau.",
      },
    ],
    visual: null,
    visualNote: "Visuel de démonstration de l'outil : la marque est celle du client, les données affichées sont fictives.",
  },

  {
    slug: "fiduciaire",
    name: "Fiduciaires",
    label: "Fiduciaires et cabinets comptables",
    metaTitle: "Logiciel sur mesure pour fiduciaire · NeX",
    metaDescription:
      "File de traitement des pièces, échéances légales TVA et AVS, rentabilité par mandat. Outil de pilotage sur mesure construit pour une fiduciaire genevoise.",
    h1: "Un outil de pilotage pour votre fiduciaire",
    status: "realise",
    intro:
      "Une fiduciaire ne perd pas son temps sur la comptabilité — elle le perd autour. À courir après des justificatifs, à tenir des échéances dans un tableur, à découvrir en fin d'année quel mandat a coûté plus qu'il n'a rapporté.",
    frictions: [
      "Les pièces arrivent par email, par WhatsApp, en photo, dans le désordre",
      "Chaque bouclement recommence la même chasse aux justificatifs manquants",
      "Les échéances TVA, AVS et IS vivent dans un tableur que quelqu'un tient de tête",
      "Le rapprochement bancaire attend qu'un collaborateur ait le temps de s'y mettre",
      "Le temps passé par mandat est saisi à la fin — quand il est saisi",
      "Impossible de dire, en cours d'année, quel mandat est rentable",
    ],
    currentTools: ["Crésus", "Abacus", "Bexio", "WinBIZ", "Excel", "Outlook"],
    modules: [
      {
        title: "File de traitement des pièces",
        desc: "Les pièces déposées passent par l'OCR, arrivent pré-écrites et n'attendent qu'une validation. Ce qui manque est relancé sans que personne y pense.",
        kind: "portail",
        visual: { src: "/metiers/nyl-file-4.jpg", alt: "La file de traitement des pièces, tâche par tâche, avec les retards visibles" },
      },
      {
        title: "Échéances légales",
        desc: "Décomptes TVA, AVS et LPP, déclarations IS, bouclements : chaque échéance avec les mandats concernés. Ce qui approche remonte tout seul.",
        kind: "echeances",
        visual: { src: "/metiers/nyl-echeances-4.jpg", alt: "Les échéances légales à venir, avec leur statut et les mandats concernés" },
      },
      {
        title: "Heures facturables et rentabilité",
        desc: "Réalisé face au planifié, semaine après semaine, et la marge du mandat en cours d'année. Vous renégociez avant la reconduction, pas après.",
        kind: "rentabilite",
        visual: { src: "/metiers/nyl-heures-4.jpg", alt: "Les heures facturables réalisées comparées au planifié sur douze semaines" },
      },
    ],
    gallery: [
      {
        src: "/metiers/nyl-pilotage-4.jpg",
        alt: "Les indicateurs de pilotage : dossiers actifs, bouclements en cours, pièces manquantes, décomptes TVA à déposer",
        caption: "L'état du cabinet en une ligne : dossiers actifs, bouclements en cours, pièces manquantes, prochains décomptes à déposer.",
      },
      {
        src: "/metiers/nyl-automat-4.jpg",
        alt: "Les automatisations actives et le temps qu'elles font gagner",
        caption: "Les automatisations tournent en fond — relances de pièces, lecture OCR, rappels d'échéance — et rendent compte de ce qu'elles ont fait.",
      },
    ],
    constraint:
      "La conservation des pièces sur dix ans et la LPD imposent des règles d'hébergement et de traçabilité qu'un outil générique traite rarement correctement. C'est un point à cadrer avant d'écrire la première ligne.",
    faq: [
      {
        q: "Nous travaillons déjà sur Crésus ou Abacus. Vous les remplacez ?",
        a: "Non, et ce serait une mauvaise idée. Votre logiciel comptable fait bien son travail. Ce qui manque, c'est tout ce qui vit autour : la collecte des pièces, le suivi des échéances, le temps passé, la rentabilité. On construit cette couche-là et on la connecte à l'existant.",
      },
      {
        q: "Nos clients accepteront-ils de déposer leurs pièces eux-mêmes ?",
        a: "Ils le font déjà — par email, par WhatsApp, en photo. La question n'est pas de leur demander un effort de plus, mais de leur donner un endroit unique plutôt que trois canaux. Quand l'outil leur dit exactement ce qui manque, ils s'en servent.",
      },
      {
        q: "Avez-vous déjà travaillé pour une fiduciaire ?",
        a: "Oui. L'outil de pilotage présenté sur cette page a été construit pour une fiduciaire genevoise qui gérait ses mandats sur Excel et par email. C'est ce qui nous permet de parler de bouclements, d'échéances AVS et de taux de facturabilité plutôt que de « gestion de documents ».",
      },
    ],
    relatedCase: "nyl",
    relatedServices: ["portail-client", "application-metier", "automatisation-processus"],
    visual: null,
    visualNote: "Visuel de démonstration de l'outil : les mandats et les noms affichés sont fictifs.",
  },

  {
    slug: "installateur-chauffage-sanitaire-electricite",
    name: "Installateurs",
    label: "Installateurs — chauffage, sanitaire, électricité",
    metaTitle: "Logiciel métier pour installateur · NeX",
    metaDescription:
      "Planning d'interventions, bons de régie sur mobile, historique par installation. Outils sur mesure pour les installateurs de Suisse romande.",
    h1: "Un logiciel métier pour les installateurs",
    status: "projection",
    intro:
      "Entre le devis, le chantier et la facture, l'information change trois fois de support et perd quelque chose à chaque passage. Ce qui se perd, ce sont des heures travaillées qui ne seront jamais facturées.",
    frictions: [
      "Le devis est sur un logiciel, le planning sur un autre, les heures sur un carnet",
      "Les bons de régie reviennent froissés, illisibles, ou ne reviennent pas",
      "Personne ne sait à midi si le technicien de l'après-midi a le matériel",
      "Le SAV redécouvre l'installation à chaque intervention, faute d'historique",
      "Entre l'heure travaillée et l'heure facturée, il y a une ressaisie et une perte",
    ],
    currentTools: ["Vertec", "Sorba", "Messerli", "Bexio", "bons papier"],
    modules: [
      {
        title: "Planning d'interventions",
        desc: "Qui va où, avec quoi, aujourd'hui. Une urgence se replace sans décrocher le téléphone quatre fois.",
        kind: "planning",
        visual: null,
      },
      {
        title: "Bon de régie mobile",
        desc: "Heures, matériel et photos saisis sur le chantier, signés par le client sur l'écran. Le bon ne se perd plus entre la camionnette et le bureau.",
        kind: "pointage",
        visual: null,
      },
      {
        title: "Historique par installation",
        desc: "Chaque site garde sa fiche : matériel posé, interventions, pièces changées. Le technicien du SAV sait ce qu'il va trouver avant d'arriver.",
        kind: "dossier",
        visual: null,
      },
    ],
    constraint:
      "Les techniciens travaillent souvent en sous-sol ou en zone blanche. Un outil qui exige une connexion permanente ne sera pas utilisé — la saisie hors ligne, avec synchronisation au retour, n'est pas une option.",
    faq: [
      {
        q: "Nos techniciens n'ont pas envie de saisir sur un téléphone.",
        a: "Ils n'en auront pas envie si ça leur prend plus de temps que le carnet. La règle qu'on s'impose : un bon de régie se remplit en moins d'une minute, matériel compris. S'il faut plus, on a mal conçu l'écran — et on le refait.",
      },
      {
        q: "Ça marche sans réseau, en sous-sol ?",
        a: "C'est une contrainte de départ, pas une option ajoutée après coup. La saisie se fait hors ligne et se synchronise au retour du réseau. Un outil qui l'ignore n'est pas utilisable sur un chantier.",
      },
      {
        q: "Avez-vous déjà équipé un installateur ?",
        a: "Pas encore, et nous préférons l'écrire. Ce que nous savons faire, c'est relier le terrain à la facturation sans ressaisie — nous l'avons construit pour une entreprise de nettoyage, dont les équipes mobiles posent exactement le même problème.",
      },
    ],
    relatedCase: null,
    relatedServices: ["application-metier", "automatisation-processus", "erp-sur-mesure"],
    gallery: [],
    visual: null,
    visualNote: null,
  },

  {
    slug: "regie-immobiliere",
    name: "Régies",
    label: "Régies et gérances immobilières",
    metaTitle: "Logiciel sur mesure pour régie immobilière · NeX",
    metaDescription:
      "Portail locataire et propriétaire, suivi des interventions, dossier d'immeuble unifié. Outils sur mesure pour les régies et gérances de Suisse romande.",
    h1: "Un outil sur mesure pour votre régie",
    status: "projection",
    intro:
      "Une régie gère des dossiers dont l'information est éparpillée entre un logiciel de gestion, une boîte mail, un classeur et le téléphone de quelqu'un. Le jour où un propriétaire demande des comptes, on rassemble à la main ce qui aurait dû être disponible.",
    frictions: [
      "Les états des lieux vivent en PDF, les photos dans un téléphone",
      "Les demandes des locataires arrivent par téléphone et se perdent",
      "Le suivi des travaux se fait par email, sans vue d'ensemble",
      "Le décompte de charges oblige à rassembler une dizaine de sources",
      "Les PPE réclament de la transparence, on n'a que des classeurs",
    ],
    currentTools: ["Garaio REM", "Quorum", "Immotop", "Excel", "Outlook"],
    modules: [
      {
        title: "Portail locataire et propriétaire",
        desc: "La demande arrive écrite, horodatée, rattachée au lot. Le propriétaire suit l'avancement sans appeler.",
        kind: "portail",
        visual: null,
      },
      {
        title: "Suivi des interventions",
        desc: "Du signalement au prestataire jusqu'à la facture, une seule chaîne. Vous savez à tout moment ce qui est en cours sur quel immeuble.",
        kind: "planning",
        visual: null,
      },
      {
        title: "Dossier d'immeuble unifié",
        desc: "Baux, états des lieux, photos, travaux, contrats d'entretien : tout est rattaché au bien, pas à la personne qui s'en occupait.",
        kind: "dossier",
        visual: null,
      },
    ],
    constraint:
      "Le droit du bail impose des délais et des formes précises — notification, contestation, restitution. Un outil qui ne les modélise pas produit des courriers attaquables.",
    faq: [
      {
        q: "Nous utilisons déjà un logiciel de gérance. Il faudrait en changer ?",
        a: "Non. Ces logiciels gèrent bien la comptabilité locative et les décomptes. Ce qu'ils font mal, c'est la relation quotidienne : les demandes, les interventions, la transparence envers les propriétaires. C'est cette couche qu'on ajoute, connectée à l'existant.",
      },
      {
        q: "Nos locataires utiliseront-ils vraiment un portail ?",
        a: "Ceux qui appellent continueront d'appeler, et c'est très bien. L'intérêt est qu'un appel devienne aussi une trace écrite rattachée au lot. Le portail sert surtout aux propriétaires et aux PPE, qui veulent voir sans demander.",
      },
      {
        q: "Avez-vous déjà travaillé pour une régie ?",
        a: "Pas encore, et nous ne le laisserons pas croire. Nous connaissons en revanche l'autre bout de la chaîne : nous avons construit l'outil d'une entreprise de conciergerie qui intervient pour des PPE et des gérances. Nous voyons ce qui coince du côté prestataire, ce qui aide à concevoir le côté régie.",
      },
    ],
    relatedCase: null,
    relatedServices: ["portail-client", "application-metier", "crm-sur-mesure"],
    gallery: [],
    visual: null,
    visualNote: null,
  },
];

export function getMetier(slug: string): Metier | undefined {
  return METIERS.find((m) => m.slug === slug);
}
