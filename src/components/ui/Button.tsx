import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

interface ButtonAsButtonProps extends ButtonBaseProps {
  href?: undefined
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string
  type?: undefined
  disabled?: undefined
  onClick?: undefined
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#F78F1E] text-white hover:bg-[#E4821A] focus-visible:ring-[#F78F1E]/50',
  secondary:
    'bg-[#032D51] text-white hover:bg-[#1C4990] focus-visible:ring-[#032D51]/50',
  outline:
    'border-2 border-[#F78F1E] text-[#F78F1E] hover:bg-[#F78F1E] hover:text-white focus-visible:ring-[#F78F1E]/50',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-[6px] font-semibold font-heading tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

  if (href !== undefined) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(props as ButtonAsButtonProps)}>
      {children}
    </button>
  )
}
