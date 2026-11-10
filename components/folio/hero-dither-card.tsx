"use client"

import { useEffect, useRef, useState } from "react"
import { DitherShader, type DitherPalette } from "@/lib/dither"
import { cn } from "@/lib/utils"

/**
 * Mikaelen-inspired Hero Dither Card:
 * Self-contained interactive topographic wave & grain shader framed inside
 * a sleek hardware/editorial card that never interferes with text readability.
 */
const CARD_FIELD = `
float cardElevation(vec2 p, float t) {
  float st = t * 0.08;
  vec2 q = p * 2.2 + vec2(st * 0.4, st * 0.2);
  float n1 = snoise(q);
  float n2 = snoise(q * 2.4 - vec2(st * 0.3, -st * 0.5));
  return 0.5 + 0.35 * n1 + 0.15 * n2;
}

float field(vec2 uv, vec2 res, float t) {
  float aspect = res.x / res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Mouse interaction: ripple and spotlight from cursor
  vec2 mP = vec2(cardMouse.x * aspect, cardMouse.y);
  float mDist = length(p - mP);
  float mouseGlow = exp(-mDist * mDist * 6.5) * cardMouseActive * 0.45;
  float mouseWave = sin(mDist * 24.0 - t * 2.5) * exp(-mDist * 3.5) * cardMouseActive * 0.18;

  // Topographic elevation waves
  vec2 warpedP = p + (p - mP) * mouseGlow * 0.2;
  float h = cardElevation(warpedP, t);

  // Fine Bayer contour ridges
  float lines = 10.0;
  float phase = fract(h * lines);
  float ridge = smoothstep(0.78, 0.96, phase) + (1.0 - smoothstep(0.0, 0.18, phase));
  ridge *= 0.55;

  // Floating mist noise
  float mist = fbm(warpedP * 1.5 + vec2(t * 0.03, -t * 0.02)) * 0.35;

  // Base stipple tone so the dither grain is distinctly visible
  float base = 0.22;

  // Edge vignette so card has clean inset borders
  float vignette = smoothstep(0.0, 0.08, uv.x) * smoothstep(1.0, 0.92, uv.x)
                 * smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.9, uv.y);

  float tone = (base + ridge * 0.5 + mist + mouseGlow + mouseWave) * vignette;
  return clamp(tone, 0.0, 0.96);
}
`

export interface HeroDitherCardProps {
  className?: string
  palette?: DitherPalette
}

export function HeroDitherCard({
  className,
  palette = ["--dither-paper", "--dither-ink"],
}: HeroDitherCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState<[number, number]>([0.5, 0.5])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let currentX = 0.5
    let currentY = 0.5
    let targetX = 0.5
    let targetY = 0.5
    let targetActive = 0
    let frameId: number

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      targetX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      targetY = Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / rect.height))
      targetActive = 1
    }

    const onPointerLeave = () => {
      targetActive = 0
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.1
      currentY += (targetY - currentY) * 0.1
      setMouse([currentX, currentY])
      setActive((prev) => prev + (targetActive - prev) * 0.08)
      frameId = requestAnimationFrame(tick)
    }

    el.addEventListener("pointermove", onPointerMove, { passive: true })
    el.addEventListener("pointerleave", onPointerLeave, { passive: true })
    frameId = requestAnimationFrame(tick)

    return () => {
      el.removeEventListener("pointermove", onPointerMove)
      el.removeEventListener("pointerleave", onPointerLeave)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative h-48 sm:h-56 w-full overflow-hidden rounded-xl border border-border/50 bg-card/40 transition-colors hover:border-primary/40",
        className
      )}
    >
      {/* Self-contained dither shader */}
      <DitherShader
        aria-hidden="true"
        field={CARD_FIELD}
        palette={palette}
        matrix="bayer8"
        speed={0.9}
        stillTime={12.0}
        uniforms={{
          cardMouse: mouse,
          cardMouseActive: active,
        }}
        className="absolute inset-0 h-full w-full"
        fallback={
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-muted/20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--primary) 15%, transparent) 0%, transparent 70%)",
            }}
          />
        }
      />

      {/* Top Left Badge */}
      <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full border border-border/40 bg-background/80 px-2.5 py-1 text-[11px] font-mono text-muted-foreground backdrop-blur-md">
        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
        <span>Addis Ababa · 2,355m</span>
      </div>

      {/* Bottom Right Label */}
      <div className="pointer-events-none absolute bottom-3 right-3 z-10 rounded border border-border/40 bg-background/70 px-2 py-0.5 text-[10px] font-mono text-muted-foreground/80 backdrop-blur-md">
        Topographic Dither · Bayer 8×8
      </div>
    </div>
  )
}
