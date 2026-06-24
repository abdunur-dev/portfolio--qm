"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/require-admin"
import { posts as staticPosts } from "@/lib/posts-data"
import { uploadImageIfPresent } from "@/lib/upload-image"

const NOW_BUCKET = "now-covers"
const POST_BUCKET = "post-covers"

function readPostForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim()
  const slug =
    String(formData.get("slug") ?? "").trim() ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  const excerpt = String(formData.get("excerpt") ?? "").trim()
  const body = String(formData.get("body") ?? "")
  const date_label = String(formData.get("date_label") ?? "").trim()
  const reading = String(formData.get("reading") ?? "").trim()
  const yearRaw = Number(formData.get("year"))
  const year = Number.isFinite(yearRaw) && yearRaw > 0 ? yearRaw : new Date().getFullYear()
  const href = String(formData.get("href") ?? "").trim() || null
  const cover_url = String(formData.get("cover_url") ?? "").trim() || null
  const image_urls_raw = String(formData.get("image_urls") ?? "").trim()
  const image_urls = image_urls_raw
    ? image_urls_raw
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url.length > 0 && url.startsWith("http"))
        .slice(0, 2) || null
    : null
  const published = formData.get("published") === "on" || formData.get("published") === "true"
  const positionRaw = Number(formData.get("position"))
  const position = Number.isFinite(positionRaw) ? positionRaw : 0

  return {
    title,
    slug,
    excerpt,
    body,
    date_label,
    reading,
    year,
    href,
    cover_url,
    image_urls,
    published,
    position,
  }
}

export async function createPost(formData: FormData) {
  const user = await requireAdmin()
  const supabase = await createClient()

  const payload = readPostForm(formData)
  if (!payload.title) return { error: "Title is required" }

  try {
    const uploaded = await uploadImageIfPresent(formData, "cover_file", POST_BUCKET, user.id)
    if (typeof uploaded === "string") payload.cover_url = uploaded
  } catch (e) {
    return { error: (e as Error).message }
  }

  const { error } = await supabase.from("posts").insert({ ...payload, user_id: user.id })
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/writing")
  revalidatePath(`/writing/${payload.slug}`)
  return { ok: true }
}

export async function updatePost(id: string, formData: FormData) {
  const user = await requireAdmin()
  const supabase = await createClient()

  const payload = readPostForm(formData)
  try {
    const uploaded = await uploadImageIfPresent(formData, "cover_file", POST_BUCKET, user.id)
    if (typeof uploaded === "string") payload.cover_url = uploaded
  } catch (e) {
    return { error: (e as Error).message }
  }

  const { error } = await supabase
    .from("posts")
    .update(payload)
    .eq("id", id)
    .eq("user_id", user.id)
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/writing")
  revalidatePath(`/writing/${payload.slug}`)
  return { ok: true }
}

export async function deletePost(id: string) {
  const user = await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase.from("posts").delete().eq("id", id).eq("user_id", user.id)
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/writing")
  return { ok: true }
}

export async function seedPosts() {
  const user = await requireAdmin()
  const supabase = await createClient()

  const { count, error: countError } = await supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
  if (countError) return { error: countError.message }
  if ((count ?? 0) > 0) return { error: "You already have posts." }

  const rows = staticPosts.map((p, i) => ({
    user_id: user.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    body: p.body
      ? p.body
          .map((b) => (b.type === "h2" ? `## ${b.text}` : b.text))
          .join("\n\n")
      : "",
    date_label: p.date,
    reading: p.reading,
    year: p.year,
    href: p.href ?? null,
    published: true,
    position: i,
  }))

  if (!rows.length) return { ok: true, inserted: 0 }
  const { error } = await supabase.from("posts").insert(rows)
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/writing")
  return { ok: true, inserted: rows.length }
}

// ---------------- Now sections ----------------

function readNowForm(formData: FormData) {
  const label = String(formData.get("label") ?? "").trim()
  const itemsRaw = String(formData.get("items") ?? "")
  const items = itemsRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
  const positionRaw = Number(formData.get("position"))
  const position = Number.isFinite(positionRaw) ? positionRaw : 0
  const cover_url = String(formData.get("cover_url") ?? "").trim() || null
  return { label, items, position, cover_url }
}

export async function createNowSection(formData: FormData) {
  const user = await requireAdmin()
  const supabase = await createClient()

  const payload = readNowForm(formData)
  if (!payload.label) return { error: "Label is required" }

  try {
    const uploaded = await uploadImageIfPresent(formData, "cover_file", NOW_BUCKET, user.id)
    if (typeof uploaded === "string") payload.cover_url = uploaded
  } catch (e) {
    return { error: (e as Error).message }
  }

  const { error } = await supabase
    .from("now_sections")
    .insert({ ...payload, user_id: user.id })
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/now")
  return { ok: true }
}

