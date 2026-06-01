'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Trash2, Plus, Edit2, Upload } from 'lucide-react'
import { createTestimonial, updateTestimonial, deleteTestimonial } from '@/app/admin/content-actions'

interface Testimonial {
  id: string
  author: string
  role: string
  content: string
  avatar: string
  verified?: boolean
}

export function AdminTestimonialList({ testimonials: initialTestimonials }: { testimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [formData, setFormData] = useState({
    author: '',
    role: '',
    content: '',
    avatar: '',
  })

  const resetForm = () => {
    setFormData({ author: '', role: '', content: '', avatar: '' })
    setIsAdding(false)
    setEditingId(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData({ ...formData, avatar: data.url })
      } else {
        alert('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.author || !formData.role || !formData.content) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      if (editingId) {
        const result = await updateTestimonial(editingId, formData)
        if (result.ok) {
          setTestimonials(
            testimonials.map((t) =>
              t.id === editingId ? { ...t, ...formData } : t,
            ),
          )
        } else {
          alert(result.error || 'Failed to update')
        }
      } else {
        const result = await createTestimonial(formData)
        if (result.ok && result.data) {
          setTestimonials([...testimonials, result.data])
        } else {
          alert(result.error || 'Failed to create')
        }
      }
      resetForm()
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    setLoading(true)

    try {
      const result = await deleteTestimonial(id)
      if (result.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id))
      } else {
        alert(result.error || 'Failed to delete')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="rounded-lg border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
          <h3 className="mb-4 font-serif text-lg">
            {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Author Name *</label>
              <Input
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                placeholder="e.g., Guillermo Rauch"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Role *</label>
              <Input
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                placeholder="e.g., CEO @ Vercel"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Testimonial *</label>
              <Textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="What do you want to say?"
                required
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Avatar Image *</label>
              <div className="flex gap-2">
                <Input
                  value={formData.avatar}
                  onChange={(e) =>
                    setFormData({ ...formData, avatar: e.target.value })
                  }
                  placeholder="e.g., /avatars/author.png"
                  className="flex-1"
                />
                <label className="cursor-pointer">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploadingImage}
                    onClick={(e) => {
                      e.preventDefault()
                      const input = (e.target as HTMLButtonElement).parentElement?.querySelector('input[type="file"]') as HTMLInputElement
                      input?.click()
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploadingImage ? 'Uploading...' : 'Upload'}
                  </Button>
                </label>
              </div>
              {formData.avatar && (
                <div className="mt-2 flex gap-2 items-center">
                  <div className="relative h-12 w-12 rounded-full border border-border/60 overflow-hidden">
                    <Image
                      src={formData.avatar}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">Preview</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={loading || uploadingImage}
                className="flex-1"
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={loading || uploadingImage}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {testimonials.length === 0 ? (
          <div className="rounded-lg border border-border/60 bg-card/40 p-6 text-center">
            <p className="text-sm text-muted-foreground">No testimonials yet</p>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg border border-border/60 bg-card/40 p-4 backdrop-blur-sm hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3 flex-1">
                  {testimonial.avatar && (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border/60">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="mt-2 text-sm text-foreground/80 line-clamp-2">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setFormData(testimonial)
                      setEditingId(testimonial.id)
                    }}
                    className="rounded p-2 hover:bg-foreground/10 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    disabled={loading}
                    className="rounded p-2 hover:bg-red-500/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add button */}
      {!isAdding && !editingId && (
        <button
          onClick={() => setIsAdding(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border/60 py-6 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      )}
    </div>
  )
}
