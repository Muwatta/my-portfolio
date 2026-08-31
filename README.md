# Abdullahi Musliudeen — Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live-vercel.com-000000?style=flat-square&logo=vercel)](https://my-portfolio.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Blog%20%26%20Admin-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)

A modern, fully responsive personal portfolio built with React and Vite — showcasing full-stack engineering projects, technical skills, and writing.

🔗 **Live:** hosted on Vercel

---

## ✨ Features

- **Dark / Light theme** — persists across sessions via localStorage
- **Mobile-first design** — fully responsive across all screen sizes
- **Animated UI** — smooth page transitions and micro-interactions via Framer Motion
- **Blog system** — Supabase-backed with search and category filtering
- **Admin editor** — create/edit/delete posts from `/admin` (works on your phone)
- **Contact form** — powered by EmailJS, no backend required
- **SEO ready** — dynamic meta tags via React Helmet Async
- **Performance optimized** — code splitting, chunk caching, and asset optimization via Vite

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion |
| Routing | React Router v6 |
| Forms | EmailJS |
| Backend & Auth | Supabase (Postgres + Auth + RLS) |
| SEO | React Helmet Async |
| Icons | React Icons |
| Fonts | Google Fonts (Syne + Lora) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
my-portfolio/
├── public/
│   ├── blog.json          # Static fallback (only when Supabase is unset)
│   ├── blog/posts/        # Static fallback posts
│   └── images/            # Static images
├── src/
│   ├── components/
│   │   ├── layout/        # Navbar, Footer, AnimatedBackground, Loader
│   │   └── ui/            # SectionHeader, Badge, MagneticButton
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   └── AuthContext.jsx # Supabase auth for the admin editor
│   ├── data/
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── testimonials.js
│   │   ├── stats.js
│   │   └── navigation.js
│   ├── features/
│   │   ├── home/
│   │   └── portfolio/
│   ├── hooks/
│   │   └── useInView.js
│   ├── lib/
│   │   ├── supabase.js    # Client + isSupabaseConfigured
│   │   └── blog.js        # Blog data service (read/write)
│   └── pages/
│       ├── Home.jsx
│       ├── Portfolio.jsx
│       ├── Skills.jsx
│       ├── About.jsx
│       ├── Blog.jsx
│       ├── BlogPost.jsx
│       ├── Admin.jsx      # Private editor for blog posts
│       └── Contact.jsx
├── scripts/
│   ├── build-blog.js      # Regenerates static fallback blog.json
│   └── import-posts.js    # One-time import of posts into Supabase
├── supabase/
│   └── schema.sql         # blog_posts table + RLS policies
├── vercel.json            # SPA rewrites for Vercel
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Muwatta/my-portfolio.git
cd my-portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
npm run build
npm run preview
```

---

## 📝 Managing Blog Posts

### From your phone (recommended)

A private admin editor is built into the app at **`/admin`**. Log in with your
Supabase account and you can create, edit, and delete posts with a
phone-friendly form — no source code or Git needed.

1. Visit `https://<your-site>.vercel.app/admin`
2. Log in with your Supabase Auth account
3. Create / edit / delete posts; changes appear immediately

### How it works (security)

- Blog posts live in a **Supabase Postgres** table (`blog_posts`)
- **Row Level Security (RLS)** is enabled:
  - Anyone (`anon`) can **read** posts
  - Only **authenticated** users can **create / update / delete**
- The `/admin` page requires login via Supabase Auth — only accounts you create
  have access. See `supabase/schema.sql` for the exact policies.

### Setup checklist

1. Create a Supabase project
2. Run `supabase/schema.sql` in the SQL Editor
3. Add an admin user under Authentication → Users
4. Add these env vars in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. _(One-time)_ import existing posts:

   ```bash
   VITE_SUPABASE_URL="https://xxxx.supabase.co" \
   SUPABASE_SERVICE_ROLE_KEY="sb_...service_role" \
   node scripts/import-posts.js
   ```

**Categories:** `Tech` · `Education` · `IoT` · `Frontend`

> The static `public/blog.json` + `public/blog/posts/` files are only used as a
> fallback when Supabase env vars aren't configured (e.g. local dev without
> keys). Once configured, the blog reads and writes directly to Supabase.

---

## 📬 Contact Form

Uses [EmailJS](https://emailjs.com). Update credentials in `src/pages/Contact.jsx`:

```js
emailjs.send("SERVICE_ID", "TEMPLATE_ID", payload, "PUBLIC_KEY")
```

---

## 🌐 Deployment

Hosted on **Vercel** with auto-deploys from the `master` branch (GitHub).

`vercel.json` configures SPA rewrites so every route (including `/admin`)
serves `index.html`. No build command change is needed — `npm run build` runs
the Vite build.

### Env vars (Project Settings → Environment Variables)

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Public anon key (safe in the client) |

---

## 📄 License

MIT — free to use as a template. Attribution appreciated.

---

## 👤 Author

**Abdullahi Musliudeen Oladipupo**

- 🌐 [www.muwatta.com.ng](https://www.muwatta.com.ng/)
- 💼 [github.com/Muwatta](https://github.com/Muwatta)
- 🔗 [LinkedIn](https://www.linkedin.com/in/abdullahi-musliudeen-166b751b6)
- 🐦 [@MusliudeenAbdu1](https://x.com/MusliudeenAbdu1)

---

> Built with ☕ and late nights in Jos, Nigeria.