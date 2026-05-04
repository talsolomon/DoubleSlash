import { useState, useEffect, useCallback } from 'react'
import { Space, Context, Phase, PHASE_META, GitEntry, apiGetContexts, apiSetActiveContext, apiUpdateContext, apiGetGitLog } from '../types'
import KanbanView from '../components/KanbanView'
import ChatView from '../components/ChatView'
import ContextDetail from '../components/ContextDetail'
import Dashboard from './Dashboard'

type CenterView = 'dashboard' | 'map'

const TOOL_NAMES = ['Claude', 'Cursor', 'Figma']

async function apiGetToolsStatus(): Promise<Record<string, boolean>> {
  try {
    const r = await fetch('http://localhost:3002/api/tools-status')
    return r.json()
  } catch { return {} }
}

type RightTab = 'detail' | 'chat'

interface Props { onCollapse: () => void; isLight: boolean; onToggleTheme: () => void }

export default function Panel({ onCollapse, isLight, onToggleTheme }: Props) {
  const [spaces, setSpaces] = useState<Space[]>([])
  const [activeContextId, setActiveContextId] = useState('')
  const [selectedContextId, setSelectedContextId] = useState('')
  const [centerView, setCenterView] = useState<CenterView>('dashboard')
  const [rightTab, setRightTab] = useState<RightTab>('detail')
  const [toolsStatus, setToolsStatus] = useState<Record<string, boolean>>({})
  const [gitLog, setGitLog] = useState<GitEntry[]>([])
  const [leftWidth, setLeftWidth] = useState(180)
  const [rightWidth, setRightWidth] = useState(320)

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

  const startDragRight = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startW = rightWidth
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    const onMove = (ev: MouseEvent) => setRightWidth(Math.max(200, Math.min(520, startW - ev.clientX + startX)))
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
    apiGetGitLog().then(setGitLog).catch(() => {})
    const t = setInterval(() => apiGetToolsStatus().then(setToolsStatus), 8000)
    return () => clearInterval(t)
  }, [])

  const allContexts = spaces.flatMap(s => s.contexts.map(c => ({ context: c, space: s })))
  const activeContext = allContexts.find(e => e.context.id === activeContextId)?.context
  const selectedEntry = allContexts.find(e => e.context.id === selectedContextId)
  const selectedContext = selectedEntry?.context
  const selectedSpace = selectedEntry?.space

  async function handleSetActive(id: string) {
    await apiSetActiveContext(id)
    setActiveContextId(id)
    loadData()
  }

  function handleSelectContext(id: string) {
    setSelectedContextId(id)
    setRightTab('detail')
  }

  function handlePushChat(id: string) {
    setSelectedContextId(id)
    setRightTab('chat')
  }

  function handleContextUpdate(patch: Partial<Context>) {
    if (!selectedContextId) return
    apiUpdateContext(selectedContextId, patch)
    setSpaces(prev => prev.map(space => ({
      ...space,
      contexts: space.contexts.map(ctx =>
        ctx.id === selectedContextId ? { ...ctx, ...patch } : ctx
      )
    })))
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
          {activeContext && (
            <>
              <span className="text-ds-border text-xs mx-0.5">/</span>
              <span className="text-xs font-mono text-ds-text-secondary truncate max-w-[200px]">
                {activeContext.name}
              </span>
              <PhaseBadge phase={activeContext.phase} />
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleTheme}
            title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
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

          {/* Active context signal */}
          <SidebarSection label="context">
            {activeContext ? (
              <div>
                <p className="text-ds-text text-xs font-semibold leading-snug mb-1.5">{activeContext.name}</p>
                <PhaseBadge phase={activeContext.phase} />
                {(() => {
                  const lastSession = activeContext.sessions[activeContext.sessions.length - 1]
                  const nextTask = activeContext.tasks?.find(t => !t.done)
                  if (!lastSession) return null
                  return (
                    <div className="mt-2.5 pt-2.5 border-t border-ds-border">
                      <p className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest mb-1">agent</p>
                      <p className="text-[10px] text-ds-text-dim leading-relaxed mb-1.5">
                        Paused after "
                        {lastSession.summary.length > 48 ? lastSession.summary.slice(0, 45) + '…' : lastSession.summary}
                        "
                      </p>
                      {nextTask && (
                        <button
                          onClick={() => handleSelectContext(activeContextId)}
                          className="text-left text-[10px] font-mono text-ds-accent hover:opacity-75 transition-opacity leading-relaxed"
                        >
                          → {nextTask.name.split(' ').slice(0, 5).join(' ')}{nextTask.name.split(' ').length > 5 ? '…' : ''}
                        </button>
                      )}
                    </div>
                  )
                })()}
              </div>
            ) : (
              <p className="text-ds-text-dim text-xs font-mono">no active context</p>
            )}
          </SidebarSection>

          <SidebarSection label="tools">
            {TOOL_NAMES.map(tool => {
              const running = toolsStatus[tool] ?? false
              return (
                <div key={tool} className="flex items-center gap-2 py-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${running ? 'bg-green-400' : 'bg-ds-border'}`} />
                  <span className={`text-xs font-mono ${running ? 'text-ds-text-secondary' : 'text-ds-text-dim'}`}>{tool}</span>
                  {running && <span className="text-[9px] text-green-400/60 ml-auto">live</span>}
                </div>
              )
            })}
          </SidebarSection>

          {/* Recent sessions */}
          {gitLog.length > 0 && (
            <SidebarSection label="git">
              <div className="space-y-1">
                {gitLog.slice(0, 5).map(entry => (
                  <div key={entry.hash} className="py-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <code className="text-ds-accent text-[9px] font-mono">{entry.hash}</code>
                      <span className="text-ds-text-dim text-[9px] ml-auto">{entry.date}</span>
                    </div>
                    <p className="text-[10px] text-ds-text-secondary leading-snug line-clamp-1">{entry.message}</p>
                  </div>
                ))}
              </div>
            </SidebarSection>
          )}

        </aside>

        {/* Drag handle: left */}
        <div className="w-1 shrink-0 cursor-col-resize relative group" onMouseDown={startDragLeft}>
          <div className="absolute inset-y-0 left-[1.5px] w-px bg-ds-border group-hover:bg-ds-accent/50 transition-colors" />
        </div>

        {/* Center: Dashboard or Map */}
        <div className="flex-1 overflow-hidden min-w-0 min-h-0 flex flex-col">
          {/* Center nav */}
          <div className="flex items-center px-4 h-9 shrink-0 border-b border-ds-border bg-ds-elevated gap-1">
            <button
              onClick={() => setCenterView('dashboard')}
              className={`px-2.5 py-1 text-[10px] font-mono rounded-md transition-all
                ${centerView === 'dashboard' ? 'text-ds-text bg-ds-bg border border-ds-border' : 'text-ds-text-dim hover:text-ds-text'}`}
            >
              dashboard
            </button>
            <button
              onClick={() => setCenterView('map')}
              className={`px-2.5 py-1 text-[10px] font-mono rounded-md transition-all
                ${centerView === 'map' ? 'text-ds-text bg-ds-bg border border-ds-border' : 'text-ds-text-dim hover:text-ds-text'}`}
            >
              map
            </button>
          </div>

          <div className="flex-1 overflow-hidden min-h-0">
            {centerView === 'dashboard' ? (
              <Dashboard
                spaces={spaces}
                activeContextId={activeContextId}
                selectedContextId={selectedContextId}
                onSelect={handleSelectContext}
                onSetActive={handleSetActive}
                onPushChat={handlePushChat}
              />
            ) : (
              <KanbanView
                spaces={spaces}
                activeContextId={activeContextId}
                selectedContextId={selectedContextId}
                onSelect={handleSelectContext}
                onSetActive={handleSetActive}
                onPushChat={handlePushChat}
                onRefresh={loadData}
              />
            )}
          </div>
        </div>

        {/* Drag handle: right */}
        <div className="w-1 shrink-0 cursor-col-resize relative group" onMouseDown={startDragRight}>
          <div className="absolute inset-y-0 left-[1.5px] w-px bg-ds-border group-hover:bg-ds-accent/50 transition-colors" />
        </div>

        {/* Right panel */}
        <div className="shrink-0 flex flex-col overflow-hidden bg-ds-surface min-h-0 border-l border-ds-border" style={{ width: rightWidth }}>
          {selectedContext && selectedSpace ? (
            <>
              <div className="flex items-center gap-0.5 border-b border-ds-border px-3 h-9 shrink-0 bg-ds-elevated">
                <button
                  onClick={() => setRightTab('detail')}
                  className={`px-3 py-1 text-xs font-mono rounded-md transition-all
                    ${rightTab === 'detail' ? 'text-ds-text bg-ds-bg border border-ds-border' : 'text-ds-text-dim hover:text-ds-text'}`}
                >
                  detail
                </button>
                <button
                  onClick={() => setRightTab('chat')}
                  className={`px-3 py-1 text-xs font-mono rounded-md transition-all
                    ${rightTab === 'chat' ? 'text-ds-text bg-ds-bg border border-ds-border' : 'text-ds-text-dim hover:text-ds-text'}`}
                >
                  <span className="text-ds-accent">//</span> chat
                </button>
                <button
                  onClick={() => setSelectedContextId('')}
                  className="ml-auto text-ds-text-dim hover:text-ds-text p-1.5 rounded hover:bg-ds-elevated transition-all"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 2l8 8M10 2L2 10" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-hidden min-h-0">
                {rightTab === 'detail' ? (
                  <ContextDetail
                    context={selectedContext}
                    space={selectedSpace}
                    isActive={selectedContext.id === activeContextId}
                    onSetActive={() => handleSetActive(selectedContext.id)}
                    onUpdate={handleContextUpdate}
                  />
                ) : (
                  <ChatView activeContext={selectedContext} />
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 p-6">
              <p className="text-ds-text-dim text-xs font-mono text-center">Select a context to see details</p>
              {activeContext && (
                <button
                  onClick={() => handleSelectContext(activeContextId)}
                  className="mt-1 text-[10px] font-mono text-ds-accent hover:opacity-75 transition-opacity"
                >
                  Open active context →
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

// ── helpers ───────────────────────────────────────────────────────────────────

function SidebarSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-3 py-3 border-b border-ds-border">
      <p className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest mb-2.5">{label}</p>
      {children}
    </div>
  )
}

function PhaseBadge({ phase }: { phase: Phase }) {
  const meta = PHASE_META[phase]
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono
      ${meta.color} ${meta.bg}`}>
      {meta.icon} {meta.label}
    </span>
  )
}
