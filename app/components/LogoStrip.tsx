import Image from "next/image";

/**
 * « Ils tournent sur nos outils » plutôt que « ils nous font confiance » :
 * plusieurs de ces sociétés sont les nôtres. Le dire est à la fois plus
 * honnête et plus fort — nous utilisons ce que nous vendons.
 */
const LOGOS: { src: string; alt: string; h: number }[] = [
  { src: "/logos/welcomize.png", alt: "Welcomize", h: 22 },
  { src: "/logos/nyl.png", alt: "NYL", h: 22 },
  { src: "/logos/podx.png", alt: "Pod X", h: 22 },
  { src: "/logos/c-carre.svg", alt: "C Carré", h: 22 },
  { src: "/logos/solve.svg", alt: "Solve", h: 21 },
  { src: "/logos/agence-day.svg", alt: "agenceDay", h: 15 },
];

export default function LogoStrip() {
  return (
    <section className="mt-16 border-y border-neutral-100 px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 md:flex-row md:items-center md:gap-14">
        <span className="mono shrink-0 text-[10px] tracking-[0.14em] text-neutral-300">
          ILS TOURNENT SUR NOS OUTILS
        </span>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-5 opacity-40 md:gap-x-13">
          {LOGOS.map(({ src, alt, h }) => (
            <Image
              key={src}
              src={src}
              alt={alt}
              width={160}
              height={h}
              style={{ height: h, width: "auto" }}
              className="grayscale"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
