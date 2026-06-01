'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function SeedTestimonialsButton() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSeed = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/seed-testimonials', {
        method: 'POST',
      })
      const data = await response.json()
      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        alert('Error: ' + (data.error || 'Failed to seed testimonials'))
      }
    } catch (error) {
      alert('Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Button disabled className="bg-green-600">
        ✓ Testimonials added!
      </Button>
    )
  }

  return (
    <Button onClick={handleSeed} disabled={loading} variant="outline">
      {loading ? 'Seeding...' : 'Seed Testimonials'}
    </Button>
  )
}
