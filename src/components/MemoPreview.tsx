import { motion } from 'framer-motion'
import { BookOpenText, CheckCircle2, FileText, LockKeyhole, Sparkles } from 'lucide-react'
import { memoSections } from '../data/content'
import { Button } from './Button'
import { SectionHeader } from './SectionHeader'

export function MemoPreview() {
  return (
    <section id="memo" className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <motion.div
          className="memo-sheet"
          initial={{ opacity: 0, y: 28, rotateX: 5 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/60">
                Investment Committee Memo
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Logistics Term Loan
              </h3>
            </div>
            <div className="flex size-11 items-center justify-center rounded-[var(--radius-xs)] border border-white/12 bg-white/[0.055] text-cyan-100">
              <FileText size={20} aria-hidden="true" />
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {memoSections.map((section, index) => (
              <div
                key={section}
                className="flex items-center justify-between gap-4 rounded-[var(--radius-xs)] border border-white/8 bg-white/[0.03] px-4 py-3"
              >
                <span className="flex items-center gap-3 text-sm text-[color:var(--text-soft)]">
                  <span className="text-[11px] text-white/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section}
                </span>
                <CheckCircle2 size={15} className="text-cyan-100/65" aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[var(--radius-sm)] border border-cyan-100/14 bg-cyan-200/[0.055] p-4">
            <p className="text-sm leading-6 text-cyan-50/78">
              Recommendation: proceed subject to tighter quarterly covenant
              package, sponsor equity cure language, and a 50 bps spread premium
              versus comparable direct lending risk.
            </p>
          </div>
        </motion.div>
        <div>
          <SectionHeader
            eyebrow="IC memo generation"
            title="Turn analysis into a controlled investment narrative."
            copy="CreditLens translates model outputs, relative value context, risk flags, and monitoring commitments into memo sections your committee can interrogate."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: BookOpenText, label: 'Traceable assumptions' },
              { icon: LockKeyhole, label: 'Permissioned memo drafts' },
              { icon: Sparkles, label: 'Generated recommendation logic' },
              { icon: CheckCircle2, label: 'Monitoring plan handoff' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="glass-panel flex items-center gap-3 p-4">
                <Icon size={18} className="text-cyan-100" aria-hidden="true" />
                <span className="text-sm font-medium text-[color:var(--text-soft)]">{label}</span>
              </div>
            ))}
          </div>
          <Button href="#demo" className="mt-7">
            Generate Memo
          </Button>
        </div>
      </div>
    </section>
  )
}
