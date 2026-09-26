/**
 * L'équipe NeX. Affichée sur la home (section confiance) et sur /a-propos.
 *
 * ⚠️ Les noms, fonctions et bios sont à compléter — voir CONTENU-A-COMPLETER.md
 * `photo: null` affiche un placeholder propre (initiales) au lieu d'une image
 * cassée. Dépose les fichiers dans public/equipe/ puis renseigne le chemin.
 */
export interface Member {
  slug: string;
  name: string;
  role: string;
  bio: string;
  /** Chemin depuis /public, ex. "/equipe/prenom-nom.jpg". null = placeholder. */
  photo: string | null;
  linkedin: string | null;
}

export const TEAM: Member[] = [
  {
    slug: "dylan-grandjean",
    name: "Dylan Grandjean",
    role: "CEO · Conception & relation client",
    bio: "", // TODO — 2 à 3 phrases : parcours, ce dont il s'occupe au quotidien, et pourquoi les PME de Suisse romande. Vide = le paragraphe n'est pas rendu.
    photo: "/equipe/dylan-grandjean-2.jpg", // versionné : un même nom fait resservir l'ancienne image par le cache navigateur
    linkedin: null,
  },
  {
    slug: "lucas-grin",
    name: "Lucas Grin",
    role: "COO · Développement & intelligence artificielle",
    bio: "", // TODO — 2 à 3 phrases : parcours technique, ce qu'il construit, et la conviction sur l'IA utile plutôt que gadget.
    photo: "/equipe/lucas-grin.jpg",
    linkedin: null,
  },
];

/**
 * Photos des locaux de Payerne. Un prospect appelé à froid qui voit un vrai
 * bureau, avec de vraies personnes dedans, se rassure immédiatement.
 * Dépose les fichiers dans public/locaux/ puis complète ce tableau.
 */
export interface Photo {
  src: string | null;
  alt: string;
  caption: string;
}

export const LOCAUX: Photo[] = [
  {
    src: "/locaux/bureaux-payerne.jpg",
    alt: "Les bureaux de NeX à Payerne : espace de travail partagé, poste de conception et table de réunion",
    caption: "Nos bureaux à Payerne",
  },
  // Ajoute-en d'autres ici : les deux emplacements secondaires réapparaissent
  // automatiquement dès qu'il y a plus d'une entrée.
];
