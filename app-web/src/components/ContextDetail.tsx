import { useState, useRef, useCallback } from 'react'
import { Context, Space, Phase, PHASE_META, PHASES, Task, Decision, Artifact, apiUpdateContext } from '../types'

interface Props {
  context: Context
  space: Space
  isActive: boolean
  onSetActive: () => void
  onUpdate: (patch: Partial<Context>) => void
}

export default function ContextDetail({ context, space, isActive, onSetActive, onUpdate }: Props) {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="px-5 py-4">
        {/* Title + phase */}
        <div className="flex items-start gap-2 mb-1">
          <h2 className="text-base font-bold text-ds-text flex-1 leading-snug">{context.name}</h2>
          <PhaseSelector context={context} onUpdate={onUpdate} />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-mono text-ds-text-dim">{space.client}</span>
          {isActive ? (
            <span className="flex items-center gap-1 text-[10px] font-mono text-ds-accent ml-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-ds-accent animate-pulse" />
              active
            </span>
          ) : (
            <button
              onClick={onSetActive}
              className="text-[10px] font-mono text-ds-text-dim hover:text-ds-accent transition-colors ml-auto"
            >
              Set active →
            </button>
          )}
        </div>

        <Section label="Tasks">
          <TasksList context={context} onUpdate={onUpdate} />
        </Section>

        <Section label="Brief">
          <BriefEditor context={context} onUpdate={onUpdate} />
        </Section>

        <Section label="Decisions">
          <DecisionsList context={context} onUpdate={onUpdate} />
        </Section>

        <Section label="Artifacts">
          <ArtifactsList context={context} onUpdate={onUpdate} />
        </Section>

        <Section label="Sessions">
          <SessionsList context={context} />
        </Section>
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest">{label}</span>
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
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-1 px-2 py-0.5 rounded border ${meta.border} ${meta.bg}
          text-[10px] font-mono ${meta.color} hover:opacity-80 transition-all`}
      >
        <span>{meta.icon}</span>
        <span>{meta.label}</span>
        <svg width="7" height="7" viewBox="0 0 8 8" fill="none" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M1 2.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 w-32 rounded-xl bg-ds-surface border border-ds-border-light
            shadow-2xl z-20 overflow-hidden py-1"
            style={{ boxShadow: '0 0 0 0.5px rgb(var(--ds-border-light)), 0 12px 32px rgba(0,0,0,0.4)' }}
          >
            {PHASES.map(phase => {
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

const LAUNCHERS = [
  { id: 'claude',  label: 'Claude' },
  { id: 'vscode',  label: 'VS Code' },
  { id: 'chatgpt', label: 'ChatGPT' },
  { id: 'copy',    label: 'Copy brief' },
] as const

function TasksList({ context, onUpdate }: { context: Context; onUpdate: (p: Partial<Context>) => void }) {
  const [showInput, setShowInput] = useState(false)
  const [newName, setNewName] = useState('')
  const [launcherTaskId, setLauncherTaskId] = useState<string | null>(null)
  const tasks = context.tasks ?? []

  function approveTask(id: string) {
    const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
    onUpdate({ tasks: updated })
    apiUpdateContext(context.id, { tasks: updated })
  }

  function addTask() {
    const name = newName.trim()
    if (!name) return
    const task: Task = { id: `t-${Date.now()}`, name, done: false }
    const updated = [...tasks, task]
    onUpdate({ tasks: updated })
    apiUpdateContext(context.id, { tasks: updated })
    setNewName('')
    setShowInput(false)
  }

  function launchTask(task: Task, launcherId: string) {
    const brief = [`Context: ${context.name}`, `Task: ${task.name}`, context.brief ? `\nBrief:\n${context.brief}` : '']
      .join('\n').trim()
    navigator.clipboard.writeText(brief).catch(() => {})
    if (launcherId === 'claude') window.open('https://claude.ai', '_blank')
    else if (launcherId === 'chatgpt') window.open('https://chatgpt.com', '_blank')
    else if (launcherId === 'vscode') window.open('vscode://', '_blank')
    setLauncherTaskId(null)
  }

  const doneTasks = tasks.filter(t => t.done).length

  return (
    <div className="space-y-0.5">
      {tasks.length === 0 && !showInput && (
        <p className="text-ds-text-dim text-[11px] font-mono">No briefs yet.</p>
      )}

      {tasks.map(task => (
        <div key={task.id}>
          <div className="flex items-start gap-2 py-1 group">
            <button
              onClick={() => approveTask(task.id)}
              className={`mt-0.5 w-3.5 h-3.5 rounded border shrink-0 flex items-center justify-center transition-all
                ${task.done ? 'bg-ds-accent/15 border-ds-accent/40' : 'border-ds-border-light hover:border-ds-accent/40'}`}
            >
              {task.done && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4l2 2 3-3" stroke="#4ADE80" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <button
              disabled={task.done}
              onClick={() => setLauncherTaskId(launcherTaskId === task.id ? null : task.id)}
              className={`text-sm leading-snug text-left flex-1 transition-colors
                ${task.done ? 'text-ds-text-dim line-through cursor-default' : 'text-ds-text-secondary hover:text-ds-text'}`}
            >
              {task.name}
            </button>
            {!task.done && (
              <span className="text-[10px] font-mono text-ds-text-dim opacity-0 group-hover:opacity-60 transition-opacity shrink-0 mt-0.5">
                execute →
              </span>
            )}
          </div>

          {launcherTaskId === task.id && (
            <div className="ml-5 mb-1 bg-ds-elevated border border-ds-border-light rounded-lg p-2 flex items-center gap-1.5 flex-wrap">
              {LAUNCHERS.map(l => (
                <button
                  key={l.id}
                  onClick={() => launchTask(task, l.id)}
                  className="text-[11px] font-mono px-2 py-1 rounded border border-ds-border-light
                    text-ds-text-secondary hover:text-ds-text hover:border-ds-accent/40 hover:bg-ds-accent/5 transition-all"
                >
                  {l.label}
                </button>
              ))}
              <span className="text-[10px] font-mono text-ds-text-dim ml-auto">brief copied on open</span>
            </div>
          )}
        </div>
      ))}

      {tasks.length > 0 && (
        <div className="flex items-center gap-2 pt-1">
          <div className="flex-1 h-0.5 bg-ds-border rounded-full overflow-hidden">
            <div
              className="h-full bg-ds-accent/50 rounded-full transition-all"
              style={{ width: `${(doneTasks / tasks.length) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-ds-text-dim shrink-0">{doneTasks}/{tasks.length}</span>
        </div>
      )}

      {showInput ? (
        <div className="bg-ds-elevated rounded-lg border border-ds-border-light p-2 mt-2">
          <input
            autoFocus
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') addTask()
              if (e.key === 'Escape') { setShowInput(false); setNewName('') }
            }}
            placeholder="Brief for Sol…"
            className="w-full bg-transparent text-ds-text text-sm outline-none placeholder-ds-text-dim"
          />
          <div className="flex gap-2 mt-1.5">
            <button onClick={addTask} className="text-xs font-mono text-ds-accent hover:opacity-80">Add ↵</button>
            <button onClick={() => { setShowInput(false); setNewName('') }} className="text-xs font-mono text-ds-text-dim hover:text-ds-text">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowInput(true)} className="text-[11px] font-mono text-ds-text-dim hover:text-ds-text-secondary transition-colors mt-1">
          + Add brief
        </button>
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
      timer.current = setTimeout(() => onUpdate({ brief: val }), 800)
    },
    [onUpdate]
  )

  return (
    <textarea
      value={value}
      onChange={e => handleChange(e.target.value)}
      placeholder="Write the brief that the AI always gets when you // into this context…"
      rows={4}
      className="w-full bg-ds-elevated border border-ds-border rounded-lg px-3 py-2.5
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
    onUpdate({ decisions: [...context.decisions, decision] })
    setNewText('')
    setShowInput(false)
  }

  return (
    <div className="space-y-1.5">
      {context.decisions.length === 0 && !showInput && (
        <p className="text-ds-text-dim text-[11px] font-mono">No decisions captured yet.</p>
      )}

      {context.decisions.map(d => (
        <div key={d.id} className="flex items-start gap-2.5 py-1.5 border-b border-ds-border last:border-0">
          <span className="text-[10px] font-mono text-ds-text-dim shrink-0 mt-0.5 w-16">{d.date}</span>
          <p className="text-sm text-ds-text-secondary flex-1 leading-relaxed">{d.text}</p>
        </div>
      ))}

      {showInput ? (
        <div className="bg-ds-elevated rounded-lg border border-ds-border-light p-2.5">
          <textarea
            autoFocus
            value={newText}
            onChange={e => setNewText(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addDecision() }
              if (e.key === 'Escape') { setShowInput(false); setNewText('') }
            }}
            placeholder="What was decided?"
            rows={2}
            className="w-full bg-transparent text-ds-text text-sm outline-none resize-none placeholder-ds-text-dim"
          />
          <div className="flex gap-2 mt-1.5">
            <button onClick={addDecision} className="text-xs font-mono text-ds-accent hover:opacity-80">Capture ↵</button>
            <button onClick={() => { setShowInput(false); setNewText('') }} className="text-xs font-mono text-ds-text-dim hover:text-ds-text">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowInput(true)} className="text-[11px] font-mono text-ds-text-dim hover:text-ds-text-secondary transition-colors mt-1">
          + Capture decision
        </button>
      )}
    </div>
  )
}

