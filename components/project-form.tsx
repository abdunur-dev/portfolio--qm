"use client"

import Image from "next/image"
import { useRef, useState, useTransition } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PROJECT_KINDS, PROJECT_STATUSES, type Project } from "@/lib/types"
import { createProject, deleteProject, updateProject } from "@/app/admin/actions"

type Props = {
  initial?: Project
  onDone?: () => void
  mode: "create" | "edit"
}

export function ProjectForm({ initial, onDone, mode }: Props) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(initial?.cover_url ?? null)
  const [fileName, setFileName] = useState<string | null>(null)

  function handleFile(file: File | null) {
    if (!file) {
      setPreview(initial?.cover_url ?? null)
      setFileName(null)
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Cover image must be under 5MB")
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }
    setError(null)
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(String(e.target?.result ?? ""))
    reader.readAsDataURL(file)
  }

  function clearFile() {
    if (fileInputRef.current) fileInputRef.current.value = ""
    setFileName(null)
    setPreview(initial?.cover_url ?? null)
  }

  function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res =
        mode === "create"
          ? await createProject(formData)
          : await updateProject(initial!.id, formData)
      if (res?.error) {
        setError(res.error)
        return
      }
      if (mode === "create") {
        formRef.current?.reset()
        setPreview(null)
        setFileName(null)
      }
      onDone?.()
    })
  }

  return (
    <form ref={formRef} action={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={initial?.title} required />
        <Field label="Slug" name="slug" defaultValue={initial?.slug} placeholder="auto from title" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description" className="text-xs uppercase tracking-wider text-muted-foreground">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={initial?.description ?? ""}
          className="resize-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Kind</Label>
          <Select name="kind" defaultValue={initial?.kind ?? "side"}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {PROJECT_KINDS.map((k) => (
                <SelectItem key={k} value={k}>{k}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Status</Label>
          <Select name="status" defaultValue={initial?.status ?? "live"}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {PROJECT_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Field
          label="Year"
          name="year"
          type="number"
          defaultValue={initial?.year ?? new Date().getFullYear()}
          required
        />
      </div>

      <Field
        label="Stack (comma separated)"
        name="stack"
        defaultValue={initial?.stack?.join(", ") ?? ""}
        placeholder="Next.js, Supabase, Tailwind"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Live URL" name="live_url" type="url" defaultValue={initial?.live_url ?? ""} />
        <Field label="Repo URL" name="repo_url" type="url" defaultValue={initial?.repo_url ?? ""} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Cover image URL" name="cover_url" type="url" defaultValue={initial?.cover_url ?? ""} placeholder="https://… (or upload below)" />
        <Field label="Position" name="position" type="number" defaultValue={initial?.position ?? 0} />
      </div>

      <div className="grid gap-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
          Or upload cover image
        </Label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          {preview ? (
            <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-muted/30">
              <Image
                src={preview || "/placeholder.svg"}
                alt="Cover preview"
                fill
                sizes="160px"
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="flex h-28 w-40 shrink-0 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/20 text-xs text-muted-foreground">
              No cover yet
            </div>
          )}
          <div className="flex flex-1 flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              name="cover_file"
              accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              className="block w-full cursor-pointer rounded-md border border-border/60 bg-card/40 px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary hover:bg-card/70"
            />
            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="truncate">
                {fileName ? (
                  <>
                    <Upload className="mr-1 inline h-3 w-3" />
                    {fileName}
                  </>
                ) : initial?.cover_url ? (
                  "Current cover shown — pick a file to replace it"
                ) : (
                  "PNG, JPG, WEBP, AVIF, or GIF · max 5MB"
                )}
              </span>
              {fileName && (
                <button
                  type="button"
                  onClick={clearFile}
                  className="inline-flex items-center gap-0.5 text-foreground/70 hover:text-destructive"
                >
                  <X className="h-3 w-3" /> clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-end gap-2 pt-2">
        {onDone && (
          <Button type="button" variant="ghost" onClick={onDone} disabled={pending}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : mode === "create" ? "Add project" : "Save changes"}
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

export function DeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this project? This cannot be undone.")) return
        startTransition(async () => {
          await deleteProject(id)
        })
      }}
      className="text-muted-foreground hover:text-destructive"
    >
      {pending ? "Deleting…" : "Delete"}
    </Button>
  )
}
