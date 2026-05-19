import { useEffect } from 'react'
import { Context, Phase, PHASE_META, ARCHETYPE_META, PHASE_CSS_VAR } from '../types'
import { computeStreamProgress, getNextMethod, getNextPhase, STREAM_BUDGETS } from '../data/fish-recipe'

interface Props {
  context: Context
  onClose: () => void
  onUpdate: (id: string, patch: Partial<Context>) => Promise<void>
  onRefresh: () => void
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest mb-2">{children}</p>
  )
}

function Divider() {
  return <div className="border-t border-ds-border my-3" />
}

// ── RecipeSection ─────────────────────────────────────────────────────────────

function RecipeSection({ context }: { context: Context }) {
  const arch = context.archetype ? ARCHETYPE_META[context.archetype] : null
  const phase = PHASE_META[context.phase]
  const progress = computeStreamProgress(context)
  const budget = context.archetype ? STREAM_BUDGETS[context.archetype][context.phase] : null

  if (!arch) {
    return (
      <div>
        <SectionTitle>Recipe</SectionTitle>
        <p className="text-[10px] font-mono text-ds-text-dim">
          Set an archetype to unlock the recipe for this context.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <SectionTitle>Recipe · {arch.label} · {phase.label}</SectionTitle>
        {budget && <span className="text-[9px] font-mono text-ds-text-dim">{budget}</span>}
      </div>

      {progress.methods.length === 0 ? (
        <p className="text-[10px] font-mono text-ds-text-dim">No methods in recipe.</p>
      ) : (
        <div className="space-y-1.5">
          {progress.methods.map(m => {
            const isDone = m.status === 'done'
            const isProgress = m.status === 'in-progress'
            const isDeferred = m.status === 'deferred'
            return (
              <div key={m.id} className="flex items-start gap-2">
                <span className={`text-[11px] font-mono mt-0.5 shrink-0 ${
                  isDone ? 'text-green-400' : isProgress ? phase.color : 'text-ds-text-dim'
                }`}>
                  {isDone ? '✓' : isProgress ? '●' : isDeferred ? '—' : '○'}
                </span>
                <span className={`text-[11px] leading-relaxed ${
                  isDone ? 'text-ds-text-dim line-through' : isDeferred ? 'text-ds-text-dim line-through' : 'text-ds-text-secondary'
                }`}>
                  {m.name}
                  {isDeferred && m.deferredReason && (
                    <span className="text-[9px] ml-1 text-ds-text-dim">({m.deferredReason})</span>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {progress.total > 0 && (
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 h-[2px] bg-ds-border-light rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(progress.completed / progress.total) * 100}%`,
                backgroundColor: `rgb(var(${PHASE_CSS_VAR[context.phase]}) / 0.7)`,
              }}
            />
          </div>
          <span className="text-[9px] font-mono text-ds-text-dim">{progress.completed}/{progress.total}</span>
        </div>
      )}
    </div>
  )
}

// ── HandoffSection ────────────────────────────────────────────────────────────

function HandoffSection({ context, onUpdate }: { context: Context; onUpdate: Props['onUpdate'] }) {
  const h = context.lastHandoff
  if (!h) {
    return (
      <div>
        <SectionTitle>Last handoff</SectionTitle>
        <p className="text-[10px] font-mono text-ds-text-dim">No handoff emitted yet.</p>
      </div>
    )
  }

  const confColor = h.confidence >= 0.8 ? 'text-green-400' : h.confidence >= 0.5 ? 'text-yellow-400' : 'text-red-400'

  async function resolveOpen(idx: number) {
    if (!context.lastHandoff) return
    const newOpen = [...context.lastHandoff.open]
    newOpen.splice(idx, 1)
    await onUpdate(context.id, { lastHandoff: { ...context.lastHandoff, open: newOpen } })
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <SectionTitle>Last handoff</SectionTitle>
        <span className={`text-[9px] font-mono ${confColor} ml-auto`}>conf: {h.confidence.toFixed(1)}</span>
      </div>
      <div className="text-[9px] font-mono text-ds-text-dim mb-2">
        {h.from} → {h.to} · {h.emittedAt.slice(0, 10)}
      </div>
      {h.locked.length > 0 && (
        <div className="mb-2">
          <p className="text-[9px] font-mono text-ds-text-dim mb-1">locked</p>
          {h.locked.map((l, i) => (
            <div key={i} className="flex items-start gap-1.5 mb-1">
              <span className="text-[10px] text-ds-text-secondary mt-0.5 shrink-0">↓</span>
              <span className="text-[10px] text-ds-text-secondary leading-relaxed">{l}</span>
            </div>
          ))}
        </div>
      )}
      {h.open.length > 0 && (
        <div className="mb-2">
          <p className="text-[9px] font-mono text-ds-text-dim mb-1">open items</p>
          {h.open.map((o, i) => (
            <div key={i} className="flex items-start gap-2 mb-1">
              <button
                onClick={() => resolveOpen(i)}
                className="shrink-0 mt-0.5 w-3.5 h-3.5 rounded border border-yellow-500/40 hover:bg-yellow-500/10 transition-colors"
              />
              <span className="text-[10px] text-yellow-400 leading-relaxed">{o}</span>
            </div>
          ))}
        </div>
      )}
      {h.notes && <p className="text-[10px] text-ds-text-dim leading-relaxed italic">{h.notes}</p>}
    </div>
  )
}

// ── DrillDownDrawer (panel mode) ──────────────────────────────────────────────

export default function DrillDownDrawer({ context, onClose, onUpdate, onRefresh }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const arch = context.archetype ? ARCHETYPE_META[context.archetype] : null
  const phase = PHASE_META[context.phase]
  const tasks = context.tasks ?? []
  const doneTasks = tasks.filter(t => t.done).length
  const nextMethod = getNextMethod(context)
  const nextPhase = getNextPhase(context.phase)

  async function toggleTask(taskId: string) {
    const updated = tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t)
    await onUpdate(context.id, { tasks: updated })
    onRefresh()
  }

  async function resolveBlocker() {
    await onUpdate(context.id, { status: undefined, blockerDescription: undefined })
    onRefresh()
  }

  async function advancePhase() {
    if (!nextPhase) return
    await onUpdate(context.id, { phase: nextPhase, status: undefined })
    onRefresh()
    onClose()
  }

  return (
    <div className="h-full flex flex-col bg-ds-bg">
      {/* Sticky header */}
      <div className="shrink-0 px-4 py-3 border-b border-ds-border">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-ds-text leading-snug">{context.name}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {arch && (
                <span
                  className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{
                    color: `rgb(var(${arch.cssVar}))`,
                    backgroundColor: `rgb(var(${arch.cssVar}) / 0.1)`,
                  }}
                >
                  {arch.short} {arch.label}
                </span>
              )}
              {context.sigil && (
                <span className="text-[9px] font-mono text-ds-text-dim px-1.5 py-0.5 border border-ds-border-light rounded-full">
                  {context.sigil.certainty === 'known' ? 'K' : 'U'}·{context.sigil.size === 'smaller' ? 'S' : 'B'}
                </span>
              )}
              <span className={`text-[9px] font-mono ${phase.color}`}>
                {phase.icon} {phase.label}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-ds-text-dim hover:text-ds-text transition-colors p-1 -mr-1 -mt-0.5"
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 2l8 8M10 2L2 10" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <RecipeSection context={context} />
        <Divider />
        <HandoffSection context={context} onUpdate={onUpdate} />
        <Divider />

        {/* Tasks */}
        <div>
          <SectionTitle>Tasks · {doneTasks}/{tasks.length}</SectionTitle>
          {tasks.length === 0 ? (
            <p className="text-[10px] font-mono text-ds-text-dim">No tasks.</p>
          ) : (
            <div className="space-y-1.5">
              {tasks.map(task => (
                <div key={task.id} className="flex items-start gap-2">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`shrink-0 mt-0.5 w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors
                      ${task.done ? 'bg-ds-accent/20 border-ds-accent/30' : 'border-ds-border hover:border-ds-border-light'}`}
                  >
                    {task.done && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ds-accent">
                        <path d="M1.5 4l2 2 3-3" />
                      </svg>
                    )}
                  </button>
                  <span className={`text-[11px] leading-relaxed ${task.done ? 'line-through text-ds-text-dim' : 'text-ds-text-secondary'}`}>
                    {task.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Divider />

        {/* Artifacts */}
        <div>
          <SectionTitle>Artifacts · {context.artifacts.length}</SectionTitle>
          {context.artifacts.length === 0 ? (
            <p className="text-[10px] font-mono text-ds-text-dim">No artifacts.</p>
          ) : (
            <div className="space-y-1.5">
              {context.artifacts.map(a => (
                <div key={a.id} className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono ${a.status === 'shipped' ? 'text-green-400' : 'text-ds-text-secondary'}`}>
                    {a.status === 'shipped' ? '✓' : '●'}
                  </span>
                  <span className="text-[10px] text-ds-text-secondary flex-1 truncate">{a.name}</span>
                  <span className="text-[9px] font-mono text-ds-text-dim border border-ds-border-light px-1.5 py-0.5 rounded shrink-0">
                    {a.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Divider />

        {/* Decisions */}
        <div>
          <SectionTitle>Decision log · {context.decisions.length}</SectionTitle>
          {context.decisions.length === 0 ? (
            <p className="text-[10px] font-mono text-ds-text-dim">No decisions logged.</p>
          ) : (
            <div className="space-y-2">
              {context.decisions.map(d => (
                <div key={d.id} className="flex items-start gap-2">
                  <span className="text-[9px] font-mono text-ds-text-dim shrink-0 mt-0.5">{d.date.slice(5)}</span>
                  <span className="text-[10px] text-ds-text-secondary leading-relaxed">{d.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Divider />

        {/* Sessions */}
        <div>
          <SectionTitle>Sessions · {context.sessions.length}</SectionTitle>
          {context.sessions.length === 0 ? (
            <p className="text-[10px] font-mono text-ds-text-dim">No sessions.</p>
          ) : (
            <div className="space-y-2">
              {[...context.sessions].reverse().map(s => (
                <div key={s.id}>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-ds-text-dim">
                    <span>{s.date}</span>
                    <span>·</span>
                    <span>{s.tool}</span>
                    {s.model && <><span>·</span><span>{s.model}</span></>}
                    {s.tokens && <span className="ml-auto">{(s.tokens / 1000).toFixed(1)}k</span>}
                  </div>
                  {s.summary && (
                    <p className="text-[10px] text-ds-text-dim leading-relaxed mt-0.5 line-clamp-2">{s.summary}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-16" />
      </div>

      {/* Sticky footer CTA */}
      <div className="shrink-0 px-4 py-3 border-t border-ds-border bg-ds-bg flex flex-col gap-2">
        {context.status === 'blocked' && (
          <button
            onClick={resolveBlocker}
            className="w-full py-2 rounded-xl border border-red-500/30 text-red-400 text-[11px] font-mono hover:bg-red-500/10 transition-colors"
          >
            Resolve blocker
          </button>
        )}
        {context.status === 'at-exit' && nextPhase && (
          <button
            onClick={advancePhase}
            className="w-full py-2 rounded-xl border border-ds-accent/30 text-ds-accent text-[11px] font-mono hover:bg-ds-accent/5 transition-colors"
          >
            → Advance to {PHASE_META[nextPhase].label}
          </button>
        )}
        {nextMethod && context.status !== 'blocked' && context.status !== 'at-exit' && (
          <div className="w-full py-2 rounded-xl border border-ds-border text-ds-text-dim text-[11px] font-mono text-center">
            → Continue: {nextMethod.name}
          </div>
        )}
        {!context.archetype && (
          <div className="w-full py-2 rounded-xl border border-ds-border text-ds-text-dim text-[11px] font-mono text-center">
            Set archetype to unlock recipe
          </div>
        )}
      </div>
    </div>
  )
}
