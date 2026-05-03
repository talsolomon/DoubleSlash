import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { app } from 'electron'

export type Phase = 'explore' | 'solidify' | 'build' | 'ship'

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
}

export interface Context {
  id: string
  name: string
  phase: Phase
  brief: string
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

interface Store {
  activeContextId: string
  spaces: Space[]
}

let cache: Store | null = null

function dataPath(): string {
  return join(app.getAppPath(), 'data', 'contexts.json')
}

function load(): Store {
  if (!cache) cache = JSON.parse(readFileSync(dataPath(), 'utf8'))
  return cache!
}

function save(data: Store): void {
  cache = data
  writeFileSync(dataPath(), JSON.stringify(data, null, 2))
}

export function getContexts(): { spaces: Space[]; activeContextId: string } {
  const data = load()
  return { spaces: data.spaces, activeContextId: data.activeContextId }
}

export function getActiveContext(): Context | undefined {
  const data = load()
  for (const space of data.spaces) {
    const ctx = space.contexts.find((c) => c.id === data.activeContextId)
    if (ctx) return ctx
  }
  return data.spaces[0]?.contexts[0]
}

export function setActiveContext(id: string): Context | undefined {
  const data = load()
  data.activeContextId = id
  save(data)
  return getActiveContext()
}

export function updateContext(id: string, patch: Partial<Context>): void {
  const data = load()
  for (const space of data.spaces) {
    const idx = space.contexts.findIndex((c) => c.id === id)
    if (idx !== -1) {
      space.contexts[idx] = { ...space.contexts[idx], ...patch }
      save(data)
      return
    }
  }
}

export function createContext(spaceId: string, name: string, phase: Phase): Context | null {
  const data = load()
  const space = data.spaces.find((s) => s.id === spaceId)
  if (!space) return null
  const ctx: Context = {
    id: `ctx-${Date.now()}`,
    name,
    phase,
    brief: '',
    decisions: [],
    artifacts: [],
    sessions: []
  }
  space.contexts.push(ctx)
  save(data)
  return ctx
}
