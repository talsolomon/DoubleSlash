import { useState } from 'react'
import {
  Space, Context, Phase,
  PHASE_META, PHASES, ARCHETYPE_META, PHASE_CSS_VAR,
  apiCreateContext,
} from '../types'
import { computeStreamProgress, getNextMethod } from '../data/fish-recipe'
import RecipePanel from './RecipePanel'

interface Props {
  spaces: Space[]
  activeContextId: string
  selectedProjectId: string
  onSelect: (contextId: string) => void
  onSetActive: (contextId: string) => void
  onUpdate: (id: string, patch: Partial<Context>) => Promise<void>
  onRefresh: () => void
}

type BoardFilter = 'blocked' | 'at-exit' | 'stuck' | null

function isStuck(ctx: Context): boolean {
  if (ctx.status === 'blocked' || ctx.status === 'at-exit') return false
  const last = ctx.sessions[ctx.sessions.length - 1]
  if (!last) return false
  const diff = (Date.now() - new Date(last.date + 'T12:00:00').getTime()) / 86_400_000
  return diff > 2
}

// ── SignalStrip ───────────────────────────────────────────────────────────────

function SignalStrip({ contexts, filter, onFilter }: {
  contexts: Context[]
  filter: BoardFilter
  onFilter: (f: BoardFilter) => void
}) {
  const blocked = contexts.filter(c => c.status === 'blocked').length
  const atExit  = contexts.filter(c => c.status === 'at-exit').length
  const stuck   = contexts.filter(isStuck).length

  if (!blocked && !atExit && !stuck) return null

  const chips: { key: BoardFilter; label: string; count: number; color: string }[] = []
  if (blocked) chips.push({ key: 'blocked', label: 'blocked', count: blocked, color: 'text-red-400 border-red-500/30 bg-red-500/5' })
  if (atExit)  chips.push({ key: 'at-exit', label: 'at exit', count: atExit,  color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5' })
  if (stuck)   chips.push({ key: 'stuck',   label: 'stuck',   count: stuck,   color: 'text-ds-text-dim border-ds-border bg-ds-surface' })

  return (
    <div className="flex items-center gap-2 px-4 py-1.5 border-b border-ds-border shrink-0">
      {chips.map(c => (
        <button
          key={c.key}
          onClick={() => onFilter(filter === c.key ? null : c.key)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono
            transition-all ${c.color} ${filter === c.key ? 'ring-1 ring-current' : ''}`}
        >
          {c.key === 'blocked' && '✕'}
          {c.key === 'at-exit' && '→'}
          {c.key === 'stuck'   && '⏸'}
          {c.count} {c.label}
        </button>
      ))}
      {filter && (
        <button
          onClick={() => onFilter(null)}
          className="text-[9px] font-mono text-ds-text-dim hover:text-ds-text transition-colors ml-1"
        >
          clear filter
        </button>
      )}
    </div>
  )
}

// ── PhaseColumnHeader ─────────────────────────────────────────────────────────

function PhaseColumnHeader({ phase, contexts }: { phase: Phase; contexts: Context[] }) {
  const meta = PHASE_META[phase]
  const blocked = contexts.filter(c => c.status === 'blocked').length
  const atExit  = contexts.filter(c => c.status === 'at-exit').length

  return (
    <div
      className="sticky top-0 z-10 flex items-center gap-2 px-3 py-2.5 border-b border-ds-border bg-ds-bg"
      style={{ borderTop: `2px solid rgb(var(${PHASE_CSS_VAR[phase]}))` }}
    >
      <span className={`text-sm ${meta.color}`}>{meta.icon}</span>
      <span className="text-[10px] font-mono font-semibold text-ds-text-secondary uppercase tracking-widest flex-1">
        {meta.label}
      </span>
      <div className="flex items-center gap-1.5">
        {blocked > 0 && (
          <span className="text-[9px] font-mono text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded-full">
            ✕{blocked}
          </span>
        )}
        {atExit > 0 && (
          <span className="text-[9px] font-mono text-yellow-400 bg-yellow-500/10 px-1.5 py-0.5 rounded-full">
            →{atExit}
          </span>
        )}
        <span className="text-[10px] font-mono text-ds-text-dim">{contexts.length}</span>
      </div>
    </div>
  )
}

// ── KanbanCard ────────────────────────────────────────────────────────────────

function KanbanCard({
  context, isActive, filter, onOpen, onSetActive,
}: {
  context: Context
  isActive: boolean
  filter: BoardFilter
  onOpen: () => void
  onSetActive: () => void
}) {
  const [showAllSessions, setShowAllSessions] = useState(false)
  const arch = context.archetype ? ARCHETYPE_META[context.archetype] : null
  const progress = computeStreamProgress(context)
  const nextMethod = getNextMethod(context)

  const isBlocked = context.status === 'blocked'
  const isAtExit  = context.status === 'at-exit'
  const stuck     = isStuck(context)

  const dimmed = filter !== null && (
    (filter === 'blocked' && !isBlocked) ||
    (filter === 'at-exit' && !isAtExit) ||
    (filter === 'stuck'   && !stuck)
  )

  const borderClass = isActive
    ? 'border-ds-accent/50 bg-ds-elevated'
    : isBlocked
      ? 'border-red-500/40 bg-ds-surface'
      : isAtExit
        ? 'border-yellow-500/30 bg-ds-surface'
        : 'border-ds-border-light bg-ds-surface hover:border-ds-border'

  const sessionsDesc = [...context.sessions].reverse()
  const visibleSessions = showAllSessions ? sessionsDesc : sessionsDesc.slice(0, 2)

  return (
    <div
      onClick={onOpen}
      className={`relative rounded-xl border cursor-pointer transition-all duration-150 overflow-hidden
        ${borderClass} ${dimmed ? 'opacity-30 pointer-events-none' : ''}`}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{ backgroundColor: `rgb(var(${PHASE_CSS_VAR[context.phase]}) / ${isActive ? '1' : '0.5'})` }}
      />

      <div className="pl-3.5 pr-3 pt-2.5 pb-2.5">
        {/* Header: archetype badge + status */}
        <div className="flex items-center justify-between mb-1.5">
          {arch ? (
            <span
              className="text-[9px] font-mono font-bold leading-none px-1.5 py-0.5 rounded"
              style={{ color: `rgb(var(${arch.cssVar}))`, backgroundColor: `rgb(var(${arch.cssVar}) / 0.1)` }}
            >
              {arch.short} {arch.label}
            </span>
          ) : (
            <span className="text-[9px] font-mono text-ds-text-dim">? archetype</span>
          )}
          <div className="flex items-center gap-1.5 shrink-0">
            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-ds-accent animate-pulse" />}
            {isBlocked && <span className="text-[10px] text-red-400">✕</span>}
            {isAtExit  && <span className="text-[10px] text-yellow-400">→</span>}
            {!isActive && (
              <button
                onClick={e => { e.stopPropagation(); onSetActive() }}
                className="text-[9px] font-mono text-ds-text-dim hover:text-ds-accent transition-colors leading-none"
                title="Set as active context"
              >
                ○
              </button>
            )}
          </div>
        </div>

        {/* Task name */}
        <p className="text-sm font-semibold text-ds-text leading-snug mb-2 line-clamp-2">{context.name}</p>

        {/* Stream progress */}
        {context.archetype && (
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex-1 h-[2px] bg-ds-border-light rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: progress.total > 0 ? `${(progress.completed / progress.total) * 100}%` : '0%',
                  backgroundColor: `rgb(var(${PHASE_CSS_VAR[context.phase]}) / 0.7)`,
                }}
              />
            </div>
            <span className="text-[9px] font-mono text-ds-text-dim shrink-0">{progress.completed}/{progress.total}</span>
            {nextMethod && (
              <span className="text-[9px] font-mono text-ds-accent truncate max-w-[80px]" title={nextMethod.name}>
                → {nextMethod.name}
              </span>
            )}
          </div>
        )}

        {/* Blocker */}
        {isBlocked && context.blockerDescription && (
          <p className="text-[10px] font-mono text-red-400 mb-1.5 line-clamp-1">✕ {context.blockerDescription}</p>
        )}

        {/* Sessions — always visible, primary CTA */}
        <div className="border-t border-ds-border pt-2 mt-0.5">
          {sessionsDesc.length > 0 ? (
            <div className="space-y-2">
              {visibleSessions.map(sess => (
                <div key={sess.id} className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono text-ds-text-dim border border-ds-border bg-ds-elevated px-1.5 py-0.5 rounded leading-none shrink-0">
                      {sess.tool}
                    </span>
                    <span className="text-[9px] font-mono text-ds-text-dim">{sess.date.slice(5)}</span>
                    <button
                      onClick={e => { e.stopPropagation(); onOpen() }}
                      className="ml-auto text-[10px] font-mono text-ds-accent hover:opacity-70 transition-opacity whitespace-nowrap"
                    >
                      Continue →
                    </button>
                  </div>
                  {sess.summary && (
                    <p className="text-[9px] text-ds-text-dim leading-relaxed line-clamp-1">
                      {sess.summary}
                    </p>
                  )}
                </div>
              ))}
              {sessionsDesc.length > 2 && (
                <button
                  onClick={e => { e.stopPropagation(); setShowAllSessions(v => !v) }}
                  className="text-[9px] font-mono text-ds-text-dim hover:text-ds-text transition-colors"
                >
                  {showAllSessions
                    ? '↑ less'
                    : `+ ${sessionsDesc.length - 2} more session${sessionsDesc.length - 2 > 1 ? 's' : ''}`}
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={e => { e.stopPropagation(); onOpen() }}
              className="text-[10px] font-mono text-ds-accent hover:opacity-70 transition-opacity"
            >
              + Start first session →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── PhaseColumn ───────────────────────────────────────────────────────────────

function PhaseColumn({
  phase, contexts, activeContextId, spaces, filter, width,
  onOpen, onSetActive, onRefresh,
}: {
  phase: Phase
  contexts: Context[]
  activeContextId: string
  spaces: Space[]
  filter: BoardFilter
  width: number
  onOpen: (id: string) => void
  onSetActive: (id: string) => void
  onRefresh: () => void
}) {
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const meta = PHASE_META[phase]

  async function handleAdd() {
    const name = newName.trim()
    if (!name || !spaces[0]) return
    await apiCreateContext(spaces[0].id, name, phase)
    setNewName('')
    setAdding(false)
    onRefresh()
  }

  return (
    <div className="shrink-0 flex flex-col border-r border-ds-border overflow-hidden" style={{ width }}>
      <PhaseColumnHeader phase={phase} contexts={contexts} />
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
        {contexts.map(ctx => (
          <KanbanCard
            key={ctx.id}
            context={ctx}
            isActive={ctx.id === activeContextId}
            filter={filter}
            onOpen={() => onOpen(ctx.id)}
            onSetActive={() => onSetActive(ctx.id)}
          />
        ))}

        {contexts.length === 0 && !adding && (
          <div
            className={`rounded-xl border border-dashed ${meta.border} p-5 text-center cursor-pointer hover:border-opacity-60 transition-all`}
            onClick={() => setAdding(true)}
          >
            <span className="text-ds-text-dim text-xs">empty</span>
          </div>
        )}

        {adding ? (
          <div className={`rounded-xl border ${meta.border} bg-ds-elevated p-3`}>
            <input
              autoFocus
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleAdd()
                if (e.key === 'Escape') { setAdding(false); setNewName('') }
              }}
              placeholder="Context name…"
              className="w-full bg-transparent text-ds-text text-sm outline-none placeholder-ds-text-dim"
            />
            <div className="flex gap-2 mt-2.5">
              <button onClick={handleAdd} className="text-xs font-mono text-ds-accent hover:opacity-75 transition-opacity">Add ↵</button>
              <button onClick={() => { setAdding(false); setNewName('') }}
                className="text-xs font-mono text-ds-text-dim hover:text-ds-text transition-colors">Cancel</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="text-left text-xs font-mono text-ds-text-dim hover:text-ds-text-secondary px-2 py-1.5 rounded-lg hover:bg-ds-elevated transition-all"
          >
            + New context
          </button>
        )}
      </div>
    </div>
  )
}

// ── BoardHeader ───────────────────────────────────────────────────────────────

function BoardHeader({ contexts, recipeOpen, onRecipeToggle }: {
  contexts: Context[]
  recipeOpen: boolean
  onRecipeToggle: () => void
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-ds-border shrink-0 bg-ds-bg">
      <div className="flex items-center gap-3">
        {PHASES.map(p => {
          const count = contexts.filter(c => c.phase === p).length
          return (
            <span key={p} className="flex items-center gap-1.5 text-[10px] font-mono text-ds-text-dim">
              <span className={PHASE_META[p].color}>{PHASE_META[p].icon}</span>
              {count}
            </span>
          )
        })}
      </div>
      <button
        onClick={onRecipeToggle}
        className={`ml-auto text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-colors
          ${recipeOpen
            ? 'border-ds-accent/40 text-ds-accent bg-ds-accent/5'
            : 'border-ds-border text-ds-text-dim hover:text-ds-text hover:border-ds-border'
          }`}
      >
        Recipe {recipeOpen ? '✕' : '▸'}
      </button>
    </div>
  )
}

// ── KanbanView (main) ─────────────────────────────────────────────────────────

const COL_WIDTH = 272

export default function KanbanView({
  spaces, activeContextId, selectedProjectId, onSelect, onSetActive, onRefresh,
}: Props) {
  const [recipeOpen, setRecipeOpen] = useState(false)
  const [filter, setFilter] = useState<BoardFilter>(null)

  const selectedProject = spaces.find(s => s.id === selectedProjectId) ?? spaces[0]
  const contexts = selectedProject?.contexts ?? []

  const sorted = [...contexts].sort((a, b) => {
    if (a.id === activeContextId) return -1
    if (b.id === activeContextId) return 1
    const aDate = a.sessions[a.sessions.length - 1]?.date ?? ''
    const bDate = b.sessions[b.sessions.length - 1]?.date ?? ''
    return bDate.localeCompare(aDate)
  })

  const byPhase = PHASES.reduce((acc, p) => {
    acc[p] = sorted.filter(c => c.phase === p)
    return acc
  }, {} as Record<Phase, Context[]>)

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <BoardHeader
        contexts={contexts}
        recipeOpen={recipeOpen}
        onRecipeToggle={() => setRecipeOpen(v => !v)}
      />

      <SignalStrip contexts={contexts} filter={filter} onFilter={setFilter} />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 overflow-x-auto">
          {PHASES.map(phase => (
            <PhaseColumn
              key={phase}
              phase={phase}
              contexts={byPhase[phase]}
              activeContextId={activeContextId}
              spaces={spaces}
              filter={filter}
              width={COL_WIDTH}
              onOpen={id => onSelect(id)}
              onSetActive={onSetActive}
              onRefresh={onRefresh}
            />
          ))}
        </div>

        {recipeOpen && selectedProject && (
          <RecipePanel
            project={selectedProject}
            onClose={() => setRecipeOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
