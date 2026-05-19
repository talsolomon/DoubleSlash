export type Phase = 'explore' | 'solidify' | 'build' | 'ship'
export type Archetype = 'nemo' | 'tuna' | 'salmon' | 'willy'

export interface StreamMethod {
  id: string
  name: string
  status: 'done' | 'in-progress' | 'pending' | 'deferred'
  deferredReason?: string
}

export interface StreamProgress {
  total: number
  completed: number
  methods: StreamMethod[]
}

export interface FishHandoff {
  from: string
  to: string
  phaseExited: Phase
  locked: string[]
  open: string[]
  artifactPaths: string[]
  confidence: number
  notes: string
  emittedAt: string
}

export interface Task {
  id: string
  name: string
  done: boolean
}

export interface Decision {
  id: string
  date: string
  text: string
}

export interface Artifact {
  id: string
  name: string
  type: 'file' | 'link' | 'note'
  sessionId?: string
  status: 'in-flight' | 'shipped'
}

export interface Session {
  id: string
  date: string
  tool: string
  summary: string
  artifactIds: string[]
  tokens?: number
  durationMinutes?: number
  model?: string
}

export interface Sigil {
  certainty: 'known' | 'unknown'
  size: 'smaller' | 'bigger'
}

export interface Context {
  id: string
  name: string
  phase: Phase
  archetype?: Archetype
  sigil?: Sigil
  brief: string
  tasks: Task[]
  decisions: Decision[]
  artifacts: Artifact[]
  sessions: Session[]
  status?: 'active' | 'blocked' | 'at-exit'
  blockerDescription?: string
  streamProgress?: StreamProgress
  lastHandoff?: FishHandoff
}

export interface Space {
  id: string
  name: string
  client: string
  contexts: Context[]
}

export interface GitEntry {
  hash: string
  date: string
  message: string
  author: string
}

export const ARCHETYPE_META: Record<Archetype, { label: string; short: string; cssVar: string; agent: string }> = {
  nemo:   { label: 'Nemo',   short: 'N', cssVar: '--ds-ship',     agent: 'Bran'  },
  tuna:   { label: 'Tuna',   short: 'T', cssVar: '--ds-solidify', agent: 'Sol'   },
  salmon: { label: 'Salmon', short: 'S', cssVar: '--ds-explore',  agent: 'Dora'  },
  willy:  { label: 'Willy',  short: 'W', cssVar: '--ds-build',    agent: 'Dora'  },
}

export const PHASE_CSS_VAR: Record<Phase, string> = {
  explore:  '--ds-explore',
  solidify: '--ds-solidify',
  build:    '--ds-build',
  ship:     '--ds-ship',
}

export const PHASE_META: Record<Phase, { label: string; icon: string; color: string; bg: string; border: string }> = {
  explore:  { label: 'Explore',  icon: '◎', color: 'text-ds-explore',  bg: 'bg-ds-explore/10',  border: 'border-ds-explore/30'  },
  solidify: { label: 'Solidify', icon: '◈', color: 'text-ds-solidify', bg: 'bg-ds-solidify/10', border: 'border-ds-solidify/30' },
  build:    { label: 'Build',    icon: '◉', color: 'text-ds-build',    bg: 'bg-ds-build/10',    border: 'border-ds-build/30'    },
  ship:     { label: 'Ship',     icon: '▶', color: 'text-ds-ship',     bg: 'bg-ds-ship/10',     border: 'border-ds-ship/30'     },
}

export const PHASES: Phase[] = ['explore', 'solidify', 'build', 'ship']

const BASE = 'http://localhost:3002/api'

export async function apiGetContexts(): Promise<{ spaces: Space[]; activeContextId: string }> {
  const r = await fetch(`${BASE}/contexts`)
  return r.json()
}

export async function apiSetActiveContext(id: string): Promise<void> {
  await fetch(`${BASE}/contexts/active`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id })
  })
}

export async function apiUpdateContext(id: string, patch: Partial<Context>): Promise<void> {
  await fetch(`${BASE}/contexts/${id}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(patch)
  })
}

export async function apiCreateContext(spaceId: string, name: string, phase: Phase): Promise<Context> {
  const r = await fetch(`${BASE}/contexts`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ spaceId, name, phase })
  })
  return r.json()
}

export async function apiGetGitLog(): Promise<GitEntry[]> {
  const r = await fetch(`${BASE}/git-log`)
  return r.json()
}
