"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { ProjectKind, ProjectStatus } from "@/lib/types"

const COVER_BUCKET = "project-covers"

function parseStack(raw: FormDataEntryValue | null): string[] {
  if (!raw || typeof raw !== "string") return []
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

async function uploadCoverIfPresent(formData: FormData): Promise<string | null | undefined> {
  const file = formData.get("cover_file")
  if (!(file instanceof File) || file.size === 0) return undefined
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Cover image must be under 5MB")
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase()
  const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

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
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const payload = readForm(formData)
  if (!payload.title) return { error: "Title is required" }

  let uploadedUrl: string | null | undefined
  try {
    uploadedUrl = await uploadCoverIfPresent(formData)
  } catch (e) {
    return { error: (e as Error).message }
  }
  if (typeof uploadedUrl === "string") payload.cover_url = uploadedUrl

  const { error } = await supabase.from("projects").insert({ ...payload, user_id: user.id })
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/all")
  return { ok: true }
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const payload = readForm(formData)
  let uploadedUrl: string | null | undefined
  try {
    uploadedUrl = await uploadCoverIfPresent(formData)
  } catch (e) {
    return { error: (e as Error).message }
  }
  if (typeof uploadedUrl === "string") payload.cover_url = uploadedUrl

  const { error } = await supabase.from("projects").update(payload).eq("id", id).eq("user_id", user.id)
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/all")
  return { ok: true }
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { error } = await supabase.from("projects").delete().eq("id", id).eq("user_id", user.id)
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/all")
  return { ok: true }
}
