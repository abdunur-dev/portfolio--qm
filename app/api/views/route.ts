import { NextResponse } from "next/server"
import { getViews, incrementViews } from "@/lib/views"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const data = await getViews()
    return NextResponse.json(
      { count: data.count, today: data.today },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      },
    )
  } catch (error) {
    console.error("Error in GET /api/views:", error)
    return NextResponse.json({ count: 1084, today: 37 }, { status: 500 })
  }
}

export async function POST() {
  try {
    const data = await incrementViews()
    return NextResponse.json(
      { count: data.count, today: data.today },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      },
    )
  } catch (error) {
    console.error("Error in POST /api/views:", error)
    return NextResponse.json({ count: 1084, today: 37 }, { status: 500 })
  }
}
