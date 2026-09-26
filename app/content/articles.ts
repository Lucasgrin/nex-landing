/**
 * Le blog. Un article = une question précise qu'un métier se pose en ce
 * moment, et une réponse complète — pas un texte d'ambiance.
 *
 * Trois publics lisent ces pages, et chacun doit y trouver son compte :
 *
 * - le prospect, qui cherche une solution à un problème qu'il vit cette
 *   semaine : le texte part de son quotidien et de son vocabulaire ;
 * - Google, qui classe les pages qui répondent le mieux à une requête : un
 *   titre qui reprend la question, des intertitres qui en posent d'autres,
 *   une FAQ, des données structurées ;
 * - les moteurs de réponse (ChatGPT, Perplexity, les aperçus IA de Google),
 *   qui citent les sources qui répondent vite et clairement : d'où le bloc
 *   « En bref » en tête, des phrases qui se suffisent à elles-mêmes, des
 *   tableaux, et des faits sourcés (article de loi, ordonnance, autorité).
 *
 * ⚠️ Règles de rédaction, non négociables :
 * - Aucune statistique inventée. Un chiffre est soit un fait vérifiable
 *   (article de loi, seuil légal), soit un exemple présenté comme tel et
 *   calculé sous les yeux du lecteur.
 * - Les obligations légales citées renvoient à leur texte. Tout résumé
 *   juridique est accompagné d'un renvoi au texte ou à l'autorité — une
 *   règle mal résumée se retourne contre nous.
 * - Pas d'affirmation d'expérience qu'on n'a pas : un métier que nous
 *   n'avons pas encore équipé est décrit par ce que l'outil ferait.
 *
 * Mini-syntaxe dans les textes : **gras** et [lien](/chemin).
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  /** note = encadré d'appui ; alert = mise en garde, sur fond noir. */
  | { type: "callout"; tone: "note" | "alert"; title: string; text: string }
  | { type: "table"; caption: string; head: string[]; rows: string[][] };

export interface ArticleSection {
  /** Ancre stable : elle sert au sommaire et aux liens profonds. */
  id: string;
  /** Idéalement une question — c'est ainsi qu'on la tape dans un moteur. */
  title: string;
  blocks: Block[];
}

export interface Article {
  slug: string;
  /** Le H1 : la promesse de l'article, dans les mots du lecteur. */
  title: string;
  /** Balise title : 60 caractères environ, la requête en tête. */
  metaTitle: string;
  /** 150 à 160 caractères : le problème, puis ce que l'article apporte. */
  metaDescription: string;
  /** Chapeau affiché sous le titre et sur les cartes. */
  excerpt: string;
  /** Le métier ou le thème, affiché en surtitre et utilisé pour filtrer. */
  topic: string;
  /** Pages /realisations auxquelles l'article se rattache (maillage croisé). */
  pages: string[];
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  /** Slug d'un membre de l'équipe (content/team.ts). */
  author: string;
  /** « En bref » : ce qu'un lecteur pressé — ou une IA — doit retenir. */
  tldr: string[];
  sections: ArticleSection[];
  faq: { q: string; a: string }[];
  /** L'appel posé au milieu de l'article, relié au problème qu'il traite. */
  cta: { title: string; text: string; href: string; label: string };
  featured?: boolean;
}

/** L'ordre des thèmes dans les filtres du blog. */
export const TOPICS = [
  "Stratégie & IA",
  "Artisans",
  "Fiduciaires",
  "Nettoyage",
  "Courtiers en assurances",
  "Régies immobilières",
  "Agences",
] as const;

const PUBLISHED = "2026-09-24";

