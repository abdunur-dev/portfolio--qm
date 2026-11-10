/**
 * Community events Burhan has organised in Addis Ababa.
 * Numbers come straight from the write-ups in lib/posts-data.ts.
 */
export type Gathering = {
  name: string
  partner: string
  date: string
  stat: string
  statLabel: string
  note: string
  slug: string
}

export const gatherings: Gathering[] = [
  {
    name: "Zero to Agents Addis Ababa",
    partner: "with Vercel",
    date: "May 2026",
    stat: "#1 & #2",
    statLabel: "global placings",
    note: "Local builders took the top two spots among ~8,000 builders in 40+ countries.",
    slug: "zero-to-agents-addis-ababa-my-second-event-global-winners-and-the-power-of-local-builders",
  },
  {
    name: "Raycast Meetup Addis",
    partner: "Raycast Ambassador",
    date: "Aug 2026",
    stat: "80+",
    statLabel: "in the room",
    note: "Ethiopia's first official Raycast meetup — 200+ registered.",
    slug: "i-brought-raycast-to-ethiopia",
  },
  {
    name: "v0 IRL Addis Ababa",
    partner: "Vercel Super Host",
    date: "Feb 2026",
    stat: "28",
    statLabel: "countries in the series",
    note: "Addis joined a global run of 60+ v0 IRL events and 5,000 builders.",
    slug: "v0-irl-addis-ababa-prompt-to-production-2026-recap",
  },
]
