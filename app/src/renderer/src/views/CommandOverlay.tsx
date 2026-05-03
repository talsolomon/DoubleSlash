import { useState, useEffect, useRef } from 'react'
import { Space, Context, PHASE_META } from '../types'

const AGENTS = [
  { id: 'dora', name: 'Dora', phase: 'explore', description: 'Explore phase — research & define' },
  { id: 'sol', name: 'Sol', phase: 'solidify', description: 'Solidify phase — design & decide' },
  { id: 'bran', name: 'Bran', phase: 'iterate', description: 'Iterate phase — build & test' },
  { id: 'may', name: 'May', phase: 'deliver', description: 'Deliver phase — ship & capture' }
] as const

type Tab = 'contexts' | 'agents'

export default function CommandOverlay() {
  const [tab, setTab] = useState<Tab>('contexts')
  const [query, setQuery] = useState('')
  const [spaces, setSpaces] = useState<Space[]>([])
  const [activeId, setActiveId] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.ds.getContexts().then(({ spaces, activeContextId }) => {
      setSpaces(spaces)
      setActiveId(activeContextId)
    })
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const allContexts = spaces.flatMap((s) => s.contexts)
  const filteredContexts = allContexts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  )
  const filteredAgents = AGENTS.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.description.toLowerCase().includes(query.toLowerCase())
  )

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') window.ds.hideCommand()
  }

  function handleSelectContext(ctx: Context) {
    window.ds.selectContext(ctx.id)
  }

  return (
    <div
      className="w-full h-full rounded-2xl bg-ds-surface border border-ds-border-light
        flex flex-col overflow-hidden"
      style={{ boxShadow: '0 0 0 0.5px #333, 0 24px 60px rgba(0,0,0,0.9)' }}
      onKeyDown={handleKeyDown}
    >
      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-3 border-b border-ds-border">
        <span className="text-ds-accent font-mono font-bold text-sm shrink-0">//</span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search contexts or agents…"
          className="flex-1 bg-transparent text-ds-text text-sm placeholder-ds-text-dim
            outline-none font-mono"
        />
        <kbd
          className="text-xs text-ds-text-dim bg-ds-elevated px-1.5 py-0.5 rounded font-mono cursor-pointer"
          onClick={() => window.ds.hideCommand()}
        >
          esc
        </kbd>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ds-border px-2">
        {(['contexts', 'agents'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-xs font-mono capitalize transition-colors
              ${tab === t ? 'text-ds-text border-b border-ds-accent' : 'text-ds-text-secondary hover:text-ds-text'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-2">
        {tab === 'contexts' &&
          (filteredContexts.length ? (
            filteredContexts.map((ctx) => {
              const meta = PHASE_META[ctx.phase]
              return (
                <button
                  key={ctx.id}
                  onClick={() => handleSelectContext(ctx)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 transition-all
                    hover:bg-ds-elevated group
                    ${ctx.id === activeId ? 'bg-ds-elevated border border-ds-border-light' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${meta.color}`}>{meta.icon}</span>
                    <span className="text-ds-text text-sm">{ctx.name}</span>
                    {ctx.id === activeId && (
                      <span className="ml-auto text-xs text-ds-accent font-mono">active</span>
                    )}
                  </div>
                  {ctx.brief && (
                    <p className="text-xs text-ds-text-dim mt-0.5 pl-4 line-clamp-1">{ctx.brief}</p>
                  )}
                </button>
              )
            })
          ) : (
            <div className="text-ds-text-dim text-xs text-center py-8">No contexts found</div>
          ))}

        {tab === 'agents' &&
          filteredAgents.map((agent) => {
            const meta = PHASE_META[agent.phase]
            return (
              <button
                key={agent.id}
                onClick={() => {
                  // In prototype: copy agent summon text to clipboard
                  window.ds.hideCommand()
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg mb-1 hover:bg-ds-elevated transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${meta.color}`}>{meta.icon}</span>
                  <span className="text-ds-text text-sm font-medium">{agent.name}</span>
                  <span className="text-ds-text-dim text-xs ml-auto capitalize">{agent.phase}</span>
                </div>
                <p className="text-xs text-ds-text-secondary mt-0.5 pl-4">{agent.description}</p>
              </button>
            )
          })}
      </div>

      <div className="px-3 py-2 border-t border-ds-border text-xs text-ds-text-dim font-mono flex gap-3">
        <span>↵ select</span>
        <span>esc close</span>
        <span className="ml-auto">context brief → clipboard</span>
      </div>
    </div>
  )
}
