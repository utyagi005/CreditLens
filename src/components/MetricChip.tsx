import { clsx } from 'clsx'
import { motion } from 'framer-motion'

type MetricChipProps = {
  label: string
  value: string
  tone?: string
  className?: string
  delay?: number
}

const toneClass: Record<string, string> = {
  cyan: 'border-cyan-200/25 bg-cyan-300/[0.075] text-cyan-50',
  violet: 'border-violet-200/25 bg-violet-300/[0.075] text-violet-50',
  silver: 'border-white/18 bg-white/[0.06] text-white',
  amber: 'border-amber-200/25 bg-amber-300/[0.08] text-amber-50',
}

export function MetricChip({
  label,
  value,
  tone = 'silver',
  className,
  delay = 0,
}: MetricChipProps) {
  return (
    <motion.div
      className={clsx(
        'metric-chip rounded-[var(--radius-xs)] border px-3 py-2 backdrop-blur-xl',
        toneClass[tone],
        className,
      )}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="block text-[10px] font-medium uppercase leading-none tracking-[0.18em] text-white/48">
        {label}
      </span>
      <span className="mt-1 block text-sm font-semibold leading-none">{value}</span>
    </motion.div>
  )
}
