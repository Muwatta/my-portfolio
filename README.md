# Abdullahi Musliudeen — Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live-vercel.com-000000?style=flat-square&logo=vercel)](https://my-portfolio.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Decap CMS](https://img.shields.io/badge/Decap%20CMS-GitHub-181717?style=flat-square&logo=github)](https://decapcms.org/)

A modern, fully responsive personal portfolio built with React and Vite — showcasing full-stack engineering projects, technical skills, and writing.

🔗 **Live:** hosted on Vercel

---

## ✨ Features

- **Dark / Light theme** — persists across sessions via localStorage
- **Mobile-first design** — fully responsive across all screen sizes
- **Animated UI** — smooth page transitions and micro-interactions via Framer Motion
- **Blog system** — Markdown-backed with search and category filtering
- **Admin editor** — Decap CMS at `/admin/`, backed by GitHub (works on your phone)
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
| Content management | Decap CMS + GitHub |
| SEO | React Helmet Async |
| Icons | React Icons |
| Fonts | Google Fonts (Syne + Lora) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
my-portfolio/
├── public/
│   ├── blog.json          # Generated blog index
│   ├── admin/             # Decap CMS entry point and configuration
│   └── images/            # Static images
├── src/
│   ├── components/
│   │   ├── layout/        # Navbar, Footer, AnimatedBackground, Loader
│   │   └── ui/            # SectionHeader, Badge, MagneticButton
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   └── AuthContext.jsx # Legacy auth context
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
│   │   ├── supabase.js    # Optional legacy content client
│   │   └── blog.js        # Static blog data service
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
│   ├── build-blog.js      # Generates blog.json from Markdown
│   └── import-posts.js    # Legacy Supabase import utility
├── content/blog/          # Markdown posts managed by Decap CMS
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

A private admin editor is available at **`/admin/`**. Sign in with GitHub and
you can create, edit, and delete posts with a phone-friendly form.

1. Configure GitHub OAuth for Decap CMS and update `public/admin/config.yml`.
2. Visit `https://<your-site>/admin/`
3. Log in with GitHub and create or edit posts.

### How it works (security)

- Blog posts live as Markdown files in `content/blog/`.
- Decap CMS uses GitHub commits or pull requests for editorial changes.
- Configure OAuth before deploying; never put a GitHub client secret in the frontend.

### Setup checklist

1. Create a GitHub OAuth App with callback URL
   `https://www.muwatta.com.ng/api/callback`.
2. Add `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, and `SITE_URL` to Vercel.
3. Deploy and visit `https://www.muwatta.com.ng/admin/`.
4. Commit CMS changes so the deployment rebuilds `public/blog.json`.

**Categories:** `Tech` · `Education` · `IoT` · `Frontend`

> `public/blog.json` is generated at build time from Markdown files in
> `content/blog/`. No database or runtime environment variables are required.

---

## 📬 Contact Form

Uses [EmailJS](https://emailjs.com). Update credentials in `src/pages/Contact.jsx`:

```js
emailjs.send("SERVICE_ID", "TEMPLATE_ID", payload, "PUBLIC_KEY")
```

---

## 🌐 Deployment

Hosted on **Vercel** with auto-deploys from the `master` branch (GitHub).

`vercel.json` configures SPA rewrites for application routes. The static
`/admin/` directory is served directly by Vercel for Decap CMS.

### Env vars (Project Settings → Environment Variables)

| Variable | Purpose |
|---|---|
| GitHub OAuth | Required by Decap CMS for `/admin/` |

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