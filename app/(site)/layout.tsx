import type { ReactNode } from "react"
import { HeaderField } from "@/components/minimal/header-field"
import { Letterhead } from "@/components/minimal/letterhead"

/**
 * Shared chrome for the public site. Lives in a layout so the letterhead and
 * the dotted header stay mounted across navigations (the signature only
 * writes itself in once).
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh w-full overflow-x-clip">
      <HeaderField />
      <Letterhead />
      {children}
    </div>
  )
}
