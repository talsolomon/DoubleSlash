import { Space, Session } from '../types'

interface Props {
  spaces: Space[]
}

// ── helpers ───────────────────────────────────────────────────────────────────

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

function anchorDate(sessions: Session[]): string {
  if (sessions.length === 0) return new Date().toISOString().slice(0, 10)
  return [...sessions.map(s => s.date)].sort().at(-1)!
}

function buildHeatmap(sessions: Session[], anchor: string) {
  const dow = new Date(anchor + 'T12:00:00').getDay()
  const end = addDays(anchor, (7 - dow) % 7)
  const start = addDays(end, -363)
  const counts: Record<string, number> = {}
  sessions.forEach(s => { counts[s.date] = (counts[s.date] ?? 0) + 1 })
  const cells: { date: string; count: number; future: boolean }[] = []
  let cur = start
  while (cur <= end) {
    cells.push({ date: cur, count: counts[cur] ?? 0, future: cur > anchor })
    cur = addDays(cur, 1)
  }
  return cells
}

function computeStreak(sessions: Session[], anchor: string) {
  const unique = [...new Set(sessions.map(s => s.date))].sort()
  if (!unique.length) return { current: 0, longest: 0 }
  let longest = 1, run = 1
  for (let i = 1; i < unique.length; i++) {
    const diff = (new Date(unique[i] + 'T12:00:00').getTime() - new Date(unique[i - 1] + 'T12:00:00').getTime()) / 86400000
    run = Math.round(diff) === 1 ? run + 1 : 1
    longest = Math.max(longest, run)
  }
  const prev = addDays(anchor, -1)
  const last = unique.at(-1)!
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

function cellBg(count: number, future: boolean): string {
  if (future || count === 0) return 'rgb(var(--ds-elevated))'
  const opacity = count === 1 ? 0.22 : count === 2 ? 0.45 : count === 3 ? 0.65 : count === 4 ? 0.82 : 1.0
  return `rgb(var(--ds-accent) / ${opacity})`
}

function buildMonthLabels(cells: { date: string }[]): { text: string; col: number }[] {
  const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const labels: { text: string; col: number }[] = []
  let lastMonth = -1
  cells.forEach((cell, i) => {
    const col = Math.floor(i / 7)
    const month = new Date(cell.date + 'T12:00:00').getMonth()
    if (month !== lastMonth) {
      labels.push({ text: MONTH_NAMES[month], col })
      lastMonth = month
    }
  })
  return labels
}

const TODAY = new Date().toISOString().slice(0, 10)
const CELL = 10
const GAP = 2
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

// ── Heatmap ───────────────────────────────────────────────────────────────────

function Heatmap({ cells }: { cells: { date: string; count: number; future: boolean }[] }) {
  const monthLabels = buildMonthLabels(cells)

  return (
    <div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
      {/* Month labels */}
      <div style={{ marginLeft: 26, position: 'relative', height: 14, minWidth: 52 * (CELL + GAP) }}>
        {monthLabels.map((l, i) => (
          <span
            key={i}
            className="absolute text-[9px] font-mono text-ds-text-dim"
            style={{ left: l.col * (CELL + GAP) }}
          >
            {l.text}
          </span>
        ))}
      </div>

      {/* Grid + day labels */}
      <div className="flex items-start gap-[3px]">
        {/* Day labels */}
        <div className="flex flex-col shrink-0" style={{ gap: GAP, width: 22 }}>
          {DAY_LABELS.map((d, i) => (
            <div key={i} className="flex items-center justify-end" style={{ height: CELL }}>
              {d && <span className="text-[8px] font-mono text-ds-text-dim leading-none">{d}</span>}
            </div>
          ))}
        </div>

        {/* Cell grid */}
        <div
          className="grid"
          style={{
            gap: GAP,
            gridTemplateRows: `repeat(7, ${CELL}px)`,
            gridAutoFlow: 'column',
            gridAutoColumns: `${CELL}px`,
          }}
        >
          {cells.map((cell, i) => {
            const col = Math.floor(i / 7)
            const isToday = cell.date === TODAY
            return (
              <div
                key={cell.date}
                title={`${cell.date}${cell.count > 0 ? ` · ${cell.count} session${cell.count > 1 ? 's' : ''}` : ''}`}
                style={{
                  width: CELL,
                  height: CELL,
                  borderRadius: 3,
                  backgroundColor: cellBg(cell.count, cell.future),
                  outline: isToday ? `1.5px solid rgb(var(--ds-accent) / 0.7)` : 'none',
                  outlineOffset: '1px',
                  animation: !cell.future ? 'cell-pop 0.28s ease-out both' : 'none',
                  animationDelay: `${col * 5}ms`,
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-2.5" style={{ marginLeft: 26 }}>
        <span className="text-[8px] font-mono text-ds-text-dim">less</span>
        {[0, 1, 2, 3, 4].map(n => (
          <div
            key={n}
            style={{
              width: CELL,
              height: CELL,
              borderRadius: 3,
              backgroundColor: cellBg(n, false),
            }}
          />
        ))}
        <span className="text-[8px] font-mono text-ds-text-dim">more</span>
      </div>
    </div>
  )
}

// ── KpiCard ───────────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex-1 min-w-0 bg-ds-surface border border-ds-border-light rounded-2xl px-4 py-3.5">
      <p className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest mb-1.5 leading-none">{label}</p>
      <p className="text-2xl font-bold text-ds-text leading-none tabular-nums">{value}</p>
      {sub && <p className="text-[9px] font-mono text-ds-text-dim mt-1.5 leading-none">{sub}</p>}
    </div>
  )
}

// ── RecentSessions ────────────────────────────────────────────────────────────

function RecentSessions({ spaces }: { spaces: Space[] }) {
  const recent = spaces
    .flatMap(s => s.contexts.flatMap(c =>
      c.sessions.map(sess => ({ ...sess, contextName: c.name, spaceName: s.client }))
    ))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8)

  if (recent.length === 0) return null

  return (
    <div>
      <p className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest mb-2.5">Recent</p>
      <div className="space-y-0">
        {recent.map((s, i) => (
          <div
            key={s.id}
            className="flex items-start gap-3 py-2 border-b border-ds-border last:border-0"
            style={{ animation: 'fade-in 0.2s ease-out both', animationDelay: `${i * 30}ms` }}
          >
            <div className="shrink-0 text-right" style={{ width: 36 }}>
              <span className="text-[9px] font-mono text-ds-text-dim">{s.date.slice(5)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] font-mono text-ds-text-secondary px-1.5 py-0.5 rounded border border-ds-border bg-ds-elevated leading-none">
                  {s.tool}
                </span>
                <span className="text-[10px] text-ds-text truncate">{s.contextName}</span>
                {s.tokens && (
                  <span className="text-[9px] font-mono text-ds-text-dim ml-auto shrink-0">{formatTokens(s.tokens)}</span>
                )}
              </div>
              {s.summary && (
                <p className="text-[10px] text-ds-text-dim leading-relaxed line-clamp-1">{s.summary}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── DashboardEmpty ────────────────────────────────────────────────────────────

function DashboardEmpty() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-3 px-8 text-center select-none">
      <p className="text-[11px] font-mono text-ds-text-dim uppercase tracking-widest">
        duble//slash
      </p>
      <p className="text-sm text-ds-text-secondary leading-relaxed max-w-[260px]">
        No sessions yet. Open any AI tool and press{' '}
        <span className="font-mono text-ds-accent">⌘⇧/</span>{' '}
        to capture your first session.
      </p>
      <p className="text-[10px] font-mono text-ds-text-dim mt-1">
        your context graph starts here
      </p>
    </div>
  )
}

// ── main component ────────────────────────────────────────────────────────────

export default function Dashboard({ spaces }: Props) {
  const allSessions = spaces.flatMap(s => s.contexts.flatMap(c => c.sessions))
  if (allSessions.length === 0) return <DashboardEmpty />

  const anchor = anchorDate(allSessions)
  const cells = buildHeatmap(allSessions, anchor)
  const totalTokens = allSessions.reduce((s, x) => s + (x.tokens ?? 0), 0)
  const activeDays = new Set(allSessions.map(s => s.date)).size
  const streak = computeStreak(allSessions, anchor)
  const todaySessions = allSessions.filter(s => s.date === TODAY).length

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-5 py-5 space-y-6">

        {/* KPIs */}
        <div className="flex gap-3">
          <KpiCard label="Sessions" value={String(allSessions.length)} sub={todaySessions > 0 ? `${todaySessions} today` : undefined} />
          <KpiCard label="Tokens" value={formatTokens(totalTokens)} />
          <KpiCard label="Active days" value={String(activeDays)} />
          <KpiCard label="Streak" value={`${streak.current}d`} sub={streak.longest > streak.current ? `best ${streak.longest}d` : 'personal best'} />
        </div>

        {/* Heatmap */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest">Activity</p>
            <span className="text-[9px] font-mono text-ds-text-dim">{allSessions.length} sessions · 1 year</span>
          </div>
          <Heatmap cells={cells} />
        </div>

        {/* Recent */}
        <RecentSessions spaces={spaces} />

      </div>
    </div>
  )
}
