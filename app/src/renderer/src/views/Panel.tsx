import { useState, useEffect, useCallback, useRef } from 'react'
import { Space, Context, Phase, PHASE_META } from '../types'
import { PHASE_OPERATOR } from '../data/agents'
import KanbanView from '../components/KanbanView'
import GitLog from '../components/GitLog'
import PromptBar from '../components/PromptBar'
import ContextDetail from '../components/ContextDetail'
import Connections from './Connections'
import Dashboard from './Dashboard'
import AgentsView from './AgentsView'

type View = 'dashboard' | 'chat' | 'log' | 'kanban' | 'connections' | 'context-detail' | 'agents'

const SECONDARY_VIEWS: { key: View; label: string }[] = [
  { key: 'chat',        label: 'chat'        },
  { key: 'log',         label: 'log'         },
  { key: 'kanban',      label: 'kanban'      },
  { key: 'connections', label: 'connections' },
  { key: 'agents',      label: 'agents'      },
]

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

// ── AgentChat ─────────────────────────────────────────────────────────────────

const CHAT_AGENTS = [
  { id: 'guard', icon: '◆', label: 'guard', placeholder: 'Scan handoff, classify data…' },
  { id: 'apex',  icon: '🔺', label: 'apex',  placeholder: 'Priority queue, board status…' },
  { id: 'echo',  icon: '⟳', label: 'echo',  placeholder: 'Capture session, push context…' },
]

