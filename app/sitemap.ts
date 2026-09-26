import type { MetadataRoute } from "next";
import { SITE } from "./content/site";
import { SERVICES } from "./content/services";
import { CITIES } from "./content/cities";
import { ALL_STUDIES } from "./content/cases";
import { ARTICLES } from "./content/articles";

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
    entry("/realisations", 0.9),
    ...ALL_STUDIES.map((c) => entry(`/realisations/${c.slug}`, 0.8)),
    entry("/blog", 0.8, "weekly"),
    // La date réelle de mise à jour, pas celle du build : c'est elle qui
    // dit aux moteurs qu'un article a changé et mérite d'être relu.
    ...ARTICLES.map((a) => ({ ...entry(`/blog/${a.slug}`, 0.7), lastModified: new Date(`${a.updatedAt}T12:00:00`) })),
    entry("/logiciel-sur-mesure", 0.7),
    ...CITIES.map((c) => entry(`/logiciel-sur-mesure/${c.slug}`, 0.6)),
    entry("/a-propos", 0.7),
    entry("/diagnostic", 0.8),
    entry("/mentions-legales", 0.2, "yearly"),
    entry("/politique-de-confidentialite", 0.2, "yearly"),
  ];
}
