import { useState, useRef, useCallback } from 'react'
import { Context, Space, Phase, PHASE_META, PHASES, Decision, Artifact } from '../types'

interface Props {
  context: Context
  space: Space
  isActive: boolean
  onBack: () => void
  onSetActive: () => void
  onUpdate: (patch: Partial<Context>) => void
}

export default function ContextDetail({ context, space, isActive, onBack, onSetActive, onUpdate }: Props) {
  return (
    <div className="h-full flex flex-col">
      {/* Sticky header */}
      <header className="shrink-0 flex items-center gap-3 px-5 py-3 border-b border-ds-border">
        <button
          onClick={onBack}
          className="text-ds-text-dim hover:text-ds-text text-sm font-mono transition-colors flex items-center gap-1.5"
        >
          ← Kanban
        </button>
        <span className="text-ds-border-light text-xs">/</span>
        <span className="text-xs font-mono text-ds-text-dim truncate">{space.client}</span>
        <div className="ml-auto">
          {isActive ? (
            <span className="flex items-center gap-1.5 text-xs font-mono text-ds-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-ds-accent animate-pulse" />
              active context
            </span>
          ) : (
            <button
              onClick={onSetActive}
              className="text-xs font-mono text-ds-text-secondary hover:text-ds-accent transition-colors"
            >
              Set as active →
            </button>
          )}
        </div>
      </header>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6 max-w-2xl">
          {/* Title + phase */}
          <div className="flex items-start gap-3 mb-6">
            <h1 className="text-2xl font-bold text-ds-text flex-1 leading-tight">{context.name}</h1>
            <PhaseSelector context={context} onUpdate={onUpdate} />
          </div>

          {/* Brief */}
          <Section id="brief" label="Brief">
            <BriefEditor context={context} onUpdate={onUpdate} />
          </Section>

          {/* Decisions */}
          <Section id="decisions" label="Decisions">
            <DecisionsList context={context} onUpdate={onUpdate} />
          </Section>

          {/* Artifacts */}
          <Section id="artifacts" label="Artifacts">
            <ArtifactsList context={context} onUpdate={onUpdate} />
          </Section>

          {/* Sessions */}
          <Section id="sessions" label="Sessions">
            <SessionsList context={context} />
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] font-mono text-ds-text-dim uppercase tracking-widest">{label}</span>
        <div className="flex-1 h-px bg-ds-border" />
      </div>
      {children}
    </div>
  )
}

function PhaseSelector({ context, onUpdate }: { context: Context; onUpdate: (p: Partial<Context>) => void }) {
  const [open, setOpen] = useState(false)
  const meta = PHASE_META[context.phase]

  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${meta.border} ${meta.bg}
          text-xs font-mono ${meta.color} hover:opacity-80 transition-all`}
      >
        <span>{meta.icon}</span>
        <span>{meta.label}</span>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M1 2.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 w-36 rounded-xl bg-ds-surface border border-ds-border-light
            shadow-2xl z-20 overflow-hidden py-1"
            style={{ boxShadow: '0 0 0 0.5px #333, 0 12px 32px rgba(0,0,0,0.85)' }}
          >
            {PHASES.map((phase) => {
              const m = PHASE_META[phase]
              return (
                <button
                  key={phase}
                  onClick={() => { onUpdate({ phase }); setOpen(false) }}
                  className={`w-full text-left px-3 py-2 text-xs font-mono flex items-center gap-2
                    transition-all hover:bg-ds-elevated
                    ${phase === context.phase ? `${m.color} bg-ds-elevated` : 'text-ds-text-secondary'}`}
                >
                  <span>{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

function BriefEditor({ context, onUpdate }: { context: Context; onUpdate: (p: Partial<Context>) => void }) {
  const [value, setValue] = useState(context.brief)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const handleChange = useCallback(
    (val: string) => {
      setValue(val)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        onUpdate({ brief: val })
      }, 800)
    },
    [onUpdate]
  )

  return (
    <textarea
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Write the brief that the AI always gets when you // into this context…"
      rows={5}
      className="w-full bg-ds-elevated border border-ds-border rounded-xl px-4 py-3
        text-ds-text text-sm leading-relaxed outline-none resize-none
        placeholder-ds-text-dim focus:border-ds-border-light transition-colors"
    />
  )
}

function DecisionsList({ context, onUpdate }: { context: Context; onUpdate: (p: Partial<Context>) => void }) {
  const [showInput, setShowInput] = useState(false)
  const [newText, setNewText] = useState('')

  function addDecision() {
    const text = newText.trim()
    if (!text) return
    const decision: Decision = {
      id: `d-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      text
    }
    const decisions = [...context.decisions, decision]
    onUpdate({ decisions })
    setNewText('')
    setShowInput(false)
  }

  return (
    <div className="space-y-2">
      {context.decisions.length === 0 && !showInput && (
        <p className="text-ds-text-dim text-xs font-mono">No decisions captured yet.</p>
      )}

      {context.decisions.map((d) => (
        <div key={d.id} className="flex items-start gap-3 py-2 border-b border-ds-border last:border-0">
          <span className="text-[10px] font-mono text-ds-text-dim shrink-0 mt-0.5 w-20">{d.date}</span>
          <p className="text-sm text-ds-text-secondary flex-1 leading-relaxed">{d.text}</p>
        </div>
      ))}

      {showInput ? (
        <div className="bg-ds-elevated rounded-xl border border-ds-border-light p-3">
          <textarea
            autoFocus
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addDecision() }
              if (e.key === 'Escape') { setShowInput(false); setNewText('') }
            }}
            placeholder="What was decided?"
            rows={2}
            className="w-full bg-transparent text-ds-text text-sm outline-none resize-none
              placeholder-ds-text-dim leading-relaxed"
          />
          <div className="flex gap-3 mt-2">
            <button onClick={addDecision} className="text-xs font-mono text-ds-accent hover:opacity-80 transition-opacity">
              Capture ↵
            </button>
            <button
              onClick={() => { setShowInput(false); setNewText('') }}
              className="text-xs font-mono text-ds-text-dim hover:text-ds-text transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="text-xs font-mono text-ds-text-dim hover:text-ds-text-secondary transition-colors mt-1"
        >
          + Capture decision
        </button>
      )}
    </div>
  )
}

