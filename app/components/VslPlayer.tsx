"use client";

import { useState } from "react";
import Image from "next/image";
import { SITE } from "../content/site";
import HeroVisual from "./HeroVisual";

/**
 * Le lecteur de la VSL du hero.
 *
 * Rien ne se charge tant qu'on n'a pas cliqué : au repos c'est une image
 * (ou l'illustration animée tant qu'il n'y a pas de poster), et la vidéo
 * n'est montée qu'au clic. Le hero reste donc léger pour les 80 % de
 * visiteurs qui ne lanceront jamais la vidéo, et le son démarre avec la
 * voix — ce qu'aucun autoplay ne permet.
 *
 * Le clic est aussi le signal : quelqu'un qui lance la VSL est un visiteur
 * qualifié. C'est là qu'on branchera l'analytics le jour venu (onStart).
 */
export default function VslPlayer() {
  const [started, setStarted] = useState(false);
  const { sources, poster, captions, duration, hook, speaker } = SITE.vsl;

  // Pas encore de fichier : l'illustration animée tient le cadre, sans
  // bouton play — on ne promet pas une vidéo qui n'existe pas.
  if (sources.length === 0) return <HeroVisual />;

  if (started) {
    return (
      <video
        poster={poster || undefined}
        controls
        autoPlay
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full bg-[#0a0a0a]"
        aria-label="NeX — ce que change un outil construit pour votre métier"
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
        {captions && (
          <track src={captions} kind="subtitles" srcLang="fr" label="Français" default />
        )}
        Votre navigateur ne peut pas lire cette vidéo.{" "}
        <a href={sources[sources.length - 1].src} className="underline">
          Télécharger la vidéo
        </a>
      </video>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setStarted(true)}
      aria-label={`Lancer la vidéo de présentation${duration ? ` (${duration})` : ""}`}
      className="group absolute inset-0 h-full w-full cursor-pointer"
    >
      {poster ? (
        <Image
          src={poster}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 620px, 100vw"
          className="object-cover"
        />
      ) : (
        <HeroVisual />
      )}

      {/* Deux voiles, deux rôles. Le premier, très léger, calme l'image
          entière et s'efface au survol — la vignette s'éclaire quand on
          l'approche. Le second n'assombrit que le bas, pour que l'accroche
          reste lisible quel que soit ce qu'il y a derrière. */}
      <span className="absolute inset-0 bg-[#0a0a0a]/10 transition-colors group-hover:bg-transparent" />
      <span className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/35 to-transparent" />

      {/* En mobile le cadre est petit : le bouton rétrécit avec lui, et il se
          cale au milieu de la moitié haute — centré, il retomberait sur
          l'accroche. */}
      <span className="absolute inset-x-0 top-[46%] flex -translate-y-1/2 justify-center md:top-1/2">
        <span className="playring flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-transform group-hover:scale-110 md:h-[68px] md:w-[68px]">
          <svg viewBox="0 0 24 24" fill="#0a0a0a" aria-hidden className="ml-0.5 h-[13px] w-[13px] md:h-[21px] md:w-[21px]">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
      </span>

      {/* L'accroche : c'est elle qui donne envie de cliquer, pas le bouton.
          Une promesse chiffrée, et le nom de qui la formule. */}
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 text-left md:gap-4 md:p-6">
        <span className="block">
          {speaker && (
            <span className="mono mb-1 block text-[7.5px] uppercase tracking-[0.1em] text-white/55 md:mb-2 md:text-[10px] md:tracking-[0.14em]">
              {speaker}
            </span>
          )}
          {hook && (
            <span
              className="block max-w-[16ch] text-[12.5px] font-semibold leading-[1.18] tracking-[-0.02em] text-white md:max-w-[18ch] md:text-[26px]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {hook}
            </span>
          )}
        </span>

        {duration && (
          <span className="mono shrink-0 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[9px] tracking-[0.1em] text-white backdrop-blur-sm md:px-3 md:py-1.5 md:text-[10px]">
            {duration.toUpperCase()}
          </span>
        )}
      </span>
    </button>
  );
}
