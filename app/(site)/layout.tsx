import type { ReactNode } from "react"
import { HeaderField } from "@/components/minimal/header-field"
import { SiteNav } from "@/components/minimal/site-nav"

/**
 * Shared chrome for the public site. Lives in a layout so the nav and the
 * dotted header stay mounted across navigations: no re-animating, and the
 * active pill slides from link to link.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh w-full overflow-x-clip">
      <HeaderField />
      <SiteNav />
      {children}
    </div>
  )
}
