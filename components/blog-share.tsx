'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Copy, Check } from 'lucide-react'

interface BlogShareProps {
  title: string
  excerpt: string
  coverUrl?: string
  slug: string
}

export function BlogShare({ title, excerpt, coverUrl, slug }: BlogShareProps) {
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const blogUrl = typeof window !== 'undefined' ? `${window.location.origin}/writing/${slug}` : ''

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  const wrapText = (text: string, maxChars: number): string[] => {
    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = ''

    words.forEach((word) => {
      if ((currentLine + word).length > maxChars) {
        if (currentLine) lines.push(currentLine)
        currentLine = word
      } else {
        currentLine += (currentLine ? ' ' : '') + word
      }
    })
    if (currentLine) lines.push(currentLine)
    return lines
  }

  const generatePreviewImage = async () => {
    setIsGenerating(true)
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 1080
      canvas.height = 1080
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Load cover image if it exists
      if (coverUrl) {
        try {
          const img = await loadImage(coverUrl)
          ctx.drawImage(img, 0, 0, 1080, 1080)
        } catch (err) {
          // If image fails to load, just use background
          ctx.fillStyle = '#1a1a1a'
          ctx.fillRect(0, 0, 1080, 1080)
        }
      } else {
        // Solid background
        ctx.fillStyle = '#1a1a1a'
        ctx.fillRect(0, 0, 1080, 1080)
      }

      // Semi-transparent dark background for text readability
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 300, 1080, 780)

      // Title
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 56px -apple-system, BlinkMacSystemFont, "Segoe UI", serif'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      
      const titleLines = wrapText(title, 75)
      let yPos = 350
      titleLines.forEach((line) => {
        ctx.fillText(line, 60, yPos)
        yPos += 70
      })

      // Excerpt
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
      ctx.font = '28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      const excerptLines = wrapText(excerpt, 120)
      yPos += 30
      excerptLines.slice(0, 2).forEach((line) => {
        ctx.fillText(line, 60, yPos)
        yPos += 45
      })

      // Footer with name and URL
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.font = '22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      ctx.fillText('Abdurhaman • burhan-ops.vercel.app', 60, 1000)

      // Download the canvas as PNG
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${slug}-story.png`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
          }
        },
        'image/png',
        1
      )
    } catch (error) {
      console.error('Error generating preview:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(blogUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnX = () => {
    const text = encodeURIComponent(`Check out this blog post: "${title}"`)
    window.open(
      `https://x.com/intent/tweet?text=${text}&url=${encodeURIComponent(blogUrl)}`,
      '_blank'
    )
  }

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`,
      '_blank'
    )
  }

  return (
    <div className="mt-12 rounded-lg border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
      <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Share this post</h3>
      
      <div className="space-y-4">
        {/* Instagram Story Preview */}
        <div className="p-4 rounded-lg bg-secondary/20 border border-border/40">
          <p className="text-sm text-muted-foreground mb-3">Instagram Story Preview</p>
          <Button
            onClick={generatePreviewImage}
            disabled={isGenerating}
            className="w-full"
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Download Preview Image'}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Downloads as 1080x1080px image. Upload directly to Instagram Stories!
          </p>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={shareOnX}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            Share on X
          </Button>
          <Button
            onClick={shareOnLinkedIn}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            Share on LinkedIn
          </Button>
        </div>

        {/* Copy Link */}
        <Button
          onClick={copyShareLink}
          variant="outline"
          size="sm"
          className="w-full text-xs"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Link copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy share link
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
