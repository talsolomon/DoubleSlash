import { useState, useRef, useEffect } from 'react'
import { Context } from '../types'

interface Message { role: 'user' | 'assistant'; content: string }

export default function ChatView({ activeContext }: { activeContext: Context | undefined }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [streamBuf, setStreamBuf] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamBuf])

  function autoResize() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 180) + 'px'
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    const text = input.trim()
    if (!text || streaming) return

    const newMsg: Message = { role: 'user', content: text }
    const history = [...messages, newMsg]
    setMessages(history)
    setInput('')
    setStreaming(true)
    setStreamBuf('')
    if (textareaRef.current) textareaRef.current.style.height = '40px'

    try {
      const res = await fetch('http://localhost:3002/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history, contextBrief: activeContext?.brief })
      })

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buf = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        for (const line of decoder.decode(value).split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') {
            setMessages(prev => [...prev, { role: 'assistant', content: buf }])
            setStreamBuf('')
            setStreaming(false)
            return
          }
          try {
            const json = JSON.parse(data)
            if (json.error) { setStreamBuf(`Error: ${json.error}`); setStreaming(false); return }
            if (json.token) { buf += json.token; setStreamBuf(buf) }
          } catch { /* skip */ }
        }
      }
    } catch (err) {
      setStreamBuf(`Error: ${String(err)}`)
    }
    setStreaming(false)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.length === 0 && !streaming && (
          <div className="h-full flex items-center justify-center">
            <p className="text-ds-text-dim text-xs font-mono text-center leading-relaxed">
              {activeContext ? `ask about "${activeContext.name}"` : 'select a context, then ask anything'}
            </p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <span className={`inline-block text-sm px-3 py-2 rounded-xl max-w-lg text-left leading-relaxed
              ${msg.role === 'user'
                ? 'bg-ds-accent/10 text-ds-text border border-ds-accent/20'
                : 'bg-ds-elevated text-ds-text-secondary'
              }`}>
              {msg.content}
            </span>
          </div>
        ))}
        {streaming && (
          <div className="flex justify-start">
            <span className="inline-block text-sm px-3 py-2 rounded-xl bg-ds-elevated text-ds-text-secondary max-w-lg leading-relaxed">
              {streamBuf || <span className="animate-pulse">▋</span>}
            </span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-3 px-5 py-4 border-t border-ds-border shrink-0"
      >
        <span className="text-ds-accent font-mono text-base font-bold shrink-0 pb-1.5">//</span>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => { setInput(e.target.value); autoResize() }}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
          placeholder={activeContext ? `ask about ${activeContext.name}…` : 'select a context first…'}
          disabled={streaming}
          rows={1}
          style={{ height: '40px', resize: 'none' }}
          className="flex-1 bg-transparent text-ds-text text-sm placeholder-ds-text-dim
            outline-none font-mono disabled:opacity-50 overflow-hidden leading-relaxed border-0 p-0 pb-1"
        />
        <div className="flex items-center gap-2 pb-1.5 shrink-0">
          {streaming ? (
            <span className="text-ds-text-dim text-xs animate-pulse">thinking…</span>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="text-ds-text-dim hover:text-ds-accent disabled:opacity-30 transition-colors text-sm font-mono"
            >
              ↵
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
