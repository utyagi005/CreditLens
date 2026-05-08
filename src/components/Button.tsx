import { ArrowRight } from 'lucide-react'
import type { MouseEventHandler, ReactNode } from 'react'
import { ShaderButton, type ShaderButtonVariant } from './ui/ShaderButton'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'nav' | 'outline' | 'destructive' | 'icon'

type ButtonProps = {
  children?: ReactNode
  variant?: ButtonVariant
  icon?: ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
  loading?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

const variantMap: Record<ButtonVariant, ShaderButtonVariant> = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'ghost',
  nav: 'nav',
  outline: 'outline',
  destructive: 'destructive',
  icon: 'icon',
}

export function Button({
  children,
  variant = 'primary',
  icon,
  className,
  href,
  target,
  rel,
  loading,
  disabled,
  onClick,
  type,
  ...props
}: ButtonProps) {
  return (
    <ShaderButton
      variant={variantMap[variant]}
      icon={icon ?? (variant === 'icon' ? undefined : <ArrowRight size={16} aria-hidden="true" />)}
      className={className}
      href={href}
      target={target}
      rel={rel}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </ShaderButton>
  )
}
