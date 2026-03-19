# Abdullahi Musliudeen — Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live-iamabdullahi.netlify.app-00C7B7?style=flat-square&logo=netlify)](https://iamabdullahi.netlify.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

A modern, fully responsive personal portfolio built with React and Vite — showcasing full-stack engineering projects, technical skills, and writing.

🔗 **Live:** [iamabdullahi.netlify.app](https://iamabdullahi.netlify.app/)

---

## ✨ Features

- **Dark / Light theme** — persists across sessions via localStorage
- **Mobile-first design** — fully responsive across all screen sizes
- **Animated UI** — smooth page transitions and micro-interactions via Framer Motion
- **Blog system** — JSON-driven blog with category filtering, search, and newsletter
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
| SEO | React Helmet Async |
| Icons | React Icons |
| Fonts | Google Fonts (Syne + Lora) |
| Deployment | Netlify |

---

## 📁 Project Structure

```
my-portfolio/
├── public/
│   ├── _redirects         # Netlify SPA routing fix
│   ├── blog.json          # Blog posts — edit here to add new posts
│   ├── resume.pdf         # Downloadable CV
│   └── images/            # Static images
├── src/
│   ├── components/
│   │   ├── layout/        # Navbar, Footer, AnimatedBackground, Loader
│   │   └── ui/            # SectionHeader, Badge, MagneticButton
│   ├── context/
│   │   └── ThemeContext.jsx
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
│   └── pages/
│       ├── Home.jsx
│       ├── Portfolio.jsx
│       ├── Skills.jsx
│       ├── About.jsx
│       ├── Blog.jsx
│       ├── BlogPost.jsx
│       └── Contact.jsx
├── netlify.toml
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

## 📝 Adding a Blog Post

Open `public/blog.json` and add a new object to the array:

```json
{
  "id": 5,
  "title": "Your Post Title",
  "excerpt": "Short teaser (1-2 sentences).",
  "body": "Full text here.\n\nNew paragraph.",
  "category": "Tech",
  "date": "March 20, 2025",
  "image": "https://images.unsplash.com/photo?w=800&q=80",
  "medium_link": "https://medium.com/@you/slug",
  "tags": ["Django", "API"],
  "readTime": "5 min read",
  "featured": false
}
```

**Categories:** `Tech` · `Education` · `IoT` · `Frontend`

No rebuild needed — save, commit, push. Netlify auto-deploys.

---

## 📬 Contact Form

Uses [EmailJS](https://emailjs.com). Update credentials in `src/pages/Contact.jsx`:

```js
emailjs.send("SERVICE_ID", "TEMPLATE_ID", payload, "PUBLIC_KEY")
```

---

## 🌐 Deployment

Hosted on **Netlify** with auto-deploys from `master`.

`netlify.toml` configures:
- SPA routing redirects
- Security headers (X-Frame-Options, XSS Protection, Content-Type-Options)
- Asset caching (1 year for JS/CSS, 1 hour for blog.json)

---

## 🔒 Security Headers

| Header | Value |
|---|---|
| X-Frame-Options | DENY |
| X-XSS-Protection | 1; mode=block |
| X-Content-Type-Options | nosniff |
| Referrer-Policy | strict-origin-when-cross-origin |

---

## 📄 License

MIT — free to use as a template. Attribution appreciated.

---

## 👤 Author

**Abdullahi Musliudeen Oladipupo**

- 🌐 [iamabdullahi.netlify.app](https://iamabdullahi.netlify.app/)
- 💼 [github.com/Muwatta](https://github.com/Muwatta)
- 🔗 [LinkedIn](https://www.linkedin.com/in/abdullahi-musliudeen-166b751b6)
- 🐦 [@MusliudeenAbdu1](https://x.com/MusliudeenAbdu1)

---

> Built with ☕ and late nights in Jos, Nigeria.