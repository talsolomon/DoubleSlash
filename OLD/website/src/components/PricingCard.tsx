interface PricingCardProps {
  name: string
  price: string
  features: readonly string[]
  cta: string
  ctaStyle: 'outline' | 'filled'
  href: string
  highlighted?: boolean
}

export function PricingCard({ name, price, features, cta, ctaStyle, href, highlighted }: PricingCardProps) {
  return (
    <div
      className={[
        'relative flex flex-col gap-8 rounded-2xl p-8 transition-all duration-300',
        highlighted
          ? 'bg-surface-2 ring-1 ring-solidify/40'
          : 'bg-surface ring-1 ring-border',
      ].join(' ')}
    >
      {highlighted && (
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-solidify to-transparent opacity-60" />
      )}

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="font-sans text-base font-semibold tracking-tight text-ink">{name}</span>
          {highlighted && (
            <span className="rounded-full bg-solidify/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-solidify uppercase">
              Popular
            </span>
          )}
        </div>
        <span className="font-mono text-sm text-muted">{price}</span>
      </div>

      <ul className="flex flex-col gap-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 font-sans text-[13px] text-muted leading-relaxed">
            <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-2 mt-1.5" />
            {f}
          </li>
        ))}
      </ul>

      <a
        href={href}
        className={[
          'mt-auto w-full rounded-xl py-3 text-center font-sans text-sm font-semibold tracking-tight transition-all duration-200',
          ctaStyle === 'filled'
            ? highlighted
              ? 'bg-solidify text-bg hover:bg-solidify/90'
              : 'bg-ink text-bg hover:opacity-90'
            : 'border border-border-2 text-muted hover:border-muted hover:text-ink',
        ].join(' ')}
      >
        {cta}
      </a>
    </div>
  )
}
