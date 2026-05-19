"use client"

import { useRef, useState, useTransition } from "react"
import { motion, AnimatePresence } from "motion/react"
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
      if (mode === "create") formRef.current?.reset()
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
        <Field label="Cover image URL" name="cover_url" type="url" defaultValue={initial?.cover_url ?? ""} />
        <Field label="Position" name="position" type="number" defaultValue={initial?.position ?? 0} />
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
