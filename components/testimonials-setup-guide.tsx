'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'

export function TestimonialsSetupGuide() {
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const sqlQuery = `CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  avatar TEXT NOT NULL,
  company TEXT,
  image TEXT,
  link TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Users can insert own testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Users can update own testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Users can delete own testimonials" ON public.testimonials;

CREATE POLICY "Users can view own testimonials" ON public.testimonials
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own testimonials" ON public.testimonials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own testimonials" ON public.testimonials
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own testimonials" ON public.testimonials
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_testimonials_user_id ON public.testimonials(user_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON public.testimonials(created_at DESC);`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sqlQuery)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCreateTable = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/create-testimonials-table', {
        method: 'POST',
      })
      
      if (response.ok) {
        alert('✓ Testimonials table created! Refresh the page to add testimonials.')
        window.location.reload()
      } else {
        const data = await response.json()
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      alert('Failed to create table. Please try the manual method below.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div className="rounded-lg border border-border/60 bg-card/40 p-8 backdrop-blur-sm">
        <h3 className="font-serif text-2xl mb-4 text-foreground">Set Up Testimonials</h3>
        <p className="text-foreground/70 mb-6">The testimonials table needs to be created in your Supabase database. Choose one of the methods below:</p>

        {/* Quick Setup Button */}
        <div className="mb-8 p-4 rounded-lg bg-primary/10 border border-primary/30">
          <p className="text-sm font-medium text-foreground mb-3">Quick Setup (Automatic)</p>
          <Button 
            onClick={handleCreateTable}
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-background"
          >
            {loading ? 'Creating table...' : 'Create Testimonials Table'}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">This will create the table and set up all policies automatically.</p>
        </div>

        {/* Manual Setup */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-foreground">Manual Setup</p>
          
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">1. Go to your Supabase Dashboard</p>
            <a 
              href={`https://app.supabase.com/project/_/sql/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-primary hover:underline text-sm"
            >
              → Open Supabase SQL Editor
            </a>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">2. Copy this SQL and paste it into the editor:</p>
            
            <div className="relative bg-slate-950 rounded-lg p-4 border border-border/60">
              <pre className="text-xs text-slate-200 overflow-x-auto font-mono">
                {sqlQuery}
              </pre>
              <Button
                onClick={handleCopy}
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy SQL
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">3. Click "Run" in Supabase</p>
            <p className="text-xs text-muted-foreground">4. Refresh this page to start adding testimonials</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
        <h4 className="font-serif text-lg mb-3 text-foreground">What gets created:</h4>
        <ul className="space-y-2 text-sm text-foreground/70">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span><strong>testimonials table</strong> - Stores author, content, avatar, company, image, and link</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span><strong>Row Level Security (RLS)</strong> - Each user can only see/edit their own testimonials</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span><strong>Indexes</strong> - For fast queries by user and creation date</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
