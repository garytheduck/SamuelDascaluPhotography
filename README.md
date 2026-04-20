# Samuel Dascalu Photography

Portfolio site for Samuel Dascalu — photography & videography.

Built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **MDX** for content, **Framer Motion** for animations, and **Resend** for the contact form. Hosted on **Vercel**.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a new project

Projects live under `content/projects/<slug>/index.mdx`. To add a new one:

1. Create a folder `content/projects/my-new-project/`.
2. Inside it, add `index.mdx` with frontmatter:

```mdx
---
title: "Project title"
date: "2026-05-01"
category: "weddings" # weddings | portraits | events | commercial | travel
location: "Bucharest"
client: "Private"
excerpt: "Short one-line summary."
cover: "/projects/my-new-project/cover.jpg"
gallery:
  - "/projects/my-new-project/01.jpg"
  - "/projects/my-new-project/02.jpg"
featured: true
tags: ["tag1", "tag2"]
---

Paragraph of story text goes here.
```

3. Drop image files into `public/projects/my-new-project/` (or use hosted URLs like Cloudinary / Unsplash — both work in `next/image` because they're whitelisted in `next.config.ts`).
4. `git add . && git commit -m "Add my-new-project" && git push`. Vercel redeploys automatically.

## Structure

```
app/                      Pages (App Router)
  page.tsx                Home — hero, featured, latest, CTA
  work/page.tsx           Portfolio index with filters
  work/[slug]/page.tsx    Project template
  showreel/page.tsx       Videography reel
  about/page.tsx          Bio + process + gear
  contact/page.tsx        Form + info
  api/contact/route.ts    Resend handler
  sitemap.ts / robots.ts  SEO
components/               Reusable UI
lib/
  projects.ts             Reads content/projects/ → Project[]
  site.ts                 Global site config (email, socials, nav)
  cn.ts                   className merge helper
content/projects/         MDX project folders
public/                   Static assets
```

## Deploy

```bash
vercel                    # link + preview deploy
vercel --prod             # production
vercel env add RESEND_API_KEY  # set env vars
```

Or connect the GitHub repo at [vercel.com/new](https://vercel.com/new) for auto-deploy on push.

## Custom domain

After linking to Vercel:

```bash
vercel domains add samueldascaluphotography.ro
```

Follow the DNS instructions in the Vercel dashboard.
