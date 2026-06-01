import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Create filename with timestamp
    const timestamp = Date.now()
    const ext = file.name.split('.').pop()
    const filename = `${timestamp}.${ext}`

    // Ensure avatars directory exists
    const uploadsDir = join(process.cwd(), 'public', 'avatars')
    await mkdir(uploadsDir, { recursive: true })

    // Write file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(join(uploadsDir, filename), buffer)

    return NextResponse.json({
      url: `/avatars/${filename}`,
      filename,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
