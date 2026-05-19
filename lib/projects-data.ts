export type Project = {
  title: string
  kind: string
  description: string
  stack: string[]
  links?: { label: string; href: string }[]
}

export type ProjectYear = {
  year: string
  projects: Project[]
}

export const projectsByYear: ProjectYear[] = [
  {
    year: "2025",
    projects: [
      {
        title: "TibebChain",
        kind: "Web3 platform",
        description:
          "a web3 platform built on Base where creators upload articles and digital art and showcase them in an NFT gallery, with crypto-based purchases. focused on decentralised publishing, creator ownership, and transparent on-chain transactions.",
        stack: ["Next.js", "Base", "Web3", "TypeScript"],
        links: [{ label: "Live", href: "#" }],
      },
      {
        title: "Base Link",
        kind: "Developer tool",
        description:
          "a clean UI project built on Base using OnchainKit, designed to help developers easily interact with on-chain features like wallet connection, status, and basic blockchain interactions. usability and DX-first.",
        stack: ["React", "Solidity", "Base", "Ethers.js"],
        links: [{ label: "Live", href: "#" }],
      },
      {
        title: "Neo dapp",
        kind: "Side project",
        description:
          "a Base-powered dApp focused on easy and secure claiming transactions, with plans for expanded on-chain features. emphasises clean UX, smooth blockchain interactions, and scalability on Base.",
        stack: ["Next.js", "TypeScript", "Base", "DApp"],
        links: [{ label: "Live", href: "#" }],
      },
      {
        title: "VibeVerse",
        kind: "3D NFT marketplace",
        description:
          "a 3D NFT marketplace built on Scroll Mainnet, an immersive environment where users explore and interact with NFTs through a visually engaging 3D interface.",
        stack: ["React", "Web3", "TypeScript", "Blockchain"],
        links: [{ label: "Live", href: "#" }],
      },
    ],
  },
  {
    year: "2024",
    projects: [
      {
        title: "Salah Apologetics",
        kind: "Public-interest project",
        description:
          "an Islamic Q&A site where users ask questions and get clear, reliable answers about faith, practice, and belief. focused on easy access to knowledge and accurate guidance.",
        stack: ["Next.js", "TypeScript", "Tailwind", "API Integration"],
        links: [{ label: "Live", href: "#" }],
      },
      {
        title: "Voiced",
        kind: "AI side project",
        description:
          "an AI-powered voice diary that transforms spoken or typed input into personalised diary entries — formal, motivational, or creative. for productivity, self-reflection, and content creation.",
        stack: ["Next.js", "TypeScript", "Tailwind", "AI"],
        links: [{ label: "Live", href: "#" }],
      },
      {
        title: "Team Chat",
        kind: "Real-time app",
        description:
          "a real-time communication and collaboration platform inspired by Discord. live messaging, file/image sharing, reactions, auth, and community-based chats. plans to evolve into a Web3-enabled platform.",
        stack: ["Next.js", "TypeScript", "tRPC", "Supabase"],
        links: [{ label: "Live", href: "#" }],
      },
      {
        title: "GuardHer AI",
        kind: "Hackathon project",
        description:
          "a social media safety tool that analyses and filters harmful text and images, generates reports, and supports community reporting. detects unsafe content and surfaces actionable insight.",
        stack: ["React", "Web3", "TypeScript", "Blockchain"],
        links: [{ label: "Live", href: "#" }],
      },
    ],
  },
  {
    year: "2023",
    projects: [
      {
        title: "abdudevapp.vercel.app",
        kind: "Personal website",
        description:
          "this site! my little corner of the internet — projects, talks, and the occasional experiment.",
        stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
        links: [{ label: "Live ↗", href: "https://abdudevapp.vercel.app" }],
      },
      {
        title: "Smart Contract Experiments",
        kind: "Learning in public",
        description:
          "early Solidity contracts and DApp experiments while diving into Web3 — the foundation for everything that came after.",
        stack: ["Solidity", "Ethers.js", "Hardhat"],
      },
    ],
  },
  {
    year: "2022",
    projects: [
      {
        title: "First Full-Stack Builds",
        kind: "Frontend journey",
        description:
          "leveling up with React, Next.js and TypeScript — building UIs, learning architecture, and shipping side projects on weekends.",
        stack: ["React", "Next.js", "TypeScript", "Tailwind"],
      },
    ],
  },
]
