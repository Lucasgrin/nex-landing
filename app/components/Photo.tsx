import Image from "next/image";

/**
 * Image avec repli visuel propre.
 *
 * Tant qu'une photo n'existe pas (`src` à null), on affiche un cadre neutre
 * plutôt qu'une image cassée : la page reste présentable en production et le
 * jour où le fichier arrive, il suffit de renseigner le chemin dans
 * app/content/. Aucun autre changement de code n'est nécessaire.
 */
export function Photo({
  src,
  alt,
  caption,
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  eager = false,
}: {
  src: string | null;
  alt: string;
  caption?: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  return (
    <figure className={`relative overflow-hidden rounded-2xl bg-neutral-100 ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-neutral-100 to-neutral-200 px-4 text-center">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8.5" cy="10" r="1.5" />
            <path d="m21 15-5-4-4.5 4-2-1.5L3 18" />
          </svg>
          {caption && <figcaption className="text-[11px] font-medium text-neutral-400">{caption}</figcaption>}
        </div>
      )}
    </figure>
  );
}

/** Portrait d'une personne. Repli : silhouette neutre plutôt que des initiales. */
export function Avatar({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 40vw, 220px",
}: {
  src: string | null;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-neutral-100 ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-neutral-300" aria-hidden="true">
            <circle cx="12" cy="8.5" r="3.75" />
            <path d="M4.5 20c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5" />
          </svg>
        </div>
      )}
    </div>
  );
}
