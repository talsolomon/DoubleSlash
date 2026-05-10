import { PricingCard } from '../components/PricingCard'
import { tiers } from '../data/pricing'

export function GetIt() {
  return (
    <section className="bg-bg px-8 py-40 md:px-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-20">
        {/* header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-gradient font-mono font-bold leading-none tracking-tightest" style={{ fontSize: 'clamp(64px, 10vw, 100px)' }}>
            //
          </span>
          <p className="font-sans text-[15px] tracking-wide text-muted">Get DubleSlash</p>
        </div>

        {/* download */}
        <div className="flex flex-col items-center gap-3">
          <a
            href="/DubleSlash.dmg"
            className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-ink px-10 py-4 font-sans text-[15px] font-semibold tracking-tight text-bg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(167,139,250,0.2)]"
          >
            <AppleLogo />
            Download for macOS
          </a>
          <p className="font-mono text-[11px] tracking-widest text-muted-2 uppercase">
            Also available: CLI · Web
          </p>
        </div>

        {/* pricing */}
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AppleLogo() {
  return (
    <svg width="15" height="15" viewBox="0 0 814 1000" fill="currentColor" className="flex-shrink-0">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 134.4-317.7 266.7-317.7 101.6 0 181 64.8 241.7 64.8 57.9 0 147.9-68 263.7-68 42.7 0 150.1 6.5 227.5 98.8zm-182.5-190.6c27.2-33.4 46.5-80.4 46.5-127.4 0-6.5-.6-13-1.9-18.2-44.2 1.9-96.1 28.5-128.2 62.5-24.6 26-48.4 72.8-48.4 120.5 0 7.1 1.3 14.2 1.9 16.5 2.6.6 6.5 1.3 10.4 1.3 39.5 0 88.8-25.3 119.7-55.2z" />
    </svg>
  )
}
