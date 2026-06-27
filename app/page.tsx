import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import Problems from "./components/Problems";
import TwoOffers from "./components/TwoOffers";
import Solution from "./components/Solution";
import Expertises from "./components/Expertises";
import WhyCustom from "./components/WhyCustom";
import CaseStudies from "./components/CaseStudies";
import WhyNex from "./components/WhyNex";
import Quiz from "./components/Quiz";
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
        <Problems />
        <TwoOffers />
        <Solution />
        <Expertises />
        <WhyCustom />
        <CaseStudies />
        <WhyNex />
        <Quiz />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
