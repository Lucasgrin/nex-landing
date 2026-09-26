import AnimateOnScroll from "../AnimateOnScroll";

/**
 * Comment ça démarre — quatre étapes, les mêmes pour tous les services.
 *
 * C'est la version courte de la méthode de la home : le prospect qui hésite
 * ne se demande pas « est-ce le bon outil ? », il se demande « qu'est-ce qui
 * se passe si j'appelle ? ». La première étape est l'appel lui-même, pour
 * que le bouton qui suit soit la suite logique, pas un saut dans le vide.
 */
const STEPS = [
  ["Un appel de 30 minutes", "On regarde vos process réels et on vous dit franchement si le sur-mesure vaut le coup."],
  ["Des maquettes validées", "Vous voyez et validez les écrans avant la moindre ligne de code."],
  ["Des livraisons régulières", "L'outil arrive par étapes, toutes les deux semaines. Vous l'utilisez avant la fin du projet."],
  ["Un outil qui évolue", "Vos équipes sont formées, et chaque nouveau besoin devient un module de plus."],
];

export default function ServiceSteps() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map(([title, desc], i) => (
        <li key={title} className="h-full">
          <AnimateOnScroll delay={i * 70} className="relative flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6">
            <span className="mono flex h-8 w-8 items-center justify-center rounded-full bg-[#0a0a0a] text-[11px] text-white">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p
              className="mt-6 text-[17px] font-semibold leading-tight text-[#0a0a0a]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {title}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">{desc}</p>
          </AnimateOnScroll>
        </li>
      ))}
    </ol>
  );
}
