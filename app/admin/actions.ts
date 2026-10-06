"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import type { ProjectKind, ProjectStatus } from "@/lib/types"
import { projectsByYear } from "@/lib/projects-data"
import { requireAdmin } from "@/lib/auth/require-admin"

const COVER_BUCKET = "project-covers"

function parseStack(raw: FormDataEntryValue | null): string[] {
  if (!raw || typeof raw !== "string") return []
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

async function uploadCoverIfPresent(
  formData: FormData,
  userId: string,
): Promise<string | null | undefined> {
  const file = formData.get("cover_file")
  if (!(file instanceof File) || file.size === 0) return undefined
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Cover image must be under 5MB")
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Cover must be an image")
  }

  const supabase = await createClient()
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase()
  const safeExt = ["jpg", "jpeg", "png", "webp", "avif", "gif"].includes(ext) ? ext : "jpg"
  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`

  const { error: uploadError } = await supabase.storage
    .from(COVER_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "image/jpeg",
    })

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`)
  }

  const { data: pub } = supabase.storage.from(COVER_BUCKET).getPublicUrl(path)
  return pub.publicUrl
}

function readForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim()
  const slug =
    String(formData.get("slug") ?? "").trim() ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  const description = String(formData.get("description") ?? "").trim()
  const kind = (String(formData.get("kind") ?? "side") as ProjectKind) || "side"
  const status = (String(formData.get("status") ?? "live") as ProjectStatus) || "live"
  const yearRaw = Number(formData.get("year"))
  const year = Number.isFinite(yearRaw) && yearRaw > 0 ? yearRaw : new Date().getFullYear()
  const stack = parseStack(formData.get("stack"))
  const live_url = String(formData.get("live_url") ?? "").trim() || null
  const repo_url = String(formData.get("repo_url") ?? "").trim() || null
  const cover_url = String(formData.get("cover_url") ?? "").trim() || null
  const positionRaw = Number(formData.get("position"))
  const position = Number.isFinite(positionRaw) ? positionRaw : 0

  return { title, slug, description, kind, status, year, stack, live_url, repo_url, cover_url, position }
}

export async function createProject(formData: FormData) {
  const user = await requireAdmin()
  const supabase = await createClient()

  const payload = readForm(formData)
  if (!payload.title) return { error: "Title is required" }

  let uploadedUrl: string | null | undefined
  try {
    uploadedUrl = await uploadCoverIfPresent(formData, user.id)
  } catch (e) {
    return { error: (e as Error).message }
  }
  if (typeof uploadedUrl === "string") payload.cover_url = uploadedUrl

  const { error } = await supabase.from("projects").insert({ ...payload, user_id: user.id })
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/all")
  revalidatePath("/")
  return { ok: true }
}

export async function updateProject(id: string, formData: FormData) {
  const user = await requireAdmin()
  const supabase = await createClient()

  const payload = readForm(formData)
  let uploadedUrl: string | null | undefined
  try {
    uploadedUrl = await uploadCoverIfPresent(formData, user.id)
  } catch (e) {
    return { error: (e as Error).message }
  }
  if (typeof uploadedUrl === "string") payload.cover_url = uploadedUrl

  const { error } = await supabase
    .from("projects")
    .update(payload)
    .eq("id", id)
    .eq("user_id", user.id)
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/all")
  revalidatePath("/")
  return { ok: true }
}

export async function deleteProject(id: string) {
  const user = await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase.from("projects").delete().eq("id", id).eq("user_id", user.id)
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/all")
  revalidatePath("/")
  return { ok: true }
}

function inferKind(kindLabel: string): ProjectKind {
  const k = kindLabel.toLowerCase()
  if (k.includes("event") || k.includes("talk") || k.includes("meetup")) return "event"
  if (k.includes("writing") || k.includes("article") || k.includes("blog")) return "writing"
  if (k.includes("open") || k.includes("oss")) return "open-source"
  if (k.includes("hackathon") || k.includes("experiment") || k.includes("learning")) return "experiment"
  if (k.includes("work") || k.includes("client")) return "work"
  return "side"
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function seedProjects() {
  const user = await requireAdmin()
  const supabase = await createClient()

  const { count, error: countError } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)

  if (countError) return { error: countError.message }
  if ((count ?? 0) > 0) {
    return { error: "You already have projects — clear them first or add new ones manually." }
  }

  const rows = projectsByYear.flatMap((group, gIndex) =>
    group.projects.map((p, pIndex) => ({
      user_id: user.id,
      title: p.title,
      slug: `${toSlug(p.title)}-${gIndex}${pIndex}`,
      description: p.description,
      kind: inferKind(p.kind),
      status: "live" as ProjectStatus,
      year: Number(group.year),
      stack: p.stack ?? [],
      live_url: p.links?.find((l) => /live/i.test(l.label))?.href ?? null,
      repo_url: p.links?.find((l) => /repo|github/i.test(l.label))?.href ?? null,
      cover_url: p.cover_url ?? null,
      position: pIndex,
    })),
  )

  if (rows.length === 0) return { ok: true, inserted: 0 }

  const { error } = await supabase.from("projects").insert(rows)
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/all")
  return { ok: true, inserted: rows.length }
}
