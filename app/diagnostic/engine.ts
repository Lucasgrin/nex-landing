/**
 * Le moteur du diagnostic : les questions, le calcul, et ce qu'on en dit.
 *
 * Partagé par la page (qui affiche le résultat) et par /api/lead (qui le
 * recalcule depuis les réponses). Le serveur ne reprend jamais les chiffres
 * envoyés par le navigateur : ce sont eux qui partent par e-mail, chez nous
 * et chez le prospect, et ils doivent sortir du même calcul.
 *
 * Aucune dépendance React ni Next ici — ce fichier doit rester importable
 * des deux côtés.
 */

// ── Réponses ─────────────────────────────────────────────────────────────────

export type FrictionKey =
  | "reDataEntry" | "reSearchDoc" | "reChase"
  | "reReporting" | "reWaitValidation" | "reMultiSoftware";

export interface Answers {
  employees: string;
  sector: string;
  fieldTeams: string;
  adminPeople: string;
  tools: string[];
  toolsIntegrated: string;
  toolsCost: string;
  /** Curseurs 0-4 ; -1 = pas encore touché, pour qu'un curseur oublié ne compte pas comme « jamais ». */
  reDataEntry: number; reSearchDoc: number; reChase: number;
  reReporting: number; reWaitValidation: number; reMultiSoftware: number;
  infoAccess: string;
  adminHours: string;
  processesDoc: string;
  priorities: string[];
  timing: string;
}

export const EMPTY_ANSWERS: Answers = {
  employees: "", sector: "", fieldTeams: "", adminPeople: "",
  tools: [], toolsIntegrated: "", toolsCost: "",
  reDataEntry: -1, reSearchDoc: -1, reChase: -1, reReporting: -1, reWaitValidation: -1, reMultiSoftware: -1,
  infoAccess: "", adminHours: "", processesDoc: "",
  priorities: [], timing: "",
};

// ── Options ──────────────────────────────────────────────────────────────────
// Les secteurs sont ceux que le site sert, dans leur vocabulaire. Un
// fiduciaire qui ne se trouve pas dans la liste ne se sent pas concerné
// par le reste du questionnaire.

export const EMPLOYEES = ["1–5", "6–10", "11–25", "26–50", "51–200", "Plus de 200"];

export const SECTORS = [
  "Fiduciaire / comptabilité",
  "Régie / gérance immobilière",
  "Artisan / installation technique",
  "Construction / second œuvre",
  "Nettoyage / facility services",
  "Courtage / assurances",
  "Agence / services B2B",
  "Événementiel / photo / vidéo",
  "Commerce / distribution",
  "Autre",
];

export const FIELD_TEAMS: [string, string][] = [
  ["most", "Oui, la majorité"],
  ["some", "Une partie"],
  ["none", "Non, surtout au bureau"],
];

export const ADMIN_PEOPLE = ["1", "2–3", "4–6", "7–15", "Plus de 15"];

export const TOOLS = [
  "Papier / classeurs", "Excel / Google Sheets", "E-mail (Outlook, Gmail)", "WhatsApp",
  "Bexio", "Abacus", "Crésus", "WinBIZ",
  "CRM", "Logiciel métier", "Microsoft 365 / Google Workspace", "Autre",
];

export const TOOLS_INTEGRATED: [string, string][] = [
  ["never", "Non, tout est cloisonné"],
  ["partial", "En partie"],
  ["yes", "Oui, bien connectés"],
];

export const TOOLS_COST = [
  "Moins de CHF 100", "CHF 100–300", "CHF 300–800", "CHF 800–2'000", "Plus de CHF 2'000", "Je ne sais pas",
];

export const FRICTION_QUESTIONS: { key: FrictionKey; label: string; hint: string }[] = [
  { key: "reDataEntry", label: "Ressaisir une information déjà saisie ailleurs", hint: "Devis → facture, terrain → bureau, e-mail → tableur" },
  { key: "reSearchDoc", label: "Chercher un document, une pièce ou une info client", hint: "Dans les e-mails, un classeur, un dossier partagé" },
  { key: "reChase", label: "Relancer un client ou un collègue", hint: "Pour une pièce manquante, une réponse, un paiement" },
  { key: "reReporting", label: "Préparer un rapport, un décompte ou un tableau à la main", hint: "Reporting client, heures, rentabilité, suivi" },
  { key: "reWaitValidation", label: "Attendre une validation pour avancer", hint: "Un devis, une dépense, un bon de travail" },
  { key: "reMultiSoftware", label: "Ouvrir plusieurs logiciels pour finir une tâche", hint: "Et recoller les morceaux entre eux" },
];