const RAW_ARTICLES: Article[] = [
  // ───────────────────────────────────────────────────── Stratégie & IA ──
  {
    slug: "integrer-ia-pme-suisse-romande",
    featured: true,
    title: "Intégrer l'IA dans une PME romande : 6 usages rentables et 4 erreurs à éviter",
    metaTitle: "IA en PME : 6 usages rentables et 4 erreurs à éviter",
    metaDescription:
      "Tri des e-mails, lecture de documents, rapports, relances : où l'IA fait vraiment gagner du temps dans une PME romande, et comment rester conforme à la nLPD.",
    excerpt:
      "Tri des e-mails, lecture de pièces, rapports clients, relances : là où l'IA rapporte vraiment dans une PME de services — et les erreurs qui la transforment en gadget.",
    topic: "Stratégie & IA",
    pages: ["solve", "nyl"],
    keywords: ["intelligence artificielle PME", "IA Suisse romande", "automatisation IA", "nLPD IA", "IA entreprise de services"],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    author: "lucas-grin",
    tldr: [
      "L'IA rapporte d'abord sur les tâches répétitives à base de texte et de documents : e-mails, pièces, rapports, relances.",
      "Elle n'est vraiment utile que branchée sur vos propres données ; un assistant générique ouvert à côté des outils reste un gadget.",
      "Tout ce qui engage l'entreprise — un montant, un conseil, un courrier officiel — garde une validation humaine.",
      "La nLPD impose de savoir quelles données partent vers quel fournisseur, et où elles sont traitées.",
      "Commencez par un seul usage mesurable, prouvez le gain, puis étendez.",
    ],
    sections: [
      {
        id: "ou-l-ia-rapporte",
        title: "Où l'IA fait-elle vraiment gagner du temps ?",
        blocks: [
          {
            type: "p",
            text: "L'intelligence artificielle générative excelle dans un type de travail très précis : **lire, trier, résumer et rédiger à partir d'informations qui existent déjà**. C'est exactement ce qui encombre les journées d'une PME de services — bien plus que les tâches spectaculaires qu'on lui prête.",
          },
          {
            type: "table",
            caption: "Six usages rentables, du plus simple au plus ambitieux",
            head: ["Usage", "Ce que fait l'IA", "Métiers concernés"],
            rows: [
              ["Tri des e-mails", "Classe, résume, propose une pré-réponse", "Agences, régies, courtiers"],
              ["Lecture de documents", "Extrait montants, dates, garanties d'un PDF ou d'une photo", "Fiduciaires, courtiers"],
              ["Rapports", "Rédige un rapport à partir des chiffres réels", "Agences, fiduciaires"],
              ["Relances", "Prépare et programme la relance au bon moment", "Tous"],
              ["Devis", "Prépare une base de devis à partir d'une demande et de photos", "Artisans"],
              ["Assistant interne", "Répond aux questions de l'équipe sur les dossiers", "Tous"],
            ],
          },
          {
            type: "p",
            text: "Deux exemples concrets. Chez [Solve](/realisations/solve), une agence de marketing, un rapport client qui demandait deux heures sort désormais en trente secondes, parce que l'IA travaille directement sur les chiffres de l'agence. Chez [NYL](/realisations/nyl), une fiduciaire, la lecture automatique des pièces prépare les écritures que l'équipe n'a plus qu'à valider.",
          },
        ],
      },
      {
        id: "brancher-sur-vos-donnees",
        title: "Pourquoi l'IA doit-elle être branchée sur vos données ?",
        blocks: [
          {
            type: "p",
            text: "La plupart des déceptions viennent d'un malentendu. On ouvre un assistant conversationnel à côté de ses outils, on y colle des extraits, et on s'étonne qu'il ne change pas grand-chose. C'est normal : **une IA générique ne connaît ni vos clients, ni vos prix, ni vos process**.",
          },
          {
            type: "p",
            text: "Le gain apparaît quand l'IA est intégrée là où l'information vit — dans le CRM, dans la file des pièces, dans le planning. Elle peut alors agir, et plus seulement discuter : préparer une relance avec l'historique du client, pré-remplir une écriture, proposer un planning qui tient compte des priorités réelles.",
          },
          {
            type: "callout",
            tone: "note",
            title: "Le test simple",
            text: "Si, pour utiliser l'IA, quelqu'un doit copier des informations depuis un outil pour les coller ailleurs, l'intégration est à l'envers. L'IA doit venir aux données, pas l'inverse.",
          },
        ],
      },
      {
        id: "erreurs",
        title: "Quelles sont les 4 erreurs les plus fréquentes ?",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "**Commencer par l'outil plutôt que par le problème.** « Il nous faut de l'IA » n'est pas un objectif ; « nos rapports clients prennent deux heures chacun » en est un.",
              "**Supprimer la validation humaine.** Ce qui engage l'entreprise — un montant, un conseil, un courrier officiel — doit être relu. L'IA prépare, l'humain décide.",
              "**Ignorer la question des données.** Envoyer des données clients à un service étranger sans le savoir est un risque juridique et commercial.",
              "**Tout lancer d'un coup.** Un usage bien mesuré convainc l'équipe ; dix usages à moitié adoptés la découragent.",
            ],
          },
        ],
      },
      {
        id: "nlpd",
        title: "IA et nLPD : que faut-il vérifier ?",
        blocks: [
          {
            type: "p",
            text: "Depuis le 1er septembre 2023, la nouvelle loi fédérale sur la protection des données (nLPD) s'applique. Pour un projet d'IA, elle se traduit par quatre questions très concrètes, à poser avant de brancher quoi que ce soit :",
          },
          {
            type: "list",
            items: [
              "**Quelles données sont envoyées** au modèle, et sont-elles toutes nécessaires ?",
              "**Où sont-elles traitées**, et le pays offre-t-il un niveau de protection adéquat ?",
              "**Le fournisseur les réutilise-t-il** pour entraîner ses modèles ?",
              "**Les personnes concernées sont-elles informées**, par exemple dans votre politique de confidentialité ?",
            ],
          },
          {
            type: "callout",
            tone: "alert",
            title: "Bonne pratique",
            text: "Choisissez des fournisseurs qui n'entraînent pas leurs modèles sur vos données, limitez ce qui est transmis au strict nécessaire, et documentez ces choix. Pour les données sensibles, un traitement en Suisse ou dans un pays reconnu comme adéquat simplifie nettement la conformité. En cas de doute, le Préposé fédéral à la protection des données (PFPDT) publie des guides pratiques.",
          },
        ],
      },
      {
        id: "par-ou-commencer",
        title: "Par où commencer ?",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "**Listez les tâches répétitives** à base de texte ou de documents, et estimez le temps qu'elles prennent chaque semaine.",
              "**Choisissez-en une**, fréquente et mesurable.",
              "**Branchez l'IA sur les données concernées**, avec une validation humaine.",
              "**Mesurez pendant un mois**, puis décidez d'étendre — ou non.",
            ],
          },
          {
            type: "p",
            text: "Notre [diagnostic gratuit](/diagnostic) vous aide à repérer ces tâches en cinq minutes. Et pour voir une IA réellement intégrée à la gestion d'une entreprise, l'[étude de cas Solve](/realisations/solve) en est l'exemple le plus complet.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Par quoi une PME doit-elle commencer avec l'IA ?",
        a: "Par une tâche répétitive, fréquente et mesurable à base de texte ou de documents — tri des e-mails, lecture de pièces, rapports clients. On mesure le gain pendant un mois avant d'étendre à d'autres usages.",
      },
      {
        q: "L'IA est-elle compatible avec la nLPD ?",
        a: "Oui, à condition de maîtriser les données transmises, de savoir où elles sont traitées, de choisir des fournisseurs qui ne les réutilisent pas pour l'entraînement et d'informer les personnes concernées.",
      },
      {
        q: "L'IA peut-elle remplacer un collaborateur ?",
        a: "Dans une PME, elle remplace surtout des tâches, pas des postes : elle retire le travail répétitif pour que l'équipe se concentre sur le conseil, la relation client et la production.",
      },
      {
        q: "Faut-il un logiciel sur mesure pour utiliser l'IA ?",
        a: "Pas toujours. Mais l'IA donne sa pleine mesure quand elle accède à toutes les données de l'entreprise au même endroit, ce qu'un outil sur mesure permet plus facilement qu'un empilement d'abonnements.",
      },
    ],
    cta: {
      title: "Où l'IA ferait-elle gagner du temps chez vous ?",
      text: "Le diagnostic gratuit repère en cinq minutes les tâches répétitives qui coûtent le plus à votre entreprise.",
      href: "/diagnostic",
      label: "Faire le diagnostic gratuit",
    },
  },

  {
    slug: "logiciel-sur-mesure-ou-saas-grille-de-decision",
    title: "Logiciel sur mesure ou SaaS : la grille de décision pour une PME romande",
    metaTitle: "Logiciel sur mesure ou SaaS : comment décider",
    metaDescription:
      "Coût sur 5 ans, process, intégrations, données : une grille honnête pour choisir entre logiciel du marché et outil sur mesure — et savoir quand dire non.",
    excerpt:
      "Six critères pour trancher honnêtement entre un logiciel du marché et un outil sur mesure — y compris les cas où le sur mesure est une mauvaise idée.",
    topic: "Stratégie & IA",
    pages: ["nyl", "1pecc"],
    keywords: ["logiciel sur mesure", "SaaS ou sur mesure", "logiciel métier PME", "développement logiciel Suisse romande", "coût logiciel sur mesure"],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    author: "lucas-grin",
    tldr: [
      "Un logiciel du marché est souvent le bon choix quand vos process sont standards et qu'il couvre l'essentiel sans contournement.",
      "Le sur mesure se justifie quand votre façon de travailler est un avantage, ou quand les contournements coûtent plus cher que l'outil.",
      "Comparez sur trois à cinq ans : abonnements par utilisateur, temps perdu, intégrations et coût de sortie.",
      "La solution la plus fréquente est hybride : la comptabilité reste sur le marché, la couche métier est construite sur mesure.",
      "Un bon partenaire vous dit aussi quand le sur mesure n'est pas la bonne réponse.",
    ],
    sections: [
      {
        id: "la-vraie-question",
        title: "Quelle est la vraie question à se poser ?",
        blocks: [
          {
            type: "p",
            text: "Posée comme « sur mesure ou pas ? », la question mène à des réponses idéologiques. La bonne question est plus précise : **quelle part de votre activité un logiciel du marché couvre-t-il sans contournement, et combien vous coûte le reste ?**",
          },
          {
            type: "p",
            text: "Un contournement, c'est un tableur tenu à côté de l'outil, une information recopiée d'un logiciel à l'autre, une étape faite à la main parce que le logiciel ne la prévoit pas. Chacun semble anodin. Ensemble, ils sont souvent la partie la plus coûteuse — et la moins visible — de votre informatique.",
          },
        ],
      },
      {
        id: "grille",
        title: "La grille de décision en six critères",
        blocks: [
          {
            type: "table",
            caption: "Six critères pour trancher",
            head: ["Critère", "Plutôt un logiciel du marché", "Plutôt du sur mesure"],
            rows: [
              ["Process", "Standards, identiques à ceux du secteur", "Propres à l'entreprise, source d'avantage"],
              ["Couverture", "L'essentiel est couvert sans contournement", "Tableurs et ressaisies comblent les trous"],
              ["Nombre d'outils", "Un ou deux outils suffisent", "Plusieurs outils à faire communiquer"],
              ["Coût sur 5 ans", "Abonnements modérés, équipe stable", "Abonnements par utilisateur qui grimpent"],
              ["Données et IA", "Pas besoin de croiser les données", "Besoin d'une vue unique et d'une IA sur l'ensemble"],
              ["Évolution", "Le fournisseur suit vos besoins", "Vos besoins évoluent plus vite que l'offre"],
            ],
          },
          {
            type: "callout",
            tone: "note",
            title: "Comment lire la grille",
            text: "Si la majorité de vos réponses se trouvent dans la colonne du milieu, gardez un logiciel du marché et investissez dans sa bonne utilisation. Si elles penchent à droite, le sur mesure mérite d'être chiffré sérieusement.",
          },
        ],
      },
      {
        id: "comparer-les-couts",
        title: "Comment comparer les coûts sur la bonne durée ?",
        blocks: [
          {
            type: "p",
            text: "Comparer le prix d'un développement au prix d'un abonnement mensuel n'a pas de sens. Il faut comparer des **coûts totaux sur trois à cinq ans** :",
          },
          {
            type: "list",
            items: [
              "**Côté logiciel du marché** : abonnements (souvent par utilisateur), modules complémentaires, intégrations, temps passé sur les contournements, et coût de migration le jour où vous changez.",
              "**Côté sur mesure** : développement initial, hébergement, maintenance et évolutions.",
            ],
          },
          {
            type: "p",
            text: "Le résultat varie fortement d'une entreprise à l'autre. C'est précisément pour cela qu'il faut le faire avec vos chiffres, pas avec une moyenne trouvée en ligne.",
          },
        ],
      },
      {
        id: "hybride",
        title: "Pourquoi la solution est souvent hybride",
        blocks: [
          {
            type: "p",
            text: "Dans la majorité des projets, la réponse n'est ni tout sur mesure, ni tout du marché. **La comptabilité reste sur Bexio, Abacus ou Crésus**, qui font très bien leur travail. Ce qui se construit sur mesure, c'est la couche métier — celle qui colle à votre façon de travailler — connectée à ces outils.",
          },
          {
            type: "p",
            text: "C'est le cas de [NYL](/realisations/nyl), dont l'outil de traitement des pièces alimente le logiciel comptable existant, ou de [1PECC](/realisations/1pecc), dont les heures pointées sur le terrain partent directement vers la facturation.",
          },
        ],
      },
      {
        id: "quand-dire-non",
        title: "Quand le sur mesure n'est-il pas la bonne réponse ?",
        blocks: [
          {
            type: "list",
            items: [
              "vos process sont standards et un logiciel reconnu les couvre ;",
              "votre équipe est très petite et le besoin ne justifie pas l'investissement ;",
              "le problème vient de l'utilisation de l'outil actuel, pas de l'outil lui-même.",
            ],
          },
          {
            type: "p",
            text: "Dans ces cas-là, un bon partenaire vous le dit. C'est ce que nous faisons au premier appel : trente minutes pour regarder vos process et vous dire honnêtement si un outil sur mesure vaut le coup — ou non.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Combien de temps faut-il pour développer un logiciel sur mesure ?",
        a: "Cela dépend du périmètre. L'approche la plus sûre consiste à commencer par le module qui coûte le plus cher aujourd'hui, à le mettre en service rapidement, puis à ajouter les briques suivantes.",
      },
      {
        q: "Un logiciel sur mesure peut-il se connecter à Bexio ou Abacus ?",
        a: "Oui. C'est même l'approche la plus fréquente : la comptabilité reste dans le logiciel du marché, et l'outil sur mesure lui transmet des données déjà justes.",
      },
      {
        q: "Que devient mon logiciel si le prestataire disparaît ?",
        a: "C'est une question à poser dès le départ : propriété du code, documentation, hébergement et possibilité de reprise par un autre prestataire doivent être prévus contractuellement.",
      },
      {
        q: "Le sur mesure est-il réservé aux grandes entreprises ?",
        a: "Non. Pour une PME, commencer par un périmètre réduit, centré sur le point qui coûte le plus, rend l'investissement accessible et rentable rapidement.",
      },
    ],
    cta: {
      title: "Vous hésitez entre un logiciel du marché et un outil à vous ?",
      text: "En 30 minutes, nous regardons vos process et vous disons honnêtement si le sur mesure vaut le coup chez vous.",
      href: "/diagnostic",
      label: "Faire le diagnostic gratuit",
    },
  },

  // ─────────────────────────────────────────────────────────── Artisans ──
  {
    slug: "bon-de-regie-numerique-artisan",
    title: "Bons de régie : combien d'heures un artisan perd-il vraiment, et comment les récupérer ?",
    metaTitle: "Bon de régie numérique : récupérer les heures perdues",
    metaDescription:
      "Bons perdus, illisibles, saisis le soir : les heures en régie jamais facturées. Le calcul à faire, et comment passer au bon numérique signé sur le chantier.",
    excerpt:
      "Un carnet dans la camionnette, trois ressaisies, une facture des semaines plus tard : là où partent les heures en régie — et comment les récupérer.",
    topic: "Artisans",
    pages: ["artisans"],
    keywords: ["bon de régie", "bon de régie numérique", "travaux en régie", "logiciel artisan", "facturation artisan", "SIA 118"],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    author: "lucas-grin",
    tldr: [
      "Une heure en régie non notée sur le moment a de fortes chances de ne jamais être facturée.",
      "Le problème n'est pas le papier en soi, mais les ressaisies entre le chantier, le bureau et la facture.",
      "Un bon de régie numérique utile se remplit en moins d'une minute, fonctionne hors ligne et se fait signer sur place.",
      "La signature du client sur le chantier règle d'avance la plupart des contestations de facture.",
      "Commencez par mesurer : combien de bons reviennent incomplets chaque mois ?",
    ],
    sections: [
      {
        id: "pourquoi-heures-perdues",
        title: "Pourquoi les heures en régie se perdent-elles ?",
        blocks: [
          {
            type: "p",
            text: "Un travail en régie est facturé au temps passé et au matériel utilisé, plutôt qu'au forfait. C'est aussi, dans la plupart des entreprises artisanales, **la partie de la facturation la plus fragile** — non parce que les équipes oublient par négligence, mais parce que l'information passe par trop de mains avant d'arriver sur la facture.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Sur le chantier, l'ouvrier note ses heures et le matériel sur un carnet — quand il y pense, entre deux interventions.",
              "Le carnet voyage dans la camionnette, parfois plusieurs jours.",
              "Au bureau, quelqu'un déchiffre, reconstitue ce qui manque en téléphonant, puis ressaisit dans le logiciel de facturation.",
              "La facture part des semaines plus tard, et le client ne se souvient plus de ce qui a été fait.",
            ],
          },
          {
            type: "p",
            text: "À chaque étape, quelque chose se perd : une demi-heure arrondie vers le bas, une pièce oubliée, un déplacement jamais noté. Pris isolément, rien de dramatique. Additionné sur une année et une équipe, c'est souvent l'équivalent de plusieurs semaines de travail données gratuitement.",
          },
        ],
      },
      {
        id: "combien-ca-coute",
        title: "Combien ça coûte : le calcul à faire chez vous",
        blocks: [
          {
            type: "p",
            text: "Aucun chiffre générique ne vaut le vôtre. Le calcul, lui, est simple — et il vaut la peine d'être fait une fois, crayon en main.",
          },
          {
            type: "table",
            caption: "Exemple chiffré — à refaire avec vos propres valeurs",
            head: ["Hypothèse", "Valeur d'exemple"],
            rows: [
              ["Heures en régie non facturées, par ouvrier et par semaine", "1 h"],
              ["Nombre d'ouvriers", "6"],
              ["Semaines travaillées par an", "46"],
              ["Tarif horaire facturé", "CHF 95.–"],
              ["Manque à gagner annuel", "CHF 26 220.–"],
            ],
          },
          {
            type: "p",
            text: "À cela s'ajoute le temps administratif : chaque bon reconstitué au bureau se paie une deuxième fois, en heures de secrétariat ou en soirées du patron. Et un coût plus difficile à chiffrer : la facture contestée, parce que le client ne reconnaît pas les heures et qu'aucune signature ne les confirme.",
          },
          {
            type: "callout",
            tone: "note",
            title: "Le test des trente jours",
            text: "Pendant un mois, notez chaque bon qui revient incomplet, illisible ou en retard, et le temps passé à le reconstituer. Ce seul chiffre vous dira si le sujet mérite un outil — ou simplement une meilleure discipline.",
          },
        ],
      },
      {
        id: "bon-numerique-qui-marche",
        title: "À quoi ressemble un bon de régie numérique qui marche vraiment ?",
        blocks: [
          {
            type: "p",
            text: "Passer au numérique ne suffit pas. Un formulaire sur téléphone mal pensé est abandonné en deux semaines, et le carnet revient. Ce qui fait la différence, ce sont quelques règles de conception très concrètes :",
          },
          {
            type: "list",
            items: [
              "**Moins d'une minute par bon.** Le chantier, le client et les articles courants sont déjà chargés : l'ouvrier ne saisit que ce qui a changé.",
              "**Hors ligne d'abord.** Caves, sous-sols, zones sans réseau : la saisie fonctionne sans connexion et se synchronise au retour.",
              "**La photo comme preuve.** Avant, après, la pièce remplacée : une photo horodatée vaut mieux qu'une longue description.",
              "**La signature du client sur l'écran.** Elle transforme un bon en accord, au moment où le travail est frais dans les deux mémoires.",
              "**Zéro ressaisie derrière.** Le bon signé alimente directement la facture.",
            ],
          },
          {
            type: "p",
            text: "La règle que nous nous imposons est simple : **si un ouvrier met plus de temps à remplir le bon numérique qu'à griffonner son carnet, c'est l'écran qui est mal conçu**, pas l'ouvrier.",
          },
        ],
      },
      {
        id: "signature-sur-chantier",
        title: "Pourquoi la signature sur le chantier change-t-elle tout ?",
        blocks: [
          {
            type: "p",
            text: "Une facture en régie est presque toujours contestée pour la même raison : le client découvre des heures qu'il n'a pas vu passer. Des semaines plus tard, c'est sa parole contre la vôtre.",
          },
          {
            type: "p",
            text: "Faire signer le bon sur place renverse la situation. Le client voit les heures, le matériel et les photos au moment où le travail vient d'être fait ; il pose ses questions tout de suite, et sa signature confirme ce qui sera facturé. Les litiges ne disparaissent pas tous, mais **ils se règlent sur le chantier plutôt que par courrier**.",
          },
          {
            type: "callout",
            tone: "alert",
            title: "Chantiers sous norme SIA 118",
            text: "Lorsque le contrat se réfère à la norme SIA 118, les travaux en régie sont consignés dans des rapports soumis à la direction des travaux pour contrôle. Un bon numérique daté, signé et accompagné de photos s'inscrit exactement dans cette logique. Vérifiez toujours ce que prévoit votre contrat.",
          },
        ],
      },
      {
        id: "par-ou-commencer",
        title: "Par où commencer sans tout changer ?",
        blocks: [
          {
            type: "p",
            text: "Inutile de remplacer votre logiciel de devis ou votre comptabilité : Bexio, Sorba, Messerli ou Vertec font bien leur travail. Ce qui manque, c'est le chaînon entre le chantier et eux.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "**Mesurez** pendant un mois les bons incomplets et le temps passé à les reconstituer.",
              "**Choisissez une équipe pilote** — idéalement celle qui râle le plus contre le papier.",
              "**Branchez le bon numérique sur votre facturation existante**, pour que le gain soit visible dès la première facture.",
              "**Étendez ensuite** au planning, à l'historique par chantier, aux commandes de matériel.",
            ],
          },
          {
            type: "p",
            text: "C'est exactement la chaîne que nous décrivons sur notre page [logiciel pour artisans](/realisations/artisans) : du devis à la facture, construite autour de votre façon de travailler.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Qu'est-ce qu'un bon de régie ?",
        a: "C'est le document qui consigne le temps passé et le matériel utilisé pour un travail facturé au temps plutôt qu'au forfait. Signé par le client ou la direction des travaux, il sert de base à la facturation.",
      },
      {
        q: "Un bon de régie signé sur écran a-t-il de la valeur ?",
        a: "Il documente l'accord du client sur les heures et le matériel, avec la date et des photos. En pratique, c'est une preuve plus solide qu'un carnet reconstitué après coup. Pour un enjeu juridique particulier, votre contrat et votre conseil restent la référence.",
      },
      {
        q: "Faut-il une connexion internet sur le chantier ?",
        a: "Non, si l'outil est bien conçu : la saisie fonctionne hors ligne et se synchronise dès que le réseau revient. C'est une exigence de départ pour les métiers qui travaillent en sous-sol ou en zone blanche.",
      },
      {
        q: "Peut-on garder notre logiciel de facturation actuel ?",
        a: "Oui. Le bon numérique se connecte à Bexio, Sorba, Messerli ou Vertec : il leur transmet des heures et du matériel déjà justes, sans ressaisie.",
      },
    ],
    cta: {
      title: "Vous perdez des heures entre le chantier et la facture ?",
      text: "Voyez l'outil que nous construirions pour une entreprise artisanale : planning, bons de régie signés sur place, facturation sans ressaisie.",
      href: "/realisations/artisans",
      label: "Voir le logiciel pour artisans",
    },
  },

  {
    slug: "chauffagiste-afflux-demandes-renovation-energetique",
    title: "Rénovation énergétique : comment un chauffagiste absorbe l'afflux de demandes sans y laisser ses soirées",
    metaTitle: "Chauffagiste : absorber l'afflux de demandes (PAC)",
    metaDescription:
      "Chauffages fossiles à remplacer, pompes à chaleur, subventions : les demandes affluent. Qualifier, chiffrer et planifier plus vite, sans recruter.",
    excerpt:
      "Pompes à chaleur, subventions, clients qui relancent : quand le goulot d'un chauffagiste n'est plus le terrain mais tout ce qui l'entoure.",
    topic: "Artisans",
    pages: ["artisans"],
    keywords: ["chauffagiste", "pompe à chaleur", "rénovation énergétique", "Programme Bâtiments", "logiciel chauffagiste", "devis pompe à chaleur"],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    author: "lucas-grin",
    tldr: [
      "Le remplacement des chauffages fossiles remplit les carnets de commandes : le goulot n'est plus commercial, il est administratif.",
      "Chaque demande mal qualifiée coûte une visite, un appel et un devis pour rien.",
      "Un formulaire structuré — photos, type d'installation, surface, calendrier — permet de trier avant de se déplacer.",
      "Les dossiers de subvention se suivent au même endroit que le chantier, avec leurs pièces et leurs échéances.",
      "Le planning doit croiser trois contraintes : équipes, livraison du matériel, calendrier du client.",
    ],
    sections: [
      {
        id: "pourquoi-afflux",
        title: "Pourquoi les demandes explosent-elles ?",
        blocks: [
          {
            type: "p",
            text: "Les lois cantonales sur l'énergie, les objectifs climatiques et les subventions à la rénovation — le Programme Bâtiments et les programmes cantonaux — poussent de nombreux propriétaires à remplacer leur chaudière à mazout ou à gaz. Pompes à chaleur, raccordements au chauffage à distance, solaire thermique : les projets se multiplient.",
          },
          {
            type: "p",
            text: "Pour un chauffagiste ou un installateur sanitaire, c'est une excellente nouvelle sur le papier. Dans la réalité, c'est souvent une file d'attente qui s'allonge, des clients qui relancent, et un patron qui passe ses soirées à chiffrer des projets qui ne se concrétiseront jamais.",
          },
          {
            type: "callout",
            tone: "note",
            title: "Le vrai goulot",
            text: "Dans une entreprise de chauffage type, le goulot n'est pas le nombre de techniciens sur le terrain. C'est le temps administratif autour de chaque projet : qualifier, visiter, chiffrer, relancer, constituer le dossier de subvention.",
          },
        ],
      },
      {
        id: "qualifier-avant-de-se-deplacer",
        title: "Comment qualifier une demande avant de se déplacer ?",
        blocks: [
          {
            type: "p",
            text: "Une visite technique coûte une demi-journée. Faite pour un projet qui n'aboutira pas, elle est perdue. Le premier levier consiste donc à **trier en amont**, sans alourdir la démarche du client. Un formulaire bien conçu — sur votre site ou envoyé par lien — recueille en cinq minutes ce qu'il faut pour décider :",
          },
          {
            type: "list",
            items: [
              "le type d'installation actuelle et son année, photos de la chaufferie à l'appui ;",
              "la surface chauffée et le type de bâtiment ;",
              "le calendrier souhaité et l'urgence — panne ou projet planifié ;",
              "l'intérêt pour une subvention et l'état du dossier ;",
              "le budget envisagé, même approximatif.",
            ],
          },
          {
            type: "p",
            text: "Avec ces informations, chaque demande se classe en trois catégories : **à chiffrer à distance, à visiter en priorité, ou à orienter ailleurs**. Le client, lui, reçoit une réponse rapide et sait où il en est.",
          },
        ],
      },
      {
        id: "chiffrer-plus-vite",
        title: "Comment chiffrer plus vite sans baisser la qualité ?",
        blocks: [
          {
            type: "p",
            text: "Un devis de remplacement de chauffage se ressemble souvent d'un projet à l'autre : dépose de l'ancienne installation, fourniture, pose, mise en service, options. Le reconstruire de zéro à chaque fois est un luxe que peu d'entreprises peuvent encore s'offrir.",
          },
          {
            type: "list",
            items: [
              "**Des modèles de devis par type de projet**, alimentés par votre catalogue et vos prix réels.",
              "**Les données du formulaire reprises automatiquement** : pas de ressaisie de l'adresse, de la surface ou de l'installation.",
              "**Des variantes côte à côte** — pompe air-eau, sol-eau, options — pour que le client choisisse sans trois allers-retours.",
              "**Une relance programmée** pour chaque devis envoyé, sans y penser.",
            ],
          },
          {
            type: "callout",
            tone: "note",
            title: "Et l'IA ?",
            text: "À partir des photos de la chaufferie et des réponses du formulaire, une IA peut préparer une première base de devis que le technicien vérifie et ajuste. Elle ne remplace pas la visite quand elle est nécessaire — elle évite celles qui ne le sont pas.",
          },
        ],
      },
      {
        id: "subventions",
        title: "Comment suivre les dossiers de subvention sans rien laisser filer ?",
        blocks: [
          {
            type: "p",
            text: "Les subventions à la rénovation énergétique obéissent à des règles précises, qui varient d'un canton à l'autre : dans de nombreux cas, la demande doit être déposée **avant le début des travaux**, avec des pièces justificatives et des délais de réalisation. Un dossier incomplet peut coûter la subvention au client — et votre relation avec lui.",
          },
          {
            type: "p",
            text: "Suivis dans un tableur à côté du planning, ces dossiers finissent toujours par glisser. Rattachés au chantier, avec leurs échéances et leurs pièces manquantes, ils deviennent une étape du projet comme une autre.",
          },
          {
            type: "callout",
            tone: "alert",
            title: "À vérifier canton par canton",
            text: "Les conditions et les montants des subventions évoluent régulièrement et diffèrent selon les cantons. Un outil peut rappeler les échéances et les pièces à fournir ; la règle applicable reste celle publiée par votre canton au moment de la demande.",
          },
        ],
      },
      {
        id: "planifier",
        title: "Comment planifier avec trois contraintes à la fois ?",
        blocks: [
          {
            type: "p",
            text: "Un chantier de remplacement de chauffage ne se planifie pas seulement avec la disponibilité des équipes. Il faut aussi que le matériel soit livré — les délais sur certains équipements peuvent être longs — et que le calendrier du client et de la subvention soit respecté.",
          },
          {
            type: "p",
            text: "Un planning qui croise ces trois informations évite les deux scénarios les plus coûteux : **l'équipe qui arrive sans le matériel, et le matériel qui dort au dépôt faute d'équipe disponible**.",
          },
          {
            type: "p",
            text: "C'est cette chaîne — de la demande qualifiée à la facture — que nous décrivons pour les [entreprises artisanales](/realisations/artisans). Et pour mesurer d'abord le temps perdu chez vous, notre [diagnostic gratuit](/diagnostic) prend cinq minutes.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Comment réduire le nombre de visites techniques inutiles ?",
        a: "En qualifiant chaque demande avant de se déplacer : un formulaire structuré avec photos, type d'installation, surface et calendrier permet de chiffrer une partie des projets à distance et de réserver les visites à ceux qui en ont vraiment besoin.",
      },
      {
        q: "Peut-on automatiser les devis de pompes à chaleur ?",
        a: "En grande partie. Des modèles par type de projet, alimentés par votre catalogue et les données du formulaire, produisent une base de devis en quelques minutes. Le technicien garde la validation finale.",
      },
      {
        q: "Un logiciel peut-il gérer les dossiers de subvention ?",
        a: "Il peut suivre leurs échéances, les pièces à fournir et leur état, rattachés à chaque chantier. Les règles d'éligibilité restent celles publiées par le canton concerné.",
      },
    ],
    cta: {
      title: "Trop de demandes, pas assez de temps pour les traiter ?",
      text: "Découvrez l'outil que nous construirions pour une entreprise artisanale : demandes qualifiées, devis rapides, planning et facturation au même endroit.",
      href: "/realisations/artisans",
      label: "Voir le logiciel pour artisans",
    },
  },

  // ───────────────────────────────────────────────────────── Fiduciaires ──
  {
    slug: "fiduciaire-automatiser-collecte-pieces-comptables",
    title: "Fiduciaires : absorber plus de mandats sans recruter, en automatisant la collecte des pièces",
    metaTitle: "Fiduciaire : automatiser la collecte des pièces",
    metaDescription:
      "Pénurie de comptables, pièces par WhatsApp, TVA annuelle depuis 2025 : comment une fiduciaire romande automatise la collecte et la saisie des pièces.",
    excerpt:
      "Pièces par WhatsApp, relances sans fin, comptables introuvables : comment passer d'une collecte par paquets à un flux continu — légalement et sans changer de logiciel comptable.",
    topic: "Fiduciaires",
    pages: ["nyl"],
    keywords: ["fiduciaire", "collecte pièces comptables", "OCR comptabilité", "conservation électronique pièces", "décompte TVA annuel", "logiciel fiduciaire"],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    author: "lucas-grin",
    tldr: [
      "Le temps perdu dans une fiduciaire n'est pas dans la comptabilité, mais autour : collecter, relancer, trier, ressaisir.",
      "Avec la pénurie de collaborateurs qualifiés, ce temps non facturable devient le premier frein à la croissance.",
      "La conservation électronique des pièces est admise en Suisse, si l'intégrité et la lisibilité sont garanties pendant dix ans.",
      "Portail de dépôt, lecture automatique (OCR) et relances programmées transforment la collecte en flux continu.",
      "Le décompte TVA annuel, possible depuis 2025 pour de nombreuses PME, rend ce suivi continu encore plus utile.",
    ],
    sections: [
      {
        id: "temps-perdu",
        title: "Où une fiduciaire perd-elle réellement son temps ?",
        blocks: [
          {
            type: "p",
            text: "Demandez à un expert-comptable ce qui lui prend le plus de temps : rarement la comptabilité elle-même. Ce qui dévore les journées, c'est **tout ce qui la précède** — obtenir les pièces, comprendre ce qu'elles sont, les classer, les saisir, puis relancer pour celles qui manquent.",
          },
          {
            type: "list",
            items: [
              "des factures envoyées en photo par WhatsApp, un dimanche soir ;",
              "des relevés transmis par e-mail, noyés dans une conversation ;",
              "des classeurs déposés à la réception une fois par trimestre ;",
              "des justificatifs qui n'arrivent qu'après la quatrième relance.",
            ],
          },
          {
            type: "p",
            text: "Ce temps-là n'est facturable à personne. Il sort directement de la marge du mandat — et il limite le nombre de mandats qu'un cabinet peut accepter.",
          },
        ],
      },
      {
        id: "penurie",
        title: "Pourquoi la pénurie de comptables change-t-elle l'équation ?",
        blocks: [
          {
            type: "p",
            text: "Les fiduciaires romandes le constatent : recruter des comptables et des spécialistes expérimentés est devenu difficile, et le départ d'un collaborateur désorganise tout un portefeuille de mandats. Dans ce contexte, **chaque heure administrative économisée vaut davantage qu'avant** : elle se transforme directement en capacité à servir plus de clients, sans recruter.",
          },
          {
            type: "p",
            text: "L'automatisation n'est pas ici une question de mode. C'est une réponse très pragmatique à une contrainte de ressources.",
          },
        ],
      },
      {
        id: "conservation-electronique",
        title: "La conservation électronique des pièces est-elle permise ?",
        blocks: [
          {
            type: "p",
            text: "Oui. En Suisse, les livres et pièces comptables doivent être conservés **pendant dix ans** (art. 958f du Code des obligations), et l'ordonnance concernant la tenue et la conservation des livres de comptes (Olico) admet la conservation sur support électronique.",
          },
          {
            type: "p",
            text: "La condition : garantir l'intégrité des pièces — elles ne doivent pas pouvoir être modifiées sans trace —, leur disponibilité et leur lisibilité pendant toute la durée légale, avec une organisation documentée. Un outil sérieux s'en charge : horodatage, historique des modifications, stockage sécurisé.",
          },
          {
            type: "callout",
            tone: "note",
            title: "Et la protection des données ?",
            text: "Les pièces de vos clients contiennent des données personnelles. Depuis l'entrée en vigueur de la nouvelle loi sur la protection des données (nLPD) le 1er septembre 2023, il faut savoir où elles sont hébergées et qui y a accès. Un hébergement en Suisse simplifie considérablement la réponse.",
          },
        ],
      },
      {
        id: "flux-continu",
        title: "Comment transformer la collecte en flux continu ?",
        blocks: [
          {
            type: "p",
            text: "Le changement le plus rentable consiste à passer d'une collecte **par paquets** — au trimestre, voire à l'année — à un **flux continu** :",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "**Un portail de dépôt unique** pour chaque client, accessible depuis son téléphone : une photo, et la pièce est transmise.",
              "**La lecture automatique (OCR)** extrait fournisseur, date, montants et TVA, et prépare l'écriture.",
              "**La validation humaine** : le collaborateur contrôle et valide au lieu de saisir.",
              "**Les relances automatiques** : le client reçoit la liste précise de ce qui manque, au bon moment.",
            ],
          },
          {
            type: "table",
            caption: "Collecte par paquets ou en continu",
            head: ["", "Par paquets", "En continu"],
            rows: [
              ["Réception des pièces", "Au trimestre ou à l'année", "Au fil de l'eau"],
              ["Saisie", "Manuelle, en pic", "Pré-remplie, validée"],
              ["Pièces manquantes", "Découvertes au bouclement", "Relancées automatiquement"],
              ["Vision du client", "Une fois par an", "Toute l'année"],
              ["Charge de travail", "Concentrée sur quelques semaines", "Lissée sur l'année"],
            ],
          },
          {
            type: "p",
            text: "Le client y gagne aussi : il sait exactement ce qu'on attend de lui, et ses chiffres sont à jour toute l'année plutôt qu'au bouclement.",
          },
        ],
      },
      {
        id: "decompte-tva-annuel",
        title: "Décompte TVA annuel : pourquoi tenir les pièces à jour devient encore plus utile",
        blocks: [
          {
            type: "p",
            text: "Depuis le 1er janvier 2025, la révision partielle de la loi sur la TVA permet aux entreprises dont le chiffre d'affaires imposable ne dépasse pas **5,005 millions de francs** d'opter pour un décompte annuel, avec des acomptes versés en cours d'année.",
          },
          {
            type: "p",
            text: "Moins de décomptes ne signifie pas moins de suivi. Un décompte annuel qui découvre en fin d'exercice des pièces manquantes ou mal imputées se corrige bien plus difficilement. Un flux continu garde la TVA juste en permanence, quel que soit le rythme de décompte choisi par le client.",
          },
          {
            type: "callout",
            tone: "alert",
            title: "Référence",
            text: "Les conditions exactes — option, délais, acomptes — sont fixées par l'Administration fédérale des contributions (AFC). Référez-vous à ses publications pour chaque situation.",
          },
          {
            type: "p",
            text: "C'est la logique de l'outil que nous avons construit pour [une fiduciaire genevoise qui travaillait sur papier](/realisations/nyl) : les pièces arrivent au fil de l'eau, l'OCR prépare les écritures, l'équipe valide.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Combien de temps faut-il conserver les pièces comptables en Suisse ?",
        a: "Dix ans, selon l'article 958f du Code des obligations. La conservation électronique est admise si l'intégrité, la disponibilité et la lisibilité des pièces sont garanties pendant toute cette durée.",
      },
      {
        q: "L'OCR est-il fiable pour les pièces comptables ?",
        a: "Il lit la grande majorité des factures et tickets courants et prépare l'écriture. La bonne pratique consiste à garder une validation humaine : ce que l'OCR ne lit pas avec certitude est signalé, jamais deviné.",
      },
      {
        q: "Faut-il changer de logiciel comptable pour automatiser la collecte ?",
        a: "Non. Crésus, Abacus, Bexio ou WinBIZ gardent leur rôle. L'outil de collecte se place en amont et leur transmet des écritures prêtes.",
      },
      {
        q: "Qu'est-ce que le décompte TVA annuel ?",
        a: "Depuis 2025, les entreprises dont le chiffre d'affaires imposable ne dépasse pas 5,005 millions de francs peuvent opter pour un décompte TVA annuel, avec des acomptes en cours d'année. Les modalités sont fixées par l'AFC.",
      },
    ],
    cta: {
      title: "Votre cabinet passe plus de temps à collecter qu'à conseiller ?",
      text: "Découvrez comment une fiduciaire genevoise est passée des classeurs à un traitement des pièces au fil de l'eau.",
      href: "/realisations/nyl",
      label: "Lire le cas NYL",
    },
  },

  // ─────────────────────────────────────────────────────────── Nettoyage ──
  {
    slug: "entreprise-nettoyage-enregistrement-temps-de-travail",
    title: "Entreprise de nettoyage : enregistrer le temps de travail sans y passer ses fins de mois",
    metaTitle: "Nettoyage : enregistrer le temps de travail (timbrage)",
    metaDescription:
      "Obligation légale, CCT, équipes dispersées : comment une entreprise de nettoyage fiabilise ses heures, du timbrage sur site jusqu'à la facture.",
    excerpt:
      "Ce que la loi exige, pourquoi les heures remontent mal du terrain, et comment une heure pointée sur site sert à la fois la paie, la rentabilité et la facture.",
    topic: "Nettoyage",
    pages: ["1pecc"],
    keywords: ["enregistrement du temps de travail", "timbrage", "entreprise de nettoyage", "CCT nettoyage", "logiciel nettoyage", "OLT 1 article 73"],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    author: "lucas-grin",
    tldr: [
      "La loi impose d'enregistrer la durée du travail et des pauses, et de conserver ces documents au moins cinq ans (art. 73 OLT 1).",
      "Dans le nettoyage, la difficulté n'est pas la règle, c'est le terrain : des équipes dispersées sur de nombreux sites, à horaires décalés.",
      "Des heures reconstituées de mémoire ne se défendent ni face à un contrôle, ni face à un client qui conteste.",
      "Un timbrage sur site, rattaché à la mission, alimente à la fois les salaires, la rentabilité par contrat et la facture.",
      "La rentabilité d'un contrat se lit alors en cours de mois, pas un mois trop tard.",
    ],
    sections: [
      {
        id: "ce-que-dit-la-loi",
        title: "Que dit la loi sur l'enregistrement du temps de travail ?",
        blocks: [
          {
            type: "p",
            text: "En Suisse, l'employeur doit tenir à disposition des autorités les documents qui permettent de connaître la durée du travail de ses collaborateurs : durée quotidienne et hebdomadaire, travail supplémentaire, pauses d'une demi-heure ou plus, travail de nuit ou du dimanche. C'est l'**article 73 de l'ordonnance 1 relative à la loi sur le travail (OLT 1)**, et ces documents doivent être conservés **au moins cinq ans**.",
          },
          {
            type: "p",
            text: "Dans le nettoyage s'ajoutent les dispositions de la convention collective applicable — salaires minimaux, majorations, traitement des temps de déplacement —, dont le respect peut être contrôlé par la commission paritaire.",
          },
          {
            type: "callout",
            tone: "alert",
            title: "Vérifiez votre CCT",
            text: "Les règles précises — catégories, salaires minimaux, majorations, déplacements — dépendent de la CCT qui s'applique à votre entreprise et de sa version en vigueur. Un outil doit modéliser votre CCT, pas une règle générique.",
          },
        ],
      },
      {
        id: "le-vrai-probleme",
        title: "Pourquoi les heures remontent-elles mal du terrain ?",
        blocks: [
          {
            type: "p",
            text: "Une entreprise de nettoyage vit sur trois réalités qui ne se parlent pas : **ce qui était planifié, ce qui a réellement été fait sur site, et ce qui finit sur la facture**. Entre les trois, des heures remontent par SMS, par photo d'une feuille, ou pas du tout.",
          },
          {
            type: "list",
            items: [
              "une collaboratrice en remplace une autre, absente : qui le note, et où ?",
              "une intervention déborde d'une heure parce que le local était verrouillé : l'heure est-elle payée ? facturée ?",
              "un site a été oublié ce matin : le client l'apprend avant vous.",
            ],
          },
          {
            type: "p",
            text: "À la fin du mois, quelqu'un reconstitue. Et un décompte reconstitué de mémoire ne se défend ni face à un contrôle, ni face à un client qui conteste sa facture.",
          },
        ],
      },
      {
        id: "timbrage-sur-site",
        title: "Comment fonctionne un timbrage sur site bien conçu ?",
        blocks: [
          {
            type: "p",
            text: "Tout tient en un principe : **l'heure est saisie là où elle est travaillée, au moment où elle l'est**, et rattachée à la mission — pas notée sur une feuille rendue en fin de mois.",
          },
          {
            type: "list",
            items: [
              "**Un écran, un bouton.** La mission du jour est déjà chargée : le collaborateur pointe son arrivée et son départ.",
              "**Le site vérifié.** Une géolocalisation au moment du timbrage confirme la présence sur le bon site, sans suivi permanent.",
              "**Les imprévus signalés sur place.** Local fermé, matériel manquant : une photo, un message, horodatés et rattachés au site.",
              "**Les règles appliquées automatiquement.** Pauses, majorations et déplacements calculés selon votre CCT.",
            ],
          },
          {
            type: "callout",
            tone: "note",
            title: "Et la vie privée des collaborateurs ?",
            text: "La géolocalisation doit rester proportionnée : un contrôle au moment du timbrage, pas un suivi continu. La nLPD impose d'informer clairement les collaborateurs de ce qui est collecté, et pourquoi.",
          },
        ],
      },
      {
        id: "rentabilite",
        title: "De l'heure pointée à la rentabilité du contrat",
        blocks: [
          {
            type: "p",
            text: "Une fois saisies sur le terrain, les heures réelles servent trois fois, sans aucune ressaisie :",
          },
          {
            type: "table",
            caption: "Une heure pointée, trois usages",
            head: ["Usage", "Ce que ça change"],
            rows: [
              ["Salaires", "Heures, pauses et majorations arrivent justes, prêtes pour la paie."],
              ["Rentabilité", "Heures réelles face aux heures vendues, contrat par contrat, en cours de mois."],
              ["Facturation", "La facture part des heures réellement effectuées, preuves à l'appui."],
            ],
          },
          {
            type: "p",
            text: "C'est souvent là que se trouve le gain le plus important. **Un contrat qui dérape de trois heures par mois ne se voit habituellement qu'à la facturation — douze fois par an.** Visible en cours de mois, il se corrige : réorganisation de la tournée, renégociation, avenant au contrat.",
          },
        ],
      },
      {
        id: "en-pratique",
        title: "Ce que ça donne en pratique",
        blocks: [
          {
            type: "p",
            text: "C'est l'outil que nous avons construit pour [1PECC, une entreprise de nettoyage romande](/realisations/1pecc) : planning des équipes, timbrage sur site, reporting de mission, rentabilité et facturation réunis dans un seul outil.",
          },
          {
            type: "p",
            text: "Pour estimer d'abord ce que vous coûtent les ressaisies actuelles, notre [diagnostic gratuit](/diagnostic) vous donne un ordre de grandeur en cinq minutes.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Combien de temps faut-il conserver l'enregistrement du temps de travail ?",
        a: "Au moins cinq ans, selon l'article 73 de l'ordonnance 1 relative à la loi sur le travail (OLT 1).",
      },
      {
        q: "La géolocalisation des collaborateurs est-elle autorisée ?",
        a: "Une vérification ponctuelle au moment du timbrage, proportionnée et annoncée aux collaborateurs, est la pratique recommandée. Un suivi permanent de la position pose des problèmes de protection de la personnalité et des données ; en cas de doute, faites valider votre dispositif.",
      },
      {
        q: "Nos équipes ne sont pas à l'aise avec la technologie : est-ce réaliste ?",
        a: "Oui, si le timbrage se limite à un écran et un bouton. Tout le reste — mission, site, cahier des charges — est déjà chargé. S'il faut plus de dix minutes de formation pour pointer, l'outil est mal conçu.",
      },
      {
        q: "Peut-on garder Bexio pour la facturation ?",
        a: "Oui. L'outil de terrain transmet des heures déjà justes à votre logiciel de facturation et de comptabilité, qui garde son rôle.",
      },
    ],
    cta: {
      title: "Vos heures remontent mal du terrain ?",
      text: "Découvrez l'outil construit pour 1PECC : planning, timbrage sur site, rentabilité par contrat et facturation dans un seul outil.",
      href: "/realisations/1pecc",
      label: "Lire le cas 1PECC",
    },
  },

  // ───────────────────────────────────────────── Courtiers en assurances ──
  {
    slug: "courtier-assurances-lsa-documenter-conseil",
    title: "Courtiers en assurances : documenter chaque conseil depuis la révision de la LSA, sans y passer ses soirées",
    metaTitle: "Courtier en assurances : LSA révisée et conseil",
    metaDescription:
      "LSA révisée depuis 2024 : devoir d'information, formation, traçabilité. Documenter chaque conseil et suivre son portefeuille sans alourdir le quotidien.",
    excerpt:
      "Devoir d'information renforcé, formation, assurances-vie qualifiées : ce que la LSA révisée change au quotidien, et comment la trace du conseil peut naître du travail lui-même.",
    topic: "Courtiers en assurances",
    pages: ["courtier-assurances"],
    keywords: ["courtier en assurances", "LSA révisée", "intermédiaire d'assurance", "devoir d'information", "logiciel courtier", "FINMA"],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    author: "lucas-grin",
    tldr: [
      "La LSA révisée, en vigueur depuis le 1er janvier 2024, a renforcé les obligations des intermédiaires : information du client, formation, règles propres à certains produits.",
      "Pouvoir prouver ce qui a été dit et remis au client n'est plus un confort : c'est une protection pour le cabinet.",
      "La documentation devient légère si elle naît du travail lui-même — comparatif, recommandation, signature — plutôt que d'une saisie après coup.",
      "Un portefeuille client complet — polices, échéances, sinistres, commissions — est la base de tout le reste.",
      "L'IA peut lire les polices et les offres PDF des compagnies : le conseiller vérifie au lieu de recopier.",
    ],
    sections: [
      {
        id: "ce-qui-a-change",
        title: "Qu'est-ce qui a changé avec la LSA révisée ?",
        blocks: [
          {
            type: "p",
            text: "La révision de la loi sur la surveillance des assurances (LSA), entrée en vigueur le **1er janvier 2024** avec son ordonnance, a modernisé le cadre applicable aux intermédiaires d'assurance. Parmi les changements qui touchent le quotidien d'un cabinet de courtage :",
          },
          {
            type: "list",
            items: [
              "**un devoir d'information renforcé** envers le client, notamment sur l'identité de l'intermédiaire, ses liens avec les compagnies et sa rémunération ;",
              "**des exigences de formation initiale et continue** pour les personnes qui conseillent ;",
              "**des règles supplémentaires pour certains produits**, en particulier les assurances-vie qualifiées, avec des vérifications et une documentation spécifiques.",
            ],
          },
          {
            type: "callout",
            tone: "alert",
            title: "Source de référence",
            text: "Ce résumé ne remplace ni le texte de la loi, ni son ordonnance, ni les communications de la FINMA. Vérifiez toujours les obligations exactes qui s'appliquent à votre statut et à vos produits.",
          },
        ],
      },
      {
        id: "pourquoi-documenter",
        title: "Pourquoi la documentation du conseil est-elle devenue centrale ?",
        blocks: [
          {
            type: "p",
            text: "Un client mécontent d'une couverture, un sinistre refusé, une contestation sur une commission : dans chacun de ces cas, la question devient la même — **qu'est-ce qui a été dit, proposé et remis au client, et quand ?**",
          },
          {
            type: "p",
            text: "Un cabinet qui peut répondre en trois clics est protégé. Celui qui doit reconstituer à partir de courriels épars et de notes manuscrites l'est beaucoup moins. La documentation n'est pas seulement une obligation : c'est une assurance pour le courtier lui-même.",
          },
        ],
      },
      {
        id: "documenter-sans-effort",
        title: "Comment documenter sans alourdir le quotidien ?",
        blocks: [
          {
            type: "p",
            text: "La plupart des cabinets n'échouent pas par manque de rigueur, mais parce que la documentation arrive **après** le travail, comme une corvée. Le principe à renverser : **la trace doit naître du travail lui-même**.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "**Le comparatif est produit dans l'outil**, à partir des offres reçues des compagnies : il est archivé d'office.",
              "**La recommandation se rédige à partir du comparatif**, avec les raisons du choix.",
              "**Les informations obligatoires sont jointes automatiquement** au document envoyé au client.",
              "**La signature électronique** confirme ce qui a été remis, horodatée et rangée dans le dossier du client.",
            ],
          },
          {
            type: "p",
            text: "Résultat : chaque dossier contient, sans effort supplémentaire, l'historique complet du conseil.",
          },
        ],
      },
      {
        id: "portefeuille",
        title: "Pourquoi tout part d'un portefeuille client complet",
        blocks: [
          {
            type: "p",
            text: "Tout ce qui précède suppose une chose simple, que peu de cabinets ont réellement : **une vue complète de chaque client**. Aujourd'hui, elle est souvent éclatée entre un CRM générique, les portails des compagnies, Excel et la boîte mail.",
          },
          {
            type: "table",
            caption: "Ce qu'un portefeuille client complet réunit",
            head: ["Élément", "Ce qu'il permet"],
            rows: [
              ["Polices et échéances", "Préparer chaque renouvellement des mois à l'avance"],
              ["Offres et comparatifs", "Retrouver le conseil donné, avec ses raisons"],
              ["Sinistres", "Suivre chaque dossier sans dépendre de la mémoire d'un conseiller"],
              ["Commissions", "Rapprocher les relevés des compagnies et repérer les écarts"],
              ["Documents remis", "Prouver l'information fournie au client"],
              ["Portail client", "Laisser le client retrouver seul contrats et attestations, et déclarer un sinistre"],
            ],
          },
          {
            type: "callout",
            tone: "note",
            title: "Là où l'IA fait gagner le plus",
            text: "Offres et polices arrivent en PDF, dans des formats différents selon la compagnie. Une IA peut en extraire garanties, franchises, primes et échéances et les ranger dans le portefeuille : le conseiller vérifie au lieu de recopier.",
          },
        ],
      },
      {
        id: "echeances",
        title: "Comment ne plus jamais rater une échéance ?",
        blocks: [
          {
            type: "p",
            text: "Une échéance manquée, c'est souvent un client qui part chez un concurrent — non parce que l'offre était meilleure, mais parce que l'autre a appelé le premier. **Un portefeuille à jour fait remonter chaque renouvellement des mois à l'avance**, la relance au client déjà préparée.",
          },
          {
            type: "p",
            text: "C'est l'outil que nous décrivons pour les [cabinets de courtage](/realisations/courtier-assurances) : portefeuille complet, portail client, comparatifs, échéances et commissions au même endroit.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Quand la révision de la LSA est-elle entrée en vigueur ?",
        a: "Le 1er janvier 2024, avec son ordonnance d'application. Elle a notamment renforcé les obligations d'information et de formation des intermédiaires d'assurance.",
      },
      {
        q: "Comment prouver l'information remise à un client ?",
        a: "En générant et en archivant dans le dossier du client les documents remis — comparatif, recommandation, informations obligatoires — avec une signature électronique horodatée. La trace naît alors du travail lui-même.",
      },
      {
        q: "Peut-on reprendre un portefeuille existant depuis Excel ?",
        a: "Oui. Clients, polices et échéances se reprennent depuis vos fichiers ou votre CRM actuel, en nettoyant les doublons au passage.",
      },
      {
        q: "L'IA peut-elle lire les polices des compagnies ?",
        a: "Oui : elle extrait des PDF les garanties, franchises, primes et échéances. Le conseiller contrôle le résultat, la validation reste humaine.",
      },
    ],
    cta: {
      title: "Votre portefeuille vit entre Excel, les portails et la boîte mail ?",
      text: "Découvrez l'outil que nous construirions pour un cabinet de courtage : portefeuille 360°, portail client, comparatifs et commissions.",
      href: "/realisations/courtier-assurances",
      label: "Voir l'outil pour courtiers",
    },
  },

  // ─────────────────────────────────────────────── Régies immobilières ──
  {
    slug: "regie-taux-de-reference-demandes-baisse-de-loyer",
    title: "Baisse du taux de référence : comment une régie traite les demandes de baisse de loyer sans être submergée",
    metaTitle: "Taux de référence : gérer les baisses de loyer",
    metaDescription:
      "À chaque baisse du taux de référence, les demandes affluent avec 30 jours pour répondre. Règles de calcul et méthode pour qu'une régie les traite vite et juste.",
    excerpt:
      "30 jours pour répondre, un calcul propre à chaque bail, des dizaines de lettres types : la méthode pour traiter chaque vague de demandes sans erreur ni retard.",
    topic: "Régies immobilières",
    pages: ["regie-immobiliere"],
    keywords: ["taux de référence", "baisse de loyer", "demande de baisse de loyer", "article 270a CO", "régie immobilière", "logiciel régie"],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    author: "lucas-grin",
    tldr: [
      "Quand le taux hypothécaire de référence baisse, les locataires peuvent demander une baisse de loyer ; le bailleur a 30 jours pour répondre (art. 270a CO).",
      "Chaque réponse exige un calcul propre au bail : taux retenu au dernier ajustement, renchérissement, hausse des coûts.",
      "Traitées une par une dans la boîte mail, ces demandes saturent une régie en quelques semaines.",
      "Centraliser, pré-calculer chaque bail et générer des réponses motivées permet de tenir les délais sans erreur.",
      "Chaque décision documentée renforce la relation avec les propriétaires.",
    ],
    sections: [
      {
        id: "comment-ca-marche",
        title: "Comment fonctionne la baisse de loyer liée au taux de référence ?",
        blocks: [
          {
            type: "p",
            text: "Le taux hypothécaire de référence est publié **chaque trimestre par l'Office fédéral du logement (OFL)**. Lorsqu'il baisse, un locataire peut demander, par écrit, une diminution de son loyer pour la prochaine échéance de résiliation (art. 270a du Code des obligations).",
          },
          {
            type: "p",
            text: "Le bailleur dispose alors de **30 jours pour se déterminer**. S'il refuse ou ne répond pas, le locataire peut saisir l'autorité de conciliation dans les 30 jours suivants.",
          },
          {
            type: "table",
            caption: "Les règles de calcul usuelles (taux de référence inférieur à 5 %)",
            head: ["Élément", "Effet sur le loyer"],
            rows: [
              ["Baisse du taux de référence de 0,25 point", "Diminution de 2,91 %"],
              ["Renchérissement (IPC) depuis la dernière adaptation", "Compensation possible à hauteur de 40 %"],
              ["Hausse des coûts d'entretien et d'exploitation", "Compensation possible, à justifier"],
            ],
          },
          {
            type: "callout",
            tone: "alert",
            title: "Chaque bail est un cas",
            text: "Le calcul dépend du taux de référence retenu lors de la dernière fixation du loyer, des réserves éventuelles et des clauses du bail. Ce tableau résume les règles usuelles de l'ordonnance sur le bail (OBLF) ; il ne remplace ni le texte légal ni l'avis d'un juriste.",
          },
        ],
      },
      {
        id: "la-vague",
        title: "Pourquoi chaque baisse déclenche-t-elle une vague ?",
        blocks: [
          {
            type: "p",
            text: "Une baisse du taux de référence est largement relayée par la presse et les associations de locataires, souvent avec des lettres types prêtes à l'envoi. En quelques jours, une régie peut recevoir des dizaines, voire des centaines de demandes — **toutes soumises au même délai de 30 jours**.",
          },
          {
            type: "p",
            text: "Or chaque réponse exige de retrouver le bail, le taux de référence retenu lors du dernier ajustement, l'indice des prix de l'époque, les éventuelles réserves — puis de calculer, rédiger et envoyer. Dans une boîte mail partagée, c'est la recette des oublis et des erreurs.",
          },
        ],
      },
      {
        id: "methode",
        title: "Quelle méthode pour traiter les demandes à temps ?",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "**Centraliser** : chaque demande, qu'elle arrive par courrier, par e-mail ou par le portail locataire, est enregistrée et rattachée au bail, avec son échéance de réponse.",
              "**Pré-calculer** : l'outil retrouve les paramètres du bail et calcule la baisse théorique, les compensations possibles et le résultat net.",
              "**Valider** : le gérant contrôle le calcul, l'ajuste si nécessaire et choisit la réponse — acceptation, acceptation partielle motivée, refus motivé.",
              "**Répondre et documenter** : la lettre est générée dans les formes, envoyée, archivée au dossier du bail, et le propriétaire est informé.",
            ],
          },
          {
            type: "callout",
            tone: "note",
            title: "Anticiper la prochaine baisse",
            text: "Les paramètres de chaque bail — taux de référence retenu, indice des prix, date de la dernière adaptation — peuvent être tenus à jour en continu. Le jour où le taux baisse, la régie sait déjà quels baux sont concernés, et de combien.",
          },
        ],
      },
      {
        id: "proprietaires",
        title: "Comment rendre des comptes aux propriétaires ?",
        blocks: [
          {
            type: "p",
            text: "Pour un propriétaire, une vague de baisses de loyer, c'est une baisse de rendement qu'il veut comprendre. Une régie qui peut lui montrer, immeuble par immeuble, **les demandes reçues, les calculs et les décisions** — sans rassembler dix sources — renforce sa relation de mandat au moment précis où elle est mise à l'épreuve.",
          },
          {
            type: "p",
            text: "C'est tout l'intérêt d'un [outil de gestion pensé pour les régies](/realisations/regie-immobiliere) : demandes des locataires, suivi des interventions et dossier d'immeuble réunis, avec un portail pour les propriétaires.",
          },
        ],
      },
      {
        id: "au-dela",
        title: "Et au-delà du taux de référence ?",
        blocks: [
          {
            type: "p",
            text: "La même logique — **centraliser, pré-calculer, valider, documenter** — s'applique à la plupart des tâches répétitives d'une régie : demandes d'intervention, décomptes de charges, états des lieux, relances de loyers. C'est ce qui permet à une équipe de gérance d'absorber davantage de lots sans s'épuiser.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Combien de temps une régie a-t-elle pour répondre à une demande de baisse de loyer ?",
        a: "30 jours, selon l'article 270a du Code des obligations. Si le bailleur refuse ou ne répond pas, le locataire peut saisir l'autorité de conciliation dans les 30 jours suivants.",
      },
      {
        q: "De combien baisse le loyer quand le taux de référence baisse de 0,25 point ?",
        a: "Selon les règles usuelles, de 2,91 % lorsque le taux est inférieur à 5 %, sous réserve des compensations possibles (40 % du renchérissement, hausse des coûts) et des particularités du bail.",
      },
      {
        q: "À quelle fréquence le taux de référence est-il publié ?",
        a: "Chaque trimestre, par l'Office fédéral du logement (OFL).",
      },
      {
        q: "Peut-on automatiser les réponses aux demandes de baisse ?",
        a: "Le calcul et la rédaction, oui, à partir des paramètres de chaque bail. La validation reste au gérant, qui contrôle chaque dossier avant l'envoi.",
      },
    ],
    cta: {
      title: "Chaque baisse du taux sature votre équipe ?",
      text: "Voyez l'outil que nous construirions pour une régie : demandes centralisées, calculs pré-remplis, réponses documentées.",
      href: "/realisations/regie-immobiliere",
      label: "Voir l'outil pour régies",
    },
  },

  // ───────────────────────────────────────────────────────────── Agences ──
  {
    slug: "agence-trop-d-abonnements-saas",
    title: "Agences : quand les abonnements SaaS coûtent plus cher qu'un outil à soi",
    metaTitle: "Agence : trop d'abonnements SaaS ? Faites le calcul",
    metaDescription:
      "CRM, gestion de projet, reporting, IA : les agences empilent les abonnements et éclatent leur data. Le vrai calcul, et l'agence qui en a résilié cinq.",
    excerpt:
      "Dix outils que personne n'a choisis ensemble, une facture qui grimpe à chaque recrue, une IA qui ne voit rien : le calcul à faire, et l'exemple d'une agence qui a tout regroupé.",
    topic: "Agences",
    pages: ["solve", "welcomize"],
    keywords: ["agence marketing", "abonnements SaaS", "outil de gestion d'agence", "CRM agence", "rentabilité agence", "IA agence"],
    publishedAt: PUBLISHED,
    updatedAt: PUBLISHED,
    author: "lucas-grin",
    tldr: [
      "Une agence empile souvent CRM, gestion de projet, agenda, reporting, facturation et outils d'IA — chacun facturé par utilisateur.",
      "Le coût visible est l'abonnement ; le coût réel, c'est la data éclatée et le temps passé à faire circuler l'information.",
      "L'IA ne donne sa pleine mesure que si elle accède à toutes les données de l'agence au même endroit.",
      "Un outil à soi devient rentable quand abonnements, temps perdu et compromis dépassent son coût sur trois à cinq ans.",
      "L'agence Solve a résilié cinq abonnements en regroupant sa gestion dans une seule app avec IA.",
    ],
    sections: [
      {
        id: "empilement",
        title: "Comment une agence se retrouve-t-elle avec dix outils ?",
        blocks: [
          {
            type: "p",
            text: "Personne ne décide un jour d'avoir dix logiciels. On prend un CRM parce qu'il faut suivre les prospects, un outil de gestion de projet parce que les tâches se perdent, un outil de reporting parce que les clients veulent des chiffres, un agenda partagé, un outil de facturation — puis un ou deux abonnements d'IA, parce que tout le monde en parle.",
          },
          {
            type: "p",
            text: "Chacun, pris isolément, est un bon produit. Ensemble, **ils forment un système que personne n'a conçu** : les données sont copiées d'un outil à l'autre, les automatisations entre eux cassent à chaque mise à jour, et la facture mensuelle grimpe à chaque nouvelle recrue — puisque presque tout se paie par utilisateur.",
          },
        ],
      },
      {
        id: "le-vrai-cout",
        title: "Quel est le vrai coût de l'empilement ?",
        blocks: [
          {
            type: "table",
            caption: "Exemple chiffré — agence de 8 personnes (valeurs indicatives, à remplacer par les vôtres)",
            head: ["Poste", "Coût mensuel d'exemple"],
            rows: [
              ["CRM (8 utilisateurs)", "CHF 400.–"],
              ["Gestion de projet", "CHF 200.–"],
              ["Reporting clients", "CHF 250.–"],
              ["Planification et agenda", "CHF 100.–"],
              ["Abonnements d'IA", "CHF 240.–"],
              ["Total mensuel", "CHF 1 190.–"],
              ["Total sur 3 ans", "CHF 42 840.–"],
            ],
          },
          {
            type: "p",
            text: "Et ce tableau ne compte que ce qui se voit. Il faut y ajouter le temps passé à reconstruire chaque mois les rapports clients, à recopier une information d'un outil à l'autre, à chercher « où c'est noté ». **Ce temps-là ne figure sur aucune facture, mais il est souvent le plus cher.**",
          },
          {
            type: "callout",
            tone: "note",
            title: "Le signal qui ne trompe pas",
            text: "Si quelqu'un dans l'agence exporte régulièrement des données d'un outil pour les importer dans un autre, votre système d'outils a un problème de structure — pas un problème d'outil.",
          },
        ],
      },
      {
        id: "ia",
        title: "Pourquoi l'IA change-t-elle le calcul ?",
        blocks: [
          {
            type: "p",
            text: "Les outils d'IA sont d'autant plus utiles qu'ils ont accès au contexte. Une IA qui voit le CRM mais pas les heures passées, ou les tâches mais pas la rentabilité par client, ne peut ni conseiller ni agir réellement. **Dans une agence dont la data est éclatée entre six outils, brancher l'IA sur chacun est coûteux et fragile.**",
          },
          {
            type: "p",
            text: "Réunies au même endroit, les données de l'agence permettent à une IA de faire des choses concrètes : préparer les relances de prospects, trier les e-mails et proposer des réponses, rédiger un rapport client à partir des vrais chiffres, planifier la semaine selon les priorités.",
          },
        ],
      },
      {
        id: "cas-solve",
        title: "L'exemple de Solve : cinq abonnements résiliés",
        blocks: [
          {
            type: "p",
            text: "Solve, une agence de marketing digital, a vécu exactement ce scénario : plusieurs applications, plusieurs abonnements coûteux, une data éclatée et une IA impossible à intégrer proprement dans chaque outil.",
          },
          {
            type: "p",
            text: "La réponse a été **une app unique qui regroupe toute la gestion de l'agence** : CRM avec les étapes d'acquisition et relances automatisées, transcription et génération de rapports, tri des e-mails avec pré-réponses, gestion des tâches avec planification assistée, rentabilité par projet et par client, et une IA qui a accès à tout. Résultat : **cinq abonnements résiliés**, et un rapport client qui sort en trente secondes au lieu de deux heures.",
          },
          {
            type: "p",
            text: "Le détail, écrans à l'appui, est dans l'[étude de cas Solve](/realisations/solve).",
          },
        ],
      },
      {
        id: "grille",
        title: "Faut-il un outil à soi ? Les quatre questions à se poser",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "**Combien payez-vous par mois, tous abonnements confondus — et combien dans trois ans, avec les recrutements prévus ?**",
              "**Combien d'heures par semaine passent à faire circuler l'information entre les outils ?**",
              "**Vos process sont-ils propres à l'agence** — étapes d'acquisition, format de rapport, calcul de rentabilité — **ou génériques ?**",
              "**Voulez-vous que l'IA travaille sur l'ensemble de vos données ?**",
            ],
          },
          {
            type: "p",
            text: "Si les réponses pointent vers un coût élevé, du temps perdu et des process spécifiques, un outil à soi mérite d'être chiffré. Dans le cas contraire, garder de bons outils du marché est souvent la meilleure décision — et nous vous le dirons.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Un outil sur mesure est-il plus cher que des abonnements SaaS ?",
        a: "Au départ, oui : il demande un investissement de développement. Sur trois à cinq ans, la comparaison change souvent, surtout quand les abonnements se paient par utilisateur et que l'équipe grandit. Le bon calcul inclut aussi le temps perdu entre les outils.",
      },
      {
        q: "Peut-on migrer les données de nos outils actuels ?",
        a: "Oui. Contacts, projets, historiques et documents se reprennent depuis les exports des outils existants, en nettoyant les doublons au passage.",
      },
      {
        q: "Que se passe-t-il si nos besoins évoluent ?",
        a: "Un outil à soi évolue avec vous : on ajoute un module quand le besoin apparaît, sans changer de plateforme ni payer une offre supérieure pour une seule fonctionnalité.",
      },
    ],
    cta: {
      title: "Votre agence empile les abonnements ?",
      text: "Découvrez comment Solve a regroupé toute sa gestion dans une seule app avec IA — et résilié cinq abonnements.",
      href: "/realisations/solve",
      label: "Lire le cas Solve",
    },
  },
];

/**
 * La typographie française, appliquée une fois pour toutes à l'export.
 *
 * Espace insécable avant « ? ! : ; » et après « « », espace fine dans les
 * milliers, « CHF » collé à son montant. Sans elle, un « ? » ou un « : »
 * finit seul en début de ligne — sur un titre de 52 px, ça se voit. On
 * l'applique ici plutôt qu'au rendu : titres, balises meta, JSON-LD, RSS et
 * llms.txt en profitent tous.
 */
function typo(s: string): string {
  return s
    .replace(/ ([?!:;»])/g, " $1")
    .replace(/« /g, "« ")
    .replace(/(\d) (?=\d{3}\b)/g, "$1 ")
    .replace(/CHF (?=\d)/g, "CHF ");
}

/** Les champs techniques ne sont pas du texte : on n'y touche pas. */
const RAW_KEYS = new Set(["slug", "id", "href", "pages", "author", "publishedAt", "updatedAt", "type", "tone"]);

function withTypo<T>(value: T): T {
  if (typeof value === "string") return typo(value) as T;
  if (Array.isArray(value)) return value.map(withTypo) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, RAW_KEYS.has(k) ? v : withTypo(v)]),
    ) as T;
  }
  return value;
}

export const ARTICLES: Article[] = RAW_ARTICLES.map(withTypo);

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** L'URL d'un article. */
export function articleHref(slug: string): string {
  return `/blog/${slug}`;
}

/** Temps de lecture estimé, à 220 mots par minute — arrondi au-dessus. */
export function readingMinutes(article: Article): number {
  const texts: string[] = [article.excerpt, ...article.tldr];
  for (const s of article.sections) {
    texts.push(s.title);
    for (const b of s.blocks) {
      if (b.type === "p" || b.type === "h3") texts.push(b.text);
      else if (b.type === "list") texts.push(...b.items);
      else if (b.type === "callout") texts.push(b.title, b.text);
      else if (b.type === "table") texts.push(b.caption, ...b.head, ...b.rows.flat());
    }
  }
  for (const f of article.faq) texts.push(f.q, f.a);
  const words = texts.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

/** Le texte sans ses marques **gras** et [lien](…) — pour le JSON-LD, le RSS, llms.txt. */
export function plain(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");
}

/** « 24 septembre 2026 ». */
export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("fr-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Les articles rattachés à une page /realisations. */
export function articlesForPage(slug: string): Article[] {
  return ARTICLES.filter((a) => a.pages.includes(slug));
}

/**
 * Les articles à lire ensuite : même thème d'abord, puis ceux qui partagent
 * une page métier, puis les articles de fond — jamais l'article lui-même.
 */
export function relatedArticles(article: Article, count = 3): Article[] {
  const others = ARTICLES.filter((a) => a.slug !== article.slug);
  const score = (a: Article) =>
    (a.topic === article.topic ? 4 : 0) +
    (a.pages.some((p) => article.pages.includes(p)) ? 2 : 0) +
    (a.topic === "Stratégie & IA" ? 1 : 0);
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, count);
}
