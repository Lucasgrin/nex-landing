import AnimateOnScroll from "./AnimateOnScroll";

const stats = [
  { value: "3,7×",  label: "retour par franc investi",          source: "Microsoft-IDC" },
  { value: "−5h",   label: "récupérées par employé / semaine",  source: "SAP Research" },
  { value: "74%",   label: "ROI positif dès la 1ʳᵉ année",     source: "Deloitte" },
  { value: "57%",   label: "des tâches automatisables",         source: "McKinsey" },
  { value: "+30%",  label: "de productivité sur les processus", source: "McKinsey" },
  { value: "159%",  label: "ROI médian à 12 mois en PME",       source: "Baromètre IA PME" },
];

export default function AiStats() {
  return (
    <section className="py-16 px-6 bg-[#0a0a0a]">
      <AnimateOnScroll>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map(({ value, label, source }) => (
              <div key={value} className="flex flex-col items-center text-center">
                <p className="text-4xl font-bold text-white leading-none mb-2" style={{fontFamily:"var(--font-space-grotesk)"}}>
                  {value}
                </p>
                <div className="min-h-[2.5rem] flex items-center justify-center mb-1.5">
                  <p className="text-sm text-white/50 leading-snug">{label}</p>
                </div>
                <p className="text-[10px] font-semibold text-white/20 uppercase tracking-widest">{source}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
