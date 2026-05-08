import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type FeatureCardProps = {
  icon: ReactNode
  title: string
  copy: string
  meta?: string
  delay?: number
}

export function FeatureCard({ icon, title, copy, meta, delay = 0 }: FeatureCardProps) {
  return (
    <motion.article
      className="feature-card group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex size-11 items-center justify-center rounded-[var(--radius-xs)] border border-white/12 bg-white/[0.055] text-cyan-100 transition duration-300 group-hover:border-cyan-100/30 group-hover:bg-cyan-200/[0.09]">
        {icon}
      </div>
      {meta && (
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-white/38">
          {meta}
        </p>
      )}
      <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
    </motion.article>
  )
}
