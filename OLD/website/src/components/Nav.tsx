import { Link } from 'react-router-dom'

export function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/[0.06]"
      style={{ height: 56 }}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Left — logo mark */}
        <Link
          to="/"
          className="font-mono text-white text-sm font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          //
        </Link>

        {/* Center — Blog link */}
        <Link
          to="/blog"
          className="text-sm text-white/60 hover:text-white transition-colors"
        >
          Blog
        </Link>

        {/* Right — waitlist CTA */}
        <a
          href="#waitlist"
          className="text-sm px-4 py-1.5 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
        >
          Join the waitlist →
        </a>
      </div>
    </nav>
  )
}
