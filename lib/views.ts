import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

export type ViewsData = {
  count: number
  today: number
  lastDate?: string
}

// Fallback seed values
const DEFAULT_SEED: ViewsData = {
  count: 1084,
  today: 37,
  lastDate: new Date().toISOString().slice(0, 10),
}

const DATA_DIR = path.join(process.cwd(), ".data")
const DATA_FILE = path.join(DATA_DIR, "views.json")

// In-memory cache for fast response and serverless runtime fallback
let memoryCache: ViewsData = { ...DEFAULT_SEED }

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10)
}

function readLocalFile(): ViewsData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8")
      const parsed = JSON.parse(raw) as ViewsData
      if (typeof parsed.count === "number" && typeof parsed.today === "number") {
        return parsed
      }
    }
  } catch (err) {
    // Ignore read errors
  }
  return { ...memoryCache }
}

function writeLocalFile(data: ViewsData) {
  memoryCache = { ...data }
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8")
  } catch (err) {
    // On read-only environments (like some serverless containers), memoryCache persists during invocation
  }
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

/**
 * Fetch current view counts without incrementing.
 */
export async function getViews(): Promise<ViewsData> {
  const today = getTodayString()

  // 1. Try Supabase if available
  const supabase = getSupabaseClient()
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_views")
        .select("count, today, last_date")
        .eq("id", "global")
        .maybeSingle()

      if (!error && data) {
        let currentToday = Number(data.today) || 0
        if (data.last_date !== today) {
          currentToday = 0
        }
        return {
          count: Number(data.count) || 0,
          today: currentToday,
          lastDate: data.last_date,
        }
      }
    } catch (err) {
      console.warn("Supabase views read error, using fallback:", err)
    }
  }

  // 2. Try Vercel KV / Upstash Redis if configured
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (kvUrl && kvToken) {
    try {
      const res = await fetch(`${kvUrl}/get/site_views`, {
        headers: { Authorization: `Bearer ${kvToken}` },
        cache: "no-store",
      })
      if (res.ok) {
        const json = await res.json()
        if (json.result) {
          const parsed = typeof json.result === "string" ? JSON.parse(json.result) : json.result
          let currentToday = Number(parsed.today) || 0
          if (parsed.lastDate !== today) {
            currentToday = 0
          }
          return {
            count: Number(parsed.count) || DEFAULT_SEED.count,
            today: currentToday,
            lastDate: parsed.lastDate || today,
          }
        }
      }
    } catch (err) {
      console.warn("KV views read error, using fallback:", err)
    }
  }

  // 3. Fallback to local storage / memory
  const local = readLocalFile()
  if (local.lastDate !== today) {
    local.today = 0
    local.lastDate = today
  }
  return local
}

/**
 * Increment view count and update today's metric.
 */
export async function incrementViews(): Promise<ViewsData> {
  const today = getTodayString()

  // 1. Try Supabase
  const supabase = getSupabaseClient()
  if (supabase) {
    try {
      // First get current
      const { data } = await supabase
        .from("site_views")
        .select("count, today, last_date")
        .eq("id", "global")
        .maybeSingle()

      let newCount = DEFAULT_SEED.count + 1
      let newToday = 1

      if (data) {
        newCount = (Number(data.count) || 0) + 1
        newToday = data.last_date === today ? (Number(data.today) || 0) + 1 : 1
      }

      await supabase.from("site_views").upsert({
        id: "global",
        count: newCount,
        today: newToday,
        last_date: today,
        updated_at: new Date().toISOString(),
      })

      return { count: newCount, today: newToday, lastDate: today }
    } catch (err) {
      console.warn("Supabase views update error, using fallback:", err)
    }
  }

  // 2. Try Vercel KV / Upstash
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (kvUrl && kvToken) {
    try {
      const current = await getViews()
      const newCount = current.count + 1
      const newToday = current.lastDate === today ? current.today + 1 : 1
      const updated: ViewsData = { count: newCount, today: newToday, lastDate: today }

      await fetch(`${kvUrl}/set/site_views`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([JSON.stringify(updated)]),
      })

      return updated
    } catch (err) {
      console.warn("KV views update error, using fallback:", err)
    }
  }

  // 3. Fallback to local storage / memory
  const local = readLocalFile()
  const newCount = (local.count || DEFAULT_SEED.count) + 1
  const newToday = local.lastDate === today ? (local.today || 0) + 1 : 1
  const updated: ViewsData = {
    count: newCount,
    today: newToday,
    lastDate: today,
  }

  writeLocalFile(updated)
  return updated
}
