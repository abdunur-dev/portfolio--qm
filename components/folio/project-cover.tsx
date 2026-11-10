"use client"

import { DitherShader } from "@/lib/dither"
import { cn } from "@/lib/utils"

/**
 * Generated dither cover for a project card.
 * Every project gets its own seed, so each cover is a different
 * highland "terrain" — contour rings around a seeded peak, drifting slowly.
 */
const COVER_FIELD = `
float field(vec2 uv, vec2 res, float t) {
  float aspect = res.x / res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float s = coverSeed;

  // A seeded peak somewhere on the card
  vec2 peak = vec2(fract(s * 0.37) * aspect, 0.25 + fract(s * 0.71) * 0.5);
  float d = length(p - peak);

  // Terrain = distance to peak, warped by slow noise
  float st = t * 0.04;
  float warp = snoise(p * 1.6 + vec2(s, st)) * 0.18 + snoise(p * 3.4 - vec2(st, s)) * 0.06;
  float h = d + warp;

  // Contour lines
  float lines = 9.0 + fract(s * 1.3) * 5.0;
  float ph = fract(h * lines - st * 0.6);
  float ridge = smoothstep(0.78, 0.96, ph) + (1.0 - smoothstep(0.0, 0.18, ph));

  // Brighter near the peak, darker toward the edges
  float glow = exp(-d * d * 3.2) * 0.55;
  float mist = fbm(p * 2.0 + vec2(st, s)) * 0.25;

  // Fade the bottom so the card body sits cleanly under the cover
  float base = smoothstep(0.0, 0.35, uv.y);

  float tone = (ridge * 0.45 + glow + mist) * mix(0.35, 1.0, base) * coverIntensity;
  return clamp(tone, 0.0, 0.95);
}
`

function seedFrom(text: string) {
  let h = 0
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 9973
  return (h % 997) / 97 + 1
}

export function ProjectCover({
  seed,
  intensity = 0.9,
  className,
}: {
  seed: string
  intensity?: number
  className?: string
}) {
  return (
    <DitherShader
      aria-hidden="true"
      field={COVER_FIELD}
      palette={["--dither-paper", "--dither-ink"]}
      matrix="bayer8"
      speed={0.6}
      stillTime={8 + (seedFrom(seed) % 5)}
      uniforms={{ coverSeed: seedFrom(seed), coverIntensity: intensity }}
      className={cn("pointer-events-none absolute inset-0 h-full w-full select-none", className)}
      fallback={
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 35% 40%, color-mix(in oklch, var(--primary) 35%, transparent) 0%, transparent 65%)",
          }}
        />
      }
    />
  )
}
