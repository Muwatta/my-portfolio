export const projects = [
  {
    id: "ssc-cooperative",
    title: "SSC Cooperative — Full Stack Management System",
    category: "Full Stack",
    description:
      "Complete cooperative management system with role-based access for Admin, Committee, and Staff. Features member registration, savings posting, loan applications with 2‑stage approval, surety management, repayment tracking, and automated email notifications via Resend (banking‑style templates). Built with a secure Django REST API and a responsive React + TypeScript frontend, deployed on Render and Vercel.",
    tech: [
      "Django REST",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "PostgreSQL",
      "Resend",
      "JWT",
      "Framer Motion",
    ],
    metrics: [
      "Live in production",
      "Banking‑style email templates",
      "Loan approval workflow",
      "Dark mode support",
    ],
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1782392024/Screenshot_2026-06-25_131450_idclwm.png",
    github: "https://github.com/Muwatta/ssc-cooperative-system",
    live: "https://solacestaffcooperative.com.ng",
    featured: true,
  },
  {
    id: "kma-spices",
    title: "KMA Spices & Herbs — E‑commerce Website",
    category: "Full Stack",
    description:
      "A full‑featured e‑commerce platform for a Nigerian spice business. Customers can browse spices, add to cart, checkout via bank transfer or cash on delivery, manage orders, and edit their profile. Admins have a dedicated dashboard with real‑time order notifications, product and content management, and inventory reports. Built with Next.js 14 (App Router), Supabase (Auth, PostgreSQL, Storage, Realtime), Tailwind CSS, and deployed on Vercel.",
    tech: [
      "Next.js 14",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
      "Resend",
      "Vercel",
    ],
    metrics: [
      "Real‑time admin dashboard",
      "Bank transfer / COD",
      "WhatsApp ordering",
    ],
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1782392970/Screenshot_2026-06-25_140609_ggutei.png",
    github: "https://github.com/muwatta/spices_shop",
    live: "https://www.kmaglobalink.com.ng",
    featured: true,
  },
  {
    id: "dghi-academy",
    title: "DGHI Academy — School Website",
    category: "Full Stack",
    description:
      "A complete school website with separate sections for morning school and evening madrasa. Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase for authentication and real‑time order management. Includes dynamic forms, analytics, and WhatsApp integration.",
    tech: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Vercel",
      "Resend",
      "Zustand",
    ],
    metrics: ["200+ visitors (first week)"],
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1775469651/logo_dgh_lynlvp.jpg",
    github: "https://github.com/muwatta/dgh-academy",
    live: "https://dghacademy.com.ng",
    featured: true,
  },
  {
    id: "nexus-lms",
    title: "NexusLMS — Full Stack LMS",
    category: "Full Stack",
    description:
      "Monorepo LMS with a production-ready Django REST backend — JWT auth across 5 user roles (Super Admin, School Admin, Instructor, Student, Parent), auto-graded quizzes, Paystack payments with webhook verification, PDF result generation, and a React + Vite frontend.",
    tech: [
      "Django REST",
      "React",
      "TypeScript",
      "Vite",
      "PostgreSQL",
      "Paystack",
      "Docker",
    ],
    metrics: ["5-role RBAC", "Full test suite", "Paystack integrated"],
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1773992371/Screenshot_2026-03-20_081149_gqfud9.png",
    github: "https://github.com/Muwatta/nexuslms",
    live: null,
    featured: true,
  },
  {
    id: "nextalk",
    title: "NexTalk — Messaging API",
    category: "Backend",
    description:
      "Real-time messaging REST API built with Django signals, a custom ORM manager for unread messages, nested routing, async operations, and a full CI/CD pipeline. Containerized and production-ready.",
    tech: ["Django REST", "PostgreSQL", "Docker", "GitHub Actions"],
    metrics: ["Signal-driven", "Custom ORM manager", "CI/CD ready"],
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1741622032/Data-Filteration_ggkqyy.png",
    github: "https://github.com/Muwatta/NexTalk",
    live: null,
    featured: true,
  },
  {
    id: "agroguard",
    title: "AgroGuard — AI Crop Protection",
    category: "AI + IoT",
    description:
      "Autonomous crop protection system using computer vision for disease detection, ML-based classification, growth tracking over time, and an AI advisory engine for irrigation and protection recommendations.",
    tech: ["Python", "OpenCV", "Flask", "ML", "Raspberry Pi"],
    metrics: ["Disease detection", "ML classification", "Advisory engine"],
    image: "/images/agroguard.png",
    github: "https://github.com/Muwatta/agroguard",
    live: null,
    featured: true,
  },
  {
    id: "nexus-fintech",
    title: "Nexus Fintech — Full Stack",
    category: "Full Stack",
    description:
      "Full-stack fintech platform — a secure Django REST backend exposing JWT-authenticated JSON endpoints, paired with a responsive React + TypeScript frontend built with Tailwind CSS and Vite.",
    tech: [
      "Django REST",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "JWT",
      "Docker",
    ],
    metrics: ["Secure JWT Auth", "REST + React", "Dockerized"],
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1773992369/Screenshot_2026-03-20_083744_p8fjvc.png",
    github: "https://github.com/Muwatta/nexus-fintech-backend",
    live: null,
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProjectById = (id) => projects.find((p) => p.id === id);
