# Abdullahi Musliudeen — Backend Engineer & Full-Stack Developer

[![Live Portfolio](https://img.shields.io/badge/Portfolio-iamabdullahi.netlify.app-00C7B7?style=flat-square\&logo=netlify)](https://iamabdullahi.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-muwatta-181717?style=flat-square\&logo=github)](https://github.com/muwatta)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Abdullahi%20Musliudeen-0A66C2?style=flat-square\&logo=linkedin)](https://www.linkedin.com/in/abdullahi-musliudeen-166b751b6)
[![CI](https://img.shields.io/badge/CI-Lint%20%7C%20Test%20%7C%20Build-success?style=flat-square)](https://github.com/muwatta/my-portfolio/actions)

> **A personal portfolio built to showcase how I design, build, and ship software — with a focus on backend engineering, full-stack systems, and real-world problem solving.**

🌐 **Live:** [iamabdullahi.netlify.app](https://iamabdullahi.netlify.app/)

---

## About the Project

This portfolio is more than a collection of project screenshots.

It is designed to show:

* how I approach software problems
* the systems I have built for real users and organizations
* my backend and full-stack engineering capabilities
* selected work across **EdTech, business systems, AI, and IoT**
* technical writing and engineering notes

My primary engineering focus is **Python, Django, Django REST Framework, PostgreSQL, Redis, and React/TypeScript**.

---

## What the Portfolio Showcases

### Backend Engineering

* REST API development
* Authentication and authorization
* Role-based access control
* Relational data modelling
* PostgreSQL
* Redis caching
* Asynchronous processing
* API-driven application architecture

### Full-Stack Development

* React
* TypeScript
* JavaScript
* Next.js
* Tailwind CSS
* Responsive interfaces
* API integration

### Engineering & Delivery

* Docker
* GitHub Actions
* CI/CD
* Linux
* Production-oriented workflows
* Testing and linting
* SEO and performance optimization

### AI & Systems

* Machine Learning
* Computer Vision
* OpenCV
* Arduino
* IoT
* Smart systems

---

## Featured Work

The portfolio highlights projects based on **problem complexity, real-world value, and engineering depth**, including:

### ATE Management System

Operational platform built for Algorise Tech Explorers and used by **100+ users**.

### SSC Cooperative Management System

A production-oriented platform for members, savings, loans, sureties, approvals, reporting, and auditing.

### ShopCore

Backend-focused e-commerce system demonstrating **JWT authentication, Redis caching, Celery/RabbitMQ, Docker, and CI/CD**.

### NexTalk

Django REST messaging API demonstrating **permissions, custom ORM managers, nested routing, pagination, signals, asynchronous operations, and automated testing**.

### Madrasah LMS

Education-focused backend system covering users, roles, learning structures, and administrative workflows.

### AgroGuard

AI + IoT system combining **computer vision, machine learning, Arduino, sensors, and automatic irrigation**.

---

## Key Features

* **Responsive design** across desktop, tablet, and mobile
* **Dark / light theme** with persisted user preference
* **Animated interactions** powered by Framer Motion
* **Project showcase** with GitHub and live-demo links
* **Technical blog** with search, filtering, tags, and featured posts
* **Contact form** with EmailJS
* **SEO metadata** with React Helmet Async
* **Code splitting and asset optimization** through Vite
* **Client-side routing** with React Router
* **Automated CI checks** for linting, testing, and production builds

---

## Tech Stack

| Area       | Technology                       |
| ---------- | -------------------------------- |
| Frontend   | React 18, TypeScript, JavaScript |
| Build      | Vite                             |
| Styling    | Tailwind CSS                     |
| Animation  | Framer Motion                    |
| Routing    | React Router                     |
| Forms      | EmailJS                          |
| SEO        | React Helmet Async               |
| Icons      | React Icons                      |
| Content    | JSON-based blog data             |
| Deployment | Netlify                          |
| Quality    | ESLint, Vitest, GitHub Actions   |

---

## Architecture

```text
                    ┌─────────────────────┐
                    │      Visitor        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │  Pages + Components │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        React Router      Blog Content      Contact Form
                           (JSON)             (EmailJS)
              │
              ▼
        SEO / UI / Animation
              │
              ▼
          Vite Build
              │
              ▼
           Netlify
```

---

## Project Structure

```text
my-portfolio/
├── public/
│   ├── _redirects
│   ├── blog.json
│   ├── resume.pdf
│   └── images/
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   ├── ThemeContextValue.js
│   │   └── useTheme.js
│   │
│   ├── data/
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── testimonials.js
│   │   ├── stats.js
│   │   └── navigation.js
│   │
│   ├── features/
│   │   ├── home/
│   │   └── portfolio/
│   │
│   ├── hooks/
│   │   └── useInView.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Skills.jsx
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   └── Contact.jsx
│   │
│   └── __tests__/
│
├── .github/
│   └── workflows/
│       └── node.js.yml
│
├── netlify.toml
├── eslint.config.js
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

* Node.js 22+
* npm

### Installation

```bash
git clone https://github.com/muwatta/my-portfolio.git
cd my-portfolio
npm ci
```

### Development

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

### Lint

```bash
npm run lint
```

### Tests

```bash
npm test -- --run
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Content Management

### Add a Blog Post

Blog content is stored in:

```text
public/blog.json
```

Each post supports:

```json
{
  "id": 1,
  "title": "Designing Better Django APIs",
  "excerpt": "Lessons from building backend systems with Django REST Framework.",
  "body": "Full article content...",
  "category": "Tech",
  "date": "August 30, 2026",
  "image": "/images/blog-cover.jpg",
  "medium_link": "https://medium.com/...",
  "tags": ["Django", "DRF", "Backend"],
  "readTime": "6 min read",
  "featured": true
}
```

Supported categories:

```text
Tech · Education · IoT · Frontend
```

---

## Quality & CI

The repository uses GitHub Actions to automatically validate changes.

Every push or pull request runs:

```text
Install dependencies
        ↓
      Lint
        ↓
      Test
        ↓
      Build
```

The goal is to ensure that the portfolio remains deployable as the codebase evolves.

---

## Deployment

The portfolio is deployed on **Netlify**.

Deployment configuration supports:

* SPA routing
* security headers
* asset caching
* automated deployment from GitHub

---

## Security

Current security-related configuration includes:

| Header                   | Configuration                     |
| ------------------------ | --------------------------------- |
| `X-Frame-Options`        | `DENY`                            |
| `X-XSS-Protection`       | `1; mode=block`                   |
| `X-Content-Type-Options` | `nosniff`                         |
| `Referrer-Policy`        | `strict-origin-when-cross-origin` |

---

## Design Principles

This portfolio follows a few simple principles:

**Evidence over claims**
Projects are presented around what was actually built and why it matters.

**User-centric content**
Visitors should understand the problem, solution, and outcome before the implementation details.

**Engineering depth**
Important projects document architecture, technical decisions, and trade-offs.

**Progressive disclosure**
Recruiters can get the key information quickly, while engineers can explore deeper technical details.

---

## Roadmap

Planned improvements include:

* project case-study pages
* architecture diagrams
* engineering decision notes
* stronger accessibility coverage
* richer automated tests
* performance and Core Web Vitals monitoring
* improved project filtering and search
* technical writing focused on backend engineering and system design

---

## Author

**Abdullahi Oladipupo Musliudeen**

Backend Engineer · Full-Stack Software Engineer

* 🌐 [Portfolio](https://iamabdullahi.netlify.app/)
* 💻 [GitHub](https://github.com/muwatta)
* 💼 [LinkedIn](https://www.linkedin.com/in/abdullahi-musliudeen-166b751b6)
* ✉️ [Email](mailto:abdullahmusliudeen@gmail.com)
* 𝕏 [X](https://x.com/MusliudeenAbdu1)

---

> I build software for real users, learn from real problems, and document what I learn.
