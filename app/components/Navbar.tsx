"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm border-b border-neutral-100 py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" aria-label="NeX">
          <Image src="/nex-logo.svg" alt="NeX" width={80} height={24} priority className="h-7 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-400 font-medium">
          {[["#expertises","Services"],["#realisations","Réalisations"],["#pourquoi-nex","Pourquoi NeX"],["#faq","FAQ"]].map(([href,label]) => (
            <a key={href} href={href} className="hover:text-[#0a0a0a] transition-colors">{label}</a>
          ))}
        </nav>
        <a href="#contact" className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors">
          Réserver un appel
        </a>
      </div>
    </header>
  );
}
