"use client";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
const faqs = [
  {q:"Pourquoi du sur-mesure plutôt qu'un logiciel standard ?",a:"Un logiciel standard est conçu pour des besoins génériques. Il vous impose des contraintes et des limitations sur ce qui compte vraiment pour vous. Une solution sur mesure s'adapte exactement à vos processus, votre vocabulaire, vos équipes. L'adoption est immédiate et les gains sont mesurables."},
  {q:"Combien de temps faut-il pour développer une solution ?",a:"Un outil interne ciblé peut être livré en 4 à 8 semaines. Un CRM ou ERP complet prend généralement 3 à 6 mois. Nous travaillons de manière itérative : vous voyez des résultats concrets bien avant la livraison finale."},
  {q:"Quel est l'ordre de grandeur du budget ?",a:"Chaque projet est unique. Lors de notre premier échange, nous évaluons ensemble la portée du projet et proposons un chiffrage transparent. Ce qui est certain : le retour sur investissement est rapide quand le bon problème est adressé."},
  {q:"Travaillez-vous uniquement avec des PME ?",a:"Nous sommes spécialisés dans les PME de Suisse romande, car nous comprenons leurs contraintes : budgets maîtrisés, équipes réduites, besoin de solutions pragmatiques. Cela dit, nous évaluons chaque demande selon sa complexité."},
  {q:"L'intelligence artificielle est-elle obligatoire ?",a:"Absolument pas. L'IA n'est intégrée que lorsqu'elle apporte une valeur réelle et mesurable. Nous refusons de l'utiliser comme argument commercial. Si elle n'est pas utile dans votre cas, nous ne l'imposons pas."},
];
export default function FAQ() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <section id="faq" className="py-28 px-6 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Questions fréquentes</p>
          <h2 className="text-4xl font-bold tracking-tight text-[#0a0a0a] mb-12" style={{fontFamily:"var(--font-space-grotesk)"}}>Ce que vous voulez savoir.</h2>
        </AnimateOnScroll>
        <div className="space-y-2">
          {faqs.map(({q,a},i) => (
            <AnimateOnScroll key={i} delay={i*50}>
              <div className="border border-neutral-100 rounded-2xl bg-white overflow-hidden">
                <button className="w-full flex items-center justify-between px-7 py-5 text-left hover:bg-neutral-50 transition-colors" onClick={() => setOpen(open===i?null:i)} aria-expanded={open===i}>
                  <span className="text-sm font-semibold text-[#0a0a0a] pr-8" style={{fontFamily:"var(--font-space-grotesk)"}}>{q}</span>
                  <span className={`shrink-0 w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 text-xs transition-transform duration-200 ${open===i?"rotate-45":""}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open===i?"max-h-80":"max-h-0"}`}>
                  <p className="px-7 pb-6 text-sm text-neutral-500 leading-relaxed">{a}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
