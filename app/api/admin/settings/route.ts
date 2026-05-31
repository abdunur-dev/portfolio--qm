import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth/require-admin'

export async function POST(req: NextRequest) {
  try {
    const user = await requireAdmin()
    const supabase = await createClient()

    const { hero, about } = await req.json()

    // Store in a settings table or user metadata
    const { data, error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: user.id,
        hero_title: hero.title,
        hero_subtitle: hero.subtitle,
        about_text: about.text,
        about_description: about.description,
        updated_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error('[v0] Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save settings' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('[v0] Error in settings API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
