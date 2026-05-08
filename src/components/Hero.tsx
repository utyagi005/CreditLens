import { motion } from 'framer-motion'
import { ArrowUpRight, PlayCircle } from 'lucide-react'
import { Button } from './Button'
import { RiskFieldVisual } from './RiskFieldVisual'

export function Hero() {
  return (
    <section className="relative z-10 px-5 pb-12 pt-32 sm:pt-40 lg:min-h-[92vh] lg:pb-20">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl">
            Private Credit Intelligence for Institutional Investment Teams
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            Assess corporate and infrastructure credit opportunities with
            bottom-up analysis, relative value screening, stress testing,
            portfolio monitoring, and investment committee memo generation.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#dashboard" icon={<ArrowUpRight size={16} aria-hidden="true" />}>
              Analyze a Deal
            </Button>
            <Button href="#platform" variant="secondary" icon={<PlayCircle size={16} aria-hidden="true" />}>
              View Platform
            </Button>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {[
              ['42', 'active opportunities'],
              ['1.8B', 'monitored exposure'],
              ['17', 'covenant alerts'],
            ].map(([value, label]) => (
              <div key={label} className="border-l border-white/10 pl-4">
                <div className="text-2xl font-semibold text-white">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="relative mx-auto w-full max-w-[42rem]"
          initial={{ opacity: 0, scale: 0.94, y: 22 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-visual-frame">
            <RiskFieldVisual />
            <div className="absolute bottom-5 left-5 right-5 rounded-[var(--radius-xs)] border border-white/10 bg-black/28 p-4 text-left backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                    Risk engine
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Logistics Term Loan under downside monitor
                  </p>
                </div>
                <div className="rounded-full border border-amber-200/25 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
                  Medium
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