export const FREQUENCY = ["Jamais", "Rarement", "Parfois", "Souvent", "Tous les jours"];

export const INFO_ACCESS: [string, string][] = [
  ["always", "Toujours, facilement"],
  ["usually", "La plupart du temps"],
  ["sometimes", "Parfois, en cherchant"],
  ["rarely", "Rarement, c'est compliqué"],
];

export const ADMIN_HOURS = ["Moins d'1h", "1–3h", "3–6h", "6–10h", "Plus de 10h"];

export const PROCESSES_DOC: [string, string][] = [
  ["yes", "Oui, c'est écrit"],
  ["partial", "En partie"],
  ["no", "Non, c'est dans les têtes"],
];

export const PRIORITIES = [
  "Collecte des documents clients", "Devis et facturation", "Planning des équipes",
  "Suivi des chantiers / mandats", "Relances automatiques", "Reporting et tableaux de bord",
  "Portail ou espace client", "Autre",
];

/** Les frictions que chaque priorité recouvre — pour faire passer devant ce que la personne veut régler. */
const PRIORITY_FRICTIONS: Record<string, string[]> = {
  "Collecte des documents clients": ["Documents et pièces difficiles à retrouver", "Encore beaucoup de papier", "Relances manuelles"],
  "Devis et facturation": ["Double saisie entre vos outils", "Validations qui bloquent le travail"],
  "Planning des équipes": ["Terrain et bureau mal reliés", "Double saisie entre vos outils"],
  "Suivi des chantiers / mandats": ["Terrain et bureau mal reliés", "Information difficile d'accès", "Rapports et tableaux faits à la main"],
  "Relances automatiques": ["Relances manuelles"],
  "Reporting et tableaux de bord": ["Rapports et tableaux faits à la main", "Trop de logiciels pour une seule tâche"],
  "Portail ou espace client": ["Documents et pièces difficiles à retrouver", "Relances manuelles"],
};

/**
 * L'horizon du projet. C'est la seule question qui ne sert pas au calcul :
 * elle sert à savoir qui rappeler en premier.
 */
export const TIMING: [string, string][] = [
  ["soon", "Je veux lancer un projet dans les 3 mois"],
  ["problem", "J'ai un problème précis à régler"],
  ["explore", "Je m'informe, sans projet précis"],
];

export const TIMING_TAG: Record<string, string> = {
  soon: "Projet < 3 mois",
  problem: "Problème précis",
  explore: "Veille",
};

// ── Hypothèses de calcul ─────────────────────────────────────────────────────
// Affichées telles quelles sous le résultat. Un chiffre dont on voit la
// fabrication se croit ; un chiffre qui tombe du ciel se conteste.

/** Coût complet d'une heure de travail administratif en Suisse romande (salaire + charges). */
export const HOURLY_COST = 80;
/** Semaines réellement travaillées dans l'année (vacances et fériés déduits). */
export const WORK_WEEKS = 46;

const ADMIN_PEOPLE_VALUE: Record<string, number> = { "1": 1, "2–3": 2.5, "4–6": 5, "7–15": 10, "Plus de 15": 20 };
const ADMIN_HOURS_VALUE: Record<string, number> = { "Moins d'1h": 0.5, "1–3h": 2, "3–6h": 4.5, "6–10h": 8, "Plus de 10h": 12 };

// ── Ce qu'on dit de chaque friction ──────────────────────────────────────────

export interface CaseProof {
  slug: string;
  client: string;
  /** Un fait tiré de la réalisation — uniquement des chiffres non provisoires. */
  proof: string;
}

const CASES: Record<string, CaseProof> = {
  "1pecc": { slug: "1pecc", client: "1pecc", proof: "Planning, timbrage et facturation reliés : 100 % des heures pointées sont facturées." },
  nyl: { slug: "nyl", client: "NYL", proof: "Une fiduciaire sortie du papier : pièces collectées en ligne, lues par OCR, dossiers à jour toute l'année." },
  "c-carre": { slug: "c-carre", client: "C Carré", proof: "Devis instantané 24/7, contrats et relances automatisés jusqu'à la livraison." },
  solve: { slug: "solve", client: "Solve", proof: "Un rapport client en 30 secondes au lieu de 2 heures, et 5 abonnements résiliés." },
  "pod-x": { slug: "pod-x", client: "Pod X", proof: "De la réservation à la facture, tout est automatisé dans un seul outil." },
};

export interface FrictionInfo {
  insight: string;
  action: string;
  case?: CaseProof;
}

