"use client"

import { useEffect, useRef, useState } from "react"
import { DitherShader, type DitherPalette } from "@/lib/dither"
import { cn } from "@/lib/utils"

/**
 * 3 Switchable Stages for the RAVN-inspired interactive dither canvas:
 * 01 // TOPOGRAPHY: Addis Ababa mountain terrain elevation ridges
 * 02 // FLEET_MESH: Interconnected autonomous fleet nodes & coordinates
 * 03 // SIGNAL_WAVE: Harmonic carrier frequencies & pulse signals
 */
const STAGE_FIELDS = {
  topo: `
float topoElev(vec2 p, float t) {
  float st = t * 0.08;
  vec2 q = p * 2.2 + vec2(st * 0.4, st * 0.2);
  return 0.5 + 0.35 * snoise(q) + 0.15 * snoise(q * 2.4 - vec2(st * 0.3, -st * 0.5));
}

float field(vec2 uv, vec2 res, float t) {
  float aspect = res.x / res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  vec2 mP = vec2(ravnMouse.x * aspect, ravnMouse.y);
  float mDist = length(p - mP);
  float mouseGlow = exp(-mDist * mDist * 7.0) * ravnMouseActive * 0.4;
  float mouseWave = sin(mDist * 22.0 - t * 2.5) * exp(-mDist * 3.2) * ravnMouseActive * 0.18;

  vec2 warpedP = p + (p - mP) * mouseGlow * 0.2;
  float h = topoElev(warpedP, t);

  float lines = 11.0;
  float phase = fract(h * lines);
  float ridge = smoothstep(0.76, 0.96, phase) + (1.0 - smoothstep(0.0, 0.2, phase));
  ridge *= 0.55;

  float mist = fbm(warpedP * 1.5 + vec2(t * 0.03, -t * 0.02)) * 0.3;
  float vignette = smoothstep(0.0, 0.06, uv.x) * smoothstep(1.0, 0.94, uv.x)
                 * smoothstep(0.0, 0.08, uv.y) * smoothstep(1.0, 0.92, uv.y);

  float tone = (0.2 + ridge * 0.55 + mist + mouseGlow + mouseWave) * vignette;
  return clamp(tone, 0.0, 0.98);
}
`,
  nodes: `
float field(vec2 uv, vec2 res, float t) {
  float aspect = res.x / res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Grid coordinates
  vec2 grid = fract(p * 5.0) - 0.5;
  float gridLines = smoothstep(0.48, 0.5, abs(grid.x)) + smoothstep(0.48, 0.5, abs(grid.y));

  // Pulse rings
  float d = length(p - vec2(0.5 * aspect, 0.5));
  float wave = sin(d * 18.0 - t * 3.0) * 0.5 + 0.5;
  wave *= exp(-d * 1.2);

  // Mouse beacon
  vec2 mP = vec2(ravnMouse.x * aspect, ravnMouse.y);
  float mDist = length(p - mP);
  float beacon = exp(-mDist * mDist * 12.0) * ravnMouseActive * 0.6;
  float beaconRing = abs(sin(mDist * 24.0 - t * 4.0)) * exp(-mDist * 4.0) * ravnMouseActive * 0.35;

  float vignette = smoothstep(0.0, 0.06, uv.x) * smoothstep(1.0, 0.94, uv.x)
                 * smoothstep(0.0, 0.08, uv.y) * smoothstep(1.0, 0.92, uv.y);

  float tone = (0.18 + gridLines * 0.15 + wave * 0.45 + beacon + beaconRing) * vignette;
  return clamp(tone, 0.0, 0.98);
}
`,
  signal: `
float field(vec2 uv, vec2 res, float t) {
  float aspect = res.x / res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Carrier harmonics
  float y1 = sin(p.x * 6.0 + t * 2.0) * 0.15 + 0.5;
  float y2 = sin(p.x * 12.0 - t * 3.0) * 0.08 + 0.5;
  float d1 = abs(p.y - y1);
  float d2 = abs(p.y - y2);

  float sig1 = exp(-d1 * d1 * 90.0) * 0.65;
  float sig2 = exp(-d2 * d2 * 140.0) * 0.45;

  // Background noise sweep
  float sweep = fbm(p * 2.0 + vec2(t * 0.05, 0.0)) * 0.25;

  // Mouse warp
  vec2 mP = vec2(ravnMouse.x * aspect, ravnMouse.y);
  float mDist = length(p - mP);
  float mGlow = exp(-mDist * 5.0) * ravnMouseActive * 0.35;

  float vignette = smoothstep(0.0, 0.06, uv.x) * smoothstep(1.0, 0.94, uv.x)
                 * smoothstep(0.0, 0.08, uv.y) * smoothstep(1.0, 0.92, uv.y);

  float tone = (0.18 + sig1 + sig2 + sweep + mGlow) * vignette;
  return clamp(tone, 0.0, 0.98);
}
`,
}

