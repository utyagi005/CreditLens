import { motion } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  CandlestickChart,
  Layers3,
  LineChart,
  Network,
} from 'lucide-react'
import { monitoringFeatures } from '../data/content'
import { SectionHeader } from './SectionHeader'

const icons = [AlertTriangle, Activity, LineChart, CandlestickChart, Network, Layers3]

export function PortfolioMonitoring() {
  return (
    <section id="monitoring" className="section-shell">
      <SectionHeader
        eyebrow="Portfolio monitoring"
        title="Detect covenant risk and portfolio drift while there is still time to act."
        copy="The monitoring layer connects quarterly reporting, lender package updates, and watchlist logic into a single decision surface."
        align="center"
      />
      <div className="monitoring-grid">
        {monitoringFeatures.map((feature, index) => {
          const Icon = icons[index]
          return (
            <motion.article
              key={feature}
              className="monitoring-card"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
            >
              <div className="flex size-10 items-center justify-center rounded-[var(--radius-xs)] border border-white/10 bg-white/[0.055] text-cyan-100">
                <Icon size={18} aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{feature}</h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                Live signal monitoring, audit notes, and exception trails for
                portfolio teams managing private market debt exposure.
              </p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
