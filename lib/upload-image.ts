import { createClient } from "@/lib/supabase/server"

export async function uploadImageIfPresent(
  formData: FormData,
  field: string,
  bucket: string,
  userId: string,
): Promise<string | null | undefined> {
  const file = formData.get(field)
  if (!(file instanceof File) || file.size === 0) return undefined
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be under 5MB")
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("File must be an image")
  }

  const supabase = await createClient()
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase()
  const safeExt = ["jpg", "jpeg", "png", "webp", "avif", "gif"].includes(ext) ? ext : "jpg"
  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`

  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || "image/jpeg",
  })
  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`)
  }

  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path)
  return pub.publicUrl
}
