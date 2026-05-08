import { ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'nav'

type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  icon?: ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'border-cyan-200/35 bg-[linear-gradient(135deg,rgba(255,255,255,0.20),rgba(76,201,255,0.18)_38%,rgba(122,92,255,0.16))] text-white shadow-[0_0_38px_rgba(83,173,255,0.22)] hover:border-cyan-100/65 hover:shadow-[0_0_54px_rgba(83,173,255,0.34)]',
  secondary:
    'border-white/14 bg-white/[0.055] text-[color:var(--text-soft)] hover:border-white/28 hover:bg-white/[0.09] hover:text-white',
  ghost:
    'border-transparent bg-transparent text-[color:var(--muted)] hover:border-white/12 hover:bg-white/[0.045] hover:text-white',
  nav:
    'border-white/12 bg-white/[0.06] px-4 py-2 text-xs text-white hover:border-cyan-200/32 hover:bg-cyan-200/[0.08]',
}

export function Button({
  children,
  variant = 'primary',
  icon,
  className,
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
        {icon ?? <ArrowRight size={16} aria-hidden="true" />}
      </span>
      <span
        className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-70"
        aria-hidden="true"
      />
    </>
  )

  const classes = clsx(
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[var(--radius-xs)] border px-5 py-3 text-sm font-semibold transition duration-[var(--motion-fast)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 active:scale-[0.985]',
    variantClass[variant],
    className,
  )

  if (href) {
    return (
      <a className={classes} href={href} target={target} rel={rel}>
        {content}
      </a>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      {content}
    </button>
  )
}
