import { useState } from 'react'
import { Space, Session } from '../types'

type Range = 'all' | '30d' | '7d'

interface Props {
  spaces: Space[]
  activeContextId: string
  onSelect: (contextId: string) => void
  onSetActive: (contextId: string) => void
}

interface HeatCell { date: string; count: number; future: boolean }

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

function buildHeatmap(allSessions: Session[], anchor: string): HeatCell[] {
  const dow = new Date(anchor + 'T12:00:00').getDay()
  const end = addDays(anchor, (7 - dow) % 7)
  const start = addDays(end, -363)

  const counts: Record<string, number> = {}
  allSessions.forEach(s => { counts[s.date] = (counts[s.date] ?? 0) + 1 })

  const cells: HeatCell[] = []
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

function funText(tokens: number, sessions: number, hours: number): string {
  const refs = [
    { name: 'The Little Prince', t: 22000 },
    { name: 'Animal Farm', t: 38000 },
    { name: 'The Great Gatsby', t: 63000 },
  ]
  const match = refs.find(r => { const x = Math.round(tokens / r.t); return x >= 2 && x <= 20 })
  if (match) {
    return `~${Math.round(tokens / match.t)}× more tokens than ${match.name} — ${hours}h across ${sessions} sessions.`
  }
  return `${formatTokens(tokens)} tokens — ${hours}h across ${sessions} sessions.`
}

const TOOL_COLORS = ['--ds-accent', '--ds-solidify', '--ds-build', '--ds-explore']

// ── main component ────────────────────────────────────────────────────────────

export default function Dashboard({ spaces }: Props) {
  const [range, setRange] = useState<Range>('all')

  const flat = spaces.flatMap(s => s.contexts.map(c => ({ context: c, space: s })))
  const allSessions = flat.flatMap(fc => fc.context.sessions)
  const anchor = anchorDate(allSessions)

  const cutoff = range === '7d' ? addDays(anchor, -7) : range === '30d' ? addDays(anchor, -30) : null
  const filtered = cutoff ? allSessions.filter(s => s.date >= cutoff!) : allSessions

  const totalTokens  = filtered.reduce((s, x) => s + (x.tokens ?? 0), 0)
  const totalMinutes = filtered.reduce((s, x) => s + (x.durationMinutes ?? 0), 0)
  const activeDays   = new Set(filtered.map(s => s.date)).size
  const allTasks     = flat.flatMap(fc => fc.context.tasks ?? [])
  const doneTasks    = allTasks.filter(t => t.done).length
  const shipped      = flat.flatMap(fc => fc.context.artifacts ?? []).filter(a => a.status === 'shipped').length
  const decisions    = flat.flatMap(fc => fc.context.decisions ?? []).length

  const toolStats: Record<string, { sessions: number; tokens: number }> = {}
  filtered.forEach(s => {
    if (!toolStats[s.tool]) toolStats[s.tool] = { sessions: 0, tokens: 0 }
    toolStats[s.tool].sessions++
    toolStats[s.tool].tokens += s.tokens ?? 0
  })
  const tools = Object.entries(toolStats).sort((a, b) => b[1].sessions - a[1].sessions)
  const totalSess = filtered.length || 1

  const streak    = computeStreak(allSessions, anchor)
  const heatCells = buildHeatmap(allSessions, anchor)

  const dates: string[] = []
  for (let i = 32; i >= 0; i--) dates.push(addDays(anchor, -i))
  const tokensByDate: Record<string, number> = {}
  filtered.forEach(s => { tokensByDate[s.date] = (tokensByDate[s.date] ?? 0) + (s.tokens ?? 0) })
  const barValues = dates.map(d => tokensByDate[d] ?? 0)
  const maxBar = Math.max(...barValues, 1)

  const kpis = [
    { label: 'Sessions',    value: String(filtered.length) },
    { label: 'Tokens used', value: formatTokens(totalTokens) },
    { label: 'Tasks done',  value: `${doneTasks}/${allTasks.length}` },
    { label: 'Active days', value: String(activeDays) },
    { label: 'Streak',      value: `${streak.current}d` },
    { label: 'Best streak', value: `${streak.longest}d` },
    { label: 'Artifacts',   value: String(shipped) },
    { label: 'Decisions',   value: String(decisions) },
  ]

  const xLabels = [0, 7, 14, 21, 28, 32]

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-4 py-3 space-y-5">

        {/* Range filter */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-ds-text-dim uppercase tracking-widest">activity</span>
          <div className="flex items-center gap-0.5">
            {(['all', '30d', '7d'] as Range[]).map(r => (
              <button key={r} onClick={() => setRange(r)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                  range === r
                    ? 'bg-ds-elevated border border-ds-border text-ds-text'
                    : 'text-ds-text-dim hover:text-ds-text-secondary'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* KPI tiles — 2 × 4 */}
        <div className="grid grid-cols-4 gap-2">
          {kpis.map(k => (
            <div key={k.label} className="bg-ds-surface border border-ds-border-light rounded-xl px-3 py-2.5">
              <p className="text-[10px] font-mono text-ds-text-dim mb-1.5 leading-none">{k.label}</p>
              <p className="text-[20px] font-bold text-ds-text leading-none">{k.value}</p>
            </div>
          ))}
        </div>

        {/* Heatmap */}
        <div>
          <p className="text-[10px] font-mono text-ds-text-dim uppercase tracking-widest mb-2">sessions / day</p>
          <div
            className="grid gap-[3px] w-full"
            style={{ gridTemplateRows: 'repeat(7, 11px)', gridAutoFlow: 'column', gridAutoColumns: '1fr' }}
          >
            {heatCells.map(cell => (
              <div
                key={cell.date}
                className="rounded-[2px]"
                title={`${cell.date}${cell.count > 0 ? `: ${cell.count} session${cell.count > 1 ? 's' : ''}` : ''}`}
                style={
                  cell.future
                    ? {}
                    : cell.count === 0
                      ? { backgroundColor: 'rgba(255,255,255,0.04)' }
                      : { backgroundColor: `rgb(var(--ds-accent) / ${Math.min(0.2 + cell.count * 0.27, 1).toFixed(2)})` }
                }
              />
            ))}
          </div>
        </div>

        {/* Token bar chart */}
        <div>
          <p className="text-[10px] font-mono text-ds-text-dim uppercase tracking-widest mb-2">tokens / day</p>
          <div className="flex items-end gap-[2px] h-20">
            {barValues.map((v, i) => (
              <div
                key={dates[i]}
                title={`${dates[i]}: ${formatTokens(v)} tokens`}
                className="flex-1 rounded-[1px]"
                style={{
                  height: v > 0 ? `${Math.max((v / maxBar) * 100, 4)}%` : '2px',
                  backgroundColor: v > 0 ? `rgb(var(--ds-accent) / 0.6)` : 'rgba(255,255,255,0.04)',
                }}
              />
            ))}
          </div>
          <div className="relative h-4 mt-1">
            {xLabels.map(i => (
              <span
                key={i}
                className="absolute text-[8px] font-mono text-ds-text-dim -translate-x-1/2"
                style={{ left: `${(i / 32) * 100}%` }}
              >
                {dates[i]?.slice(5)}
              </span>
            ))}
          </div>
        </div>

        {/* Tool breakdown */}
        <div className="space-y-2">
          {tools.map(([tool, stats], i) => (
            <div key={tool} className="flex items-center gap-2.5">
              <div
                className="w-2 h-2 rounded-[2px] shrink-0"
                style={{ backgroundColor: `rgb(var(${TOOL_COLORS[i] ?? '--ds-border'}))` }}
              />
              <span className="text-[11px] font-mono text-ds-text flex-1">{tool}</span>
              <span className="text-[10px] font-mono text-ds-text-dim">{formatTokens(stats.tokens)} tokens</span>
              <span className="text-[10px] font-mono text-ds-text-dim w-8 text-right">
                {Math.round((stats.sessions / totalSess) * 100)}%
              </span>
            </div>
          ))}
        </div>

        {/* Fun text */}
        <p className="text-[10px] font-mono text-ds-text-dim pb-2">
          {funText(totalTokens, filtered.length, Math.round(totalMinutes / 60))}
        </p>

      </div>
    </div>
  )
}
