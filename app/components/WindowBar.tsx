/**
 * La barre de fenêtre des écrans d'outil — trois pastilles, le nom de
 * l'écran en mono, un point vert. C'est celle du hero : partagée par la
 * capture seule, le slider et le schéma, pour qu'un écran ait la même tête
 * partout sur le site.
 *
 * Le badge est dans la barre, pas sous l'image : collé à l'écran, il suit la
 * capture si quelqu'un la recadre ou la repartage.
 */
export default function WindowBar({ screen, badge }: { screen: string; badge?: string }) {
  return (
    <div className="flex items-center gap-2.5 bg-[#0a0a0a] px-3.5 py-2.5">
      <span aria-hidden className="flex gap-[5px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-[7px] w-[7px] rounded-full bg-white/20" />
        ))}
      </span>
      <span className="mono truncate text-[9.5px] tracking-[0.06em] text-white/35">{screen}</span>
      <span className="ml-auto flex shrink-0 items-center gap-2.5">
        {badge && (
          <span className="mono whitespace-nowrap rounded-full border border-white/20 px-2 py-[3px] text-[8.5px] uppercase tracking-[0.1em] text-white/55">
            {badge}
          </span>
        )}
        <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-green-400" />
      </span>
    </div>
  );
}
