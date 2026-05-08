import { motion } from 'framer-motion'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  copy?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  copy,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <motion.div
      className={align === 'center' ? 'mx-auto mb-10 max-w-3xl text-center' : 'mb-10 max-w-3xl'}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/62">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.01em] text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {copy && <p className="mt-5 text-base leading-7 text-[color:var(--muted)]">{copy}</p>}
    </motion.div>
  )
}