export const FRICTIONS: Record<string, FrictionInfo> = {
  "Double saisie entre vos outils": {
    insight: "Chaque ressaisie coûte du temps et fabrique des écarts : la même information finit par exister en deux versions.",
    action: "Relier vos outils pour qu'une information saisie une fois arrive partout où elle sert.",
    case: CASES["1pecc"],
  },
  "Terrain et bureau mal reliés": {
    insight: "Ce qui se passe sur le terrain remonte au bureau par téléphone, papier ou WhatsApp — puis quelqu'un le recopie.",
    action: "Donner au terrain un outil simple qui alimente directement le planning et la facturation.",
    case: CASES["1pecc"],
  },
  "Encore beaucoup de papier": {
    insight: "Le papier oblige à tout traiter par paquets : entre deux paquets, rien n'est à jour.",
    action: "Faire arriver les documents en ligne, classés dans le bon dossier, pour les traiter au fil de l'eau.",
    case: CASES.nyl,
  },
  "Documents et pièces difficiles à retrouver": {
    insight: "Sans dossier unique, l'équipe cherche l'information au lieu de s'en servir.",
    action: "Un dossier par client ou par mandat, où chaque pièce arrive et se retrouve en quelques secondes.",
    case: CASES.nyl,
  },
  "Relances manuelles": {
    insight: "Une relance qui dépend de quelqu'un qui y pense est une relance qui finit par être oubliée.",
    action: "Automatiser les relances — pièces manquantes, devis, paiements — et savoir ce qui est parti.",
    case: CASES["c-carre"],
  },
  "Rapports et tableaux faits à la main": {
    insight: "Un rapport reconstruit à la main chaque mois, c'est du temps qui ne se facture pas.",
    action: "Générer rapports et tableaux de bord directement depuis vos données, à la demande.",
    case: CASES.solve,
  },
  "Validations qui bloquent le travail": {
    insight: "Chaque validation qui attend dans une boîte mail immobilise le dossier et la personne qui le porte.",
    action: "Mettre les validations dans l'outil, avec la bonne personne prévenue au bon moment.",
    case: CASES["c-carre"],
  },
  "Trop de logiciels pour une seule tâche": {
    insight: "Jongler entre plusieurs outils fragmente le travail et multiplie les abonnements.",
    action: "Réunir les étapes d'un même processus dans un seul outil, pensé pour votre métier.",
    case: CASES.solve,
  },
  "Outils cloisonnés": {
    insight: "Des outils qui ne se parlent pas, ce sont des tâches manuelles pour faire le pont entre eux.",
    action: "Connecter vos logiciels existants plutôt que de tout remplacer.",
    case: CASES["pod-x"],
  },
  "Information difficile d'accès": {
    insight: "Quand l'information est éparpillée, chaque question interne coûte une interruption.",
    action: "Donner à chacun l'accès direct à l'information dont il a besoin, au même endroit.",
  },
  "Savoir-faire dans les têtes": {
    insight: "Quand les processus ne sont pas écrits, une absence suffit à bloquer un dossier.",
    action: "Inscrire vos processus dans l'outil lui-même : les étapes guident le travail.",
  },
  "Quelques gains ciblés": {
    insight: "Votre organisation est déjà bien structurée : les gains se jouent sur quelques irritants précis.",
    action: "Passer en revue les derniers irritants du quotidien pour isoler les gains rapides.",
  },
};

/**
 * La réalisation ou le cas le plus proche du secteur choisi. Les régies,
 * courtiers et artisans renvoient à « ce que nous construirions » : c'est
 * dit comme tel sur leur page, on ne le présente pas comme un client ici.
 */
export const SECTOR_CASE: Record<string, { slug: string; label: string }> = {
  "Fiduciaire / comptabilité": { slug: "nyl", label: "NYL, une fiduciaire sortie du papier" },
  "Nettoyage / facility services": { slug: "1pecc", label: "1pecc, entreprise de nettoyage : planning, timbrage, facturation" },
  "Régie / gérance immobilière": { slug: "regie-immobiliere", label: "L'outil que nous construirions pour une régie" },
  "Artisan / installation technique": { slug: "artisans", label: "L'outil que nous construirions pour un artisan" },
  "Construction / second œuvre": { slug: "artisans", label: "L'outil que nous construirions pour un artisan" },
  "Courtage / assurances": { slug: "courtier-assurances", label: "L'outil que nous construirions pour un courtier" },
  "Agence / services B2B": { slug: "solve", label: "Solve, une agence gérée depuis une seule app" },
  "Événementiel / photo / vidéo": { slug: "c-carre", label: "C Carré, du devis à la livraison des fichiers" },
};

