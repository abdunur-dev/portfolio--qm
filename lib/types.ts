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

export type Post = {
  id: string
  user_id: string
  title: string
  slug: string
  excerpt: string
  body: string
  date_label: string
  reading: string
  year: number
  href: string | null
  cover_url: string | null
  image_urls?: string[] | null
  published: boolean
  position: number
  created_at: string
  updated_at: string
}

export type NowSection = {
  id: string
  user_id: string
  label: string
  items: string[]
  cover_url: string | null
  position: number
  created_at: string
  updated_at: string
}
