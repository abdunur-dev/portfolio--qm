"use client"

import { useEffect, useRef, useState } from "react"
import { ImageIcon, Upload, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type Props = {
  initialUrl?: string | null
  /** When the user clears the field entirely, set hidden value so backend stores null */
  label?: string
  helpText?: string
  /** Form field names — must match what the server action reads */
  urlFieldName?: string
  fileFieldName?: string
  aspect?: "video" | "square" | "wide"
}

export function AdminCoverField({
  initialUrl = null,
  label = "Cover image (optional)",
  helpText = "Upload an image (max 5MB) or paste a public URL. Upload wins if both are filled.",
  urlFieldName = "cover_url",
  fileFieldName = "cover_file",
  aspect = "wide",
}: Props) {
  const [urlValue, setUrlValue] = useState<string>(initialUrl ?? "")
  const [fileObjectUrl, setFileObjectUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imgError, setImgError] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Cleanup object URL when it changes / component unmounts
  useEffect(() => {
    return () => {
      if (fileObjectUrl) URL.revokeObjectURL(fileObjectUrl)
    }
  }, [fileObjectUrl])

  // Reset image error state when source changes
  useEffect(() => {
    setImgError(false)
  }, [urlValue, fileObjectUrl])

  // File preview takes priority over URL preview
  const previewSrc = fileObjectUrl || (urlValue ? urlValue : null)

  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "wide"
        ? "aspect-[3/2]"
        : "aspect-video"

  function clearAll() {
    setUrlValue("")
    setFileObjectUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setFileName(null)
    setError(null)
    setImgError(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function clearFileOnly() {
    setFileObjectUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setFileName(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="grid gap-3 rounded-xl border border-border/60 bg-background/40 p-4">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </Label>
        {previewSrc && !imgError && (
          <span className="font-mono text-[10px] text-muted-foreground">preview</span>
        )}
      </div>

      <div className="relative">
        {previewSrc && !imgError ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc || "/placeholder.svg"}
              alt="Cover preview"
              onError={() => {
                if (fileObjectUrl) return
                setImgError(true)
                setError(
                  "Couldn't load that URL — the host may be blocking it. Try uploading the file instead.",
                )
              }}
              className={`w-full rounded-lg border border-border/60 object-cover ${aspectClass}`}
            />
            <button
              type="button"
              onClick={clearAll}
              className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-background/90 text-foreground/70 shadow-sm backdrop-blur-sm transition-colors hover:text-destructive"
              aria-label="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <div
            className={`flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border/60 bg-muted/30 text-xs text-muted-foreground ${aspectClass}`}
          >
            <ImageIcon className="h-5 w-5 opacity-60" aria-hidden />
            <span>No image yet</span>
          </div>
        )}
      </div>

      {/* Upload row */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="gap-1.5"
        >
          <Upload className="h-3.5 w-3.5" />
          {fileObjectUrl ? "Replace upload" : "Upload image"}
        </Button>
        {fileName && (
          <span className="flex items-center gap-1.5 truncate font-mono text-[11px] text-muted-foreground">
            <span className="truncate">{fileName}</span>
            <button
              type="button"
              onClick={clearFileOnly}
              className="rounded p-0.5 text-muted-foreground hover:text-destructive"
              aria-label="Remove file selection"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        )}
        <input
          ref={fileInputRef}
          name={fileFieldName}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            setError(null)
            setImgError(false)
            const f = e.currentTarget.files?.[0]
            if (!f) {
              clearFileOnly()
              return
            }
            if (f.size > 5 * 1024 * 1024) {
              setError("Image must be under 5MB")
              clearFileOnly()
              return
            }
            // Revoke any previous object URL before creating a new one
            setFileObjectUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev)
              return URL.createObjectURL(f)
            })
            setFileName(f.name)
          }}
        />
      </div>

      {/* URL row */}
      <Input
        name={urlFieldName}
        value={urlValue}
        onChange={(e) => {
          setError(null)
          setImgError(false)
          setUrlValue(e.currentTarget.value)
        }}
        placeholder="…or paste a public image URL (https://…)"
      />

      <p className="font-mono text-[10px] leading-relaxed text-muted-foreground">
        {helpText}
      </p>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
