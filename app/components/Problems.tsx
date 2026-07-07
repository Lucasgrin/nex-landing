import AnimateOnScroll from "./AnimateOnScroll";

function ExcelVisual() {
  return (
    <div className="p-4 space-y-1.5">
      {[
        { name: "Excel_clients_FINAL_v3.xlsx", warn: true },
        { name: "Planning_2024_NEW_v2.xlsx",   warn: true },
        { name: "Budget_FINAL_FINAL.xlsx",      warn: false },
      ].map(({ name, warn }) => (
        <div key={name} className="flex items-center gap-2 px-2.5 py-1.5 bg-white rounded-lg border border-neutral-200">
          <span className="text-green-600 text-xs shrink-0">⊞</span>
          <span className="text-neutral-500 text-[11px] truncate flex-1">{name}</span>
          {warn && <span className="text-amber-400 text-[10px] shrink-0">⚠</span>}
        </div>
      ))}
    </div>
  );
}

function EmailVisual() {
  return (
    <div className="p-4 space-y-1.5">
      {[
        { from: "D", subj: "RE: RE: RE: Devis Dupont…", badge: "47" },
        { from: "M", subj: "T'as envoyé le doc ?",      badge: null },
        { from: "É", subj: "Voir email Marc du 12/03",  badge: null },
      ].map(({ from, subj, badge }) => (
        <div key={subj} className="flex items-center gap-2 px-2.5 py-1.5 bg-white rounded-lg border border-neutral-200">
          <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center text-[9px] font-bold text-neutral-400 shrink-0">{from}</div>
          <span className="text-neutral-500 text-[11px] truncate flex-1">{subj}</span>
          {badge && <span className="bg-red-100 text-red-500 text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">{badge}</span>}
        </div>
      ))}
    </div>
  );
}

function WhatsAppVisual() {
  return (
    <div className="p-4 space-y-2">
      {[
        { text: "T'as le contact de Martin ?", mine: false },
        { text: "Quelqu'un a le devis Dupont ?", mine: false },
        { text: "Voir msg d'hier svp 👀",        mine: true  },
      ].map(({ text, mine }) => (
        <div key={text} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
          <div className={`text-[11px] px-3 py-1.5 rounded-2xl max-w-[85%] leading-snug ${
            mine ? "bg-[#dcf8c6] text-neutral-700" : "bg-white border border-neutral-200 text-neutral-600"
          }`}>{text}</div>
        </div>
      ))}
    </div>
  );
}

