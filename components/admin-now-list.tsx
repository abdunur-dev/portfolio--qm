"use client"

import { useState, useTransition } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Pencil, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  createNowSection,
  updateNowSection,
  deleteNowSection,
  seedNowSections,
} from "@/app/admin/content-actions"
import type { NowSection } from "@/lib/types"

export function AdminNowList({ sections }: { sections: NowSection[] }) {
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [seeding, startSeed] = useTransition()
  const [seedError, setSeedError] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-4 py-3 backdrop-blur-sm">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Now page
          </p>
          <p className="text-sm text-foreground">
            {sections.length} {sections.length === 1 ? "section" : "sections"}
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
          {creating ? "Close" : "Add new section"}
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
              <h3 className="mb-4 font-serif text-2xl">New section</h3>
              <NowForm mode="create" onDone={() => setCreating(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
        {sections.length === 0 && (
          <li className="px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No sections yet. Click <span className="text-foreground">New section</span>, or import the defaults.
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
                  const res = await seedNowSections()
                  if (res?.error) setSeedError(res.error)
                })
              }}
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              {seeding ? "Importing…" : "Import default sections"}
            </Button>
            {seedError && <p className="mt-3 text-xs text-destructive">{seedError}</p>}
          </li>
        )}

        {sections.map((s) => {
          const isEditing = editingId === s.id
          return (
            <li key={s.id} className="px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
                    {s.label}
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-foreground/75">
                    {s.items.slice(0, 3).map((it, i) => (
                      <li key={i} className="line-clamp-1">· {it}</li>
                    ))}
                    {s.items.length > 3 && (
                      <li className="text-xs text-muted-foreground">+ {s.items.length - 3} more</li>
                    )}
                  </ul>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCreating(false)
                      setEditingId(isEditing ? null : s.id)
                    }}
                  >
                    <Pencil className="mr-1 h-3.5 w-3.5" />
                    {isEditing ? "Close" : "Edit"}
                  </Button>
                  <DeleteNowButton id={s.id} />
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
                      <NowForm mode="edit" initial={s} onDone={() => setEditingId(null)} />
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

function NowForm({
  initial,
  mode,
  onDone,
}: {
  initial?: NowSection
  mode: "create" | "edit"
  onDone?: () => void
}) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [urlPreview, setUrlPreview] = useState<string>(initial?.cover_url ?? "")
  const [filePreview, setFilePreview] = useState<string | null>(null)

  function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res =
        mode === "create"
          ? await createNowSection(formData)
          : await updateNowSection(initial!.id, formData)
      if (res?.error) {
        setError(res.error)
        return
      }
      onDone?.()
    })
  }

  const previewSrc = filePreview || urlPreview || initial?.cover_url || null

  return (
    <form action={handleSubmit} encType="multipart/form-data" className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
        <div className="grid gap-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Label</Label>
          <Input
            name="label"
            defaultValue={initial?.label ?? ""}
            required
            placeholder="building, learning, reading…"
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Order</Label>
          <Input name="position" type="number" defaultValue={initial?.position ?? 0} />
        </div>
      </div>

      <div className="grid gap-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
          Items (one per line)
        </Label>
        <Textarea
          name="items"
          rows={6}
          defaultValue={initial?.items?.join("\n") ?? ""}
          placeholder={`Polishing TibebChain…\nSketching a tiny invoicing tool…`}
          className="resize-none"
        />
      </div>

      <div className="grid gap-3 rounded-xl border border-border/60 bg-background/40 p-4">
        <div className="flex items-center justify-between">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Section image (optional)
          </Label>
          {previewSrc && (
            <span className="font-mono text-[10px] text-muted-foreground">preview</span>
          )}
        </div>
        {previewSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewSrc || "/placeholder.svg"}
            alt=""
            onError={() => {
              if (filePreview) return
              setError("Couldn't load that URL — the host may be blocking it. Try uploading the file instead.")
            }}
            className="aspect-[3/2] w-full rounded-lg border border-border/60 object-cover"
          />
        ) : (
          <div className="flex aspect-[3/2] w-full items-center justify-center rounded-lg border border-dashed border-border/60 text-xs text-muted-foreground">
            No image yet
          </div>
        )}
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <Input
            name="cover_url"
            defaultValue={initial?.cover_url ?? ""}
            placeholder="Or paste an image URL"
            onChange={(e) => {
              setError(null)
              setFilePreview(null)
              setUrlPreview(e.currentTarget.value.trim())
            }}
          />
          <Input
            name="cover_file"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setError(null)
              const f = e.currentTarget.files?.[0]
              if (!f) {
                setFilePreview(null)
                return
              }
              if (f.size > 5 * 1024 * 1024) {
                setError("Image must be under 5MB")
                e.currentTarget.value = ""
                setFilePreview(null)
                return
              }
              setFilePreview(URL.createObjectURL(f))
            }}
            className="cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:text-secondary-foreground"
          />
        </div>
        <p className="font-mono text-[10px] text-muted-foreground">
          Upload an image (max 5MB) or paste a public URL. Upload wins if both are filled.
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-4">
        {onDone && (
          <Button type="button" variant="ghost" onClick={onDone} disabled={pending}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : mode === "create" ? "Add section" : "Save changes"}
        </Button>
      </div>
    </form>
  )
}

function DeleteNowButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this section? This cannot be undone.")) return
        startTransition(async () => {
          await deleteNowSection(id)
        })
      }}
      className="text-muted-foreground hover:text-destructive"
    >
      {pending ? "Deleting…" : "Delete"}
    </Button>
  )
}
