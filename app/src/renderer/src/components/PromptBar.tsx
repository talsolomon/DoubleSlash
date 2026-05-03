import { useState, useEffect, useRef } from 'react'
import { Context } from '../types'

interface Props {
  activeContext: Context | undefined
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function PromptBar({ activeContext }: Props) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [streaming, setStreaming] = useState(false)
  const [response, setResponse] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const responseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanToken = window.ds.onOllamaToken((token) => {
      setResponse((prev) => prev + token)
    })
    const cleanDone = window.ds.onOllamaDone(() => {
      setStreaming(false)
      setResponse((prev) => {
        if (prev) {
          setMessages((msgs) => [...msgs, { role: 'assistant', content: prev }])
        }
        return ''
      })
    })
    const cleanErr = window.ds.onOllamaError((err) => {
      setStreaming(false)
      setResponse(`Error: ${err}`)
    })
    return () => {
      cleanToken()
      cleanDone()
      cleanErr()
    }
  }, [])

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight
    }
  }, [response, messages])

  function autoResize() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 180) + 'px'
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    const text = input.trim()
    if (!text || streaming) return

    const newMsg: Message = { role: 'user', content: text }
    const history = [...messages, newMsg]
    setMessages(history)
    setInput('')
    setStreaming(true)
    setResponse('')

    if (textareaRef.current) {
      textareaRef.current.style.height = '40px'
    }

    window.ds.streamChat(
      history.map((m) => ({ role: m.role, content: m.content })),
      activeContext?.brief
    )
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Message history */}
      <div ref={responseRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.length === 0 && !streaming && (
          <div className="h-full flex items-center justify-center">
            <p className="text-ds-text-dim text-xs font-mono text-center leading-relaxed">
              {activeContext
                ? `ask about "${activeContext.name}"`
                : 'select a context, then ask anything'}
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
        {(streaming || response) && (
          <div className="flex justify-start">
            <span className="inline-block text-sm px-3 py-2 rounded-xl bg-ds-elevated text-ds-text-secondary max-w-lg leading-relaxed">
              {response || <span className="animate-pulse">▋</span>}
            </span>
          </div>
        )}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="flex items-end gap-3 px-5 py-4 border-t border-ds-border shrink-0">
        <span className="text-ds-accent font-mono text-base font-bold shrink-0 pb-1.5">//</span>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            autoResize()
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            activeContext
              ? `Ask about ${activeContext.name}…`
              : 'Select a context and ask anything…'
          }
          disabled={streaming}
          rows={1}
          style={{ height: '40px', resize: 'none' }}
          className="flex-1 bg-transparent text-ds-text text-sm placeholder-ds-text-dim
            outline-none font-mono disabled:opacity-50 overflow-hidden leading-relaxed
            border-0 p-0 pb-1"
        />
        <div className="flex items-center gap-2 pb-1.5 shrink-0">
          {streaming ? (
            <span className="text-ds-text-dim text-xs animate-pulse">thinking…</span>
          ) : (
            <>
              <span className="text-ds-text-dim text-xs">↵ send · ⇧↵ newline</span>
              <button
                type="submit"
                disabled={!input.trim()}
                className="text-ds-text-dim hover:text-ds-accent disabled:opacity-30
                  transition-colors text-sm font-mono"
              >
                ↵
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}
