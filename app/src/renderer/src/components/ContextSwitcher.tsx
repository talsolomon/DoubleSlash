import { useState } from 'react'
import { Space, PHASE_META } from '../types'

interface Props {
  spaces: Space[]
  activeId: string
  onSelect: (id: string) => void
}

export default function ContextSwitcher({ spaces, activeId, onSelect }: Props) {
  const [open, setOpen] = useState(false)

  const activeCtx = spaces.flatMap((s) => s.contexts).find((c) => c.id === activeId)
  const activeSpace = spaces.find((s) => s.contexts.some((c) => c.id === activeId))

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col items-start gap-0.5 group no-drag py-0.5"
      >
        <span className="text-[10px] font-mono text-ds-text-dim uppercase tracking-widest leading-none">
          Project
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-ds-text leading-none">
            {activeSpace?.name ?? 'No project'}
          </span>
          <span className="text-ds-border-light text-xs">›</span>
          <span className="text-xs text-ds-text-secondary leading-none">
            {activeCtx?.name ?? 'Select context'}
          </span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className={`text-ds-text-dim transition-transform mt-0.5 ${open ? 'rotate-180' : ''}`}
          >
            <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute top-full left-0 mt-2 w-72 rounded-xl bg-ds-surface border border-ds-border-light
              shadow-2xl z-20 overflow-hidden"
            style={{ boxShadow: '0 0 0 0.5px #333, 0 16px 40px rgba(0,0,0,0.85)' }}
          >
            {spaces.map((space, si) => (
              <div key={space.id} className={si > 0 ? 'border-t border-ds-border' : ''}>
                {/* Project header */}
                <div className="px-3 pt-3 pb-2 flex items-center gap-2">
                  <span className="text-[10px] font-mono text-ds-text-dim uppercase tracking-widest">
                    Project
                  </span>
                  <span className="flex-1 h-px bg-ds-border" />
                </div>
                <div className="px-3 pb-2">
                  <span className="text-sm font-semibold text-ds-text">{space.name}</span>
                  {space.client && (
                    <span className="ml-2 text-xs text-ds-text-dim">{space.client}</span>
                  )}
                </div>

                {/* Contexts header */}
                <div className="px-3 pb-1 flex items-center gap-2">
                  <span className="text-[10px] font-mono text-ds-text-dim uppercase tracking-widest">
                    Contexts
                  </span>
                  <span className="flex-1 h-px bg-ds-border" />
                </div>

                {/* Context list */}
                <div className="px-2 pb-2">
                  {space.contexts.map((ctx) => {
                    const meta = PHASE_META[ctx.phase]
                    return (
                      <button
                        key={ctx.id}
                        onClick={() => {
                          onSelect(ctx.id)
                          setOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                          flex items-center gap-2.5
                          ${ctx.id === activeId
                            ? 'bg-ds-elevated text-ds-text'
                            : 'text-ds-text-secondary hover:text-ds-text hover:bg-ds-elevated'}`}
                      >
                        <span className={`text-xs ${meta.color}`}>{meta.icon}</span>
                        <span className="flex-1 truncate">{ctx.name}</span>
                        {ctx.id === activeId && (
                          <span className="text-ds-accent text-xs">✓</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