export async function updateNowSection(id: string, formData: FormData) {
  const user = await requireAdmin()
  const supabase = await createClient()

  const payload = readNowForm(formData)
  try {
    const uploaded = await uploadImageIfPresent(formData, "cover_file", NOW_BUCKET, user.id)
    if (typeof uploaded === "string") payload.cover_url = uploaded
  } catch (e) {
    return { error: (e as Error).message }
  }

  const { error } = await supabase
    .from("now_sections")
    .update(payload)
    .eq("id", id)
    .eq("user_id", user.id)
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/now")
  return { ok: true }
}

export async function deleteNowSection(id: string) {
  const user = await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase
    .from("now_sections")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/now")
  return { ok: true }
}

const STATIC_NOW = [
  {
    label: "building",
    items: [
      "Polishing TibebChain — small UX details on the reader and onboarding flow.",
      "Shipping a redesign of this site (the one you're on) with a Mayven-flavoured aesthetic.",
      "Sketching a tiny invoicing tool for freelancers who hate invoicing.",
    ],
  },
  {
    label: "learning",
    items: [
      "Going deeper on Next.js 16 cache components and server actions.",
      "Re-reading 'A Philosophy of Software Design' — slowly, with a pen.",
      "Brushing up on rust, mostly to feel humble again.",
    ],
  },
  {
    label: "reading",
    items: [
      "Mere Christianity — C.S. Lewis",
      "Shape Up — Ryan Singer",
      "The Pragmatic Programmer (revisited)",
    ],
  },
  {
    label: "listening to",
    items: [
      "lo-fi at 7am, post-rock at 11pm",
      "the Dwarkesh podcast on the bus",
      "Shai Linne on rotation",
    ],
  },
  {
    label: "elsewhere",
    items: [
      "Long walks. Trying to learn how to rest properly without checking my phone.",
      "Cooking more. Mostly East African food I grew up on.",
    ],
  },
]

export async function seedNowSections() {
  const user = await requireAdmin()
  const supabase = await createClient()

  const { count, error: countError } = await supabase
    .from("now_sections")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
  if (countError) return { error: countError.message }
  if ((count ?? 0) > 0) return { error: "You already have now sections." }

  const rows = STATIC_NOW.map((s, i) => ({
    user_id: user.id,
    label: s.label,
    items: s.items,
    position: i,
  }))
  const { error } = await supabase.from("now_sections").insert(rows)
  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/now")
  return { ok: true, inserted: rows.length }
}

// ---- Hero Section ----

export async function updateHero(formData: FormData) {
  const user = await requireAdmin()
  const supabase = await createClient()

  const title = String(formData.get("title") ?? "").trim()
  const subtitle = String(formData.get("subtitle") ?? "").trim()

  if (!title || !subtitle) return { error: "Title and subtitle are required" }

  const { error } = await supabase
    .from("user_settings")
    .upsert(
      {
        user_id: user.id,
        hero_title: title,
        hero_subtitle: subtitle,
      },
      { onConflict: "user_id" }
    )

  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/")
  return { ok: true }
}

// ---- About Section ----

export async function updateAbout(formData: FormData) {
  const user = await requireAdmin()
  const supabase = await createClient()

  const text = String(formData.get("text") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()

  if (!text || !description) return { error: "Both fields are required" }

  const { error } = await supabase
    .from("user_settings")
    .upsert(
      {
        user_id: user.id,
        about_text: text,
        about_description: description,
      },
      { onConflict: "user_id" }
    )

  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/about")
  return { ok: true }
}

// ---- Testimonials ----

export async function createTestimonial(data: {
  image?: string
  link?: string
}) {
  const user = await requireAdmin()
  const supabase = await createClient()

  const { data: inserted, error } = await supabase
    .from("testimonials")
    .insert({
      user_id: user.id,
      author: "",
      role: "",
      content: "",
      avatar: "",
      image: data.image || null,
      link: data.link || null,
    })
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/about")
  return { ok: true, data: inserted }
}

export async function updateTestimonial(
  id: string,
  data: { image?: string; link?: string }
) {
  const user = await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase
    .from("testimonials")
    .update({
      image: data.image || null,
      link: data.link || null,
    })
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/about")
  return { ok: true }
}

export async function deleteTestimonial(id: string) {
  const user = await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/about")
  return { ok: true }
}
