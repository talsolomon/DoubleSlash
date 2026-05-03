import { useState, useRef } from 'react'
import { Space, Context, Phase, PHASE_META, PHASES } from '../types'

interface Props {
  spaces: Space[]
  activeContextId: string
  onSelect: (contextId: string) => void
  onSetActive: (contextId: string) => void
  onRefresh: () => void
}

interface FlatContext {
  context: Context
  space: Space
}

const MIN_WIDTH = 200
const MAX_WIDTH = 520

export default function KanbanView({ spaces, activeContextId, onSelect, onSetActive, onRefresh }: Props) {
  const flat: FlatContext[] = spaces.flatMap((space) =>
    space.contexts.map((context) => ({ context, space }))
  )
  const byPhase = PHASES.reduce(
    (acc, phase) => {
      acc[phase] = flat.filter((fc) => fc.context.phase === phase)
      return acc
    },
    {} as Record<Phase, FlatContext[]>
  )

  const [widths, setWidths] = useState<Record<Phase, number>>({
    explore: 260, solidify: 260, build: 260, ship: 260,
  })

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex overflow-x-auto p-4 gap-0">
        {PHASES.map((phase, i) => (
          <div key={phase} className="flex items-start gap-0">
            <KanbanColumn
              phase={phase}
              items={byPhase[phase]}
              activeContextId={activeContextId}
              spaces={spaces}
              width={widths[phase]}
              onSelect={onSelect}
              onSetActive={onSetActive}
              onRefresh={onRefresh}
            />
            {i < PHASES.length - 1 && (
              <ResizeHandle
                currentWidth={widths[phase]}
                onResize={newWidth => setWidths(prev => ({ ...prev, [phase]: newWidth }))}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ResizeHandle({ currentWidth, onResize }: {
  currentWidth: number
  onResize: (newWidth: number) => void
}) {
  const dragRef = useRef<{ startX: number; startWidth: number } | null>(null)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="w-6 shrink-0 self-stretch cursor-col-resize relative flex items-center justify-center select-none touch-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPointerDown={e => {
        e.preventDefault()
        e.currentTarget.setPointerCapture(e.pointerId)
        dragRef.current = { startX: e.clientX, startWidth: currentWidth }
      }}
      onPointerMove={e => {
        if (!dragRef.current) return
        const delta = e.clientX - dragRef.current.startX
        onResize(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, dragRef.current.startWidth + delta)))
      }}
      onPointerUp={() => { dragRef.current = null }}
    >
      <div
        className={`absolute inset-y-4 w-px bg-ds-border-light transition-opacity duration-150
          ${hovered ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="flex items-start pt-[52px] shrink-0 absolute">
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
          <path d="M3 14 Q10 7 17 14 Q10 21 3 14Z" fill="none" stroke="#888888" strokeWidth="1.2" />
          <path d="M13 14 L17 14" stroke="#888888" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

function KanbanColumn({
  phase, items, activeContextId, spaces, width, onSelect, onSetActive, onRefresh
}: {
  phase: Phase
  items: FlatContext[]
  activeContextId: string
  spaces: Space[]
  width: number
  onSelect: (id: string) => void
  onSetActive: (id: string) => void
  onRefresh: () => void
}) {
  const meta = PHASE_META[phase]
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')

  async function handleAdd() {
    const name = newName.trim()
    if (!name || !spaces[0]) return
    await window.ds.createContext(spaces[0].id, name, phase)
    setNewName('')
    setAdding(false)
    onRefresh()
  }

  return (
    <div className="shrink-0 flex flex-col" style={{ width }}>
      <div className="flex items-center gap-2 px-3 py-3 mb-2">
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
            onSelect={() => onSelect(context.id)}
            onSetActive={() => onSetActive(context.id)}
          />
        ))}

        {items.length === 0 && !adding && (
          <div
            className={`rounded-xl border border-dashed ${meta.border} p-5 text-center cursor-pointer
              hover:border-opacity-60 transition-all`}
            onClick={() => setAdding(true)}
          >
            <span className="text-ds-text-dim text-xs">empty</span>
          </div>
        )}

        {adding ? (
          <div className={`rounded-xl border ${meta.border} bg-ds-elevated p-3`}>
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAdd()
                if (e.key === 'Escape') { setAdding(false); setNewName('') }
              }}
              placeholder="Context name…"
              className="w-full bg-transparent text-ds-text text-sm outline-none placeholder-ds-text-dim"
            />
            <div className="flex gap-2 mt-2.5">
              <button onClick={handleAdd} className="text-xs font-mono text-ds-accent hover:text-ds-text transition-colors">
                Add ↵
              </button>
              <button
                onClick={() => { setAdding(false); setNewName('') }}
                className="text-xs font-mono text-ds-text-dim hover:text-ds-text transition-colors"
              >
                Cancel
              </button>
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

function ContextCard({
  context, space, isActive, onSelect, onSetActive,
}: {
  context: Context
  space: Space
  isActive: boolean
  onSelect: () => void
  onSetActive: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const meta = PHASE_META[context.phase]

  const tasks = context.tasks ?? []
  const doneTasks = tasks.filter((t) => t.done).length
  const visibleTasks = tasks.slice(0, 3)
  const hiddenCount = Math.max(0, tasks.length - 3)

  const lastSession = context.sessions[context.sessions.length - 1]
  const lastArtifact = context.artifacts[context.artifacts.length - 1]
  const nextTask = tasks.find((t) => !t.done)

  const showSignal = (isActive || hovered) && !!lastSession

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-xl border cursor-pointer transition-all duration-150 relative overflow-hidden
        ${isActive
          ? 'border-ds-accent/40 bg-ds-elevated'
          : 'border-ds-border-light bg-ds-surface hover:border-ds-border-light/80 hover:bg-ds-elevated'
        }`}
    >
      {/* Phase accent line */}
      <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${meta.color.replace('text-', 'bg-')}`} />

      <div className="pl-3 pr-3 pt-3 pb-2.5">
        {/* Client + active indicator */}
        <div className="flex items-center gap-1.5 mb-1.5">
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

        {/* Context name */}
        <p className="text-ds-text text-sm font-semibold leading-snug mb-2">{context.name}</p>

        {/* Task list */}
        {tasks.length > 0 && (
          <div className="space-y-1 mb-2.5">
            {visibleTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-2">
                <div
                  className={`shrink-0 mt-0.5 w-3.5 h-3.5 rounded border flex items-center justify-center
                    ${task.done ? 'bg-ds-accent/20 border-ds-accent/30' : 'border-ds-border'}`}
                >
                  {task.done && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className="text-ds-accent">
                      <path d="M1.5 4l2 2 3-3" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-[11px] leading-relaxed
                    ${task.done ? 'line-through text-ds-text-dim' : 'text-ds-text-secondary'}`}
                >
                  {task.name}
                </span>
              </div>
            ))}
            {hiddenCount > 0 && (
              <span className="text-[10px] font-mono text-ds-text-dim pl-5">+{hiddenCount} more</span>
            )}
          </div>
        )}

        {/* Progress bar */}
        {tasks.length > 0 && (
          <div className="h-[3px] bg-ds-border rounded-full overflow-hidden mb-2.5">
            <div
              className="h-full bg-ds-accent/60 rounded-full transition-all duration-300"
              style={{ width: `${(doneTasks / tasks.length) * 100}%` }}
            />
          </div>
        )}

        {/* Footer: tool · date · artifact · count */}
        {lastSession && (
          <div className="flex items-center gap-2 text-[10px] font-mono text-ds-text-dim">
            <span className="shrink-0">{lastSession.tool}</span>
            <span className="shrink-0">{lastSession.date}</span>
            {lastArtifact && (
              <>
                <span>↗</span>
                <span className="truncate">{lastArtifact.name}</span>
              </>
            )}
            {tasks.length > 0 && (
              <span className="ml-auto shrink-0">{doneTasks}/{tasks.length}</span>
            )}
          </div>
        )}
      </div>

      {/* Agent signal — always for active, hover for others */}
      {showSignal && (
        <div className="border-t border-ds-border px-3 py-2.5">
          <p className="text-[10px] text-ds-text-dim leading-relaxed mb-2">
            Paused after "
            {lastSession.summary.length > 64
              ? lastSession.summary.slice(0, 61) + '…'
              : lastSession.summary}
            "
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {nextTask && (
              <button
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] font-mono text-ds-accent hover:opacity-75 transition-opacity text-left"
              >
                → {nextTask.name.split(' ').slice(0, 6).join(' ')}
                {nextTask.name.split(' ').length > 6 ? '…' : ''}
              </button>
            )}
            <button
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] font-mono text-ds-text-secondary hover:text-ds-text transition-colors"
            >
              Review summary
            </button>
            {lastArtifact && (
              <button
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] font-mono text-ds-text-secondary hover:text-ds-text transition-colors"
              >
                See {lastArtifact.name}
              </button>
            )}
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

      {/* Set active — only when hovered, no session, not active */}
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
