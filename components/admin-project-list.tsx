"use client"

import Image from "next/image"
import { useState, useTransition } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Pencil, ExternalLink, Github, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectForm, DeleteButton } from "@/components/project-form"
import { seedProjects } from "@/app/admin/actions"
import type { Project } from "@/lib/types"

export function AdminProjectList({ projects }: { projects: Project[] }) {
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [seeding, startSeed] = useTransition()
  const [seedError, setSeedError] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-4 py-3 backdrop-blur-sm">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Projects
          </p>
          <p className="text-sm text-foreground">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
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
          {creating ? "Close" : "Add new project"}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {creating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
              <h3 className="mb-4 font-serif text-2xl">New project</h3>
              <ProjectForm mode="create" onDone={() => setCreating(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
        {projects.length === 0 && (
          <li className="px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No projects yet. Click{" "}
              <span className="text-foreground">New project</span> to add one,
              or import the projects from your portfolio in one click.
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
                  const res = await seedProjects()
                  if (res?.error) setSeedError(res.error)
                })
              }}
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              {seeding ? "Importing…" : "Import my portfolio"}
            </Button>
            {seedError && (
              <p className="mt-3 text-xs text-destructive">{seedError}</p>
            )}
          </li>
        )}

        {projects.map((p) => {
          const isEditing = editingId === p.id
          return (
            <li key={p.id} className="px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                {p.cover_url && (
                  <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-md border border-border/60 sm:block">
                    <Image
                      src={p.cover_url || "/placeholder.svg"}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-xl text-foreground">{p.title}</h3>
                    <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">
                      {p.kind}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`font-mono text-[10px] uppercase tracking-wider ${
                        p.status === "live"
                          ? "border-primary/40 text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {p.status}
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                  </div>
                  {p.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-foreground/70">{p.description}</p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    {p.stack?.length > 0 && (
                      <span className="font-mono">{p.stack.join(" · ")}</span>
                    )}
                    {p.live_url && (
                      <a
                        href={p.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 hover:text-foreground"
                      >
                        <ExternalLink className="h-3 w-3" /> live
                      </a>
                    )}
                    {p.repo_url && (
                      <a
                        href={p.repo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 hover:text-foreground"
                      >
                        <Github className="h-3 w-3" /> repo
                      </a>
                    )}
                  </div>
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
                  <DeleteButton id={p.id} />
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 rounded-xl border border-border/60 bg-background/40 p-5">
                      <ProjectForm mode="edit" initial={p} onDone={() => setEditingId(null)} />
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
