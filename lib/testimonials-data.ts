export type Testimonial = {
  id: string
  author: string
  role: string
  content: string
  avatar?: string
  image?: string
  link?: string
  verified?: boolean
  company?: string
}

export const staticTestimonials: Testimonial[] = [
  {
    id: "5a0f354e-1c5b-49e9-a855-8adbbeecadca",
    author: "adil",
    role: "software eng at @raycast",
    content: "Hi, the team was super impressed with the event you hosted 🙌",
    avatar: "/testimonials/testimonial-0.jpg",
    image: "/testimonials/testimonial-0.jpg",
    link: "https://x.com/adilrc_",
    verified: false,
  },
  {
    id: "4ae06c6d-ee05-4661-b498-2d48f1e512c0",
    author: "Stephanie Leong",
    role: "Community Manager at Raycast",
    content:
      "WOOOW!\ni love the idea of giving more local users a platform to share how they work and build with raycast.\na huge thank you to you @Burhan for making this happen. we’re so grateful for your initiative and excited to see where this momentum goes next!",
    avatar: "/testimonials/testimonial-1.jpg",
    image: "/testimonials/testimonial-1.jpg",
    link: "https://www.linkedin.com/in/stephanie-leong0/",
    verified: false,
  },
  {
    id: "47b5ef97-5bb8-4fc1-a9f0-c5fc6c4d0ec3",
    author: "Maya Avendaño",
    role: "▲ community engineer at Vercel",
    content:
      "WOAH!! Abdurhaman this is HUGE! Love seeing the community you're building in Ethiopia. Keep pushing!",
    avatar: "/testimonials/testimonial-2.jpg",
    image: "/testimonials/testimonial-2.jpg",
    link: "https://x.com/mayvencraft",
    verified: false,
  },
  {
    id: "b45492d5-e6a3-4158-b1fc-40e94bb5ee7f",
    author: "Thomas Paul Mann",
    role: "CEO at Raycast",
    content: "Congrats on the meetup! Looks like a great turnout. Keep up the good work!",
    avatar: "/testimonials/testimonial-3.jpg",
    image: "/testimonials/testimonial-3.jpg",
    link: "https://x.com/thomaspaulmann",
    verified: false,
  },
]
