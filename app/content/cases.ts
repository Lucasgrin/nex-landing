/**
 * Études de cas. Alimente la section home, la page /realisations et une page
 * dédiée par client (/realisations/[slug]) — chacune est une URL indexable
 * de plus qui cible des requêtes métier précises.
 *
 * ⚠️ Les champs `quote` sont volontairement à null : un témoignage doit venir
 * du client, jamais être écrit à sa place. Demande une phrase par téléphone,
 * c'est le contenu qui rassure le plus un prospect appelé à froid.
 * Les `stats` reprennent les résultats déjà annoncés ailleurs sur le site ou
 * dans la VSL — vérifie-les avant mise en ligne, un chiffre faux se retourne
 * contre toi.
 */
/**
 * Un fait chiffré sur une réalisation.
 *
 * Trois par cas, et volontairement de natures différentes : ce que l'outil
 * encaisse, ce qui a disparu, ce que ça fait gagner. Trois mesures du même
 * genre se ressemblent et s'annulent ; trois angles dressent un portrait.
 */
export interface CaseStat {
  /** Le chiffre seul, court — il est affiché en grand. */
  value: string;
  /**
   * L'unité, collée au chiffre et plus petite. C'est elle qui transforme un
   * nombre en fait : « 5 » ne dit rien, « 5 opérations » se comprend.
   */
  unit?: string;
  /** Ce que le chiffre mesure. Court : 22 caractères tiennent sur le rail. */
  label: string;
  /**
   * ⚠️ true = chiffre PROVISOIRE, inventé pour caler la maquette.
   *
   * Ce sont des affirmations publiques au nom d'entreprises identifiables :
   * elles ne doivent pas partir en production. `npm run build` les affiche
   * en clair dans la sortie — voir l'avertissement en bas de ce fichier.
   */
  placeholder?: boolean;
}

export interface CasePhoto {
  src: string;
  /**
   * Dimensions réelles du fichier, qui sont aussi ses dimensions
   * d'affichage. Déclarées ici plutôt que devinées : une capture d'écran
   * n'est nette qu'à l'échelle 1:1, donc la taille fait partie du contenu.
   */
  width: number;
  height: number;
  /** Le nom de l'écran, affiché dans la barre de la fenêtre. */
  screen: string;
  /**
   * true = les noms, montants et dates visibles à l'écran ont été remplacés.
   *
   * L'écran est celui de l'outil livré ; les données, non. Le dire est une
   * obligation, pas une précaution de style : ces dossiers appartiennent aux
   * clients de nos clients, et rien ne doit laisser croire qu'on expose
   * leurs vraies informations. La mention est portée par l'image elle-même,
   * pour qu'elle voyage avec elle si quelqu'un la recadre.
   */
  anonymised?: boolean;
  /**
   * true = les noms réels sont floutés sur la capture (badge « Données
   * masquées »). Pour les écrans trop denses pour qu'on remplace chaque nom
   * à la main : un nom oublié dans une liste de trente, c'est une fuite.
   */
  masked?: boolean;
  /**
   * Ce que l'écran montre, en une phrase. Pas décoratif : une capture sans
   * légende ne prouve rien, elle décore. Chacune doit répondre à une
   * question que le récit vient de poser.
   */
  caption: string;
}

export interface CaseChainStep {
  /** Le verbe de l'opération : planifier, pointer, facturer. */
  label: string;
  /** Ce qui se passe à ce maillon, en une ligne. */
  detail: string;
}

export interface CaseQuote {
  text: string;
  author: string;
  role: string;
}

/** Un message reçu un matin ordinaire — le miroir, en écran plutôt qu'en texte. */
export interface SceneMessage {
  de: string;
  heure: string;
  texte: string;
  /** true = une note qu'on s'envoie à soi-même. */
  moi?: boolean;
}

export interface CaseStudy {
  slug: string;
  /** false = brouillon : masqué partout tant que le contenu manque. */
  published: boolean;
  /**
   * true = cas d'usage type : un métier que nous n'avons pas encore équipé,
   * raconté dans la même grammaire qu'une réalisation pour montrer ce que
   * nous construirions. Aucun logo, aucun chiffre de résultat — la page le
   * dit dès le haut, et chaque section parle au conditionnel.
   */
  example?: boolean;
  /**
   * Titre orienté métier, quand la page doit parler au secteur plutôt qu'au
   * client (« Un logiciel pensé pour les entreprises de nettoyage »). Sans
   * lui, le titre est le nom du client.
   */
  headline?: string;
  /** Titre et description pour les moteurs, quand le métier se cherche. */
  seo?: { title: string; description: string };
  /**
   * Les métiers précis qu'une page regroupe (« Plombiers », « Électriciens »…).
   * Affichés en tête : le lecteur y retrouve son métier, et la page porte
   * ces mots sans en faire dix copies.
   */
  trades?: string[];
  /**
   * Le miroir du métier : ce qui arrive sur le téléphone le matin, les
   * frictions dans son vocabulaire, les outils qu'il utilise aujourd'hui.
   * C'est ici que le lecteur doit penser « c'est exactement chez nous ».
   */
  scene?: { messages: SceneMessage[]; frictions: string[]; currentTools: string[] };
  /**
   * Le coût de l'inaction, en trois angles et sans chiffre inventé : c'est au
   * lecteur d'appliquer ses propres nombres.
   */
  cost?: { titre: string; texte: string }[];
  /** La contrainte réglementaire ou métier qu'un généraliste ignore. */
  constraint?: string;
  /** Les objections propres au métier. Sert aussi le référencement. */
  faq?: { q: string; a: string }[];
  client: string;
  logo: string;
  type: string;
  sector: string;
  /** Résumé d'une ligne, utilisé en carte et en meta description. */
  summary: string;
  context: string;
  problem: string;
  solution: string;
  /**
   * Ce que NeX a livré — quatre briques, ni plus ni moins : c'est une grille
   * de quatre cartes sur la page, identique d'une réalisation à l'autre. Un
   * titre de deux ou trois mots, une ligne de détail.
   */
  delivered: { title: string; desc: string }[];
  stats: CaseStat[];
  /**
   * La chaîne d'opérations que l'outil porte maintenant d'un bout à l'autre.
   *
   * C'est le mécanisme, et c'est le même dans toutes nos réalisations :
   * plusieurs opérations sur la même réalité, qui vivaient dans des outils
   * séparés et s'obligeaient à ressaisir la même information à chaque
   * étape. Trois à cinq maillons — au-delà, on décrit un logiciel.
   */
  chain: CaseChainStep[];
  /** Le contraste, paire par paire. */
  beforeAfter: { before: string; after: string }[];
  /**
   * Pages (réalisations ou cas d'usage type) dont le problème de fond est le
   * même — le maillage qui fait sens. Deux par cas, jamais zéro : la section
   * « Le même problème, ailleurs » les montre en cartes.
   */
  relatedMetiers: string[];
  gains: string[];
  /**
   * « Et ensuite ? » — ce que l'outil pourrait devenir. Six pistes, pour
   * montrer que la première version n'est qu'un début.
   *
   * ⚠️ Des pistes, pas des fonctionnalités livrées : rien ici ne doit se lire
   * comme une promesse faite au nom du client. La page le dit en toutes
   * lettres, et les cartes en pointillés le montrent.
   */
  next: { title: string; desc: string }[];
  /**
   * Captures de l'outil livré, de la plus parlante à la moins. La première
   * tient la carte ; la page de la réalisation les montre toutes, légendées.
   *
   * ⚠️ Aucune capture ne part d'ici sans avoir été nettoyée : noms, e-mails,
   * montants et adresses des clients du client n'ont rien à faire en ligne.
   * Les originaux restent hors du dépôt.
   */
  photos: CasePhoto[];
  photoAlt: string;
  quote: CaseQuote | null;
}

