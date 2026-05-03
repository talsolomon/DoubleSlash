import { useState, useEffect } from 'react'
import { GitEntry } from '../types'

export default function GitLog() {
  const [log, setLog] = useState<GitEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    window.ds
      .getGitLog()
      .then(setLog)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto py-2">
        {loading && (
          <div className="text-ds-text-dim text-xs text-center py-4 animate-pulse font-mono">loading…</div>
        )}
        {!loading && log.length === 0 && (
          <div className="text-ds-text-dim text-xs text-center py-4 font-mono">no commits</div>
        )}
        {log.map((entry, i) => {
          const isOpen = expanded === entry.hash
          const isLast = i === log.length - 1
          return (
            <div key={entry.hash}>
              <button
                onClick={() => setExpanded(isOpen ? null : entry.hash)}
                className="w-full flex items-start gap-2.5 px-3 py-1.5 hover:bg-ds-surface transition-all text-left group"
              >
                {/* timeline */}
                <div className="flex flex-col items-center shrink-0 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-ds-border group-hover:bg-ds-accent transition-colors" />
                  {!isLast && <span className="w-px flex-1 bg-ds-border mt-0.5" style={{ minHeight: 14 }} />}
                </div>
                {/* message */}
                <span className="text-xs font-mono text-ds-text-secondary leading-snug truncate flex-1">
                  {entry.message}
                </span>
              </button>

              {isOpen && (
                <div className="mx-3 mb-2 ml-8 px-3 py-2.5 rounded-lg bg-ds-surface border border-ds-border">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-ds-accent text-xs font-mono">{entry.hash}</code>
                    <span className="text-ds-text-dim text-xs font-mono ml-auto">{entry.date}</span>
                  </div>
                  <p className="text-ds-text-dim text-xs font-mono mb-1">{entry.author}</p>
                  {entry.body && (
                    <p className="text-ds-text-secondary text-xs leading-relaxed mt-2 whitespace-pre-wrap border-t border-ds-border pt-2">
                      {entry.body}
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
