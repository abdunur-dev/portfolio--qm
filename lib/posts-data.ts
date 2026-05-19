export type Block = { type: "p" | "h2"; text: string }

export type Post = {
  title: string
  slug: string
  date: string
  year: number
  excerpt: string
  reading: string
  href?: string
  body?: Block[]
}

export const posts: Post[] = [
  {
    title: "On building in public, quietly",
    slug: "building-in-public-quietly",
    date: "Mar 2026",
    year: 2026,
    excerpt:
      "There's a version of building in public that's all noise. I'm trying a different one — slower, smaller, more honest.",
    reading: "5 min read",
    body: [
      {
        type: "p",
        text: "There's a version of building in public that feels like a megaphone. Daily threads, screenshot dumps, growth charts. I tried it for a season and it left me hollow — performing the work instead of doing it.",
      },
      {
        type: "h2",
        text: "A quieter cadence",
      },
      {
        type: "p",
        text: "What works for me now is something smaller. A weekly note, a single screenshot, an honest line about what I shipped and what I broke. Less audience, more accountability. The signal lives in the consistency, not the volume.",
      },
      {
        type: "p",
        text: "Quiet doesn't mean secret. It means the work comes first, and the talking-about-the-work comes second.",
      },
    ],
  },
  {
    title: "Notes from shipping a Web3 app to non-crypto users",
    slug: "web3-non-crypto-users",
    date: "Jan 2026",
    year: 2026,
    excerpt:
      "What I learned designing TibebChain for people who didn't come for the chain — they came for the books.",
    reading: "8 min read",
    body: [
      {
        type: "p",
        text: "TibebChain is a reading platform that happens to live on a blockchain. Most of our readers don't know what a wallet is, and they shouldn't have to. The chain is the plumbing. The books are the product.",
      },
      {
        type: "h2",
        text: "Hide the chain, keep the trust",
      },
      {
        type: "p",
        text: "We use email login, sponsored transactions, and a UI that never says 'gas' to a reader. The on-chain receipts are still there — verifiable, portable, ownable — but they're a feature you discover, not a tax you pay.",
      },
    ],
  },
  {
    title: "Faith, software, and the long obedience",
    slug: "faith-software-long-obedience",
    date: "Nov 2025",
    year: 2025,
    excerpt:
      "Most of programming is showing up tomorrow with the same care you had today. Some thoughts on craft as a quiet discipline.",
    reading: "6 min read",
  },
  {
    title: "The case for boring tech in side projects",
    slug: "boring-tech-side-projects",
    date: "Aug 2025",
    year: 2025,
    excerpt:
      "Postgres, server actions, a single deploy target. The fastest way to ship something you'll actually finish.",
    reading: "4 min read",
  },
]
