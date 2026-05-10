import { Pearl } from '../components/Pearl'

export function Demo() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg">
      {/* video — drop demo.mp4 into public/ to activate */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 [&[src]]:opacity-100"
        src="/demo.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* aurora glow — behind everything */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Pearl flash size={900} variant="brand" />
      </div>

      {/* content */}
      <div className="relative z-10 flex flex-col items-center gap-6 select-none">
        {/* brand mark */}
        <span
          className="text-gradient font-mono font-bold leading-none tracking-tightest"
          style={{ fontSize: 'clamp(96px, 16vw, 180px)' }}
        >
          //
        </span>

        {/* tagline */}
        <p className="font-sans text-sm font-medium tracking-widest text-muted uppercase">
          One keystroke&nbsp;&nbsp;·&nbsp;&nbsp;Full context&nbsp;&nbsp;·&nbsp;&nbsp;Every time
        </p>
      </div>

      {/* thin bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-2 to-transparent" />

      {/* bottom-left watermark */}
      <span className="absolute bottom-6 left-8 font-mono text-[11px] font-semibold tracking-wide text-muted-2">
        //DubleSlash
      </span>
    </section>
  )
}
