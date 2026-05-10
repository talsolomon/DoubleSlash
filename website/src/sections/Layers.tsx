import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { layers } from '../data/layers'

const phaseColors = ['#38BDF8', '#A78BFA', '#FB923C', '#4ADE80']

export function Layers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const thresholds: [number, number][] = [
    [0.0, 0.25],
    [0.25, 0.5],
    [0.5, 0.75],
    [0.75, 1.0],
  ]

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-bg">
      <div className="sticky top-0 flex h-screen flex-col justify-center px-8 md:px-16 lg:px-24">
        <p className="mb-12 font-mono text-[11px] font-semibold tracking-widest text-muted-2 uppercase">
          The system
        </p>

        <div className="flex flex-col gap-0">
          {layers.map((layer, i) => (
            <LayerRow
              key={layer.label}
              layer={layer}
              color={phaseColors[i]}
              scrollYProgress={scrollYProgress}
              range={thresholds[i]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface LayerRowProps {
  layer: (typeof layers)[number]
  color: string
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
}

function LayerRow({ layer, color, scrollYProgress, range }: LayerRowProps) {
  const progress = useTransform(scrollYProgress, range, [0, 1])
  const opacity = useTransform(progress, [0, 0.4], [0, 1])
  const labelOpacity = useTransform(progress, [0, 0.6], [0.2, 1])
  const height = useTransform(progress, [0, 1], ['56px', '88px'])
  const accentOpacity = useTransform(progress, [0, 0.5], [0, 1])

  return (
    <motion.div
      style={{ height }}
      className="relative flex items-center overflow-hidden border-t border-border"
    >
      {/* sweeping accent line */}
      <motion.div
        style={{ opacity: accentOpacity, background: color }}
        className="absolute top-0 left-0 right-0 h-px"
      />

      <div className="flex w-full items-center justify-between py-4">
        {/* left: accent dot + label */}
        <div className="flex items-center gap-4">
          <motion.div
            style={{ backgroundColor: color, opacity: accentOpacity }}
            className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
          />
          <motion.span
            style={{ opacity: labelOpacity, color }}
            className="font-mono text-xl font-semibold tracking-tight"
          >
            {layer.label}
          </motion.span>
        </div>

        {/* right: dots + one-liner */}
        <motion.div style={{ opacity }} className="flex items-center gap-5">
          {layer.dots.length > 0 && (
            <div className="flex gap-1.5">
              {layer.dots.map((dot) => (
                <span
                  key={dot}
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: dot }}
                />
              ))}
            </div>
          )}
          <span className="max-w-sm font-sans text-[15px] leading-snug text-muted text-right">
            {layer.oneliner}
          </span>
        </motion.div>
      </div>

      {/* bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </motion.div>
  )
}
