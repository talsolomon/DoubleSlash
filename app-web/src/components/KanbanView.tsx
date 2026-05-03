import { useState } from 'react'
import { Space, Context, Phase, PHASE_META, PHASES, apiCreateContext, apiUpdateContext } from '../types'

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

  const [dragOverPhase, setDragOverPhase] = useState<Phase | null>(null)

  async function handleCardDrop(contextId: string, targetPhase: Phase) {
    setDragOverPhase(null)
    await apiUpdateContext(contextId, { phase: targetPhase })
    onRefresh()
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex overflow-x-auto p-3 gap-0">
        {PHASES.map((phase, i) => (
          <div key={phase} className="flex items-stretch gap-0 h-full">
            <KanbanColumn
              phase={phase}
              width={widths[phase]}
              items={byPhase[phase]}
              activeContextId={activeContextId}
              selectedContextId={selectedContextId}
              spaces={spaces}
              isDragOver={dragOverPhase === phase}
              onSelect={onSelect}
              onSetActive={onSetActive}
              onPushChat={onPushChat}
              onRefresh={onRefresh}
              onDragOverPhase={() => setDragOverPhase(phase)}
              onDragLeavePhase={() => setDragOverPhase(null)}
              onDropCard={contextId => handleCardDrop(contextId, phase)}
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
  const [dragging, setDragging] = useState(false)

  return (
    <div
      draggable={false}
      className="relative shrink-0 self-stretch w-8 cursor-col-resize select-none"
      style={{ touchAction: 'none' }}
      onPointerDown={e => {
        if (e.button !== 0) return
        e.preventDefault()
        setDragging(true)
        const startX = e.clientX
        const startWidth = currentWidth

        function onMove(ev: PointerEvent) {
          ev.preventDefault()
          onResize(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startWidth + (ev.clientX - startX))))
        }
        function onUp() {
          setDragging(false)
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerup', onUp)
        }
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)
      }}
    >
      {/* vertical drag indicator */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px transition-colors duration-100
          ${dragging ? 'bg-ds-accent/80' : 'bg-ds-border-light'}`}
      />
      {/* fish */}
      <div className="absolute top-[52px] left-1/2 -translate-x-1/2 pointer-events-none">
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <path d="M3 14 Q10 7 17 14 Q10 21 3 14Z" fill="none" stroke="rgb(var(--ds-text-dim))" strokeWidth="1.2" />
          <path d="M13 14 L17 14" stroke="rgb(var(--ds-text-dim))" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

function KanbanColumn({
  phase, width, items, activeContextId, selectedContextId, spaces,
  isDragOver, onSelect, onSetActive, onPushChat, onRefresh,
  onDragOverPhase, onDragLeavePhase, onDropCard,
}: {
  phase: Phase
  width: number
  items: FlatContext[]
  activeContextId: string
  selectedContextId: string
  spaces: Space[]
  isDragOver: boolean
  onSelect: (id: string) => void
  onSetActive: (id: string) => void
  onPushChat: (id: string) => void
  onRefresh: () => void
  onDragOverPhase: () => void
  onDragLeavePhase: () => void
  onDropCard: (contextId: string) => void
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
    <div
      style={{ width }}
      className={`shrink-0 flex flex-col h-full rounded-lg transition-colors duration-100
        ${isDragOver ? 'bg-ds-accent/5 ring-1 ring-inset ring-ds-accent/20' : ''}`}
      onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; onDragOverPhase() }}
      onDragLeave={e => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onDragLeavePhase()
      }}
      onDrop={e => {
        e.preventDefault()
        const contextId = e.dataTransfer.getData('contextId')
        if (contextId) onDropCard(contextId)
      }}
    >
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
            className={`rounded-xl border border-dashed p-5 text-center cursor-pointer transition-all
              ${isDragOver ? `${meta.border} bg-ds-accent/5` : meta.border}`}
            onClick={() => setAdding(true)}
          >
            <span className="text-ds-text-dim text-xs font-mono">
              {isDragOver ? 'drop here' : 'empty'}
            </span>
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
  const nextTask = (context.tasks ?? []).find(t => !t.done)

  const doneTasks = (context.tasks ?? []).filter(t => t.done).length
  const totalTasks = (context.tasks ?? []).length
  const visibleTasks = (context.tasks ?? []).slice(0, 3)
  const extraTasks = totalTasks - 3

  return (
    <div
      draggable
      onDragStart={e => {
        e.dataTransfer.setData('contextId', context.id)
        e.dataTransfer.effectAllowed = 'move'
      }}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-xl border cursor-grab active:cursor-grabbing transition-all duration-150 relative overflow-hidden
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
                  ${task.done ? 'bg-ds-accent/15 border-ds-accent/40 text-ds-accent' : 'border-ds-border-light'}`}
                >
                  {task.done && (
                    <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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

      {/* Agent signal + hover actions */}
      {(hovered || isActive) && (
        <div className="border-t border-ds-border px-3 py-2.5">
          {lastSession && (
            <div className="mb-2">
              <p className="text-[10px] text-ds-text-dim leading-relaxed mb-1.5">
                Paused after "
                {lastSession.summary.length > 60
                  ? lastSession.summary.slice(0, 57) + '…'
                  : lastSession.summary}
                "
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {nextTask && (
                  <button
                    onClick={e => { e.stopPropagation(); onPushChat() }}
                    className="text-[10px] font-mono text-ds-accent hover:opacity-75 transition-opacity text-left"
                  >
                    → {nextTask.name.split(' ').slice(0, 6).join(' ')}
                    {nextTask.name.split(' ').length > 6 ? '…' : ''}
                  </button>
                )}
                <button
                  onClick={e => { e.stopPropagation(); onPushChat() }}
                  className="text-[10px] font-mono text-ds-text-secondary hover:text-ds-text transition-colors"
                >
                  Review summary
                </button>
                {lastArtifact && (
                  <button
                    onClick={e => { e.stopPropagation(); onPushChat() }}
                    className="text-[10px] font-mono text-ds-text-secondary hover:text-ds-text transition-colors"
                  >
                    See {lastArtifact.name}
                  </button>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 pt-1 border-t border-ds-border/40">
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
        </div>
      )}
    </div>
  )
}
