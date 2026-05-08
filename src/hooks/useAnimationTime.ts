import { useEffect, useRef, useState } from 'react'

type AnimationTimeOptions = {
  durationMs?: number
  disabled?: boolean
}

export function useAnimationTime({
  durationMs = 5000,
  disabled = false,
}: AnimationTimeOptions = {}) {
  const startRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)
  const [elapsedMs, setElapsedMs] = useState(0)

  useEffect(() => {
    if (disabled) {
      return undefined
    }

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const elapsed = Math.min(durationMs, now - startRef.current)
      setElapsedMs(elapsed)

      if (elapsed < durationMs) {
        frameRef.current = window.requestAnimationFrame(tick)
      }
    }

    frameRef.current = window.requestAnimationFrame(tick)

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [disabled, durationMs])

  const effectiveElapsedMs = disabled ? durationMs : elapsedMs

  return {
    elapsedMs: effectiveElapsedMs,
    progress: Math.min(1, effectiveElapsedMs / durationMs),
    percent: Math.min(100, Math.round((effectiveElapsedMs / durationMs) * 100)),
  }
}
