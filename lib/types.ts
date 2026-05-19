export type ProjectKind =
  | "work"
  | "side"
  | "experiment"
  | "open-source"
  | "writing"
  | "event"
export type ProjectStatus = "live" | "wip" | "archived" | "concept"

export type Project = {
  id: string
  user_id: string
  title: string
  slug: string
  description: string
  kind: ProjectKind
  year: number
  status: ProjectStatus
  stack: string[]
  live_url: string | null
  repo_url: string | null
  cover_url: string | null
  position: number
  created_at: string
  updated_at: string
}

export const PROJECT_KINDS: ProjectKind[] = [
  "work",
  "side",
  "experiment",
  "open-source",
  "writing",
  "event",
]
export const PROJECT_STATUSES: ProjectStatus[] = ["live", "wip", "archived", "concept"]
