import { useState } from 'react'
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

  return (
    <div className="h-full flex flex-col">
      {/* Kanban columns */}
      <div className="flex-1 flex overflow-x-auto p-4 gap-0">
        {PHASES.map((phase, i) => (
          <div key={phase} className="flex items-start gap-0">
            <KanbanColumn
              phase={phase}
              items={byPhase[phase]}
              activeContextId={activeContextId}
              spaces={spaces}
              onSelect={onSelect}
              onSetActive={onSetActive}
              onRefresh={onRefresh}
            />
            {i < PHASES.length - 1 && <FishConnector />}
          </div>
        ))}
      </div>
    </div>
  )
}

function FishConnector() {
  return (
    <div className="flex items-start pt-[52px] shrink-0 px-1">
      <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
        <path
          d="M3 14 Q10 7 17 14 Q10 21 3 14Z"
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="1.2"
        />
        <path d="M13 14 L17 14" stroke="#2a2a2a" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function KanbanColumn({
  phase,
  items,
  activeContextId,
  spaces,
  onSelect,
  onSetActive,
  onRefresh
}: {
  phase: Phase
  items: FlatContext[]
  activeContextId: string
  spaces: Space[]
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
    <div className="w-[260px] shrink-0 flex flex-col">
      {/* Column header */}
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

      {/* Cards */}
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

        {/* Empty drop zone */}
        {items.length === 0 && !adding && (
          <div
            className={`rounded-xl border border-dashed ${meta.border} p-5 text-center cursor-pointer
              hover:border-opacity-60 transition-all`}
            onClick={() => setAdding(true)}
          >
            <span className="text-ds-text-dim text-xs">empty</span>
          </div>
        )}

        {/* New context inline form */}
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
              <button
                onClick={handleAdd}
                className="text-xs font-mono text-ds-accent hover:text-ds-text transition-colors"
              >
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
  context,
  space,
  isActive,
  onSelect,
  onSetActive
}: {
  context: Context
  space: Space
  isActive: boolean
  onSelect: () => void
  onSetActive: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const lastSession = context.sessions[context.sessions.length - 1]
  const meta = PHASE_META[context.phase]

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-xl border cursor-pointer transition-all duration-150 relative overflow-hidden
        ${isActive
          ? `border-ds-accent/40 bg-ds-elevated`
          : `border-ds-border-light bg-ds-surface hover:border-ds-border-light/80 hover:bg-ds-elevated`
        }`}
    >
      {/* Phase accent line */}
      <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${meta.color.replace('text-', 'bg-')}`} />

      <div className="pl-3 pr-3 pt-3 pb-2.5">
        {/* Project + active indicator */}
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

        {/* Brief excerpt */}
        {context.brief && (
          <p className="text-ds-text-dim text-xs leading-relaxed line-clamp-2 mb-2.5">
            {context.brief}
          </p>
        )}

        {/* Stats row */}
        <div className="flex items-center gap-3 text-[10px] font-mono text-ds-text-dim">
          {context.sessions.length > 0 && (
            <span>{context.sessions.length} session{context.sessions.length !== 1 ? 's' : ''}</span>
          )}
          {context.artifacts.length > 0 && (
            <span>{context.artifacts.length} artifact{context.artifacts.length !== 1 ? 's' : ''}</span>
          )}
          {context.decisions.length > 0 && (
            <span>{context.decisions.length} decision{context.decisions.length !== 1 ? 's' : ''}</span>
          )}
          {lastSession && (
            <span className="ml-auto">{lastSession.date}</span>
          )}
        </div>
      </div>

      {/* Set active hover action */}
      {hovered && !isActive && (
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
