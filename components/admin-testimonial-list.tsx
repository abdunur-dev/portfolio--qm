'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Trash2, Plus, Edit2 } from 'lucide-react'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        }
      } else {
        const result = await createTestimonial(formData)
        if (result.ok && result.data) {
          setTestimonials([...testimonials, result.data])
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
              <label className="block text-sm font-medium">Author Name</label>
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
              <label className="block text-sm font-medium">Role</label>
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
              <label className="block text-sm font-medium">Testimonial</label>
              <Textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="What do you want to say?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Avatar URL</label>
              <Input
                value={formData.avatar}
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.value })
                }
                placeholder="/avatars/author.png"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="rounded-lg border border-border/60 bg-card/40 p-4 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3 flex-1">
                {testimonial.avatar && (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border/60">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                      sizes="40px"
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
                  className="rounded p-2 hover:bg-foreground/10"
                  title="Edit"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  disabled={loading}
                  className="rounded p-2 hover:bg-red-500/10"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
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
