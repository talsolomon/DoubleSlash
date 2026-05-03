import { useState, useEffect } from 'react'
import { GitEntry } from '../types'

export default function GitLog() {
  const [log, setLog] = useState<GitEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.ds
      .getGitLog()
      .then(setLog)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="h-full flex flex-col">
      <div className="px-3 py-2.5 border-b border-ds-border">
        <span className="text-xs font-mono text-ds-text-secondary">changelog</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {loading && (
          <div className="text-ds-text-dim text-xs text-center py-4 animate-pulse">loading…</div>
        )}
        {!loading && log.length === 0 && (
          <div className="text-ds-text-dim text-xs text-center py-4">no commits</div>
        )}
        {log.map((entry) => (
          <div
            key={entry.hash}
            className="mb-2 px-2 py-2 rounded-lg hover:bg-ds-surface transition-all"
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <code className="text-ds-accent text-xs font-mono">{entry.hash}</code>
              <span className="text-ds-text-dim text-xs ml-auto shrink-0">{entry.date}</span>
            </div>
            <p className="text-ds-text-secondary text-xs leading-snug line-clamp-2">{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
