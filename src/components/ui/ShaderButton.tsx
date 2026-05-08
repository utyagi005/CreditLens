import { clsx } from 'clsx'
import { LoaderCircle } from 'lucide-react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'
import { useRef } from 'react'
import '../../styles/shader-button.css'

export type ShaderButtonVariant =
  | 'primary'
  | 'ghost'
  | 'outline'
  | 'destructive'
  | 'secondary'
  | 'nav'
  | 'icon'

type ShaderButtonProps = {
  children?: ReactNode
  variant?: ShaderButtonVariant
  icon?: ReactNode
  loading?: boolean
  href?: string
  target?: string
  rel?: string
  className?: string
  disabled?: boolean
  'aria-label'?: string
} & Omit<HTMLMotionProps<'button'>, 'children' | 'className' | 'disabled'>

export function ShaderButton({
  children,
  variant = 'primary',
  icon,
  loading = false,
  disabled,
  href,
  target,
  rel,
  className,
  onPointerMove,
  onPointerLeave,
  ...props
}: ShaderButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null)
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 170, damping: 22, mass: 0.45 })
  const springY = useSpring(y, { stiffness: 170, damping: 22, mass: 0.45 })

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const node = ref.current
    if (!node || disabled || reduceMotion) return

    const rect = node.getBoundingClientRect()
    const localX = event.clientX - rect.left
    const localY = event.clientY - rect.top
    const magnetX = (localX - rect.width / 2) * 0.12
    const magnetY = (localY - rect.height / 2) * 0.18

    node.style.setProperty('--shader-x', `${localX}px`)
    node.style.setProperty('--shader-y', `${localY}px`)
    x.set(magnetX)
    y.set(magnetY)
    onPointerMove?.(event as PointerEvent<HTMLButtonElement>)
  }

  const handlePointerLeave = (event: PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    x.set(0)
    y.set(0)
    onPointerLeave?.(event as PointerEvent<HTMLButtonElement>)
  }

  const classes = clsx(
    'shader-button',
    `shader-button--${variant}`,
    loading && 'shader-button--loading',
    className,
  )

  const content = (
    <>
      <span className="shader-button__aura" aria-hidden="true" />
      <span className="shader-button__surface" aria-hidden="true" />
      <span className="shader-button__shine" aria-hidden="true" />
      <span className="shader-button__content">
        {loading ? <LoaderCircle className="shader-button__spinner" size={16} aria-hidden="true" /> : icon}
        {children && <span>{children}</span>}
      </span>
    </>
  )

  if (href) {
    return (
      <motion.a
        ref={(node) => {
          ref.current = node
        }}
        className={classes}
        href={href}
        target={target}
        rel={rel}
        style={{ x: springX, y: springY }}
        whileHover={reduceMotion || disabled ? undefined : { scale: 1.018 }}
        whileTap={reduceMotion || disabled ? undefined : { scale: 0.982 }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-disabled={disabled || loading ? true : undefined}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={(node) => {
        ref.current = node
      }}
      className={classes}
      type="button"
      disabled={disabled || loading}
      style={{ x: springX, y: springY }}
      whileHover={reduceMotion || disabled ? undefined : { scale: 1.018 }}
      whileTap={reduceMotion || disabled ? undefined : { scale: 0.982 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {content}
    </motion.button>
  )
}
