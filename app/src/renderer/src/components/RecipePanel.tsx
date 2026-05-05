import { useState } from 'react'
import { Space, Archetype, Phase, ARCHETYPE_META, PHASE_META, PHASES } from '../types'
import { FISH_RECIPE } from '../data/fish-recipe'

interface Props {
  project: Space
  onClose: () => void
}

const ARCHETYPES: Archetype[] = ['nemo', 'tuna', 'salmon', 'willy']

function archetypeCount(project: Space, archetype: Archetype): number {
  return project.contexts.filter(c => c.archetype === archetype).length
}

// ── RecipeCell ────────────────────────────────────────────────────────────────

function RecipeCell({ archetype, phase }: { archetype: Archetype; phase: Phase }) {
  const [expanded, setExpanded] = useState(false)
  const methods = FISH_RECIPE[archetype][phase] ?? []
  const visible = expanded ? methods : methods.slice(0, 2)
  const more = methods.length - 2

  return (
    <button
      onClick={() => setExpanded(v => !v)}
      className={`w-full text-left p-1.5 rounded-lg transition-colors hover:bg-ds-elevated
        ${expanded ? 'bg-ds-elevated' : ''}`}
    >
      {visible.map(m => (
        <div key={m.id} className="text-[9px] font-mono text-ds-text-dim leading-relaxed truncate">
          {m.name}
        </div>
      ))}
      {!expanded && more > 0 && (
        <div className="text-[9px] font-mono text-ds-text-dim opacity-60">+{more} more</div>
      )}
    </button>
  )
}

// ── RecipePanel ───────────────────────────────────────────────────────────────

export default function RecipePanel({ project, onClose }: Props) {
  return (
    <div className="w-72 shrink-0 border-l border-ds-border bg-ds-bg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-ds-border shrink-0">
        <span className="text-[10px] font-mono text-ds-text-dim uppercase tracking-widest flex-1">Recipe</span>
        <button onClick={onClose} className="text-ds-text-dim hover:text-ds-text transition-colors text-[11px] font-mono">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Archetype summary */}
        <div className="px-3 pt-3 pb-2 border-b border-ds-border">
          <p className="text-[9px] font-mono text-ds-text-dim mb-2 uppercase tracking-widest">Project archetypes</p>
          <div className="flex gap-2 flex-wrap">
            {ARCHETYPES.map(a => {
              const meta = ARCHETYPE_META[a]
              const count = archetypeCount(project, a)
              return (
                <div
                  key={a}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg"
                  style={{ backgroundColor: `rgb(var(${meta.cssVar}) / 0.1)` }}
                >
                  <span
                    className="text-[9px] font-mono font-bold"
                    style={{ color: `rgb(var(${meta.cssVar}))` }}
                  >
                    {meta.short}
                  </span>
                  <span className="text-[9px] font-mono text-ds-text-dim">·{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Matrix: rows = phases, columns = archetypes */}
        <div className="px-2 py-2">
          {/* Column headers */}
          <div className="grid grid-cols-4 gap-0.5 mb-1 px-1">
            {ARCHETYPES.map(a => {
              const meta = ARCHETYPE_META[a]
              return (
                <div key={a} className="text-center">
                  <span
                    className="text-[9px] font-mono font-bold"
                    style={{ color: `rgb(var(${meta.cssVar}))` }}
                  >
                    {meta.short}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Rows */}
          {PHASES.map(phase => {
            const pm = PHASE_META[phase]
            return (
              <div key={phase} className="mb-2">
                {/* Phase row label */}
                <div className="flex items-center gap-1.5 px-1 mb-1">
                  <span className={`text-[9px] ${pm.color}`}>{pm.icon}</span>
                  <span className="text-[9px] font-mono text-ds-text-secondary uppercase tracking-widest">{pm.label}</span>
                </div>
                {/* Archetype cells */}
                <div className="grid grid-cols-4 gap-0.5">
                  {ARCHETYPES.map(archetype => (
                    <RecipeCell key={archetype} archetype={archetype} phase={phase} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="px-3 pb-3">
          <p className="text-[9px] font-mono text-ds-text-dim opacity-60 leading-relaxed">
            Canonical Fish Model recipe from fish-model.md §6.
            Tap any cell to expand.
          </p>
        </div>
      </div>
    </div>
  )
}
