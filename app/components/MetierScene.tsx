import type { SceneMessage } from "../content/cases";

/**
 * Ce qui atterrit sur son téléphone un matin ordinaire.
 *
 * Un prospect ne lit pas un paragraphe : il reconnaît un écran. Quatre
 * messages courts se lisent en deux secondes là où une narration en prend
 * vingt — et personne ne reste vingt secondes sur une section qu'il n'a
 * pas encore décidé de lire.
 *
 * Pas de fausse barre d'état ni de faux clavier : ça ferait maquette.
 */
export default function MetierScene({ messages }: { messages: SceneMessage[] }) {
  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      <div className="rounded-[26px] border border-neutral-200 bg-white p-3 shadow-[0_24px_60px_rgba(0,0,0,0.07)]">
        <div className="mb-3 flex items-center gap-2 px-2 pt-1">
          <span className="msg-dot h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="mono text-[9px] tracking-[0.14em] text-neutral-400">CE MATIN</span>
        </div>

        <div className="flex flex-col gap-2">
          {messages.map((m, i) => (
            <div key={m.texte} className={`msg msg-${i + 1} flex ${m.moi ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 ${
                  m.moi ? "bg-[#0a0a0a] text-white" : "bg-neutral-100 text-[#0a0a0a]"
                }`}
              >
                <div className="mb-0.5 flex items-baseline gap-2">
                  <span className={`text-[10.5px] font-semibold ${m.moi ? "text-white/60" : "text-neutral-500"}`}>
                    {m.de}
                  </span>
                  <span className={`mono text-[8.5px] ${m.moi ? "text-white/35" : "text-neutral-400"}`}>
                    {m.heure}
                  </span>
                </div>
                <p className="text-[13.5px] leading-snug">{m.texte}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
