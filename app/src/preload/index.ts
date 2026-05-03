import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('ds', {
  toggleWindow: () => ipcRenderer.send('window:toggle'),
  expandPanel: () => ipcRenderer.send('window:expand'),
  collapsePanel: () => ipcRenderer.send('window:collapse'),
  showCommand: () => ipcRenderer.send('command:show'),
  hideCommand: () => ipcRenderer.send('command:hide'),

  getContexts: () => ipcRenderer.invoke('contexts:list'),
  getActiveContext: () => ipcRenderer.invoke('contexts:active'),
  setActiveContext: (id: string) => ipcRenderer.invoke('contexts:set-active', id),
  updateContext: (id: string, patch: object) => ipcRenderer.invoke('contexts:update', id, patch),
  createContext: (spaceId: string, name: string, phase: string) => ipcRenderer.invoke('contexts:create', spaceId, name, phase),

  getGitLog: () => ipcRenderer.invoke('git:log'),

  captureScreen: () => ipcRenderer.invoke('screen:capture'),
  getScreenPermission: () => ipcRenderer.invoke('screen:permission'),
  openScreenSettings: () => ipcRenderer.send('screen:open-settings'),
  getToolsStatus: () => ipcRenderer.invoke('tools:status'),

  // Legacy Ollama stream (kept for compatibility)
  streamChat: (messages: { role: string; content: string }[], contextBrief?: string) =>
    ipcRenderer.send('ai:stream', messages, contextBrief),

  // AI provider (routes through active provider)
  streamAI: (messages: { role: string; content: string }[], contextBrief?: string) =>
    ipcRenderer.send('ai:stream', messages, contextBrief),

  onAIToken: (cb: (token: string) => void) => {
    const handler = (_: unknown, token: string) => cb(token)
    ipcRenderer.on('ai:token', handler)
    return () => ipcRenderer.removeListener('ai:token', handler)
  },
  onAIDone: (cb: () => void) => {
    ipcRenderer.on('ai:done', cb)
    return () => ipcRenderer.removeListener('ai:done', cb)
  },
  onAIError: (cb: (err: string) => void) => {
    const handler = (_: unknown, err: string) => cb(err)
    ipcRenderer.on('ai:error', handler)
    return () => ipcRenderer.removeListener('ai:error', handler)
  },

  // Settings
  getSettings: () => ipcRenderer.invoke('settings:get'),
  updateSettings: (patch: object) => ipcRenderer.invoke('settings:update', patch),
  checkConnection: (provider: string) => ipcRenderer.invoke('settings:check-connection', provider),

  selectContext: (id: string) => ipcRenderer.send('command:select-context', id),

  onViewSet: (cb: (view: string) => void) => {
    const handler = (_: unknown, view: string) => cb(view)
    ipcRenderer.on('view:set', handler)
    return () => ipcRenderer.removeListener('view:set', handler)
  },
  onContextChanged: (cb: (id: string) => void) => {
    const handler = (_: unknown, id: string) => cb(id)
    ipcRenderer.on('context:changed', handler)
    return () => ipcRenderer.removeListener('context:changed', handler)
  },

  // Legacy Ollama events (mapped to ai: events for backwards compat)
  onOllamaToken: (cb: (token: string) => void) => {
    const handler = (_: unknown, token: string) => cb(token)
    ipcRenderer.on('ai:token', handler)
    return () => ipcRenderer.removeListener('ai:token', handler)
  },
  onOllamaDone: (cb: () => void) => {
    ipcRenderer.on('ai:done', cb)
    return () => ipcRenderer.removeListener('ai:done', cb)
  },
  onOllamaError: (cb: (err: string) => void) => {
    const handler = (_: unknown, err: string) => cb(err)
    ipcRenderer.on('ai:error', handler)
    return () => ipcRenderer.removeListener('ai:error', handler)
  }
})
