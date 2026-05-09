import { Phase } from '../types'
import { Agent, AgentTier, AGENTS_BY_TIER, PHASE_OPERATOR } from '../data/agents'

// ── Tier label ────────────────────────────────────────────────────────────────

const TIER_META: Record<AgentTier, { label: string; sub: string; accent: string }> = {
  0: { label: 'Orchestrators', sub: 'board-level intelligence',        accent: 'text-purple-400'  },
  1: { label: 'Sync',          sub: 'session bridge & pattern watch',  accent: 'text-cyan-400'    },
  2: { label: 'Operators',     sub: 'FLOW phase workers',              accent: 'text-ds-accent'   },
}

const PHASE_COLOR: Record<Phase, string> = {
  explore:  'bg-ds-explore/10  text-ds-explore  border-ds-explore/20',
  solidify: 'bg-ds-solidify/10 text-ds-solidify border-ds-solidify/20',
  build:    'bg-ds-build/10    text-ds-build    border-ds-build/20',
  ship:     'bg-ds-ship/10     text-ds-ship     border-ds-ship/20',
}

const MODEL_COLOR: Record<string, string> = {
  haiku:  'text-ds-text-dim  bg-ds-surface border-ds-border',
  sonnet: 'text-ds-accent/80 bg-ds-accent/5 border-ds-accent/20',
}

// ── AgentCard ─────────────────────────────────────────────────────────────────

function AgentCard({ agent, activePhase }: { agent: Agent; activePhase?: Phase }) {
  const isPhaseActive = agent.phases?.includes(activePhase as Phase)

  return (
    <div className={`flex flex-col gap-2 p-3 rounded-xl border transition-all
      ${isPhaseActive
        ? 'border-ds-accent/40 bg-ds-accent/5'
        : 'border-ds-border bg-ds-elevated hover:border-ds-border/80'}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base shrink-0 leading-none">{agent.icon}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-ds-text">{agent.name}</span>
              {isPhaseActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-ds-accent shrink-0 animate-pulse" />
              )}
            </div>
            <p className="text-[9px] font-mono text-ds-text-dim leading-tight truncate">{agent.tagline}</p>
          </div>
        </div>
        <span className={`shrink-0 text-[8px] font-mono px-1.5 py-0.5 rounded border ${MODEL_COLOR[agent.model]}`}>
          {agent.model}
        </span>
      </div>

      {/* Phase tags (operators only) */}
      {agent.phases && (
        <div className="flex gap-1 flex-wrap">
          {agent.phases.map(p => (
            <span key={p} className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${PHASE_COLOR[p]}`}>
              {p}
            </span>
          ))}
        </div>
      )}

      {/* Capabilities */}
      <div className="flex gap-1 flex-wrap">
        {agent.capabilities.map(cap => (
          <span
            key={cap.code}
            title={cap.label}
            className="text-[8px] font-mono px-1 py-0.5 rounded bg-ds-surface border border-ds-border text-ds-text-dim"
          >
            {cap.code}
          </span>
        ))}
      </div>

      {/* Invocation */}
      <div className="flex items-center justify-between mt-0.5">
        <code className="text-[9px] font-mono text-ds-accent/60">{agent.invocation}</code>
      </div>
    </div>
  )
}

// ── TierRow ───────────────────────────────────────────────────────────────────

function TierRow({ tier, activePhase }: { tier: AgentTier; activePhase?: Phase }) {
  const agents = AGENTS_BY_TIER[tier]
  const meta = TIER_META[tier]

  return (
    <div className="mb-5">
      <div className="flex items-baseline gap-2 mb-2 px-1">
        <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${meta.accent}`}>
          T{tier} — {meta.label}
        </span>
        <span className="text-[8px] font-mono text-ds-text-dim">{meta.sub}</span>
      </div>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${agents.length}, 1fr)` }}>
        {agents.map(a => (
          <AgentCard key={a.id} agent={a} activePhase={activePhase} />
        ))}
      </div>
    </div>
  )
}

// ── ActiveOperatorBanner ──────────────────────────────────────────────────────

function ActiveOperatorBanner({ phase }: { phase: Phase }) {
  const op = PHASE_OPERATOR[phase]
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-ds-accent/20 bg-ds-accent/5 mb-4">
      <span className="text-sm">{op.icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-mono font-bold text-ds-accent">{op.name} is active</p>
        <p className="text-[9px] font-mono text-ds-text-dim truncate">
          Active context is in <span className="text-ds-text">{phase}</span> phase — invoke with <code>{op.invocation}</code>
        </p>
      </div>
      <span className="w-1.5 h-1.5 rounded-full bg-ds-accent shrink-0 animate-pulse" />
    </div>
  )
}

// ── FLOW strip ────────────────────────────────────────────────────────────────

const FLOW_PHASES: { phase: Phase; label: string; icon: string }[] = [
  { phase: 'explore',  label: 'Explore',  icon: '◎' },
  { phase: 'solidify', label: 'Solidify', icon: '◈' },
  { phase: 'build',    label: 'Build',    icon: '◉' },
  { phase: 'ship',     label: 'Ship',     icon: '▶' },
]

function FlowStrip({ activePhase }: { activePhase?: Phase }) {
  return (
    <div className="flex items-center gap-1 mb-4">
      {FLOW_PHASES.map((f, i) => {
        const isActive = f.phase === activePhase
        const isPast = activePhase
          ? FLOW_PHASES.findIndex(x => x.phase === activePhase) > i
          : false
        return (
          <div key={f.phase} className="flex items-center gap-1 flex-1">
            <div className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded text-[9px] font-mono transition-all
              ${isActive ? `${PHASE_COLOR[f.phase]} font-bold` : isPast ? 'text-ds-text-dim/50 border border-ds-border/30' : 'text-ds-text-dim border border-ds-border'}`}
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </div>
            {i < FLOW_PHASES.length - 1 && (
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-ds-border shrink-0">
                <path d="M2 4h4M4.5 2l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── AgentsView ────────────────────────────────────────────────────────────────

interface Props {
  activePhase?: Phase
}

export default function AgentsView({ activePhase }: Props) {
  return (
    <div className="h-full overflow-y-auto p-4">

      {/* FLOW pipeline strip */}
      <FlowStrip activePhase={activePhase} />

      {/* Active operator banner */}
      {activePhase && <ActiveOperatorBanner phase={activePhase} />}

      {/* Tier rows */}
      <TierRow tier={0} activePhase={activePhase} />
      <TierRow tier={1} activePhase={activePhase} />
      <TierRow tier={2} activePhase={activePhase} />

      {/* Coordination note */}
      <div className="mt-2 px-3 py-2.5 rounded-lg border border-ds-border bg-ds-elevated">
        <p className="text-[9px] font-mono text-ds-text-dim leading-relaxed">
          <span className="text-ds-text">Apex</span> routes every HO through{' '}
          <span className="text-ds-text">Guard</span> before emit.{' '}
          <span className="text-ds-text">Echo</span> captures sessions.{' '}
          <span className="text-ds-text">Prism</span> surfaces cross-context patterns.
          Opus is forbidden — Sonnet is the ceiling.
        </p>
      </div>
    </div>
  )
}
