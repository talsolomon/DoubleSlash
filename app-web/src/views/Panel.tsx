import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Space, Context, Phase,
  PHASE_META, PHASE_CSS_VAR,
  apiGetContexts, apiSetActiveContext, apiUpdateContext,
} from '../types'
import { computeStreamProgress, getNextMethod } from '../data/fish-recipe'
import KanbanView from '../components/KanbanView'
import DrillDownDrawer from '../components/DrillDownDrawer'
import Dashboard from './Dashboard'

type CenterView = 'kanban' | 'analytics'

const TOOL_NAMES = ['Claude', 'Cursor', 'Figma']

async function apiGetToolsStatus(): Promise<Record<string, boolean>> {
  try {
    const r = await fetch('http://localhost:3002/api/tools-status')
    return r.json()
  } catch { return {} }
}

// ── ProjectSwitcher ───────────────────────────────────────────────────────────

function ProjectSwitcher({ spaces, selectedId, onChange }: {
  spaces: Space[]
  selectedId: string
  onChange: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = spaces.find(s => s.id === selectedId) ?? spaces[0]

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!selected) return null

  if (spaces.length <= 1) {
    return (
      <span className="text-xs font-mono font-semibold text-ds-text">
        {selected.client ?? selected.name}
      </span>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 text-xs font-mono font-semibold text-ds-text hover:text-ds-text-secondary transition-colors"
      >
        {selected.client ?? selected.name}
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M1 2.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-[200px] rounded-xl border border-ds-border bg-ds-elevated shadow-lg overflow-hidden">
          {spaces.map(s => (
            <button
              key={s.id}
              onClick={() => { onChange(s.id); setOpen(false) }}
              className={`w-full flex flex-col px-3 py-2.5 text-left hover:bg-ds-surface transition-colors
                ${s.id === selectedId ? 'bg-ds-surface' : ''}`}
            >
              <span className="text-xs font-mono font-semibold text-ds-text">{s.client}</span>
              <span className="text-[9px] font-mono text-ds-text-dim mt-0.5">
                {s.contexts.length} context{s.contexts.length !== 1 ? 's' : ''}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── GuardChat ─────────────────────────────────────────────────────────────────

function GuardChat() {
  const [input, setInput] = useState('')

  function handleSend() {
    if (!input.trim()) return
    setInput('')
  }

  return (
    <div className="shrink-0 flex items-center gap-3 px-4 py-2.5 border-t border-ds-border bg-ds-elevated">
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-ds-accent text-xs font-bold">◆</span>
        <span className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest">guard</span>
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
        placeholder="What should I focus on next?"
        className="flex-1 bg-ds-surface border border-ds-border rounded-lg px-3 py-1.5
          text-[11px] font-mono text-ds-text placeholder-ds-text-dim/60 outline-none
          focus:border-ds-accent/50 transition-colors"
      />
      <button
        onClick={handleSend}
        className="text-ds-text-dim hover:text-ds-accent transition-colors p-1 shrink-0"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M2 6h8M7 3l3 3-3 3" />
        </svg>
      </button>
    </div>
  )
}

// ── Panel ─────────────────────────────────────────────────────────────────────

interface Props { onCollapse: () => void; isLight: boolean; onToggleTheme: () => void }

export default function Panel({ onCollapse, isLight, onToggleTheme }: Props) {
  const [spaces, setSpaces] = useState<Space[]>([])
  const [activeContextId, setActiveContextId] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState('')
  const [selectedContextId, setSelectedContextId] = useState('')
  const [centerView, setCenterView] = useState<CenterView>('kanban')
  const [toolsStatus, setToolsStatus] = useState<Record<string, boolean>>({})
  const [leftWidth, setLeftWidth] = useState(188)
  const [rightWidth, setRightWidth] = useState(320)

  // Sync selected project when spaces load
  useEffect(() => {
    if (spaces.length > 0 && (!selectedProjectId || !spaces.find(s => s.id === selectedProjectId))) {
      setSelectedProjectId(spaces[0].id)
    }
  }, [spaces])

  const startDragLeft = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX, startW = leftWidth
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    const onMove = (ev: MouseEvent) => setLeftWidth(Math.max(140, Math.min(360, startW + ev.clientX - startX)))
    const onUp = () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [leftWidth])

  const startDragRight = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX, startW = rightWidth
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    const onMove = (ev: MouseEvent) => setRightWidth(Math.max(240, Math.min(520, startW - ev.clientX + startX)))
    const onUp = () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [rightWidth])

  async function loadData() {
    try {
      const data = await apiGetContexts()
      setSpaces(data.spaces)
      setActiveContextId(data.activeContextId)
    } catch { /* server not ready */ }
  }

  useEffect(() => {
    loadData()
    apiGetToolsStatus().then(setToolsStatus)
    const t = setInterval(() => apiGetToolsStatus().then(setToolsStatus), 8000)
    return () => clearInterval(t)
  }, [])

  const allContexts = spaces.flatMap(s => s.contexts.map(c => ({ context: c, space: s })))
  const selectedContext = allContexts.find(e => e.context.id === selectedContextId)?.context

  async function handleSetActive(id: string) {
    await apiSetActiveContext(id)
    setActiveContextId(id)
    loadData()
  }

  function handleSelectContext(id: string) {
    setSelectedContextId(id === selectedContextId ? '' : id)
  }

  return (
    <div
      className="w-full h-full rounded-2xl bg-ds-bg border border-ds-border flex flex-col overflow-hidden"
      style={{ boxShadow: `0 0 0 0.5px rgb(var(--ds-border)), 0 32px 80px rgba(0,0,0,${isLight ? 0.12 : 0.6})` }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 h-11 border-b border-ds-border shrink-0 bg-ds-elevated">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-ds-text-dim">duble</span>
          <span className="font-mono text-sm font-bold text-ds-accent">//</span>
          {spaces.length > 0 && (
            <>
              <span className="text-ds-border text-xs mx-0.5">/</span>
              <ProjectSwitcher spaces={spaces} selectedId={selectedProjectId} onChange={setSelectedProjectId} />
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleTheme}
            title={isLight ? 'Dark mode' : 'Light mode'}
            className="text-ds-text-dim hover:text-ds-text p-1.5 rounded hover:bg-ds-elevated transition-all"
          >
            {isLight ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M3 12h1M20 12h1M4.92 19.07l.7-.7M18.36 5.64l.7-.7" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            onClick={onCollapse}
            className="text-ds-text-dim hover:text-ds-text p-1.5 rounded hover:bg-ds-elevated transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 2l8 8M10 2L2 10" />
            </svg>
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden min-h-0">

        {/* Left sidebar */}
        <aside className="shrink-0 flex flex-col overflow-y-auto border-r border-ds-border" style={{ width: leftWidth }}>
          <ActiveContextSection
            spaces={spaces}
            activeContextId={activeContextId}
            toolsStatus={toolsStatus}
            onOpen={() => activeContextId && handleSelectContext(activeContextId)}
          />
        </aside>

        {/* Drag handle: left */}
        <div className="w-1 shrink-0 cursor-col-resize relative group" onMouseDown={startDragLeft}>
          <div className="absolute inset-y-0 left-[1.5px] w-px bg-ds-border group-hover:bg-ds-accent/50 transition-colors" />
        </div>

        {/* Center */}
        <div className="flex-1 overflow-hidden min-w-0 min-h-0 flex flex-col">
          {/* Center nav */}
          <div className="flex items-center px-4 h-9 shrink-0 border-b border-ds-border bg-ds-elevated gap-1">
            <button
              onClick={() => setCenterView('kanban')}
              className={`px-2.5 py-1 text-[10px] font-mono rounded-md transition-all
                ${centerView === 'kanban' ? 'text-ds-text bg-ds-bg border border-ds-border' : 'text-ds-text-dim hover:text-ds-text'}`}
            >
              board
            </button>
            <button
              onClick={() => setCenterView('analytics')}
              className={`px-2.5 py-1 text-[10px] font-mono rounded-md transition-all
                ${centerView === 'analytics' ? 'text-ds-text bg-ds-bg border border-ds-border' : 'text-ds-text-dim hover:text-ds-text'}`}
            >
              analytics
            </button>
          </div>

          <div className="flex-1 overflow-hidden min-h-0">
            {centerView === 'kanban' ? (
              <KanbanView
                spaces={spaces}
                activeContextId={activeContextId}
                selectedProjectId={selectedProjectId}
                onSelect={handleSelectContext}
                onSetActive={handleSetActive}
                onUpdate={async (id, patch) => {
                  await apiUpdateContext(id, patch)
                  loadData()
                }}
                onRefresh={loadData}
              />
            ) : (
              <Dashboard spaces={spaces} />
            )}
          </div>
        </div>

        {/* Drag handle: right */}
        <div className="w-1 shrink-0 cursor-col-resize relative group" onMouseDown={startDragRight}>
          <div className="absolute inset-y-0 left-[1.5px] w-px bg-ds-border group-hover:bg-ds-accent/50 transition-colors" />
        </div>

        {/* Right panel — DrillDown or empty state */}
        <div
          className="shrink-0 flex flex-col overflow-hidden min-h-0 border-l border-ds-border bg-ds-bg"
          style={{ width: rightWidth }}
        >
          {selectedContext ? (
            <DrillDownDrawer
              context={selectedContext}
              onClose={() => setSelectedContextId('')}
              onUpdate={async (id, patch) => {
                await apiUpdateContext(id, patch)
                loadData()
              }}
              onRefresh={loadData}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 p-6">
              <p className="text-ds-text-dim text-xs font-mono text-center leading-relaxed">
                Select a context<br />to see its detail
              </p>
              {activeContextId && (
                <button
                  onClick={() => handleSelectContext(activeContextId)}
                  className="mt-2 text-[10px] font-mono text-ds-accent hover:opacity-75 transition-opacity"
                >
                  Open active →
                </button>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Guard — master agent chat */}
      <GuardChat />
    </div>
  )
}

// ── ActiveContextSection ──────────────────────────────────────────────────────

function ActiveContextSection({
  spaces, activeContextId, toolsStatus, onOpen,
}: {
  spaces: Space[]
  activeContextId: string
  toolsStatus: Record<string, boolean>
  onOpen: () => void
}) {
  const context = spaces.flatMap(s => s.contexts).find(c => c.id === activeContextId)
  const progress = context?.archetype ? computeStreamProgress(context) : null
  const nextMethod = context?.archetype ? getNextMethod(context) : null
  const lastSession = context?.sessions[context.sessions.length - 1]

  return (
    <div className="px-3 py-3 border-b border-ds-border">
      <p className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest mb-2.5">active</p>

      {context ? (
        <>
          <button onClick={onOpen} className="w-full text-left hover:opacity-80 transition-opacity mb-1.5">
            <p className="text-ds-text text-xs font-semibold leading-snug">{context.name}</p>
          </button>

          <div className="flex items-center gap-1.5 flex-wrap mb-2">
            <PhaseBadge phase={context.phase} />
          </div>

          {progress && progress.total > 0 && (
            <div className="mb-1.5">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-[2px] bg-ds-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(progress.completed / progress.total) * 100}%`,
                      backgroundColor: `rgb(var(${PHASE_CSS_VAR[context.phase]}))`,
                    }}
                  />
                </div>
                <span className="text-[9px] font-mono text-ds-text-dim shrink-0">{progress.completed}/{progress.total}</span>
              </div>
              {nextMethod && (
                <p className="text-[9px] font-mono text-ds-accent mt-1 truncate">→ {nextMethod.name}</p>
              )}
            </div>
          )}

          {lastSession && (
            <div className="mt-2 pt-2 border-t border-ds-border">
              <p className="text-[9px] font-mono text-ds-text-dim leading-relaxed line-clamp-2">
                "{lastSession.summary.length > 60 ? lastSession.summary.slice(0, 57) + '…' : lastSession.summary}"
              </p>
            </div>
          )}
        </>
      ) : (
        <p className="text-ds-text-dim text-xs font-mono">no active context</p>
      )}

      {/* Tools */}
      <div className="mt-3 pt-3 border-t border-ds-border">
        <p className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest mb-2">tools</p>
        {['Claude', 'Cursor', 'Figma'].map(tool => {
          const running = toolsStatus[tool] ?? false
          return (
            <div key={tool} className="flex items-center gap-2 py-0.5">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${running ? 'bg-green-400' : 'bg-ds-border'}`} />
              <span className={`text-xs font-mono ${running ? 'text-ds-text-secondary' : 'text-ds-text-dim'}`}>{tool}</span>
              {running && <span className="text-[9px] text-green-400/60 ml-auto">live</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── helpers ───────────────────────────────────────────────────────────────────

function PhaseBadge({ phase }: { phase: Phase }) {
  const meta = PHASE_META[phase]
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono ${meta.color} ${meta.bg}`}>
      {meta.icon} {meta.label}
    </span>
  )
}
