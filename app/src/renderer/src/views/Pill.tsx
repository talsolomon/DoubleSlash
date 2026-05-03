export default function Pill() {
  return (
    <div className="w-full h-full flex items-center justify-center drag">
      <button
        className="no-drag px-5 py-2 rounded-pill bg-ds-surface border border-ds-border-light
          hover:border-ds-accent/40 hover:bg-ds-elevated transition-all duration-150
          flex items-center gap-2 group"
        onClick={() => window.ds.expandPanel()}
      >
        <span className="font-mono text-sm font-bold text-ds-accent tracking-tight">//</span>
        <span className="text-ds-text-secondary text-xs font-mono">duble</span>
        <span className="text-ds-text-dim text-xs ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
          ⌘⇧/
        </span>
      </button>
    </div>
  )
}
