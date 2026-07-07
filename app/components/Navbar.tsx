"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
          {[["#faq","FAQ"]].map(([href,label]) => (
            <a key={href} href={href} className="hover:text-[#0a0a0a] transition-colors">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/diagnostic" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-full border border-neutral-200 text-neutral-700 hover:border-neutral-400 hover:text-[#0a0a0a] transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" />
            Diagnostic gratuit
          </Link>
          <a href="https://cal.com/agencesolve/reservez-votre-audit-offert?overlayCalendar=true" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors">
            Réserver un appel
          </a>
        </div>
      </div>
    </header>
  );
}
