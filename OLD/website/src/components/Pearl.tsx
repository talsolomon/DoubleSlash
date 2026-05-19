interface PearlProps {
  flash?: boolean
  size?: number
  className?: string
  variant?: 'brand' | 'cool' | 'warm' | 'white'
}

const gradients = {
  brand: [
    'rgba(56,189,248,0.22) 0%',
    'rgba(167,139,250,0.18) 38%',
    'rgba(251,146,60,0.10) 65%',
    'transparent 80%',
  ],
  cool: [
    'rgba(56,189,248,0.28) 0%',
    'rgba(167,139,250,0.15) 50%',
    'transparent 75%',
  ],
  warm: [
    'rgba(167,139,250,0.25) 0%',
    'rgba(251,146,60,0.12) 50%',
    'transparent 75%',
  ],
  white: [
    'rgba(245,240,255,0.18) 0%',
    'rgba(245,240,255,0.06) 45%',
    'transparent 70%',
  ],
}

export function Pearl({ flash = false, size = 600, className = '', variant = 'brand' }: PearlProps) {
  const stops = gradients[variant].join(', ')

  return (
    <div
      className={`pointer-events-none ${flash ? 'pearl-flash' : 'pearl-pulse'} aurora-drift ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${stops})`,
        filter: 'blur(2px)',
      }}
    />
  )
}