function AgentChat() {
  const [input, setInput] = useState('')
  const [agentIdx, setAgentIdx] = useState(0)
  const agent = CHAT_AGENTS[agentIdx]

  function handleSend() {
    if (!input.trim()) return
    setInput('')
  }

  return (
    <div className="no-drag shrink-0 flex items-center gap-2 px-3 py-2.5 border-t border-ds-border bg-ds-elevated">
      <button
        onClick={() => setAgentIdx((agentIdx + 1) % CHAT_AGENTS.length)}
        className="flex items-center gap-1 shrink-0 hover:opacity-70 transition-opacity"
        title="Switch agent"
      >
        <span className="text-ds-accent text-xs font-bold">{agent.icon}</span>
        <span className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest">{agent.label}</span>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-ds-border ml-0.5">
          <path d="M1.5 3L4 5.5 6.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
        placeholder={agent.placeholder}
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

export default function Panel() {
  const [spaces, setSpaces] = useState<Space[]>([])
  const [activeContextId, setActiveContextId] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState('')
  const [view, setView] = useState<View>('dashboard')
  const [detailContextId, setDetailContextId] = useState<string | null>(null)
  const [screenPermission, setScreenPermission] = useState<string>('not-determined')
  const [toolsStatus, setToolsStatus] = useState<Record<string, boolean>>({})
  const [leftWidth, setLeftWidth] = useState(196)

  // Sync selected project when spaces load
  useEffect(() => {
    if (spaces.length > 0 && (!selectedProjectId || !spaces.find(s => s.id === selectedProjectId))) {
      setSelectedProjectId(spaces[0].id)
    }
  }, [spaces])

  const startDragLeft = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startW = leftWidth
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    const onMove = (ev: MouseEvent) => setLeftWidth(Math.max(120, Math.min(400, startW + ev.clientX - startX)))
    const onUp = () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [leftWidth])

  async function loadData() {
    const { spaces, activeContextId } = await window.ds.getContexts()
    setSpaces(spaces)
    setActiveContextId(activeContextId)
  }

  useEffect(() => {
    loadData()
    window.ds.getScreenPermission().then(setScreenPermission)
    window.ds.getToolsStatus().then(setToolsStatus)
    const toolsTimer = setInterval(() => window.ds.getToolsStatus().then(setToolsStatus), 8000)
    const unsubCtx = window.ds.onContextChanged(() => loadData())
    return () => { clearInterval(toolsTimer); unsubCtx() }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && view !== 'dashboard') setView('dashboard')
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [view])

  const activeContext = spaces.flatMap(s => s.contexts).find(c => c.id === activeContextId)
  const allFlatContexts = spaces.flatMap(s => s.contexts.map(c => ({ context: c, space: s })))
  const detailEntry = detailContextId ? allFlatContexts.find(fc => fc.context.id === detailContextId) : null

  async function handleSelectContext(id: string) {
    await window.ds.setActiveContext(id)
    setActiveContextId(id)
  }

  function navigate(v: View) {
    setView(v)
  }

  function openContext(id: string) {
    setDetailContextId(id)
    setView('context-detail')
  }

  return (
    <div
      className="w-full h-full rounded-2xl bg-ds-bg border border-ds-border flex flex-col overflow-hidden"
      style={{ boxShadow: '0 0 0 0.5px #2a2a2a, 0 32px 80px rgba(0,0,0,0.8)' }}
    >
      {/* Header */}
      <header className="drag flex items-center justify-between px-4 h-11 border-b border-ds-border shrink-0">
        <div className="flex items-center gap-2 no-drag">
          <span className="text-xs font-mono text-ds-text-dim">duble</span>
          <span className="font-mono text-sm font-bold text-ds-accent">//</span>
          {spaces.length > 0 && (
            <>
              <span className="text-ds-border text-xs mx-0.5">/</span>
              <ProjectSwitcher spaces={spaces} selectedId={selectedProjectId} onChange={setSelectedProjectId} />
            </>
          )}
        </div>
        <div className="flex items-center gap-1 no-drag">
          <button
            onClick={() => window.ds.showCommand()}
            className="text-xs font-mono text-ds-text-dim hover:text-ds-text px-2 py-1 rounded hover:bg-ds-elevated transition-all"
            title="Command palette (⌘/)"
          >
            ⌘/
          </button>
          <button
            onClick={() => window.ds.collapsePanel()}
            className="text-ds-text-dim hover:text-ds-text p-1.5 rounded hover:bg-ds-elevated transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 2l8 8M10 2L2 10" />
            </svg>
          </button>
        </div>
      </header>

      {/* Body: sidebar + main */}
      <div className="flex-1 flex overflow-hidden no-drag min-h-0">

        {/* Left sidebar */}
        <aside className="shrink-0 flex flex-col overflow-y-auto" style={{ width: leftWidth }}>

          {/* Active context */}
          <SidebarSection label="context">
            {activeContext ? (
              <div>
                <p className="text-ds-text text-sm font-medium leading-snug mb-2">{activeContext.name}</p>
                <PhaseBadge phase={activeContext.phase} />
                <SidebarAgentSignal context={activeContext} />
              </div>
            ) : (
              <p className="text-ds-text-dim text-xs font-mono">no active context</p>
            )}
          </SidebarSection>

          {/* Running tools */}
          <SidebarSection label="tools">
            {['Claude', 'Cursor', 'Figma'].map(tool => {
              const running = toolsStatus[tool] ?? false
              return (
                <div key={tool} className="flex items-center gap-2 py-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${running ? 'bg-green-400' : 'bg-ds-border'}`} />
                  <span className={`text-xs font-mono ${running ? 'text-ds-text-secondary' : 'text-ds-text-dim'}`}>
                    {tool}
                  </span>
                  {running && <span className="text-[9px] text-green-400/60 ml-auto">live</span>}
                </div>
              )
            })}
          </SidebarSection>

          {/* Screen recording */}
          <SidebarSection label="screen">
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${screenPermission === 'granted' ? 'bg-green-400' : 'bg-amber-400'}`}
              />
              <span className="text-xs font-mono text-ds-text-dim">
                {screenPermission === 'granted' ? 'capturing' : screenPermission === 'denied' ? 'denied' : 'no access'}
              </span>
            </div>
            {screenPermission !== 'granted' && (
              <button
                onClick={() => window.ds.openScreenSettings()}
                className="mt-2 text-[10px] font-mono text-ds-accent hover:opacity-75 transition-opacity"
              >
                grant access →
              </button>
            )}
          </SidebarSection>

        </aside>

        {/* Drag handle */}
        <div className="w-1 shrink-0 cursor-col-resize relative group" onMouseDown={startDragLeft}>
          <div className="absolute inset-y-0 left-[1.5px] w-px bg-ds-border group-hover:bg-ds-accent/50 transition-colors" />
        </div>

        {/* Main area */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">

          {/* Secondary nav */}
          <SecondaryNav view={view} onNavigate={navigate} />

          {/* View content */}
          <div className="flex-1 overflow-hidden min-h-0">
            {view === 'dashboard' && (
              <Dashboard
                spaces={spaces}
                activeContextId={activeContextId}
                onSetActive={async (id) => {
                  await window.ds.setActiveContext(id)
                  setActiveContextId(id)
                }}
                onOpenContext={openContext}
              />
            )}

            {view === 'context-detail' && detailEntry && (
              <ContextDetail
                context={detailEntry.context}
                space={detailEntry.space}
                isActive={detailEntry.context.id === activeContextId}
                onBack={() => setView('dashboard')}
                onSetActive={() => {
                  window.ds.setActiveContext(detailEntry.context.id)
                  setActiveContextId(detailEntry.context.id)
                }}
                onUpdate={async (patch) => {
                  await window.ds.updateContext(detailEntry.context.id, patch)
                  loadData()
                }}
              />
            )}

            {view === 'chat' && <PromptBar activeContext={activeContext} />}
            {view === 'log' && <GitLog />}
            {view === 'kanban' && (
              <KanbanView
                spaces={spaces}
                activeContextId={activeContextId}
                selectedProjectId={selectedProjectId}
                onSelect={handleSelectContext}
                onSetActive={async (id) => {
                  await window.ds.setActiveContext(id)
                  setActiveContextId(id)
                }}
                onUpdate={async (id, patch) => {
                  await window.ds.updateContext(id, patch)
                  loadData()
                }}
                onRefresh={loadData}
              />
            )}
            {view === 'connections' && <Connections />}
            {view === 'agents' && (
              <AgentsView activePhase={activeContext?.phase} />
            )}
          </div>

        </div>
      </div>

      {/* Agent chat bar */}
      <AgentChat />
    </div>
  )
}

// ── SecondaryNav ──────────────────────────────────────────────────────────────

function SecondaryNav({ view, onNavigate }: { view: View; onNavigate: (v: View) => void }) {
  const isDashboard = view === 'dashboard'

  return (
    <div className="flex items-center justify-between px-3 border-b border-ds-border h-9 shrink-0">
      {isDashboard ? (
        <span className="text-[10px] font-mono text-ds-text-dim uppercase tracking-widest">dashboard</span>
      ) : (
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-[10px] font-mono text-ds-text-dim hover:text-ds-text transition-colors uppercase tracking-widest"
        >
          ← dashboard
        </button>
      )}
      <div className="flex items-center gap-0.5">
        {SECONDARY_VIEWS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all
              ${view === key ? 'text-ds-text bg-ds-elevated' : 'text-ds-text-secondary hover:text-ds-text'}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Sidebar helpers ───────────────────────────────────────────────────────────

function SidebarSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-3 py-3 border-b border-ds-border">
      <p className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest mb-2.5">{label}</p>
      {children}
    </div>
  )
}

function SidebarAgentSignal({ context }: { context: Context }) {
  const lastSession = context.sessions[context.sessions.length - 1]
  const tasks = context.tasks ?? []
  const nextTask = tasks.find((t) => !t.done)
  const lastArtifact = context.artifacts[context.artifacts.length - 1]
  const operator = PHASE_OPERATOR[context.phase]

  return (
    <div className="mt-3 pt-3 border-t border-ds-border">
      {/* Active operator for this phase */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-[10px]">{operator.icon}</span>
        <span className="text-[9px] font-mono text-ds-accent font-semibold">{operator.name}</span>
        <code className="text-[8px] font-mono text-ds-text-dim ml-auto">{operator.invocation}</code>
      </div>

      {lastSession && (
        <>
          <p className="text-[10px] text-ds-text-dim leading-relaxed mb-2">
            "{lastSession.summary.length > 52
              ? lastSession.summary.slice(0, 49) + '…'
              : lastSession.summary}"
          </p>
          <div className="flex flex-col gap-1">
            {nextTask && (
              <button className="text-left text-[10px] font-mono text-ds-accent hover:opacity-75 transition-opacity leading-relaxed">
                → {nextTask.name.split(' ').slice(0, 5).join(' ')}
                {nextTask.name.split(' ').length > 5 ? '…' : ''}
              </button>
            )}
            <button className="text-left text-[10px] font-mono text-ds-text-secondary hover:text-ds-text transition-colors">
              → Review last summary
            </button>
            {lastArtifact && (
              <button className="text-left text-[10px] font-mono text-ds-text-secondary hover:text-ds-text transition-colors">
                → See {lastArtifact.name}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function PhaseBadge({ phase }: { phase: Phase }) {
  const meta = PHASE_META[phase]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono
      border ${meta.color} ${meta.bg} ${meta.border}`}>
      <span>{meta.icon}</span>
      <span>{meta.label}</span>
    </span>
  )
}