export const CASES: CaseStudy[] = [
  {
    // ⚠️ Fiche réécrite à partir de l'écran « Suivi des onboardings » : ce que
    //    le produit fait est visible à l'écran ; le rôle de NeX et le constat
    //    de départ sont à faire relire par Welcomize avant mise en ligne.
    slug: "welcomize",
    published: true,
    client: "Welcomize",
    logo: "/logos/welcomize.png",
    type: "SaaS d'onboarding client",
    sector: "SaaS",
    summary:
      "Un SaaS qui prend en charge l'arrivée des nouveaux clients d'une agence : un parcours d'onboarding guidé, à ses couleurs, qui se termine dans l'espace client. Conçu et développé de zéro par NeX.",
    context:
      "Dans une agence, l'arrivée d'un nouveau client est le moment où la relation se joue — et c'est aussi celui qui s'improvise le plus. Un e-mail de bienvenue, un questionnaire en PDF, des visuels envoyés par WhatsApp, un kick-off calé à la main. Welcomize voulait en faire un produit : un parcours que l'agence configure une fois, et que chaque client suit seul.",
    problem:
      "Fait à la main, l'onboarding d'un seul client prend plusieurs heures, parfois plusieurs jours. Les informations arrivent éparpillées entre e-mails, WhatsApp et fichiers partagés, et le client, qui ne voit pas la suite, relance pour savoir où il en est. Les outils existants couvraient un morceau du parcours — le formulaire, le portail — jamais le parcours entier.",
    solution:
      "NeX a conçu et développé Welcomize de zéro, de la première maquette à la mise en ligne. L'agence construit son parcours une fois ; chaque client le suit seul, puis arrive dans son espace.",
    delivered: [
      { title: "Éditeur de parcours", desc: "Vidéos, formulaires, visuels et kick-off, assemblés étape par étape." },
      { title: "Aux couleurs de l'agence", desc: "Apparence, e-mail d'envoi et modèles de documents personnalisés." },
      { title: "Suivi des sessions", desc: "Chaque onboarding en cours, client par client, avec l'activité récente." },
      { title: "Espace client", desc: "Le client y bascule seul en fin de parcours : avancement, messages, documents." },
    ],
    beforeAfter: [
      { before: "Embarquer un client prend plusieurs heures, parfois plusieurs jours", after: "Le parcours est prêt une fois pour toutes : moins d'une heure par client" },
      { before: "Questionnaire en PDF, visuels par WhatsApp, kick-off calé à la main", after: "Formulaires, visuels et kick-off réunis dans un seul parcours guidé" },
      { before: "Chaque accueil s'improvise, d'un client à l'autre", after: "Le même accueil pour tous, aux couleurs de l'agence" },
      { before: "Le client relance pour savoir où il en est", after: "Il suit son parcours, puis son espace, sans avoir à demander" },
    ],
    relatedMetiers: ["courtier-assurances", "regie-immobiliere"],
    stats: [
      // Avant : plusieurs heures, voire plusieurs jours, pour embarquer un client.
      { value: "< 1", unit: "h", label: "au lieu de plusieurs jours" },
      // ⚠️ Estimation interne — à confirmer par un comptage avant/après
      //    avant publication. Le jour où c'est compté, retire `placeholder`.
      { value: "2×", label: "moins de clients qui relancent", placeholder: true },
      { value: "100", unit: "%", label: "des clients embarqués seuls" },
    ],
    chain: [
      { label: "Accueillir", detail: "Le client reçoit un parcours aux couleurs de l'agence, vidéo de bienvenue en tête" },
      { label: "Collecter", detail: "Formulaires et éléments visuels arrivent directement dans son dossier" },
      { label: "Lancer", detail: "Le kick-off et les prochaines étapes se calent depuis le parcours" },
      { label: "Installer", detail: "Parcours terminé, le client bascule seul dans son espace" },
      { label: "Suivre", detail: "Avancement, échanges et documents restent au même endroit" },
    ],
    gains: [
      "Un nouveau client embarqué en moins d'une heure",
      "Une première impression soignée, aux couleurs de l'agence",
      "Le client sait toujours où il en est, sans relancer",
    ],
    next: [
      { title: "Brief pré-rempli par l'IA", desc: "L'IA lit le site et les réseaux du client et prépare le brief avant même le premier échange." },
      { title: "Assistant d'onboarding", desc: "Un assistant répond aux questions du client pendant le parcours, à toute heure." },
      { title: "Contrat et paiement intégrés", desc: "Signature et premier acompte directement dans le parcours." },
      { title: "Kick-off préparé tout seul", desc: "L'ordre du jour se génère à partir des réponses du client." },
      { title: "Connecté aux outils de l'agence", desc: "CRM, Slack, Notion : le dossier client se crée partout en même temps." },
      { title: "Analytics du parcours", desc: "Où les clients bloquent, combien de temps prend chaque étape." },
    ],
    photos: [
      {
        src: "/realisations/welcomize-onboarding.png",
        width: 1600,
        height: 480,
        screen: "Suivi des onboardings",
        caption:
          "Le parcours d'onboarding d'un nouveau client : vidéo d'accueil, formulaire stratégique, éléments visuels, kick-off, puis tour du portail. Une fois le parcours terminé, le client bascule tout seul vers son espace.",
      },
      {
        src: "/realisations/welcomize-fiche-client.png",
        width: 1600,
        height: 565,
        screen: "Fiche client",
        // E-mails et numéro WhatsApp remplacés sur la capture ; le reste
        // est un compte de démonstration.
        anonymised: true,
        caption:
          "La fiche d'un client, côté agence. Depuis « Nouvelle action », l'agence lui envoie un onboarding, une demande de document, de signature ou de validation, une tâche ou un rendez-vous — tout part du même dossier.",
      },
    ],
    photoAlt: "Le parcours d'onboarding de Welcomize, SaaS conçu et développé par NeX",
    quote: null, // TODO — une phrase du client + nom + fonction
  },
  {
    slug: "nyl",
    published: true,
    headline: "Un outil de pilotage pour votre fiduciaire",
    seo: {
      title: "Logiciel sur mesure pour fiduciaire · NeX",
      description:
        "Collecte des pièces, lecture OCR, échéances légales TVA et AVS, rentabilité par mandat. L'outil construit pour une fiduciaire genevoise qui travaillait sur papier.",
    },
    scene: {
      messages: [
        { de: "Alpina Immobilier", heure: "08:10", texte: "📎 Voilà la facture de septembre" },
        { de: "Sarah", heure: "10:02", texte: "Le client répond pas pour les pièces" },
        { de: "Café des Bastions", heure: "14:20", texte: "On en est où pour la TVA ?" },
        { de: "Note à moi-même", heure: "18:40", texte: "Ne pas oublier l'échéance du 31.10", moi: true },
      ],
      frictions: [
        "Les pièces arrivent par email, par WhatsApp, en photo, dans le désordre",
        "Chaque bouclement recommence la même chasse aux justificatifs manquants",
        "Les échéances TVA, AVS et IS vivent dans un tableur que quelqu'un tient de tête",
        "Le temps passé par mandat est saisi à la fin — quand il est saisi",
        "Impossible de dire, en cours d'année, quel mandat est rentable",
      ],
      currentTools: ["Crésus", "Abacus", "Bexio", "WinBIZ", "Excel", "Outlook"],
    },
    cost: [
      { titre: "Le temps", texte: "Le temps de collecte n'est facturable à personne. Il sort directement de votre marge." },
      { titre: "La marge", texte: "Un mandat qui déborde ne se découvre qu'à la reconduction — et vous le renouvelez au même prix." },
      { titre: "Le risque", texte: "Une échéance légale tenue de tête est une échéance qui finit par être ratée." },
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
        q: "L'OCR lit-il vraiment toutes nos pièces ?",
        a: "Factures, tickets, relevés, photos prises au téléphone : l'OCR lit la pièce et prépare l'écriture, qu'un collaborateur valide au lieu de la saisir. Ce qu'il n'arrive pas à lire avec certitude est signalé, jamais deviné — la validation reste humaine.",
      },
      {
        q: "Que peut-on y ajouter ensuite ?",
        a: "Tout ce qui s'appuie sur les mêmes données : rapprochement bancaire automatique, décomptes TVA préparés au fil de l'eau, relances de pièces, tableau de trésorerie pour chaque client, assistant IA qui répond à leurs questions sur leur dossier. On commence par le point qui coûte le plus, et l'outil grandit avec le cabinet.",
      },
    ],
    client: "NYL",
    logo: "/logos/nyl.png",
    type: "Digitalisation fiduciaire",
    sector: "Fiduciaire",
    summary:
      "Une fiduciaire qui travaillait sur papier et en classeurs, passée à un outil qui collecte les pièces de ses clients, les lit et les fait traiter au fil de l'eau — pour des dossiers à jour toute l'année.",
    context:
      "Chez NYL, tout passait par le papier. Les clients apportaient leurs pièces, elles étaient rangées dans des classeurs, puis chaque écriture comptable était passée à la main, une par une. Le cabinet voulait digitaliser tout ce qui pouvait l'être.",
    problem:
      "Sur papier, les pièces arrivent par paquets — au trimestre, parfois à l'année. Le travail se concentre sur quelques semaines, chaque écriture se ressaisit à la main, et entre deux paquets les dossiers des clients ne sont pas à jour. Retrouver une pièce, c'est ouvrir le bon classeur.",
    solution:
      "NeX a construit l'outil qui remplace les classeurs. Les clients y déposent leurs pièces au fil de l'eau, l'OCR les lit et prépare les écritures, et l'équipe les valide au lieu de les saisir. Les pièces se traitent chaque semaine, et les dossiers restent à jour.",
    delivered: [
      { title: "Collecte des pièces", desc: "Les clients déposent leurs documents en ligne, plus de classeur à apporter." },
      { title: "Lecture OCR", desc: "Chaque pièce arrive pré-écrite : l'équipe valide l'écriture, elle ne la saisit plus." },
      { title: "File de traitement", desc: "Les pièces se traitent au fil de l'eau, et les retards restent visibles." },
      { title: "Échéances et pilotage", desc: "TVA, AVS, bouclements et pièces manquantes, suivis d'un coup d'œil." },
    ],
    beforeAfter: [
      { before: "Les pièces arrivent sur papier et finissent dans des classeurs", after: "Les clients les déposent en ligne, directement dans leur dossier" },
      { before: "Chaque écriture comptable se saisit à la main", after: "L'OCR lit la pièce et prépare l'écriture : il reste à valider" },
      { before: "Les pièces arrivent par paquets, au trimestre ou à l'année", after: "Elles se traitent au fil de l'eau, semaine après semaine" },
      { before: "Entre deux paquets, les dossiers des clients ne sont pas à jour", after: "Chaque client a un dossier à jour, toute l'année" },
      { before: "Les relances de pièces manquantes dépendent de quelqu'un qui y pense", after: "Elles partent seules, et rendent compte de ce qu'elles ont fait" },
    ],
    relatedMetiers: ["courtier-assurances", "regie-immobiliere"],
    stats: [
      // ⚠️ Ordres de grandeur calés sur ce qu'annoncent les outils de GED
      //    avec OCR du marché — rien n'a été mesuré chez NYL. À remplacer
      //    par un comptage avant/après ; le jour où c'est fait, retire
      //    `placeholder`.
      // Avant : chaque écriture passée à la main depuis la pièce papier.
      { value: "−90", unit: "%", label: "de saisie comptable à la main", placeholder: true },
      // Avant : les pièces arrivaient par paquets, au trimestre ou à l'année.
      { value: "24", unit: "h", label: "entre dépôt et traitement", placeholder: true },
      { value: "100", unit: "%", label: "des pièces reçues en ligne" },
    ],
    chain: [
      { label: "Collecter", detail: "Le client dépose ses pièces en ligne, plus de classeur à apporter" },
      { label: "Lire", detail: "L'OCR lit chaque pièce et prépare l'écriture comptable" },
      { label: "Valider", detail: "L'équipe contrôle et valide au fil de l'eau, sans rien ressaisir" },
      { label: "Suivre", detail: "Pièces manquantes relancées, échéances TVA et AVS remontées seules" },
    ],
    gains: [
      "Des pièces reçues et classées sans papier",
      "Des écritures validées plutôt que saisies à la main",
      "Des dossiers clients à jour toute l'année, pas seulement au bouclement",
    ],
    next: [
      { title: "Assistant IA pour les clients", desc: "Il répond aux questions des clients sur leur dossier, sans mobiliser l'équipe." },
      { title: "Rapprochement bancaire", desc: "Les relevés se rapprochent des pièces automatiquement." },
      { title: "TVA préparée d'avance", desc: "Les décomptes se préparent au fil de l'eau, prêts à valider." },
      { title: "Trésorerie en temps réel", desc: "Chaque client suit sa trésorerie depuis son espace." },
      { title: "Relances de pièces automatiques", desc: "Les pièces manquantes sont réclamées toutes seules, au bon moment." },
      { title: "Bouclement assisté", desc: "L'IA prépare les écritures de fin d'exercice et signale les anomalies." },
    ],
    photos: [
      {
        src: "/metiers/nyl-pilotage-4.jpg",
        width: 2320,
        height: 1450,
        screen: "Pilotage",
        anonymised: true,
        caption:
          "L'état du cabinet en une ligne : dossiers actifs, bouclements en cours, pièces manquantes, prochains décomptes à déposer.",
      },
      {
        src: "/metiers/nyl-file-4.jpg",
        width: 1348,
        height: 842,
        screen: "File de traitement",
        anonymised: true,
        caption:
          "La file de traitement des pièces, tâche par tâche : ce qui arrive passe par l'OCR, et les retards restent visibles.",
      },
      {
        src: "/metiers/nyl-echeances-4.jpg",
        width: 1046,
        height: 654,
        screen: "Échéances légales",
        anonymised: true,
        caption:
          "Les échéances légales à venir — TVA, AVS, bouclements — avec leur statut et les mandats concernés.",
      },
      {
        src: "/metiers/nyl-heures-4.jpg",
        width: 1348,
        height: 842,
        screen: "Heures facturables",
        anonymised: true,
        caption:
          "Les heures facturables réalisées face au planifié, sur douze semaines.",
      },
    ],
    photoAlt: "L'application interne NYL développée par NeX",
    quote: null, // TODO
  },
  {
    slug: "pod-x",
    published: true,
    client: "Pod X",
    logo: "/logos/podx.png",
    type: "Outil de gestion sur mesure",
    sector: "Studio de podcast",
    summary:
      "Aucun logiciel du marché ne leur convenait. Nous avons construit leur propre outil de réservation et de gestion interne : tout est automatisé, de la réservation à la facture.",
    context:
      "Pod X exploite une salle de podcast. Les outils de réservation et de gestion du marché qu'ils utilisaient coûtaient cher en abonnements et n'étaient pas pensés pour une structure comme la leur : c'était à eux de s'adapter au logiciel, pas l'inverse.",
    problem:
      "Aucun outil ne leur convenait vraiment. Les abonnements pesaient lourd, les données étaient mal exploitées, le lien entre les employés et les plannings restait insuffisant et la personnalisation trop limitée. Impossible, dans ces conditions, de piloter l'acquisition ou le pricing sur des chiffres fiables.",
    solution:
      "Leur propre outil de réservation et de gestion interne, construit pour leur studio. De la réservation à la facture, de la gestion client au suivi des heures, tout est automatisé, et toute la data est centralisée au même endroit.",
    delivered: [
      { title: "Réservation en ligne", desc: "Le client réserve lui-même son créneau, le forfait se met à jour." },
      { title: "Facturation automatique", desc: "La facture découle de la réservation, sans ressaisie." },
      { title: "Équipe et heures", desc: "Employés, plannings et heures reliés dans le même outil." },
      { title: "Data centralisée", desc: "Acquisition, pricing et activité suivis au même endroit." },
    ],
    beforeAfter: [
      { before: "Des abonnements chers pour des outils pensés pour d'autres", after: "Un outil à eux, personnalisé à 100 % selon leurs besoins" },
      { before: "Employés et plannings mal reliés", after: "Chaque session rattachée à l'équipe et à ses heures" },
      { before: "Des données dispersées et peu exploitables", after: "Tout est tracké : acquisition et pricing se décident chiffres à l'appui" },
    ],
    relatedMetiers: ["artisans", "1pecc"],
    stats: [
      { value: "−6", unit: "h", label: "de gestion chaque semaine", placeholder: true },
      { value: "3", label: "abonnements résiliés", placeholder: true },
      { value: "100", unit: "%", label: "automatisé, résa → facture" },
    ],
    chain: [
      { label: "Réserver", detail: "Le client choisit son créneau, le studio se bloque" },
      { label: "Planifier", detail: "La session est attribuée à un employé, ses heures sont comptées" },
      { label: "Livrer", detail: "Les fichiers partent au client depuis l'outil" },
      { label: "Facturer", detail: "La facture suit la réservation, sans la ressaisir" },
      { label: "Analyser", detail: "Chaque réservation alimente les chiffres d'acquisition et de pricing" },
    ],
    gains: [
      "Des heures gagnées et des abonnements annulés",
      "Des décisions d'acquisition et de pricing mesurées",
      "Un outil personnalisé à 100 % selon leurs besoins",
    ],
    next: [
      { title: "Clips générés par l'IA", desc: "Les meilleurs passages de chaque épisode découpés en formats courts." },
      { title: "Transcription et sous-titres", desc: "Chaque session transcrite et sous-titrée automatiquement." },
      { title: "Publication sur les réseaux", desc: "Les clips partent sur les réseaux du client depuis l'outil." },
      { title: "Pricing dynamique", desc: "Les tarifs s'ajustent selon le remplissage du studio." },
      { title: "Abonnements et fidélité", desc: "Des formules récurrentes gérées et facturées automatiquement." },
      { title: "Assistant de réservation", desc: "Une IA qui répond aux demandes et réserve le bon créneau, jour et nuit." },
    ],
    photos: [
      {
        src: "/realisations/pod-x-planning.png",
        width: 1145,
        height: 672,
        screen: "Réservations",
        anonymised: true,
        caption:
          "Le planning de la semaine. Une réservation pose le créneau et décompte le forfait du client.",
      },
      {
        src: "/realisations/pod-x-rush.png",
        width: 1555,
        height: 993,
        screen: "Bibliothèque Rush",
        masked: true,
        caption:
          "Les rushs à livrer, session par session. Un clic envoie les fichiers au client ; ceux déjà partis restent listés, avec leur date d'expiration.",
      },
      {
        src: "/realisations/pod-x-portail.png",
        width: 1555,
        height: 832,
        screen: "Portail client",
        caption:
          "Le portail côté client : sa prochaine réservation, son forfait et ses heures restantes. Il réserve lui-même sa session de studio.",
      },
    ],
    photoAlt: "L'outil de réservation et de gestion Pod X développé par NeX",
    quote: null, // TODO
  },
  {
    slug: "c-carre",
    published: true,
    client: "C Carré",
    logo: "/logos/c-carre.svg",
    type: "Site et back office sur mesure",
    sector: "Photo et vidéo de mariage",
    summary:
      "Du site au back office, un seul outil pensé pour un service premium : devis instantané, CRM, relances et contrats automatisés, jusqu'à la livraison des fichiers.",
    context:
      "C Carré est une entreprise de photographie et de vidéo de mariage, et sa promesse, c'est un service premium. Entre les demandes entrantes, les devis, les relances, les contrats et la livraison des fichiers, cette expérience reposait sur plusieurs outils et beaucoup de temps passé à la main.",
    problem:
      "Chaque demande de mariage demandait du temps avant même de devenir un client : répondre, chiffrer, relancer, préparer le contrat. Avec des informations réparties entre plusieurs outils, difficile de garder une expérience premium à chaque étape, et de lire clairement la rentabilité de l'activité.",
    solution:
      "Du site au back office, tout a été pensé pour servir au mieux le client. Un onboarding automatisé donne un devis instantané, le CRM relance et génère les contrats, et tout est centralisé, de l'acquisition à la livraison des fichiers, dans un seul et même outil.",
    delivered: [
      { title: "Devis instantané", desc: "Un onboarding automatisé chiffre la demande dès que le couple la remplit." },
      { title: "CRM et relances", desc: "Chaque demande est suivie et relancée automatiquement." },
      { title: "Contrats générés", desc: "Le contrat part depuis la fiche, sans rédaction manuelle." },
      { title: "Analytics et rentabilité", desc: "Acquisition et rentabilité suivies dans le même outil." },
    ],
    beforeAfter: [
      { before: "Un devis à préparer à la main pour chaque demande", after: "Un devis instantané, dès l'onboarding du client" },
      { before: "Des relances et des contrats à gérer un par un", after: "Relances et contrats générés automatiquement" },
      { before: "Plusieurs outils entre la demande et la livraison", after: "Un seul outil, de l'acquisition à la livraison des fichiers" },
    ],
    relatedMetiers: ["artisans", "nyl"],
    stats: [
      { value: "−10", unit: "h", label: "de gestion chaque semaine", placeholder: true },
      { value: "24/7", label: "devis instantané" },
      { value: "100", unit: "%", label: "des relances automatisées" },
    ],
    chain: [
      { label: "Acquérir", detail: "La demande arrive du site et entre dans le CRM" },
      { label: "Chiffrer", detail: "L'onboarding génère le devis instantanément" },
      { label: "Relancer", detail: "Les relances partent toutes seules jusqu'à la réponse" },
      { label: "Contracter", detail: "Le contrat se génère depuis la fiche et part à la signature" },
      { label: "Livrer", detail: "Les fichiers du mariage partent depuis le même dossier client" },
    ],
    gains: [
      "Un gain de temps énorme, un seul outil pour tout faire",
      "Une expérience premium et une communication client facilitée",
      "Des analytics pour piloter la rentabilité",
    ],
    next: [
      { title: "Présélection par l'IA", desc: "L'IA repère les meilleures photos de chaque mariage pour accélérer le tri." },
      { title: "Album généré automatiquement", desc: "Une première mise en page de l'album, prête à ajuster." },
      { title: "Espace des mariés", desc: "Le déroulé du jour J, les documents et les échanges au même endroit." },
      { title: "Teasers sur les réseaux", desc: "Les plus belles images publiées sur les réseaux depuis l'outil." },
      { title: "Avis clients automatiques", desc: "La demande d'avis part toute seule après la livraison." },
      { title: "Assistant commercial", desc: "Une IA qui répond aux demandes des couples et propose un rendez-vous." },
    ],
    photos: [
      {
        src: "/realisations/c-carre-fiche.png",
        width: 1500,
        height: 540,
        screen: "Fiche mariage",
        anonymised: true,
        caption:
          "La fiche d'un mariage. Le devis, le contrat et la galerie se génèrent depuis cet écran, aux règles de la maison.",
      },
      {
        src: "/realisations/c-carre-leads.png",
        width: 1600,
        height: 857,
        screen: "Leads",
        masked: true,
        caption:
          "Le pipeline des demandes, étape par étape : date du mariage, canal d'arrivée, montant du devis. Les relances à faire se comptent colonne par colonne.",
      },
      {
        src: "/realisations/c-carre-calendrier.png",
        width: 1600,
        height: 676,
        screen: "Calendrier",
        masked: true,
        caption:
          "Les mariages et les rendez-vous du mois, colorés selon l'étape de chaque demande — synchronisés avec Google Calendar.",
      },
    ],
    photoAlt: "Le site et le back office C Carré développés par NeX",
    quote: null, // TODO
  },
  {
    // ⚠️ Contenu transcrit depuis la VSL (segment Solve, 1:20 à 1:36) : chaque
    //    phrase et chaque chiffre viennent de ce que la vidéo affirme déjà.
    //    À relire avec Solve avant de considérer la page comme validée — c'est
    //    du texte public au nom d'un client identifiable.
    slug: "solve",
    published: true,
    client: "Solve",
    logo: "/logos/solve.svg",
    type: "App de gestion d'agence avec IA",
    sector: "Agence marketing",
    summary:
      "Une seule app pour gérer toute l'agence : CRM sur mesure, relances automatiques, rapports, e-mails, tâches, rentabilité et analytics, avec une IA qui a accès à tout.",
    context:
      "Solve est une agence de marketing digital. Pour faire tourner l'agence, l'équipe jonglait entre plusieurs applications : CRM, gestion des tâches, agenda, boîte mail, tableurs pour la rentabilité. Chacune avait son abonnement, et aucune n'était vraiment pensée pour leur façon de travailler.",
    problem:
      "Plusieurs abonnements coûteux, une data éclatée entre les outils, et une IA impossible à intégrer proprement dans chacun d'eux. Relances, rapports clients, tri des e-mails et planification prenaient un temps considérable, sans vue d'ensemble sur l'acquisition, la productivité ou la rentabilité.",
    solution:
      "Une app unique qui regroupe toute la gestion de l'agence, avec une IA qui a accès à tout : elle assiste l'acquisition, automatise les relances, rédige les rapports, prépare les réponses aux e-mails, planifie la semaine selon les priorités et répond aux demandes de l'équipe.",
    delivered: [
      { title: "CRM sur mesure", desc: "Les étapes d'acquisition de l'agence, l'IA en appui et toutes les relances automatisées." },
      { title: "Assistant IA", desc: "Il a accès à tout : il conseille, exécute des tâches et répond aux demandes." },
      { title: "Rapports, e-mails et tâches", desc: "Transcription et rapports générés, e-mails triés avec pré-réponses, semaine planifiée selon les priorités." },
      { title: "Rentabilité et analytics", desc: "Rentabilité par projet et par client, analytics d'acquisition et de productivité." },
    ],
    stats: [
      { value: "5", label: "abonnements résiliés" },
      { value: "30", unit: "s", label: "par rapport, au lieu de 2 h" },
      { value: "100", unit: "%", label: "des relances automatisées" },
    ],
    chain: [
      { label: "Acquérir", detail: "Le CRM suit chaque prospect, l'IA assiste et les relances partent seules" },
      { label: "Planifier", detail: "L'IA organise la semaine selon les priorités, dans un agenda intelligent" },
      { label: "Répondre", detail: "Les e-mails arrivent triés, avec une pré-réponse prête" },
      { label: "Rapporter", detail: "Les échanges sont transcrits, le rapport client se génère" },
      { label: "Mesurer", detail: "Rentabilité, acquisition et productivité se lisent en continu" },
    ],
    beforeAfter: [
      { before: "Plusieurs applications, chacune avec son abonnement", after: "Une seule app, cinq abonnements résiliés" },
      { before: "La data éclatée entre les outils", after: "Tout au même endroit, accessible à l'IA" },
      { before: "L'IA impossible à brancher sur chaque outil", after: "Une IA qui a accès à tout, pour conseiller et agir" },
      { before: "Un rapport client se reconstruit en deux heures", after: "Il sort en trente secondes" },
      { before: "La rentabilité se devine en fin de mois", after: "Elle se lit par projet et par client, en continu" },
    ],
    relatedMetiers: ["courtier-assurances", "nyl"],
    gains: [
      "Une seule app à la place de cinq abonnements",
      "Relances, rapports et e-mails pris en charge par l'IA",
      "Rentabilité et acquisition pilotées sur des chiffres",
    ],
    next: [
      { title: "Créatives générées", desc: "Visuels et textes publicitaires créés directement depuis l'outil." },
      { title: "Publication sur les réseaux", desc: "Les contenus des clients planifiés et publiés sans changer d'outil." },
      { title: "Campagnes ads pilotées", desc: "Les campagnes Meta et Google suivies et ajustées au même endroit." },
      { title: "Rapports envoyés tout seuls", desc: "Chaque client reçoit son rapport mensuel, sans intervention." },
      { title: "Portail client", desc: "Les clients suivent leurs campagnes et valident les créatives en ligne." },
      { title: "Agents IA autonomes", desc: "Des agents qui exécutent des tâches de bout en bout, pas seulement qui conseillent." },
    ],
    photos: [
      {
        src: "/realisations/solve-dashboard.png",
        width: 1726,
        height: 922,
        screen: "Dashboard",
        anonymised: true,
        caption:
          "Le tableau de bord du matin. L'IA résume la journée et pointe les priorités, les tâches en retard et jamais planifiées remontent d'elles-mêmes, et la charge de la semaine se lit d'un coup d'œil.",
      },
      {
        src: "/realisations/solve-suivi-equipe.png",
        width: 1726,
        height: 922,
        screen: "Suivi d'équipe",
        anonymised: true,
        caption:
          "La réunion d'équipe, préparée d'avance : les points à traiter, ce qui est en retard, le bilan de la semaine écoulée. Dési, l'assistant IA, rédige le compte rendu à partir des chiffres.",
      },
    ],
    photoAlt: "L'app de gestion d'agence développée pour Solve",
    quote: null,
  },
  {
    // ⚠️ Fiche rédigée à partir des captures de l'outil, pas d'un brief Day.
    //    Chaque phrase décrit ce que les écrans montrent — à faire relire par
    //    Day avant mise en ligne. Les visuels de la galerie appartiennent à
    //    Tissot SA : l'accord d'usage doit être conservé par écrit.
    slug: "day",
    published: true,
    client: "Day",
    logo: "/logos/agence-day.svg",
    type: "Galerie de livraison",
    sector: "Photographie",
    summary:
      "Une galerie de marque où le client retrouve les photos de son événement, les trie par client et les télécharge sans passer par un lien de transfert.",
    context:
      "Day couvre des événements de marque et livre plusieurs centaines de photos par opération. La livraison passait par des liens de transfert temporaires : le client téléchargeait tout, puis cherchait lui-même les images qui l'intéressaient.",
    problem:
      "Un dossier de cinq cents fichiers n'est pas une livraison, c'est un travail de tri déplacé chez le client. Et un lien qui expire, c'est la même demande qui revient trois mois plus tard.",
    solution:
      "Une galerie aux couleurs de l'événement, où chaque photo est rattachée au client qui y figure. Le client filtre, choisit et télécharge ; Day garde la main sur l'administration.",
    delivered: [
      { title: "Galerie de marque", desc: "Une par événement, à ses couleurs." },
      { title: "Tri par client", desc: "Chaque photo rattachée à qui y figure, filtrable par personne et par journée." },
      { title: "Espace admin", desc: "Mise en avant des incontournables, masquage, liens publics." },
      { title: "Téléchargement libre", desc: "Tout ou partie, sans lien qui expire." },
    ],
    stats: [
      { value: "1", unit: "clic", label: "pour retrouver ses photos" },
      { value: "500", unit: "+", label: "photos triées par client", placeholder: true },
      { value: "24/7", label: "accès à leur galerie" },
    ],
    chain: [
      { label: "Couvrir", detail: "Les photos de l'événement remontent dans un seul dossier" },
      { label: "Classer", detail: "Chaque photo se rattache au client qui y figure" },
      { label: "Publier", detail: "La galerie prend les couleurs de l'événement" },
      { label: "Livrer", detail: "Le client filtre, choisit et télécharge lui-même" },
    ],
    beforeAfter: [
      { before: "La livraison passe par un lien de transfert qui expire", after: "Une galerie permanente à l'adresse de l'événement" },
      { before: "Le client télécharge tout, puis trie lui-même", after: "Il filtre par client et ne prend que ce qu'il lui faut" },
      { before: "Retrouver une photo six mois après suppose de redemander", after: "La galerie est toujours là, au même endroit" },
    ],
    relatedMetiers: ["1pecc", "nyl"],
    gains: [
      "Le client trouve ses photos sans rien demander",
      "Chaque événement garde sa galerie dans la durée",
      "Le tri se fait une fois, du bon côté",
    ],
    next: [
      { title: "Reconnaissance faciale", desc: "Chacun retrouve les photos où il apparaît en un selfie." },
      { title: "Livraison en direct", desc: "Les photos arrivent dans la galerie pendant l'événement." },
      { title: "Partage sur les réseaux", desc: "Les photos partagées sur les réseaux aux couleurs de la marque." },
      { title: "Branding automatique", desc: "Logo et habillage de l'événement appliqués à chaque photo." },
      { title: "Statistiques pour la marque", desc: "Vues, téléchargements et partages, photo par photo." },
      { title: "Sélection par l'IA", desc: "Les meilleures images repérées pour accélérer le tri." },
    ],
    photos: [
      {
        src: "/realisations/day-couverture.png",
        width: 1600,
        height: 866,
        screen: "Couverture de galerie",
        caption:
          "L'entrée de la galerie, aux couleurs de l'événement : la marque, les dates et le nombre de photos, avant même la première image.",
      },
      {
        src: "/realisations/day-galerie.jpg",
        width: 1553,
        height: 971,
        screen: "Galerie client",
        caption:
          "La galerie livrée au client, aux couleurs de son événement — et non un lien de transfert qui expire.",
      },
      {
        src: "/realisations/day-admin.png",
        width: 1127,
        height: 680,
        screen: "Espace admin",
        masked: true,
        caption:
          "L'espace admin de Day : les photos se classent par client et par journée, les incontournables se mettent en avant, les liens publics se gèrent au même endroit.",
      },
    ],
    photoAlt: "La galerie de livraison développée pour Day",
    quote: null,
  },
  {
    slug: "1pecc",
    published: true,
    headline: "Un logiciel pensé pour les entreprises de nettoyage",
    seo: {
      title: "Logiciel pour entreprise de nettoyage · NeX",
      description:
        "Planning des tournées, timbrage sur site, rentabilité par contrat et facturation dans un seul outil. Développé sur mesure pour une entreprise de nettoyage de Suisse romande.",
    },
    scene: {
      messages: [
        { de: "Verdona SA", heure: "06:41", texte: "Personne n'est passé ce matin ?" },
        { de: "Alina", heure: "07:12", texte: "Local containers fermé, je fais quoi ?" },
        { de: "Karim", heure: "07:48", texte: "Nacelle pas dispo, je reporte à jeudi" },
        { de: "Compta", heure: "17:30", texte: "Il me manque les heures pour facturer" },
      ],
      frictions: [
        "Le planning des tournées est un tableur que trois personnes modifient en même temps",
        "Les heures réellement passées sur site remontent par SMS, par photo, ou pas du tout",
        "Un cahier des charges signé, mais aucun moyen de prouver ce qui a été fait ce mois-ci",
        "La rentabilité d'un contrat ne se voit qu'à la facturation, un mois trop tard",
        "Chaque nouveau site oblige à tout ressaisir ailleurs",
      ],
      currentTools: ["Excel", "WhatsApp", "carnets papier", "Bexio"],
    },
    cost: [
      { titre: "Le temps", texte: "Chaque heure passée à reconstituer une information est une heure que vous n'avez vendue à personne." },
      { titre: "La marge", texte: "Un contrat qui dérape de trois heures par mois ne se voit qu'à la facturation. Douze fois par an." },
      { titre: "Le risque", texte: "Heures, majorations et déplacements sont encadrés par la CCT. Un décompte reconstitué de mémoire ne se défend pas." },
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
    client: "1pecc",
    logo: "/logos/1pecc.png",
    type: "Gestion d'exploitation",
    sector: "Nettoyage",
    summary:
      "Le planning des équipes, le timbrage sur site, le reporting de mission, la rentabilité et la facturation réunis dans un seul outil.",
    context:
      "1pecc est une entreprise de nettoyage qui intervient sur de nombreux sites, avec des équipes mobiles et des contrats aux périmètres très différents. Chaque intervention a son planning, ses heures réelles et son périmètre facturable.",
    problem:
      "Planifier, pointer, rendre compte, mesurer la rentabilité et facturer sont cinq opérations sur la même réalité. Tant qu'elles vivent dans des outils séparés, la même information doit être reprise à chaque étape — et la rentabilité d'un contrat ne se lit qu'une fois le mois clôturé.",
    solution:
      "Une plateforme unique où la mission se planifie, se pointe, se documente, se mesure et se facture. Ce qui est pointé sur site alimente tout le reste, jusqu'à la facture.",
    delivered: [
      { title: "Planning des équipes", desc: "Missions affectées par site : équipes et fréquences au même endroit." },
      { title: "Timbrage sur site", desc: "Les heures réelles, rattachées à leur mission." },
      { title: "Reporting de mission", desc: "Documenté sur place par les équipes, preuve à l'appui." },
      { title: "Rentabilité et facturation", desc: "Suivie contrat par contrat, facturée sur les heures pointées." },
    ],
    beforeAfter: [
      { before: "Le planning des tournées vit dans un tableur partagé", after: "Équipes, sites et fréquences au même endroit" },
      { before: "Les heures remontent par SMS, par photo, en fin de mois", after: "Le collaborateur pointe sur site, l'heure est rattachée à la mission" },
      { before: "La mission se raconte de mémoire", after: "Elle se documente sur place, preuve à l'appui" },
      { before: "La rentabilité se découvre à la facturation", after: "Elle se lit contrat par contrat, en cours de mois" },
      { before: "La facture se reconstruit à la main", after: "Elle se nourrit des heures réellement pointées" },
    ],
    relatedMetiers: ["artisans", "regie-immobiliere"],
    stats: [
      { value: "−1 h 45", label: "d'admin chaque semaine" },
      { value: "15", unit: "min", label: "pour planifier la semaine" },
      { value: "100", unit: "%", label: "des heures pointées facturées" },
    ],
    chain: [
      { label: "Planifier", detail: "Équipes, sites et fréquences au même endroit" },
      { label: "Pointer", detail: "Le collaborateur pointe sur site, l'heure se rattache à la mission" },
      { label: "Documenter", detail: "La mission se rend compte sur place, preuve à l'appui" },
      { label: "Mesurer", detail: "La rentabilité se lit contrat par contrat, en cours de mois" },
      { label: "Facturer", detail: "La facture se nourrit des heures réellement pointées" },
    ],
    gains: [
      "Une seule saisie, du terrain à la facture",
      "La rentabilité d'un contrat se lit sans attendre la clôture",
      "Les heures facturées correspondent aux heures pointées",
    ],
    next: [
      { title: "Planning optimisé par l'IA", desc: "Les tournées s'organisent selon les trajets, les disponibilités et les priorités." },
      { title: "Espace client", desc: "Les clients suivent les passages et signalent un problème en un clic." },
      { title: "Contrôle qualité par photo", desc: "L'IA vérifie les photos de fin de mission et signale les oublis." },
      { title: "Gestion des stocks", desc: "Les produits et le matériel suivis site par site, commandes comprises." },
      { title: "Paie préparée", desc: "Les heures pointées alimentent directement les salaires." },
      { title: "Devis automatiques", desc: "Un nouveau site se chiffre à partir des contrats existants." },
    ],
    photos: [
      {
        src: "/metiers/pecc-cockpit.jpg",
        width: 1400,
        height: 875,
        screen: "Cockpit",
        anonymised: true,
        caption:
          "L'état de l'entreprise en une ligne : missions en cours, chiffre d'affaires, masse salariale, marge — et ce qui reste à encaisser.",
      },
      {
        src: "/metiers/pecc-planning.jpg",
        width: 1400,
        height: 875,
        screen: "Planning",
        anonymised: true,
        caption:
          "Les missions du jour : horaires, chantiers, intervenants et statut de chacune.",
      },
      {
        src: "/metiers/pecc-perf.jpg",
        width: 1500,
        height: 937,
        screen: "Performance par chantier",
        anonymised: true,
        caption:
          "Chantier par chantier : les heures prévues face aux heures réellement pointées, l'écart, et la marge qui en découle.",
      },
      {
        src: "/metiers/pecc-problemes.jpg",
        width: 1400,
        height: 875,
        screen: "Remontées terrain",
        anonymised: true,
        caption:
          "Ce que le terrain remonte : local verrouillé, matériel manquant. Horodaté, nominatif, et traité depuis le bureau.",
      },
    ],
    photoAlt: "La plateforme de gestion d'exploitation développée pour 1pecc",
    quote: null,
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

/**
 * Garde-fou : les chiffres provisoires ne doivent pas partir en production.
 *
 * Un chiffre inventé au nom d'un client identifiable n'est pas une maquette
 * une fois en ligne — c'est une affirmation publique sur son entreprise. Ce
 * bloc les énumère à chaque build, en clair, y compris dans les logs de
 * déploiement. Le jour où tu as les vrais, retire `placeholder` : le message
 * disparaît tout seul.
 */
const PLACEHOLDER_STATS = CASES.filter((c) => c.published).flatMap((c) =>
  c.stats
    .filter((st) => st.placeholder)
    .map((st) => `${c.client} — « ${st.value}${st.unit ? " " + st.unit : ""} ${st.label} »`),
);

if (PLACEHOLDER_STATS.length > 0 && typeof window === "undefined") {
  console.warn(
    `\n⚠️  ${PLACEHOLDER_STATS.length} chiffre(s) PROVISOIRE(S) affiché(s) sur des réalisations publiées :\n` +
      PLACEHOLDER_STATS.map((m) => `      · ${m}`).join("\n") +
      `\n   Ce sont des chiffres inventés au nom de clients réels. À remplacer` +
      `\n   par les vrais — ou à retirer — avant toute mise en ligne.\n`,
  );
}


/** Les réalisations réellement publiables — la seule liste que les pages doivent lire. */
export const PUBLISHED_CASES: CaseStudy[] = CASES.filter((c) => c.published);

/**
 * Cas d'usage type : les métiers que nous n'avons pas encore équipés,
 * racontés dans la grammaire exacte d'une réalisation.
 *
 * Il y avait deux types de pages — « métier » et « réalisation » — qui
 * racontaient la même histoire dans le même ordre. Le visiteur lisait deux
 * fois la même chose. Il n'y a plus qu'une page, et elle part toujours d'un
 * métier : un client réel quand on en a un, un cas d'usage type sinon.
 *
 * Ici, tout est au conditionnel : pas de logo, pas de chiffre de résultat,
 * pas de capture. Ce qu'on montre, c'est la structure de l'outil et la
 * preuve empruntée aux métiers voisins, attribuée.
 */
export const EXAMPLES: CaseStudy[] = [
  {
    slug: "artisans",
    published: true,
    example: true,
    client: "Artisans",
    logo: "",
    type: "Logiciel métier sur mesure",
    sector: "Artisans",
    headline: "Un logiciel métier pour les artisans",
    seo: {
      title: "Logiciel pour artisan : devis, planning et bons de régie · NeX",
      description:
        "Plombiers, chauffagistes, électriciens, menuisiers, peintres : devis, planning d'interventions, bons de régie signés sur mobile et facturation sans ressaisie. Un outil sur mesure pour les artisans de Suisse romande.",
    },
    trades: [
      "Plombiers",
      "Chauffagistes",
      "Électriciens",
      "Menuisiers",
      "Charpentiers",
      "Peintres",
      "Carreleurs",
      "Couvreurs",
      "Ferblantiers",
      "Paysagistes",
    ],
    summary:
      "Entre le devis, le chantier et la facture, l'information change trois fois de support et perd quelque chose à chaque passage. Voici l'outil que nous construirions pour qu'une entreprise artisanale facture chaque heure travaillée.",
    context:
      "Entre le devis, le chantier et la facture, l'information change trois fois de support. Le devis est dans un logiciel, le planning dans un autre, les heures sur un carnet — et l'équipe qui part le matin ne sait pas toujours si le matériel est arrivé.",
    problem:
      "Ce qui se perd entre le chantier et le bureau, ce sont des heures travaillées qui ne seront jamais facturées. Chaque bon de régie reconstitué se paie deux fois, et chaque intervention de SAV commence par redécouvrir l'installation.",
    cost: [
      { titre: "Le temps", texte: "Chaque bon reconstitué se paie deux fois : une heure sur le chantier, une heure au bureau." },
      { titre: "La marge", texte: "Entre l'heure travaillée et l'heure facturée il y a une ressaisie. Ce qui se perd là ne revient jamais." },
      { titre: "Le risque", texte: "Un SAV sans historique, c'est une équipe qui redécouvre le chantier en arrivant." },
    ],
    solution:
      "Une seule chaîne, du devis à la facture. Le planning dit qui va où avec quoi, le bon de régie se remplit et se signe sur le chantier, et chaque installation garde son historique. La facture part des heures réellement pointées.",
    delivered: [
      { title: "Planning d'interventions", desc: "Qui va où, avec quoi, aujourd'hui. Une urgence se replace sans quatre coups de fil." },
      { title: "Bon de régie mobile", desc: "Heures, matériel et photos saisis sur le chantier, signés par le client sur l'écran." },
      { title: "Historique par chantier", desc: "Travaux réalisés, matériel posé, interventions : le SAV sait ce qu'il va trouver." },
      { title: "Facturation sans ressaisie", desc: "Le bon signé alimente directement la facture." },
    ],
    constraint:
      "Les équipes travaillent souvent en sous-sol, en cave ou en zone blanche. Un outil qui exige une connexion permanente ne sera pas utilisé — la saisie hors ligne, avec synchronisation au retour, n'est pas une option.",
    stats: [],
    chain: [
      { label: "Chiffrer", detail: "Le devis part du catalogue de la maison, avec ses postes et ses prix" },
      { label: "Planifier", detail: "Qui va où, avec quoi. Une urgence se replace sans quatre coups de fil" },
      { label: "Intervenir", detail: "Heures, matériel et photos se saisissent sur le chantier, signés sur l'écran" },
      { label: "Facturer", detail: "L'heure facturée est l'heure pointée, sans ressaisie entre les deux" },
      { label: "Reprendre", detail: "La fiche du site dit ce qui a été posé et quand, avant que le SAV parte" },
    ],
    beforeAfter: [
      { before: "Le devis, le planning et les heures vivent sur trois supports", after: "Une seule chaîne, du devis à la facture" },
      { before: "Le bon de régie revient froissé, ou ne revient pas", after: "Il se remplit et se signe sur le chantier, sur l'écran" },
      { before: "Le SAV redécouvre le chantier à chaque passage", after: "La fiche du site dit ce qui a été posé, et quand" },
    ],
    scene: {
      messages: [
        { de: "Mme Rochat", heure: "09:15", texte: "Vous passez à quelle heure ?" },
        { de: "Julien", heure: "11:30", texte: "La pièce est pas arrivée, j'attends" },
        { de: "Atelier", heure: "15:40", texte: "Le bon de Marc est illisible" },
        { de: "Note à moi-même", heure: "21:00", texte: "Saisir les heures du jour", moi: true },
      ],
      frictions: [
        "Le devis est sur un logiciel, le planning sur un autre, les heures sur un carnet",
        "Les bons de régie reviennent froissés, illisibles, ou ne reviennent pas",
        "Personne ne sait à midi si l'équipe de l'après-midi a le matériel",
        "Le SAV redécouvre le chantier à chaque intervention, faute d'historique",
        "Entre l'heure travaillée et l'heure facturée, il y a une ressaisie et une perte",
      ],
      currentTools: ["Vertec", "Sorba", "Messerli", "Bexio", "bons papier"],
    },
    relatedMetiers: ["1pecc", "pod-x"],
    gains: [
      "Un bon de régie rempli en moins d'une minute, signé sur place",
      "Chaque heure travaillée finit sur une facture",
      "Le SAV sait ce qu'il va trouver avant d'arriver",
    ],
    next: [
      { title: "Devis assisté par l'IA", desc: "Quelques photos du chantier, et l'IA prépare une première base de devis." },
      { title: "Commande de matériel", desc: "Le matériel manquant se commande depuis l'intervention planifiée." },
      { title: "Portail client", desc: "Le client voit l'heure de passage et signe le bon à distance." },
      { title: "Contrats d'entretien", desc: "Les entretiens annuels se planifient et se relancent tout seuls." },
      { title: "Tournées optimisées", desc: "Les interventions s'enchaînent selon les trajets et les urgences." },
      { title: "Assistant de chantier", desc: "Notices, historique et schémas accessibles à la voix, sur le chantier." },
    ],
    faq: [
      {
        q: "Nos équipes n'ont pas envie de saisir sur un téléphone.",
        a: "Ils n'en auront pas envie si ça leur prend plus de temps que le carnet. La règle qu'on s'impose : un bon de régie se remplit en moins d'une minute, matériel compris. S'il faut plus, on a mal conçu l'écran — et on le refait.",
      },
      {
        q: "Ça marche sans réseau, en sous-sol ?",
        a: "C'est une contrainte de départ, pas une option ajoutée après coup. La saisie se fait hors ligne et se synchronise au retour du réseau. Un outil qui l'ignore n'est pas utilisable sur un chantier.",
      },
      {
        q: "Peut-on le connecter à notre logiciel de devis ou de comptabilité ?",
        a: "Oui. Vertec, Sorba, Messerli ou Bexio gardent leur rôle : l'outil récupère vos clients et vos articles, et leur renvoie des heures et du matériel déjà justes. On part de ce que vous utilisez, on ne le remplace pas.",
      },
      {
        q: "Que peut-on y ajouter ensuite ?",
        a: "Tout ce qui s'appuie sur les mêmes données : devis préparés par l'IA à partir de photos du chantier, commande de matériel depuis l'intervention, contrats d'entretien relancés automatiquement, portail où le client suit l'heure de passage. On commence par le point qui coûte le plus, et l'outil grandit à votre rythme.",
      },
    ],
    photos: [],
    photoAlt: "Schéma de l'outil que NeX construirait pour un artisan",
    quote: null,
  },
  {
    slug: "courtier-assurances",
    published: true,
    example: true,
    client: "Courtiers",
    logo: "",
    type: "Outil de gestion sur mesure",
    sector: "Courtiers en assurances",
    headline: "Un outil sur mesure pour votre cabinet de courtage",
    seo: {
      title: "Logiciel sur mesure pour courtier en assurances · NeX",
      description:
        "Portefeuille clients, portail client, échéances, comparatifs d'offres, sinistres et commissions dans un seul outil. Un outil sur mesure pour les courtiers en assurances de Suisse romande.",
    },
    summary:
      "Polices, échéances, offres, sinistres, commissions : l'information d'un courtier vit entre un CRM, les portails des compagnies, Excel et la boîte mail. Voici l'outil que nous construirions pour tout rassembler, avec un portail pour vos clients — et ne plus jamais rater une échéance.",
    context:
      "Un cabinet de courtage travaille avec des dizaines de compagnies, chacune avec son portail, ses formats et ses délais. Les polices de chaque client, leurs échéances, les offres en cours et les sinistres vivent dans des outils différents — et la vue d'ensemble d'un client n'existe que dans la tête de son conseiller.",
    problem:
      "Une échéance ratée, c'est un client qui part chez un concurrent. Le comparatif d'offres se refait à la main à chaque renouvellement, les commissions se rapprochent sur Excel, et le suivi d'un sinistre dépend de qui s'en souvient.",
    cost: [
      { titre: "Le temps", texte: "Chaque comparatif refait à la main, chaque relevé de commissions rapproché ligne par ligne, c'est du temps qu'aucun client ne paie." },
      { titre: "La marge", texte: "Une commission non réclamée ou mal rapprochée ne se voit pas. Elle se perd, simplement." },
      { titre: "Le risque", texte: "Le devoir d'information impose de pouvoir montrer le conseil donné. Un conseil sans trace écrite ne se défend pas." },
    ],
    solution:
      "Un outil qui réunit tout le portefeuille : chaque client, ses polices, ses échéances, ses sinistres et les commissions qu'il rapporte. Et, dès le départ, un portail où chaque client retrouve ses contrats, télécharge ses attestations et déclare un sinistre lui-même — sans appeler le cabinet.",
    delivered: [
      { title: "Portefeuille client 360°", desc: "Polices, échéances, sinistres et documents au même endroit ; chaque renouvellement remonte à temps." },
      { title: "Portail client", desc: "Contrats, attestations et déclaration de sinistre, depuis le téléphone du client." },
      { title: "Comparatifs d'offres", desc: "Les offres des compagnies côte à côte, prêtes à présenter." },
      { title: "Commissions rapprochées", desc: "Les relevés des compagnies se rapprochent des polices, les écarts ressortent." },
    ],
    constraint:
      "La LSA impose au courtier un devoir d'information et la documentation du conseil donné. Un outil qui ne garde pas la trace de chaque recommandation — et de ce qui a été remis au client — laisse le cabinet exposé.",
    stats: [],
    chain: [
      { label: "Prospecter", detail: "La demande entre et se rattache au client, avec ses polices existantes" },
      { label: "Comparer", detail: "Les offres des compagnies arrivent et se comparent côte à côte" },
      { label: "Conseiller", detail: "La recommandation se documente et part au client pour signature" },
      { label: "Suivre", detail: "Échéances et renouvellements remontent au bon moment, le client suit ses sinistres sur son portail" },
      { label: "Encaisser", detail: "Les commissions se rapprochent des polices, les écarts ressortent" },
    ],
    beforeAfter: [
      { before: "Les polices d'un client sont réparties entre portails, Excel et emails", after: "Un portefeuille complet par client, toujours à jour" },
      { before: "Une échéance se rate parce que personne n'a pensé à regarder", after: "Elle remonte des mois avant, la relance prête" },
      { before: "Les commissions se rapprochent à la main sur Excel", after: "Les écarts ressortent tout seuls, compagnie par compagnie" },
      { before: "Chaque attestation ou question de couverture passe par un appel", after: "Le client trouve seul ses contrats et ses attestations sur son portail" },
    ],
    scene: {
      messages: [
        { de: "M. Favre", heure: "08:45", texte: "Mon assurance auto est renouvelée ou pas ?" },
        { de: "Mme Dubois", heure: "09:10", texte: "Le garage attend l'accord pour le sinistre" },
        { de: "Collègue", heure: "11:30", texte: "Tu as le comparatif RC pour Menuiserie Roux ?" },
        { de: "Note à moi-même", heure: "18:15", texte: "Rapprocher les commissions du trimestre", moi: true },
      ],
      frictions: [
        "Chaque compagnie a son portail, ses formats et ses délais",
        "Les échéances de polices se suivent dans un tableur ou dans l'agenda",
        "Un comparatif d'offres se refait à la main à chaque renouvellement",
        "Les commissions se rapprochent ligne par ligne sur Excel",
        "La vue complète d'un client n'existe que dans la tête de son conseiller",
      ],
      currentTools: ["Excel", "Outlook", "portails des compagnies", "CRM générique"],
    },
    relatedMetiers: ["nyl", "solve"],
    gains: [
      "Plus aucune échéance ratée, les renouvellements préparés d'avance",
      "Des clients autonomes : contrats, attestations et sinistres depuis leur portail",
      "Des comparatifs prêts en minutes, des commissions rapprochées sans Excel",
    ],
    next: [
      { title: "Lecture des polices par l'IA", desc: "Garanties, franchises, primes et échéances extraites des PDF des compagnies." },
      { title: "Comparatif rédigé par l'IA", desc: "Un comparatif argumenté, prêt à envoyer au client." },
      { title: "Bilan annuel automatique", desc: "Chaque client reçoit chaque année le point sur ses couvertures, prêt à discuter." },
      { title: "Signature électronique", desc: "Mandats et propositions signés en ligne, archivés au bon dossier." },
      { title: "Détection d'opportunités", desc: "Les clients sous-assurés ou sans couverture clé ressortent d'eux-mêmes." },
      { title: "Assistant IA pour les clients", desc: "Il répond aux questions de couverture, jour et nuit." },
    ],
    faq: [
      {
        q: "Peut-on reprendre notre portefeuille existant ?",
        a: "Oui. Clients, polices et échéances se reprennent depuis vos fichiers Excel ou votre CRM actuel. On nettoie les doublons au passage, et l'outil est utilisable dès le premier jour avec vos vraies données.",
      },
      {
        q: "L'outil peut-il lire les offres et les polices des compagnies ?",
        a: "C'est l'un des gains les plus forts : l'IA extrait des PDF les garanties, franchises, primes et échéances, et les range dans le portefeuille du client. Le conseiller vérifie au lieu de recopier.",
      },
      {
        q: "Nos clients utiliseront-ils vraiment un portail ?",
        a: "Oui, parce qu'il leur fait gagner du temps à eux aussi : une attestation téléchargée en dix secondes, un sinistre déclaré avec photos depuis le téléphone, leurs contrats toujours sous la main. Ceux qui préfèrent appeler continuent — mais chaque demande simple qui passe par le portail est un appel de moins pour le cabinet.",
      },
      {
        q: "Que peut-on y ajouter ensuite ?",
        a: "La signature électronique des mandats, un bilan annuel envoyé automatiquement à chaque client, un assistant IA qui répond aux questions de couverture, la détection des clients sous-assurés. On commence par ce qui coûte le plus, et l'outil grandit avec le cabinet.",
      },
    ],
    photos: [],
    photoAlt: "Schéma de l'outil que NeX construirait pour un courtier en assurances",
    quote: null,
  },
  {
    slug: "regie-immobiliere",
    published: true,
    example: true,
    client: "Régies",
    logo: "",
    type: "Outil de gestion sur mesure",
    sector: "Régies immobilières",
    headline: "Un outil sur mesure pour votre régie",
    seo: {
      title: "Logiciel sur mesure pour régie immobilière · NeX",
      description:
        "Portail locataire et propriétaire, suivi des interventions, dossier d'immeuble unifié. Ce que nous construirions pour une régie ou une gérance de Suisse romande.",
    },
    summary:
      "Demandes des locataires, suivi des travaux, dossier d'immeuble : l'information d'une régie est éparpillée entre un logiciel, une boîte mail et un classeur. Voici l'outil que nous construirions pour la rassembler.",
    context:
      "Une régie gère des dossiers dont l'information est éparpillée entre un logiciel de gestion, une boîte mail, un classeur et le téléphone de quelqu'un. Le jour où un propriétaire demande des comptes, on rassemble à la main ce qui aurait dû être disponible.",
    problem:
      "Rassembler n'est pas gérer. Les demandes des locataires se perdent entre deux appels, les travaux se suivent par email sans vue d'ensemble, et chaque décompte de charges oblige à reconstituer une dizaine de sources.",
    cost: [
      { titre: "Le temps", texte: "Rassembler n'est pas gérer. C'est du temps que le mandat ne paie pas." },
      { titre: "La marge", texte: "Une intervention non tracée est une intervention qu'on refacture mal — ou pas du tout." },
      { titre: "Le risque", texte: "Le droit du bail impose des délais et des formes. Un courrier reconstitué se conteste." },
    ],
    solution:
      "Un outil qui rattache tout au bien : la demande du locataire, l'ordre au prestataire, la facture, le bail et les états des lieux. Le propriétaire suit l'avancement depuis son portail, sans téléphoner.",
    delivered: [
      { title: "Portail locataire et propriétaire", desc: "La demande arrive écrite, horodatée, rattachée au lot." },
      { title: "Suivi des interventions", desc: "Du signalement à la facture, une seule chaîne par immeuble." },
      { title: "Dossier d'immeuble unifié", desc: "Baux, états des lieux, photos et travaux rattachés au bien." },
      { title: "Connecté à votre logiciel", desc: "Votre logiciel de gérance garde la comptabilité locative." },
    ],
    constraint:
      "Le droit du bail impose des délais et des formes précises — notification, contestation, restitution. Un outil qui ne les modélise pas produit des courriers attaquables.",
    stats: [],
    chain: [
      { label: "Signaler", detail: "Le locataire décrit le problème depuis son espace, photo à l'appui" },
      { label: "Rattacher", detail: "La demande se colle au lot, au bail et à l'historique de l'immeuble" },
      { label: "Intervenir", detail: "L'ordre part au prestataire ; son avancement se lit sans le relancer" },
      { label: "Rendre compte", detail: "Le propriétaire suit l'affaire depuis son portail, sans téléphoner" },
      { label: "Facturer", detail: "La facture rejoint le même dossier, imputée au bon poste" },
    ],
    beforeAfter: [
      { before: "La demande du locataire vit dans un appel téléphonique", after: "Elle arrive écrite, horodatée, rattachée au lot" },
      { before: "Le suivi des travaux se fait par email, sans vue d'ensemble", after: "Une chaîne unique, du signalement à la facture" },
      { before: "Le dossier d'immeuble est éparpillé entre quatre endroits", after: "Baux, états des lieux, photos et travaux au même endroit" },
    ],
    scene: {
      messages: [
        { de: "Locataire 3B", heure: "08:30", texte: "Dégât d'eau dans la salle de bain" },
        { de: "M. Perret", heure: "11:20", texte: "Où en sont les travaux du hall ?" },
        { de: "Concierge", heure: "14:05", texte: "Le prestataire n'est pas venu" },
        { de: "Note à moi-même", heure: "17:45", texte: "Rassembler les charges avant vendredi", moi: true },
      ],
      frictions: [
        "Les états des lieux vivent en PDF, les photos dans un téléphone",
        "Les demandes des locataires arrivent par téléphone et se perdent",
        "Le suivi des travaux se fait par email, sans vue d'ensemble",
        "Le décompte de charges oblige à rassembler une dizaine de sources",
        "Les PPE réclament de la transparence, on n'a que des classeurs",
      ],
      currentTools: ["Garaio REM", "Quorum", "Immotop", "Excel", "Outlook"],
    },
    relatedMetiers: ["1pecc", "welcomize"],
    gains: [
      "Chaque demande de locataire tracée, du signalement à la facture",
      "Des propriétaires qui suivent leurs travaux sans appeler",
      "Un décompte de charges qui se prépare en continu",
    ],
    next: [
      { title: "Assistant IA pour les locataires", desc: "Il répond aux questions courantes et qualifie les demandes, jour et nuit." },
      { title: "États des lieux sur tablette", desc: "Photos et signatures sur place, le PDF se génère tout seul." },
      { title: "Relances de loyers", desc: "Les retards de paiement sont suivis et relancés automatiquement." },
      { title: "Votes de PPE en ligne", desc: "Convocations, documents et votes d'assemblée au même endroit." },
      { title: "Maintenance planifiée", desc: "Les contrats d'entretien se relancent avant l'échéance." },
      { title: "Tableau de bord propriétaire", desc: "Rendement, travaux et vacance, immeuble par immeuble." },
    ],
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
        q: "Que peut faire l'IA pour une régie ?",
        a: "Qualifier les demandes des locataires et répondre aux plus simples, préparer les ordres d'intervention, résumer l'historique d'un immeuble avant un rendez-vous, rédiger les courriers dans les formes du droit du bail. Elle travaille sur vos propres données, rassemblées au même endroit.",
      },
      {
        q: "Peut-on commencer petit ?",
        a: "C'est même la règle. On part du point qui vous coûte le plus — souvent les demandes des locataires — puis on ajoute le suivi des travaux, le portail propriétaire, les états des lieux sur tablette, les votes de PPE en ligne. Chaque brique se branche sur la précédente.",
      },
    ],
    photos: [],
    photoAlt: "Schéma de l'outil que NeX construirait pour une régie",
    quote: null,
  },
];

