const OLLAMA_BASE = 'http://localhost:11434'
const MODEL = 'llama3.2:latest'

interface Message {
  role: string
  content: string
}

function systemPrompt(brief?: string): string {
  const base = `You are a DubleSlash AI agent for design and product work. You are concise, direct, and action-oriented. You help teams work through Fish methodology phases: Explore (research + define), Solidify (design + decide), Iterate (build + test), Deliver (ship + capture).

When asked to start a task, surface the next concrete action. Keep responses under 150 words unless a detailed deliverable is requested.`
  if (!brief) return base
  return `${base}\n\nActive context brief:\n${brief}`
}

export async function ollamaStream(
  messages: Message[],
  onToken: (token: string) => void,
  onDone: () => void,
  contextBrief?: string
): Promise<void> {
  const response = await fetch(`${OLLAMA_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'system', content: systemPrompt(contextBrief) }, ...messages],
      stream: true
    })
  })

  if (!response.ok) throw new Error(`Ollama error: ${response.status}`)

  const reader = response.body!.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    for (const line of decoder.decode(value).split('\n')) {
      if (!line.trim()) continue
      try {
        const json = JSON.parse(line)
        if (json.message?.content) onToken(json.message.content)
        if (json.done) {
          onDone()
          return
        }
      } catch {
        // skip malformed chunks
      }
    }
  }
  onDone()
}
