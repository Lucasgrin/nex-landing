import type { NextConfig } from "next";
import { CASE_TO_METIER } from "./app/content/cases";

const nextConfig: NextConfig = {
  /**
   * Les réalisations fusionnées dans leur page métier redirigent en 301 :
   * une seule URL canonique par sujet, et le référencement acquis suit.
   */
  async redirects() {
    return Object.entries(CASE_TO_METIER).map(([slug, metier]) => ({
      source: `/realisations/${slug}`,
      destination: `/metiers/${metier}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