function DoubleSaisieVisual() {
  const fields = ["Dupont SA", "Lyon 69001", "4 500,00 €"];
  return (
    <div className="p-4 flex items-center gap-2">
      <div className="flex-1 space-y-1.5">
        <p className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest">CRM</p>
        {fields.map(v => (
          <div key={v} className="h-6 bg-white border border-neutral-200 rounded px-2 flex items-center text-[10px] text-neutral-500">{v}</div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1 shrink-0 px-1">
        <div className="w-px h-3 bg-neutral-200" />
        <span className="text-neutral-300 text-xs">⟳</span>
        <p className="text-[8px] text-neutral-300 whitespace-nowrap">à la main</p>
        <div className="w-px h-3 bg-neutral-200" />
      </div>
      <div className="flex-1 space-y-1.5">
        <p className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest">Compta</p>
        {fields.map(v => (
          <div key={v} className="h-6 bg-white border border-neutral-200 rounded px-2 flex items-center text-[10px] text-neutral-500">{v}</div>
        ))}
      </div>
    </div>
  );
}

function ProcessVisual() {
  return (
    <div className="p-4 space-y-2">
      {[
        "Copier les données dans Excel",
        "Envoyer un email de confirmation",
        "Mettre à jour le tableau",
        "Notifier l'équipe sur WhatsApp",
      ].map(text => (
        <div key={text} className="flex items-center gap-2.5 text-[11px] text-neutral-500">
          <div className="w-3.5 h-3.5 rounded border border-neutral-300 shrink-0" />
          {text}
        </div>
      ))}
    </div>
  );
}

function DataVisual() {
  const apps = [
    { bg: "bg-blue-50",   text: "text-blue-400",   name: "Drive"  },
    { bg: "bg-violet-50", text: "text-violet-400",  name: "Notion" },
    { bg: "bg-green-50",  text: "text-green-500",   name: "Sheets" },
    { bg: "bg-orange-50", text: "text-orange-400",  name: "Slack"  },
    { bg: "bg-red-50",    text: "text-red-400",     name: "Email"  },
    { bg: "bg-neutral-100", text: "text-neutral-400", name: "Local" },
  ];
  return (
    <div className="p-4 grid grid-cols-3 gap-2">
      {apps.map(({ bg, text, name }) => (
        <div key={name} className={`${bg} rounded-xl py-2 flex flex-col items-center gap-1`}>
          <span className={`text-base ${text}`}>◫</span>
          <span className={`text-[9px] font-semibold ${text}`}>{name}</span>
        </div>
      ))}
    </div>
  );
}

function SiloVisual() {
  const tools = ["CRM", "ERP", "Compta", "RH"];
  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-1">
        {tools.map((name, i) => (
          <div key={name} className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-full py-2 bg-white border border-neutral-200 rounded-lg flex items-center justify-center text-[10px] font-bold text-neutral-400">
              {name}
            </div>
            {i < tools.length - 1 && (
              <span className="absolute" />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-around mt-2 px-5">
        {["✗", "✗", "✗"].map((x, i) => (
          <span key={i} className="text-red-300 text-xs font-bold">{x}</span>
        ))}
      </div>
      <div className="mt-1.5 text-center text-[10px] text-neutral-300">aucune synchronisation</div>
    </div>
  );
}

function TimeVisual() {
  const days = [
    { day: "L", h: "2h30", pct: 80 },
    { day: "M", h: "1h45", pct: 55 },
    { day: "M", h: "3h00", pct: 100 },
    { day: "J", h: "2h00", pct: 65 },
    { day: "V", h: "1h15", pct: 40 },
  ];
  return (
    <div className="p-4">
      <p className="text-[9px] text-neutral-300 uppercase tracking-widest mb-3">Heures perdues / semaine</p>
      <div className="flex items-end gap-1.5 h-14">
        {days.map(({ day, h, pct }, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[9px] text-red-400 font-semibold">{h}</span>
            <div className="w-full rounded-sm bg-red-100" style={{ height: `${pct}%` }} />
            <span className="text-[9px] text-neutral-400">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const problems = [
  { Visual: ExcelVisual,      icon: "⊞", label: "Excel partout",     desc: "Des fichiers qui se multiplient, que personne ne tient à jour." },
  { Visual: EmailVisual,      icon: "✉", label: "Emails perdus",      desc: "Des informations noyées dans des boîtes mail surchargées." },
  { Visual: WhatsAppVisual,   icon: "◎", label: "WhatsApp pro",       desc: "Des décisions importantes dans des fils éphémères." },
  { Visual: DoubleSaisieVisual, icon:"⟳",label: "Double saisie",     desc: "Les mêmes données ressaisies dans plusieurs outils." },
  { Visual: ProcessVisual,    icon: "⚙", label: "Processus manuels", desc: "Des tâches répétitives qui mobilisent vos équipes chaque jour." },
  { Visual: DataVisual,       icon: "◫", label: "Données dispersées",desc: "Impossible de savoir où se trouve l'information fiable." },
  { Visual: SiloVisual,       icon: "⊗", label: "Logiciels isolés",  desc: "Vos outils ne se parlent pas. Vous faites le lien à la main." },
  { Visual: TimeVisual,       icon: "◷", label: "Temps perdu",       desc: "Des heures chaque semaine à gérer l'outil plutôt que le business." },
];

export default function Problems() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">Le constat</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-4 max-w-2xl" style={{fontFamily:"var(--font-space-grotesk)"}}>
            Votre entreprise fonctionne avec trop d&apos;outils.
          </h2>
          <p className="text-base text-neutral-500 max-w-lg mb-16 leading-relaxed">
            Ce n&apos;est pas une question de taille. C&apos;est le quotidien de la plupart des PME.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {problems.map(({ Visual, icon, label, desc }, i) => (
            <AnimateOnScroll key={label} delay={i * 50}>
              <div className="group h-full border border-neutral-100 rounded-2xl overflow-hidden hover:border-neutral-300 hover:-translate-y-1 hover:shadow-md transition-all duration-200 bg-white cursor-default">
                <div className="h-[148px] overflow-hidden bg-neutral-50 border-b border-neutral-100 group-hover:bg-neutral-100/70 transition-colors duration-200 flex flex-col justify-center">
                  <Visual />
                </div>
                <div className="p-5">
                  <span className="text-xl block mb-3 text-neutral-300 group-hover:text-[#0a0a0a] transition-colors duration-200">{icon}</span>
                  <p className="text-sm font-semibold text-[#0a0a0a] mb-1.5">{label}</p>
                  <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
