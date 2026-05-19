import Link from "next/link"
import { SiteNav } from "@/components/site-nav"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="font-serif text-6xl leading-none tracking-tight text-foreground sm:text-7xl">
          hi, I&apos;m burhan_
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground/75">
          web3 & full-stack developer crafting decentralised applications and
          modern web experiences.
        </p>
        <p className="mt-6 text-base text-foreground/75">
          See{" "}
          <Link
            href="/all"
            className="underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
          >
            all projects →
          </Link>
        </p>
      </main>
    </div>
  )
}
