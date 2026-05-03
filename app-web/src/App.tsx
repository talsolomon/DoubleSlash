import { useState, useEffect, useCallback } from 'react'
import Panel from './views/Panel'

export default function App() {
  const [expanded, setExpanded] = useState(false)
  const [light, setLight] = useState(() => localStorage.getItem('ds-theme') === 'light')

  const toggle = useCallback(() => setExpanded(v => !v), [])

  function toggleTheme() {
    setLight(prev => {
      const next = !prev
      localStorage.setItem('ds-theme', next ? 'light' : 'dark')
      return next
    })
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === '/') { e.preventDefault(); toggle() }
      if (e.key === 'Escape' && expanded) setExpanded(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [expanded, toggle])

  return (
    <div className={`w-screen h-screen relative overflow-hidden bg-ds-bg ${light ? 'light' : ''}`}>
      <div className={`absolute inset-3 rounded-2xl overflow-hidden transition-all duration-300 ease-out ${expanded ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97] pointer-events-none'}`}>
        {expanded && <Panel onCollapse={() => setExpanded(false)} isLight={light} onToggleTheme={toggleTheme} />}
      </div>

      <button
        onClick={toggle}
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-300 ease-out
          ${expanded ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}
          px-5 py-2.5 rounded-pill bg-ds-surface border border-ds-border
          hover:border-ds-accent/40 hover:bg-ds-elevated flex items-center gap-2 group`}
      >
        <span className="font-mono text-sm font-bold text-ds-accent">//</span>
        <span className="text-ds-text-secondary text-xs font-mono">duble</span>
        <span className="text-ds-text-dim text-xs opacity-0 group-hover:opacity-100 transition-opacity">⌘⇧/</span>
      </button>
    </div>
  )
}
