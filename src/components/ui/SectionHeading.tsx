import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
  accent?: boolean
  centered?: boolean
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeading({
  children,
  className,
  accent = false,
  centered = true,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        'font-heading font-bold text-[#032D51] text-3xl sm:text-4xl leading-tight tracking-tight',
        centered && 'text-center',
        accent && 'relative pb-4 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-16 after:rounded-full after:bg-[#F78F1E]',
        !centered && accent && 'after:left-0 after:translate-x-0',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