/** Toutes les pages /realisations : réalisations publiées, puis cas d'usage type. */
export const ALL_STUDIES: CaseStudy[] = [...PUBLISHED_CASES, ...EXAMPLES];

/** Une page /realisations, réalisation ou cas d'usage type. */
export function getStudy(slug: string): CaseStudy | undefined {
  return ALL_STUDIES.find((c) => c.slug === slug);
}

/** L'URL d'une réalisation ou d'un cas d'usage type. */
export function caseHref(slug: string): string {
  return `/realisations/${slug}`;
}

/**
 * Les anciennes pages métier, redirigées en 301 vers la page qui les
 * remplace : le référencement acquis suit, et aucun lien extérieur ne casse.
 * Lu par next.config.ts.
 */
export const METIER_REDIRECTS: Record<string, string> = {
  "/metiers": "/realisations",
  "/metiers/entreprise-de-nettoyage": "/realisations/1pecc",
  "/metiers/fiduciaire": "/realisations/nyl",
  "/metiers/installateur-chauffage-sanitaire-electricite": "/realisations/artisans",
  // Installateurs, regroupés dans Artisans.
  "/realisations/installateur-chauffage-sanitaire-electricite": "/realisations/artisans",
  "/metiers/regie-immobiliere": "/realisations/regie-immobiliere",
};

/**
 * Ordre d'affichage sur la home. Welcomize en est volontairement absent ;
 * Solve et 1pecc apparaîtront dès que leur contenu sera renseigné.
 */
export const LANDING_CASE_SLUGS = ["solve", "1pecc", "pod-x", "c-carre", "day", "nyl"] as const;
