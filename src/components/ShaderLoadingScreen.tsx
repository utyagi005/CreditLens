import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { loaderPhrases } from '../data/content'
import { RiskFieldVisual } from './RiskFieldVisual'

type ShaderLoadingScreenProps = {
  onComplete: () => void
}

export function ShaderLoadingScreen({ onComplete }: ShaderLoadingScreenProps) {
  const reduceMotion = useReducedMotion()
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [progress, setProgress] = useState(6)
  const duration = reduceMotion ? 900 : 3300
  const phraseDuration = reduceMotion ? 320 : 720

  useEffect(() => {
    const phraseTimer = window.setInterval(() => {
      setPhraseIndex((index) => (index + 1) % loaderPhrases.length)
    }, phraseDuration)

    const start = performance.now()
    const tick = () => {
      const elapsed = performance.now() - start
      setProgress(Math.min(100, Math.round((elapsed / duration) * 100)))
      if (elapsed < duration) {
        window.requestAnimationFrame(tick)
      }
    }
    const frame = window.requestAnimationFrame(tick)
    const completeTimer = window.setTimeout(onComplete, duration)
    const fallbackTimer = window.setTimeout(onComplete, duration + 1200)

    return () => {
      window.clearInterval(phraseTimer)
      window.cancelAnimationFrame(frame)
      window.clearTimeout(completeTimer)
      window.clearTimeout(fallbackTimer)
    }
  }, [duration, onComplete, phraseDuration])

  const phrase = useMemo(() => loaderPhrases[phraseIndex], [phraseIndex])

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid min-h-screen place-items-center overflow-hidden bg-[color:var(--background)] text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.035, filter: 'blur(18px)' }}
      transition={{ duration: reduceMotion ? 0.2 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
    >
      <div className="loader-field" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,17,0.12)_46%,rgba(2,6,17,0.9)_100%)]" />
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-7"
        >
          <div className="text-sm font-semibold uppercase tracking-[0.48em] text-cyan-100/80">
            CreditLens
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.24em] text-white/38">
            Private Credit Intelligence
          </div>
        </motion.div>
        <RiskFieldVisual mode="loader" />
        <div className="mt-8 w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.p
              key={phrase}
              className="text-sm font-medium uppercase tracking-[0.22em] text-white/78"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32 }}
            >
              {phrase}
            </motion.p>
          </AnimatePresence>
          <div className="mt-5 h-px overflow-hidden rounded-full bg-white/12">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-slate-300 via-cyan-200 to-violet-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/38">
            <span>DSCR</span>
            <span className="h-1 w-1 rounded-full bg-white/28" />
            <span>Leverage</span>
            <span className="h-1 w-1 rounded-full bg-white/28" />
            <span>Covenant Risk</span>
            <span className="h-1 w-1 rounded-full bg-white/28" />
            <span>Relative Value</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
