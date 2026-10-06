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
    range: "2025 — now",
    title: "Full-Stack & Frontend Engineer",
    org: "Zero Hunger AI (Contract / Germany)",
    desc: "Engineering modern, high-performance web applications and AI-driven interfaces for an international mission-driven organization based in Germany. Architecting responsive frontend systems with Next.js, TypeScript, and Tailwind CSS; integrating full-stack API workflows and production AI models with a focus on fluid UX and resilient system design.",
  },
  {
    range: "2025 — now",
    title: "Developer Relations & Community Lead",
    org: "Vercel Super Host · Raycast Ambassador",
    desc: "Recognized as a Vercel Super Host and official Raycast Ambassador. Pioneered developer ecosystems across East Africa, convening 350+ engineers, founders, and designers across high-turnout conferences, live technical demos, and hands-on workshops on modern frontend architecture, AI tooling, and decentralized software.",
  },
  {
    range: "2024 — now",
    title: "Full-Stack & Web3 Engineer",
    org: "Independent / Contract",
    desc: "Architected and delivered production web apps and decentralized solutions across EVM Layer-2s and Solana. Engineered modular design systems, robust frontend architectures, and secure on-chain transaction flows with ethers/viem and AI-agent integrations.",
  },
  {
    range: "2020 — 2024",
    title: "Software Engineer",
    org: "Autonomous Engineering & Open Source",
    desc: "Built scalable web applications, explored reactive frontend architectures, and contributed to open-source software tools with a focus on web performance, accessibility, and modern JavaScript.",
  },
]

export const events: CvEntry[] = [
  {
    range: "2025 — now",
    title: "Vercel & Raycast Developer Ecosystem, Addis Ababa",
    org: "Lead Organizer, Super Host & Keynote Speaker",
    desc: "Partnered with global developer tool leaders (Vercel, Raycast) to host premier developer meetups and hackathons (200+ registrations, 80+ attendees per session). Delivered keynotes and mentored emerging engineers in Next.js, AI integrations, and developer workflows.",
  },
]

export const education: CvEntry[] = [
  {
    range: "In Progress",
    title: "Aviation Sciences",
    org: "Aviation College",
    desc: "Pursuing rigorous aviation studies emphasizing precision systems, aeronautical procedures, risk management, and operational discipline.",
  },
  {
    range: "2020 — now",
    title: "Computer Science & Systems Engineering",
    org: "Self-Directed & Technical Specializations",
    desc: "Advanced self-directed coursework in Systems Design, Distributed Architectures, Full-Stack Engineering, and Web3/AI Protocol Development.",
  },
]

export const certifications: CvEntry[] = [
  {
    range: "2024",
    title: "The Complete Web Developer Bootcamp",
    org: "Udemy",
    desc: "Comprehensive engineering curriculum covering React, Node.js, REST APIs, asynchronous architecture, and database management.",
  },
  {
    range: "2024",
    title: "Ethereum & Solidity: The Complete Developer's Guide",
    org: "Udemy",
    desc: "Advanced EVM architecture, smart contract security patterns, gas optimization, and decentralized application testing.",
  },
  {
    range: "2023",
    title: "JavaScript Algorithms & Data Structures",
    org: "freeCodeCamp",
    desc: "Algorithmic complexity, data structure design, ES6+ design patterns, and functional programming.",
  },
  {
    range: "2023",
    title: "Responsive Web Design & Web Standards",
    org: "freeCodeCamp",
    desc: "Modern semantic markup, WCAG accessibility standards, responsive layouts, and cross-browser performance.",
  },
]

export const skills = [
  "Frontend Architecture & Engineering",
  "Full-Stack Development",
  "Developer Relations (DevRel)",
  "AI Agents & Agentic Workflows",
  "Model Context Protocol (MCP)",
  "API Design & Integration",
  "Design Systems & UI/UX",
  "Community Building & Evangelism",
]

export const tools = [
  "Git & GitHub",
  "Vercel",
  "Supabase",
  "Docker",
  "Figma",
  "Cursor",
  "Postman",
  "Linear",
]

export const technology = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Model Context Protocol (MCP)",
  "Solidity & EVM",
  "Solana",
  "Ethers.js / Viem",
  "PostgreSQL",
  "REST & WebSockets",
]
