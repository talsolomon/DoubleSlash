import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import { app } from 'electron'

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

const DEFAULT: Settings = {
  activeProvider: 'ollama',
  apiKeys: { claude: '', openai: '', openrouter: '' },
  ollama: { host: 'http://localhost:11434', model: 'llama3.2:latest' },
  openai: { model: 'gpt-4o' },
  openrouter: { model: 'anthropic/claude-sonnet-4-6' }
}

let cache: Settings | null = null

function settingsPath(): string {
  return join(app.getAppPath(), 'data', 'settings.json')
}

export function getSettings(): Settings {
  if (cache) return cache
  const path = settingsPath()
  if (!existsSync(path)) {
    cache = structuredClone(DEFAULT)
    writeFileSync(path, JSON.stringify(cache, null, 2))
    return cache
  }
  try {
    const raw = JSON.parse(readFileSync(path, 'utf8'))
    cache = {
      ...DEFAULT,
      ...raw,
      apiKeys: { ...DEFAULT.apiKeys, ...raw.apiKeys },
      ollama: { ...DEFAULT.ollama, ...raw.ollama },
      openai: { ...DEFAULT.openai, ...raw.openai },
      openrouter: { ...DEFAULT.openrouter, ...raw.openrouter }
    }
  } catch {
    cache = structuredClone(DEFAULT)
  }
  return cache!
}

export function updateSettings(patch: Partial<Settings>): Settings {
  const current = getSettings()
  cache = {
    ...current,
    ...patch,
    apiKeys: { ...current.apiKeys, ...(patch.apiKeys ?? {}) },
    ollama: { ...current.ollama, ...(patch.ollama ?? {}) },
    openai: { ...current.openai, ...(patch.openai ?? {}) },
    openrouter: { ...current.openrouter, ...(patch.openrouter ?? {}) }
  }
  writeFileSync(settingsPath(), JSON.stringify(cache, null, 2))
  return cache!
}
