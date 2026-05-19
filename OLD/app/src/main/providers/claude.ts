import Anthropic from '@anthropic-ai/sdk'

function systemPrompt(brief?: string): string {
  const base = `You are a DubleSlash AI agent for design and product work. You are concise, direct, and action-oriented. You help teams work through Fish methodology phases: Explore (research + define), Solidify (design + decide), Build (build + test), Ship (ship + capture).

When asked to start a task, surface the next concrete action. Keep responses under 150 words unless a detailed deliverable is requested.`
  return brief ? `${base}\n\nActive context brief:\n${brief}` : base
}

export async function claudeStream(
  messages: { role: string; content: string }[],
  onToken: (token: string) => void,
  onDone: () => void,
  apiKey: string,
  contextBrief?: string
): Promise<void> {
  const client = new Anthropic({ apiKey })

  const stream = client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: systemPrompt(contextBrief),
    messages: messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content
    }))
  })

  for await (const text of stream.textStream) {
    onToken(text)
  }

  onDone()
}

export async function checkClaudeConnection(apiKey: string): Promise<boolean> {
  try {
    const client = new Anthropic({ apiKey })
    await client.models.list()
    return true
  } catch {
    return false
  }
}
