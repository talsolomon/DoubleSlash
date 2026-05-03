import { Context, Card, PHASE_META } from '../types'

const PHASES = ['explore', 'solidify', 'iterate', 'deliver'] as const

export default function FishKanban({ context }: { context: Context }) {
  const cardsByPhase = PHASES.reduce(
    (acc, phase) => {
      acc[phase] = context.cards.filter((c) => c.phase === phase)
      return acc
    },
    {} as Record<string, Card[]>
  )

  return (
    <div className="h-full flex flex-col">
      {/* Context title */}
      <div className="px-4 py-3 border-b border-ds-border">
        <h2 className="text-ds-text text-sm font-medium">{context.name}</h2>
        {context.brief && (
          <p className="text-ds-text-dim text-xs mt-0.5 line-clamp-2">{context.brief}</p>
        )}
      </div>

      {/* Kanban columns */}
      <div className="flex-1 flex overflow-x-auto p-3 gap-2">
        {PHASES.map((phase, i) => {
          const meta = PHASE_META[phase]
          const cards = cardsByPhase[phase]
          const isActive = context.phase === phase

          return (
            <div key={phase} className="flex items-start gap-1">
              {/* Column */}
              <div
                className={`w-48 shrink-0 rounded-xl border flex flex-col
                  ${isActive ? 'border-ds-border-light bg-ds-elevated' : 'border-ds-border bg-ds-surface'}`}
              >
                {/* Column header */}
                <div className={`px-3 py-2.5 border-b ${isActive ? 'border-ds-border-light' : 'border-ds-border'}`}>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs ${meta.color}`}>{meta.icon}</span>
                    <span
                      className={`text-xs font-mono font-medium ${isActive ? 'text-ds-text' : 'text-ds-text-secondary'}`}
                    >
                      {meta.label}
                    </span>
                    {cards.length > 0 && (
                      <span className="ml-auto text-xs text-ds-text-dim bg-ds-elevated px-1.5 rounded-full">
                        {cards.length}
                      </span>
                    )}
                  </div>
                </div>

                {/* Cards */}
                <div className="p-2 flex flex-col gap-1.5 flex-1">
                  {cards.map((card) => (
                    <FishCard key={card.id} card={card} phase={phase} />
                  ))}
                  {cards.length === 0 && (
                    <div className="border border-dashed border-ds-border-light rounded-lg p-4 text-center">
                      <span className="text-ds-text-secondary text-xs">empty</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Fish connector arrow between columns */}
              {i < PHASES.length - 1 && (
                <div className="flex items-center self-stretch pt-10">
                  <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                    <path
                      d="M2 12 Q8 6 14 12 Q8 18 2 12Z"
                      fill="none"
                      stroke="#2a2a2a"
                      strokeWidth="1"
                    />
                    <path d="M10 12 L14 12" stroke="#2a2a2a" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FishCard({ card, phase }: { card: Card; phase: string }) {
  const meta = PHASE_META[phase as keyof typeof PHASE_META]

  return (
    <div
      className={`rounded-lg border border-ds-border-light bg-ds-elevated px-3 py-2.5
        hover:border-ds-border-light/80 transition-all cursor-pointer group
        relative overflow-hidden`}
    >
      {/* Phase accent line */}
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-l-lg ${meta.color.replace('text-', 'bg-')}`} />

      <p className="text-ds-text text-xs font-medium pl-1">{card.title}</p>
      {card.description && (
        <p className="text-ds-text-dim text-xs mt-0.5 pl-1 line-clamp-2">{card.description}</p>
      )}
    </div>
  )
}
