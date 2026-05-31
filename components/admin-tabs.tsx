"use client"

import { useState, type ReactNode } from "react"

const TABS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "now", label: "Now" },
] as const

type TabId = (typeof TABS)[number]["id"]

export function AdminTabs({
  hero,
  about,
  projects,
  writing,
  now,
  counts,
}: {
  hero: ReactNode
  about: ReactNode
  projects: ReactNode
  writing: ReactNode
  now: ReactNode
  counts: Record<TabId, number>
}) {
  const [tab, setTab] = useState<TabId>("hero")

  const panels: Record<TabId, ReactNode> = { hero, about, projects, writing, now }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Admin sections"
        className="mb-5 flex w-full items-center gap-1 overflow-x-auto rounded-full border border-border/60 bg-card/60 p-1 backdrop-blur-sm sm:w-auto sm:inline-flex"
      >
        {TABS.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{t.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 font-mono text-[9px] tracking-normal ${
                  active ? "bg-background/20 text-background" : "bg-foreground/10 text-foreground/60"
                }`}
              >
                {counts[t.id]}
              </span>
            </button>
          )
        })}
      </div>

      <div>{panels[tab]}</div>
    </div>
  )
}
