import { motion } from 'framer-motion'
import { ArrowUpRight, PlayCircle } from 'lucide-react'
import { Button } from './Button'

export function FinalCTA() {
  return (
    <section id="demo" className="section-shell pb-24">
      <motion.div
        className="final-cta"
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-semibold leading-tight tracking-[-0.01em] text-white sm:text-5xl">
            Move from raw deal data to investment recommendation faster.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[color:var(--muted)]">
            Bring intake, risk analysis, stress testing, portfolio monitoring,
            and IC memo creation into one institutional credit intelligence layer.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="#dashboard" icon={<ArrowUpRight size={16} aria-hidden="true" />}>
              Start Analysis
            </Button>
            <Button href="#platform" variant="secondary" icon={<PlayCircle size={16} aria-hidden="true" />}>
              View Demo
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