const ARTIFACT_ICONS: Record<Artifact['type'], string> = {
  file: '◻',
  link: '⌁',
  note: '≡'
}

function ArtifactsList({ context, onUpdate }: { context: Context; onUpdate: (p: Partial<Context>) => void }) {
  const [showInput, setShowInput] = useState(false)
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState<Artifact['type']>('file')

  function addArtifact() {
    const name = newName.trim()
    if (!name) return
    const artifact: Artifact = {
      id: `a-${Date.now()}`,
      name,
      type: newType,
      status: 'in-flight'
    }
    const artifacts = [...context.artifacts, artifact]
    onUpdate({ artifacts })
    setNewName('')
    setShowInput(false)
  }

  function toggleStatus(id: string) {
    const artifacts = context.artifacts.map((a) =>
      a.id === id ? { ...a, status: (a.status === 'shipped' ? 'in-flight' : 'shipped') as Artifact['status'] } : a
    )
    onUpdate({ artifacts })
  }

  return (
    <div className="space-y-1.5">
      {context.artifacts.length === 0 && !showInput && (
        <p className="text-ds-text-dim text-xs font-mono">No artifacts yet.</p>
      )}

      {context.artifacts.map((a) => (
        <div key={a.id} className="flex items-center gap-3 py-2 border-b border-ds-border last:border-0">
          <span className="text-ds-text-dim text-sm shrink-0">{ARTIFACT_ICONS[a.type]}</span>
          <span className="text-sm text-ds-text flex-1 truncate">{a.name}</span>
          <button
            onClick={() => toggleStatus(a.id)}
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-all shrink-0
              ${a.status === 'shipped'
                ? 'text-ds-ship border-ds-ship/30 bg-ds-ship/10'
                : 'text-ds-text-dim border-ds-border hover:border-ds-border-light'
              }`}
          >
            {a.status}
          </button>
        </div>
      ))}

      {showInput ? (
        <div className="bg-ds-elevated rounded-xl border border-ds-border-light p-3">
          <div className="flex items-center gap-2 mb-2">
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addArtifact()
                if (e.key === 'Escape') { setShowInput(false); setNewName('') }
              }}
              placeholder="Artifact name…"
              className="flex-1 bg-transparent text-ds-text text-sm outline-none placeholder-ds-text-dim"
            />
            <div className="flex gap-1 shrink-0">
              {(['file', 'link', 'note'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setNewType(t)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all
                    ${newType === t ? 'text-ds-accent border-ds-accent/30 bg-ds-accent/10' : 'text-ds-text-dim border-ds-border'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={addArtifact} className="text-xs font-mono text-ds-accent hover:opacity-80 transition-opacity">
              Add ↵
            </button>
            <button
              onClick={() => { setShowInput(false); setNewName('') }}
              className="text-xs font-mono text-ds-text-dim hover:text-ds-text transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="text-xs font-mono text-ds-text-dim hover:text-ds-text-secondary transition-colors mt-1"
        >
          + Add artifact
        </button>
      )}
    </div>
  )
}

function SessionsList({ context }: { context: Context }) {
  const sorted = [...context.sessions].reverse()

  if (sorted.length === 0) {
    return (
      <p className="text-ds-text-dim text-xs font-mono">
        No sessions yet. Press <span className="text-ds-accent">//</span> in any AI tool to start one.
      </p>
    )
  }

  return (
    <div className="space-y-1">
      {sorted.map((session, i) => (
        <div key={session.id} className="flex items-start gap-4 py-3 border-b border-ds-border last:border-0">
          <span className="text-[10px] font-mono text-ds-text-dim shrink-0 mt-0.5">
            #{sorted.length - i}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-ds-text-secondary">{session.date}</span>
              <span className="text-[10px] font-mono text-ds-text-dim px-1.5 py-0.5 rounded bg-ds-elevated border border-ds-border">
                {session.tool}
              </span>
              {session.artifactIds.length > 0 && (
                <span className="text-[10px] font-mono text-ds-text-dim">
                  {session.artifactIds.length} artifact{session.artifactIds.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <p className="text-sm text-ds-text-secondary leading-relaxed">{session.summary}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
