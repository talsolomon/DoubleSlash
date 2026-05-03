import { getSettings } from '../settings'
import { claudeStream } from './claude'
import { ollamaStream } from '../ollama'
import { openAICompatStream } from './openai-compat'

export async function aiStream(
  messages: { role: string; content: string }[],
  onToken: (token: string) => void,
  onDone: () => void,
  contextBrief?: string
): Promise<void> {
  const s = getSettings()

  switch (s.activeProvider) {
    case 'claude':
      if (!s.apiKeys.claude) throw new Error('Claude API key not set')
      return claudeStream(messages, onToken, onDone, s.apiKeys.claude, contextBrief)

    case 'openai':
      if (!s.apiKeys.openai) throw new Error('OpenAI API key not set')
      return openAICompatStream(
        messages, onToken, onDone,
        s.apiKeys.openai, s.openai.model,
        'https://api.openai.com/v1', contextBrief
      )

    case 'openrouter':
      if (!s.apiKeys.openrouter) throw new Error('OpenRouter API key not set')
      return openAICompatStream(
        messages, onToken, onDone,
        s.apiKeys.openrouter, s.openrouter.model,
        'https://openrouter.ai/api/v1', contextBrief
      )

    case 'ollama':
    default:
      return ollamaStream(messages, onToken, onDone, contextBrief)
  }
}
