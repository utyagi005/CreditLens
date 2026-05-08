import { motion, useReducedMotion } from 'framer-motion'

export function CinematicBackground() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[color:var(--background)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-12%,rgba(111,146,255,0.18),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(57,213,255,0.11),transparent_28%),linear-gradient(180deg,#02040a_0%,#060914_42%,#03050a_100%)]" />
      <motion.div
        className="absolute left-1/2 top-24 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(89,177,255,0.18),rgba(105,74,255,0.07)_36%,transparent_66%)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.08, 0.98, 1], opacity: [0.68, 0.86, 0.62, 0.68] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 cinematic-grid opacity-[0.34]" />
      <div className="absolute inset-0 cinematic-contours opacity-[0.22]" />
      <div className="absolute inset-0 noise-layer opacity-[0.16]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/65 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black/72 to-transparent" />
    </div>
  )
}
