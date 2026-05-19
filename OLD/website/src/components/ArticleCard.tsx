import { Link } from 'react-router-dom'
import type { ArticleFrontmatter } from '../types/article'

interface Props {
  article: ArticleFrontmatter
}

const CATEGORY_LABELS: Record<string, string> = {
  methodology: 'Methodology',
  product: 'Product',
  teams: 'Teams',
  individuals: 'Individuals',
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function ArticleCard({ article }: Props) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group block rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all duration-200 p-6"
    >
      {/* Category badge */}
      <span className="inline-block text-xs font-mono uppercase tracking-widest text-white/40 mb-3">
        {CATEGORY_LABELS[article.category] ?? article.category}
      </span>

      {/* Title */}
      <h2 className="text-base font-semibold text-white group-hover:text-white/90 leading-snug mb-2">
        {article.title}
      </h2>

      {/* Description */}
      {article.description && (
        <p className="text-sm text-white/50 leading-relaxed line-clamp-2 mb-4">
          {article.description}
        </p>
      )}

      {/* Date */}
      <time className="text-xs text-white/30">{formatDate(article.date)}</time>
    </Link>
  )
}
