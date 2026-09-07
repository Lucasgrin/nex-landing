import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import WhatWeBuild from "./components/WhatWeBuild";
import CaseStudies from "./components/CaseStudies";
import WhyCustom from "./components/WhyCustom";
import AiEra from "./components/AiEra";
import Method from "./components/Method";
import Team from "./components/Team";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Un seul objectif : décrocher l'appel.
 *
 * L'ordre suit la séquence de décision d'un visiteur qui ne nous connaît pas.
 * La VSL du hero porte l'explication ; les sections suivantes ne font que
 * répondre, dans l'ordre, aux objections qui restent.
 *
 * Sections volontairement absentes : TrustBar et Transformation (leurs
 * arguments sont désormais portés par le hero et la scène comparative) et
 * ForWho (sa liste faisait doublon avec la colonne « marché » du comparatif).
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Promesse, vidéo, preuve sociale */}
        <Hero />
        <LogoStrip />

        {/* Ce qu'on construit, puis pour qui on l'a déjà fait */}
        <WhatWeBuild />
        <CaseStudies variant="rail" />

        {/* Les deux objections qui bloquent : « pourquoi pas un logiciel du
            marché ? » et « c'est un trop gros chantier pour nous » */}
        <WhyCustom />
        <AiEra />

        {/* Comment ça se passe, et avec qui */}
        <Method />
        <Team />

        {/* Dernières objections, puis l'appel */}
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
