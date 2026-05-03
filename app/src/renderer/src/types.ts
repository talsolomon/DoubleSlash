export type Phase = 'explore' | 'solidify' | 'build' | 'ship'

export type ProviderType = 'claude' | 'ollama' | 'openai' | 'openrouter'

export interface Settings {
  activeProvider: ProviderType
  apiKeys: {
    claude: string
    openai: string
    openrouter: string
  }
  ollama: {
    host: string
    model: string
  }
  openai: {
    model: string
  }
  openrouter: {
    model: string
  }
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

export interface GitEntry {
  hash: string
  date: string
  message: string
  author: string
  body: string
}

declare global {
  interface Window {
    ds: {
      toggleWindow(): void
      expandPanel(): void
      collapsePanel(): void
      showCommand(): void
      hideCommand(): void
      getContexts(): Promise<{ spaces: Space[]; activeContextId: string }>
      getActiveContext(): Promise<Context | undefined>
      setActiveContext(id: string): Promise<void>
      updateContext(id: string, patch: Partial<Context>): Promise<void>
      createContext(spaceId: string, name: string, phase: Phase): Promise<Context>
      getGitLog(): Promise<GitEntry[]>
      captureScreen(): Promise<{ dataUrl?: string; error?: string; status?: string }>
      getScreenPermission(): Promise<string>
      openScreenSettings(): void
      getToolsStatus(): Promise<Record<string, boolean>>
      streamChat(messages: { role: string; content: string }[], contextBrief?: string): void
      streamAI(messages: { role: string; content: string }[], contextBrief?: string): void
      onAIToken(cb: (token: string) => void): () => void
      onAIDone(cb: () => void): () => void
      onAIError(cb: (err: string) => void): () => void
      getSettings(): Promise<Settings>
      updateSettings(patch: Partial<Settings>): Promise<Settings>
      checkConnection(provider: string): Promise<boolean>
      selectContext(id: string): void
      onViewSet(cb: (view: string) => void): () => void
      onContextChanged(cb: (id: string) => void): () => void
      onOllamaToken(cb: (token: string) => void): () => void
      onOllamaDone(cb: () => void): () => void
      onOllamaError(cb: (err: string) => void): () => void
    }
  }
}

export const PHASE_META: Record<Phase, { label: string; icon: string; color: string; bg: string; border: string }> = {
  explore:  { label: 'Explore',  icon: '◎', color: 'text-ds-explore',  bg: 'bg-ds-explore/10',  border: 'border-ds-explore/30'  },
  solidify: { label: 'Solidify', icon: '◈', color: 'text-ds-solidify', bg: 'bg-ds-solidify/10', border: 'border-ds-solidify/30' },
  build:    { label: 'Build',    icon: '◉', color: 'text-ds-build',    bg: 'bg-ds-build/10',    border: 'border-ds-build/30'    },
  ship:     { label: 'Ship',     icon: '▶', color: 'text-ds-ship',     bg: 'bg-ds-ship/10',     border: 'border-ds-ship/30'     },
}

export const PHASES: Phase[] = ['explore', 'solidify', 'build', 'ship']
