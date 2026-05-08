import { motion } from 'framer-motion'
import { AlertTriangle, BellRing, CircleDot, Gauge, LineChart, Network } from 'lucide-react'
import { dashboardRows } from '../data/content'
import { SectionHeader } from './SectionHeader'

const exposureTiles = [
  { label: 'Portfolio exposure', value: '$1.8B', icon: Network },
  { label: 'Risk migration', value: '+6.4%', icon: LineChart },
  { label: 'Covenant alerts', value: '17', icon: BellRing },
  { label: 'Stress loss at risk', value: '$42M', icon: AlertTriangle },
]

function RiskPill({ risk }: { risk: string }) {
  const tone =
    risk === 'Low'
      ? 'border-emerald-200/20 bg-emerald-300/10 text-emerald-100'
      : risk === 'Elevated'
        ? 'border-amber-200/25 bg-amber-300/10 text-amber-100'
        : 'border-cyan-200/20 bg-cyan-300/10 text-cyan-100'

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${tone}`}>
      {risk}
    </span>
  )
}

export function DashboardPreview() {
  return (
    <section id="dashboard" className="section-shell">
      <SectionHeader
        eyebrow="Analytics dashboard"
        title="Monitor every deal signal without losing IC context."
        copy="The platform keeps risk rating migration, sector allocation, watchlist names, relative value, and stress outputs close to the deal record."
      />
      <motion.div
        className="dashboard-shell"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/55">
              CreditLens workspace
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              Infrastructure Credit Review
            </h3>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/24 px-3 py-2 text-xs text-[color:var(--text-soft)]">
            <Gauge size={14} aria-hidden="true" />
            Risk model live
          </div>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4 lg:p-5">
          {exposureTiles.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.16em] text-white/38">{label}</p>
                <Icon size={16} className="text-cyan-100/70" aria-hidden="true" />
              </div>
              <p className="mt-5 text-2xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 p-4 pt-0 xl:grid-cols-[1.28fr_0.72fr] xl:p-5 xl:pt-0">
          <div className="overflow-hidden rounded-[var(--radius-sm)] border border-white/10">
            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full text-left">
                <thead className="bg-white/[0.04] text-[11px] uppercase tracking-[0.15em] text-white/38">
                  <tr>
                    {['Opportunity', 'Sector', 'Yield', 'Leverage', 'DSCR', 'Risk', 'Recommendation'].map(
                      (heading) => (
                        <th key={heading} className="px-4 py-3 font-medium">
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8">
                  {dashboardRows.map((row) => (
                    <tr key={row.opportunity} className="text-sm text-[color:var(--text-soft)]">
                      <td className="px-4 py-4 font-medium text-white">{row.opportunity}</td>
                      <td className="px-4 py-4">{row.sector}</td>
                      <td className="px-4 py-4">{row.yield}</td>
                      <td className="px-4 py-4">{row.leverage}</td>
                      <td className="px-4 py-4">{row.dscr}</td>
                      <td className="px-4 py-4">
                        <RiskPill risk={row.risk} />
                      </td>
                      <td className="px-4 py-4">{row.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.035] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/38">
                Sector allocation
              </p>
              <div className="mt-5 space-y-4">
                {[
                  ['Digital infra', '32%'],
                  ['Renewables', '24%'],
                  ['Transport', '21%'],
                  ['Energy', '13%'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-[color:var(--text-soft)]">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/8">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan-200 to-violet-200" style={{ width: value }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.035] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/38">
                Watchlist pulse
              </p>
              <div className="mt-4 space-y-3">
                {['Toll Road Concession', 'Logistics Term Loan', 'Data Center HoldCo'].map((name) => (
                  <div key={name} className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2 text-white">
                      <CircleDot size={12} className="text-amber-100" aria-hidden="true" />
                      {name}
                    </span>
                    <span className="text-xs text-[color:var(--muted)]">Review</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
