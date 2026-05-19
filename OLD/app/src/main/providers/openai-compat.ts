// Handles both OpenAI and OpenRouter (same API shape, different base URL)

function systemPrompt(brief?: string): string {
  const base = `You are a DubleSlash AI agent for design and product work. You are concise, direct, and action-oriented. You help teams work through Fish methodology phases: Explore (research + define), Solidify (design + decide), Build (build + test), Ship (ship + capture).

When asked to start a task, surface the next concrete action. Keep responses under 150 words unless a detailed deliverable is requested.`
  return brief ? `${base}\n\nActive context brief:\n${brief}` : base
}

export async function openAICompatStream(
  messages: { role: string; content: string }[],
  onToken: (token: string) => void,
  onDone: () => void,
  apiKey: string,
  model: string,
  baseUrl: string,
  contextBrief?: string
): Promise<void> {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      stream: true,
      messages: [{ role: 'system', content: systemPrompt(contextBrief) }, ...messages]
    })
  })

  if (!response.ok) throw new Error(`API error: ${response.status}`)

  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data: ')) continue
      const payload = trimmed.slice(6)
      if (payload === '[DONE]') { onDone(); return }
      try {
        const json = JSON.parse(payload)
        const content = json.choices?.[0]?.delta?.content
        if (content) onToken(content)
      } catch { /* skip malformed chunks */ }
    }
  }
  onDone()
}

export async function checkOpenAICompatConnection(apiKey: string, baseUrl: string): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/models`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    })
    return res.ok
  } catch {
    return false
  }
}
