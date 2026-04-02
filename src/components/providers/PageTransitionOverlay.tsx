'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'

/**
 * Slim top progress bar on page navigation.
 * Sweeps in from the left, briefly pauses at ~85%, then completes and fades out.
 * Matches the brand orange without any heavy color blocking.
 */
export function PageTransitionOverlay() {
  const pathname = usePathname()
  const [barKey, setBarKey] = useState(0)
  const [visible, setVisible] = useState(false)
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    setBarKey((k) => k + 1)
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 700)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={barKey}
          aria-hidden
          className="fixed top-0 left-0 right-0 z-[9999] h-[3px] origin-left pointer-events-none"
          style={{ backgroundColor: '#F78F1E' }}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: [0, 0.6, 0.85, 1] }}
          exit={{ opacity: 0 }}
          transition={{
            scaleX: { duration: 0.65, times: [0, 0.4, 0.75, 1], ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.3, ease: 'easeOut' },
          }}
        />
      )}
    </AnimatePresence>
  )
}

      {/* Single panel: sweeps up to cover, holds briefly, sweeps up to reveal */}
