const quotes = [
  {
    text: '// changed how we hand off work between designers and developers.',
    attribution: '— Studio Name',
    color: '#38BDF8',
    // TODO: replace with real cohort quote
  },
  {
    text: 'We stopped doing standups. The Digest does it better.',
    attribution: '— Studio Name',
    color: '#A78BFA',
    // TODO: replace with real cohort quote
  },
]

export function Signal() {
  return (
    <section className="bg-bg px-8 py-40 md:px-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-24 text-center">
        {/* quotes */}
        <div className="flex flex-col gap-14 w-full">
          {quotes.map((q) => (
            <figure
              key={q.text}
              className="relative flex flex-col gap-4 pl-8 text-left"
            >
              {/* colored left accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{ background: `linear-gradient(180deg, ${q.color} 0%, transparent 100%)` }}
              />
              <blockquote className="font-sans text-lg font-light leading-relaxed text-ink/80">
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <figcaption className="font-mono text-[11px] tracking-widest uppercase" style={{ color: q.color }}>
                {q.attribution}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* mission */}
        <div className="flex flex-col items-center gap-2">
          <p
            className="font-sans font-light leading-tight tracking-tight text-ink"
            style={{ fontSize: 'clamp(48px, 8vw, 88px)' }}
          >
            Context that survives{' '}
            <span className="text-gradient">everything.</span>
          </p>
        </div>

        {/* footer mark */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-muted-2">//</span>
          <span className="font-mono text-[11px] tracking-wider text-muted-2">DubleSlash</span>
        </div>
      </div>
    </section>
  )
}