const ARTIFACT_ICONS: Record<Artifact['type'], string> = { file: '◻', link: '⌁', note: '≡' }

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
    onUpdate({ artifacts: [...context.artifacts, artifact] })
    setNewName('')
    setShowInput(false)
  }

  function toggleStatus(id: string) {
    const artifacts = context.artifacts.map(a =>
      a.id === id ? { ...a, status: (a.status === 'shipped' ? 'in-flight' : 'shipped') as Artifact['status'] } : a
    )
    onUpdate({ artifacts })
  }

  return (
    <div className="space-y-1">
      {context.artifacts.length === 0 && !showInput && (
        <p className="text-ds-text-dim text-[11px] font-mono">No artifacts yet.</p>
      )}

      {context.artifacts.map(a => (
        <div key={a.id} className="flex items-center gap-2 py-1.5 border-b border-ds-border last:border-0">
          <span className="text-ds-text-dim text-sm shrink-0">{ARTIFACT_ICONS[a.type]}</span>
          <span className="text-sm text-ds-text flex-1 truncate">{a.name}</span>
          <button
            onClick={() => toggleStatus(a.id)}
            className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border transition-all shrink-0
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
        <div className="bg-ds-elevated rounded-lg border border-ds-border-light p-2.5 mt-1">
          <div className="flex items-center gap-2 mb-2">
            <input
              autoFocus
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') addArtifact()
                if (e.key === 'Escape') { setShowInput(false); setNewName('') }
              }}
              placeholder="Artifact name…"
              className="flex-1 bg-transparent text-ds-text text-sm outline-none placeholder-ds-text-dim"
            />
            <div className="flex gap-1 shrink-0">
              {(['file', 'link', 'note'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setNewType(t)}
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded border transition-all
                    ${newType === t ? 'text-ds-accent border-ds-accent/30 bg-ds-accent/10' : 'text-ds-text-dim border-ds-border'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addArtifact} className="text-xs font-mono text-ds-accent hover:opacity-80">Add ↵</button>
            <button onClick={() => { setShowInput(false); setNewName('') }} className="text-xs font-mono text-ds-text-dim hover:text-ds-text">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowInput(true)} className="text-[11px] font-mono text-ds-text-dim hover:text-ds-text-secondary transition-colors mt-1">
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
      <p className="text-ds-text-dim text-[11px] font-mono">
        No sessions yet. Press <span className="text-ds-accent">//</span> in any AI tool to start one.
      </p>
    )
  }

  return (
    <div className="space-y-1">
      {sorted.map((session, i) => (
        <div key={session.id} className="flex items-start gap-3 py-2 border-b border-ds-border last:border-0">
          <span className="text-[10px] font-mono text-ds-text-dim shrink-0 mt-0.5">
            #{sorted.length - i}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-ds-text-dim px-1.5 py-0.5 rounded bg-ds-elevated border border-ds-border">
                {session.tool}
              </span>
              <span className="text-[10px] text-ds-text-dim">{session.date}</span>
              {session.artifactIds.length > 0 && (
                <span className="text-[10px] font-mono text-ds-accent/70">
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
