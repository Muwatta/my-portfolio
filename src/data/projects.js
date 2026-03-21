export const projects = [
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
    metrics: ["5-role RBAC", "8/8 tests passing", "Paystack integrated"],
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1773992371/Screenshot_2026-03-20_081149_gqfud9.png",
    github: "https://github.com/Muwatta/nexuslms",
    live: null,
    featured: true,
  },
  {
    id: "shopcore",
    title: "ShopCore — E-Commerce Backend",
    category: "Backend",
    description:
      "Production-grade e-commerce API with JWT role-based auth, Redis caching, async task queues via Celery & RabbitMQ, and a full Docker + GitHub Actions CI/CD pipeline. Live on Render.",
    tech: [
      "Django",
      "PostgreSQL",
      "Redis",
      "Celery",
      "RabbitMQ",
      "Docker",
      "GitHub Actions",
    ],
    metrics: ["Live on Render", "Dockerized", "CI/CD Pipeline"],
    image: "/images/atTheNational.jpg",
    github: "https://github.com/Muwatta/ShopCore",
    live: "https://alx-project-nexus-ng70.onrender.com",
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
    image: "/images/atTheNational.jpg",
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
    image: "/images/scratch_students.jpg",
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
  {
    id: "ate-lms-backend",
    title: "ATE LMS Backend",
    category: "Backend",
    description:
      "Multi-role LMS backend with secure APIs, background email notifications via Celery, and a modular architecture designed for real-world deployment.",
    tech: ["Django REST", "PostgreSQL", "Celery", "JWT"],
    metrics: ["Multi-role RBAC", "Background jobs", "Modular design"],
    image: "/images/atTheNational.jpg",
    github: "https://github.com/Muwatta/ate_lms_backend",
    live: null,
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProjectById = (id) => projects.find((p) => p.id === id);
