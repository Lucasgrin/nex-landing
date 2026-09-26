"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "../content/site";

/**
 * En-tête du site.
 *
 * Cinq entrées : les deux axes du maillage (ce qu'on fait, et pour quels
 * métiers — réalisations et cas d'usage type réunis), le blog, puis
 * l'agence et la FAQ. Sous lg, elles passent dans un
 * panneau déroulant — avant, il n'y avait tout simplement aucune navigation
 * sur téléphone.
 */
const LIENS: [string, string][] = [
  ["/services", "Services"],
  ["/realisations", "Réalisations"],
  ["/blog", "Blog"],
  ["/a-propos", "À propos"],
  ["/#faq", "FAQ"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Échap referme le panneau : un menu qu'on ne peut pas quitter au clavier
  // piège les gens qui n'utilisent pas la souris.
  useEffect(() => {
    if (!ouvert) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [ouvert]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled || ouvert ? "border-b border-neutral-100 bg-white/95 py-4 backdrop-blur-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="NeX — retour à l'accueil" onClick={() => setOuvert(false)}>
          <Image src="/nex-logo.svg" alt="NeX" width={80} height={24} loading="eager" className="h-7 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-400 lg:flex">
          {LIENS.map(([href, label]) => (
            <a key={href} href={href} className="transition-colors hover:text-[#0a0a0a]">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/diagnostic"
            className="hidden items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:text-[#0a0a0a] sm:inline-flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0a0a0a]" />
            Diagnostic gratuit
          </Link>
          <a
            href={SITE.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            Réserver un appel
          </a>

          <button
            type="button"
            onClick={() => setOuvert((o) => !o)}
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-[#0a0a0a] lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              {ouvert ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {ouvert && (
        <nav id="menu-mobile" className="mx-auto max-w-6xl px-6 pb-3 pt-5 lg:hidden">
          <ul className="flex flex-col">
            {LIENS.map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOuvert(false)}
                  className="flex min-h-[52px] items-center border-b border-neutral-100 text-base font-medium text-[#0a0a0a]"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/diagnostic"
                onClick={() => setOuvert(false)}
                className="flex min-h-[52px] items-center text-base font-medium text-neutral-500 sm:hidden"
              >
                Diagnostic gratuit
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
