import { useState, useRef, useCallback } from 'react'
import { Space, Context, Phase, PHASE_META, PHASES, apiCreateContext } from '../types'

interface Props {
  spaces: Space[]
  activeContextId: string
  selectedContextId: string
  onSelect: (contextId: string) => void
  onSetActive: (contextId: string) => void
  onPushChat: (contextId: string) => void
  onRefresh: () => void
}

interface FlatContext {
  context: Context
  space: Space
}

const DEFAULT_WIDTH = 250
const MIN_WIDTH = 160
const MAX_WIDTH = 480

export default function KanbanView({ spaces, activeContextId, selectedContextId, onSelect, onSetActive, onPushChat, onRefresh }: Props) {
  const flat: FlatContext[] = spaces.flatMap(space =>
    space.contexts.map(context => ({ context, space }))
  )

  const byPhase = PHASES.reduce(
    (acc, phase) => {
      acc[phase] = flat.filter(fc => fc.context.phase === phase)
      return acc
    },
    {} as Record<Phase, FlatContext[]>
  )

  const [widths, setWidths] = useState<Record<Phase, number>>({
    explore: DEFAULT_WIDTH, solidify: DEFAULT_WIDTH, build: DEFAULT_WIDTH, ship: DEFAULT_WIDTH
  })

  const dragRef = useRef<{ phase: Phase; startX: number; startWidth: number } | null>(null)

  const startResize = useCallback((phase: Phase, e: React.MouseEvent) => {
    e.preventDefault()
    dragRef.current = { phase, startX: e.clientX, startWidth: widths[phase] }

    function onMove(ev: MouseEvent) {
      if (!dragRef.current) return
      const delta = ev.clientX - dragRef.current.startX
      const next = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, dragRef.current.startWidth + delta))
      setWidths(prev => ({ ...prev, [dragRef.current!.phase]: next }))
    }
    function onUp() {
      dragRef.current = null
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [widths])

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex overflow-x-auto p-3 gap-0">
        {PHASES.map((phase, i) => (
          <div key={phase} className="flex items-start gap-0">
            <KanbanColumn
              phase={phase}
              width={widths[phase]}
              items={byPhase[phase]}
              activeContextId={activeContextId}
              selectedContextId={selectedContextId}
              spaces={spaces}
              onSelect={onSelect}
              onSetActive={onSetActive}
              onPushChat={onPushChat}
              onRefresh={onRefresh}
            />
            {i < PHASES.length - 1 && (
              <ResizeHandle phase={phase} onResizeStart={startResize} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ResizeHandle({ phase, onResizeStart }: { phase: Phase; onResizeStart: (phase: Phase, e: React.MouseEvent) => void }) {
  return (
    <div
      className="flex items-start pt-[52px] shrink-0 px-0.5 cursor-col-resize group select-none"
      onMouseDown={e => onResizeStart(phase, e)}
    >
      <div className="flex items-center justify-center w-5 h-7">
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="transition-opacity group-hover:opacity-100 opacity-50">
          <path d="M3 14 Q10 7 17 14 Q10 21 3 14Z" fill="none" stroke="rgb(var(--ds-border-light))" strokeWidth="1.2" />
          <path d="M13 14 L17 14" stroke="rgb(var(--ds-border-light))" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

function KanbanColumn({
  phase, width, items, activeContextId, selectedContextId, spaces, onSelect, onSetActive, onPushChat, onRefresh
}: {
  phase: Phase
  width: number
  items: FlatContext[]
  activeContextId: string
  selectedContextId: string
  spaces: Space[]
  onSelect: (id: string) => void
  onSetActive: (id: string) => void
  onPushChat: (id: string) => void
  onRefresh: () => void
}) {
  const meta = PHASE_META[phase]
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')

  async function handleAdd() {
    const name = newName.trim()
    if (!name || !spaces[0]) return
    await apiCreateContext(spaces[0].id, name, phase)
    setNewName('')
    setAdding(false)
    onRefresh()
  }

  return (
    <div style={{ width }} className="shrink-0 flex flex-col">
      <div className="flex items-center gap-2 px-2 py-3 mb-1">
        <span className={`text-sm ${meta.color}`}>{meta.icon}</span>
        <span className="text-xs font-mono font-semibold text-ds-text-secondary uppercase tracking-widest">
          {meta.label}
        </span>
        {items.length > 0 && (
          <span className="ml-auto text-[10px] font-mono text-ds-text-dim bg-ds-elevated px-1.5 py-0.5 rounded-full">
            {items.length}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 flex-1 overflow-y-auto px-1">
        {items.map(({ context, space }) => (
          <ContextCard
            key={context.id}
            context={context}
            space={space}
            isActive={context.id === activeContextId}
            isSelected={context.id === selectedContextId}
            onSelect={() => onSelect(context.id)}
            onSetActive={() => onSetActive(context.id)}
            onPushChat={() => onPushChat(context.id)}
          />
        ))}

        {items.length === 0 && !adding && (
          <div
            className={`rounded-xl border border-dashed ${meta.border} p-5 text-center cursor-pointer
              hover:border-opacity-60 transition-all`}
            onClick={() => setAdding(true)}
          >
            <span className="text-ds-text-dim text-xs font-mono">empty</span>
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
              <button onClick={handleAdd} className="text-xs font-mono text-ds-accent hover:text-ds-text transition-colors">Add ↵</button>
              <button onClick={() => { setAdding(false); setNewName('') }} className="text-xs font-mono text-ds-text-dim hover:text-ds-text transition-colors">Cancel</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="text-left text-xs font-mono text-ds-text-dim hover:text-ds-text-secondary
              px-2 py-1.5 rounded-lg hover:bg-ds-elevated transition-all"
          >
            + New context
          </button>
        )}
      </div>
    </div>
  )
}

function ContextCard({ context, space, isActive, isSelected, onSelect, onSetActive, onPushChat }: {
  context: Context
  space: Space
  isActive: boolean
  isSelected: boolean
  onSelect: () => void
  onSetActive: () => void
  onPushChat: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const meta = PHASE_META[context.phase]
  const lastSession = context.sessions[context.sessions.length - 1]
  const lastArtifact = lastSession
    ? context.artifacts.find(a => lastSession.artifactIds.includes(a.id))
    : context.artifacts[context.artifacts.length - 1]

  const doneTasks = (context.tasks ?? []).filter(t => t.done).length
  const totalTasks = (context.tasks ?? []).length
  const visibleTasks = (context.tasks ?? []).slice(0, 3)
  const extraTasks = totalTasks - 3

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-xl border cursor-pointer transition-all duration-150 relative overflow-hidden
        ${isSelected
          ? 'border-ds-accent/50 bg-ds-elevated ring-1 ring-ds-accent/20'
          : isActive
            ? 'border-ds-accent/30 bg-ds-elevated'
            : 'border-ds-border-light bg-ds-surface hover:border-ds-border-light/80 hover:bg-ds-elevated'
        }`}
    >
      {/* Phase color bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${meta.color.replace('text-', 'bg-')}`} />

      <div className="pl-3 pr-3 pt-2.5 pb-2">
        {/* Client + active indicator */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-mono text-ds-text-dim uppercase tracking-widest truncate">
            {space.client}
          </span>
          {isActive && (
            <span className="ml-auto flex items-center gap-1 text-[10px] font-mono text-ds-accent shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-ds-accent animate-pulse" />
              active
            </span>
          )}
        </div>

        {/* Name */}
        <p className="text-ds-text text-sm font-semibold leading-snug mb-2">{context.name}</p>

        {/* Tasks checklist */}
        {totalTasks > 0 && (
          <div className="mb-2.5 space-y-1">
            {visibleTasks.map(task => (
              <div key={task.id} className="flex items-start gap-1.5">
                <span className={`mt-0.5 w-3 h-3 rounded-sm border shrink-0 flex items-center justify-center
                  ${task.done ? 'bg-ds-accent/15 border-ds-accent/40' : 'border-ds-border-light'}`}
                >
                  {task.done && (
                    <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2 3-3" stroke="#4ADE80" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className={`text-[11px] leading-tight ${task.done ? 'text-ds-text-dim line-through' : 'text-ds-text-secondary'}`}>
                  {task.name}
                </span>
              </div>
            ))}
            {extraTasks > 0 && (
              <span className="text-[10px] text-ds-text-dim font-mono pl-4.5">+{extraTasks} more</span>
            )}
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-0.5 bg-ds-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-ds-accent/50 rounded-full transition-all"
                  style={{ width: totalTasks > 0 ? `${(doneTasks / totalTasks) * 100}%` : '0%' }}
                />
              </div>
              <span className="text-[10px] font-mono text-ds-text-dim shrink-0">
                {doneTasks}/{totalTasks}
              </span>
            </div>
          </div>
        )}

        {/* Last session */}
        {lastSession && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-ds-elevated border border-ds-border text-ds-text-dim">
              {lastSession.tool}
            </span>
            <span className="text-[10px] text-ds-text-dim">{lastSession.date}</span>
            {lastArtifact && (
              <span className="text-[10px] text-ds-text-dim truncate max-w-[100px]">↗ {lastArtifact.name}</span>
            )}
          </div>
        )}
      </div>

      {/* Hover actions */}
      {hovered && (
        <div className="border-t border-ds-border px-3 py-2 flex items-center gap-2">
          <button
            onClick={e => { e.stopPropagation(); onPushChat() }}
            className="text-[10px] font-mono text-ds-accent hover:opacity-80 transition-opacity"
          >
            <span className="font-bold">//</span> push chat
          </button>
          {!isActive && (
            <button
              onClick={e => { e.stopPropagation(); onSetActive() }}
              className="text-[10px] font-mono text-ds-text-dim hover:text-ds-text-secondary transition-colors ml-auto"
            >
              Set active →
            </button>
          )}
        </div>
      )}
    </div>
  )
}
