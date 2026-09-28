import type { NextConfig } from "next";
import { METIER_REDIRECTS } from "./app/content/cases";

/**
 * En-têtes de sécurité, sur toutes les pages.
 *
 * La CSP ne restreint volontairement ni les scripts ni les styles : Next
 * injecte des scripts en ligne (hydratation, JSON-LD) qu'une CSP stricte
 * obligerait à signer un par un. Elle ferme en revanche ce qui ne sert à
 * rien ici et que les attaques exploitent : être affiché dans une iframe
 * (clickjacking), les plugins, et la réécriture de <base>.
 */
const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests",
  },
];

const nextConfig: NextConfig = {
  // Inutile d'annoncer la technologie du serveur à qui cherche une faille.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  images: {
    /**
     * Les captures d'interface sont pleines de texte de 9 à 11 px. Le WebP
     * en qualité 75 — la valeur par défaut — le réduit en bouillie : notre
     * PNG de 119 Ko ressort à 20 Ko, et plus rien ne se lit.
     *
     * Next 16 impose de déclarer les qualités autorisées, sans quoi
     * n'importe qui peut faire réencoder nos images dans 100 variantes.
     */
    qualities: [75, 95],
  },
  /**
   * Les anciennes pages métier redirigent en 301 vers la réalisation ou le
   * cas d'usage type qui les remplace : une seule URL par sujet, et le
   * référencement acquis suit.
   */
  async redirects() {
    return [
      // Une seule adresse pour Google : www.ne-x.ch renvoie en 301 vers
      // ne-x.ch, chemin compris. Sans ça, les deux se feraient concurrence.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ne-x.ch" }],
        destination: "https://ne-x.ch/:path*",
        permanent: true,
      },
      ...Object.entries(METIER_REDIRECTS).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
