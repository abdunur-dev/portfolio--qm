/**
 * CV content — shared by the home page (Experience list) and the /cv page.
 */

export type CvEntry = {
  range: string
  title: string
  org?: string
  desc?: string
  href?: string
}

export const experience: CvEntry[] = [
  {
    range: "2024 — now",
    title: "TibebChain",
    org: "Frontend Lead",
    desc: "Leading the frontend for an NFT publishing platform built for African creators. Smart-contract integration on Base & Scroll, design system, marketplace UX, and creator onboarding flows.",
  },
  {
    range: "2024 — now",
    title: "IRL Meetups & Events",
    org: "Organiser & Speaker",
    desc: "Helping organize IRL meetups and tech events in Addis Ababa — gathering local devs, designers, and founders for talks, hackathons, and hands-on workshops on shipping modern products, AI-assisted building, and Web3.",
  },
  {
    range: "2022 — 2024",
    title: "Freelance",
    org: "Full-Stack & Smart Contract Developer",
    desc: "Shipped dApps on Base and Scroll with TypeScript and Solidity. Built design systems and frontends for early-stage startups across Web3, productivity, and AI.",
  },
  {
    range: "2020 — 2022",
    title: "Self-taught",
    org: "Developer",
    desc: "Started coding during the 2020 lockdown — late-night tutorials, side experiments, and a slow slide into full-stack. Fell in love with creating things on the web.",
  },
]

export const events: CvEntry[] = [
  {
    range: "2024 — now",
    title: "IRL Meetups & Tech Events, Addis Ababa",
    org: "Co-organiser & Speaker",
    desc: "A series of in-person meetups and events for Ethiopian developers, designers, and founders. Curated speaker lineups, hackathons, and workshops to grow the local AI and Web3 builder scene.",
  },
]

export const education: CvEntry[] = [
  {
    range: "2020 — now",
    title: "Self-Directed Learning",
    org: "Internet & open-source",
    desc: "Web development, smart contracts, design, and product — through open courses, docs, and shipping in public.",
  },
]

export const certifications: CvEntry[] = [
  {
    range: "2024",
    title: "The Complete Web Developer Bootcamp",
    org: "Udemy",
    desc: "Full-stack JavaScript, React, Node.js, and modern web fundamentals.",
  },
  {
    range: "2024",
    title: "Ethereum & Solidity: The Complete Developer's Guide",
    org: "Udemy",
    desc: "Smart contract development, dApp architecture, and on-chain testing patterns.",
  },
  {
    range: "2023",
    title: "Responsive Web Design",
    org: "freeCodeCamp",
    desc: "Semantic HTML, CSS layout, accessibility, and responsive design principles.",
  },
  {
    range: "2023",
    title: "JavaScript Algorithms & Data Structures",
    org: "freeCodeCamp",
    desc: "Modern JavaScript, functional programming, and core data structures.",
  },
]

export const skills = [
  "frontend engineering",
  "smart contract development",
  "design systems",
  "product thinking",
  "community building",
  "public speaking",
  "mentorship",
  "technical writing",
]

export const tools = ["figma", "github", "notion", "linear", "vercel", "v0", "claude", "cursor"]

export const technology = [
  "typescript",
  "react",
  "next.js",
  "tailwind",
  "solidity",
  "ethers / viem",
  "base",
  "scroll",
  "supabase",
  "node.js",
  "ai sdk",
]
