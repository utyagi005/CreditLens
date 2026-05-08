import { motion, useReducedMotion } from 'framer-motion'
import { metricChips } from '../data/content'
import { MetricChip } from './MetricChip'

type RiskFieldVisualProps = {
  mode?: 'loader' | 'hero'
}

const particleLabels = ['DSCR', 'LTV', 'Spread', 'ICR', 'WAL', 'VaR']

export function RiskFieldVisual({ mode = 'hero' }: RiskFieldVisualProps) {
  const reduceMotion = useReducedMotion()
  const isLoader = mode === 'loader'

  return (
    <div
      className={
        isLoader
          ? 'risk-field risk-field-loader'
          : 'risk-field risk-field-hero'
      }
      aria-hidden="true"
    >
      <motion.div
        className="risk-orbit risk-orbit-outer"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: isLoader ? 22 : 34, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="risk-orbit risk-orbit-middle"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: isLoader ? 16 : 28, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="risk-orbit risk-orbit-inner"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: isLoader ? 10 : 18, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="risk-core"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.045, 0.985, 1],
                filter: [
                  'brightness(1)',
                  'brightness(1.12)',
                  'brightness(0.94)',
                  'brightness(1)',
                ],
              }
        }
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="risk-core-lens" />
        <div className="risk-core-shadow" />
      </motion.div>
      <div className="risk-crosshair" />
      <div className="risk-horizon" />
      {particleLabels.map((label, index) => (
        <motion.span
          key={label}
          className={`risk-particle risk-particle-${index + 1}`}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.32, 0.76, 0.38],
                  y: [0, index % 2 === 0 ? -8 : 8, 0],
                }
          }
          transition={{
            duration: 3.8 + index * 0.35,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {label}
        </motion.span>
      ))}
      {!isLoader && (
        <div className="pointer-events-none absolute inset-0">
          {metricChips.map((chip, index) => (
            <MetricChip
              key={chip.label}
              {...chip}
              delay={0.55 + index * 0.08}
              className={`hero-chip hero-chip-${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
