import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";

const logos = [
  { src:"/logos/nyl.png",       alt:"NYL",       w:500,  h:250, size:52 },
  { src:"/logos/podx.png",      alt:"PodX",      w:3001, h:886, size:36 },
  { src:"/logos/welcomize.png", alt:"Welcomize", w:1366, h:343, size:36 },
  { src:"/logos/c-carre.svg",   alt:"C Carré",   w:857,  h:275, size:36 },
];

export default function LogoStrip() {
  return (
    <section className="border-y border-neutral-100 py-14">
      <div className="max-w-5xl mx-auto px-6">
        <AnimateOnScroll>
          <p className="text-[10px] font-semibold text-neutral-300 uppercase tracking-widest text-center mb-10">
            Ils font confiance à NeX
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {logos.map(({ src, alt, w, h, size }) => {
              const displayW = Math.round((w / h) * size);
              return (
                <div
                  key={alt}
                  className="flex items-center justify-center"
                  style={{ height: size, width: displayW }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={w}
                    height={h}
                    className="object-contain opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale hover:grayscale-0"
                    style={{ height: size, width: displayW }}
                  />
                </div>
              );
            })}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
