import type { MetadataRoute } from "next";
import { SITE } from "./content/site";
import { SERVICES } from "./content/services";
import { CITIES } from "./content/cities";
import { CASES, PUBLISHED_CASES, STANDALONE_CASES } from "./content/cases";
import { METIERS } from "./content/metiers";

/**
 * Sitemap généré à partir de la couche contenu : ajouter un service, une ville
 * ou une étude de cas dans app/content/ suffit à le faire apparaître ici.
 * Aucune liste d'URLs à maintenir à la main.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ) => ({ url: `${SITE.url}${path}`, lastModified: now, changeFrequency, priority });

  return [
    entry("", 1, "weekly"),
    entry("/services", 0.9),
    ...SERVICES.map((s) => entry(`/services/${s.slug}`, 0.8)),
    entry("/realisations", 0.8),
    entry("/metiers", 0.8),
    ...METIERS.map((m) => entry(`/metiers/${m.slug}`, 0.8)),
    ...STANDALONE_CASES.map((c) => entry(`/realisations/${c.slug}`, 0.7)),
    entry("/logiciel-sur-mesure", 0.7),
    ...CITIES.map((c) => entry(`/logiciel-sur-mesure/${c.slug}`, 0.6)),
    entry("/a-propos", 0.7),
    entry("/diagnostic", 0.8),
    entry("/mentions-legales", 0.2, "yearly"),
    entry("/politique-de-confidentialite", 0.2, "yearly"),
  ];
}
