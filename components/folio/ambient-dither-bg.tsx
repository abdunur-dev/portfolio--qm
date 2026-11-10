"use client"

import { useEffect, useState } from "react"
import { DitherShader, type DitherPalette } from "@/lib/dither"
import { cn } from "@/lib/utils"

/**
 * Top-of-page dither band: a full-width highland "sky" of flowing contours
 * that sits behind the header and dissolves into the page below.
 * Dense at the top edge, fading out before the content starts.
 */
const AMBIENT_FIELD = `
float ambientWave(vec2 p, float t) {
  float st = t * 0.06;
  vec2 q = p * 1.6 + vec2(st * 0.35, st * 0.15);
  float n1 = snoise(q);
  float n2 = snoise(q * 2.2 - vec2(st * 0.25, -st * 0.4));
  return 0.5 + 0.35 * n1 + 0.15 * n2;
}

float field(vec2 uv, vec2 res, float t) {
  float aspect = res.x / res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Flowing contours
  float h = ambientWave(p, t);
  float phase = fract(h * 10.0);
  float ridge = smoothstep(0.74, 0.95, phase) + (1.0 - smoothstep(0.0, 0.2, phase));

  // Cloudy mass so the band reads as a sky, not just lines
  float cloud = fbm(p * 1.3 + vec2(t * 0.025, -t * 0.012));

  // Pointer glow
  vec2 mP = vec2(ambientMouse.x * aspect, ambientMouse.y);
  float mDist = length(p - mP);
  float mouseGlow = exp(-mDist * mDist * 8.0) * ambientMouseActive * 0.35;

  // Vertical falloff: uv.y = 1 at the top edge, 0 at the bottom of the band
  float fall = smoothstep(0.0, 1.0, uv.y);
  fall = fall * fall;

  float cloudC = smoothstep(0.2, 0.8, cloud);
  float tone = (cloudC * 0.85 + ridge * 0.22 + mouseGlow) * fall * 1.15;
  return clamp(tone, 0.0, 0.95);
}
`

export function AmbientDitherBg({
  className,
  palette = ["--dither-paper", "--dither-ink"],
}: {
  className?: string
  palette?: DitherPalette
}) {
  const [mouse, setMouse] = useState<[number, number]>([0.5, 0.5])
  const [active, setActive] = useState(0)

  useEffect(() => {
    let frameId: number
    let currentX = 0.5
    let currentY = 0.5
    let targetX = 0.5
    let targetY = 0.5
    let targetActive = 0

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX / window.innerWidth
      const band = document.querySelector(".folio-ambient")?.getBoundingClientRect()
      const h = band?.height || window.innerHeight
      const top = band?.top ?? 0
      targetY = 1.0 - (e.clientY - top) / h
      targetActive = 1
    }

    const onLeave = () => {
      targetActive = 0
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      setMouse([currentX, currentY])
      setActive((prev) => prev + (targetActive - prev) * 0.06)
      frameId = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerleave", onLeave, { passive: true })
    frameId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeave)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={cn(
        // A band across the top of the page that scrolls away with it.
        "folio-ambient pointer-events-none absolute inset-x-0 top-0 z-0 h-56 select-none sm:h-64 print:hidden",
        className,
      )}
    >
    <DitherShader
      aria-hidden="true"
      field={AMBIENT_FIELD}
      palette={palette}
      matrix="bayer8"
      speed={0.8}
      stillTime={12.0}
      uniforms={{
        ambientMouse: mouse,
        ambientMouseActive: active,
      }}
      className="absolute inset-0 h-full w-full"
      fallback={
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-background"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 10%, color-mix(in oklch, var(--primary) 12%, transparent) 0%, transparent 60%)",
          }}
        />
      }
    />
    </div>
  )
}
