// src/data/constants.js
export const featuredProjects = [
  {
    id: 1,
    title: "ATE Management System",
    category: "Full-Stack",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1782392024/Screenshot_2026-06-25_131450_idclwm.png",
    description:
      "Production platform managing 100+ active users for Algorise Tech Explorers bootcamps. Student enrollment, progress tracking, attendance, grades, and admin dashboards.",
    tech: ["Django REST", "React", "TypeScript", "PostgreSQL", "Redis"],
    color: "from-blue-500 to-cyan-400",
    github: "https://github.com/Muwatta/ate-management",
    live: "https://ate-management.vercel.app",
  },
  {
    id: 2,
    title: "SSC Cooperative System",
    category: "Full-Stack",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1782392024/Screenshot_2026-06-25_131450_idclwm.png",
    description:
      "Member and loan management platform live in production. Role-based workflows, 2-stage loan approval, savings tracking, and automated email notifications.",
    tech: ["Django REST", "React", "TypeScript", "PostgreSQL"],
    color: "from-purple-500 to-pink-400",
    github: "https://github.com/Muwatta/ssc-cooperative-system",
    live: "https://solacestaffcooperative.com.ng",
  },
  {
    id: 3,
    title: "NexTalk — Messaging API",
    category: "Backend",
    image:
      "https://res.cloudinary.com/dee5edoss/image/upload/v1741622032/Data-Filteration_ggkqyy.png",
    description:
      "Production-grade REST API demonstrating advanced Django patterns: signals, custom ORM managers, CI/CD pipeline, Docker containerization, and comprehensive testing.",
    tech: ["Django REST", "PostgreSQL", "Docker", "GitHub Actions", "pytest"],
    color: "from-emerald-500 to-teal-400",
    github: "https://github.com/Muwatta/NexTalk",
    live: null,
  },
];

export const skills = [
  { name: "Django & DRF", level: 90, icon: "🐍" },
  { name: "PostgreSQL & Redis", level: 88, icon: "🗄️" },
  { name: "React & Next.js", level: 90, icon: "⚛️" },
  { name: "TypeScript", level: 85, icon: "⚡" },
  { name: "Docker & CI/CD", level: 85, icon: "🐳" },
  { name: "System Design", level: 85, icon: "📐" },
];

export const testimonials = [
  {
    quote:
      "He delivered a production system that scaled seamlessly and remains maintainable. His understanding of complex workflows is exceptional.",
    author: "Cooperative Administrator",
    role: "Operations Lead",
    avatar: "👨‍💼",
  },
  {
    quote:
      "Muwatta built our e-commerce platform end-to-end. Professional delivery, responsive to feedback, and production-ready code.",
    author: "Client",
    role: "Business Owner",
    avatar: "👩‍💼",
  },
  {
    quote:
      "His ability to translate educational domain requirements into technical architecture is rare. Highly recommended.",
    author: "EdTech Partner",
    role: "Product Lead",
    avatar: "🚀",
  },
];

export const stats = [
  { num: 100, suffix: "+", label: "Active Users" },
  { num: 150, suffix: "+", label: "Learners Mentored" },
  { num: 6, suffix: "+", label: "Production Systems" },
  { num: 2024, suffix: "", label: "Founder, Algorise Tech" },
];

export const navItems = [
  { name: "Work", path: "/portfolio" },
  { name: "About", path: "/about" },
  { name: "Writing", path: "/blog" },
  { name: "Contact", path: "/contact" },
];
