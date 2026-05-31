'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateAbout } from '@/app/admin/content-actions'

export function AdminAboutList({ initial }: { initial?: { text: string; description: string } }) {
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-4 py-3 backdrop-blur-sm'>
        <div>
          <p className='font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground'>
            About Section
          </p>
          <p className='text-sm text-foreground'>Your about page content</p>
        </div>
      </div>

      <ul className='divide-y divide-border/60 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm'>
        <li className='px-6 py-5'>
          <div className='flex items-start justify-between gap-4'>
            <div className='min-w-0 flex-1'>
              <p className='line-clamp-2 font-serif text-lg text-foreground'>{initial?.text}</p>
              <p className='mt-2 line-clamp-2 text-sm text-foreground/70'>{initial?.description}</p>
            </div>
            <div className='flex shrink-0 items-center gap-1'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => {
                  setEditingId(editingId ? null : 'about')
                }}
              >
                <Pencil className='mr-1 h-3.5 w-3.5' />
                {editingId ? 'Close' : 'Edit'}
              </Button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {editingId && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className='overflow-hidden'
              >
                <div className='mt-4 rounded-xl border border-border/60 bg-background/40 p-5'>
                  <AboutForm initial={initial} onDone={() => setEditingId(null)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      </ul>
    </div>
  )
}

function AboutForm({
  initial,
  onDone,
}: {
  initial?: { text: string; description: string }
  onDone?: () => void
}) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res = await updateAbout(formData)
      if (res?.error) {
        setError(res.error)
        return
      }
      onDone?.()
    })
  }

  return (
    <form action={handleSubmit} className='grid gap-5'>
      <div className='grid gap-2'>
        <Label htmlFor='text' className='text-xs uppercase tracking-wider text-muted-foreground'>
          About Main Text
        </Label>
        <Textarea
          id='text'
          name='text'
          rows={3}
          defaultValue={initial?.text ?? ''}
          placeholder='Just another curious human being...'
          required
        />
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='description' className='text-xs uppercase tracking-wider text-muted-foreground'>
          About Description
        </Label>
        <Textarea
          id='description'
          name='description'
          rows={4}
          defaultValue={initial?.description ?? ''}
          placeholder='I tinker with decentralised apps...'
          required
        />
      </div>

      {error && <p className='text-sm text-destructive'>{error}</p>}

      <div className='flex items-center justify-end gap-2 border-t border-border/60 pt-4'>
        {onDone && (
          <Button type='button' variant='ghost' onClick={onDone} disabled={pending}>
            Cancel
          </Button>
        )}
        <Button type='submit' disabled={pending}>
          {pending ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </form>
  )
}
