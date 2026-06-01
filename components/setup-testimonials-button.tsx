'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function SetupTestimonialsButton() {
  const [loading, setLoading] = useState(false)

  const handleSetup = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/setup-testimonials', {
        method: 'POST',
      })

      if (response.ok) {
        alert('Testimonials table setup complete! Refresh the page to see the data.')
        window.location.reload()
      } else {
        alert('Setup failed. The table may already exist.')
      }
    } catch (error) {
      console.error('[v0] Setup error:', error)
      alert('Setup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleSetup}
      disabled={loading}
      variant="outline"
    >
      {loading ? 'Setting up...' : 'Setup Testimonials'}
    </Button>
  )
}