export const SECTOR_HINT: Record<string, string> = {
  "Fiduciaire / comptabilité": "pour une fiduciaire, où tout se joue sur la collecte des pièces et les échéances",
  "Régie / gérance immobilière": "pour une régie, où les demandes, les travaux et les dossiers d'immeuble s'éparpillent vite",
  "Artisan / installation technique": "pour une entreprise artisanale, où l'information change de support entre le devis, le chantier et la facture",
  "Construction / second œuvre": "pour une entreprise du bâtiment, où le terrain et le bureau doivent parler la même langue",
  "Nettoyage / facility services": "pour une entreprise de nettoyage, où planning, présence sur site et facturation doivent coïncider",
  "Courtage / assurances": "pour un courtier, où polices, échéances et commissions vivent dans des outils différents",
  "Agence / services B2B": "pour une agence, où la rentabilité se joue sur le temps passé par client",
  "Événementiel / photo / vidéo": "pour un métier de l'événement, où devis, contrats et livraisons se succèdent vite",
  "Commerce / distribution": "pour un commerce, où commandes, stock et suivi client doivent rester alignés",
};

// ── Calcul ───────────────────────────────────────────────────────────────────

export interface Friction { title: string; hours: number }
export interface Recommendation { title: string; action: string; case?: CaseProof }

