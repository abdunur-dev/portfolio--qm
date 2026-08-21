'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Plus, Edit2, Upload } from 'lucide-react'
import { createTestimonial, updateTestimonial, deleteTestimonial } from '@/app/admin/content-actions'

interface Testimonial {
  id: string
  author: string
  role: string
  content: string
  avatar: string
  verified?: boolean
  company?: string
  image?: string
  link?: string
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
    image: '',
    link: '',
  })

  const resetForm = () => {
    setFormData({ author: '', role: '', content: '', avatar: '', image: '', link: '' })
    setIsAdding(false)
    setEditingId(null)
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id)
    setIsAdding(true)
    setFormData({
      author: testimonial.author || '',
      role: testimonial.role || '',
      content: testimonial.content || '',
      avatar: testimonial.avatar || '',
      image: testimonial.image || '',
      link: testimonial.link || '',
    })
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
      {/* Header with Add Button */}
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-4 py-3 backdrop-blur-sm">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Testimonials
          </p>
          <p className="text-sm text-foreground">
            {testimonials.length} {testimonials.length === 1 ? 'testimonial' : 'testimonials'}
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingId(null)
            setIsAdding((v) => !v)
            if (!isAdding) {
              setFormData({ author: '', role: '', content: '', avatar: '', image: '', link: '' })
            }
          }}
          variant={isAdding ? 'secondary' : 'default'}
          size="lg"
          className="shadow-sm"
        >
          <Plus className={`mr-1.5 h-4 w-4 transition-transform ${isAdding ? 'rotate-45' : ''}`} />
          {isAdding ? 'Close' : 'Add new'}
        </Button>
      </div>

      {/* Form - Add/Edit */}
      <AnimatePresence initial={false}>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
              <h3 className="mb-4 font-serif text-2xl">
                {editingId ? 'Edit testimonial' : 'New testimonial'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} placeholder="e.g., Thomas Paulmann" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Role or company</label>
                    <Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g., Founder at Luma" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Appreciation</label>
                  <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Write what they said about your work..." required className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm leading-6 outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Avatar URL (optional)</label>
                  <Input value={formData.avatar} onChange={(e) => setFormData({ ...formData, avatar: e.target.value })} placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Testimonial Image</label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.image || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="e.g., /images/testimonial.jpg"
                      className="flex-1"
                    />
                    <label className="cursor-pointer">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (event) => {
                              setFormData({ ...formData, image: event.target?.result as string })
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault()
                          const input = (e.target as HTMLButtonElement).parentElement?.querySelector('input[type="file"]') as HTMLInputElement
                          input?.click()
                        }}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </label>
                  </div>
                  {formData.image && (
                    <div className="mt-2 flex gap-2 items-center">
                      <div className="relative h-20 w-20 rounded border border-border/60 overflow-hidden">
                        <Image
                          src={formData.image}
                          alt="Preview"
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">Preview</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Link (Optional)</label>
                  <Input
                    value={formData.link || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder="e.g., https://twitter.com/username"
                    type="url"
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* List of Testimonials */}
      <ul className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
        {testimonials.length === 0 && (
          <li className="px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No testimonials yet. Click <span className="text-foreground">Add new</span> to create one.
            </p>
          </li>
        )}

        {testimonials.map((testimonial) => (
          <li key={testimonial.id} className="px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  {testimonial.avatar && (
                    <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden border border-border/60">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-serif text-lg text-foreground">{testimonial.author}</h3>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                {testimonial.image && (
                  <div className="mt-3 relative h-32 w-full rounded border border-border/60 overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt="Testimonial"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {testimonial.link && (
                  <p className="mt-2 text-xs text-primary underline truncate">
                    <a href={testimonial.link} target="_blank" rel="noopener noreferrer">
                      {testimonial.link}
                    </a>
                  </p>
                )}
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  onClick={() => handleEdit(testimonial)}
                  variant="ghost"
                  size="sm"
                  disabled={loading}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(testimonial.id)}
                  variant="ghost"
                  size="sm"
                  disabled={loading}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
