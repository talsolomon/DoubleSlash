import { useState, useEffect } from 'react'
import { Settings, ProviderType } from '../types'

interface ProviderMeta {
  id: ProviderType
  name: string
  label: string
  description: string
  needsKey: boolean
  keyLabel?: string
  keyPlaceholder?: string
}

const PROVIDERS: ProviderMeta[] = [
  {
    id: 'claude',
    name: 'Claude',
    label: 'Anthropic',
    description: 'claude-sonnet-4-6 · best for design + product reasoning',
    needsKey: true,
    keyLabel: 'API key',
    keyPlaceholder: 'sk-ant-...'
  },
  {
    id: 'ollama',
    name: 'Ollama',
    label: 'Local',
    description: 'runs on your machine · no key needed · works offline',
    needsKey: false
  },
  {
    id: 'openai',
    name: 'OpenAI',
    label: 'OpenAI',
    description: 'gpt-4o · strong general-purpose model',
    needsKey: true,
    keyLabel: 'API key',
    keyPlaceholder: 'sk-...'
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    label: 'OpenRouter',
    description: 'any model via one API · pay-per-use',
    needsKey: true,
    keyLabel: 'API key',
    keyPlaceholder: 'sk-or-...'
  }
]

const TOOL_NAMES = ['Claude', 'Cursor', 'Figma']
const TOOL_DESC: Record<string, string> = {
  Claude: 'Claude desktop app',
  Cursor: 'AI code editor',
  Figma: 'design tool'
}

type ConnStatus = 'idle' | 'checking' | 'ok' | 'error'

