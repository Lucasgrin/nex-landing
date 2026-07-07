import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import Transformation from "./components/Transformation";
import Benefits from "./components/Benefits";
import ForWho from "./components/ForWho";
import WhatWeBuild from "./components/WhatWeBuild";
import Method from "./components/Method";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <Transformation />
        <Benefits />
        <ForWho />
        <WhatWeBuild />
        <Method />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
