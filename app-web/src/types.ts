export type Phase = 'explore' | 'solidify' | 'build' | 'ship'

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
}

export interface Context {
  id: string
  name: string
  phase: Phase
  brief: string
  tasks: Task[]
  decisions: Decision[]
  artifacts: Artifact[]
  sessions: Session[]
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
