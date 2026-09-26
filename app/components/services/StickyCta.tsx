"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "../../content/site";

/**
 * La barre d'appel fixe, sur téléphone uniquement.
 *
 * Sur mobile, les boutons du haut disparaissent dès le premier défilement,
 * et le prochain appel à l'action est trois écrans plus bas. La barre
 * apparaît une fois l'en-tête passé, et s'efface en bas de page, là où le
 * bloc final prend le relais.
 */
export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const bottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      setShow(window.scrollY > 520 && bottom > 900);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="flex gap-2">
        <a
          href={SITE.calUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          className="flex min-h-[46px] flex-1 items-center justify-center rounded-full bg-[#0a0a0a] text-[14px] font-semibold text-white"
        >
          Réserver un appel
        </a>
        <Link
          href="/diagnostic"
          tabIndex={show ? 0 : -1}
          className="flex min-h-[46px] items-center justify-center rounded-full border border-neutral-300 px-5 text-[14px] font-semibold text-[#0a0a0a]"
        >
          Diagnostic
        </Link>
      </div>
    </div>
  );
}
