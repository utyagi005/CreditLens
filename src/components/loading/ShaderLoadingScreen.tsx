import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BlendFunction } from 'postprocessing'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import type { ShaderMaterial } from 'three'
import { Vector2 } from 'three'
import { loaderPhrases } from '../../data/content'
import './styles-import'
import fragmentShader from './shaders/blackHoleFragment.glsl?raw'
import vertexShader from './shaders/vertex.glsl?raw'
import { ClockOverlay } from './ClockOverlay'

type ShaderLoadingScreenProps = {
  onComplete: () => void
}

const loaderDuration = 5000

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value))
}

function BlackHolePlane({ durationMs, startedAt }: { durationMs: number; startedAt: number }) {
  const materialRef = useRef<ShaderMaterial | null>(null)
  const mouse = useRef(new Vector2(0.5, 0.5))
  const { size, viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uResolution: { value: new Vector2(size.width, size.height) },
      uMouse: { value: new Vector2(0.5, 0.5) },
    }),
    [size.height, size.width],
  )

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      mouse.current.set(event.clientX / window.innerWidth, event.clientY / window.innerHeight)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useFrame(({ clock }) => {
    if (!materialRef.current) return
    const shaderProgress = clamp01((performance.now() - startedAt) / durationMs)
    materialRef.current.uniforms.uTime.value = clock.elapsedTime
    materialRef.current.uniforms.uProgress.value = shaderProgress
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height)
    materialRef.current.uniforms.uMouse.value.lerp(mouse.current, 0.055)
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

function LoaderCanvas({
  durationMs,
  startedAt,
  prefersPerformance,
}: {
  durationMs: number
  startedAt: number
  prefersPerformance: boolean
}) {
  const dprCap = prefersPerformance ? 1.25 : 1.65

  return (
    <Canvas
      className="shader-loader__canvas"
      camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
      dpr={[1, dprCap]}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
    >
      <Suspense fallback={null}>
        <BlackHolePlane durationMs={durationMs} startedAt={startedAt} />
        <EffectComposer multisampling={0}>
          <Bloom intensity={prefersPerformance ? 0.26 : 0.34} luminanceThreshold={0.28} luminanceSmoothing={0.78} mipmapBlur={!prefersPerformance} />
          <ChromaticAberration offset={prefersPerformance ? [0.0006, 0.0009] : [0.0008, 0.0012]} radialModulation modulationOffset={0.22} />
          <Noise
            premultiply
            blendFunction={BlendFunction.SOFT_LIGHT}
            opacity={prefersPerformance ? 0 : 0.11}
          />
          <Vignette eskil={false} offset={0.25} darkness={0.72} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}

export function ShaderLoadingScreen({ onComplete }: ShaderLoadingScreenProps) {
  const reduceMotion = useReducedMotion()
  const duration = reduceMotion ? 1100 : loaderDuration
  const [startedAt] = useState(() => performance.now())
  const [percent, setPercent] = useState(0)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const prefersPerformance = useMemo(() => {
    if (typeof navigator === 'undefined') return false
    const lowCpu = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4
    const lowMemory =
      'deviceMemory' in navigator &&
      typeof navigator.deviceMemory === 'number' &&
      navigator.deviceMemory <= 4
    return lowCpu || lowMemory
  }, [])

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      const nextPercent = Math.min(100, Math.round(((performance.now() - startedAt) / duration) * 100))
      setPercent(nextPercent)
    }, reduceMotion ? 90 : 42)

    const phraseTimer = window.setInterval(() => {
      setPhraseIndex((index) => (index + 1) % loaderPhrases.length)
    }, reduceMotion ? 360 : 760)
    const completeTimer = window.setTimeout(onComplete, duration)
    const fallbackTimer = window.setTimeout(onComplete, duration + 1300)

    return () => {
      window.clearInterval(progressTimer)
      window.clearInterval(phraseTimer)
      window.clearTimeout(completeTimer)
      window.clearTimeout(fallbackTimer)
    }
  }, [duration, onComplete, reduceMotion, startedAt])

  const phrase = loaderPhrases[phraseIndex]

  return (
    <motion.div
      className="shader-loader"
      role="status"
      aria-live="polite"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.025, filter: 'blur(16px)' }}
      transition={{ duration: reduceMotion ? 0.2 : 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {reduceMotion ? (
        <div className="shader-loader__reduced" />
      ) : (
        <LoaderCanvas
          durationMs={duration}
          startedAt={startedAt}
          prefersPerformance={prefersPerformance}
        />
      )}
      <div className="shader-loader__haze" />
      <div className="shader-loader__grain" />
      <div className="shader-loader__brand">
        <span>CreditLens</span>
        <small>Private Credit Intelligence</small>
      </div>
      <ClockOverlay progress={percent} phrase={phrase} />
      <div className="shader-loader__footer">
        <AnimatePresence mode="wait">
          <motion.span
            key={phrase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            {phrase}
          </motion.span>
        </AnimatePresence>
        <strong>{percent}%</strong>
      </div>
    </motion.div>
  )
}
