"use client"

import { useEffect, useState } from "react"
import { Globe } from "lucide-react"
import { DitherShader } from "@/lib/dither"
import { cn } from "@/lib/utils"

/**
 * A drifting cluster of voxel blocks, dithered in pure ink on paper.
 * Blocks sit on a coarse grid; each gets its own shade, a bevel so it reads
 * as a cube, and the cluster edge wobbles slowly with noise. A faint
 * construction grid fills the empty space behind it.
 */
const VOXEL_FIELD = `
float voxGridLine(float v, float every) {
  float d = abs(fract(v / every + 0.5) - 0.5) * every;
  return 1.0 - smoothstep(0.0, 1.2, d);
}

float field(vec2 uv, vec2 res, float t) {
  float aspect = res.x / res.y;
  vec2 c = (uv - vec2(0.58, 0.5)) * vec2(aspect, 1.0);

  // Coarse voxel grid
  float n = voxDensity;
  vec2 q = c * n;
  vec2 b = floor(q);
  vec2 f = fract(q);
  vec2 bc = (b + 0.5) / n;

  // Cluster silhouette: a squashed blob whose edge drifts with noise
  float d = length(bc * vec2(0.95, 1.12));
  float wob = snoise(bc * 2.4 + vec2(t * 0.035, -t * 0.025)) * 0.11;
  float body = 1.0 - smoothstep(0.27, 0.31, d + wob);

  float h = hash21(b);
  body *= step(0.1, h); // a few missing blocks

  // Loose blocks orbiting the cluster
  float stray = step(0.975, hash21(b * 1.7 + 3.0)) * (1.0 - smoothstep(0.32, 0.55, d));
  float occ = max(body, stray);

  // Per-block shade that slowly re-rolls, so the structure feels "rendering"
  float roll = hash21(b + floor(t * 0.2 + h * 3.0));
  float shade = mix(0.22, 0.95, mix(h, roll, 0.35));
  // Darker toward the lower right, like light from the top left
  shade *= mix(1.0, 0.75, smoothstep(-0.3, 0.35, bc.x - bc.y));

  // Bevel: lit top edge, shadowed right edge, so each block reads as a cube
  float bevel = smoothstep(0.78, 1.0, f.x) * 0.3 - smoothstep(0.82, 1.0, f.y) * 0.25;
  float gap = step(0.07, f.x) * step(0.07, f.y);
  float cube = occ * clamp(shade + bevel, 0.0, 1.0) * mix(0.0, 1.0, gap);

  // Faint construction grid behind, every 22 cells
  vec2 px = uv * res;
  float grid = max(voxGridLine(px.x, 22.0), voxGridLine(px.y, 22.0)) * 0.16;
  // Keep the far left clear so it never fights the headline
  grid *= smoothstep(0.0, 0.25, uv.x);

  return max(cube, grid * (1.0 - occ));
}
`

function Readout() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setPct(100)
      return
    }
    let v = 0
    const id = window.setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 4))
      setPct(v)
      if (v >= 100) window.clearInterval(id)
    }, 70)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="absolute left-4 top-4 flex flex-col gap-1 bg-background/85 px-2 py-1.5 text-[10px] uppercase leading-tight tracking-wide text-highlighted backdrop-blur-sm">
      <span className="flex items-center gap-2">
        <span aria-hidden className="size-1 bg-highlighted" /> &gt; {pct < 100 ? "Rendering" : "Online"}
      </span>
      <span className="flex items-center gap-2 tabular-nums">
        <span aria-hidden className="size-1 bg-highlighted" /> {pct}%
      </span>
    </div>
  )
}

const marks = [
  { x: "22%", y: "18%" },
  { x: "84%", y: "28%" },
  { x: "30%", y: "78%" },
  { x: "70%", y: "12%" },
  { x: "12%", y: "52%" },
]

export function VoxelDither({ density = 15, className }: { density?: number; className?: string }) {
  return (
    <div className={cn("relative h-full min-h-[340px] w-full overflow-hidden", className)}>
      <DitherShader
        aria-hidden="true"
        field={VOXEL_FIELD}
        palette={["--dither-paper", "--dither-ink"]}
        matrix="bayer4"
        speed={0.9}
        stillTime={6}
        uniforms={{ voxDensity: density }}
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        fallback={<div aria-hidden className="lab-dots absolute inset-0" />}
      />

      {/* Crosshair marks */}
      {marks.map((m, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute -translate-x-1/2 -translate-y-1/2 text-sm leading-none text-highlighted"
          style={{ left: m.x, top: m.y }}
        >
          +
        </span>
      ))}

      <Readout />
      <Globe aria-hidden className="absolute right-4 top-4 size-7 text-highlighted" strokeWidth={1.25} />

      {/* Coordinates: Addis Ababa, elevation in metres */}
      <div className="absolute bottom-14 right-0 border border-r-0 border-highlighted bg-background/90 px-4 py-3 text-[11px] leading-6 tabular-nums text-highlighted backdrop-blur-sm">
        <div>X_09.0300</div>
        <div>Y_38.7400</div>
        <div>Z_2355.00</div>
      </div>
      <span className="absolute bottom-4 right-5 text-[11px] tracking-wide text-highlighted">//ADD_01</span>
    </div>
  )
}
