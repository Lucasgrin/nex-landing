import Image from "next/image";
export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Image src="/nex-logo.svg" alt="NeX" width={70} height={21} className="h-6 w-auto mb-3" />
            <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">Logiciels métier sur mesure et intelligence artificielle pour les PME de Suisse romande.</p>
            <p className="text-xs text-neutral-300 mt-2">Payerne · Suisse romande</p>
          </div>
          <nav className="flex flex-col sm:flex-row gap-x-12 gap-y-4 text-sm text-neutral-400">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold text-neutral-300 uppercase tracking-widest mb-1">Services</p>
              {["CRM sur mesure","ERP sur mesure","Portails clients","Agents IA"].map(l => (
                <a key={l} href="#expertises" className="hover:text-[#0a0a0a] transition-colors">{l}</a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold text-neutral-300 uppercase tracking-widest mb-1">Agence</p>
              {[["#realisations","Réalisations"],["#pourquoi-nex","Pourquoi NeX"],["#faq","FAQ"],["#contact","Contact"]].map(([h,l]) => (
                <a key={h} href={h} className="hover:text-[#0a0a0a] transition-colors">{l}</a>
              ))}
            </div>
          </nav>
        </div>
        <div className="mt-10 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-300">
          <p>© {new Date().getFullYear()} NeX — Une marque Scale X Sàrl. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#0a0a0a] transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-[#0a0a0a] transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