export default function Connections() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [toolsStatus, setToolsStatus] = useState<Record<string, boolean>>({})
  const [connStatus, setConnStatus] = useState<Record<string, ConnStatus>>({})
  const [draftKeys, setDraftKeys] = useState<Record<string, string>>({})
  const [draftOllama, setDraftOllama] = useState({ host: '', model: '' })
  const [saving, setSaving] = useState<Record<string, boolean>>({})

  async function load() {
    const s = await window.ds.getSettings()
    setSettings(s)
    setDraftKeys({
      claude: s.apiKeys.claude,
      openai: s.apiKeys.openai,
      openrouter: s.apiKeys.openrouter
    })
    setDraftOllama({ host: s.ollama.host, model: s.ollama.model })
  }

  useEffect(() => {
    load()
    window.ds.getToolsStatus().then(setToolsStatus)
    const t = setInterval(() => window.ds.getToolsStatus().then(setToolsStatus), 8000)
    return () => clearInterval(t)
  }, [])

  async function setActiveProvider(id: ProviderType) {
    const updated = await window.ds.updateSettings({ activeProvider: id })
    setSettings(updated)
  }

  async function saveKey(provider: ProviderType) {
    setSaving((s) => ({ ...s, [provider]: true }))
    const patch =
      provider === 'ollama'
        ? { ollama: draftOllama }
        : { apiKeys: { ...settings!.apiKeys, [provider]: draftKeys[provider] } }
    const updated = await window.ds.updateSettings(patch)
    setSettings(updated)
    setSaving((s) => ({ ...s, [provider]: false }))
  }

  async function testConnection(provider: string) {
    setConnStatus((s) => ({ ...s, [provider]: 'checking' }))
    const ok = await window.ds.checkConnection(provider)
    setConnStatus((s) => ({ ...s, [provider]: ok ? 'ok' : 'error' }))
    setTimeout(() => setConnStatus((s) => ({ ...s, [provider]: 'idle' })), 4000)
  }

  if (!settings) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-ds-text-dim text-xs font-mono animate-pulse">loading…</span>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto px-5 py-5 space-y-7">

      {/* AI Providers */}
      <section>
        <SectionLabel>AI providers</SectionLabel>
        <div className="space-y-2.5">
          {PROVIDERS.map((p) => {
            const isActive = settings.activeProvider === p.id
            const status = connStatus[p.id] ?? 'idle'
            const hasKey = p.needsKey ? !!settings.apiKeys[p.id as keyof typeof settings.apiKeys] : true
            const ollamaConfigured = p.id === 'ollama'

            return (
              <div
                key={p.id}
                className={`rounded-xl border transition-all p-3.5
                  ${isActive
                    ? 'border-ds-accent/40 bg-ds-accent/5'
                    : 'border-ds-border bg-ds-elevated/40 hover:border-ds-border-light'
                  }`}
              >
                {/* Header row */}
                <div className="flex items-center gap-3 mb-2">
                  <StatusDot status={status} hasKey={hasKey || ollamaConfigured} isActive={isActive} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-semibold text-ds-text">{p.name}</span>
                      <span className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest
                        px-1.5 py-0.5 rounded bg-ds-surface border border-ds-border">{p.label}</span>
                      {isActive && (
                        <span className="text-[9px] font-mono text-ds-accent uppercase tracking-widest ml-auto">
                          active
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-mono text-ds-text-dim mt-0.5 truncate">{p.description}</p>
                  </div>
                </div>

                {/* Config inputs */}
                {p.needsKey && (
                  <div className="flex gap-2 mt-2.5">
                    <input
                      type="password"
                      value={draftKeys[p.id] ?? ''}
                      onChange={(e) => setDraftKeys((d) => ({ ...d, [p.id]: e.target.value }))}
                      placeholder={p.keyPlaceholder}
                      className="flex-1 bg-ds-surface border border-ds-border rounded-lg px-3 py-1.5
                        text-xs font-mono text-ds-text placeholder-ds-text-dim
                        focus:outline-none focus:border-ds-accent/50 transition-colors"
                    />
                    <button
                      onClick={() => saveKey(p.id)}
                      disabled={saving[p.id]}
                      className="px-3 py-1.5 text-xs font-mono bg-ds-surface border border-ds-border
                        rounded-lg text-ds-text-secondary hover:text-ds-text hover:border-ds-border-light
                        transition-all disabled:opacity-40"
                    >
                      {saving[p.id] ? '…' : 'save'}
                    </button>
                  </div>
                )}

                {p.id === 'ollama' && (
                  <div className="flex gap-2 mt-2.5">
                    <input
                      type="text"
                      value={draftOllama.host}
                      onChange={(e) => setDraftOllama((d) => ({ ...d, host: e.target.value }))}
                      placeholder="http://localhost:11434"
                      className="flex-1 bg-ds-surface border border-ds-border rounded-lg px-3 py-1.5
                        text-xs font-mono text-ds-text placeholder-ds-text-dim
                        focus:outline-none focus:border-ds-accent/50 transition-colors"
                    />
                    <input
                      type="text"
                      value={draftOllama.model}
                      onChange={(e) => setDraftOllama((d) => ({ ...d, model: e.target.value }))}
                      placeholder="llama3.2:latest"
                      className="w-36 bg-ds-surface border border-ds-border rounded-lg px-3 py-1.5
                        text-xs font-mono text-ds-text placeholder-ds-text-dim
                        focus:outline-none focus:border-ds-accent/50 transition-colors"
                    />
                    <button
                      onClick={() => saveKey('ollama')}
                      disabled={saving['ollama']}
                      className="px-3 py-1.5 text-xs font-mono bg-ds-surface border border-ds-border
                        rounded-lg text-ds-text-secondary hover:text-ds-text hover:border-ds-border-light
                        transition-all disabled:opacity-40"
                    >
                      {saving['ollama'] ? '…' : 'save'}
                    </button>
                  </div>
                )}

                {/* Action row */}
                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    onClick={() => testConnection(p.id)}
                    disabled={status === 'checking'}
                    className="text-[10px] font-mono text-ds-text-dim hover:text-ds-text-secondary
                      transition-colors disabled:opacity-40"
                  >
                    {status === 'checking' ? 'checking…' :
                     status === 'ok' ? '✓ connected' :
                     status === 'error' ? '✗ failed' :
                     'test connection'}
                  </button>
                  {!isActive && (
                    <button
                      onClick={() => setActiveProvider(p.id)}
                      className="ml-auto text-[10px] font-mono text-ds-accent hover:opacity-75
                        transition-opacity"
                    >
                      set active →
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Tools */}
      <section>
        <SectionLabel>tools</SectionLabel>
        <div className="space-y-1.5">
          {TOOL_NAMES.map((tool) => {
            const running = toolsStatus[tool] ?? false
            return (
              <div
                key={tool}
                className="flex items-center gap-3 rounded-xl border border-ds-border
                  bg-ds-elevated/40 px-3.5 py-2.5"
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors
                  ${running ? 'bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)]' : 'bg-ds-border'}`}
                />
                <span className={`text-sm font-mono ${running ? 'text-ds-text' : 'text-ds-text-secondary'}`}>
                  {tool}
                </span>
                <span className="text-[10px] font-mono text-ds-text-dim">{TOOL_DESC[tool]}</span>
                {running && (
                  <span className="ml-auto text-[9px] font-mono text-green-400/70 uppercase tracking-widest">
                    running
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] font-mono text-ds-text-dim uppercase tracking-widest mb-3">{children}</p>
  )
}

function StatusDot({
  status, hasKey, isActive
}: { status: ConnStatus; hasKey: boolean; isActive: boolean }) {
  if (status === 'checking') return <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
  if (status === 'ok') return <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
  if (status === 'error') return <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
  if (isActive && hasKey) return <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)] shrink-0" />
  if (!hasKey) return <span className="w-2 h-2 rounded-full bg-amber-400/50 shrink-0" />
  return <span className="w-2 h-2 rounded-full bg-ds-border shrink-0" />
}
