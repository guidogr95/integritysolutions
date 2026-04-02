'use client'

import { motion } from 'motion/react'

// ─── Shared easing ──────────────────────────────────────────────────────────
// Smooth "expo-out" feel common in high-end corporate sites
const ease = [0.22, 1, 0.36, 1] as const

// ─── FadeInSection ───────────────────────────────────────────────────────────
// Wraps any content with a scroll-triggered fade + subtle upward slide.
// Use once: true so the animation only plays on the first encounter.
interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Override vertical offset (default 28px) */
  y?: number
}

export function FadeInSection({
  children,
  className,
  delay = 0,
  y = 28,
}: FadeInSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── StaggerContainer + StaggerItem ─────────────────────────────────────────
// For lists/grids where each child should animate in with a small delay offset.
// Usage: wrap the list in <StaggerContainer>, each item in <StaggerItem>.
interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  /** Delay between each child (default 0.08s) */
  staggerDelay?: number
  /** Initial delay before the first child starts (default 0) */
  initialDelay?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  initialDelay = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ staggerChildren: staggerDelay, delayChildren: initialDelay }}
      variants={{
        hidden: {},
        visible: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  y?: number
}

export function StaggerItem({ children, className, y = 28 }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
// Animates an eyebrow + heading pair together when in view.
interface SectionHeaderProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedSectionHeader({ children, className }: SectionHeaderProps) {
  return (
    <FadeInSection className={className} y={20}>
      {children}
    </FadeInSection>
  )
}
