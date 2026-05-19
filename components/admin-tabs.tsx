"use client"

import { useState, type ReactNode } from "react"

const TABS = [
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "now", label: "Now" },
] as const

type TabId = (typeof TABS)[number]["id"]

export function AdminTabs({
  projects,
  writing,
  now,
}: {
  projects: ReactNode
  writing: ReactNode
  now: ReactNode
}) {
  const [tab, setTab] = useState<TabId>("projects")

  const panels: Record<TabId, ReactNode> = {
    projects,
    writing,
    now,
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Admin sections"
        className="mb-6 inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/60 p-1 backdrop-blur-sm"
      >
        {TABS.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <div>{panels[tab]}</div>
    </div>
  )
}
