'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface HeroSettings {
  title: string
  subtitle: string
}

interface AboutSettings {
  text: string
  description: string
}

export function AdminSettings({
  heroSettings,
  aboutSettings,
}: {
  heroSettings: HeroSettings
  aboutSettings: AboutSettings
}) {
  const [hero, setHero] = useState(heroSettings)
  const [about, setAbout] = useState(aboutSettings)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hero, about }),
      })
      if (res.ok) {
        setMessage('Settings saved successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to save settings')
      }
    } catch (error) {
      console.error('[v0] Error saving settings:', error)
      setMessage('Error saving settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
        <h3 className="mb-4 font-serif text-lg text-foreground">Hero Section</h3>

        <div className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Hero Title
            </label>
            <Input
              type="text"
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              className="mt-2"
              placeholder="e.g., Ey up! I'm Abdurhaman, known as burhan_"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Hero Subtitle
            </label>
            <Textarea
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              className="mt-2"
              placeholder="e.g., full-stack developer working across Web2, Web3 & AI."
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
        <h3 className="mb-4 font-serif text-lg text-foreground">About Section</h3>

        <div className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              About Main Text
            </label>
            <Textarea
              value={about.text}
              onChange={(e) => setAbout({ ...about, text: e.target.value })}
              className="mt-2"
              placeholder="Main about text..."
              rows={4}
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              About Description
            </label>
            <Textarea
              value={about.description}
              onChange={(e) =>
                setAbout({ ...about, description: e.target.value })
              }
              className="mt-2"
              placeholder="Additional about description..."
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <div>
          {message && (
            <p
              className={`font-mono text-[10px] uppercase tracking-[0.18em] ${message.includes('success') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
            >
              {message}
            </p>
          )}
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-foreground px-6 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-background hover:bg-foreground/90"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  )
}
