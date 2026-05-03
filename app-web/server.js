import express from 'express'
import { simpleGit } from 'simple-git'
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execFileSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
app.use(express.json())

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
  next()
})
app.options('*', (_, res) => res.sendStatus(204))

const DATA_PATH = join(__dirname, '../app/data/contexts.json')

function load() {
  return JSON.parse(readFileSync(DATA_PATH, 'utf8'))
}

function save(data) {
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))
}

app.get('/api/contexts', (_, res) => {
  const data = load()
  res.json({ spaces: data.spaces, activeContextId: data.activeContextId })
})

app.post('/api/contexts/active', (req, res) => {
  const { id } = req.body
  const data = load()
  data.activeContextId = id
  save(data)
  const ctx = data.spaces.flatMap(s => s.contexts).find(c => c.id === id)
  res.json(ctx ?? null)
})

app.patch('/api/contexts/:contextId', (req, res) => {
  const { contextId } = req.params
  const patch = req.body
  const data = load()
  for (const space of data.spaces) {
    const idx = space.contexts.findIndex(c => c.id === contextId)
    if (idx !== -1) {
      space.contexts[idx] = { ...space.contexts[idx], ...patch }
      save(data)
      return res.json(space.contexts[idx])
    }
  }
  res.status(404).json({ error: 'context not found' })
})

app.post('/api/contexts', (req, res) => {
  const { spaceId, name, phase } = req.body
  const data = load()
  const space = data.spaces.find(s => s.id === spaceId)
  if (!space) return res.status(404).json({ error: 'space not found' })
  const ctx = {
    id: `ctx-${Date.now()}`,
    name,
    phase: phase || 'explore',
    brief: '',
    tasks: [],
    decisions: [],
    artifacts: [],
    sessions: []
  }
  space.contexts.push(ctx)
  save(data)
  res.json(ctx)
})

app.get('/api/git-log', async (_, res) => {
  try {
    const git = simpleGit(join(__dirname, '..'))
    const log = await git.log({ maxCount: 30 })
    res.json(log.all.map(e => ({
      hash: e.hash.slice(0, 7),
      date: e.date.slice(0, 10),
      message: e.message,
      author: e.author_name
    })))
  } catch {
    res.json([])
  }
})

app.get('/api/tools-status', (_, res) => {
  const apps = ['Claude', 'Cursor', 'Figma']
  const result = {}
  for (const name of apps) {
    try { execFileSync('pgrep', ['-x', name], { stdio: 'pipe' }); result[name] = true }
    catch { result[name] = false }
  }
  res.json(result)
})

app.post('/api/chat', async (req, res) => {
  const { messages, contextBrief } = req.body
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const system = `You are a DubleSlash AI agent for design and product work. Concise, direct, action-oriented. Help teams move through Fish phases: Explore, Solidify, Build, Ship.${contextBrief ? '\n\nActive context:\n' + contextBrief : ''}`

  try {
    const ollamaRes = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2:latest',
        messages: [{ role: 'system', content: system }, ...messages],
        stream: true
      })
    })
    if (!ollamaRes.ok) {
      res.write(`data: ${JSON.stringify({ error: `Ollama error ${ollamaRes.status}` })}\n\n`)
      res.end(); return
    }
    const reader = ollamaRes.body.getReader()
    const decoder = new TextDecoder()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      for (const line of decoder.decode(value).split('\n')) {
        if (!line.trim()) continue
        try {
          const json = JSON.parse(line)
          if (json.message?.content) res.write(`data: ${JSON.stringify({ token: json.message.content })}\n\n`)
          if (json.done) { res.write('data: [DONE]\n\n'); res.end(); return }
        } catch { /* skip malformed */ }
      }
    }
    res.end()
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: String(err) })}\n\n`)
    res.end()
  }
})

app.listen(3002, () => console.log('  API  → http://localhost:3002'))
