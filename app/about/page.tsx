import type { Metadata } from "next"
import Image from "next/image"
import { FolioShell, PageTitle, Section, SectionTitle } from "@/components/folio/ui"
import { SocialIcons } from "@/components/folio/social-icons"

export const metadata: Metadata = {
  title: "About · Abdurhaman Nur",
  description:
    "Web3 & full-stack developer building decentralized apps and modern web experiences from Addis Ababa.",
}

const intro = [
  "I'm a developer, builder, and community organizer based in Addis Ababa, Ethiopia.",
  "I enjoy turning rough ideas into useful things for people. Sometimes that means building a web product from scratch. Sometimes it means experimenting with a new idea, connecting different tools and services, or helping a group of people come together and build something of their own.",
  "My journey into code started during the 2020 lockdown. I began learning through online tutorials during nights and weekends, mostly because I was curious about how the websites and products I used were made. Over time, that curiosity turned into a way of thinking and creating.",
  "Since then, I've worked across different kinds of projects, from early-stage startups and freelance work to digital products, decentralized applications, and tools for creators. I've always been drawn to the space between design and engineering — the part where an idea becomes something tangible that another person can actually use.",
  "Lately, I've been exploring a faster and more intuitive way of building with AI-assisted tools. They've made it easier to move from an idea to a prototype, but the technology is only one part of the process. What matters most to me is having good taste, understanding the people I'm building for, and making something that feels simple and intentional.",
  "A big part of what I do now is connected to community. I help organize meetups and events for builders in Addis Ababa, where I get to learn from other curious people, share ideas, and create spaces where people can build together.",
  "I'm also a collector of curiosities: half-finished side projects, weekend experiments, small tools, and ideas that may or may not become anything. When I'm away from the keyboard, I'm usually walking around Addis Ababa, watching football, sketching in a notebook, reading more books than I finish, or drinking more buna than I should.",
]

const beyond = [
  "I'm drawn to slow mornings, noisy evenings, and the small details that make everyday life feel intentional.",
  "I journal in spurts, mentor new builders when I can, and occasionally pull friends into late-night rabbit holes about technology, creativity, and the future.",
  "Whether it's a button, a margin, or a paragraph, I like making small things feel a little more considered than they need to be.",
]

export default function AboutPage() {
  return (
    <FolioShell back={{ href: "/", label: "Home" }}>
      <div className="flex flex-col gap-12">
        <PageTitle title="About" intro="Hey, I'm Abdurhaman — Full-Stack · Web3 · AI builder." />

        <figure className="folio-in overflow-hidden rounded-md border border-border/60" style={{ animationDelay: "80ms" }}>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/images/burhan-portrait.jpg"
              alt="Abdurhaman speaking at an IRL meetup in Addis Ababa"
              fill
              priority
              sizes="(min-width: 640px) 576px, 100vw"
              className="object-cover"
            />
          </div>
        </figure>

        <div className="folio-in flex flex-col gap-5 text-pretty text-[0.95rem] leading-[1.8] text-foreground" style={{ animationDelay: "120ms" }}>
          {intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <Section>
          <SectionTitle>Beyond the screen</SectionTitle>
          <div className="flex flex-col gap-5 text-pretty text-[0.95rem] leading-[1.8] text-foreground">
            {beyond.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Section>

        <Section>
          <SectionTitle>Let&apos;s connect</SectionTitle>
          <SocialIcons />
        </Section>
      </div>
    </FolioShell>
  )
}
