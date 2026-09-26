/**
 * L'icône d'un service : un trait, 24 px, dans la couleur du texte.
 * Elle sert à repérer une expertise d'un coup d'œil dans une grille — pas à
 * décorer.
 */
const PATHS: Record<string, string[]> = {
  // Un pipeline : trois colonnes de hauteur décroissante.
  "crm-sur-mesure": ["M4 5h4v14H4z", "M10 5h4v10h-4z", "M16 5h4v6h-4z"],
  // Des modules empilés.
  "erp-sur-mesure": ["M12 3 3 8l9 5 9-5-9-5Z", "m3 13 9 5 9-5", "m3 17.5 9 5 9-5"],
  // Une fenêtre avec un profil.
  "portail-client": ["M3 5h18v14H3z", "M3 9h18", "M9 15a3 3 0 0 1 6 0", "M12 12.5h.01"],
  // Un téléphone.
  "application-metier": ["M7 2h10v20H7z", "M11 18h2"],
  // Une boucle.
  "automatisation-processus": ["M4 12a8 8 0 0 1 13.7-5.6L20 9", "M20 4v5h-5", "M20 12a8 8 0 0 1-13.7 5.6L4 15", "M4 20v-5h5"],
  // Une étincelle.
  "agents-ia": ["M12 3v4", "M12 17v4", "M3 12h4", "M17 12h4", "M12 8.5 13.2 11l2.3.9-2.3.9L12 15.5l-1.2-2.7-2.3-.9 2.3-.9Z"],
};

export default function ServiceIcon({ slug, size = 22 }: { slug: string; size?: number }) {
  const d = PATHS[slug] ?? [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {d.map((p) => (
        <path key={p} d={p} />
      ))}
    </svg>
  );
}
