import { app, BrowserWindow, globalShortcut, ipcMain, screen, clipboard, systemPreferences, shell } from 'electron'
import { join } from 'path'
import { tmpdir } from 'os'
import { execFile, execFileSync } from 'child_process'
import { readFileSync, unlinkSync } from 'fs'
import { getContexts, getActiveContext, setActiveContext, updateContext, createContext } from './store'
import type { Context, Phase } from './store'
import { getGitLog } from './git'
import { ollamaStream } from './ollama'

const isDev = process.env.NODE_ENV === 'development'

let mainWindow: BrowserWindow | null = null
let commandWindow: BrowserWindow | null = null
let isPanelOpen = false

const PILL = { w: 140, h: 44 }
const PANEL = { w: 1200, h: 780 }

function getWorkArea() {
  return screen.getPrimaryDisplay().workAreaSize
}

function createMainWindow(): void {
  const { width, height } = getWorkArea()

  mainWindow = new BrowserWindow({
    width: PILL.w,
    height: PILL.h,
    x: Math.round(width / 2 - PILL.w / 2),
    y: height - PILL.h - 16,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    hasShadow: false,
    movable: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.setAlwaysOnTop(true, 'screen-saver')

  if (isDev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function createCommandWindow(): void {
  commandWindow = new BrowserWindow({
    width: 360,
    height: 460,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  commandWindow.setAlwaysOnTop(true, 'screen-saver')

  if (isDev && process.env['ELECTRON_RENDERER_URL']) {
    commandWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/command.html')
  } else {
    commandWindow.loadFile(join(__dirname, '../renderer/command.html'))
  }

  commandWindow.on('blur', () => commandWindow?.hide())
}

function expandToPanel(): void {
  if (!mainWindow || isPanelOpen) return
  const { width, height } = getWorkArea()
  isPanelOpen = true
  mainWindow.setResizable(true)
  mainWindow.setMinimumSize(960, 620)
  mainWindow.setSize(PANEL.w, PANEL.h, true)
  mainWindow.setPosition(
    Math.round(width / 2 - PANEL.w / 2),
    Math.round(height * 0.12),
    true
  )
  mainWindow.webContents.send('view:set', 'panel')
}

function collapseToPill(): void {
  if (!mainWindow || !isPanelOpen) return
  const { width, height } = getWorkArea()
  isPanelOpen = false
  mainWindow.setResizable(false)
  mainWindow.setSize(PILL.w, PILL.h, true)
  mainWindow.setPosition(Math.round(width / 2 - PILL.w / 2), height - PILL.h - 16, true)
  mainWindow.webContents.send('view:set', 'pill')
}

function showCommandOverlay(): void {
  if (!commandWindow) return
  const cursor = screen.getCursorScreenPoint()
  const { width: sw, height: sh } = getWorkArea()
  const cw = 360, ch = 460
  const x = Math.min(Math.max(cursor.x - Math.round(cw / 2), 8), sw - cw - 8)
  const y = Math.min(Math.max(cursor.y - ch - 24, 8), sh - ch - 8)
  commandWindow.setPosition(x, y)
  commandWindow.show()
  commandWindow.focus()
}

function setupIPC(): void {
  ipcMain.on('window:toggle', () => (isPanelOpen ? collapseToPill() : expandToPanel()))
  ipcMain.on('window:expand', () => expandToPanel())
  ipcMain.on('window:collapse', () => collapseToPill())
  ipcMain.on('command:show', () => showCommandOverlay())
  ipcMain.on('command:hide', () => commandWindow?.hide())

  ipcMain.handle('contexts:list', () => getContexts())
  ipcMain.handle('contexts:active', () => getActiveContext())
  ipcMain.handle('contexts:set-active', (_, id: string) => setActiveContext(id))
  ipcMain.handle('contexts:update', (_, id: string, patch: Partial<Context>) => updateContext(id, patch))
  ipcMain.handle('contexts:create', (_, spaceId: string, name: string, phase: Phase) => createContext(spaceId, name, phase))
  ipcMain.handle('git:log', () => getGitLog())

  ipcMain.handle('screen:permission', () => {
    return systemPreferences.getMediaAccessStatus('screen')
  })

  ipcMain.handle('screen:capture', async () => {
    const status = systemPreferences.getMediaAccessStatus('screen')
    if (status !== 'granted') return { error: 'permission-denied', status }
    const tmpPath = join(tmpdir(), `ds-cap-${Date.now()}.png`)
    return new Promise((resolve) => {
      execFile('screencapture', ['-x', '-t', 'png', tmpPath], (err) => {
        if (err) { resolve({ error: err.message }); return }
        try {
          const data = readFileSync(tmpPath)
          unlinkSync(tmpPath)
          resolve({ dataUrl: `data:image/png;base64,${data.toString('base64')}` })
        } catch (e) { resolve({ error: String(e) }) }
      })
    })
  })

  ipcMain.on('screen:open-settings', () => {
    shell.openExternal('x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture')
  })

  ipcMain.handle('tools:status', () => {
    const apps = ['Claude', 'Cursor', 'Figma']
    const result: Record<string, boolean> = {}
    for (const name of apps) {
      try { execFileSync('pgrep', ['-x', name], { stdio: 'pipe' }); result[name] = true }
      catch { result[name] = false }
    }
    return result
  })

  ipcMain.on(
    'ollama:stream',
    async (event, messages: { role: string; content: string }[], contextId?: string) => {
      try {
        await ollamaStream(
          messages,
          (token) => event.sender.send('ollama:token', token),
          () => event.sender.send('ollama:done'),
          contextId
        )
      } catch (err) {
        event.sender.send('ollama:error', String(err))
      }
    }
  )

  ipcMain.on('command:select-context', (_, contextId: string) => {
    const ctx = setActiveContext(contextId)
    if (ctx?.brief) clipboard.writeText(ctx.brief)
    commandWindow?.hide()
    mainWindow?.webContents.send('context:changed', contextId)
    if (!isPanelOpen) expandToPanel()
  })
}

app.whenReady().then(() => {
  if (process.platform === 'darwin') app.dock.hide()

  createMainWindow()
  createCommandWindow()
  setupIPC()

  // Panel toggle
  globalShortcut.register('CommandOrControl+Shift+/', () => {
    isPanelOpen ? collapseToPill() : expandToPanel()
  })

  // Command overlay (the // gesture from any app)
  globalShortcut.register('CommandOrControl+/', () => {
    showCommandOverlay()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
