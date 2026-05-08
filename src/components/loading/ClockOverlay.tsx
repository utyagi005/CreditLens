import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { formatWorldClock } from '../../utils/time'

type ClockOverlayProps = {
  progress: number
  phrase: string
}

const worldClockUrl = 'https://www.timeanddate.com/worldclock/'

export function ClockOverlay({ progress, phrase }: ClockOverlayProps) {
  const reduceMotion = useReducedMotion()
  const [now, setNow] = useState(() => new Date())
  const clock = formatWorldClock(now, 'America/Toronto')

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <motion.a
      className="clock-overlay"
      href={worldClockUrl}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0.15 : 1.1, delay: 0.35 }}
      aria-label={`Open world clock. Current ${clock.zone} time is ${clock.time}.`}
    >
      <span className="clock-overlay__label">CreditLens world risk time</span>
      <span className="clock-overlay__time">{clock.time}</span>
      <span className="clock-overlay__date">
        {clock.date} · {clock.zone}
      </span>
      <span className="clock-overlay__phrase">{phrase}</span>
      <span className="clock-overlay__progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </span>
    </motion.a>
  )
}
