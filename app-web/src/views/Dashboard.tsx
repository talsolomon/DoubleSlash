import { useState } from 'react'
import { Space, Context, Phase, Session, PHASE_META, PHASE_CSS_VAR, PHASES, ARCHETYPE_META } from '../types'

interface Props {
  spaces: Space[]
  activeContextId: string
  selectedContextId: string
  onSelect: (contextId: string) => void
  onSetActive: (contextId: string) => void
  onPushChat: (contextId: string) => void
}

// ── helpers ──────────────────────────────────────────────────────────────────

function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + 'T12:00:00')
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`
  return String(n)
}

function anchorDate(allSessions: Session[]): string {
  if (allSessions.length === 0) return new Date().toISOString().slice(0, 10)
  const sorted = [...allSessions.map(s => s.date)].sort()
  return sorted[sorted.length - 1]
}

function buildHeatmap(allSessions: Session[], anchor: string) {
  const dow = new Date(anchor + 'T12:00:00').getDay()
  const end = addDays(anchor, (7 - dow) % 7)
  const start = addDays(end, -363)
  const counts: Record<string, number> = {}
  allSessions.forEach(s => { counts[s.date] = (counts[s.date] ?? 0) + 1 })
  const cells: { date: string; count: number; future: boolean }[] = []
  let cur = start
  while (cur <= end) {
    cells.push({ date: cur, count: counts[cur] ?? 0, future: cur > anchor })
    cur = addDays(cur, 1)
  }
  return cells
}

function computeStreak(allSessions: Session[], anchor: string) {
  const unique = [...new Set(allSessions.map(s => s.date))].sort()
  if (!unique.length) return { current: 0, longest: 0 }
  let longest = 1, run = 1
  for (let i = 1; i < unique.length; i++) {
    const diff = (new Date(unique[i] + 'T12:00:00').getTime() - new Date(unique[i - 1] + 'T12:00:00').getTime()) / 86400000
    run = Math.round(diff) === 1 ? run + 1 : 1
    longest = Math.max(longest, run)
  }
  const prev = addDays(anchor, -1)
  const last = unique[unique.length - 1]
  let current = 0
  if (last === anchor || last === prev) {
    let check = last
    for (let i = unique.length - 1; i >= 0; i--) {
      if (unique[i] === check) { current++; check = addDays(check, -1) }
      else break
    }
  }
  return { current, longest }
}

// ── system agents ─────────────────────────────────────────────────────────────

const SYSTEM_AGENTS = [
  { name: 'Tally',  full: 'Capture',      milestone: 'oss'  },
  { name: 'Cipher', full: 'Redaction',    milestone: 'oss'  },
  { name: 'Relay',  full: 'Sync',         milestone: 'v1'   },
  { name: 'Beacon', full: 'Handoff',      milestone: 'v1'   },
  { name: 'Pack',   full: 'Bundler',      milestone: 'v1'   },
  { name: 'Echo',   full: 'Digest',       milestone: 'v1.5' },
  { name: 'Twin',   full: 'Twin',         milestone: 'v1.5' },
  { name: 'Gate',   full: 'Flow Checker', milestone: 'v2'   },
  { name: 'Loom',   full: 'Process',      milestone: 'v2'   },
] as const

// ── PhaseSwimlaneHeader ───────────────────────────────────────────────────────

function PhaseSwimlaneHeader({ spaces }: { spaces: Space[] }) {
  const allContexts = spaces.flatMap(s => s.contexts)
  const counts = PHASES.reduce((acc, p) => {
    acc[p] = allContexts.filter(c => c.phase === p).length
    return acc
  }, {} as Record<Phase, number>)

  return (
    <div className="flex items-center gap-5 px-5 py-2 border-b border-ds-border bg-ds-elevated shrink-0">
      {PHASES.map(p => (
        <span key={p} className="flex items-center gap-1 text-[10px] font-mono">
          <span className={PHASE_META[p].color}>{PHASE_META[p].icon}</span>
          <span className="text-ds-text-secondary">{PHASE_META[p].label}</span>
          <span className="text-ds-text-dim">·{counts[p]}</span>
        </span>
      ))}
    </div>
  )
}

// ── ContextCard ───────────────────────────────────────────────────────────────

function ContextCard({ context, isActive, isSelected, onSelect, onSetActive, onPushChat }: {
  context: Context
  isActive: boolean
  isSelected: boolean
  onSelect: () => void
  onSetActive: () => void
  onPushChat: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const arch = context.archetype ? ARCHETYPE_META[context.archetype] : null
  const tasks = context.tasks ?? []
  const done = tasks.filter(t => t.done).length
  const nextTask = tasks.find(t => !t.done)
  const lastSession = context.sessions[context.sessions.length - 1]
  const lastArtifact = context.artifacts[context.artifacts.length - 1]
  const showSignal = (isActive || hovered) && !!lastSession

  return (
    <div
      style={{ minWidth: 220, maxWidth: 300, width: 252 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      className={`relative rounded-xl border cursor-pointer transition-all duration-150 overflow-hidden shrink-0
        ${isSelected
          ? 'border-ds-accent/60 bg-ds-elevated ring-1 ring-ds-accent/20'
          : isActive
            ? 'border-ds-accent/40 bg-ds-elevated'
            : 'border-ds-border-light bg-ds-surface hover:border-ds-border hover:bg-ds-elevated'
        }`}
    >
      {/* Phase accent left bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{ backgroundColor: `rgb(var(${PHASE_CSS_VAR[context.phase]}) / ${isActive ? '1' : '0.55'})` }}
      />

      <div className="pl-3.5 pr-3 pt-3 pb-2.5">
        {/* Archetype tag + active indicator */}
        <div className="flex items-center justify-between mb-1.5">
          {arch ? (
            <span
              className="text-[9px] font-mono font-bold leading-none"
              style={{ color: `rgb(var(${arch.cssVar}))` }}
            >
              {arch.short}
            </span>
          ) : <span />}
          {isActive && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-ds-accent shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-ds-accent animate-pulse" />
              active
            </span>
          )}
        </div>

        {/* Name */}
        <p className="text-sm font-semibold text-ds-text leading-snug mb-2 line-clamp-2">{context.name}</p>

        {/* Task progress */}
        {tasks.length > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-[2px] bg-ds-border-light rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(done / tasks.length) * 100}%`,
                  backgroundColor: `rgb(var(${PHASE_CSS_VAR[context.phase]}) / 0.55)`,
                }}
              />
            </div>
            <span className="text-[9px] font-mono text-ds-text-dim shrink-0">{done}/{tasks.length}</span>
          </div>
        )}

        {/* Last session summary */}
        {lastSession ? (
          <p className="text-[10px] text-ds-text-dim leading-relaxed mb-1.5 line-clamp-1">
            "{lastSession.summary.length > 68 ? lastSession.summary.slice(0, 65) + '…' : lastSession.summary}"
          </p>
        ) : (
          <p className="text-[10px] text-ds-text-dim opacity-40 mb-1.5">no sessions yet</p>
        )}

        {/* Next open task */}
        {nextTask && (
          <p className="text-[10px] font-mono text-ds-accent mb-2 line-clamp-1">
            → {nextTask.name.split(' ').slice(0, 6).join(' ')}{nextTask.name.split(' ').length > 6 ? '…' : ''}
          </p>
        )}

        {/* Footer: date · tool */}
        {lastSession && (
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-ds-text-dim">
            <span>{lastSession.date.slice(5)}</span>
            <span>·</span>
            <span>{lastSession.tool}</span>
            {lastArtifact && (
              <>
                <span className="ml-auto">↗</span>
                <span className="truncate max-w-[60px]">{lastArtifact.name}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Agent signal */}
      {showSignal && (
        <div className="border-t border-ds-border px-3 py-2.5">
          <p className="text-[10px] text-ds-text-dim leading-relaxed mb-2">
            Paused after "
            {lastSession.summary.length > 60 ? lastSession.summary.slice(0, 57) + '…' : lastSession.summary}
            "
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {nextTask && (
              <button
                onClick={(e) => { e.stopPropagation(); onSelect() }}
                className="text-[10px] font-mono text-ds-accent hover:opacity-75 transition-opacity text-left"
              >
                → {nextTask.name.split(' ').slice(0, 5).join(' ')}{nextTask.name.split(' ').length > 5 ? '…' : ''}
              </button>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onPushChat() }}
              className="text-[10px] font-mono text-ds-text-secondary hover:text-ds-text transition-colors"
            >
              // chat
            </button>
          </div>
          {!isActive && (
            <button
              onClick={(e) => { e.stopPropagation(); onSetActive() }}
              className="mt-2 text-[10px] font-mono text-ds-text-dim hover:text-ds-accent transition-colors"
            >
              Set as active →
            </button>
          )}
        </div>
      )}

      {/* No session + hovered + not active */}
      {hovered && !isActive && !showSignal && (
        <div className="border-t border-ds-border px-3 py-2">
          <button
            onClick={(e) => { e.stopPropagation(); onSetActive() }}
            className="text-[10px] font-mono text-ds-text-secondary hover:text-ds-accent transition-colors"
          >
            Set as active context →
          </button>
        </div>
      )}
    </div>
  )
}

// ── SpaceGroup ────────────────────────────────────────────────────────────────

function SpaceGroup({ space, activeContextId, selectedContextId, onSelect, onSetActive, onPushChat }: {
  space: Space
  activeContextId: string
  selectedContextId: string
  onSelect: (id: string) => void
  onSetActive: (id: string) => void
  onPushChat: (id: string) => void
}) {
  const [collapsed, setCollapsed] = useState(false)

  const phaseRows = PHASES.map(phase => ({
    phase,
    contexts: space.contexts
      .filter(c => c.phase === phase)
      .sort((a, b) => {
        if (a.id === activeContextId) return -1
        if (b.id === activeContextId) return 1
        const aDate = a.sessions[a.sessions.length - 1]?.date ?? ''
        const bDate = b.sessions[b.sessions.length - 1]?.date ?? ''
        return bDate.localeCompare(aDate)
      })
  })).filter(row => row.contexts.length > 0)

  return (
    <div className="mb-5">
      <button
        onClick={() => setCollapsed(v => !v)}
        className="w-full flex items-center gap-2 px-5 py-2 hover:bg-ds-elevated/30 transition-colors"
      >
        <span className="text-[10px] font-mono text-ds-text-dim uppercase tracking-widest">{space.client}</span>
        {space.name !== space.client && (
          <span className="text-[9px] font-mono text-ds-text-dim opacity-60">{space.name}</span>
        )}
        <span className="text-[10px] font-mono text-ds-text-dim opacity-50 ml-1">
          · {space.contexts.length} context{space.contexts.length !== 1 ? 's' : ''}
        </span>
        <svg
          width="8" height="8" viewBox="0 0 8 8" fill="none"
          className={`ml-auto text-ds-text-dim transition-transform ${collapsed ? '-rotate-90' : ''}`}
        >
          <path d="M1 2.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      {!collapsed && (
        <div className="space-y-4 px-5 pb-2">
          {phaseRows.length === 0 ? (
            <p className="text-[10px] font-mono text-ds-text-dim opacity-50">No contexts yet</p>
          ) : (
            phaseRows.map(({ phase, contexts }) => (
              <div key={phase}>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`text-[11px] ${PHASE_META[phase].color}`}>{PHASE_META[phase].icon}</span>
                  <span className="text-[10px] font-mono text-ds-text-secondary uppercase tracking-widest">
                    {PHASE_META[phase].label}
                  </span>
                  <span className="text-[10px] font-mono text-ds-text-dim">· {contexts.length}</span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' } as React.CSSProperties}>
                  {contexts.map(ctx => (
                    <ContextCard
                      key={ctx.id}
                      context={ctx}
                      isActive={ctx.id === activeContextId}
                      isSelected={ctx.id === selectedContextId}
                      onSelect={() => onSelect(ctx.id)}
                      onSetActive={() => onSetActive(ctx.id)}
                      onPushChat={() => onPushChat(ctx.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

// ── AgentsStrip ───────────────────────────────────────────────────────────────

function AgentsStrip() {
  return (
    <div className="px-5 py-3 border-t border-ds-border">
      <span className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest block mb-2">agents</span>
      <div className="flex flex-wrap gap-2">
        {SYSTEM_AGENTS.filter(a => a.milestone === 'oss').map(a => (
          <div
            key={a.name}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border bg-ds-surface"
            style={{ borderColor: `rgb(var(--ds-explore) / 0.4)` }}
          >
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: `rgb(var(--ds-explore))` }} />
            <div>
              <p className="text-[10px] font-mono text-ds-text leading-none">{a.name}</p>
              <p className="text-[8px] font-mono text-ds-text-dim mt-0.5 leading-none">{a.full}</p>
            </div>
          </div>
        ))}
        {(['v1', 'v1.5', 'v2'] as const).map(ms => (
          <div key={ms} className="flex gap-1.5">
            {SYSTEM_AGENTS.filter(a => a.milestone === ms).map(a => (
              <div
                key={a.name}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-ds-border-light bg-ds-surface opacity-30"
              >
                <div className="w-1 h-1 rounded-full bg-ds-border shrink-0" />
                <div>
                  <p className="text-[9px] font-mono text-ds-text-dim leading-none">{a.name}</p>
                  <p className="text-[7px] font-mono text-ds-text-dim mt-0.5 leading-none opacity-70">{ms}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── ActivityFooter ────────────────────────────────────────────────────────────

function ActivityFooter({ spaces }: { spaces: Space[] }) {
  const allSessions = spaces.flatMap(s => s.contexts.flatMap(c => c.sessions))
  const anchor = anchorDate(allSessions)
  const totalTokens = allSessions.reduce((s, x) => s + (x.tokens ?? 0), 0)
  const activeDays = new Set(allSessions.map(s => s.date)).size
  const streak = computeStreak(allSessions, anchor)
  const heatCells = buildHeatmap(allSessions, anchor)

  return (
    <div className="px-5 py-4 border-t border-ds-border">
      <span className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest block mb-3">activity</span>
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {[
          { label: 'sessions', value: String(allSessions.length) },
          { label: 'tokens',   value: formatTokens(totalTokens) },
          { label: 'days',     value: String(activeDays) },
          { label: 'streak',   value: `${streak.current}d` },
        ].map(k => (
          <div key={k.label} className="bg-ds-surface border border-ds-border-light rounded-xl px-2 py-2">
            <p className="text-[9px] font-mono text-ds-text-dim mb-1 leading-none">{k.label}</p>
            <p className="text-[15px] font-bold text-ds-text leading-none">{k.value}</p>
          </div>
        ))}
      </div>
      <div
        className="grid gap-[2px] w-full"
        style={{ gridTemplateRows: 'repeat(7, 8px)', gridAutoFlow: 'column', gridAutoColumns: '1fr' }}
      >
        {heatCells.map(cell => (
          <div
            key={cell.date}
            className="rounded-[2px]"
            title={`${cell.date}${cell.count > 0 ? `: ${cell.count}` : ''}`}
            style={
              cell.future
                ? {}
                : { backgroundColor: `rgb(var(--ds-accent) / ${Math.min(0.15 + cell.count * 0.27, 1).toFixed(2)})` }
            }
          />
        ))}
      </div>
    </div>
  )
}

// ── EmptyDashboard ────────────────────────────────────────────────────────────

function EmptyDashboard() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-8 py-16">
      <span className="font-mono font-bold text-ds-accent text-4xl">//</span>
      <p className="text-ds-text text-sm font-semibold">No contexts yet</p>
      <p className="text-ds-text-dim text-xs font-mono text-center">Start a session in any AI tool with //</p>
    </div>
  )
}

// ── main component ────────────────────────────────────────────────────────────

export default function Dashboard({ spaces, activeContextId, selectedContextId, onSelect, onSetActive, onPushChat }: Props) {
  const allContexts = spaces.flatMap(s => s.contexts)
  const isEmpty = allContexts.length === 0

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <PhaseSwimlaneHeader spaces={spaces} />
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <EmptyDashboard />
        ) : (
          <>
            <div className="pt-4 pb-2">
              {spaces.map(space => (
                <SpaceGroup
                  key={space.id}
                  space={space}
                  activeContextId={activeContextId}
                  selectedContextId={selectedContextId}
                  onSelect={onSelect}
                  onSetActive={onSetActive}
                  onPushChat={onPushChat}
                />
              ))}
            </div>
            <AgentsStrip />
            <ActivityFooter spaces={spaces} />
          </>
        )}
      </div>
    </div>
  )
}
