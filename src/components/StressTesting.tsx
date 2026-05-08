import { motion } from 'framer-motion'
import { SlidersHorizontal, TimerReset } from 'lucide-react'
import { stressScenarios } from '../data/content'
import { SectionHeader } from './SectionHeader'

export function StressTesting() {
  return (
    <section className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeader
          eyebrow="Stress testing"
          title="Pressure-test downside cases before the committee asks."
          copy="Scenario logic ties operating assumptions to DSCR, interest coverage, covenant headroom, and recommendation changes."
        />
        <motion.div
          className="grid gap-3"
          initial={{ opacity: 0, x: 26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass-panel flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-[var(--radius-xs)] border border-white/10 bg-white/[0.055] text-cyan-100">
                <SlidersHorizontal size={18} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Scenario engine</p>
                <p className="text-xs text-[color:var(--muted)]">Updated across five downside paths</p>
              </div>
            </div>
            <TimerReset size={18} className="text-white/42" aria-hidden="true" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {stressScenarios.map((scenario, index) => (
              <motion.article
                key={scenario.title}
                className="stress-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white">{scenario.title}</h3>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] uppercase tracking-[0.13em] text-white/46">
                    {scenario.recommendation}
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    ['DSCR', scenario.dscr],
                    ['ICR', scenario.coverage],
                    ['Headroom', scenario.headroom],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[var(--radius-xs)] bg-black/22 p-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">{label}</p>
                      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
