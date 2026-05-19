import { Phase } from '../types'

export type AgentTier = 0 | 1 | 2
export type AgentStatus = 'idle' | 'active' | 'scanning' | 'syncing' | 'blocked'
export type AgentModel = 'haiku' | 'sonnet'

export interface AgentCapability {
  code: string
  label: string
  model: AgentModel
}

export interface Agent {
  id: string
  name: string
  icon: string
  tier: AgentTier
  type: 'orchestrator' | 'sync' | 'operator'
  tagline: string
  invocation: string
  model: AgentModel
  capabilities: AgentCapability[]
  phases?: Phase[]
  status?: AgentStatus
}

export const AGENTS: Agent[] = [
  // ── Tier 0: Orchestrators ────────────────────────────────────────────────────
  {
    id: 'apex',
    name: 'Apex',
    icon: '🔺',
    tier: 0,
    type: 'orchestrator',
    tagline: 'Chief Orchestrator — board, priority queue, context collapse',
    invocation: '//apex',
    model: 'sonnet',
    capabilities: [
      { code: 'CA', label: 'Context Audit',      model: 'haiku'  },
      { code: 'SC', label: 'Solidify Contexts',  model: 'sonnet' },
      { code: 'AD', label: 'Agent Dispatch',     model: 'haiku'  },
      { code: 'HR', label: 'Health Report',      model: 'sonnet' },
      { code: 'PQ', label: 'Priority Queue',     model: 'sonnet' },
      { code: 'LS', label: 'Lessons Sync',       model: 'sonnet' },
    ],
  },
  {
    id: 'guard',
    name: 'Guard',
    icon: '◆',
    tier: 0,
    type: 'orchestrator',
    tagline: 'Privacy Warden — scans every handoff, blocks on CRITICAL',
    invocation: '//guard',
    model: 'sonnet',
    capabilities: [
      { code: 'HS', label: 'Handoff Scan',    model: 'sonnet' },
      { code: 'SA', label: 'Session Audit',   model: 'sonnet' },
      { code: 'ID', label: 'Inject Detect',   model: 'haiku'  },
      { code: 'DC', label: 'Data Classify',   model: 'haiku'  },
      { code: 'RD', label: 'Redact',          model: 'haiku'  },
      { code: 'PR', label: 'Privacy Report',  model: 'sonnet' },
    ],
  },

  // ── Tier 1: Sync ─────────────────────────────────────────────────────────────
  {
    id: 'echo',
    name: 'Echo',
    icon: '⟳',
    tier: 1,
    type: 'sync',
    tagline: 'Session Bridge — captures, diffs, syncs sessions to .flow/',
    invocation: '//echo',
    model: 'haiku',
    capabilities: [
      { code: 'SC', label: 'Session Capture', model: 'haiku'  },
      { code: 'CP', label: 'Context Push',    model: 'haiku'  },
      { code: 'DD', label: 'Drift Detect',    model: 'haiku'  },
      { code: 'SI', label: 'Session Index',   model: 'haiku'  },
      { code: 'CR', label: 'Context Restore', model: 'haiku'  },
      { code: 'SH', label: 'Session Hash',    model: 'haiku'  },
    ],
  },
  {
    id: 'prism',
    name: 'Prism',
    icon: '◈',
    tier: 1,
    type: 'sync',
    tagline: 'Pattern Watcher — detects cross-context signals, builds knowledge graph',
    invocation: '//prism',
    model: 'haiku',
    capabilities: [
      { code: 'SM', label: 'Signal Match',    model: 'haiku'  },
      { code: 'CL', label: 'Cluster',         model: 'sonnet' },
      { code: 'DD', label: 'Drift Detect',    model: 'haiku'  },
      { code: 'OR', label: 'Orphan Rescue',   model: 'haiku'  },
      { code: 'PS', label: 'Pattern Surfacer',model: 'sonnet' },
      { code: 'GR', label: 'Graph Report',    model: 'sonnet' },
    ],
  },

  // ── Tier 2: Operators ─────────────────────────────────────────────────────────
  {
    id: 'dora',
    name: 'Dora',
    icon: '◎',
    tier: 2,
    type: 'operator',
    tagline: 'Explorer — research, HMW, JTBD, premortems',
    invocation: '//explore',
    model: 'sonnet',
    phases: ['explore'],
    capabilities: [
      { code: 'HMW', label: 'How Might We',     model: 'sonnet' },
      { code: 'PM',  label: 'Premortem',         model: 'sonnet' },
      { code: 'JB',  label: 'Jobs-to-be-Done',  model: 'sonnet' },
      { code: 'CS',  label: 'Comp Scan',         model: 'haiku'  },
      { code: 'UP',  label: 'User Personas',     model: 'sonnet' },
      { code: 'HO',  label: 'Handoff',           model: 'haiku'  },
    ],
  },
  {
    id: 'sol',
    name: 'Sol',
    icon: '◉',
    tier: 2,
    type: 'operator',
    tagline: 'Solidifier — shape decisions, tradeoff axes, AC locking',
    invocation: '//solidify',
    model: 'sonnet',
    phases: ['solidify'],
    capabilities: [
      { code: 'TA', label: 'Tradeoff Axes',   model: 'sonnet' },
      { code: 'DL', label: 'Design Locking',  model: 'sonnet' },
      { code: 'AC', label: 'AC Writing',      model: 'sonnet' },
      { code: 'PT', label: 'Pattern Select',  model: 'sonnet' },
      { code: 'HO', label: 'Handoff',         model: 'haiku'  },
      { code: 'HB', label: 'Handback',        model: 'haiku'  },
    ],
  },
  {
    id: 'bran',
    name: 'Bran',
    icon: '▣',
    tier: 2,
    type: 'operator',
    tagline: 'Builder — implements against the locked AC contract',
    invocation: '//build',
    model: 'sonnet',
    phases: ['build'],
    capabilities: [
      { code: 'IM', label: 'Implement',     model: 'sonnet' },
      { code: 'TR', label: 'Test Run',      model: 'haiku'  },
      { code: 'UV', label: 'UV Verify',     model: 'haiku'  },
      { code: 'RF', label: 'Refactor',      model: 'sonnet' },
      { code: 'HO', label: 'Handoff',       model: 'haiku'  },
      { code: 'HB', label: 'Handback',      model: 'haiku'  },
    ],
  },
  {
    id: 'may',
    name: 'May',
    icon: '▶',
    tier: 2,
    type: 'operator',
    tagline: 'Shipper — release readouts, trust receipts, narrates every release',
    invocation: '//ship',
    model: 'sonnet',
    phases: ['ship'],
    capabilities: [
      { code: 'RE', label: 'Release Readout', model: 'sonnet' },
      { code: 'CM', label: 'Commit Message',  model: 'haiku'  },
      { code: 'TR', label: 'Trust Receipt',   model: 'sonnet' },
      { code: 'RN', label: 'Release Notes',   model: 'sonnet' },
      { code: 'MS', label: 'Measure Setup',   model: 'haiku'  },
      { code: 'NL', label: 'Next-Loop Queue', model: 'sonnet' },
    ],
  },
]

export const AGENTS_BY_TIER: Record<AgentTier, Agent[]> = {
  0: AGENTS.filter(a => a.tier === 0),
  1: AGENTS.filter(a => a.tier === 1),
  2: AGENTS.filter(a => a.tier === 2),
}

export const PHASE_OPERATOR: Record<Phase, Agent> = {
  explore:  AGENTS.find(a => a.id === 'dora')!,
  solidify: AGENTS.find(a => a.id === 'sol')!,
  build:    AGENTS.find(a => a.id === 'bran')!,
  ship:     AGENTS.find(a => a.id === 'may')!,
}

export function getAgent(id: string): Agent | undefined {
  return AGENTS.find(a => a.id === id)
}
