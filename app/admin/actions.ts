"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { ProjectKind, ProjectStatus } from "@/lib/types"

function parseStack(raw: FormDataEntryValue | null): string[] {
  if (!raw || typeof raw !== "string") return []
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
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
