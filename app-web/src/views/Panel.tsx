import { useState, useEffect } from 'react'
import { Space, Context, Phase, PHASE_META, GitEntry, apiGetContexts, apiSetActiveContext, apiUpdateContext, apiGetGitLog } from '../types'
import KanbanView from '../components/KanbanView'
import ChatView from '../components/ChatView'
import ContextDetail from '../components/ContextDetail'

const AGENT_ROSTER: { name: string; phase: Phase; desc: string }[] = [
  { name: 'Dora', phase: 'explore',  desc: 'research & define' },
  { name: 'Sol',  phase: 'solidify', desc: 'design & decide' },
  { name: 'Bran', phase: 'build',    desc: 'build & test' },
  { name: 'May',  phase: 'ship',     desc: 'ship & capture' },
]

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
  const [rightTab, setRightTab] = useState<RightTab>('detail')
  const [toolsStatus, setToolsStatus] = useState<Record<string, boolean>>({})
  const [gitLog, setGitLog] = useState<GitEntry[]>([])

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
      style={{ boxShadow: '0 0 0 0.5px rgb(var(--ds-border)), 0 32px 80px rgba(0,0,0,0.6)' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 h-11 border-b border-ds-border shrink-0 bg-ds-surface/60">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-ds-accent">//</span>
          <span className="text-xs font-mono text-ds-text-dim">duble</span>
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
      <div className="flex-1 flex overflow-hidden">

        {/* Left sidebar */}
        <aside className="w-[180px] shrink-0 border-r border-ds-border flex flex-col overflow-y-auto">
          <SidebarSection label="agents">
            {AGENT_ROSTER.map(agent => {
              const isActive = activeContext?.phase === agent.phase
              const meta = PHASE_META[agent.phase]
              return (
                <div
                  key={agent.name}
                  className={`flex items-center gap-2 py-1 transition-opacity ${isActive ? 'opacity-100' : 'opacity-35'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? meta.color.replace('text-', 'bg-') : 'bg-ds-border'}`} />
                  <span className={`text-xs font-mono ${isActive ? 'text-ds-text' : 'text-ds-text-dim'}`}>{agent.name}</span>
                  <span className="text-[9px] text-ds-text-dim ml-auto truncate">{agent.desc}</span>
                </div>
              )
            })}
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

          {/* Spaces / context list */}
          <SidebarSection label="spaces">
            {spaces.map(space => (
              <div key={space.id} className="mb-2">
                <p className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest mb-1.5">{space.client}</p>
                {space.contexts.map(ctx => (
                  <button
                    key={ctx.id}
                    onClick={() => handleSelectContext(ctx.id)}
                    className={`w-full text-left px-2 py-1 rounded-md text-xs font-mono truncate transition-all
                      ${ctx.id === selectedContextId
                        ? 'text-ds-text bg-ds-elevated'
                        : ctx.id === activeContextId
                          ? 'text-ds-accent'
                          : 'text-ds-text-dim hover:text-ds-text-secondary hover:bg-ds-elevated/50'
                      }`}
                  >
                    {ctx.id === activeContextId && <span className="text-ds-accent mr-1">·</span>}
                    {ctx.name}
                  </button>
                ))}
              </div>
            ))}
          </SidebarSection>
        </aside>

        {/* Kanban — always visible */}
        <div className="flex-1 overflow-hidden border-r border-ds-border min-w-0">
          <KanbanView
            spaces={spaces}
            activeContextId={activeContextId}
            selectedContextId={selectedContextId}
            onSelect={handleSelectContext}
            onSetActive={handleSetActive}
            onPushChat={handlePushChat}
            onRefresh={loadData}
          />
        </div>

        {/* Right panel */}
        <div className="w-[300px] shrink-0 flex flex-col overflow-hidden bg-ds-surface/20">
          {selectedContext && selectedSpace ? (
            <>
              {/* Right panel tab bar */}
              <div className="flex items-center gap-0.5 border-b border-ds-border px-3 h-9 shrink-0 bg-ds-surface/40">
                <button
                  onClick={() => setRightTab('detail')}
                  className={`px-3 py-1 text-xs font-mono rounded-md transition-all
                    ${rightTab === 'detail' ? 'text-ds-text bg-ds-elevated' : 'text-ds-text-dim hover:text-ds-text'}`}
                >
                  detail
                </button>
                <button
                  onClick={() => setRightTab('chat')}
                  className={`px-3 py-1 text-xs font-mono rounded-md transition-all
                    ${rightTab === 'chat' ? 'text-ds-text bg-ds-elevated' : 'text-ds-text-dim hover:text-ds-text'}`}
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

              <div className="flex-1 overflow-hidden">
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
            <>
              <div className="flex items-center px-4 h-9 border-b border-ds-border shrink-0 bg-ds-surface/40">
                <span className="text-[10px] font-mono text-ds-text-dim uppercase tracking-widest">Activity</span>
              </div>
              <ActivityLog entries={gitLog} spaces={spaces} />
            </>
          )}
        </div>

      </div>
    </div>
  )
}

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

function ActivityLog({ entries, spaces }: { entries: GitEntry[]; spaces: Space[] }) {
  const allSessions = spaces
    .flatMap(s => s.contexts.flatMap(ctx =>
      ctx.sessions.map(session => ({
        session,
        contextName: ctx.name,
        contextId: ctx.id,
        artifactNames: ctx.artifacts
          .filter(a => session.artifactIds.includes(a.id))
          .map(a => a.name)
      }))
    ))
    .sort((a, b) => b.session.date.localeCompare(a.session.date))

  return (
    <div className="flex-1 overflow-y-auto">
      {allSessions.length > 0 && (
        <div className="p-3 border-b border-ds-border">
          <p className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest mb-2">Recent sessions</p>
          <div className="space-y-2">
            {allSessions.map(({ session, contextName, artifactNames }) => (
              <div key={session.id} className="px-2 py-2 rounded-lg bg-ds-elevated/50 border border-ds-border/50">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-mono text-ds-text-dim px-1.5 py-0.5 rounded bg-ds-elevated border border-ds-border">
                    {session.tool}
                  </span>
                  <span className="text-[10px] text-ds-text-dim ml-auto">{session.date}</span>
                </div>
                <p className="text-[11px] text-ds-text-secondary leading-snug mb-1">{session.summary}</p>
                <p className="text-[10px] text-ds-text-dim font-mono truncate">↳ {contextName}</p>
                {artifactNames.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {artifactNames.map(name => (
                      <span key={name} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-ds-accent/10 border border-ds-accent/20 text-ds-accent/80">
                        {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {entries.length > 0 && (
        <div className="p-3">
          <p className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest mb-2">Git log</p>
          <div className="space-y-1">
            {entries.slice(0, 12).map(entry => (
              <div key={entry.hash} className="px-2 py-2 rounded-lg hover:bg-ds-elevated transition-all">
                <div className="flex items-center gap-2 mb-0.5">
                  <code className="text-ds-accent text-[10px] font-mono">{entry.hash}</code>
                  <span className="text-ds-text-dim text-[10px] ml-auto">{entry.date}</span>
                </div>
                <p className="text-[11px] text-ds-text-secondary leading-snug line-clamp-2">{entry.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {entries.length === 0 && allSessions.length === 0 && (
        <div className="h-full flex items-center justify-center">
          <p className="text-ds-text-dim text-xs font-mono">no activity yet</p>
        </div>
      )}
    </div>
  )
}
