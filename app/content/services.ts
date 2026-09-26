/**
 * Pages service. Une URL par expertise = une page qui peut réellement se
 * positionner, au lieu de 13 mots-clés qui se cannibalisent sur la home.
 */
export interface Service {
  slug: string;
  /** Nom court, pour la navigation et le maillage interne. */
  name: string;
  /** Balise <title> — 60 caractères max avant troncature dans Google. */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /**
   * Le texte long, gardé pour le référencement et les pages ville. Il n'est
   * plus affiché en tête de page : c'est `pitch` qui dit ce que c'est.
   */
  intro: string;
  /** Ce que c'est, en une phrase. Le visiteur doit comprendre en trois secondes. */
  pitch: string;
  /**
   * Le problème, dans les mots du prospect — pas dans les nôtres. Sert au
   * sélecteur « Quel est votre problème ? » : on ne cherche pas un « ERP »,
   * on a des stocks et une facturation qui ne se parlent pas.
   */
  problem: string;
  /** « En un coup d'œil » : trois réponses courtes, lues avant tout le reste. */
  glance: { forWho: string; replaces: string; gain: string };
  /** Le contraste, trois lignes. Ce que le visiteur retient s'il ne lit rien d'autre. */
  beforeAfter: { before: string; after: string }[];
  /** Symptômes concrets. Le visiteur doit se reconnaître en une lecture. */
  symptoms: string[];
  /** Ce que NeX livre pour cette expertise. */
  delivered: { title: string; desc: string }[];
  /** Questions propres au service, injectées en JSON-LD FAQPage. */
  faq: { q: string; a: string }[];
  relatedCases: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "crm-sur-mesure",
    name: "CRM sur mesure",
    metaTitle: "CRM sur mesure pour PME · Suisse romande",
    metaDescription:
      "Développement de CRM sur mesure pour les PME de Suisse romande. Un outil calqué sur votre processus commercial réel, sans licence par utilisateur. Basés à Payerne.",
    h1: "CRM sur mesure pour les PME de Suisse romande",
    intro:
      "Un CRM du marché vous impose son vocabulaire, ses étapes et sa logique commerciale. Si votre processus de vente ne rentre pas dans les cases, vos équipes contournent l'outil — et vos données deviennent inexploitables. Nous construisons un CRM calqué sur votre manière réelle de vendre.",
    symptoms: [
      "Vos commerciaux tiennent leur propre fichier Excel en parallèle du CRM officiel.",
      "Vous payez une licence par utilisateur pour des fonctions que personne n'ouvre.",
      "Les étapes du pipeline ne correspondent pas à votre cycle de vente réel.",
      "Impossible de savoir où en est un dossier sans appeler la personne qui le suit.",
    ],
    delivered: [
      { title: "Pipeline à votre image", desc: "Les étapes, les champs et le vocabulaire sont ceux de votre métier, pas ceux d'un éditeur américain." },
      { title: "Vue client unifiée", desc: "Historique, documents, échanges et facturation au même endroit, accessibles à toute l'équipe." },
      { title: "Relances automatiques", desc: "Les suivis partent seuls selon vos règles. Plus d'affaire oubliée faute de temps." },
      { title: "Intégrations", desc: "Connexion à votre comptabilité, votre messagerie et vos outils existants. Fin de la double saisie." },
    ],
    faq: [
      { q: "Un CRM sur mesure coûte-t-il plus cher qu'un abonnement ?", a: "Le coût initial est plus élevé, mais il est fixe. Un abonnement par utilisateur augmente à chaque recrutement et ne s'arrête jamais. Sur la durée de vie de l'outil, le sur-mesure devient généralement moins cher — et vous en êtes propriétaire." },
      { q: "Peut-on récupérer les données de notre CRM actuel ?", a: "Oui. La reprise de données fait partie du projet : nous exportons votre base existante, nous la nettoyons avec vous et nous l'importons dans le nouvel outil avant la mise en service." },
      { q: "Combien de temps pour un CRM sur mesure ?", a: "Comptez généralement 2 à 4 mois pour un CRM complet, avec des livraisons intermédiaires que vous utilisez avant la fin du projet." },
    ],
    relatedCases: ["nyl", "pod-x"],
    pitch:
      "Un CRM construit autour de votre façon de vendre : vos étapes, vos champs, vos relances — sans licence par utilisateur.",
    problem: "Mes prospects se perdent entre Excel, e-mails et mémoire",
    glance: {
      forWho: "Les PME qui vendent en plusieurs étapes : demande, devis, relance, signature.",
      replaces: "Le CRM du marché qu'on contourne, les fichiers Excel parallèles, les relances de tête.",
      gain: "Chaque affaire suivie jusqu'au bout, et un pipeline lisible à tout moment.",
    },
    beforeAfter: [
      { before: "Chaque commercial tient son propre fichier Excel", after: "Une seule base, partagée et toujours à jour" },
      { before: "Les étapes du CRM ne collent pas à votre cycle de vente", after: "Le pipeline reprend exactement vos étapes" },
      { before: "Une affaire se perd faute de relance", after: "Les relances partent seules, au bon moment" },
    ],
  },
  {
    slug: "erp-sur-mesure",
    name: "ERP sur mesure",
    metaTitle: "ERP sur mesure pour PME · Suisse romande",
    metaDescription:
      "Développement d'ERP sur mesure pour PME romandes : stocks, production, finances et RH dans une seule interface adaptée à vos processus. Intégration Bexio et Microsoft 365.",
    h1: "ERP sur mesure : un seul outil pour piloter votre PME",
    intro:
      "Les ERP standards sont conçus pour des entreprises génériques. Leur mise en place consiste souvent à plier votre organisation à l'outil, au prix de longs mois de paramétrage. Nous prenons le problème dans l'autre sens : nous partons de vos processus et nous construisons autour.",
    symptoms: [
      "Vos stocks, votre facturation et votre production vivent dans trois outils qui ne communiquent pas.",
      "Un chiffre consolidé demande une demi-journée de retraitement sous Excel.",
      "Votre ERP actuel exige des contournements que seuls deux collaborateurs maîtrisent.",
      "Chaque évolution passe par un intégrateur externe, avec des délais et un devis.",
    ],
    delivered: [
      { title: "Modules utiles uniquement", desc: "Stocks, achats, production, facturation, RH : nous construisons ce que vous utilisez réellement." },
      { title: "Pilotage consolidé", desc: "Vos indicateurs en temps réel, sans retraitement manuel ni export intermédiaire." },
      { title: "Traçabilité complète", desc: "Chaque mouvement est historisé. Les contrôles et les audits cessent d'être une épreuve." },
      { title: "Évolutif par conception", desc: "Un nouveau site, une nouvelle activité, une nouvelle règle : l'outil suit votre croissance." },
    ],
    faq: [
      { q: "Un ERP sur mesure est-il réaliste pour une PME ?", a: "Oui, à condition de ne pas reproduire un ERP généraliste. Nous ne développons que les modules qui portent réellement votre activité, ce qui ramène le projet à une échelle et un budget de PME." },
      { q: "Peut-on garder notre logiciel de comptabilité ?", a: "Absolument. Nous nous connectons à ce qui fonctionne déjà — Bexio, Microsoft 365, Google Workspace — plutôt que de tout remplacer. Le but est de supprimer la double saisie, pas votre comptabilité." },
      { q: "Que se passe-t-il si nos processus changent ?", a: "L'outil est conçu pour évoluer. Nous restons partenaires après la livraison : vos règles métier changent, votre ERP change avec elles." },
    ],
    relatedCases: ["pod-x", "c-carre", "1pecc"],
    pitch:
      "Stocks, achats, production, facturation et pilotage dans un seul outil, construit autour de vos processus — pas l'inverse.",
    problem: "Mes stocks, ma facturation et ma production ne se parlent pas",
    glance: {
      forWho: "Les PME qui produisent, stockent ou mènent plusieurs activités en parallèle.",
      replaces: "Trois ou quatre outils déconnectés, les exports Excel et les consolidations à la main.",
      gain: "Des chiffres consolidés en temps réel, sans demi-journée de retraitement.",
    },
    beforeAfter: [
      { before: "Stocks, facturation et production dans trois outils", after: "Un seul outil, une seule source de vérité" },
      { before: "Un chiffre consolidé coûte une demi-journée d'Excel", after: "Les indicateurs se lisent en temps réel" },
      { before: "Chaque évolution passe par un intégrateur et un devis", after: "L'outil suit vos règles quand elles changent" },
    ],
  },
  {
    slug: "portail-client",
    name: "Portail client",
    metaTitle: "Création de portail client sur mesure · Suisse romande",
    metaDescription:
      "Portails clients et espaces partenaires sur mesure pour PME romandes : suivi de projet en temps réel, documents, messagerie intégrée. Moins de relances, plus de confiance.",
    h1: "Portail client : donnez à vos clients la visibilité qu'ils réclament",
    intro:
      "Chaque appel « où en est mon dossier ? » est du temps que votre équipe ne passe pas à produire. Un portail client bien conçu transforme ces interruptions en autonomie : vos clients voient l'avancement, retrouvent leurs documents et échangent au même endroit.",
    symptoms: [
      "Vos clients vous relancent par téléphone et par email pour un simple point d'avancement.",
      "Les documents circulent en pièces jointes, et personne ne sait quelle version fait foi.",
      "Les échanges se dispersent entre email, WhatsApp et appels.",
      "Vous n'avez aucune trace consolidée de ce qui a été validé, ni quand.",
    ],
    delivered: [
      { title: "Suivi en temps réel", desc: "Chaque client voit l'état de son dossier sans avoir à le demander." },
      { title: "Documents centralisés", desc: "Une bibliothèque versionnée, avec droits d'accès et validations." },
      { title: "Messagerie contextuelle", desc: "Les échanges restent rattachés au dossier concerné, et à personne d'autre." },
      { title: "Notifications automatiques", desc: "Le client est prévenu aux étapes qui comptent. Vous ne relancez plus." },
    ],
    faq: [
      { q: "Nos clients vont-ils vraiment utiliser un portail ?", a: "L'adoption dépend entièrement de la simplicité. Nous concevons le portail avec vos clients types et nous limitons volontairement les fonctions : un portail qu'on comprend en dix secondes est utilisé, un portail exhaustif ne l'est pas." },
      { q: "Nos données clients sont-elles hébergées en Suisse ?", a: "C'est un choix que nous faisons avec vous au moment du cadrage, selon vos obligations et la sensibilité des données. L'hébergement en Suisse est possible sur l'ensemble de nos projets." },
      { q: "Peut-on donner des accès différents selon les clients ?", a: "Oui. Les droits sont définis par rôle : chaque client, partenaire ou collaborateur ne voit que ce qui le concerne." },
    ],
    relatedCases: ["welcomize", "day"],
    pitch:
      "Un espace où vos clients suivent leur dossier, retrouvent leurs documents et échangent avec vous — sans avoir à vous appeler.",
    problem: "Mes clients m'appellent sans arrêt pour savoir où en est leur dossier",
    glance: {
      forWho: "Les entreprises de services dont les clients attendent des nouvelles : fiduciaires, régies, courtiers, agences.",
      replaces: "Les appels « où en est mon dossier ? », les pièces jointes en double, les échanges sur WhatsApp.",
      gain: "Moins d'interruptions pour l'équipe, plus de confiance chez le client.",
    },
    beforeAfter: [
      { before: "Le client appelle pour savoir où en est son dossier", after: "Il voit l'avancement en temps réel, sans demander" },
      { before: "Les documents circulent en pièces jointes, en plusieurs versions", after: "Une bibliothèque unique, versionnée, avec validations" },
      { before: "Les échanges se dispersent entre e-mail, WhatsApp et téléphone", after: "Chaque message reste rattaché au bon dossier" },
    ],
  },
  {
    slug: "application-metier",
    name: "Application métier",
    metaTitle: "Développement d'application métier sur mesure · Suisse romande",
    metaDescription:
      "Applications internes et logiciels métier sur mesure pour PME de Suisse romande. Conçus avec vos équipes opérationnelles, pour leur travail réel. Basés à Payerne.",
    h1: "Applications métier sur mesure pour vos équipes",
    intro:
      "Quand aucun logiciel du marché ne couvre votre métier, l'alternative habituelle est un empilement d'Excel et de contournements. Une application métier remplace cet équilibre fragile par un outil unique, conçu avec les personnes qui l'utiliseront tous les jours.",
    symptoms: [
      "Un fichier Excel critique est devenu le cœur de votre activité — et une seule personne sait le faire tourner.",
      "Vos processus reposent sur des habitudes non écrites plutôt que sur un outil.",
      "Vous avez renoncé à plusieurs logiciels du marché parce qu'aucun ne couvrait votre spécificité.",
      "Chaque nouvel arrivant met des semaines à comprendre comment vous travaillez.",
    ],
    delivered: [
      { title: "Conception avec le terrain", desc: "Nous passons du temps avec les utilisateurs finaux avant d'écrire la moindre ligne de code." },
      { title: "Interface épurée", desc: "Un outil pensé pour l'usage quotidien, pas pour une démonstration commerciale." },
      { title: "Règles métier fidèles", desc: "Vos contraintes réelles sont modélisées, y compris les cas particuliers qui font votre métier." },
      { title: "Formation et documentation", desc: "L'adoption fait partie du projet. Un outil que personne n'utilise n'a aucune valeur." },
    ],
    faq: [
      { q: "À qui appartient l'application développée ?", a: "À vous. Le code, les données et la documentation vous reviennent. Vous restez libre de faire évoluer votre outil avec le partenaire de votre choix." },
      { q: "Que se passe-t-il si NeX s'arrête ?", a: "Vous disposez du code source et de la documentation complète dès la livraison. C'est précisément pour cette raison que nous travaillons avec des technologies répandues plutôt qu'avec un socle propriétaire." },
      { q: "Combien de temps avant de voir quelque chose de concret ?", a: "Vous validez des maquettes interactives avant le développement, puis vous recevez des livraisons régulières. Un outil interne ciblé est généralement utilisable en 4 à 8 semaines." },
    ],
    relatedCases: ["nyl", "c-carre", "day", "1pecc"],
    pitch:
      "Quand aucun logiciel ne couvre votre métier : un outil conçu avec vos équipes, qui remplace l'Excel critique et les contournements.",
    problem: "Toute mon activité tient dans un Excel que seule une personne maîtrise",
    glance: {
      forWho: "Les métiers spécifiques qu'aucun logiciel du marché ne couvre correctement.",
      replaces: "L'Excel critique, les habitudes non écrites, les logiciels abandonnés faute d'adaptation.",
      gain: "Un outil que vos équipes utilisent vraiment, et un savoir-faire qui ne dépend plus d'une seule personne.",
    },
    beforeAfter: [
      { before: "Un Excel critique qu'une seule personne sait faire tourner", after: "Un outil partagé, documenté, sans point de rupture" },
      { before: "Les process reposent sur des habitudes non écrites", after: "Les règles métier sont inscrites dans l'outil" },
      { before: "Un nouvel arrivant met des semaines à comprendre", after: "L'outil le guide, étape par étape" },
    ],
  },
  {
    slug: "automatisation-processus",
    name: "Automatisation",
    metaTitle: "Automatisation des processus pour PME · Suisse romande",
    metaDescription:
      "Automatisation de processus métier pour PME romandes : synchronisations, relances, rapports et notifications. Supprimez la double saisie et les tâches répétitives.",
    h1: "Automatisation des processus : supprimez la saisie répétitive",
    intro:
      "La plupart des heures perdues dans une PME ne le sont pas sur des tâches complexes, mais sur des gestes répétitifs : recopier une donnée d'un outil à l'autre, relancer, produire le même rapport chaque semaine. Ce sont exactement les tâches qu'une machine fait mieux que vous.",
    symptoms: [
      "La même information est saisie deux ou trois fois dans des outils différents.",
      "Quelqu'un consacre une demi-journée par semaine à produire un rapport récurrent.",
      "Les relances clients dépendent de la mémoire de la personne qui suit le dossier.",
      "Une erreur de recopie a déjà eu des conséquences visibles pour un client.",
    ],
    delivered: [
      { title: "Synchronisations", desc: "Vos outils échangent leurs données automatiquement. La double saisie disparaît." },
      { title: "Relances et notifications", desc: "Les rappels partent selon vos règles, au bon moment, sans intervention." },
      { title: "Rapports automatiques", desc: "Vos indicateurs se génèrent et se diffusent seuls, à la fréquence que vous choisissez." },
      { title: "Workflows de validation", desc: "Les circuits d'approbation sont tracés et respectés, sans course aux signatures." },
    ],
    faq: [
      { q: "Faut-il remplacer nos outils actuels pour automatiser ?", a: "Non, et c'est souvent l'inverse. L'automatisation consiste d'abord à faire dialoguer ce que vous avez déjà. Nous ne remplaçons un outil que s'il constitue lui-même le blocage." },
      { q: "Par où commencer ?", a: "Par la tâche la plus répétitive et la plus fréquente, rarement par la plus complexe. Notre diagnostic gratuit identifie ces candidats en cinq minutes." },
      { q: "L'automatisation supprime-t-elle des postes ?", a: "Dans les PME que nous accompagnons, elle libère du temps sur des tâches que personne ne revendique. Les équipes ne rétrécissent pas : elles cessent de faire du travail de recopie." },
    ],
    relatedCases: ["nyl", "pod-x", "welcomize", "solve"],
    pitch:
      "Vos outils se parlent tout seuls : plus de double saisie, des relances et des rapports qui partent sans vous.",
    problem: "Je recopie les mêmes informations dans plusieurs outils",
    glance: {
      forWho: "Toute PME dont l'équipe recopie, relance ou refait les mêmes rapports chaque semaine.",
      replaces: "La double saisie, les relances de mémoire, les rapports refaits à la main.",
      gain: "Des heures rendues chaque semaine, et plus d'erreur de recopie.",
    },
    beforeAfter: [
      { before: "La même donnée saisie dans trois outils", after: "Saisie une fois, synchronisée partout" },
      { before: "Une demi-journée par semaine pour le même rapport", after: "Le rapport se génère et part tout seul" },
      { before: "Les relances dépendent de la mémoire de chacun", after: "Elles partent selon vos règles, sans oubli" },
    ],
  },
  {
    slug: "agents-ia",
    name: "Agents IA",
    metaTitle: "Agents IA et intelligence artificielle pour PME · Suisse romande",
    metaDescription:
      "Intégration d'IA utile pour les PME de Suisse romande : agents métier, analyse documentaire, assistants internes. Uniquement là où le gain est mesurable.",
    h1: "Intelligence artificielle : uniquement là où elle rapporte",
    intro:
      "L'IA est vendue partout, utile beaucoup plus rarement. Nous ne l'intégrons que lorsqu'elle traite un volume réel et fait gagner un temps mesurable : lire des documents, trier des demandes, préparer des réponses. Si elle n'apporte rien à votre cas, nous vous le disons.",
    symptoms: [
      "Vos équipes lisent et ressaisissent manuellement des factures, contrats ou formulaires.",
      "Les demandes entrantes sont triées à la main avant d'atteindre la bonne personne.",
      "Vous répondez chaque semaine aux mêmes questions, avec les mêmes réponses.",
      "Vous voulez intégrer l'IA sans savoir par quel bout la prendre concrètement.",
    ],
    delivered: [
      { title: "Analyse documentaire", desc: "Extraction automatique des données de vos factures, contrats et formulaires, avec contrôle humain." },
      { title: "Agents métier", desc: "Des assistants qui appliquent vos règles sur vos données, avec une traçabilité complète des décisions." },
      { title: "Assistants internes", desc: "Vos équipes interrogent votre documentation en langage naturel plutôt que de chercher dans des dossiers." },
      { title: "Garde-fous", desc: "Périmètre délimité, validation humaine sur les décisions sensibles, journalisation de bout en bout." },
    ],
    faq: [
      { q: "Nos données servent-elles à entraîner un modèle ?", a: "Non. Nous cadrons contractuellement et techniquement ce point à chaque projet : vos données restent les vôtres et ne nourrissent aucun entraînement tiers." },
      { q: "L'IA peut-elle se tromper ?", a: "Oui, et c'est pourquoi nous ne la laissons jamais décider seule sur les sujets sensibles. Elle prépare, propose et signale ; un humain valide là où l'erreur coûte cher." },
      { q: "L'IA est-elle obligatoire dans votre approche ?", a: "Absolument pas. Sur une bonne partie de nos projets, le gain vient d'une automatisation classique, plus simple, plus fiable et moins chère. Nous refusons de l'utiliser comme argument commercial." },
    ],
    relatedCases: ["pod-x", "solve"],
    pitch:
      "De l'IA branchée sur vos données, uniquement là où elle fait gagner un temps mesurable : lire, trier, préparer. Un humain valide.",
    problem: "Mes équipes lisent et ressaisissent des documents à longueur de journée",
    glance: {
      forWho: "Les PME qui traitent un volume réel de documents, de demandes ou de questions répétitives.",
      replaces: "La lecture et la ressaisie manuelles, le tri à la main, les réponses copiées-collées.",
      gain: "Du temps rendu sur le répétitif, sans perdre le contrôle des décisions.",
    },
    beforeAfter: [
      { before: "Factures et formulaires ressaisis à la main", after: "L'IA extrait les données, un humain valide" },
      { before: "Les demandes entrantes triées une par une", after: "Elles arrivent classées, à la bonne personne" },
      { before: "Les mêmes questions, les mêmes réponses, chaque semaine", after: "Un assistant répond à partir de votre documentation" },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
