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

  streamChat: (messages: { role: string; content: string }[], contextBrief?: string) =>
    ipcRenderer.send('ollama:stream', messages, contextBrief),

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
  onOllamaToken: (cb: (token: string) => void) => {
    const handler = (_: unknown, token: string) => cb(token)
    ipcRenderer.on('ollama:token', handler)
    return () => ipcRenderer.removeListener('ollama:token', handler)
  },
  onOllamaDone: (cb: () => void) => {
    ipcRenderer.on('ollama:done', cb)
    return () => ipcRenderer.removeListener('ollama:done', cb)
  },
  onOllamaError: (cb: (err: string) => void) => {
    const handler = (_: unknown, err: string) => cb(err)
    ipcRenderer.on('ollama:error', handler)
    return () => ipcRenderer.removeListener('ollama:error', handler)
  }
})
