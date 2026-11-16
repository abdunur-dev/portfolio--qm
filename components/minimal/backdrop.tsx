/**
 * Full-page atmosphere: a heavily blurred black-and-white photo fixed behind
 * everything, under a strong, even theme tint so text always sits on a calm
 * surface. Pre-blurred at build time (tiny file), no runtime blur cost.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden print:hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero/bg-blur.jpg"
        alt=""
        decoding="async"
        fetchPriority="low"
        className="absolute inset-0 size-full scale-110 object-cover"
      />
      <div className="site-backdrop-tint absolute inset-0" />
    </div>
  )
}
