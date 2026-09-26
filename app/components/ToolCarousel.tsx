"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CasePhoto } from "../content/cases";
import WindowBar from "./WindowBar";

const INTERVAL = 6000;

/**
 * Proportion maximale de la fenêtre (hauteur / largeur) : celle de la série
 * C Carré, qui sert d'étalon. Au-delà, la fenêtre mangeait tout l'écran et
 * les pages ne se ressemblaient plus d'un client à l'autre.
 */
const MAX_RATIO = 676 / 1600;

/**
 * Plusieurs écrans d'un même outil, dans une seule fenêtre qui tourne.
 *
 * Une capture montre un angle ; l'outil en a plusieurs — ce que voit
 * l'agence, ce que reçoit son client. Les empiler rallongeait la page d'un
 * écran entier par capture ; ici ils se relaient au même endroit.
 *
 * La fenêtre garde une hauteur fixe — sans ça, la page sauterait à chaque
 * changement. Elle prend la proportion médiane de la série : calée sur
 * l'écran le plus haut, un écran plat flottait au milieu d'un grand vide.
 * Cette médiane est plafonnée à MAX_RATIO. Un écran plus haut que la fenêtre s'affiche depuis son sommet, comme une
 * fenêtre qu'on n'a pas encore fait défiler ; un écran plus plat reste
 * entier, centré sur le fond.
 *
 * Le défilement automatique s'arrête dès qu'on survole, qu'on prend la main
 * au clavier ou que la section sort de l'écran — et ne démarre pas du tout
 * si le système demande moins d'animations.
 */
export default function ToolCarousel({ photos, alt }: { photos: CasePhoto[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLElement>(null);

  const count = photos.length;
  const active = photos[index];
  const maxWidth = Math.max(...photos.map((p) => p.width));
  const ratios = photos.map((p) => p.height / p.width).sort((a, b) => a - b);
  const ratio = Math.min(ratios[Math.floor((ratios.length - 1) / 2)], MAX_RATIO);
  const autoplay = count > 1 && !paused && visible && !reduced;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearTimeout(t);
  }, [autoplay, index, count]);

  const go = (i: number) => setIndex((i + count) % count);

  return (
    <figure
      ref={root}
      className="mx-auto"
      style={{ maxWidth }}
      aria-roledescription="carrousel"
      aria-label={alt}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-[0_18px_44px_-24px_rgba(0,0,0,0.35)]">
        <WindowBar
          screen={active.screen}
          badge={active.anonymised ? "Données fictives" : active.masked ? "Données masquées" : undefined}
        />

        <div className="relative bg-white" style={{ aspectRatio: `${1 / ratio}` }}>
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              aria-hidden={i !== index}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={photo.src}
                alt={`${alt} — ${photo.screen}`}
                fill
                sizes={`(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`}
                loading={i === 0 ? "eager" : "lazy"}
                quality={95}
                className={photo.height / photo.width > ratio ? "object-cover object-top" : "object-contain"}
              />
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-5 flex items-center gap-3">
          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Écrans de l'outil">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => go(i)}
                className={`relative shrink-0 overflow-hidden whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                  i === index
                    ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-[#0a0a0a]"
                }`}
              >
                {photo.screen}
                {/* La jauge dit combien de temps il reste avant l'écran
                    suivant — sans elle, le changement surprend. */}
                {i === index && autoplay && (
                  <span
                    key={`${index}-progress`}
                    aria-hidden
                    className="carousel-progress absolute bottom-0 left-0 h-[2px] bg-green-400"
                    style={{ animationDuration: `${INTERVAL}ms` }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 gap-2">
            {[
              { label: "Écran précédent", d: "M19 12H6M11 18l-6-6 6-6", step: -1 },
              { label: "Écran suivant", d: "M5 12h13M13 6l6 6-6 6", step: 1 },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                aria-label={b.label}
                onClick={() => go(index + b.step)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:border-neutral-400 hover:text-[#0a0a0a]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={b.d} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      <figcaption aria-live={autoplay ? "off" : "polite"} className="mt-4 max-w-[68ch] text-[14.5px] leading-relaxed text-neutral-500">
        {active.caption}
      </figcaption>
    </figure>
  );
}
