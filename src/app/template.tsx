/**
 * Next.js App Router template.tsx — re-instantiated on every page navigation.
 * Uses a pure CSS animation to avoid SSR/client hydration mismatches that
 * occur when Framer Motion writes inline styles during server rendering.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-page-enter">
      {children}
    </div>
  )
}
