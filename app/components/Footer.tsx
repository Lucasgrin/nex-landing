import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "../content/services";
import { CITIES } from "../content/cities";
import { METIERS } from "../content/metiers";
import { SITE, formatAddress, telHref } from "../content/site";

/**
 * Le footer porte le maillage interne du site : c'est lui qui relie les pages
 * service, villes et réalisations entre elles. Sans ce maillage, une page
 * publiée reste orpheline et n'est quasiment jamais explorée par Google.
 */
export default function Footer() {
  const tel = telHref();

  return (
    <footer className="border-t border-neutral-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Image src="/nex-logo.svg" alt="NeX" width={70} height={21} className="mb-3 h-6 w-auto" />
            <p className="max-w-xs text-xs leading-relaxed text-neutral-400">
              Conception de logiciels métier sur mesure. Automatisations. Applications internes.
              Intelligence artificielle.
            </p>
            <address className="mt-4 not-italic text-xs leading-relaxed text-neutral-400">
              <span className="block text-neutral-500">{SITE.legalName}</span>
              {formatAddress()}
              {tel && (
                <a href={tel} className="mt-1 block transition-colors hover:text-[#0a0a0a]">
                  {SITE.phone}
                </a>
              )}
              {SITE.email && (
                <a href={`mailto:${SITE.email}`} className="block transition-colors hover:text-[#0a0a0a]">
                  {SITE.email}
                </a>
              )}
            </address>
          </div>

          <nav className="flex flex-col gap-2 text-sm text-neutral-400">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-neutral-300">Services</p>
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="transition-colors hover:text-[#0a0a0a]">
                {s.name}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-2 text-sm text-neutral-400">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-neutral-300">Métiers</p>
            {METIERS.map((m) => (
              <Link key={m.slug} href={`/metiers/${m.slug}`} className="transition-colors hover:text-[#0a0a0a]">
                {m.name}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-2 text-sm text-neutral-400">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-neutral-300">Régions</p>
            {CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/logiciel-sur-mesure/${c.slug}`}
                className="transition-colors hover:text-[#0a0a0a]"
              >
                {c.name}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-2 text-sm text-neutral-400">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-neutral-300">Agence</p>
            <Link href="/a-propos" className="transition-colors hover:text-[#0a0a0a]">À propos</Link>
            <Link href="/realisations" className="transition-colors hover:text-[#0a0a0a]">Réalisations</Link>
            <Link href="/diagnostic" className="transition-colors hover:text-[#0a0a0a]">Diagnostic gratuit</Link>
            <Link href="/#methode" className="transition-colors hover:text-[#0a0a0a]">Méthode</Link>
            <Link href="/#faq" className="transition-colors hover:text-[#0a0a0a]">FAQ</Link>
            <Link href="/#contact" className="transition-colors hover:text-[#0a0a0a]">Contact</Link>
          </nav>
        </div>

        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-neutral-300">
          Interventions à Genève, Lausanne, dans le canton de Vaud, à Fribourg, Neuchâtel, en Valais et
          dans le Jura.
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-neutral-100 pt-6 text-xs text-neutral-300 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name} · {SITE.legalName}. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="transition-colors hover:text-[#0a0a0a]">Mentions légales</Link>
            <Link href="/politique-de-confidentialite" className="transition-colors hover:text-[#0a0a0a]">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
