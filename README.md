# Abdurhaman Nur (Burhan) · Personal Portfolio & Engineering Platform

Personal portfolio, engineering journal, and content management platform built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

Live website: [burhan.ink](https://burhan.ink)

---

## ✦ Overview

- **Minimalist Folio Interface:** Clean, typography-driven UI inspired by high-craft developer portfolios.
- **Dynamic Content Management:** Secure admin panel (`/admin`) backed by Supabase with Row Level Security (RLS) for posts, projects, now/highlights, and testimonials.
- **Interactive Multi-Image Carousel:** Fluid touch-swipe image slider for articles with multiple photos.
- **ATS & International Standard CV:** Print- and PDF-optimized 2-column curriculum vitae (`/cv`) formatted for global tech opportunities.
- **Real-time Verification:** Dynamic public APIs and cached server actions for high-performance edge rendering on Vercel.

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 (Turbopack, App Router, Server Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Lucide Icons, Motion (Framer Motion)
- **Database & Auth:** Supabase (PostgreSQL, Storage, RLS)
- **Deployment:** Vercel

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/abdunur-dev/portfolio--qm.git
cd portfolio--qm
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the site.

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (pages, API routes, admin)
│   ├── (public)/         # Home, writing, cv, about, highlights
│   ├── admin/            # Secure CMS dashboard & server actions
│   └── api/              # Public REST endpoints
├── components/           # Reusable UI components & design system
├── docs/                 # System guides and technical documentation
├── lib/                  # Shared data loaders, Supabase clients & types
└── public/               # Static assets & media
```

---

## 📄 License

MIT © [Abdurhaman Nur](https://burhan.ink)
