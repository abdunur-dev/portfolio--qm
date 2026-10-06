export type Project = {
  title: string
  kind: string
  description: string
  stack: string[]
  cover_url?: string | null
  links?: { label: string; href: string }[]
}

export type ProjectYear = {
  year: string
  projects: Project[]
}

export const projectsByYear: ProjectYear[] = [
  {
    year: "2026",
    projects: [
      {
        title: "SolAgent",
        kind: "side",
        description:
          "SOL Agentic is an AI-powered blockchain agent that enables users to create and execute Solana transactions through natural language commands. The platform uses intelligent agents to understand user intent, automate on-chain actions, and simplify blockchain interactions with a seamless AI-driven experience.",
        stack: ["AI", "Solana", "Next.js", "TypeScript"],
        links: [
          { label: "Live", href: "https://sol-agentic.vercel.app/" },
          { label: "Repo", href: "https://github.com/abdunur-dev/solAgent.git" },
        ],
      },
    ],
  },
  {
    year: "2025",
    projects: [
      {
        title: "TibebChain",
        kind: "side",
        description:
          "a web3 platform built on Base where creators upload articles and digital art and showcase them in an NFT gallery, with crypto-based purchases. focused on decentralised publishing, creator ownership, and transparent on-chain transactions.",
        stack: ["Next.js", "Base", "NFT", "Solidity"],
        links: [
          { label: "Live", href: "https://tibebnft.vercel.app/" },
          { label: "Repo", href: "https://github.com/abdunur-dev/TibebChain-Nft" },
        ],
      },
      {
        title: "VibeVerse",
        kind: "side",
        description:
          "a 3D NFT marketplace built on Scroll Mainnet, an immersive environment where users explore and interact with NFTs through a visually engaging 3D interface.",
        stack: ["Three.js", "Scroll", "Web3", "Next.js"],
        links: [
          { label: "Live", href: "https://vibethreenft.vercel.app/" },
          { label: "Repo", href: "https://github.com/abdunur-dev/Nft-project-" },
        ],
      },
      {
        title: "Team Chat",
        kind: "side",
        description:
          "a real-time communication and collaboration platform inspired by Discord. live messaging, file/image sharing, reactions, auth, and community-based chats. plans to evolve into a Web3-enabled platform.",
        stack: ["Next.js", "TypeScript", "WebSocket", "Tailwind"],
        links: [
          { label: "Live", href: "https://tchatgp.vercel.app/" },
          { label: "Repo", href: "https://github.com/abdunur-dev/tchatgp" },
        ],
      },
      {
        title: "Base Link",
        kind: "side",
        description:
          "a clean UI project built on Base using OnchainKit, designed to help developers easily interact with on-chain features like wallet connection, status, and basic blockchain interactions. usability and DX-first.",
        stack: ["React", "Solidity", "Base", "Ethers.js"],
        links: [
          { label: "Live", href: "https://baselink-app.vercel.app/" },
          { label: "Repo", href: "https://github.com/abdunur-dev/dev3pack2" },
        ],
      },
    ],
  },
  {
    year: "2024",
    projects: [
      {
        title: "Crewpay",
        kind: "side",
        description:
          "PayCrew is a team payment and payroll management platform that helps users manage members, organize payments, and streamline payroll transactions in one place. The platform allows teams to add members, handle salary distribution, and manage financial workflows through a simple and modern interface.",
        stack: ["Next.js", "TypeScript", "Tailwind", "Fintech"],
        links: [
          { label: "Live", href: "https://paycrew.vercel.app" },
          { label: "Repo", href: "https://github.com/abdunur-dev/paycrew" },
        ],
      },
      {
        title: "Salah Apologetics",
        kind: "work",
        description:
          "an Islamic Q&A site where users ask questions and get clear, reliable answers about faith, practice, and belief. focused on easy access to knowledge and accurate guidance.",
        stack: ["Next.js", "TypeScript", "Tailwind", "Search"],
        links: [
          { label: "Live", href: "https://salahapologetics.com/" },
        ],
      },
      {
        title: "GuardHer AI",
        kind: "side",
        description:
          "a social media safety tool that analyses and filters harmful text and images, generates reports, and supports community reporting. detects unsafe content and surfaces actionable insight.",
        stack: ["AI", "React", "Next.js", "TypeScript"],
        links: [
          { label: "Live", href: "https://guardherai.vercel.app/" },
          { label: "Repo", href: "https://github.com/abdunur-dev/guardherai" },
        ],
      },
      {
        title: "Voiced",
        kind: "side",
        description:
          "an AI-powered voice diary that transforms spoken or typed input into personalised diary entries — formal, motivational, or creative. for productivity, self-reflection, and content creation.",
        stack: ["AI", "Voice", "Next.js", "Tailwind"],
        links: [
          { label: "Live", href: "https://voiced-ai.vercel.app/" },
          { label: "Repo", href: "https://github.com/abdunur-dev/voiced" },
        ],
      },
    ],
  },
]
