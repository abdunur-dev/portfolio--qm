"use client"

import { useEffect, useState } from "react"
import { DitherShader, type DitherMatrix, type DitherPalette } from "@/lib/dither"
import { cn } from "@/lib/utils"

/**
 * GLSL field for Burhan's portfolio dither effect:
 * Combines:
 * 1. Flowing Ethiopian highland contours & rolling elevation waves (Addis Ababa topography)
 * 2. Soft atmospheric mist and micro-texture (fbm)
 * 3. Interactive pointer spotlight & gentle wave refraction towards the cursor
 * 4. Center-channel text clearance so typography stays ultra-readable (> 4.5:1 contrast)
 */
const BURHAN_FIELD = `
float burhanElevation(vec2 p, float t) {
  float slowT = t * 0.05;
  vec2 q = p * burhanScale + vec2(slowT * 0.35, slowT * 0.15);
  float n1 = snoise(q);
  float n2 = snoise(q * 2.15 + vec2(slowT * -0.25, slowT * 0.4));
  return 0.5 + 0.35 * n1 + 0.15 * n2;
}

float field(vec2 uv, vec2 res, float t) {
  float aspect = res.x / res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // 1. Center-column attenuation:
  // Folio content is centered (uv.x ~ 0.5). We soften the dither where text sits,
  // letting it flourish along the outer margins and top/bottom edges.
  float colDist = abs(uv.x - 0.5) * aspect;
  float textClear = smoothstep(0.12, 0.48, colDist);
  float textWeight = mix(0.12, 0.78, textClear);

  // 2. Interactive mouse spotlight & refraction
  vec2 mP = vec2(burhanMouse.x * aspect, burhanMouse.y);
  float mDist = length(p - mP);
  float mouseSpot = exp(-mDist * mDist * 5.0) * burhanMouseActive * 0.35;
  float mouseRipple = sin(mDist * 20.0 - t * 2.2) * exp(-mDist * 3.2) * burhanMouseActive * 0.12;

  // 3. Topographic elevation with mouse distortion
  vec2 warpedP = p + (p - mP) * mouseSpot * 0.15;
  float h = burhanElevation(warpedP, t);

  // 4. Fine contour ridges
  float contourLines = 12.0;
  float cPhase = fract(h * contourLines);
  float ridge = smoothstep(0.82, 0.97, cPhase) + (1.0 - smoothstep(0.0, 0.14, cPhase));
  ridge *= 0.42;

  // 5. Atmospheric mist drift
  float mist = fbm(warpedP * 1.25 + vec2(t * 0.02, -t * 0.015)) * 0.32;

  // 6. Vertical vignetting: soft fade at very bottom, subtle bloom near top
  float bottomFade = smoothstep(0.01, 0.22, uv.y);
  float topBloom = smoothstep(0.45, 1.0, uv.y) * 0.18;

  // Combine layers
  float tone = (ridge + mist + mouseSpot + mouseRipple + topBloom) * textWeight * bottomFade * burhanIntensity;
  return clamp(tone, 0.0, 0.95);
}
`

export interface FolioDitherProps {
  className?: string
  /** Threshold matrix: 'bayer8' (fine crisp stipple) or 'blue-noise' (velvet film grain). Default 'bayer8'. */
  matrix?: DitherMatrix
  /** Overall intensity multiplier [0..1]. Default 0.85. */
  intensity?: number
  /** Feature scale: bigger values yield more compact contour features. Default 1.2. */
  scale?: number
  /** Color palette tuple from background to dot ink. Default uses theme CSS variables. */
  palette?: DitherPalette
  /** Cell pixel size. Defaults to CSS variable --dither-cell (3px). */
  cell?: number
}

export function FolioDither({
  className,
  matrix = "bayer8",
  intensity = 0.85,
  scale = 1.2,
  palette = ["--dither-paper", "--dither-ink"],
  cell,
}: FolioDitherProps) {
  const [mouse, setMouse] = useState<[number, number]>([0.5, 0.5])
  const [mouseActive, setMouseActive] = useState(0)

  useEffect(() => {
    let frameId: number
    let targetX = 0.5
    let targetY = 0.5
    let currentX = 0.5
    let currentY = 0.5
    let active = 0

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX / window.innerWidth
      targetY = 1.0 - e.clientY / window.innerHeight // flip Y for GLSL uv
      active = 1
    }

    const handlePointerLeave = () => {
      active = 0
    }

    const tick = () => {
      // Smooth lerp for liquid, organic mouse reaction
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      setMouse([currentX, currentY])
      setMouseActive((prev) => prev + (active - prev) * 0.06)
      frameId = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true })
    frameId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <DitherShader
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
      field={BURHAN_FIELD}
      palette={palette}
      matrix={matrix}
      cell={cell}
      speed={0.8}
      stillTime={14.0}
      uniforms={{
        burhanMouse: mouse,
        burhanMouseActive: mouseActive,
        burhanIntensity: intensity,
        burhanScale: scale,
      }}
      fallback={
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-background opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 15%, color-mix(in oklch, var(--primary) 12%, transparent) 0%, transparent 60%)",
          }}
        />
      }
    />
  )
}
