import { useState, useEffect } from 'react'
import { Space, Context, Phase, PHASE_META } from '../types'
import KanbanView from '../components/KanbanView'
import GitLog from '../components/GitLog'
import PromptBar from '../components/PromptBar'
import Connections from './Connections'
import Dashboard from './Dashboard'

type Tab = 'dash' | 'chat' | 'log' | 'map' | 'connections'

const AGENT_ROSTER: { name: string; phase: Phase; desc: string }[] = [
  { name: 'Dora', phase: 'explore',  desc: 'research & define' },
  { name: 'Sol',  phase: 'solidify', desc: 'design & decide' },
  { name: 'Bran', phase: 'build',    desc: 'build & test' },
  { name: 'May',  phase: 'ship',     desc: 'ship & capture' },
]

const TOOL_NAMES = ['Claude', 'Cursor', 'Figma']

export default function Panel() {
  const [spaces, setSpaces] = useState<Space[]>([])
  const [activeContextId, setActiveContextId] = useState('')
  const [tab, setTab] = useState<Tab>('dash')
  const [screenPermission, setScreenPermission] = useState<string>('not-determined')
  const [toolsStatus, setToolsStatus] = useState<Record<string, boolean>>({})

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

  const activeContext = spaces.flatMap(s => s.contexts).find(c => c.id === activeContextId)

  async function handleSelectContext(id: string) {
    await window.ds.setActiveContext(id)
    setActiveContextId(id)
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
          {activeContext && (
            <>
              <span className="text-ds-border text-xs mx-0.5">/</span>
              <span className="text-xs font-mono text-ds-text-secondary truncate max-w-[220px]">
                {activeContext.name}
              </span>
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
      <div className="flex-1 flex overflow-hidden no-drag">

        {/* Left sidebar */}
        <aside className="w-[196px] shrink-0 border-r border-ds-border flex flex-col overflow-y-auto">

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
            <button
              onClick={() => window.ds.showCommand()}
              className="mt-2.5 text-[10px] font-mono text-ds-text-dim hover:text-ds-accent transition-colors"
            >
              switch context →
            </button>
          </SidebarSection>

          {/* Agents */}
          <SidebarSection label="agents">
            {AGENT_ROSTER.map(agent => {
              const isActive = activeContext?.phase === agent.phase
              const meta = PHASE_META[agent.phase]
              return (
                <div
                  key={agent.name}
                  className={`flex items-center gap-2 py-1 transition-opacity ${isActive ? 'opacity-100' : 'opacity-35'}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all
                      ${isActive
                        ? `${meta.color.replace('text-', 'bg-')} shadow-[0_0_4px_currentColor]`
                        : 'bg-ds-border'
                      }`}
                  />
                  <span className={`text-xs font-mono ${isActive ? 'text-ds-text' : 'text-ds-text-dim'}`}>
                    {agent.name}
                  </span>
                  <span className="text-[9px] text-ds-text-dim ml-auto truncate">{agent.desc}</span>
                </div>
              )
            })}
          </SidebarSection>

          {/* Running tools */}
          <SidebarSection label="tools">
            {TOOL_NAMES.map(tool => {
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

        {/* Main area */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Tab bar */}
          <div className="flex items-center gap-0.5 border-b border-ds-border px-3 h-9 shrink-0">
            {(['dash', 'chat', 'log', 'map', 'connections'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 text-xs font-mono capitalize rounded-md transition-all
                  ${tab === t ? 'text-ds-text bg-ds-elevated' : 'text-ds-text-secondary hover:text-ds-text'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-hidden">
            {tab === 'dash' && (
              <Dashboard
                spaces={spaces}
                activeContextId={activeContextId}
                onSelect={handleSelectContext}
                onSetActive={async (id) => {
                  await window.ds.setActiveContext(id)
                  setActiveContextId(id)
                }}
              />
            )}
            {tab === 'chat' && <PromptBar activeContext={activeContext} />}
            {tab === 'log' && <GitLog />}
            {tab === 'map' && (
              <KanbanView
                spaces={spaces}
                activeContextId={activeContextId}
                onSelect={handleSelectContext}
                onSetActive={async (id) => {
                  await window.ds.setActiveContext(id)
                  setActiveContextId(id)
                }}
                onRefresh={loadData}
              />
            )}
            {tab === 'connections' && <Connections />}
          </div>

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

function SidebarAgentSignal({ context }: { context: Context }) {
  const lastSession = context.sessions[context.sessions.length - 1]
  const tasks = context.tasks ?? []
  const nextTask = tasks.find((t) => !t.done)
  const lastArtifact = context.artifacts[context.artifacts.length - 1]

  if (!lastSession) return null

  return (
    <div className="mt-3 pt-3 border-t border-ds-border">
      <p className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest mb-1.5">agent</p>
      <p className="text-[10px] text-ds-text-dim leading-relaxed mb-2">
        Paused after "
        {lastSession.summary.length > 52
          ? lastSession.summary.slice(0, 49) + '…'
          : lastSession.summary}
        "
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