export interface Result {
  /** Potentiel de gain, /100 : plus il est haut, plus il y a à récupérer. */
  score: number;
  maturity: "À structurer" | "En cours" | "Avancé";
  hoursLost: number;
  annualCost: number;
  annualDays: number;
  frictions: Friction[];
  recommendations: Recommendation[];
  subScores: { label: string; value: number; insight: string }[];
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function calc(a: Answers): Result {
  const slider = (v: number) => clamp(v, 0, 4);
  const fr = (slider(a.reDataEntry) + slider(a.reSearchDoc) + slider(a.reChase)
    + slider(a.reReporting) + slider(a.reWaitValidation) + slider(a.reMultiSoftware)) / 24;
  const paper = a.tools.includes("Papier / classeurs");
  const toolCount = a.tools.filter((t) => t !== "Autre").length;

  const intPen = a.toolsIntegrated === "yes" ? 0 : a.toolsIntegrated === "partial" ? 0.35 : 0.7;
  const accPen = a.infoAccess === "always" ? 0 : a.infoAccess === "usually" ? 0.2 : a.infoAccess === "sometimes" ? 0.55 : 0.85;
  const docPen = a.processesDoc === "yes" ? 0 : a.processesDoc === "partial" ? 0.35 : 0.7;

  // Frictions du quotidien 50 %, outils 25 %, accès à l'information 15 %,
  // documentation 10 % ; le papier ajoute un palier. Pas de plancher
  // artificiel : une entreprise bien organisée doit pouvoir lire qu'elle
  // l'est — c'est ce qui rend crédible le score de celle qui ne l'est pas.
  const combined = clamp(fr * 0.5 + intPen * 0.25 + accPen * 0.15 + docPen * 0.1 + (paper ? 0.06 : 0), 0, 1);
  const score = Math.round(clamp(10 + combined * 88, 8, 97));
  const maturity: Result["maturity"] = combined > 0.5 ? "À structurer" : combined > 0.25 ? "En cours" : "Avancé";

  // Heures perdues = personnes concernées × heures par personne. L'estimation
  // déclarée pèse 60 %, l'intensité des curseurs 40 % : on reste fidèle à ce
  // que la personne a dit, sans ignorer le détail de ses réponses.
  const people = ADMIN_PEOPLE_VALUE[a.adminPeople] ?? 2;
  const declared = ADMIN_HOURS_VALUE[a.adminHours];
  const derived = fr * 7;
  const perPerson = declared !== undefined ? declared * 0.6 + derived * 0.4 : derived;
  const hoursLost = Math.max(2, Math.round(people * perPerson));
  const annualCost = Math.round((hoursLost * WORK_WEEKS * HOURLY_COST) / 500) * 500;
  const annualDays = Math.round((hoursLost * WORK_WEEKS) / 8.4);

  // Une friction n'est retenue que si une réponse la justifie.
  const c: { title: string; weight: number }[] = [];
  if (a.reDataEntry >= 3) c.push({ title: "Double saisie entre vos outils", weight: a.reDataEntry });
  if (a.fieldTeams !== "none" && a.fieldTeams !== "" && a.reDataEntry >= 2)
    c.push({ title: "Terrain et bureau mal reliés", weight: a.fieldTeams === "most" ? 3.5 : 2.5 });
  if (paper) c.push({ title: "Encore beaucoup de papier", weight: 3.2 });
  if (a.reSearchDoc >= 3) c.push({ title: "Documents et pièces difficiles à retrouver", weight: a.reSearchDoc });
  if (a.reChase >= 3) c.push({ title: "Relances manuelles", weight: a.reChase });
  if (a.reReporting >= 3) c.push({ title: "Rapports et tableaux faits à la main", weight: a.reReporting });
  if (a.reWaitValidation >= 3) c.push({ title: "Validations qui bloquent le travail", weight: a.reWaitValidation });
  if (a.reMultiSoftware >= 3 || toolCount >= 7) c.push({ title: "Trop de logiciels pour une seule tâche", weight: Math.max(a.reMultiSoftware, toolCount >= 7 ? 3 : 0) });
  if (a.toolsIntegrated === "never") c.push({ title: "Outils cloisonnés", weight: 2.8 });
  if (a.infoAccess === "sometimes" || a.infoAccess === "rarely") c.push({ title: "Information difficile d'accès", weight: accPen * 4 });
  if (a.processesDoc === "no") c.push({ title: "Savoir-faire dans les têtes", weight: 2.4 });

  // Ce que la personne a dit vouloir régler passe devant, à intensité égale.
  for (const x of c) if (a.priorities.some((p) => PRIORITY_FRICTIONS[p]?.includes(x.title))) x.weight += 1;

  c.sort((x, y) => y.weight - x.weight);
  let top = c.slice(0, 4);
  if (top.length === 0) top = [{ title: "Quelques gains ciblés", weight: 1 }];

  const total = top.reduce((s, x) => s + x.weight, 0);
  const frictions = top.map((x) => ({ title: x.title, hours: Math.max(1, Math.round(hoursLost * (x.weight / total))) }));

  // Une réalisation n'est citée qu'une fois : deux preuves identiques n'en font qu'une.
  const cited = new Set<string>();
  const recommendations = frictions.slice(0, 3).map((f) => {
    const proof = FRICTIONS[f.title]?.case;
    const fresh = proof && !cited.has(proof.slug) ? proof : undefined;
    if (fresh) cited.add(fresh.slug);
    return { title: f.title, action: FRICTIONS[f.title]?.action ?? "", case: fresh };
  });

  const subScores = [
    { label: "Tâches répétitives", value: Math.round((1 - fr) * 100),
      insight: fr > 0.6 ? "Une grande part du travail répétitif se fait encore à la main." : fr > 0.3 ? "Une partie du travail répétitif pourrait disparaître." : "Peu de tâches répétitives : bon point de départ." },
    { label: "Outils connectés", value: Math.round((1 - intPen) * 100),
      insight: intPen >= 0.7 ? "Vos outils ne se parlent pas : quelqu'un fait le pont à la main." : intPen > 0 ? "Vos outils se parlent en partie." : "Vos outils sont bien connectés." },
    { label: "Accès à l'information", value: Math.round((1 - accPen) * 100),
      insight: accPen >= 0.55 ? "L'information se cherche plus qu'elle ne se trouve." : accPen > 0 ? "L'accès à l'information peut encore être simplifié." : "Chacun trouve l'information facilement." },
    { label: "Processus écrits", value: Math.round((1 - docPen) * 100),
      insight: docPen >= 0.7 ? "Vos processus reposent sur la mémoire de quelques personnes." : docPen > 0 ? "Vos processus sont écrits en partie." : "Vos processus sont documentés." },
  ];

  return { score, maturity, hoursLost, annualCost, annualDays, frictions, recommendations, subScores };
}

export function resultTitle(score: number): string {
  if (score >= 70) return "Vous avez un potentiel de gain important.";
  if (score >= 45) return "Vous avez un vrai potentiel de gain.";
  return "Votre organisation est déjà bien structurée.";
}

/** Vérifie qu'un objet reçu par l'API a bien la forme de réponses complètes. */
export function isAnswers(x: unknown): x is Answers {
  if (!x || typeof x !== "object") return false;
  const a = x as Record<string, unknown>;
  const str = ["employees", "sector", "adminPeople", "toolsIntegrated", "infoAccess", "adminHours", "processesDoc", "timing"];
  const num: FrictionKey[] = ["reDataEntry", "reSearchDoc", "reChase", "reReporting", "reWaitValidation", "reMultiSoftware"];
  return str.every((k) => typeof a[k] === "string")
    && num.every((k) => typeof a[k] === "number")
    && Array.isArray(a.tools) && Array.isArray(a.priorities);
}

export const frequencyLabel = (v: number) => (v >= 0 && v <= 4 ? FREQUENCY[v] : "—");