type StageKey = "topo" | "nodes" | "signal"

export function RavnHeroStage({
  palette = ["--dither-paper", "--dither-ink"],
}: {
  palette?: DitherPalette
}) {
  const [stage, setStage] = useState<StageKey>("topo")
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState<[number, number]>([0.5, 0.5])
  const [active, setActive] = useState(0)
  const [coords, setCoords] = useState("X: 0.50 Y: 0.50")

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
      setCoords(`X: ${targetX.toFixed(2)} Y: ${targetY.toFixed(2)}`)
    }

    const onPointerLeave = () => {
      targetActive = 0
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
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
      className="group relative flex flex-col rounded-lg border border-border/70 bg-card/60 shadow-sm backdrop-blur-sm overflow-hidden"
    >
      {/* RAVN Header Console Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-border/70 bg-muted/40 px-3 py-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span className="font-semibold text-foreground tracking-tight">RAVN // DITHER_STAGE</span>
          <span className="hidden text-muted-foreground sm:inline">· [BAYER 8×8]</span>
        </div>

        {/* Stage Switcher Buttons */}
        <div className="flex items-center gap-1">
          {(
            [
              { id: "topo", full: "01 // ELEVATION", short: "01 // TOPO" },
              { id: "nodes", full: "02 // MESH", short: "02 // MESH" },
              { id: "signal", full: "03 // SIGNAL", short: "03 // SIG" },
            ] as const
          ).map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStage(s.id)}
              className={cn(
                "rounded px-2 py-0.5 text-[11px] font-mono transition-all",
                stage === s.id
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="hidden sm:inline">{s.full}</span>
              <span className="sm:hidden">{s.short}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dither Shader Canvas Area */}
      <div className="relative h-44 sm:h-56 w-full overflow-hidden bg-background">
        <DitherShader
          key={stage}
          aria-hidden="true"
          field={STAGE_FIELDS[stage]}
          palette={palette}
          matrix="bayer8"
          speed={0.9}
          stillTime={12.0}
          uniforms={{
            ravnMouse: mouse,
            ravnMouseActive: active,
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

        {/* Crosshair accents on corners */}
        <div className="pointer-events-none absolute left-2 top-2 font-mono text-[9px] text-muted-foreground/60 select-none">
          +
        </div>
        <div className="pointer-events-none absolute right-2 top-2 font-mono text-[9px] text-muted-foreground/60 select-none">
          +
        </div>
        <div className="pointer-events-none absolute left-2 bottom-2 font-mono text-[9px] text-muted-foreground/60 select-none">
          +
        </div>
        <div className="pointer-events-none absolute right-2 bottom-2 font-mono text-[9px] text-muted-foreground/60 select-none">
          +
        </div>
      </div>

      {/* RAVN Status Telemetry Footer Bar */}
      <div className="flex items-center justify-between border-t border-border/70 bg-muted/30 px-3 py-1.5 text-[11px] font-mono text-muted-foreground">
        <span>LOC: ADDIS ABABA [9°01&apos;N 38°45&apos;E]</span>
        <span className="text-foreground/90 font-medium">{coords}</span>
      </div>
    </div>
  )
}
