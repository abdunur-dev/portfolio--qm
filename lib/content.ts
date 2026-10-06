import { posts as staticPosts, type Block } from "@/lib/posts-data"
import { projectsByYear as staticProjectsByYear } from "@/lib/projects-data"
import { createClient } from "@/lib/supabase/server"
import type { Post as DbPost, Project as DbProject } from "@/lib/types"

/**
 * Shared, read-only content loaders used by the public pages.
 * Each loader reads from Supabase first and falls back to the static
 * data in `lib/*-data.ts` when the table is empty or unreachable.
 */

export type ListPost = {
  title: string
  slug: string
  date: string
  year: number
  excerpt: string
  reading: string
  href?: string | null
  cover_url?: string | null
}

export type FullPost = ListPost & {
  image_urls: string[] | null
  body: string
  blocks: Block[]
}

export type FolioProject = {
  title: string
  kind: string
  year: string
  description: string
  stack: string[]
  cover_url?: string | null
  href?: string | null
  links: { label: string; href: string }[]
}

async function safeClient() {
  try {
    return await createClient()
  } catch {
    return null
  }
}

export async function getPosts(): Promise<ListPost[]> {
  const supabase = await safeClient()
  if (supabase) {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("year", { ascending: false })
      .order("position", { ascending: true })
      .order("created_at", { ascending: false })
    const rows = (data ?? []) as DbPost[]
    if (rows.length > 0) {
      return rows.map((p) => ({
        title: p.title,
        slug: p.slug,
        date: p.date_label,
        year: p.year,
        excerpt: p.excerpt,
        reading: p.reading,
        href: p.href,
        cover_url: p.cover_url,
      }))
    }
  }
  return staticPosts.map((p) => ({
    title: p.title,
    slug: p.slug,
    date: p.date,
    year: p.year,
    excerpt: p.excerpt,
    reading: p.reading,
    href: p.href ?? null,
    cover_url: p.cover_url ?? null,
  }))
}

export async function getPost(slug: string): Promise<FullPost | null> {
  const supabase = await safeClient()
  if (supabase) {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle()
    if (data) {
      const p = data as DbPost
      return {
        title: p.title,
        slug: p.slug,
        date: p.date_label,
        year: p.year,
        excerpt: p.excerpt,
        reading: p.reading,
        href: p.href,
        cover_url: p.cover_url,
        image_urls: p.image_urls ?? null,
        body: p.body ?? "",
        blocks: [],
      }
    }
  }

  const fallback = staticPosts.find((p) => p.slug === slug)
  if (!fallback) return null
  return {
    ...fallback,
    href: fallback.href ?? null,
    cover_url: fallback.cover_url ?? null,
    image_urls: fallback.image_urls ?? null,
    body: "",
    blocks: fallback.body ?? [],
  }
}

export async function getProjects(): Promise<FolioProject[]> {
  const supabase = await safeClient()
  if (supabase) {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("year", { ascending: false })
      .order("position", { ascending: true })
      .order("created_at", { ascending: false })
    const rows = (data ?? []) as DbProject[]
    if (rows.length > 0) {
      return rows.map((p) => {
        const links: { label: string; href: string }[] = []
        if (p.live_url) links.push({ label: "Live", href: p.live_url })
        if (p.repo_url) links.push({ label: "Repo", href: p.repo_url })
        return {
          title: p.title,
          kind: p.kind,
          year: String(p.year),
          description: p.description || "",
          stack: p.stack ?? [],
          cover_url: p.cover_url,
          href: p.live_url || p.repo_url || null,
          links,
        }
      })
    }
  }

  return staticProjectsByYear.flatMap((group) =>
    group.projects.map((p) => {
      const links = (p.links ?? []).filter((l) => l.href && l.href !== "#")
      return {
        title: p.title,
        kind: p.kind,
        year: group.year,
        description: p.description,
        stack: p.stack,
        cover_url: p.cover_url ?? null,
        href: links[0]?.href ?? null,
        links,
      }
    }),
  )
}

/** Group any list of items by a year key, newest year first. */
export function groupByYear<T>(items: T[], getYear: (item: T) => string | number) {
  const map = new Map<string, T[]>()
  for (const item of items) {
    const key = String(getYear(item))
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(item)
  }
  return [...map.entries()]
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, list]) => ({ year, items: list }))
}
