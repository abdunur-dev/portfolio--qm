"use client"

import { useState, useTransition, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Pencil, Sparkles, EyeOff, Link2, Image as ImageIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AdminCoverField } from "@/components/admin-cover-field"
import { MarkdownBody } from "@/components/markdown-body"
import {
  createPost,
  updatePost,
  deletePost,
  seedPosts,
} from "@/app/admin/content-actions"
import type { Post } from "@/lib/types"

export function AdminPostList({ posts }: { posts: Post[] }) {
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [seeding, startSeed] = useTransition()
  const [seedError, setSeedError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-4 py-3 backdrop-blur-sm">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Writing
          </p>
          <p className="text-sm text-foreground">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingId(null)
            setCreating((v) => !v)
          }}
          variant={creating ? "secondary" : "default"}
          size="lg"
          className="shadow-sm"
        >
          <Plus className={`mr-1.5 h-4 w-4 transition-transform ${creating ? "rotate-45" : ""}`} />
          {creating ? "Close" : "Add new post"}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {creating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
              <h3 className="mb-4 font-serif text-2xl">New post</h3>
              <PostForm mode="create" onDone={() => setCreating(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
        {posts.length === 0 && (
          <li className="px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No posts yet. Click <span className="text-foreground">New post</span>, or import from your existing writing list.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              disabled={seeding}
              onClick={() => {
                setSeedError(null)
                startSeed(async () => {
                  const res = await seedPosts()
                  if (res?.error) setSeedError(res.error)
                })
              }}
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              {seeding ? "Importing…" : "Import existing posts"}
            </Button>
            {seedError && <p className="mt-3 text-xs text-destructive">{seedError}</p>}
          </li>
        )}

        {posts.map((p) => {
          const isEditing = editingId === p.id
          return (
            <li key={p.id} className="px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-xl text-foreground">{p.title}</h3>
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] uppercase tracking-wider"
                    >
                      {p.year}
                    </Badge>
                    {!p.published && (
                      <Badge
                        variant="outline"
                        className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                      >
                        <EyeOff className="mr-1 h-3 w-3" /> draft
                      </Badge>
                    )}
                  </div>
                  {p.excerpt && (
                    <p className="mt-1 line-clamp-2 text-sm text-foreground/70">{p.excerpt}</p>
                  )}
                  <p className="mt-2 font-mono text-xs text-muted-foreground">
                    /writing/{p.slug} · {p.date_label || "no date"} · {p.reading || "—"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCreating(false)
                      setEditingId(isEditing ? null : p.id)
                    }}
                  >
                    <Pencil className="mr-1 h-3.5 w-3.5" />
                    {isEditing ? "Close" : "Edit"}
                  </Button>
                  <DeletePostButton id={p.id} />
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 rounded-xl border border-border/60 bg-background/40 p-5">
                      <PostForm mode="edit" initial={p} onDone={() => setEditingId(null)} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function PostForm({
  initial,
  mode,
  onDone,
}: {
  initial?: Post
  mode: "create" | "edit"
  onDone?: () => void
}) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [bodyText, setBodyText] = useState(initial?.body ?? "")
  const [showPreview, setShowPreview] = useState(false)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  function insertLink() {
    const textarea = bodyRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = bodyText.slice(start, end)

    const url = window.prompt("Enter the link URL:", "https://")
    if (!url) return

    const label =
      selectedText ||
      window.prompt("Enter the text to display for this link:", "") ||
      url

    const markdown = `[${label}](${url})`
    const newText = bodyText.slice(0, start) + markdown + bodyText.slice(end)
    setBodyText(newText)

    // Restore focus and place cursor after the inserted link
    requestAnimationFrame(() => {
      textarea.focus()
      const cursorPos = start + markdown.length
      textarea.setSelectionRange(cursorPos, cursorPos)
    })
  }

  function insertImageUrl() {
    const textarea = bodyRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const imageUrl = window.prompt("Enter the image URL:", "https://")
    if (!imageUrl) return

    const altText = window.prompt("Enter alt text for the image:", "") || "image"

    const markdown = `![${altText}](${imageUrl})`
    const newText = bodyText.slice(0, start) + markdown + bodyText.slice(end)
    setBodyText(newText)

    requestAnimationFrame(() => {
      textarea.focus()
      const cursorPos = start + markdown.length
      textarea.setSelectionRange(cursorPos, cursorPos)
    })
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const textarea = bodyRef.current
    if (!textarea) return

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const data = await response.json()
      const imageUrl = data.url

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const altText = file.name.replace(/\.[^/.]+$/, "") || "image"

      const markdown = `![${altText}](${imageUrl})`
      const newText = bodyText.slice(0, start) + markdown + bodyText.slice(end)
      setBodyText(newText)

      requestAnimationFrame(() => {
        textarea.focus()
        const cursorPos = start + markdown.length
        textarea.setSelectionRange(cursorPos, cursorPos)
      })
    } catch (error) {
      alert("Failed to upload image. Please try again.")
      console.error("Upload error:", error)
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res =
        mode === "create" ? await createPost(formData) : await updatePost(initial!.id, formData)
      if (res?.error) {
        setError(res.error)
        return
      }
      onDone?.()
    })
  }

  return (
    <form action={handleSubmit} encType="multipart/form-data" className="grid gap-5">
      <Field label="Title" name="title" defaultValue={initial?.title} required />

      <div className="grid gap-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Excerpt</Label>
        <Textarea
          name="excerpt"
          rows={2}
          defaultValue={initial?.excerpt ?? ""}
          placeholder="One or two sentences shown on the writing list."
          className="resize-none"
        />
      </div>

      <AdminCoverField
        initialUrl={initial?.cover_url}
        label="Cover image (optional)"
        aspect="wide"
      />

      <div className="grid gap-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Blog images (1-2 images)</Label>
        <Input
          name="image_urls"
          placeholder="Paste image URLs separated by comma (e.g., https://img1.com/pic1.jpg, https://img2.com/pic2.jpg)"
          defaultValue={initial?.image_urls?.join(", ") ?? ""}
        />
        <p className="text-[10px] text-muted-foreground">Add 1 or 2 images to display in the blog post. Paste direct image URLs separated by commas.</p>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Body (Markdown)
          </Label>
          <div className="flex items-center gap-2">
            {!showPreview && (
              <>
                <button
                  type="button"
                  onClick={insertLink}
                  className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-secondary/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Link2 className="h-3 w-3" />
                  Insert link
                </button>
                <button
                  type="button"
                  onClick={insertImageUrl}
                  className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-secondary/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <ImageIcon className="h-3 w-3" />
                  Image URL
                </button>
                <label className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-border/60 bg-secondary/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload className="h-3 w-3" />
                  Upload image
                </label>
              </>
            )}
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              className="rounded-md border border-border/60 bg-secondary/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {showPreview ? "Edit" : "Preview"}
            </button>
          </div>
        </div>
        {showPreview ? (
          <div className="min-h-[15rem] rounded-lg border border-border/60 bg-background/60 p-5">
            {bodyText.trim() ? (
              <MarkdownBody content={bodyText} />
            ) : (
              <p className="py-8 text-center font-mono text-xs text-muted-foreground">
                Nothing to preview yet — start writing in the editor.
              </p>
            )}
          </div>
        ) : (
          <Textarea
            ref={bodyRef}
            name="body"
            rows={12}
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            placeholder={`# My Post Title\n\nWrite your post in **Markdown**.\n\n## A subheading\n\nA paragraph with *italic* and [links](https://example.com).\n\n- List item one\n- List item two\n\n> A blockquote for emphasis.`}
            className="font-mono text-sm"
          />
        )}
        <p className="font-mono text-[10px] text-muted-foreground">
          Supports **bold**, *italic*, ## headings, - lists, {">"} blockquotes, [links](url), `code`, and --- dividers.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Date label" name="date_label" defaultValue={initial?.date_label ?? ""} placeholder="Mar 2026" />
        <Field label="Reading" name="reading" defaultValue={initial?.reading ?? ""} placeholder="5 min read" />
        <Field
          label="Year"
          name="year"
          type="number"
          defaultValue={initial?.year ?? new Date().getFullYear()}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Slug"
          name="slug"
          defaultValue={initial?.slug ?? ""}
          placeholder="auto from title"
        />
        <Field
          label="External link (optional)"
          name="href"
          type="url"
          defaultValue={initial?.href ?? ""}
          placeholder="https://… (overrides post page)"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Order"
          name="position"
          type="number"
          defaultValue={initial?.position ?? 0}
        />
        <label className="flex items-center gap-2 self-end pb-2 text-sm text-foreground/80">
          <input
            type="checkbox"
            name="published"
            defaultChecked={initial?.published ?? true}
            className="h-4 w-4 rounded border-border accent-foreground"
          />
          Published (visible on /writing)
        </label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-4">
        {onDone && (
          <Button type="button" variant="ghost" onClick={onDone} disabled={pending}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : mode === "create" ? "Add post" : "Save changes"}
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  required,
}: {
  label: string
  name: string
  type?: string
  defaultValue?: string | number | null
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}

function DeletePostButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this post? This cannot be undone.")) return
        startTransition(async () => {
          await deletePost(id)
        })
      }}
      className="text-muted-foreground hover:text-destructive"
    >
      {pending ? "Deleting…" : "Delete"}
    </Button>
  )
}
